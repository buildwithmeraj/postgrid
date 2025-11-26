import CTA from "@/components/Home/CTA";
import Features from "@/components/Home/Features";
import Hero from "@/components/Home/Hero";
import RecentPosts from "@/components/Home/RecentPosts";
import Stats from "@/components/Home/Stats";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <h1 className="my-8">Recent Posts</h1>
      <RecentPosts />
      <p className="text-center mt-6">
        <Link href="/posts" className="btn btn-primary">
          More Posts
          <ArrowRight size={20} />
        </Link>
      </p>
      <Stats />
      <CTA />
    </>
  );
}
