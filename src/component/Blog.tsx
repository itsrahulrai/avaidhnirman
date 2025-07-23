"use client";
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  shortContent: string;
  imageUrl: string;
  date: string;
  category: {
    _id: string;
    categoryName: string;
  };
  status: string;
}

const Blog: NextPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = async (page: number) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/blogs?page=${page}&limit=3`);
     setBlogPosts(res.data.blogs ?? []);
        setTotalPages(res.data.pages ?? 1);

    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <section className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                >
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={
                        post.imageUrl.startsWith("http")
                          ? post.imageUrl
                          : `${post.imageUrl}`
                      }
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-2 rounded-md text-sm font-medium shadow-lg">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {post.category?.categoryName}
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200 cursor-pointer">
                      <Link href={`/blog-details/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p
                      className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: post.shortContent }}
                    ></p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <Link
                        href={`/blog-details/${post.slug}`}
                        className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center group/link"
                      >
                        More Details
                        <svg
                          className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-10">
              <nav className="flex items-center gap-2 text-sm font-medium">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-3 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Prev
                </button>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-3 py-2 rounded-md border text-sm transition-colors duration-200 ${
                        page === pageNumber
                          ? "bg-orange-500 text-white border-orange-500 font-semibold shadow"
                          : "border-gray-300 text-gray-700 hover:bg-orange-100"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default Blog;
