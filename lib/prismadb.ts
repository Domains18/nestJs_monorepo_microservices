// Importing PrismaClient from the Prisma client library
import { PrismaClient } from "@prisma/client";

// Declaring a global variable 'prisma' which can be either an instance of PrismaClient or undefined
declare global {
  var prisma: PrismaClient | undefined;
}

// If 'prisma' is already defined in the global scope, use it, otherwise create a new PrismaClient instance
const prismadb = globalThis.prisma || new PrismaClient();

// If the current environment is not production, assign the 'prismadb' instance to the global 'prisma' variable
// This is done to prevent creating multiple instances of PrismaClient in a development environment
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

// Export the 'prismadb' instance for use in other modules
export default prismadb;
