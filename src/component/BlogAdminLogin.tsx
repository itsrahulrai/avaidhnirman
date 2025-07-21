'use client';

import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { LockClosedIcon } from '@heroicons/react/24/solid'; // Optional icon

const BlogAdminLogin: NextPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // TODO: Add real login logic here
  };

  return (
    <>
      <Head>
        <title>Blog Admin Login</title>
        <meta name="description" content="Secure login for blog admin panel" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 sm:p-10 backdrop-blur-sm bg-opacity-95">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-indigo-100 text-indigo-600 rounded-full p-3 mb-3">
              <LockClosedIcon className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 transition">
              Forgot your password?
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default BlogAdminLogin;
