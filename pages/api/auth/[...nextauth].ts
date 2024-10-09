import NextAuth, { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

interface ExtendedUser extends NextAuthUser {
  userType?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await dbConnect();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          return null;
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordCorrect) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          userType: user.userType,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userType = (user as ExtendedUser).userType;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as ExtendedUser).userType = token.userType as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);