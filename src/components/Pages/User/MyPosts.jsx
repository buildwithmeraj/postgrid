"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Link from "next/link";
import Loading from "@/components/Utilities/Loading";
import { MdDelete, MdModeEdit, MdPostAdd } from "react-icons/md";
import { Fade } from "react-awesome-reveal";
import { PiWarningOctagonBold } from "react-icons/pi";

export default function MyPostsPage() {
  const { data: session, status } = useSession();
  const axiosSecure = useAxiosSecure();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toastShown, setToastShown] = useState(false);

  // Fetch posts for logged-in user
  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get("/api/my-posts");
        setPosts(res.data);

        if (res.data.length === 0 && !toastShown) {
          toast("You haven't created any posts yet.", {
            icon: "ℹ️",
          });
          setToastShown(true);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [axiosSecure, status]);

  const handleDelete = (post) => {
    setSelectedPost(post);
  };

  const confirmDelete = async () => {
    if (!selectedPost) return;
    setDeleting(true);
    try {
      await axiosSecure.delete(`/api/posts/${selectedPost._id}`);
      toast.success(`Deleted "${selectedPost.title}" successfully.`);
      setPosts((prev) => prev.filter((p) => p._id !== selectedPost._id));
      setSelectedPost(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post");
    } finally {
      setDeleting(false);
    }
  };

  if (status === "loading" || loading) {
    return <Loading />;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please log in to view your posts.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] py-10 lg:px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className=" mb-6">
          My Posts {posts.length === 0 ? "" : `(${posts.length})`}
        </h1>

        {posts.length === 0 ? (
          <Fade cascade>
            <div className="flex items-center justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex items-center flex-col text-base-content/70">
                <PiWarningOctagonBold size={100} className="" />
                <p className="text-2xl font-semibold">No posts found</p>
                <Link className="btn btn-success mt-4" href="/add-post">
                  <MdPostAdd className="text-xl mb-0.5" />
                  Add your first post
                </Link>
              </div>
            </div>
          </Fade>
        ) : (
          <div>
            <div className="overflow-x-auto shadow-lg rounded-lg bg-base-100 border border-base-300">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Views</th>
                    <th>Created At</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr
                      key={post._id}
                      className="hover:bg-base-200/50 transition-colors"
                    >
                      <td className="font-semibold">
                        <Link
                          href={`/posts/${post._id}`}
                          className="hover:text-secondary"
                        >
                          {post.title}
                        </Link>
                      </td>
                      <td>{post.category}</td>
                      <td>{post.views}</td>
                      <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                      <td className="flex justify-center gap-2">
                        <Link
                          href={`/edit-post/${post._id}`}
                          className="btn btn-sm btn-primary"
                        >
                          <MdModeEdit />
                          Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-error"
                          onClick={() => handleDelete(post)}
                        >
                          <MdDelete />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="py-6 text-center">
              <Link className="btn btn-success" href="/add-post">
                <MdPostAdd className="text-xl mb-0.5" />
                Add Post
              </Link>
            </div>
          </div>
        )}
      </div>

      {selectedPost && (
        <div className="modal modal-open">
          <div className="modal-box bg-base-100 border border-base-300 max-w-md">
            <h3 className="font-bold text-lg text-error mb-3">
              Confirm Delete
            </h3>
            <p>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{selectedPost.title}</span>?
            </p>
            <div className="modal-action">
              <button
                onClick={() => setSelectedPost(null)}
                className="btn btn-ghost"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className={`btn btn-error ${deleting ? "loading" : ""}`}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop bg-black/50"
            onClick={() => setSelectedPost(null)}
          />
        </div>
      )}
    </div>
  );
}
