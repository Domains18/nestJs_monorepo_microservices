// Importing necessary modules
import Navbar from "@/components/Navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
// Dashboard component
export default async function Dashboard({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  // Getting the userId from auth
  const { userId } = auth();
  // If user is not authenticated, redirect to sign-in page
  if (!userId) {
    redirect("/sign-in");
  }
  // Fetching the store details for the given storeId and userId
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });
  // If store does not exist, redirect to home page

  if (!store) {
    redirect("/");
  }
  // Rendering the component

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-60"> {/* Set the width of the navbar */}
        <Navbar />
      </div>
      <div className="flex-grow overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
