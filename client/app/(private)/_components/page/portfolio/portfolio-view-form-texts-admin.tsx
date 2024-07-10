import { FC, useEffect } from "react";
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
import { PortfolioTexts } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import RichTextEditor from "@/components/global/rich-text-editor";
import { useCurrentuser } from "@/components/hooks/use-current-user";
import { usePortfolioTextMutation } from "@/components/hooks/react-query/portfolios/mutations";
import ButtonLoader from "@/components/global/button-loader";
import { useToast } from "@/components/ui/use-toast";

const PortfolioTextsSchema = z.object({
  _id: z.string(),
  title: z.string().min(3).max(180),
  description: z.string().min(10),
  short_description: z.string(),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
});

interface PortfolioViewFormTextsAdminProps {
  portfolioTexts: PortfolioTexts;
}

const PortfolioViewFormTextsAdmin: FC<PortfolioViewFormTextsAdminProps> = ({
  portfolioTexts,
}) => {
  const user = useCurrentuser();
  const { mutate, isError, error, isPending, isSuccess } =
    usePortfolioTextMutation();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof PortfolioTextsSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(PortfolioTextsSchema),
    defaultValues: portfolioTexts,
  });

  const submitFormHanlde = (data: z.infer<typeof PortfolioTextsSchema>) => {
    mutate({ data: data, accessToken: user?.accessToken! });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Saved updated!",
        description: "Portfolio successfully updated!",
      });
    }
    if (isError) {
      toast({
        title: "Failed to save!",
        description: error?.message,
      });
    }
  }, [isSuccess, toast, isError, error]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitFormHanlde)}
        className="space-y-6"
      >
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
        <Button
          disabled={isPending}
          type="submit"
          size="lg"
        >
          {isPending ? <ButtonLoader text="Saving..." /> : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default PortfolioViewFormTextsAdmin;
