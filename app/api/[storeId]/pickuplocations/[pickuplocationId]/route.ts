import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET( req: Request, {params}: {
  params: { pickuplocationId: string }
}) {
  try {
    if (!params.pickuplocationId) {
      return new NextResponse("Pickup Location ID is required", {
        status: 400,
      });
    }

    const pickuplocation = await prismadb.pickUpLocation.findUnique({
      where: {
        id: params.pickuplocationId,
      }
    });
    return NextResponse.json(pickuplocation);
  } catch (error) {
    console.log("[PICKUP_LOCATION_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { pickuplocationId: string, storeId: string } }
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
    if(!params.pickuplocationId) {
      return new NextResponse("Pickup Location ID is required", { status: 400 });
    }
    if(!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }
    if(!address) {
      return new NextResponse("Address is required", { status: 400 });
    }
    if(!contact) {
      return new NextResponse("Contact is required", { status: 400 });
    }
    if(!instructions) {
      return new NextResponse("Instructions is required", { status: 400 });
    }
    if(!operatingHours) {
      return new NextResponse("Operating Hours is required", { status: 400 });
    }
    if(!parkingInformation) {
      return new NextResponse("Parking Information is required", { status: 400 });
    }
    if(!confirmationDetails) {
      return new NextResponse("Confirmation Details is required", { status: 400 });
    }
    if(!imageUrl) {
      return new NextResponse("Images are required", { status: 400 });
  } 

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId,
      },
    });
    if(!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
     
    const pickuplocation = await prismadb.pickUpLocation.updateMany({
      where: {
        id: params.pickuplocationId,
      },
      data: {
        address,
        contact,
        instructions,
        operatingHours,
        parkingInformation,
        confirmationDetails,
        imageUrl,
      },
    })

   
    return NextResponse.json(pickuplocation);
    
  } catch (error) {
    console.log("[PICKUP_LOCATION_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


export async function DELETE(req: Request, { params }: { params: { pickuplocationId: string, storeId: string } }) {
  try {
    const { userId } = auth();

    if(!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if(!params.pickuplocationId) {
      return new NextResponse("Pickup Location ID is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId,
      },
    });
    if(!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const pickuplocation = await prismadb.pickUpLocation.deleteMany({
      where: {
        id: params.pickuplocationId,
      },
    })

    return NextResponse.json(pickuplocation);

  } catch (error) {
    console.log("[PICKUP_LOCATION_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }

}

