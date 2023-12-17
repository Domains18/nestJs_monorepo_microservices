
import prismadb from "@/lib/prismadb";
import { PickUpLocationForm } from "./components/pickuplocation-form";


const PickUpLocationPage = async ({
  params,
}: {
  params: { pickuplocationId: string };
}) => {
    const pickuplocation = await prismadb.pickUpLocation.findUnique({
      where: {
        id: params.pickuplocationId,
      },
    })
  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <PickUpLocationForm initialData={pickuplocation}/>
        </div>
    </div>
  )
};

export default PickUpLocationPage;
