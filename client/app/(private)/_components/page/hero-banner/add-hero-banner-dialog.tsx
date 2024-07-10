"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { FC, useEffect, useState } from "react";

import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePortfoliosForCard } from "@/components/hooks/react-query/portfolios/queries";
import { useHeroBannersToViewCard } from "@/components/hooks/react-query/hero-banners/queries";
import { PortfolioForCard } from "@/types/types";
import { Button } from "@/components/ui/button";
import { useAddHeroBannerMutation } from "@/components/hooks/react-query/hero-banners/mutations";
import { toast } from "@/components/ui/use-toast";
import { useCurrentuser } from "@/components/hooks/use-current-user";
import { redirect } from "next/navigation";
import ButtonLoader from "@/components/global/button-loader";

const HerobannerSchema = z.object({
  portfolio_id: z.string({ message: "A portfolio required!" }),
});

interface AddHeroBannerDialogProps {
  children: React.ReactNode;
}

const AddHeroBannerDialog: FC<AddHeroBannerDialogProps> = ({ children }) => {
  const [freshPortfolios, setFreshPortfolios] = useState<PortfolioForCard[]>(
    []
  );

  const user = useCurrentuser();

  const {
    data: portfoliosData,
    isError: isPorfoliosDataError,
    error: portfoliosDataError,
  } = usePortfoliosForCard();

  const { data, isError, error } = useHeroBannersToViewCard();

  const {
    mutate,
    data: mutateData,
    isPending,
    isSuccess: isMutateSuccess,
    isError: isMutateError,
    error: mutateError,
  } = useAddHeroBannerMutation();

  const form = useForm<z.infer<typeof HerobannerSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(HerobannerSchema),
    defaultValues: {},
  });

  const submitHandle = (data: z.infer<typeof HerobannerSchema>) => {
    if (!data?.portfolio_id) {
      toast({
        variant: "destructive",
        title: "Portfolio id missing!",
        description: "Portfolio id is required to add a hero banner.",
      });
    }
    mutate({
      portfolio_id: data?.portfolio_id,
      accessToken: user?.accessToken!,
    });
  };

  // set fresh portfolios effect
  useEffect(() => {
    if (!portfoliosData?.portfolios?.length) return setFreshPortfolios([]);
    if (!data?.banners?.length)
      return setFreshPortfolios(portfoliosData?.portfolios);

    const filteredFreshPortfolios = portfoliosData?.portfolios?.filter(
      (portfolio) => {
        let notInclude = true;
        data?.banners?.forEach((banner) => {
          if (banner?.portfolio_id?.toString() === portfolio?._id?.toString())
            notInclude = false;
        });
        return notInclude;
      }
    );

    return setFreshPortfolios(filteredFreshPortfolios);
  }, [portfoliosData, data]);

  // mutate response effect
  useEffect(() => {
    if (isMutateSuccess) {
      toast({
        title: "Hero banner added successfull.",
        description: "A hero banner is added successfully.",
      });
      if (mutateData?.banner?.slug)
        return redirect(`/dashboard/hero-banners/${mutateData?.banner?._id}`);
    }
    if (
      (isMutateError && mutateError?.message) ||
      (!mutateData?.success && mutateData?.message)
    ) {
      toast({
        variant: "destructive",
        title: "Failed to add hero banner.",
        description: mutateError?.message || mutateData?.message,
      });
    }
  }, [isMutateSuccess, isMutateError, mutateError, mutateData]);
  
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandle)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="portfolio_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="select_portfolio">Portfolio</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue
                          id="select_portfolio"
                          placeholder="Select a portfolio"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {freshPortfolios?.map((portfolio) => {
                          return (
                            <SelectItem
                              key={portfolio._id}
                              value={portfolio._id}
                            >
                              {portfolio.title}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit">
              {isPending ? (
                <ButtonLoader text="Adding banner..." />
              ) : (
                "Add hero banner"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddHeroBannerDialog;
