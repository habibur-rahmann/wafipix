import AddReviewAddvertisingBox from "@/components/pages/reviews/add-review-addvertising-box";
import { Loader2 } from "lucide-react";
import { FC, Suspense } from "react";
import MyReviews from "../../components/pages/reviews/my-reviews";
import AllReviews from "../../components/pages/reviews/all-reviews";
import SectionSeparator from "@/components/global/section-separator";
import { auth } from "@/auth";

interface ReviewsProps {}
const Reviews: FC<ReviewsProps> = async ({}) => {
  const session = await auth();
  return (
    <div>
      {/* a card to add a review */}
      <div className="p-4">
        <Suspense fallback={AddReviewAddvertisingBoxFallback}>
          <AddReviewAddvertisingBox />
        </Suspense>
      </div>
      {/* all reviews list */}
      <div className="space-y-4 p-4">
        {session ? <MyReviews /> : null}
        <AllReviews />
      </div>
      <SectionSeparator />
    </div>
  );
};

export default Reviews;

const AddReviewAddvertisingBoxFallback = (
  <div className="min-h-72 bg-accent2/10 border-accent2/40 flex items-center justify-center">
    <Loader2 className="h-6 w-6 animate-spin duration-1000" />
  </div>
);
