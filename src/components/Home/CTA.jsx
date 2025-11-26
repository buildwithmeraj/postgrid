"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaFolderClosed } from "react-icons/fa6";
import { MdPostAdd } from "react-icons/md";

export default function CTA() {
  return (
    <section className="bg-primary/60 text-white py-20 px-4 rounded-xl">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Join our community today and start sharing your posts, reporting
          issues, and tracking solutions in real-time.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/add-post"
            className="btn btn-lg btn-neutral border border-neutral-content flex items-center gap-2"
          >
            <MdPostAdd />
            Post Now
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/categories"
            className="btn btn-lg btn-outline btn-white flex items-center gap-2"
          >
            <FaFolderClosed />
            Categories
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
