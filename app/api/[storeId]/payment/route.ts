// import prismadb from "@/lib/prismadb";
// import {NextResponse} from "next/server";

// const corsHeaders = {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//     "Access-Control-Allow-Headers": "Content-Type, Authorization",
//   };
  
//   export async function OPTIONS() {
//     return NextResponse.json({}, { headers: corsHeaders });
//   }

//   export async function POST(
//     req: Request,
//     { params }: { params: { storeId: string } }
//   ){
//     const {productIds} = await req.json();

//     if(!productIds || productIds.length === 0){
//         return NextResponse.json({message: "Product Ids are required"}, {status: 400})
//     }

//     const products = await prismadb.product.findMany({
//         where: {
//             id: {
//                 in: productIds
//             }
//         }
//     })

//     const line_items:any = []

//     products.forEach((product)=>{
//         line_items.push({
//             quantity: 1,
//             price_data: {
//                 cuurency: "KSH",
//                 product_data:{
//                     name: product.name
//                 },
//                 amount: product.price.toNumber()*100
//             }
//         })
//     })

//     const order = await prismadb.order.create({
//         data: {
//             storeId: params.storeId,
//             isPaid: false,
//             orderItems: {
//                 create: productIds.map((productId: string) => ({
//                     product: {
//                         connect: {
//                             id: productId
//                         }
//                     }
//                 }))
//             }
//         }
//     })

    // const session = await mpesa.checkout.sessions.create({
    //     line_items,
    //     mode: "payment",
    //     success_url: `${process.env.FRONTEND_URL}/cart?success=1`,
    //     cancel_url: `${process.env.FRONTEND_URL}/cart?canceled=1`,
    //     metadata: {
    //         orderId: order.id
    //     }
    // })
   
  // }