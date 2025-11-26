export const metadata = {
  title: `Login ${process.env.PAGE_TITLE}`,
  description: `Login page of ${process.env.SITE_NAME}`,
};

import Login from "@/components/Pages/Auth/Login";

export default function Page() {
  return <Login />;
}
