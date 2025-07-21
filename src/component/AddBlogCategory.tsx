'use client'
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

    // Example: Call an API or show a success message
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded shadow p-6 mb-6">
          <h1 className="text-2xl font-bold mb-1">Add Category</h1>
          <p className="text-gray-600 text-sm">Create a new blog category</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded shadow p-6 space-y-4"
        >
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              placeholder="e.g. Technology"
              value={categoryName}
              onChange={handleCategoryNameChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              type="text"
              placeholder="e.g. technology"
              value={slug}
              onChange={handleSlugChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">None</option>
              <option value="technology">Technology</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="business">Business</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end pt-4">
            <Link
              href="/admin/blogs-category"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
