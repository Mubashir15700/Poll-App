import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ReduxProvider } from "@/redux/provider";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Polling App",
  description: "My polling app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <Toaster position="bottom-center" />
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
