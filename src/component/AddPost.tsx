"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

// Dynamically import JoditEditor
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

type BlogForm = {
  title: string;
  slug: string;
  content: string;
  status: "Draft" | "Published";
  category: string;
  featured: boolean;
  featuredImage: File | null;
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    ogTitle: string;
    ogDescription: string;
    ogImageUrl: string;
  };
};

export default function AddPost() {
  const editorRef = useRef(null);
  const [formData, setFormData] = useState<BlogForm>({
    title: "",
    slug: "",
    content: "",
    status: "Draft",
    category: "",
    featured: false,
    featuredImage: null,
    seo: {
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      ogTitle: "",
      ogDescription: "",
      ogImageUrl: "",
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("seo.")) {
      const key = name.split(".")[1] as keyof BlogForm["seo"];
      setFormData((prev) => ({
        ...prev,
        seo: { ...prev.seo, [key]: value },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (name === "title" && !formData.slug) {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, featuredImage: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Blog submitted");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="max-w-8xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white shadow p-6 rounded">
          <h1 className="text-2xl font-bold">Add Blog</h1>
          <p className="text-sm text-gray-600">Create a new blog post</p>
        </div>

        {/* Main Form Grid */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
        >
          {/* Left Side: Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title, Slug, Content, Image */}
            <div className="bg-white p-6 rounded shadow space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  className="w-full border rounded px-4 py-2"
                  required
                />

                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="Slug"
                  className="w-full border rounded px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <JoditEditor
                  ref={editorRef}
                  value={formData.content}
                  onChange={handleContentChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Featured Image</label>
                <div className="border rounded px-4 py-6 text-center bg-gray-50">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover mb-2 rounded"
                    />
                  ) : (
                    <div className="text-sm text-gray-500">No image selected</div>
                  )}
                </div>
                <div className="pt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full mt-1"
                  />
                </div>
              </div>
            </div>

            {/* SEO Section */}
            <div className="bg-white p-6 rounded shadow space-y-4">
              <h3 className="text-md font-semibold">SEO Settings</h3>

              <input
                type="text"
                name="seo.metaTitle"
                placeholder="Meta Title"
                value={formData.seo.metaTitle}
                onChange={handleInputChange}
                className="w-full border rounded px-4 py-2"
              />
              <textarea
                name="seo.metaDescription"
                placeholder="Meta Description"
                value={formData.seo.metaDescription}
                onChange={handleInputChange}
                className="w-full border rounded px-4 py-2"
              />
              <input
                type="text"
                name="seo.metaKeywords"
                placeholder="Meta Keywords"
                value={formData.seo.metaKeywords}
                onChange={handleInputChange}
                className="w-full border rounded px-4 py-2"
              />

              <h3 className="text-md font-semibold">Open Graph</h3>

              <input
                type="text"
                name="seo.ogTitle"
                placeholder="OG Title"
                value={formData.seo.ogTitle}
                onChange={handleInputChange}
                className="w-full border rounded px-4 py-2"
              />
              <textarea
                name="seo.ogDescription"
                placeholder="OG Description"
                value={formData.seo.ogDescription}
                onChange={handleInputChange}
                className="w-full border rounded px-4 py-2"
              />
              <input
                type="text"
                name="seo.ogImageUrl"
                placeholder="OG Image URL"
                value={formData.seo.ogImageUrl}
                onChange={handleInputChange}
                className="w-full border rounded px-4 py-2"
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="bg-white p-6 rounded shadow space-y-4 sticky top-24 max-h-[80vh] overflow-y-auto">
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>

            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
            >
              <option value="">Select a category</option>
              <option value="tech">Technology</option>
              <option value="health">Health</option>
            </select>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
              />
              <label className="text-sm">Featured</label>
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <Link
                href="/admin/blogs"
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update Blog
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
