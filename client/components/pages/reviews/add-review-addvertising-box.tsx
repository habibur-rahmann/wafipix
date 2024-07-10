import { FC } from "react";
import { MoveUp, Star } from "lucide-react";
import AddReviewButton from "./add-review-button";
import ReviewFormDialog from "./review-form-dialog";
import { auth } from "@/auth";
import SigninButton from "@/components/nextAuth/sign-in-button";

interface AddReviewAddvertisingBoxProps {}

const AddReviewAddvertisingBox: FC<
  AddReviewAddvertisingBoxProps
> = async ({}) => {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="h-fit w-full p-8 bg-accent2/10 border border-accent2/40 flex flex-col gap-4 lg:flex-row items-start overflow-hidden">
      {/* texts */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl lg:text-5xl text-primary lg:leading-snug">
            Assalamualaikum!
            {user ? (
              <span className="text-3xl lg:text-5xl text-accent2 font-semibold px-3">
                {user?.name!}
              </span>
            ) : (
              <span className="text-3xl lg:text-5xl text-accent2 font-semibold px-3">
                Brother.
              </span>
            )}
            Kindly say something good about us.
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Give us a review to help us and our customers to put full trust on us!
        </p>
      </div>

      {/* button */}
      <div className="w-full h-fit flex justify-end items-center">
        {user ? (
          <ReviewFormDialog>
            <AddReviewButton />
          </ReviewFormDialog>
        ) : (
          <div className="h-fit w-fit bg-accent2/20 p-4 rounded flex gap-2 items-center text-accent2 group">
            <h1 className="text-xl">Please sign in to add a review!</h1> <MoveUp className="h-8 w-8 px-2 group-hover:animate-bounce duration-1000" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddReviewAddvertisingBox;
