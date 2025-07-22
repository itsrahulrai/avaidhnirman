"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { Upload, FileText, Settings } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4 border">
          <FileText className="text-blue-600 w-6 h-6" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Create Blog Post</h1>
            <p className="text-sm text-gray-500">Enter the blog content</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Blog Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Blog Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Blog Title"
                  className="input"
                  required
                />
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="Slug"
                  className="input"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Blog Content
                </label>
                <div className="border rounded-md overflow-hidden">
                  <JoditEditor
                    ref={editorRef}
                    value={formData.content}
                    onChange={handleContentChange}
                  />
                </div>
              </div>

              {/* Featured Image */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Featured Image</label>
                <div className="rounded border border-dashed bg-gray-100 flex flex-col items-center justify-center p-4">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  ) : (
                    <div className="text-gray-400 text-sm">No image selected</div>
                  )}
                </div>
                <label className="flex items-center justify-center w-full px-4 py-2 mt-2 bg-blue-100 text-blue-700 rounded cursor-pointer hover:bg-blue-200">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* SEO Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
              <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm mb-2">
                <Settings className="w-5 h-5" />
                SEO & Open Graph
              </div>
              <input
                name="seo.metaTitle"
                value={formData.seo.metaTitle}
                onChange={handleInputChange}
                placeholder="Meta Title"
                className="input"
              />
              <textarea
                name="seo.metaDescription"
                value={formData.seo.metaDescription}
                onChange={handleInputChange}
                placeholder="Meta Description"
                className="input"
              />
              <input
                name="seo.metaKeywords"
                value={formData.seo.metaKeywords}
                onChange={handleInputChange}
                placeholder="Meta Keywords"
                className="input"
              />
              <input
                name="seo.ogTitle"
                value={formData.seo.ogTitle}
                onChange={handleInputChange}
                placeholder="OG Title"
                className="input"
              />
              <textarea
                name="seo.ogDescription"
                value={formData.seo.ogDescription}
                onChange={handleInputChange}
                placeholder="OG Description"
                className="input"
              />
              <input
                name="seo.ogImageUrl"
                value={formData.seo.ogImageUrl}
                onChange={handleInputChange}
                placeholder="OG Image URL"
                className="input"
              />
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4 sticky top-24 h-fit">
            <h2 className="text-md font-semibold text-gray-700 mb-2">Post Settings</h2>

            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="input"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>

            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="input"
            >
              <option value="">Select Category</option>
              <option value="tech">Technology</option>
              <option value="health">Health</option>
            </select>

            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="accent-blue-600"
              />
              Mark as Featured
            </label>

            <div className="flex justify-between gap-3 pt-4">
              <Link
                href="/admin/blogs"
                className="w-1/2 text-center border border-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-100"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="w-1/2 bg-[#CA3500] text-white px-4 py-2 rounded hover:bg-[#CA3500]"
              > Publish
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
