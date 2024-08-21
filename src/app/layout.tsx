import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Codebrwn",
  description: "Official website for codebrwn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="" lang="en">
      <head>
        <meta name="viewport" content="width=device-width, maximum-scale=1.0" />
      </head>
      <body className="max-w-full">
        <div className="flex min-h-screen flex-col overflow-x-clip">
          <Providers>
            <Navbar />
            {children}
          </Providers>
          <Toaster />
          <Footer />
        </div>
      </body>
    </html>
  );
}
