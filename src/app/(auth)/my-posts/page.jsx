import MyPostsPage from "@/components/Pages/User/MyPosts";

export const metadata = {
  title: `My Posts ${process.env.PAGE_TITLE}`,
};

export default function Page() {
  return <MyPostsPage />;
}
