import { NextResponse } from 'next/server';
import dbConnect from '@lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  await dbConnect();

  try {
    const blogs = await mongoose.connection.db.collection('blogs').aggregate([
      {
        $lookup: {
          from: 'categories',       
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true
        }
      },
      { $sort: { createdAt: -1 } }
    ]).toArray();

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
