import { ReviewForCard } from "@/types/types";
import { create } from "zustand";

type Store = {
  isOpenAddReviewForm: boolean;
  setOpenAddReviewForm: (value: boolean) => void;

  review: ReviewForCard | null;
  setReview: (review: ReviewForCard) => void;
  clearReview: () => void;
};

export const useStore = create<Store>()((set) => ({
  isOpenAddReviewForm: false,
  setOpenAddReviewForm: (value: boolean) =>
    set(() => ({ isOpenAddReviewForm: value })),

  review: null,
  setReview: (review?: ReviewForCard) => set({ review: review }),
  clearReview: () => set({ review: null }),
}));
