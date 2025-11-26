import ProfilePage from "@/components/Pages/User/Profile";

export const metadata = {
  title: `Profile ${process.env.PAGE_TITLE}`,
};

export default function Page() {
  return <ProfilePage />;
}
