import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import GlobalContextProvider from "@/components/contextProvider/contextProvider";
import TawkMessanger from "@/components/tawak-messanger/tawak-messanger";
import { Toaster } from "@/components/ui/toaster";
import TopLoader from "nextjs-toploader";
import Footer from "@/components/global/footer";
import NavBox from "@/components/global/nav/nav-box";
import Header from "@/components/global/header";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import AuthFloatingButton from "@/components/auth/auth-floating-button";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wafipix | A Design Agency",
  description:
    "Wafipix is a design agency that provides services in web design, graphic design, and branding. And  we bring your ideas to life. And many more...",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <SessionProvider session={session}>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <GlobalContextProvider>
                <TopLoader height={5} color="#5025D0" />

                <NavBox />
                <AuthFloatingButton session={session} />

                <Header />

                <main className="min-h-fullScreenWithoutNavbar">
                  {children}
                </main>

                {/* footer */}
                <Footer />

                {/* Toaster */}
                <Toaster />
                <TawkMessanger />
              </GlobalContextProvider>
            </ThemeProvider>
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
