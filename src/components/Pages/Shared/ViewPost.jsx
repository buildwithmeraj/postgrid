"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import Loading from "@/components/Utilities/Loading";
import { FaFolderClosed } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";

export default function PostPage() {
  const params = useParams();
  const id = params?.id;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/${id}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch post");
        }

        const data = await res.json();
        setPost(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message);
        toast.error("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    const incrementViews = async () => {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/posts/${id}/view`,
          {
            method: "POST",
          }
        );
      } catch (err) {
        console.error("Failed to register view", err);
      }
    };

    fetchPost();
    incrementViews();
  }, [id]);

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt || post.title,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("Shared successfully!");
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 flex flex-col items-center justify-center gap-6 px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold mb-2">Post Not Found</h2>
          <p className="text-base-content/70 mb-6">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/posts" className="btn btn-primary">
            Browse All Posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="max-w-4xl mx-auto px-4 relative z-10 pb-16">
        <div className="bg-base-100 rounded-2xl shadow-2xl p-6 sm:p-10">
          <h3 className="text-2xl lg:text-3xl font-boold mb-6 leading-tight">
            {post.title}
          </h3>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-base-content/70 mb-8 pb-8 border-b border-base-300 justify-between">
            <div className="flex items-center gap-2">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-10 flex items-center justify-center">
                  <span className="text-lg">
                    {post.author?.name?.[0] || "A"}
                  </span>
                </div>
              </div>
              <div>
                <p className="font-semibold text-base-content">
                  {post.author?.name || "Anonymous"}
                </p>
                <p className="text-xs">{post.author?.email}</p>
              </div>
            </div>
            <div className="flex flex-row lg:flex-col items-center gap-6 lg:gap-1">
              <div className="flex items-center gap-1">
                <GrView />
                <span>{post.views || 0} views</span>
              </div>

              <div className="flex items-center gap-1">
                <MdDateRange />
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {post.imageUrl && (
            <div className="relative w-full h-full pb-4">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}

          <article className="prose prose-lg max-w-none">
            <div className="text-base-content leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          </article>

          <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-base-300 justify-center">
            <button onClick={handleShare} className="btn btn-outline gap-2">
              <FaShareAlt />
              Share
            </button>

            <Link
              href={`/categories/${post.categoryId}`}
              className="btn btn-primary gap-2"
            >
              <FaFolderClosed />
              {post.category}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
