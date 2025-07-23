
import { NextRequest, NextResponse } from "next/server";
import dbConnect from  "@lib/mongodb";
import Blog from "@models/Blog";


import { writeFile } from "fs/promises";
import path from "path";
import { mkdir } from "fs/promises";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const blog = await Blog.findById(params.id).populate("category");
    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error fetching blog." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const fields: any = {};

    for (const [key, value] of formData.entries()) {
      if (key === "isFeatured") {
        fields[key] = value === "true";
      } else if (key !== "image") {
        fields[key] = value;
      }
    }

    // Handle image
    const image = formData.get("image") as File | null;
    if (image && typeof image.name === "string" && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public/uploads");

      await mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, image.name);
      await writeFile(filePath, buffer);

      fields.imageUrl = `/uploads/${image.name}`;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(params.id, fields, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return NextResponse.json({ success: false, message: "Blog not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ success: false, message: "Failed to update blog." }, { status: 500 });
  }
}
