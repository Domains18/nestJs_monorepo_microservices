import { PesaPalGateway } from "@/lib/pesapalUtils";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

const gateway = new PesaPalGateway();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request,{ params }: { params: { storeId: string } }) {
  const { productIds, phone_number, email } = await req.json();
  let amount = 0;

  if (!productIds || productIds.length === 0) {
    return NextResponse.json(
      { message: "Product Ids are required" },
      { status: 400 }
    );
  }
  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  interface Product {
    price: {
      toNumber: () => number;
    };
  }

  products.forEach((product: Product) => {
    amount += product.price.toNumber();
  });

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  });

  const currency: string = "KES";

  try {
    const response = await gateway.makePayment(
      phone_number,
      email,
      amount,
      currency
    );
    const redirect_url = response.redirect_url;
    console.log(response);
    return NextResponse.json(
      { redirect_url, order },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
