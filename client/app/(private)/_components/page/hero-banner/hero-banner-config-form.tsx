import { HeroSliderConfig } from "@/types/types";
import { ChangeEvent, FC, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useUpdateHeroBannerMutation } from "@/components/hooks/react-query/hero-banners/mutations";
import { useToast } from "@/components/ui/use-toast";
import { useCurrentuser } from "@/components/hooks/use-current-user";
import ButtonLoader from "@/components/global/button-loader";

const ConfigSchema = z.object({
  _id: z.string(),
  active: z.boolean(),
  backgroundColor: z.string(),
  descriptionTextColor: z.string(),
  headingTextColor: z.string(),
  linkTextColor: z.string(),
  imageQuality: z.number(),
});

interface HeroBannerConfigFormProps {
  data: HeroSliderConfig;
}

const HeroBannerConfigForm: FC<HeroBannerConfigFormProps> = ({ data }) => {
  const user = useCurrentuser();
  const { toast } = useToast();

  const {
    mutate,
    data: mutateData,
    isSuccess,
    isPending,
    isError,
    error,
  } = useUpdateHeroBannerMutation();

  const form = useForm<z.infer<typeof ConfigSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(ConfigSchema),
    defaultValues: data,
  });

  const submitHandle = (submitData: z.infer<typeof ConfigSchema>) => {
    if (!submitData)
      return toast({
        variant: "destructive",
        title: "Id missing!",
        description: "Hero banner id required.",
      });

    mutate({
      id: data?._id,
      config: submitData,
      accessToken: user?.accessToken!,
    });
  };

  // mutate response effect
  useEffect(() => {
    if (isSuccess && mutateData?.success) {
      toast({
        title: "Banner saved",
        description: "Hero banner is updated successfully.",
      });
    }
    if (
      (isError && error?.message) ||
      (!mutateData?.success && mutateData?.message)
    ) {
      toast({
        variant: "destructive",
        title: "Failed to save!",
        description: error?.message || mutateData?.message,
      });
    }
  }, [isSuccess, mutateData, toast, isError, error]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandle)} className="space-y-6">
        <div className="space-y-4">
          {/* background color field */}
          <FormField
            control={form.control}
            name="backgroundColor"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center">
                <FormLabel
                  className="text-lg lg:text-xl w-fit text-nowrap cursor-pointer"
                  htmlFor="backgroundColor"
                >
                  Background color
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-16 p-0 cursor-pointer"
                    type="color"
                    id="backgroundColor"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* description Text color field */}
          <FormField
            control={form.control}
            name="descriptionTextColor"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center">
                <FormLabel
                  className="text-lg lg:text-xl w-fit text-nowrap cursor-pointer"
                  htmlFor="descriptionTextColor"
                >
                  Description text color
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-16 p-0 cursor-pointer"
                    type="color"
                    id="descriptionTextColor"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* heading Text color field */}
          <FormField
            control={form.control}
            name="headingTextColor"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center">
                <FormLabel
                  className="text-lg lg:text-xl w-fit text-nowrap cursor-pointer"
                  htmlFor="headingTextColor"
                >
                  Heading text color
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-16 p-0 cursor-pointer"
                    type="color"
                    id="headingTextColor"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* link Text Color field */}
          <FormField
            control={form.control}
            name="linkTextColor"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center">
                <FormLabel
                  className="text-lg lg:text-xl w-fit text-nowrap cursor-pointer"
                  htmlFor="linkTextColor"
                >
                  Link text color
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-16 p-0 cursor-pointer"
                    type="color"
                    id="linkTextColor"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* image Quality field */}
          <FormField
            control={form.control}
            name="imageQuality"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center">
                <FormLabel
                  className="text-lg lg:text-xl w-fit text-nowrap cursor-pointer"
                  htmlFor="imageQuality"
                >
                  Image quality (1 - 100)
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-20 cursor-pointer"
                    type="number"
                    max={100}
                    min={1}
                    id="imageQuality"
                    defaultValue={form.formState.defaultValues?.imageQuality}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      form.setValue("imageQuality", parseInt(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* active status field */}
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center">
                <FormLabel
                  className="text-lg lg:text-xl w-fit text-nowrap cursor-pointer"
                  htmlFor="active"
                >
                  Active
                </FormLabel>
                <FormControl>
                  <Checkbox
                    className="h-4 w-4 self-start"
                    defaultChecked={form.getValues("active")}
                    onCheckedChange={(e) =>
                      form.setValue("active", e as boolean)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isPending} type="submit">
          {isPending ? <ButtonLoader text="Saving..." /> : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default HeroBannerConfigForm;
