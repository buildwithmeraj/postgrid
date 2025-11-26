"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Loading from "@/components/Utilities/Loading";
import { ImCancelCircle } from "react-icons/im";
import { MdClear, MdCloudUpload } from "react-icons/md";
import Link from "next/link";

export default function EditPostPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const axiosSecure = useAxiosSecure();
  const dropdownRef = useRef(null);

  const postId = params.id;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosSecure.get("/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories");
      }
    };

    if (status === "authenticated") fetchCategories();
  }, [status, axiosSecure]);

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosSecure.get(`/api/posts/${postId}`);
        const post = res.data;
        setFormData({
          title: post.title,
          content: post.content,
          category: post.category,
          tags: post.tags || "",
          image: null,
        });
        setImagePreview(post.imageUrl || null);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch post data");
      }
    };

    if (status === "authenticated" && postId) fetchPost();
  }, [status, postId, axiosSecure]);

  // Filter categories
  useEffect(() => {
    if (formData.category) {
      const filtered = categories.filter((cat) =>
        cat.name.toLowerCase().includes(formData.category.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories([]);
    }
  }, [formData.category, categories]);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");

    if (name === "category") setShowDropdown(true);
  };

  const handleCategorySelect = (categoryName) => {
    setFormData((prev) => ({ ...prev, category: categoryName }));
    setShowDropdown(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToImgBB = async (imageFile) => {
    const form = new FormData();
    form.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      { method: "POST", body: form }
    );
    const data = await res.json();
    if (!data.success)
      throw new Error(data.error?.message || "Image upload failed");
    return data.data.url;
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("Title is required");
      return false;
    }
    if (!formData.content.trim()) {
      setError("Content is required");
      return false;
    }
    if (!formData.category.trim()) {
      setError("Category is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError("");

    try {
      let imageUrl = imagePreview; // use existing if no new upload

      if (formData.image) {
        setIsUploading(true);
        try {
          imageUrl = await uploadImageToImgBB(formData.image);
        } catch (imgErr) {
          setError(imgErr.message);
          setIsUploading(false);
          setIsSubmitting(false);
          return;
        }
        setIsUploading(false);
      }

      // Handle category
      const categoryExists = categories.find(
        (cat) => cat.name.toLowerCase() === formData.category.toLowerCase()
      );
      let categoryId;
      if (!categoryExists) {
        const res = await axiosSecure.post("/api/categories", {
          name: formData.category,
        });
        categoryId = res.data._id;
        setCategories((prev) => [...prev, res.data]);
      } else {
        categoryId = categoryExists._id;
      }

      // Update post
      await axiosSecure.put(`/api/posts/${postId}`, {
        title: formData.title.trim(),
        content: formData.content.trim(),
        category: formData.category.trim(),
        categoryId,
        imageUrl,
      });

      toast.success("Post updated successfully!");
      router.push("/my-posts");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update post");
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-base-100 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Edit Post</h1>

        {error && (
          <div className="alert alert-error alert-soft mb-6">
            <ImCancelCircle />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="label">
              <span className="label-text font-semibold">Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Post Title"
              className="input input-bordered w-full"
              disabled={isSubmitting || isUploading}
            />
          </div>

          <div className="w-full relative" ref={dropdownRef}>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Category</span>
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                onFocus={() => setShowDropdown(true)}
                placeholder="Category"
                className="input input-bordered w-full"
                disabled={isSubmitting || isUploading}
              />
              {showDropdown && filteredCategories.length > 0 && (
                <ul className="absolute z-10 bg-base-100 border border-base-300 rounded-lg mt-1 max-h-48 overflow-y-auto w-full shadow-lg">
                  {filteredCategories.map((cat) => (
                    <li
                      key={cat._id}
                      onClick={() => handleCategorySelect(cat.name)}
                      className="px-4 py-2 hover:bg-base-200 cursor-pointer"
                    >
                      {cat.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold">Content</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Post Content"
              className="textarea textarea-bordered h-64 w-full"
              disabled={isSubmitting || isUploading}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold">
                New Featured Image
              </span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
              disabled={isSubmitting || isUploading}
            />
          </div>
          {imagePreview && (
            <div>
              <h1>Current Image</h1>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-h-64 object-cover rounded-lg mt-4"
              />
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || isUploading}
              className="btn btn-primary flex-1"
            >
              <MdCloudUpload className="text-xl" />

              {isUploading
                ? "Uploading Image..."
                : isSubmitting
                ? "Updating Post..."
                : "Update Post"}
            </button>
            <Link
              href="/my-posts"
              onClick={() => router.back()}
              disabled={isSubmitting || isUploading}
              className="btn btn-error bg-error/80"
            >
              <MdClear className="text-lg" />
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
