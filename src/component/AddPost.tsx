"use client";

import { useState, useRef, ChangeEvent, FormEvent, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Upload, FileText, CheckCircle2, Image as ImageIcon, XCircle } from "lucide-react"; // Added XCircle for remove button


const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function AddPost() {
  const editor = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    image: null as File | null,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    category: "",
    isFeatured: false,
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (formData.image) {
      const url = URL.createObjectURL(formData.image);
      setImagePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImagePreviewUrl(null);
    }
  }, [formData.image]);


  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked, files } = e.target as any;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEditorChange = (value: string) => {
    setFormData({ ...formData, content: value });
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image: null });
  };

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    console.log("Submitted Post Data:", formData);
    // API integration here
    // alert("Form submitted! Check console for data."); // For demonstration
  };

  const joditConfig = {
    readonly: false,
    placeholder: "Start writing your amazing blog post here...",
    buttons: "bold,italic,underline,strikethrough,|,ul,ol,|,link,image,table,|,align,outdent,indent,|,fontsize,brush,paragraph,|,undo,redo,|,source",
    buttonsMD: "bold,italic,underline,strikethrough,|,ul,ol,|,link,image,|,align,|,fontsize,brush,|,undo,redo,|,source",
    buttonsSM: "bold,italic,underline,|,ul,ol,|,link,image,|,source",
    buttonsXS: "bold,italic,|,ul,ol,|,link,image",
    height: 400,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-8 lg:p-10 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col">
        {/* Header section of the form card - Cleaned up */}
        <div className="flex items-center gap-4 px-8 py-6 border-b border-gray-100">
          <FileText className="w-7 h-7 text-gray-700 flex-shrink-0" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Create New Blog Post
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Craft and publish compelling content for your audience.
            </p>
          </div>
        </div>

        {/* Form content area - Main padding for the form */}
        <div className="flex-1 p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8"> {/* Adjusted space-y */}

            {/* Section: Basic Details */}
            <div className="space-y-6"> {/* Internal spacing within section */}
              <h2 className="text-lg font-semibold text-gray-800 pb-3 border-b border-gray-200">
                Basic Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6"> {/* Adjusted gap */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Post Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 text-gray-800"
                    placeholder="Enter your blog post title"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 text-gray-800"
                    placeholder="e.g., your-awesome-post-title"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 text-gray-800 bg-white"
                  >
                    <option value="">Select a category</option>
                    <option value="technology">Technology</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="food">Food</option>
                    <option value="travel">Travel</option>
                    <option value="business">Business</option>
                  </select>
                </div>
                <div className="flex items-center self-end h-full pt-2"> {/* Aligned better */}
                  <input
                    type="checkbox"
                    id="isFeatured"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="isFeatured" className="ml-2 text-sm text-gray-700 flex items-center gap-1">
                    Mark as Featured Post
                    {formData.isFeatured && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Section: Post Content */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800 pb-3 border-b border-gray-200">
                Post Content
              </h2>
              <div>
                <label htmlFor="content-editor" className="sr-only">Post Content</label>
                <div className="border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition duration-150 overflow-hidden">
                  <JoditEditor
                    id="content-editor"
                    ref={editor}
                    value={formData.content}
                    config={joditConfig}
                    onChange={handleEditorChange}
                  />
                </div>
              </div>
            </div>

            {/* Section: Featured Image */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800 pb-3 border-b border-gray-200">
                Featured Image
              </h2>
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="featured-image-upload"
                  className="relative flex flex-col items-center justify-center w-full min-h-[160px] border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-white hover:border-blue-400 transition-colors duration-200 ease-in-out group overflow-hidden"
                >
                  {imagePreviewUrl ? (
                    <>
                      <img
                        src={imagePreviewUrl}
                        alt="Selected featured image preview"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-4">
                        <Upload className="w-8 h-8 mb-2" />
                        <p className="font-semibold text-base">Click to Change Image</p>
                        <p className="text-xs text-gray-300 mt-1 text-center truncate w-full px-2">{formData.image?.name}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-5 text-gray-500">
                      <ImageIcon className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-1 text-sm">
                        <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, JPEG (Max 5MB)</p>
                    </div>
                  )}
                  <input
                    id="featured-image-upload"
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="hidden"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </label>
                {formData.image && (
                  <div className="flex items-center justify-between text-sm text-gray-600 px-2 py-1 bg-gray-50 rounded-md border border-gray-200">
                    <span className="font-medium text-gray-700 truncate">
                      Selected: {formData.image.name}
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="ml-4 text-red-500 hover:text-red-700 transition-colors duration-150"
                      title="Remove image"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Section: SEO */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800 pb-3 border-b border-gray-200">
                Search Engine Optimization (SEO)
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    id="metaTitle"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 text-gray-800"
                    placeholder="Concise title for search engines (max 60 chars)"
                    maxLength={60}
                  />
                </div>
                <div>
                  <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    id="metaKeywords"
                    name="metaKeywords"
                    value={formData.metaKeywords}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 text-gray-800"
                    placeholder="e.g., nextjs, web development, tutorial"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 text-gray-800"
                    placeholder="A brief, engaging description for search engine results (max 160 chars)"
                    maxLength={160}
                  />
                </div>
              </div>
            </div>

            {/* Form Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
              <Link
                href="/admin/blogs"
                className="inline-flex items-center px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transition-colors duration-150 font-medium"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium px-6 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
              >
                <Upload className="w-4 h-4 -rotate-90" />
                Publish Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}