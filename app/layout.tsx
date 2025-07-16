import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import "./theme-config.css"
import NavaBar from "./navbar";

import { Theme, ThemePanel } from "@radix-ui/themes";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "./AuthProvider";
import QueryClientProvider from "./Query ClientProvider";


const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: {
    default: 'Issue Tracker',
    template: '%s | Issue Tracker',
  },
  description:
    'Effortlessly track, assign, and resolve issues with our powerful and collaborative issue tracking platform.',
  keywords: ['issue tracking', 'bug tracker', 'project management', 'collaboration', 'Next.js'],
  authors: [
    {
      name: 'Sadev',
      url: 'https://github.com/R-salton',
    },
  ],
  creator: 'Salton',
  metadataBase: new URL('https://your-app-domain.com'),
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
        <QueryClientProvider>
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
        </QueryClientProvider>
      </body>
    </html>
  );
}
