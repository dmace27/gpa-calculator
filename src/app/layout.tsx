import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import TopNavBar from "@/components/TopNavBar";
import "./globals.css";
import { GPAProvider } from "@/context/GPAContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CYHS GPA Calculator",
  description: "GPA Calculator for Central York High School",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geistSans.variable}>
        <TopNavBar
          sections={[
            { id: "year-9", label: "Freshman" },
            { id: "year-10", label: "Sophomore" },
            { id: "year-11", label: "Junior" },
            { id: "year-12", label: "Senior" },
          ]}
        />

        <GPAProvider>
          <main>{children}</main>
        </GPAProvider>
      </body>
    </html>
  );
}
