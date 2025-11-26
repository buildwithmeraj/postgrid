import React from "react";
import Logo from "../Utilities/Logo";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { getUser } from "./User";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";
import "animate.css";
import { IoMdAdd } from "react-icons/io";
import { PiListHeartFill } from "react-icons/pi";

async function Navbar() {
  const user = await getUser();
  const links = (
    <>
      <li>
        <Link href="/" className="w-full">
          Home
        </Link>
      </li>
      <li>
        <Link href="/categories" className="w-full">
          Categories
        </Link>
      </li>
      <li>
        <Link href="/posts" className="w-full">
          Recent Posts
        </Link>
      </li>
      <li>
        <Link href="/add-post" className="w-full">
          Add Post
        </Link>
      </li>
      <li>
        <Link href="/privacy" className="w-full">
          Privacy
        </Link>
      </li>
    </>
  );
  return (
    <nav
      className="navbar fixed top-0 left-0 z-50 w-full px-[4%] xl:px-[7%]
        bg-base-100/70 backdrop-blur-lg shadow-sm
        transition-all duration-300"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <Link
          className="text-xl animate__animated animate__infinite animate__slow	 animate__pulse"
          href="/"
        >
          <Logo />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-center hidden md:flex">
            <div tabIndex={0} role="button" className="avatar cursor-pointer">
              <div className="w-10 rounded-full">
                <img src={user?.image} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-200 rounded-2xl z-1 w-52 mt-1"
            >
              <li className="border-b border-neutral/50 pb-0.5">
                <Link href="/profile" className="w-full">
                  <FaUser />
                  Profile
                </Link>
              </li>
              <li className="border-b border-neutral/50 py-1">
                <Link href="/add-post" className="w-full">
                  <IoMdAdd className="text-lg -mr-1" />
                  Add Post
                </Link>
              </li>
              <li className="border-b border-neutral/50 py-1">
                <Link href="/my-posts" className="w-full">
                  <PiListHeartFill className="text-xl -mr-1" />
                  My Posts
                </Link>
              </li>
              <li className="flex items-center justify-center text-center pt-0.5">
                <LogoutButton className="text-center text-error font-semibold cursor-pointer" />
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary">
            <FaSignInAlt />
            Login
          </Link>
        )}
        <ThemeSwitcher />
      </div>
    </nav>
  );
}

export default Navbar;
