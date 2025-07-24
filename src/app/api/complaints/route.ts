import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@lib/mongodb';
import ComplaintModel from '@models/Complaint';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const location = formData.get('location') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    const files = formData.getAll('images') as File[];

    const imageUrls: string[] = [];

    for (const file of files) {
      if (file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${uuidv4()}-${file.name}`;
        const filePath = path.join(process.cwd(), 'public/uploads', fileName);

        // Ensure directory exists
        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        await writeFile(filePath, buffer);
        imageUrls.push(`/uploads/${fileName}`);
      }
    }

    const newComplaint = new ComplaintModel({
      fullName,
      email,
      phone,
      location,
      subject,
      message,
      images: imageUrls,
    });

    await newComplaint.save();

    return NextResponse.json({ message: 'Complaint submitted successfully' }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}


export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const complaints = await ComplaintModel.find({});
    return NextResponse.json({ success: true, data: complaints }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching complaints:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}