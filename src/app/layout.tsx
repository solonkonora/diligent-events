import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AppContextProvider } from "@/lib/context";
// import Header from "@/components/header";
// import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
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
    <html>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AppContextProvider>
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
          </AppContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
