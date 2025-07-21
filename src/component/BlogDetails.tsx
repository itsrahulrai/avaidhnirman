'use client'

import React, { useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';

interface RelatedPost {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

const BlogDetails: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const relatedPosts: RelatedPost[] = [
    {
      id: 1,
      title: "Tips for the Security Regulators The Real Inside Story",
      date: "Sep 29, 2023",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
      excerpt: "In lorem ipsum dolor sit amet, consectetur adipiscing elit..."
    },
    {
      id: 2,
      title: "Welcome to Criminal Defense Lawyers The Real Inside Story",
      date: "Sep 29, 2023",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop",
      excerpt: "In lorem ipsum dolor sit amet, consectetur adipiscing elit..."
    },
    {
      id: 3,
      title: "Tips for the Security Regulators The Real Inside Story",
      date: "Sep 29, 2023",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=80&h=80&fit=crop",
      excerpt: "In lorem ipsum dolor sit amet, consectetur adipiscing elit..."
    }
  ];

  const categories = [
    "Regulatory Authority",
    "Corporate Finance",
    "Company Legislation",
    "Financial Legal System",
    "Immigration Property"
  ];

  const tags = [
    "Education", "Communication", "Immigration", "Law", "Criminal Law", "Responsible", "Accident Policy", "Law Firm"
  ];

  return (
    <>
      <main className="min-h-screen bg-gray-50 mt-5 mb-10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <article className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                {/* Hero Image */}
                <div className="relative h-80 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop"
                    alt="Lady Justice statue"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded text-sm font-medium">
                    29 Sep
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="uppercase font-medium">SAM BENSON</span>
                    <span>|</span>
                    <span className="uppercase font-medium">IMMIGRATION</span>
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Tips for the Security Regulators, The Real Inside Story
                  </h1>

                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-8">
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                    </p>

                    {/* Highlighted Quote Section */}
                    <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Filing a Claim Right Way
                      </h3>
                      <div className="flex items-start gap-4">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
                            alt="Professional man"
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-8">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </div>

                  {/* Social Share */}
                  <div className="flex items-center gap-4 pt-8 border-t border-gray-200">
                    <span className="text-gray-600 font-medium">Share:</span>
                    <div className="flex gap-2">
                      <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </button>
                      <button className="p-2 bg-blue-800 text-white rounded hover:bg-blue-900">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </button>
                      <button className="p-2 bg-red-600 text-white rounded hover:bg-red-700">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              {/* Comments Section */}
              {/* <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments (2)</h2>
                
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={comment.avatar}
                          alt={comment.author}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="space-y-8">
                {/* Search */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button className="px-4 py-2 bg-red-600 text-white rounded-r-lg hover:bg-red-700">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map((category, index) => (
                      <li key={index}>
                        <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                          {category}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Success Stories */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Success Stories</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((post) => (
                      <div key={post.id} className="flex gap-3">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-500">{post.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Banner */}
                <div className="bg-gray-800 text-white rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">At Optum, We Always Put Our Clients First</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    We will evaluate your case and discuss your options. Contact us today to schedule a consultation.
                  </p>
                  <button className="bg-orange-600 text-white px-6 py-2 rounded font-medium hover:bg-orange-700 transition-colors">
                    GET AN ESTIMATE
                  </button>
                </div>

                {/* Tags */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-orange-100 hover:text-orange-700 cursor-pointer transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default BlogDetails;