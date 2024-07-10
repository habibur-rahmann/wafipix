import { FC } from "react";
import { signInAction } from "@/actions";
import { cn } from "@/lib/utils";

interface SigninButtonProps extends React.HTMLAttributes<HTMLFormElement> {}

const SigninButton: FC<SigninButtonProps> = ({ className, ...rest }) => {
  return (
    <form
      {...rest}
      className={cn("text-primary-foreground text-xl font-normal", className)}
      action={signInAction}
    >
      <button type="submit">Sign in</button>
    </form>
  );
};

export default SigninButton;
