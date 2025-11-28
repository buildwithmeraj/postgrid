"use client";

import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import Link from "next/link";
import { GrView } from "react-icons/gr";
import { TbUserFilled } from "react-icons/tb";
import { IoMdPricetag } from "react-icons/io";
import { MdClear, MdDateRange } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { PiWarningOctagonBold } from "react-icons/pi";
import { IoReader } from "react-icons/io5";

export default function PostsPage({ posts = [], filter = false }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Unique values
  const categories = [...new Set(posts.map((p) => p.category))];

  // Run filters whenever states change
  useEffect(() => {
    let result = [...posts];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.content.toLowerCase().includes(q) ||
          post.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory) {
      result = result.filter((post) => post.category === selectedCategory);
    }

    setFilteredPosts(result);
  }, [searchQuery, selectedCategory, posts]);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  return (
    <div>
      {filter && (
        <div className="mb-10 flex flex-col lg:flex-row items-center gap-4 lg:px-50">
          <div className="relative lg:w-1/2">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl z-10" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pl-12"
            />
          </div>

          <div className="flex items-center gap-2 lg:w-1/2">
            <select
              className="select select-bordered w-full"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {filteredPosts.length > 0 ? (
        <Fade cascade>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post._id}
                className="card shadow-lg bg-base-100/80 border border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <figure className="relative w-full h-50">
                  <Link href={`/posts/${post._id}`}>
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="absolute bottom-2 right-2 py-1 px-2 bg-base-100/60 backdrop-blur-xl rounded-xl flex items-center gap-2">
                    <GrView /> {post.views || 0}
                  </div>
                </figure>

                <div className="card-body">
                  <h3 className="card-title text-xl">{post.title}</h3>
                  <p className="line-clamp-3">{post.content}</p>

                  <div className="flex flex-wrap justify-evenly gap-2 mt-2">
                    <span className="badge badge-outline p-3 gap-1">
                      <IoMdPricetag /> {post.category}
                    </span>

                    <span className="badge badge-outline p-3 gap-1">
                      <TbUserFilled /> {post.author.name}
                    </span>

                    <span className="badge badge-outline p-3 gap-1">
                      <MdDateRange /> {formatDate(post.createdAt)}
                    </span>
                  </div>

                  <Link
                    href={`/posts/${post._id}`}
                    className="btn btn-primary w-full mt-4 flex items-center gap-1.5"
                  >
                    <IoReader className="text-lg" />
                    Read Full Post <FaArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Fade>
      ) : (
        <div className="flex items-center justify-center">
          <Fade cascade>
            <div className="text-center flex items-center flex-col text-base-content/70 my-30">
              <PiWarningOctagonBold size={100} className="" />
              <p className="text-2xl font-semibold">No posts found</p>
            </div>
          </Fade>
        </div>
      )}
    </div>
  );
}
