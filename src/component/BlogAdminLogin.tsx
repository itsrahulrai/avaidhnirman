'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

const BlogAdminLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });

   console.log("🔍 signIn response", formData);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

      console.log("🔍 signIn response", res);

    if (res?.ok) {
      toast.success('Login successful!');
      router.push('/admin/dashboard');
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <>
      <Head>
        <title>Blog Admin Login</title>
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 sm:p-10 backdrop-blur-sm bg-opacity-95">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-indigo-100 text-[#1A4767] rounded-full p-3 mb-3">
              <LockClosedIcon className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800">Sign In</h1>
            <p className="text-sm text-gray-500 mt-1">Please enter your credentials to access the dashboard.</p>
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
              className="w-full bg-[#1A4767] hover:bg-[#F54900] text-white font-bold py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default BlogAdminLogin;
