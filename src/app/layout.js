import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";

export const metadata = {
  title: process.env.SITE_NAME,
  description: "Turn your thoughts into stories worth sharing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <header>
          <Navbar />
        </header>
        <main className="flex-1 px-[3%] xl:px-[7%] py-[2%] pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
