"use client";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import ScrollToTop from "@/src/components/ScrollToTop";
import SupabaseProvider from "@/src/components/Provider";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-gray-950 ${inter.className}`}>
        <HeroUIProvider>
          <ThemeProvider
            enableSystem={false}
            attribute="class"
            defaultTheme="dark"
          >
            <SupabaseProvider>
              <Header />
              <ToastProvider />
              {children}
              <Footer />
              <ScrollToTop />
            </SupabaseProvider>
          </ThemeProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
