"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-action";

export type SizeColumn = {
  id: string;
  name: string;
  value: string;
  authorName: string;
  createdAt: string;
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <p>Name</p>
          <ArrowUpDown
            className="ml-2 h-4 w-4"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "value",
    header: "Size",
  },
  {
    accessorKey: "authorName",
    header: "Publisher",
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
