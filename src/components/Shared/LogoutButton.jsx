"use client";

import toast from "react-hot-toast";
import { logoutServerAction } from "../Server/LogoutServer";
import { FaSignInAlt } from "react-icons/fa";

export default function LogoutButton({ className = "" }) {
  async function handleLogout() {
    toast.success("Logged out successfully!");
    await logoutServerAction();
  }

  return (
    <button onClick={handleLogout} className={className}>
      <FaSignInAlt className="text-lg" />
      Log Out
    </button>
  );
}
