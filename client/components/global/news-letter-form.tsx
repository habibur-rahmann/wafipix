"use client";

import { FC } from "react";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import * as z from "zod";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

const NewsletterSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

interface NewsletterFormProps {}

const NewsletterForm: FC<NewsletterFormProps> = ({}) => {
  const form = useForm<z.infer<typeof NewsletterSchema>>({
    mode: "onChange",
    resolver: zodResolver(NewsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const submitHandle = (data: z.infer<typeof NewsletterSchema>) => {
    
  };
  return (
    <div className="h-full w-full">
      <Form {...form}>
        <h2 className="py-2 text-articlePara md:text-articleParaMd lg:text-articleParaLg text-primary-foreground">
          Subscribe with free of cost! for stay update with us.
        </h2>
        <form
          onSubmit={form.handleSubmit(submitHandle)}
          className="flex gap-4 items-center"
        >
          <div className="h-full w-full">
            {/* Email field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-lg lg:text-xl"
                      {...field}
                      type="email"
                      placeholder="example@mail.com"
                      id="email"
                      name="email"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {/* Submit Button */}
          <Button
            size={"lg"}
            className="text-lg lg:text-xl flex items-center gap-2 group"
            type="submit"
            variant={"secondary"}
          >
            <span>Sign up</span>{" "}
            <MoveRight className="h-4 w-4 group-hover:ml-2 duration-300" />
          </Button>
        </form>
        <FormMessage>{form.formState.errors.email?.message}</FormMessage>
      </Form>
    </div>
  );
};

export default NewsletterForm;
