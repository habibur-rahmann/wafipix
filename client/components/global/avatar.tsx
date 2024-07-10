import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUsernameFallbackCharacter } from "@/lib/utils";

import { FC } from "react";

interface ProfileAvatarProps {
  avatar_url: string;
  user_name: string;
}

const ProfileAvatar: FC<ProfileAvatarProps> = ({ avatar_url, user_name }) => {
  return (
    <Avatar>
      <AvatarImage src={avatar_url || "https://github.com/shadcn.png"} alt={user_name || "profile image"} />
      <AvatarFallback>{getUsernameFallbackCharacter(user_name)}</AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
