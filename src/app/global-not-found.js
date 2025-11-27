import "./globals.css";
import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";
import ThemeProvider from "@/components/Shared/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: `Page Not Found ${process.env.SITE_NAME}`,
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning className={roboto.className}>
      <body className="flex flex-col min-h-screen">
        <SessionProvider>
          <ThemeProvider>
            <header>
              <Navbar />
            </header>
            <main className="flex-1 px-[3%] xl:px-[7%] py-[2%] pt-20">
              <h1 className="mt-2">Not Found</h1>
              <div className="flex justify-center items-center flex-col gap-0.5">
                <img src="/404.png" className="rounded-xl" />
                <div className="text-2xl px-12">
                  The page you are looking for does not exist! But you can
                  always visit{" "}
                  <a href="/" className="text-secondary">
                    HomePage
                  </a>{" "}
                  to find what are you looking.
                </div>
              </div>
            </main>
            <Toaster position="bottom-center" reverseOrder={false} />
            <Footer />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
