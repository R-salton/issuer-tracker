import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import "./theme-config.css"
import NavaBar from "./navbar";

import { Theme, ThemePanel } from "@radix-ui/themes";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "./AuthProvider";


const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "issue tracker",
  description: "Create and track issues easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body
          className="font-poppins"
      >
        <AuthProvider>
        <Theme>

        <NavaBar />

        <main>
          <section>
            
          {children}
          </section>
          </main>
        {/* <ThemePanel /> */}
        
        </Theme>

        <script src="https://kit.fontawesome.com/d9d509c70a.js" crossOrigin="anonymous"></script>
        </AuthProvider>
      </body>
    </html>
  );
}
