"use client";

import React, { useEffect, useState } from "react";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useRouter } from "next/navigation";

interface Category {
  _id: string;
  categoryName: string;
  slug: string;
  createdAt: string;
  isActive: boolean;
}

const BlogCategory = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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



  const handleDeleteCategory = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the category.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Category deleted successfully!");
        setCategories(categories.filter((category) => category._id !== id));
      } else {
        toast.error(data.message || "Failed to delete category.");
      }
    } catch (err) {
      console.error("Error deleting category:", err);
      toast.error("An error occurred. Please try again.");
    }
  };



  const paginatedData = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto">

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Category</h1>
            <p className="text-gray-600 mt-1">Manage your blog category</p>
          </div>
          <Link
            href="/admin/add-category"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-full transition duration-200 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Category
          </Link>
        </div>
      </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-700">
                <thead className="bg-[#CA3500] text-white sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Slug</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                    <th className="px-6 py-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {paginatedData.map((category) => (
                    <tr
                      key={category._id}
                      className="hover:bg-orange-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {category.categoryName}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{category.slug}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ring-1 ring-inset ${category.isActive
                              ? "bg-green-50 text-green-700 ring-green-600/20"
                              : "bg-red-50 text-red-700 ring-red-600/20"
                            }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${category.isActive ? "bg-green-600" : "bg-red-600"
                              }`}
                          ></span>
                          {category.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button
                            title="Edit"
                            onClick={() => router.push(`/admin/blogs-category/form?id=${category._id}`)}
                            className="p-1 text-gray-500 hover:text-green-600 transition"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          <button
                            title="Delete"
                            onClick={() => handleDeleteCategory(category._id)}
                            className="p-1 text-gray-500 hover:text-red-600 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden divide-y">
            {paginatedData.map((category) => (
              <div key={category._id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-lg font-medium text-gray-900">
                      {category.categoryName}
                    </div>
                    <div className="text-sm text-gray-500">{category.slug}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-orange-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-green-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {categories.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">No categories found</div>
              <Link
                href="/admin/add-category"
                className="inline-flex items-center px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Category
              </Link>
            </div>
          )}
        </div>

        {/* Pagination */}
        {categories.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, categories.length)} of{" "}
              {categories.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 text-sm rounded-md ${currentPage === i + 1
                      ? "bg-orange-600 text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                    }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCategory;
