"use client";
import { FC } from "react";

import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import RichTextEditor from "@/components/global/rich-text-editor";
import ButtonLoader from "@/components/global/button-loader";
import { ServiceTextsAdmin } from "@/types/types";

const ServiceTextsSchema = z.object({
  _id: z.string(),
  title: z.string().min(3).max(180),
  description: z.string().min(10),
  short_description: z.string(),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
});

interface ServiceViewFormTextsAdminProps {
  service: ServiceTextsAdmin;
  isSaving: boolean;
  onSave: (submitData: any) => void
}

const ServiceViewFormTextsAdmin: FC<ServiceViewFormTextsAdminProps> = ({
  service,
  isSaving,
  onSave
}) => {
  const form = useForm<z.infer<typeof ServiceTextsSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(ServiceTextsSchema),
    defaultValues: service,
  });

  const submitHandle = (submitData: z.infer<typeof ServiceTextsSchema>) => onSave(submitData);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandle)} className="space-y-6">
        <div className=" space-y-4">
          {/* Title field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl" htmlFor="title">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-xl"
                    id="title"
                    placeholder="Portfolio title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* short description field */}
          <FormField
            control={form.control}
            name="short_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl" htmlFor="short_description">
                  Short Description
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-xl"
                    id="Short_description"
                    placeholder="Portfolio Short description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/*Description field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl" htmlFor="description">
                  Description
                </FormLabel>
                <FormControl>
                  <RichTextEditor
                    onChange={field.onChange}
                    value={form.getValues("description") as any}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* check boxes */}
          <div className="flex gap-8 items-center">
            {/*Featured field */}
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel
                      className="cursor-pointer text-xl"
                      htmlFor="featured"
                    >
                      Featured
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        id="featured"
                        defaultChecked={form.getValues("featured") as any}
                        value={field.value as any}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*Featured field */}
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel
                      className="cursor-pointer text-xl"
                      htmlFor="active"
                    >
                      Active
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        id="active"
                        defaultChecked={form.getValues("active") as any}
                        value={field.value as any}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button disabled={isSaving} type="submit" size="lg">
          {isSaving ? <ButtonLoader text="Saving..." /> : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default ServiceViewFormTextsAdmin;
