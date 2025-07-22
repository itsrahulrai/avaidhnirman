'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function AddBlogCategory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id");

  const [categoryName, setCategoryName] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugTouched, setIsSlugTouched] = useState(false);
  const [parentCategory, setParentCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 👉 Fetch existing category when editing
  useEffect(() => {
    const fetchCategory = async () => {
      if (!categoryId) return;
      setIsLoading(true);
      try {
        const res = await fetch(`/api/categories/${categoryId}`);
        const data = await res.json();
        if (data.success) {
          setCategoryName(data.data.categoryName || "");
          setSlug(data.data.slug || "");
          setParentCategory(data.data.parentCategory || "");
        } else {
          toast.error("Failed to fetch category.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error loading category.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleCategoryNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategoryName(value);

    if (!isSlugTouched) {
      const generatedSlug = value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      setSlug(generatedSlug);
    }
  };

  const handleSlugChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    setIsSlugTouched(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const categoryData = {
      categoryName,
      slug,
      parentCategory,
    };

    try {
      const res = await fetch(
        categoryId ? `/api/categories/${categoryId}` : `/api/categories`,
        {
          method: categoryId ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(categoryData),
        }
      );

      const result = await res.json();

      if (result.success) {
        toast.success(
          categoryId
            ? "Category updated successfully!"
            : "Category created successfully!"
        );
        router.push("/admin/blogs-category");
      } else {
        toast.error(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 space-y-6 border border-gray-100"
        >
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {categoryId ? "Edit Category" : "Add New Category"}
            </h1>
            <p className="mt-1 text-gray-600 text-sm">
              {categoryId
                ? "Update the selected blog category."
                : "Create a new blog category to organize your posts."}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Technology"
              value={categoryName}
              onChange={handleCategoryNameChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. technology"
              value={slug}
              onChange={handleSlugChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              required
            />
          </div>

          {/* Optional: Add parentCategory input if you use it */}
         

          <div className="flex justify-between items-center border-t pt-6">
            <Link
              href="/admin/blogs"
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2 rounded-md  bg-orange-600 text-white hover:bg-orange-700  shadow-sm"
            >
              Submit
            </button>
          </div>


        </form>
      </div>
    </div>
  );
}
