'use client'
import React from "react";
import Link from "next/link";
import { Eye, Pencil, Trash } from "lucide-react";
import Image from "next/image";

type Blog = {
  title: string;
  slug: string;
  category: string;
  date: string;
  status: "Draft" | "Published";
  imageUrl: string;
};

const blogList: Blog[] = [
  {
    title: "Team Machin",
    slug: "team-machin",
    category: "Coffee Machine",
    date: "Fri Jul 04 2025",
    status: "Draft",
    imageUrl: "",
  },
  {
    title: "Coffee Machine",
    slug: "coffee-machine",
    category: "Coffee Machine",
    date: "Thu Jul 03 2025",
    status: "Draft",
    imageUrl: "",
  },
];

const AllBlogPost: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="max-w-8xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white shadow p-6 rounded flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Blogs</h1>
            <p className="text-sm text-gray-600">Manage your blog posts</p>
          </div>
          <Link
            href="/admin/add-category"
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 text-sm w-max"
          >
            + Add Blog
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogList.map((blog, index) => (
                <tr key={index} className="border-b-1 border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <Image
                    width={600}
                    height={400}
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-10 h-10 object-cover bg-gray-200 rounded"
                    />
                    <div>
                      <p className="font-medium">{blog.title}</p>
                      <p className="text-gray-500 text-xs">{blog.slug}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">{blog.category}</td>
                  <td className="px-4 py-3">{blog.date}</td>
                  <td className="px-4 py-3">
                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center space-x-3 text-gray-700">
                    <button className="hover:text-blue-800" title="View">
                      <Eye size={16} />
                    </button>
                    <button className="hover:text-yellow-600" title="Edit">
                      <Pencil size={16} />
                    </button>
                    <button className="hover:text-red-600" title="Delete">
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllBlogPost;
