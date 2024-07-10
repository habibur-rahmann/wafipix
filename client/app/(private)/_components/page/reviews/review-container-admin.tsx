import { FC } from "react";
import ReviewCardsAdmin from "./review-cards-admin";
import SectionSeparator from "@/components/global/section-separator";

interface ReviewContainerAdminProps {}

const ReviewContainerAdmin: FC<ReviewContainerAdminProps> = ({}) => {
  return (
    <div className="p-4">
      <ReviewCardsAdmin />
      <SectionSeparator />
    </div>
  );
};

export default ReviewContainerAdmin;
