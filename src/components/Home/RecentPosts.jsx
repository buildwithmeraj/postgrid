import Link from "next/link";
import React from "react";
import PostCard from "../Shared/PostCard";
import NoPosts from "../Utilities/NoPosts";

export default async function RecentPosts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts?limit=6`,
    {
      cache: "no-store",
    }
  );

  const posts = await res.json();

  return (
    <div>{posts.length < 1 ? <NoPosts /> : <PostCard posts={posts} />}</div>
  );
}
