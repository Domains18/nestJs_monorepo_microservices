import { saveTransaction } from "@/lib/mpesa";
import axios from "axios";

import { NextApiResponse } from "next";
import { NextResponse } from "next/server";


interface CustomRequest extends Request {
    token?: string;
}

// Middleware
export const createToken = async (
 req: CustomRequest,
  next: () => void
) => {
  try {
    const secret = process.env.MPESA_CONSUMER_KEY;
    const consumer = process.env.MPESA_CONSUMER_SECRET;
    const auth = Buffer.from(`${consumer}:${secret}`).toString("base64");
    const accessTokenUrl = `${process.env.MPESA_ACCESS_TOKEN_URL}`;
    const { data } = await axios.get(
      //   "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
      accessTokenUrl,
      {
        headers: {
          authorization: `Basic ${auth}`,
        },
      }
    );

    req.token = data.access_token;
    console.log(data);
    next();
  } catch (err) {
    console.log(err);
    return new NextResponse("TOKEN GENERATION ERROR", { status: 400 });
  }
};

// STK Push
export const postStk = async (req:CustomRequest, res:Response) => {
  try {
    const body = await req.json();
    const { phone, amount } = body;
    console.log(req.body);
    const shortCode = process.env.MPESA_SHORT_CODE as string;
    const passKey = process.env.MPESA_PASS_KEY as string;
    const testCredentials = shortCode + passKey;

    const date = new Date();
    const timestamp =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);
    const password = Buffer.from(testCredentials + timestamp).toString(
      "base64"
    );
    const data = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerBuyGoodsOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: shortCode,
      PhoneNumber: phone,
      CallBackURL: "https://sokoni-ke.vercel.app/api/callback",
      AccountReference: "purchase",
      TransactionDesc: "purchase",
    };
    const stk_dev = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const { data: responseData } = await axios.post(
      //   "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
      stk_dev,

      data,
      {
        headers: {
          authorization: `Bearer ${req.token}`,
        },
      }
    );

    const dataArray = [];
    dataArray.push(responseData);
    if (responseData.ResponseCode == 0) {
      const transaction = {
        MerchantRequestID: responseData.MerchantRequestID,
        CheckoutRequestID: responseData.CheckoutRequestID,
        ResultCode: responseData.ResponseCode,
        ResultDesc: responseData.ResponseDescription,
      };
    } else {
      return new NextResponse("STK PUSH Success", { status: 400 });
    }
    return NextResponse.json(responseData);
  } catch (err) {
    console.log(err);
    return new NextResponse("STK PUSH ERROR", { status: 422 });
  }
};

// Callback
export const callback = async (req: CustomRequest, res: NextApiResponse) => {
  try {
    const body = await req.json();
    const data = body.Body.stkCallback;
    const transaction = {
      MerchantRequestID: data.MerchantRequestID,
      CheckoutRequestID: data.CheckoutRequestID,
      ResultCode: data.ResultCode,
      ResultDesc: data.ResultDesc,
      Amount: data.CallbackMetadata?.Item[0].Value,
      MpesaReceiptNumber: data.CallbackMetadata?.Item[1].Value,
      Balance: data.CallbackMetadata?.Item[2].Value,
      TransactionDate: data.CallbackMetadata?.Item[3].Value,
      PhoneNumber: data.CallbackMetadata?.Item[4].Value,
    };

    const savedData = await saveTransaction(transaction);

    console.log("SAVED TRANSACTION", savedData);
    return  NextResponse.json(savedData);
  } catch (err) {
    console.log(err);
    return new NextResponse("CALLBACK ERROR", { status: 400 });
  }
};
