"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FC, useEffect } from "react";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useCurrentuser } from "@/components/hooks/use-current-user";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";
import ButtonLoader from "@/components/global/button-loader";
import { useAddServiceMutation } from "@/components/hooks/react-query/services/mutations";

const AddServiceSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Service name minimum 5 character's rquired." })
    .max(120, { message: "Service name maximum can have 120 character's." }),
});

interface AddServiceDialogProps {
  children: React.ReactNode;
}

const AddServiceDialog: FC<AddServiceDialogProps> = ({ children }) => {
  const user = useCurrentuser();

  const { toast } = useToast();

  const { mutate, data, isSuccess, isPending, isError, error } =
    useAddServiceMutation();

  const form = useForm<z.infer<typeof AddServiceSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(AddServiceSchema),
    defaultValues: {
      title: "",
    },
  });

  const submitHandle = (service: { title: string }) => {
    if (!service?.title)
      return toast({
        title: "Title is required",
      });
    mutate({
      title: service?.title,
      accessToken: user?.accessToken!,
    });
  };

  // mutate response effect
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Service added successfull.",
        description: "A Service is added successfully.",
      });
      if (data?.banner?.slug)
        return redirect(`/dashboard/services/${data?.service?.slug}`);
    }
    if ((isError && error?.message) || (!data?.success && data?.message)) {
      toast({
        variant: "destructive",
        title: "Failed to add service.",
        description: error?.message || data?.message,
      });
    }
  }, [isSuccess, isError, error, data, toast]);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(submitHandle)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title" className="text-lg lg:text-xl">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="lg:text-lg"
                      placeholder="Enter service title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit">
              {isPending ? (
                <ButtonLoader text="Adding service..." />
              ) : (
                "Add service"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceDialog;
