"use client";

import { useState, useRef, ChangeEvent, FormEvent, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { toast } from "react-hot-toast";
import {
  Upload,
  FileText,
  CheckCircle2,
  Image as ImageIcon,
  XCircle,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

// Rich text editor
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

type CategoryOption = { _id: string; categoryName: string };

type FormState = {
  title: string;
  slug: string;
  content: string;
  shortContent: string;
  image: File | null;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  category: string;
  isFeatured: boolean;
};

const initialFormState: FormState = {
  title: "",
  slug: "",
  content: "",
  shortContent: "",
  image: null,
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  category: "",
  isFeatured: false,
};

export default function AddPost() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");

  const editor = useRef(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Slugify title
  useEffect(() => {
    const generatedSlug = slugify(formData.title);
    setFormData((prev) => ({ ...prev, slug: generatedSlug }));
  }, [formData.title]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const json = await res.json();
        if (json.success) {
          setCategories(json.data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch blog if editing
  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) return;
      try {
        const res = await fetch(`/api/blogs/${blogId}`);
        const data = await res.json();
        if (data.success && data.data) {
          const blog = data.data;
          setFormData({
            title: blog.title || "",
            slug: blog.slug || "",
            content: blog.content || "",
             shortContent: blog.shortContent || "",
            image: null,
            metaTitle: blog.metaTitle || "",
            metaDescription: blog.metaDescription || "",
            metaKeywords: blog.metaKeywords || "",
            category: blog.category?._id || blog.category || "",
            isFeatured: blog.isFeatured || false,
          });

          if (blog.imageUrl) {
            setImagePreviewUrl(blog.imageUrl);
          }
        } else {
          toast.error("Blog not found");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        toast.error("Failed to load blog");
      }
    };

    fetchBlog();
  }, [blogId]);

  useEffect(() => {
    if (formData.image) {
      const url = URL.createObjectURL(formData.image);
      setImagePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setImagePreviewUrl(null);
  }, [formData.image]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as any;
    const { name, value, type, checked } = target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditorChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.category) {
      toast.error("Please fill Title, Slug, and Category.");
      return;
    }

    setSubmitting(true);

    const submitForm = new FormData();
    submitForm.append("title", formData.title);
    submitForm.append("slug", formData.slug);
    submitForm.append("category", formData.category);
    submitForm.append("content", formData.content);
     submitForm.append("shortContent", formData.shortContent);
    submitForm.append("status", "Published");
    submitForm.append("metaTitle", formData.metaTitle);
    submitForm.append("metaDescription", formData.metaDescription);
    submitForm.append("metaKeywords", formData.metaKeywords);
    submitForm.append("isFeatured", formData.isFeatured.toString());

    if (formData.image) {
      submitForm.append("image", formData.image);
    }

    try {
      const res = await fetch(blogId ? `/api/blogs/${blogId}` : `/api/blogs`, {
        method: blogId ? "PUT" : "POST",
        body: submitForm,
      });

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success(blogId ? "Blog updated!" : "Blog created!");
        router.push("/admin/blogs");
      } else {
        console.error("Submit error:", result.error);
        toast.error(result.error || "Submission failed.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const joditConfig = {
    readonly: false,
    placeholder: "Start writing your amazing blog post here...",
    buttons:
      "bold,italic,underline,strikethrough,|,ul,ol,|,link,image,table,|,align,outdent,indent,|,fontsize,brush,paragraph,|,undo,redo,|,source",
    height: 400,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-8 lg:p-10 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 px-8 py-6 border-b bg-[#CA3500] text-white border-gray-100">
          <FileText className="w-7 h-7 text-white flex-shrink-0" />
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Create New Blog Post
            </h1>
            <p className="text-sm text-white mt-1">
              Craft and publish compelling content for your audience.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Details */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800 pb-3 border-b border-gray-200">
                Basic Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800"
                    placeholder="Enter your blog post title"
                    required
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800"
                    placeholder="auto-generated-slug"
                    required
                  />
                </div>

                {/* Category */}
                <div className="mb-6">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="block w-full appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.categoryName}
                        </option>
                      ))}
                    </select>

                    {/* Down arrow icon */}
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Featured */}
                <div className="flex items-center self-end h-full pt-2">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700 flex items-center gap-1">
                    Mark as Featured
                    {formData.isFeatured && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800 pb-3 border-b border-gray-200">
                Post Content
              </h2>
              <div className="border border-gray-300 rounded-md shadow-sm overflow-hidden">
                <JoditEditor
                  ref={editor}
                  value={formData.content}
                  config={joditConfig}
                  onChange={handleEditorChange}
                />
              </div>
            </div>

            <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Content
                  </label>
                  <textarea
                    name="shortContent"
                    value={formData.shortContent}
                    onChange={handleChange}
                    rows={4}
                    maxLength={160}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 text-gray-800"
                    placeholder="Max 160 characters"
                  />
                </div>

            {/* Image Upload */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800 pb-3 border-b border-gray-200">
                Featured Image
              </h2>
              <div className="flex flex-col gap-3">
                <label className="relative flex flex-col items-center justify-center w-full min-h-[160px] border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-white hover:border-blue-400 transition-colors group overflow-hidden">
                  {imagePreviewUrl ? (
                    <>
                      <img
                        src={imagePreviewUrl}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity p-4">
                        <Upload className="w-8 h-8 mb-2" />
                        <p className="font-semibold">Click to Change Image</p>
                        <p className="text-xs text-gray-300 truncate px-2">
                          {formData.image?.name}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-5 text-gray-500">
                      <ImageIcon className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-1 text-sm">
                        <span className="font-medium text-blue-600">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs">PNG, JPG, JPEG (Max 5MB)</p>
                    </div>
                  )}

                  {/* Hidden file input */}
                  <input
                    ref={imageInputRef}
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </label>

                {formData.image && (
                  <div className="flex justify-between items-center text-sm text-gray-600 px-2 py-1 bg-gray-50 rounded-md border">
                    <span className="truncate text-gray-700">
                      Selected: {formData.image.name}
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="ml-4 text-red-500 hover:text-red-700"
                      title="Remove image"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* SEO */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800 pb-3 border-b border-gray-200">
                Search Engine Optimization (SEO)
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 text-gray-800"
                    placeholder="Max 60 characters"
                    maxLength={60}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    name="metaKeywords"
                    value={formData.metaKeywords}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 text-gray-800"
                    placeholder="e.g., nextjs, web dev"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    rows={4}
                    maxLength={160}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 text-gray-800"
                    placeholder="Max 160 characters"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
              <Link
                href="/admin/blogs"
                className="inline-flex items-center px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-[#CA3500] text-white font-medium px-6 py-2 rounded-md shadow-sm hover:bg-[#b23000] transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Upload className="w-4 h-4 -rotate-90" />
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
