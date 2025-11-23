import { signOut } from "@/auth";
import React from "react";

const page = () => {
  return (
    <div>
      Profile
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
};

export default page;
