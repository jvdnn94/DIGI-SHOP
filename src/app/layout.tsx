
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavComp from "@/components/navComp";
import LayoutComp from "@/components/LayoutComp";
import {  ShopCartProvider } from "@/context/ShopCartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GOLD-SHOP",
  description: "GOLD-SHOP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
      </head>

      <body>
        <ShopCartProvider>
          <LayoutComp>
            {children}
          </LayoutComp>
        </ShopCartProvider>
      </body>
    </html>
  );
}
