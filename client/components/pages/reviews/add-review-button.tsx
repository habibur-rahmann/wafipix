"use client";
import { useStore } from "@/components/hooks/zustant/store";
import { Star } from "lucide-react";
import { FC } from "react";

interface AddReviewButtonProps {}

const AddReviewButton: FC<AddReviewButtonProps> = ({}) => {
  const { setOpenAddReviewForm } = useStore();

  return (
    <div
      onClick={() => setOpenAddReviewForm(true)}
      className=" group w-full md:w-96 p-4 px-8 text-xl bg-accent2 text-primary-foreground hover:bg-accent2/80 flex gap-2 items-center justify-center"
    >
      <span>Add a review</span>{" "}
      <Star className="h-5 w-5 text-#ffa534 group-hover:ml-4 group-hover:scale-110 duration-300" />
    </div>
  );
};

export default AddReviewButton;
