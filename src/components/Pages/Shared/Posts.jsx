import PostCard from "@/components/Shared/PostCard";
import NoPosts from "@/components/Utilities/NoPosts";
import React from "react";

const Posts = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/posts`, {
    cache: "no-store",
  });

  const posts = await res.json();

  return (
    <div>
      <h2>Recent Posts</h2>
      {posts.length < 1 ? (
        <NoPosts />
      ) : (
        <PostCard posts={posts} filter={true} />
      )}
    </div>
  );
};

export default Posts;
