import { NextResponse } from 'next/server';
import dbConnect from '@lib/mongodb';
import mongoose from 'mongoose';
import path from 'path';
import { writeFile } from 'fs/promises';
import { Readable } from 'stream';
import { unlink } from 'fs/promises';

import Blog from '@models/Blog';

// 🔄 Convert ReadableStream to Buffer
async function streamToBuffer(readable: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of readable) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

// 🚫 Disable default body parser for file upload
export const config = {
  api: {
    bodyParser: false,
  },
};

// ✅ GET: Fetch all blogs with populated category
// export async function GET() {
//   await dbConnect();

//   try {
//     const blogs = await mongoose.connection.db
//       .collection('blogs')
//       .aggregate([
//         {
//           $lookup: {
//             from: 'categories',
//             localField: 'category',
//             foreignField: '_id',
//             as: 'category',
//           },
//         },
//         {
//           $unwind: {
//             path: '$category',
//             preserveNullAndEmptyArrays: true,
//           },
//         },
//         { $sort: { createdAt: -1 } },
//       ])
//       .toArray();

//     return NextResponse.json({ blogs });
//   } catch (error) {
//     console.error('❌ Error fetching blogs:', error);
//     return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
//   }
// }


export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '3', 10); // 👈 Default is now 3

    const skip = (page - 1) * limit;

    const total = await Blog.countDocuments();
    const blogs = await Blog.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .populate('category');

    return NextResponse.json({
      success: true,
      blogs,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}



// ✅ POST: Create new blog with image upload
export async function POST(req: Request) {
  await dbConnect();

  try {
    const formData = await req.formData();

    const file = formData.get('image') as File | null;
    let imageUrl = '';

    if (file && typeof file === 'object') {
      const buffer = await streamToBuffer(file.stream() as any);
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);
      await writeFile(filePath, buffer);
      imageUrl = `/uploads/${fileName}`;
    }

    const title = formData.get('title')?.toString() || '';
    const slug = formData.get('slug')?.toString() || '';
    const content = formData.get('content')?.toString() || '';
    const shortContent = formData.get('shortContent')?.toString() || '';
    const category = formData.get('category')?.toString() || '';
    const metaTitle = formData.get('metaTitle')?.toString() || '';
    const metaDescription = formData.get('metaDescription')?.toString() || '';
    const metaKeywords = formData.get('metaKeywords')?.toString() || '';
    const status = formData.get('status')?.toString() || 'Draft';
    const isFeatured = formData.get('isFeatured') === 'true';

    if (!title || !slug || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const blog = new Blog({
      title,
      slug,
      content,
      shortContent,
      imageUrl,
      category: new mongoose.Types.ObjectId(category),
      metaTitle,
      metaDescription,
      metaKeywords,
      status,
      isFeatured,
      date: new Date(),
    });

    const savedBlog = await blog.save();
    return NextResponse.json({ success: true, data: savedBlog });
  } catch (err) {
    console.error('❌ Error creating blog:', err);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}




// ✅ DELETE: Delete blog and associated image
export async function DELETE(req: Request) {
  await dbConnect();

  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Delete image from /public/uploads if exists
    if (blog.imageUrl) {
      const imagePath = path.join(process.cwd(), 'public', blog.imageUrl);
      try {
        await unlink(imagePath);
      } catch (err) {
        console.warn('⚠️ Failed to delete image:', err);
      }
    }

    // Delete the blog from database
    await Blog.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    console.error('❌ Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
