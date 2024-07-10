"use client";

import { useSession } from "next-auth/react";

export const useAccessToken = () => {
  const { data } = useSession();
  return data?.user?.accessToken;
};
