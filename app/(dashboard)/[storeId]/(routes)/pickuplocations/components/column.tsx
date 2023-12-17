"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown} from "lucide-react";
import { CellAction } from "./cell-action";

export type PickUpLocationColumn = {
  id: string;
  address: string;
  contact: string;
  instructions: string;
  operatingHours: string;
  parkingInformation: string;
  confirmationDetails: string;

};

export const columns: ColumnDef<PickUpLocationColumn>[] = [
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <p>Address</p>
          <ArrowUpDown
            className="ml-2 h-4 w-4"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "instructions",
    header: "Instructions",
  },
  {
    accessorKey: "operatingHours",
    header: "Operating Hours",
  },
  {
    accessorKey: "parkingInformation",
    header: "Parking Information",
  },
 
  {
    id: "actions", 
    cell: ({row}) => <CellAction data={row.original}/>
  }
];
