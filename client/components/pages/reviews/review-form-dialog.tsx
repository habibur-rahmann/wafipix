"use client";

import { useStore } from "@/components/hooks/zustant/store";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { FC } from "react";
import ReviewForm from "./review-form";

interface ReviewFormDialogProps {
  children: React.ReactNode;
}

const ReviewFormDialog: FC<ReviewFormDialogProps> = ({ children }) => {
  const { isOpenAddReviewForm, setOpenAddReviewForm, clearReview } = useStore();

  const handleOpenClose = (value: boolean) => {
    if (!value) clearReview();
    setOpenAddReviewForm(value);
  };

  return (
    <Dialog open={isOpenAddReviewForm} onOpenChange={handleOpenClose} modal>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <ReviewForm />
      </DialogContent>
    </Dialog>
  );
};

export default ReviewFormDialog;
