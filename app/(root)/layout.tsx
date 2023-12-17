// Importing necessary modules
import prismadb from "@/lib/prismadb"; // Importing prismadb from the local file
import { auth } from "@clerk/nextjs"; // Importing auth from clerk's nextjs library

// Importing redirect function from next's navigation module
import { redirect } from "next/navigation";

// This is the default exported async function SetupLayout
export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode; // children is of type ReactNode
}) {
  const { userId } = auth(); // Destructuring userId from the auth function

  // If there is no userId, redirect to the home page
  if (!userId) {
    redirect("/");
  }

  // Fetching the first store that matches the userId
  const store = await prismadb.store.findFirst({
    where: { userId },
  });

  // If a store is found, redirect to the store's page
  if (store) {
    redirect(`/${store.id}`);
  }

  // If no redirection occurs, render the children components
  return <> {children} </>;
}
