import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import StoreSwitch from "@/components/store-switch";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }


  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_URL as string;

  return (
    <div className="border-r h-full ">
      <div className=" flex  py-4 flex-col px-4 justify-between h-screen">
        <div>
        <Image
          src={`${baseUrl}/assets/logo.png`}
          width="180"
          height="70"
          alt="Vercel"
          className="my-0 mx-auto object-contain"
        />
          <StoreSwitch items={stores} />
          <MainNav className="mt-6 pl-2"/>
        </div>

        <div className=" flex flex-col space-y-4 pl-2">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
