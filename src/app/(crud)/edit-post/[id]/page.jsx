import EditPostPage from "@/components/Pages/User/EditPost";

export const metadata = {
  title: `Edit Post ${process.env.PAGE_TITLE}`,
};

export default function Page() {
  return <EditPostPage />;
}
