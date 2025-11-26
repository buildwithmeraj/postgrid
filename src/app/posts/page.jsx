import Posts from "@/components/Pages/Shared/Posts";

export const metadata = {
  title: `Recent Posts ${process.env.PAGE_TITLE}`,
  description: `View recent posts of ${process.env.SITE_NAME}`,
};

export default function Page() {
  return <Posts />;
}
