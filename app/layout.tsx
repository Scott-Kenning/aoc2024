import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "./components/Header";
import Sidebar from "./components/Sidebar";
import fs from "fs";
import path from "path";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Advent of Code Solutions",
  description: "This is a website that hosts my solutions to all of the Advent of Code 2024 problems",
};

function getDaysFromSolutionsFolder(): string[] {
  const solutionsDir = path.join(process.cwd(), "solutions");
  const files = fs.readdirSync(solutionsDir);
  return files.filter((file) => file.startsWith("day"));
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const days = getDaysFromSolutionsFolder();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased text-gray-800 overflow-hidden`}>
        <div className="flex flex-col h-screen">
          <Header />

          <div className="flex flex-1 overflow-hidden">
            <Sidebar days={days} />

            <main className="flex-1 p-4 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
