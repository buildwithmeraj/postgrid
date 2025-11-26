import Register from "@/components/Pages/Auth/Register";

export const metadata = {
  title: `Register ${process.env.PAGE_TITLE}`,
  description: `Register page of ${process.env.SITE_NAME}`,
};

export default function Page() {
  return <Register />;
}
