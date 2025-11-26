"use client";

import PostCard from "@/components/Shared/PostCard";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "@/components/Utilities/Loading";
import NoPosts from "@/components/Utilities/NoPosts";

const CategoryPage = () => {
  const params = useParams();
  const id = params.id;
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategoryAndPosts = async () => {
      setLoading(true);
      setError("");

      try {
        // Fetch category
        const catRes = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories/${id}`
        );
        if (!catRes.ok) {
          setError("Category not found");
          setLoading(false);
          return;
        }
        const catData = await catRes.json();
        setCategory(catData);

        // Fetch posts for this category
        const postRes = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/category/${id}`
        );
        const postData = await postRes.json();
        setPosts(postData);
        console.log(postData);
      } catch (err) {
        console.error(err);
        setError("Failed to load category or posts");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndPosts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-error mb-2">Oops!</h2>
        <p className="text-lg mb-4">{error}</p>
        <Link href="/" className="btn btn-primary">
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-center">{category.name}</h2>

      {posts.length < 1 ? <NoPosts /> : <PostCard posts={posts} />}
    </div>
  );
};

export default CategoryPage;
