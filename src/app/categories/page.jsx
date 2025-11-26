import CategoriesPage from "@/components/Pages/Shared/Categories";

export const metadata = {
  title: `Categories ${process.env.PAGE_TITLE}`,
  description: `View All Categories of ${process.env.SITE_NAME}`,
};

export default function Page() {
  return <CategoriesPage />;
}
