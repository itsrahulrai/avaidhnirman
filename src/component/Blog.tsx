'use client'
import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  categories: string[];
  link?: string;
}

const Blog: NextPage = () => {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Tips for the Security Regulators The Inside Story",
      excerpt: "In lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      date: "29 Sep",
      categories: ["SAM BENSON", "IMMIGRATION"],
      link: "/blog-details"
    },
    {
      id: 2,
      title: "Tips for the Security Regulators The Inside Story",
      excerpt: "In lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
      date: "29 Sep",
      categories: ["SAM BENSON", "IMMIGRATION"],
      link: "/blog-details"
    },
    {
      id: 3,
      title: "Tips for the Security Regulators The Inside Story",
      excerpt: "In lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=250&fit=crop",
      date: "29 Sep",
      categories: ["SAM BENSON", "IMMIGRATION"],
      link: "/blog-details"
    },
    {
      id: 4,
      title: "Tips for the Security Regulators The Inside Story",
      excerpt: "In lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://images.unsplash.com/photo-1554384645-13eab165c24b?w=400&h=250&fit=crop",
      date: "29 Sep",
      categories: ["SAM BENSON", "IMMIGRATION"],
      link: "/blog-details"
    },
    {
      id: 5,
      title: "Tips for the Security Regulators The Inside Story",
      excerpt: "In lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop",
      date: "29 Sep",
      categories: ["SAM BENSON", "IMMIGRATION"],
      link: "/blog-details"
    },
    {
      id: 6,
      title: "Tips for the Security Regulators The Inside Story",
      excerpt: "In lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=250&fit=crop",
      date: "29 Sep",
      categories: ["SAM BENSON", "IMMIGRATION"],
      link: "/blog-details"
    }
  ];

  return (
    <>
      <main className='min-h-screen bg-gray-50 py-10'>
        {/* Blog Grid Section */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-2 rounded-md text-sm font-medium shadow-lg">
                    <div className="text-center">
                      {post.date}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.map((category, index) => (
                      <React.Fragment key={index}>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {category}
                        </span>
                        {index < post.categories.length - 1 && (
                          <span className="text-xs text-gray-400">|</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200 cursor-pointer">
                    <Link href={post?.link || '' }>{post.title}</Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <Link
                      href={post.link || '#'}
                      className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center group/link"
                    >
                      More Details
                      <svg
                        className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>

                    {/* Share Icon */}
                    <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors duration-200 rounded-full hover:bg-orange-50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Blog;