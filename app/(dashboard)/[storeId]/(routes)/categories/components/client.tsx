"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiAlert } from "@/components/ui/api-alert";

import { ApiList } from "@/components/ui/api-list";
import { CategoryColumn, columns } from "./column";
import { useState } from "react";

interface CategoriesClientProps {
  data: CategoryColumn[];
}

export const CategoriesClient: React.FC<CategoriesClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleButtonClick = async () => {
    setIsLoading(true);

    // Simulate loading delay (Replace with your actual data fetching)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // After loading is done, navigate to the desired route
    router.push(`/${params.storeId}/categories/new`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Categories (${data.length})`} description="Manage categories for your store" />
        <Button onClick={handleButtonClick}
         className={isLoading ? "loading-button" : ""}>
        {isLoading ? (
            <div className="spinner" /> // Show spinner when loading
          ) : (
            <Plus className="mr-2 h-4 w-4" size={"sm"} />
          )}
          {isLoading ? "Adding ..." : "Add New"}
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};