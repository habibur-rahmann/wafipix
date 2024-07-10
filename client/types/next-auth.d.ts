import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session extends Session {
    user: {
      name: string;
      email: string;
      image: string;
      accessToken: string;
      role: string;
    };
  }
  interface User {
    accessToken: string | null;
    role: "ADMIN" | "MODERATOR" | "USER";
  }
}
