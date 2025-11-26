import "./globals.css";
import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";
import ThemeProvider from "@/components/Shared/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: process.env.SITE_NAME,
  description: "Turn your thoughts into stories worth sharing.",
};

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={roboto.className}>
      <body className="flex flex-col min-h-screen">
        <SessionProvider>
          <ThemeProvider>
            <header>
              <Navbar />
            </header>
            <main className="flex-1 px-[3%] xl:px-[7%] py-[2%] pt-20">
              {children}
            </main>
            <Toaster position="bottom-center" reverseOrder={false} />
            <Footer />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
