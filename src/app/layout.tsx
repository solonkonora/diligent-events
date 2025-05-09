import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "@/lib/context";
import { Toaster } from "react-hot-toast";
// import Header from "@/components/header";
// import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Professional Hostess & Protocol Agency",
  description:
    "Elevate your events with our professional hostesses and protocol officers. We ensure your guests receive the highest level of service and attention.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            {/* <Header /> */}
            {children}
            <Toaster position="top-center" />
            {/* <Footer /> */}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
