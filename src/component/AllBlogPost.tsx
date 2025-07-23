"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

type Blog = {
  _id: string;
  title: string;
  slug: string;
  category: {
    _id: string;
    categoryName: string;
  } | null;
  date: string;
  status: "Draft" | "Published";
  imageUrl: string;
};

const AllBlogPost: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // You can adjust this value
  const [totalBlogs, setTotalBlogs] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/blogs?page=${currentPage}&limit=${itemsPerPage}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setBlogs(data.blogs);
        setTotalBlogs(data.totalBlogs); // Assuming your API returns totalBlogs
      } catch (err) {
        console.error("Failed to load blogs", err);
        toast.error('Failed to load blogs.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage, itemsPerPage]); // Re-fetch when currentPage or itemsPerPage changes

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will delete the blog and its image.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch('/api/blogs', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success('Blog deleted successfully');
          // No need to filter from current state, refetch to get updated list for current page
          // This also handles cases where the last item on a page is deleted and the page needs to shift back
          const newTotalBlogs = totalBlogs - 1;
          const newMaxPage = Math.ceil(newTotalBlogs / itemsPerPage);
          if (currentPage > newMaxPage && newMaxPage > 0) {
            setCurrentPage(newMaxPage);
          } else if (totalBlogs === 1 && currentPage === 1) { // If deleting the very last blog
            setBlogs([]);
            setTotalBlogs(0);
            setCurrentPage(1);
          } else {
            // Re-fetch blogs for the current page to reflect the deletion
            const res = await fetch(`/api/blogs?page=${currentPage}&limit=${itemsPerPage}`);
            if (res.ok) {
              const data = await res.json();
              setBlogs(data.blogs);
              setTotalBlogs(data.totalBlogs);
            }
          }
        } else {
          toast.error(data.error || 'Failed to delete blog');
        }
      } catch (err) {
        toast.error('Something went wrong');
        console.error(err);
      }
    }
  };

  const totalPages = Math.ceil(totalBlogs / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Adjust as needed

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

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
              href="/admin/add-blogs"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-full transition duration-200 shadow-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
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
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    Loading blogs...
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                    No blogs found.
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 flex items-center gap-3">
                      <Image
                        src={blog.imageUrl || "/no-image.png"}
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
                      {blog.category?.categoryName || "Uncategorized"}
                    </td>

                    <td className="px-4 py-3">
                      {new Date(blog.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded font-medium ${
                          blog.status === "Published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button
                          title="Edit"
                          onClick={() =>
                            router.push(`/admin/add-blogs/?id=${blog._id}`)
                          }
                          className="p-1 text-gray-500 hover:text-green-600 transition"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        <button
                          title="Delete"
                          onClick={() => handleDelete(blog._id)}
                          className="p-1 text-gray-500 hover:text-red-600 transition"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <nav className="flex justify-center items-center space-x-2 py-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="flex space-x-1">
              {getPageNumbers().map(number => (
                <button
                  key={number}
                  onClick={() => handlePageClick(number)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    currentPage === number
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default AllBlogPost;