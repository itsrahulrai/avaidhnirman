import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from './mongoClient';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/User'; // You’ll create this
import bcrypt from 'bcryptjs';


export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await User.findOne({ email: credentials.email });

        if (!user) throw new Error('No user found');
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error('Invalid password');

        return {
          id: user._id,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: '/admin-login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
