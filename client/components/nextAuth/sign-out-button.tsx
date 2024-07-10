import { FC } from "react";
import { signOutAction } from "@/actions";
import { cn } from "@/lib/utils";

interface SignoutButtonProps extends React.HTMLAttributes<HTMLFormElement> {}

const SignoutButton: FC<SignoutButtonProps> = ({ className, ...rest }) => {
  return (
    <form
      {...rest}
      className={cn("text-primary-foreground text-xl font-normal", className)}
      action={signOutAction}
    >
      <button type="submit">Sign out</button>
    </form>
  );
};

export default SignoutButton;
