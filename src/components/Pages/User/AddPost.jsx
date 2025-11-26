"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { MdClear, MdPostAdd } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { WiStars } from "react-icons/wi";
import { FaFolderClosed } from "react-icons/fa6";
import toast from "react-hot-toast";
import Loading from "@/components/Utilities/Loading";
import Link from "next/link";

export default function AddPostPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const axiosSecure = useAxiosSecure();
  const dropdownRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    excerpt: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch existing categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosSecure.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories");
      }
    };

    if (status === "authenticated") {
      fetchCategories();
    }
  }, [status, axiosSecure]);

  // Filter categories based on input
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

    if (name === "category") {
      setShowDropdown(true);
    }
  };

  const handleCategorySelect = (categoryName) => {
    setFormData((prev) => ({ ...prev, category: categoryName }));
    setShowDropdown(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToImgBB = async (imageFile) => {
    const uploadFormData = new FormData();
    uploadFormData.append("image", imageFile);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: uploadFormData,
        }
      );

      const data = await response.json();
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error(data.error?.message || "Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error(`Image upload failed: ${error.message}`);
    }
  };

  const validateForm = () => {
    const trimmedTitle = formData.title?.trim();
    const trimmedContent = formData.content?.trim();
    const trimmedCategory = formData.category?.trim();
    const uploadedImage = formData.image;

    if (!trimmedTitle) {
      setError("Title is required");
      return false;
    }

    if (!trimmedContent) {
      setError("Content is required");
      return false;
    }

    if (!trimmedCategory) {
      setError("Category is required");
      return false;
    }

    if (!uploadedImage) {
      setError("Image is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      let imageUrl = "";

      // Upload image if exists
      if (formData.image) {
        setIsUploading(true);
        try {
          imageUrl = await uploadImageToImgBB(formData.image);
        } catch (imgError) {
          setError(imgError.message);
          setIsUploading(false);
          setIsSubmitting(false);
          return;
        }
        setIsUploading(false);
      }

      // Check if category exists, if not create it
      const categoryExists = categories.find(
        (cat) => cat.name.toLowerCase() === formData.category.toLowerCase()
      );

      let categoryId;

      if (!categoryExists) {
        try {
          const categoryResponse = await axiosSecure.post("/api/categories", {
            name: formData.category,
          });
          categoryId = categoryResponse.data._id;
          // Add new category to local state for future use
          setCategories((prev) => [...prev, categoryResponse.data]);
        } catch (catError) {
          setError("Failed to create category");
          setIsSubmitting(false);
          return;
        }
      } else {
        categoryId = categoryExists._id;
      }

      // Create post
      const postData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        category: formData.category.trim(),
        categoryId: categoryId,
        imageUrl: imageUrl,
        author: {
          name: session.user.name,
          email: session.user.email,
        },
      };

      await axiosSecure.post("/api/posts", postData);

      toast.success("Post created successfully!");
      router.push("/my-posts");
    } catch (error) {
      toast.error("Error creating post:", error);
      setError(
        error.response?.data?.message ||
          "Failed to create post. Please try again."
      );
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="py-10 px-4">
      <div className="max-w-3xl mx-auto bg-base-100 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Add New Post</h1>

        {error && (
          <div className="alert alert-error alert-soft mb-6">
            <ImCancelCircle />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-6">
          <div className="w-full">
            <label className="label">
              <span className="label-text font-semibold">Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              required
              onChange={handleInputChange}
              placeholder="Enter post title"
              className="input input-bordered w-full"
              disabled={isSubmitting || isUploading}
            />
          </div>

          <div className="w-full relative" ref={dropdownRef}>
            <label className="label">
              <span className="label-text font-semibold">Category</span>
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              onFocus={() => setShowDropdown(true)}
              required
              placeholder="Type or select a category"
              className="input input-bordered w-full"
              disabled={isSubmitting || isUploading}
            />

            {showDropdown && filteredCategories.length > 0 && (
              <ul className="absolute z-10 bg-base-100 border border-base-300 rounded-lg mt-1 max-h-48 overflow-y-auto w-full shadow-lg">
                {filteredCategories.map((cat) => (
                  <li
                    key={cat._id}
                    onClick={() => handleCategorySelect(cat.name)}
                    className="px-4 py-2 hover:bg-base-200 cursor-pointer flex items-center gap-2"
                  >
                    <FaFolderClosed className="mb-0.5" />
                    {cat.name}
                  </li>
                ))}
              </ul>
            )}

            {formData.category &&
              filteredCategories.length === 0 &&
              showDropdown && (
                <div role="alert" className="alert alert-info alert-soft mt-3">
                  <span>
                    <WiStars className="inline text-2xl" />
                    New category "{formData.category}" will be created
                  </span>
                </div>
              )}
          </div>

          <div className="w-full">
            <label className="label">
              <span className="label-text font-semibold">Content</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              placeholder="Write your post content here..."
              className="textarea textarea-bordered h-64 w-full"
              disabled={isSubmitting || isUploading}
            />
          </div>

          <div className="w-full">
            <label className="label">
              <span className="label-text font-semibold">Featured Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full"
              disabled={isSubmitting || isUploading}
            />

            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-64 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                isUploading ||
                !formData.title.trim() ||
                !formData.category.trim() ||
                !formData.content.trim()
              }
              className="btn btn-primary flex-1"
            >
              <MdPostAdd className="text-lg mb-0.5" />
              {isUploading
                ? "Uploading Image..."
                : isSubmitting
                ? "Creating Post..."
                : "Create Post"}
            </button>
            <Link
              href="/my-posts"
              onClick={() => router.back()}
              className="btn btn-error bg-error/80"
              disabled={isSubmitting || isUploading}
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
