"use client";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";

import { DataTable } from "@/components/ui/data-table";

import { ApiList } from "@/components/ui/api-list";
import { BillboardColumn, columns } from "./column";
import { useState } from "react";

interface BillboardClientProps {
  data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    setIsLoading(true);

    // Simulate loading delay (Replace with your actual data fetching)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // After loading is done, navigate to the desired route
    router.push(`/${params.storeId}/billboards/new`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboard (${data.length})`}
          description={"Manage your billboard"}
        />
        <Button
          onClick={handleButtonClick}
          disabled={isLoading}
           className={isLoading ? "loading-button" : ""}
        >
          {isLoading ? (
            <div className="spinner" /> // Show spinner when loading
          ) : (
            <Plus className="mr-2 h-4 w-4" size={"sm"} />
          )}
          {isLoading ? "Adding ..." : "Add New"}
        </Button>
      </div>

      <Separator />

      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description="API calls for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};
