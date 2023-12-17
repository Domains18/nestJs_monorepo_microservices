import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This is an asynchronous function for handling POST requests.
export async function POST(req: Request) {
  try {
    // It uses the auth function from @clerk/nextjs to get the userId.
    const { userId } = auth();

    //It then parses the request body to JSON and extracts the name property.
    const body = await req.json();

    const { name } = body;

    // If the userId is not present, it returns an Unauthorized response with a 401 status.
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // If the name is not provided in the request body, it returns a Bad Request response with a 400 status.
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    // It then creates a new store in the database using prismadb.store.create with the name and userId as data.
    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    //If the store is successfully created, it returns a Created response with a 201 status and the created store as the response body.

    return new NextResponse(JSON.stringify(store), { status: 201 });
  } catch (error) {
    // If there's any error during the process, it logs the error and returns an Internal Server Error response with a 500 status.
    console.log("STORE_POST", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
