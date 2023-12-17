import { fetchTransactionByMerchantRequestId } from "@/lib/mpesa";
import { NextApiRequest, NextApiResponse } from "next";


const validateTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { payload } = req.body;
    const merchantRequestId = payload.MerchantRequestID;

    const transaction = await fetchTransactionByMerchantRequestId(merchantRequestId);

    if (!transaction) {
      console.log("Cannot find transaction");
      return res.status(404).json({ message: 'Cannot find transaction' });
    }

    console.log("transaction", transaction);
    res.status(200).json({ transaction });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default validateTransaction;
