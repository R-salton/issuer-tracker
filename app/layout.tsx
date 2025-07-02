import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import "./theme-config.css"
import NavaBar from "./navbar";

import { Theme, ThemePanel } from "@radix-ui/themes";


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
        <Theme>

        <NavaBar />
        <main>{children}</main>
        {/* <ThemePanel /> */}
        
        </Theme>
        
      </body>
    </html>
  );
}
