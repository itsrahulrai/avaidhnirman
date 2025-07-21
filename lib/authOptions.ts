import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from './mongoClient';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@models/User';
import bcrypt from 'bcryptjs';
import dbConnect from './mongodb'; // ✅ use your existing mongodb.ts

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
  try {
    console.log("🛠 Connecting DB...");
    await dbConnect();
    console.log("✅ DB connected");

    const { email, password } = credentials || {};
    console.log("📨 Email:", email, "| 🔒 Password:", password);

    if (!email || !password) throw new Error("Email and password are required");

    const user = await User.findOne({ email });
    console.log("👤 User found:", user);

    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 Password match:", isMatch);

    if (!isMatch) throw new Error("Invalid credentials");

    console.log("✅ Auth successful");
    return { id: user._id.toString(), email: user.email, role: user.role };
  } catch (error) {
    console.error("🚨 Login failed:", error);
    throw new Error("Login failed");
  }
},
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
