"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { CellAction } from "./cell-action";

export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <p>Label</p>
          <ArrowUpDown
            className="ml-2 h-4 w-4"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions", 
    cell: ({row}) => <CellAction data={row.original}/>
  }
];
