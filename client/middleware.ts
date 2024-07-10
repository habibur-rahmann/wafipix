import { auth } from "@/auth";

import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest, res: NextResponse) => {
  const { nextUrl } = req;
  const session = await auth();
  const user = session?.user;

  const isAdmin = user?.role === "ADMIN";

  const loginPageUrl = new URL("/api/auth/login?", nextUrl.origin);

  const homePageUrl = new URL("/", nextUrl.origin);

  if (nextUrl.pathname.includes("dashboard")) {
    if (!user) return NextResponse.redirect(loginPageUrl);

    if (!isAdmin && user) return NextResponse.redirect(homePageUrl);

    NextResponse.next();
  }
};
