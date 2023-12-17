import { NextResponse } from "next/server"
import prismadb from "./prismadb"


export const saveTransaction = async (values: any) =>{
    try{
        const newTransaction = await prismadb.transaction.create({
            data: {
                storeId: values.StoreID,
                merchantRequestId: values.MerchantRequestID,
                checkoutRequestId: values.CheckoutRequestID,
                resultCode: values.ResultCode,
                resultDesc: values.ResultDesc,
                amount: values.Amount,
                mpesaReceiptNumber: values.MpesaReceiptNumber,
                balance: values.Balance,
                transactionDate: values.TransactionDate,
                phoneNumber: values.PhoneNumber,
            }
        })

        return newTransaction
    }
    catch(error){
        console.log(error)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const fetchTransactionByMerchantRequestId = async (merchantRequestId: string) => {
   try{
    const transaction = await prismadb.transaction.findUnique({
        where: {
            id: '',
            merchantRequestId
        }
    })
    return transaction
   } catch(error){
    console.log(error)
    return null
   }
  
  };

  export const fetchTransactionByCheckoutRequestId = async (checkoutRequestId: string) => {
    try {
      const transaction = await prismadb.transaction.findUnique({
        where: {
            id: '',
          checkoutRequestId,
        },
      });
      return transaction;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  


