"use client";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { zodResolver } from "@hookform/resolvers/zod";
import { PickUpLocation } from "@prisma/client";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PickUpLocationFormProps {
  initialData: PickUpLocation | null;
}

const formSchema = z.object({
  address: z.string().min(1),
  contact: z.string().min(1),
  instructions: z.string().min(1),
  operatingHours: z.string().min(1),
  parkingInformation: z.string().min(1),
  confirmationDetails: z.string().min(1),
  imageUrl: z.string().min(1),
});

type PickUpLocationFormValues = z.infer<typeof formSchema>;

export const PickUpLocationForm: React.FC<PickUpLocationFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData
    ? "Edit Pick Up Location"
    : "Create Pick Up Location";
  const description = initialData
    ? "Edit Pick Up Location"
    : "Add a new Pick Up Location";
  const toastMessage = initialData
    ? "Pick Up Location Updated"
    : "Pick Up Location Created";
  const action = initialData ? "Save Changes" : " Create";
  const actions = initialData ? "Saving Changes" : " Creating";

  const form = useForm<PickUpLocationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      address: "",
      contact: "",
      instructions: "",
      operatingHours: "",
      parkingInformation: "",
      confirmationDetails: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: PickUpLocationFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/pickuplocations/${params.pickuplocationId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/pickuplocations`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/pickuplocations`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/pickuplocations/${params.pickuplocationId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/pickuplocations`);
      toast.success("Pick Up Location Deleted");
    } catch (error) {
      toast.error(
        "Make sure you have removed all orders using this pick up location first"
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    disabled={loading}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={loading}
                        placeholder="Physical Address"
                      />
                    </FormControl>
                    <FormDescription>
                    This is the physical address of the pick up location
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
           
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={loading}
                        placeholder="Telephone Number"
                      />
                    </FormControl>
                    <FormDescription>
                    This is the telephone number of the pick up location
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
           
          
              <FormField
                control={form.control}
                name="instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructions</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={loading}
                        placeholder="specific instructions or landmarks"
                      />
                    </FormControl>
                    <FormDescription>
                    This is the instructions or landmarks of the pick up location
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
            
              <FormField
                control={form.control}
                name="operatingHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Operating Hours</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={loading}
                        placeholder="Available Hours"
                      />
                    </FormControl>
                    <FormDescription>
                    Hours during which pickups are available
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
              <FormField
                control={form.control}
                name="parkingInformation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parking Information</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={loading}
                        placeholder="Parking Availability"
                      />
                    </FormControl>
                    <FormDescription>
                    Details about parking availability
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmationDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmation Details</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={loading}
                        placeholder="Any Confirmation"
                      />
                    </FormControl>
                    <FormDescription>
                    Any confirmation or identification requirements
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

            
          </div>
          <Button
            disabled={loading}
            className={loading ? "loading-button" : "ml-auto"}
            type="submit"
          >
            {loading ? <div className="spinner" /> : ""}
            {loading ? actions : action}
          </Button>
        </form>
      </Form>
    </>
  );
};
