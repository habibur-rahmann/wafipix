"use client";
import { useStore } from "@/components/hooks/zustant/store";
import { FC, useCallback, useEffect } from "react";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import SelectStar from "./select-star";
import { Button } from "@/components/ui/button";
import { useAccessToken } from "@/components/hooks/use-access-token";
import ButtonLoader from "@/components/global/button-loader";
import {
  useCreateReview,
  useUpdateReview,
} from "@/components/hooks/react-query/reviews/mutations";
import InputMessage from "@/components/global/input-message";
import { useToast } from "@/components/ui/use-toast";

const ReviewSchema = z.object({
  _id: z.string().optional(),
  star: z.number({ message: "Start must required!" }),
  text: z
    .string({ message: "Review must required!" })
    .max(240, "Max 240 character!")
    .min(10, "min 10 character required!"),
  user_name: z.string().optional(),
  user_picture: z.string().optional(),
});

interface ReviewFormProps {}

const ReviewForm: FC<ReviewFormProps> = ({}) => {
  const { review, clearReview, setOpenAddReviewForm, isOpenAddReviewForm } =
    useStore();

  const { toast } = useToast();

  const {
    mutate: updateMutate,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateReview();

  const {
    mutate: createMutate,
    isPending: isCreatePending,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    error: createError,
  } = useCreateReview();

  const access_token = useAccessToken();

  const form = useForm<z.infer<typeof ReviewSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(ReviewSchema),
    defaultValues: review
      ? review
      : {
          star: 5,
          text: "",
        },
  });

  const submitHandle = (data: z.infer<typeof ReviewSchema>) => {
    if (!access_token)
      return toast({
        title: "Token not found!",
        description: "Please login again.",
      });

    // update old review
    if (data._id) {
      if (review) {
        updateMutate({
          review: {
            ...review,
            text: data?.text,
            star: data?.star,
          },
          access_token,
        });
      }
    } else {
      // create new review
      createMutate({
        review: { star: data.star, text: data.text },
        access_token: access_token,
      });
    }
  };

  if (isUpdateSuccess || isCreateSuccess) {
    if (isOpenAddReviewForm) setOpenAddReviewForm(false);
    if (review) clearReview();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandle)} className="space-y-6">
        <div className="space-y-4">
          {/* Text field */}
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="text" className="text-lg lg:text-xl">
                  Review
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="text-lg lg:text-xl"
                    id="text"
                    placeholder="type your beutiful qoute about us."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* star field */}
          <FormField
            control={form.control}
            name="star"
            render={() => (
              <FormItem className="flex gap-4 items-center w-full h-12">
                <FormLabel className="text-lg lg:text-xl mt-2">
                  Select Star
                </FormLabel>
                <div className="h-full w-fit flex items-center">
                  <SelectStar
                    defaultStar={form.getValues("star")}
                    onChange={(star: number) => form.setValue("star", star)}
                  />
                </div>
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button
            size={"lg"}
            variant={"secondary"}
            disabled={isUpdatePending || isCreatePending}
            type="submit"
          >
            {isUpdatePending ? (
              <ButtonLoader text="updating" />
            ) : isCreatePending ? (
              <ButtonLoader text="creating" />
            ) : review ? (
              "Save review"
            ) : (
              "Add review"
            )}
          </Button>

          {isUpdateError ? (
            <InputMessage message={updateError.message} />
          ) : null}
          {isCreateError ? (
            <InputMessage message={createError.message} />
          ) : null}
        </div>
      </form>
    </Form>
  );
};

export default ReviewForm;
