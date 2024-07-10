import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import JWT from "jsonwebtoken";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  trustHost: true,
  callbacks: {
    async signIn({ account, user, profile }) {

      if (account?.provider === "google") {
        if (!profile) return false;

        const { name, email, sub, email_verified, picture } = profile;
        const data = { sub, email, name, picture, email_verified };

        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login/google`;

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
          });

          if (!response.ok) {
            console.log("Error-from-google-provider-signin ", response);
            return false;
          }

          const responseData = await response.json();

          user.accessToken = responseData.token;
          user.role = responseData.role;

          return true;
        } catch (error) {
          console.log("Error-from-google-provider-signin ", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken as string;
        session.user.role = token.role as any;
      }
      return session;
    },
  },
});
