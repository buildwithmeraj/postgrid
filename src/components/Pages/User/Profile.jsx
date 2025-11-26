import LogoutButton from "@/components/Shared/LogoutButton";
import { getUser } from "@/components/Shared/User";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HiUserCircle } from "react-icons/hi";
import { PiListHeartFill } from "react-icons/pi";

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) redirect("/login");

  return (
    <div className="flex flex-col items-center gap-8 p-6">
      <div className="w-full max-w-sm bg-base-100 border border-base-300 rounded-2xl shadow-md p-6 text-center">
        <h1 className="mb-4">Profile</h1>

        <img
          src={
            user?.image
              ? user?.image
              : "https://i.ibb.co.com/4n2tvyLH/user-1.png"
          }
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-primary shadow-md mx-auto"
          referrerPolicy="no-referrer"
        />

        <h5 className="mt-4 text-lg font-semibold">{user?.name}</h5>
        <p className="text-sm">{user?.email}</p>
        <div className="flex items-center gap-1 lg:gap-2 justify-center mt-4">
          <Link href="/my-posts" className="btn btn-accent">
            <PiListHeartFill className="text-xl" />
            My Posts
          </Link>
          <LogoutButton className="btn btn-error" />
        </div>
      </div>
    </div>
  );
}
