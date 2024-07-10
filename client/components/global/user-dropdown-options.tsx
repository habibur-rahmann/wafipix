"use client";

import React, { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import SignoutButton from "../nextAuth/sign-out-button";

interface UserDropdownOptionsProps {
  children: React.ReactNode;
  isAdmin: boolean;
}

const UserDropdownOptions: FC<UserDropdownOptionsProps> = ({
  children,
  isAdmin,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 space-y-2">
        <DropdownMenuItem>
          <Link href="/profile" className="h-full w-full p-2 text-xl">
            Profile
          </Link>
        </DropdownMenuItem>
        {isAdmin ? (
          <DropdownMenuItem>
            <Link href="/dashboard" className="h-full w-full p-2 text-xl">
              Dashboard
            </Link>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem>
          <SignoutButton className="h-full w-full p-2 text-xl text-primary" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdownOptions;
