"use client";

import { useEffect, useState } from "react";

interface Category {
  _id: string;
  categoryName: string;
  slug: string;
  count?: number;
}

const bgColors = [
  "bg-blue-100",
  "bg-pink-100",
  "bg-yellow-100",
  "bg-green-100",
  "bg-purple-100",
];

export default function SidebarCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

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

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-white bg-[#1A4767] font-semibold text-lg px-4 py-2 rounded-md mb-4 text-center">
        Categories
      </h3>
      <ul className="space-y-3">
        {categories.map((cat, idx) => (
          <li key={cat._id}>
            <a
              href={`/blog/category/${cat.slug}`}
              className={`flex justify-between items-center px-4 py-2 rounded-md font-medium text-gray-800 ${bgColors[idx % bgColors.length]} hover:scale-[1.01] transition-transform`}
            >
              <span>{cat.categoryName}</span>
              <span className="bg-[#F54900] text-white text-xs font-semibold px-2 py-1 rounded-full">
                {cat.count ?? 0}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
