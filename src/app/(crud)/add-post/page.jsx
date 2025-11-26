import AddPostPage from "@/components/Pages/User/AddPost";

export const metadata = {
  title: `Add Post ${process.env.PAGE_TITLE}`,
};

export default function Page() {
  return <AddPostPage />;
}
