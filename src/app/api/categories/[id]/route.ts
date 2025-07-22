import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@lib/mongodb';
import Category from '@models/Category';



export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const category = await Category.findById(params.id);
    if (!category) {
      return NextResponse.json({ success: false, message: "Category not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching category." }, { status: 500 });
  }
}


export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const deleted = await Category.findByIdAndDelete(params.id);

    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Category not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Category deleted.' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to delete.', error }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const data = await req.json();
    const updated = await Category.findByIdAndUpdate(params.id, data, { new: true });

    if (!updated) {
      return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Update failed', error }, { status: 500 });
  }
}
