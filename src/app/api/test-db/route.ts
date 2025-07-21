import { NextResponse } from 'next/server';
import dbConnect from "@lib/mongodb";

export async function GET() {
  try {
    const conn = await dbConnect();
    return NextResponse.json({ message: 'MongoDB connected', host: conn.connection.host });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json({ message: 'MongoDB connection failed', error: error.message }, { status: 500 });
  }
}
