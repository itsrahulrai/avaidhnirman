// lib/multer.ts
import multer from "multer";
import path from "path";
import { NextRequest } from "next/server";

// Set up storage
const storage = multer.diskStorage({
  destination: "./public/uploads/blogs",
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

export default upload;
