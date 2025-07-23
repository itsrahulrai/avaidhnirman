import { notFound } from "next/navigation";
import Image from "next/image";
import dbConnect from "@lib/mongodb";
import Blog from '@models/Blog';
import { format } from "date-fns";

import SidebarCategories from "@/component/SidebarCategories";
import LatestPosts from "@/component/LatestPosts";




interface Props {
  params: { slug: string };
}

export default async function BlogDetailsPage({ params }: Props) {
  await dbConnect();

  const blog = await Blog.findOne({ slug: params.slug });
  if (!blog) return notFound();


  const relatedPosts = await Blog.find({ _id: { $ne: blog._id } }).limit(3);

  return (
    <main className="min-h-screen bg-gray-50 mt-5 mb-10">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <article className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              {/* Hero Image */}
              <div className="relative h-80 w-full">
                <Image
                  src={blog.imageUrl || "/default-image.jpg"}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded text-sm font-medium">
                  {format(new Date(blog.date), "dd MMM")}
                </div>
              </div>

              {/* Article Content */}
              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="uppercase font-medium">ANVM</span>
                  <span>|</span>
                  <span className="uppercase font-medium">
                    {blog.category?.categoryName || "Uncategorized"}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-6">{blog.title}</h1>

                <div
                  className="prose prose-lg max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            {/* Categories */}
            <SidebarCategories />

            {/* Related Posts */}
           <LatestPosts relatedPosts={relatedPosts || []} />


           

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
          </div>
        </div>
      </div>
    </main>
  );
}
