import { NextResponse } from 'next/server';
import dbConnect from '@lib/mongodb';
import Category from '@models/Category';

// GET: Fetch all categories
export async function GET() {
  try {
    await dbConnect();

    const categories = await Category.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error fetching categories', error },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const { categoryName, slug, parentCategory } = body;

    const newCategory = await Category.create({
      categoryName,
      slug,
      parentCategory,
      isActive: true,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, data: newCategory }, { status: 201 });
  } catch (error) {
    console.error("Category creation failed:", error);
    return NextResponse.json({ success: false, message: 'Failed to create category' }, { status: 500 });
  }
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = params;

    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Category not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Category deleted." });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to delete.", error }, { status: 500 });
  }
}