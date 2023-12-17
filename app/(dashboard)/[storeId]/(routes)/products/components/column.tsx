"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown} from "lucide-react";
import { CellAction } from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  description: string;
  condition: string;
  isFeatured: boolean;
  isArchived: boolean;
  category: string;
  size: string;
  color: string;
  createdAt: string;
};

const truncateDescription = (description: string, wordCount: number): string => {
  const words = description.split(' ');
  const truncatedDescription = words.slice(0, wordCount);
  return truncatedDescription.join(' ') + (words.length > wordCount ? '...' : '');
};

export const columns: ColumnDef<ProductColumn>[] = [
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
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="truncate" style={{ maxWidth: "100px" }}>
        {truncateDescription(row.original.description, 15)} {/* Adjust the word count as needed */}
      </div>
    ),
  },
  {
    accessorKey: "condition",
    header: "Condition",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          className="h-4 w-4 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    )
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


