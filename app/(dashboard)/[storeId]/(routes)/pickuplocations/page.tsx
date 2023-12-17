import {format} from "date-fns";

import prismadb from "@/lib/prismadb";
import {PickUpLocationColumn } from "./components/column";
import { PickUpLocationClient } from "./components/client";

const PickUpLocationsPage = async ({ params }: { params: { storeId: string } }) => {
  const pickuplocations = await prismadb.pickUpLocation.findMany({
    where: {
      storeId: params.storeId,
    },
   
  });

  const formattedPickupLocations: PickUpLocationColumn[] = pickuplocations.map(
    (pickuplocation) => ({
      id: pickuplocation.id,
      address: pickuplocation.address,
      contact: pickuplocation.contact,
      instructions: pickuplocation.instructions,
      operatingHours: pickuplocation.operatingHours,
      parkingInformation: pickuplocation.parkingInformation,
      confirmationDetails: pickuplocation.confirmationDetails,

    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PickUpLocationClient data={formattedPickupLocations} />
      </div>
    </div>
  );
};

export default PickUpLocationsPage;
