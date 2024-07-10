import { FC } from "react";
import SigninButton from "../nextAuth/sign-in-button";
import UserDropdownOptions from "../global/user-dropdown-options";
import ProfileAvatar from "../global/avatar";
import { Session } from "next-auth";
import InputMessage from "../global/input-message";

interface AuthFloatingButtonProps {
  session: Session | null;
}

const AuthFloatingButton: FC<AuthFloatingButtonProps> = ({ session }) => {
  return (
    <div className="fixed top-4 right-20 h-fit p-1 w-fit rounded-full bg-transparent z-20 flex items-center justify-center">
      <div className="">
        {!session ? (
          <SigninButton className="text-secondary-foreground"/>
        ) : session?.user?.accessToken ? (
          <UserDropdownOptions isAdmin={session.user.role === 'ADMIN'}>
            <ProfileAvatar
              avatar_url={session?.user?.image!}
              user_name={session?.user?.name!}
            />
          </UserDropdownOptions>
        ) : (
          <InputMessage message="Something wrong in auth system" />
        )}
      </div>
    </div>
  );
};

export default AuthFloatingButton;
