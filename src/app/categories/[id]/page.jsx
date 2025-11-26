import CategoryPage from "@/components/Pages/Shared/Category";

export const metadata = {
  title: `Categroy ${process.env.PAGE_TITLE}`,
  description: `View all posts from a category of ${process.env.SITE_NAME}`,
};

export default function Page() {
  return <CategoryPage />;
}
