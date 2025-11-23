import { auth, signIn, signOut } from "@/auth";

export default async function SignIn() {
  const session = await auth();
  const user = session?.user;
  return !user ? (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  ) : (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
}
