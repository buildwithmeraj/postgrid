import React from "react";
import Logo from "../Utilities/Logo";
import Link from "next/link";

function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center py-10  backdrop-blur-lg ">
      <aside>
        <Logo />
        <p className="font-bold">
          Turn your thoughts into stories worth sharing.
        </p>
        <div className="flex items-center gap-4 py-2 font-semibold text-secondary text-lg">
          <Link href="/categories">Categories</Link>
          <Link href="/posts">Recent Posts</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
        <p className="footer-divider h-9 w-96"></p>
        <p className="">
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>
      </aside>
      <nav></nav>
    </footer>
  );
}

export default Footer;
