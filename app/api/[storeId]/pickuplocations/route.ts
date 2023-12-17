import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      address,
      contact,
      instructions,
      operatingHours,
      parkingInformation,
      confirmationDetails,
      imageUrl
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!address) {
      return new NextResponse("Address is required", { status: 400 });
    }
    if (!contact) {
      return new NextResponse("Contact is required", { status: 400 });
    }
    if (!instructions) {
      return new NextResponse("Instructions is required", { status: 400 });
    }
    if (!operatingHours) {
      return new NextResponse("Operating Hours is required", { status: 400 });
    }
    if (!parkingInformation) {
      return new NextResponse("Parking Information is required", {
        status: 400,
      });
    }
    if (!confirmationDetails) {
      return new NextResponse("Confirmation Details is required", {
        status: 400,
      });
    }
    if (!imageUrl) {
      return new NextResponse("Image Url is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const pickuplocation = await prismadb.pickUpLocation.create({
      data: {
        address,
        contact,
        instructions,
        operatingHours,
        parkingInformation,
        confirmationDetails,
        imageUrl,
        storeId: params.storeId,
      },
    });

    console.log("Pickup Location", pickuplocation);

    return NextResponse.json(pickuplocation);
    
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
  
    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const pickuplocation = await prismadb.pickUpLocation.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(pickuplocation);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
