import PostPage from "@/components/Pages/Shared/ViewPost";

export const metadata = {
  title: `View Post ${process.env.PAGE_TITLE}`,
  description: `View a post at ${process.env.SITE_NAME}`,
};

export default function Page() {
  return <PostPage />;
}
