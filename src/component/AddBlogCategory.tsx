'use client';
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [isSlugTouched, setIsSlugTouched] = useState<boolean>(false);
  const [parentCategory, setParentCategory] = useState<string>("");

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const categoryData = {
      categoryName,
      slug,
      parentCategory,
    };
    console.log(categoryData);
    // You can replace this with your API call or toast
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Page Header */}
       

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 space-y-6 border border-gray-100"
        >
           <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Add New Category</h1>
          <p className="mt-1 text-gray-600 text-sm">Create a new blog category to organize your posts.</p>
        </div>
          {/* Category Name */}
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

          {/* Slug */}
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

          {/* Parent Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent Category
            </label>
            <select
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="">None</option>
              <option value="technology">Technology</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="business">Business</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Link
              href="/admin/blogs-category"
              className="inline-block px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-block px-5 py-2 rounded-md bg-orange-600 text-white hover:bg-orange-700 transition"
            >
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
