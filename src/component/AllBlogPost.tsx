'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Eye, Pencil, Trash } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


type Blog = {
  _id: string;
  title: string;
  slug: string;
  category: {
    _id: string;
    categoryName: string;
  } | null;
  date: string;
  status: 'Draft' | 'Published';
  imageUrl: string;
};

const AllBlogPost: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();

  useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setBlogs(data.blogs);
    } catch (err) {
      console.error('Failed to load blogs', err);
    }
  };

  fetchBlogs();
}, []);


  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="max-w-8xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Blogs</h1>
              <p className="text-gray-600 mt-1">Manage your blog posts</p>
            </div>
            <Link
              href="/admin/add-blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-full transition duration-200 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Blog
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead className="bg-[#CA3500] text-white sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <Image
                      src={blog.imageUrl || '/no-image.png'}
                      alt={blog.title}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-cover rounded bg-gray-200"
                    />
                    <div>
                      <p className="font-medium">{blog.title}</p>
                      <p className="text-gray-500 text-xs">{blog.slug}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {blog.category?.categoryName || 'Uncategorized'}
                  </td>

                  <td className="px-4 py-3">
                    {new Date(blog.date).toDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center space-x-3 text-gray-700">
                    <button title="View" className="hover:text-blue-800">
                      <Eye size={16} />
                    </button>
                    <button
                      title="Edit"
                      onClick={() => router.push(`/admin/blogs/edit?id=${blog._id}`)}
                      className="hover:text-yellow-600"
                    >
                      <Pencil size={16} />
                    </button>
                    <button title="Delete" className="hover:text-red-600">
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    No blogs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllBlogPost;
