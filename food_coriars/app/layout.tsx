import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";
import Providers from "./providers";
import { ToastContainer } from "react-toastify";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Foodie | Order Fresh Food",
  description: "Best food delivery app",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-gray-50 text-gray-900`}>
        <Providers>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}