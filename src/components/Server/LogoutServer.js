"use server";

import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function logoutServerAction() {
  await signOut({ redirect: false });
  redirect("/login");
}
