import Image from "next/image";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

interface Post {
  _id: string;
  title: string;
  date: string;
  imageUrl: string;
  category: {
    categoryName: string;
  };
  readTime?: number;
}

export default function LatestPosts({ relatedPosts }: { relatedPosts: Post[] }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="text-white bg-[#1A4767] font-semibold text-lg px-4 py-2 rounded-md mb-4 text-center">
         Latest Posts
      </h3>

      <div className="space-y-5">
        {relatedPosts.map((post) => (
          <div key={post._id} className="flex gap-3">
            {/* Post Image */}
            <div className="relative w-20 h-20 rounded overflow-hidden">
              <Image
                src={post.imageUrl || "/default-image.jpg"}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            {/* Post Info */}
            <div className="flex-1">
              {/* Title */}
              <h4 className="font-semibold text-sm text-gray-800 leading-snug line-clamp-2">
                {post.title}
              </h4>
              {/* Date & Read Time */}
              <div className="flex items-center text-xs text-gray-500 gap-3 mt-1">
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" />
                  {format(new Date(post.date), "MMMM dd, yyyy")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
