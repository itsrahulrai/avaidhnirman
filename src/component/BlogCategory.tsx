'use client'

import React, { useState } from 'react';
import { Plus, Eye, Edit, Trash2, MoreVertical } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  date: string;
  status: 'Draft' | 'Published' | 'Archived';
  image?: string;
}

const BlogCategory = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: 'Coffee Machine',
      slug: 'coffee-machine',
      category: 'Coffee Machine',
      date: 'Thu Jul 03 2025',
      status: 'Draft',
      image: '/api/placeholder/40/40'
    },
    {
      id: 2,
      title: 'Best Brewing Methods',
      slug: 'best-brewing-methods',
      category: 'Coffee Tips',
      date: 'Wed Jul 02 2025',
      status: 'Published',
      image: '/api/placeholder/40/40'
    },
    {
      id: 3,
      title: 'Espresso Guide',
      slug: 'espresso-guide',
      category: 'Coffee Machine',
      date: 'Tue Jul 01 2025',
      status: 'Published',
      image: '/api/placeholder/40/40'
    }
  ]);

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categories] = useState(['Coffee Machine', 'Coffee Tips', 'Reviews', 'Tutorials']);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      // In a real app, you'd save this to your backend
      console.log('Adding category:', newCategory);
      setNewCategory('');
      setShowAddCategory(false);
    }
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Category</h1>
                <p className="text-gray-600 mt-1">Manage your blog category</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Link
                  href='/admin/add-category'
                  className="inline-flex items-center px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  {/* <Plus className="w-4 h-4 mr-2" /> */}
                  Add New
                </Link>
              </div>
            </div>
          </div>
        </div>


        {/* Blog Posts Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Title</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Category</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Date</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                            <div className="w-6 h-6 bg-gray-400 rounded"></div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{post.title}</div>
                            <div className="text-sm text-gray-500">{post.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-700">{post.category}</td>
                      <td className="py-4 px-6 text-gray-700">{post.date}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-400 hover:text-orange-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
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

          {/* Mobile Cards */}
          <div className="md:hidden">
            {posts.map((post) => (
              <div key={post.id} className="p-4 border-b border-gray-100 last:border-b-0">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0">
                      <div className="w-6 h-6 bg-gray-400 rounded"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{post.title}</div>
                      <div className="text-sm text-gray-500 truncate">{post.slug}</div>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-600">{post.category}</span>
                        <span className="text-sm text-gray-600">{post.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2 mt-3 pt-3 border-t border-gray-100">
                  <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">No blog posts found</div>
              <button className="inline-flex items-center px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Post
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {posts.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Showing 1 to {posts.length} of {posts.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-orange-600 text-white rounded-md">
                1
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
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