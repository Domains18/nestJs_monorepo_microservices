// Importing necessary libraries and components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

// Defining the form schema using zod for validation
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Store Name must be at least 3 characters." }),
});

// StoreModal component definition
export const StoreModal = () => {
  // Using custom hook to manage modal state
  const storeModal = useStoreModal();
  // State for loading status
  const [loading, setLoading] = useState(false);
  // Using react-hook-form for form handling
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // Function to handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      // Making a POST request to the API to create a new store
      const response = await axios.post("/api/stores", values);
      //redirect the user to the dashboard after a successful login and redirect back to the dashboard
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      // Displaying an error toast message in case of failure
      toast.error("Something went wrong");
    } finally {
      // Resetting the loading state
      setLoading(false);
    }
  };

  // Rendering the modal with the form
  return (
    <Modal
      title="Create Store"
      description="Add a New Store to Manage Products and Categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className={loading ? "cursor-not-allowed" : ""}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="School Uniform"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <Button
                  disabled={loading}
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500"
                >
                  {loading ? <div className="spinner" /> : ""}
                  {loading ? "Continuing ..." : "Continue"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
