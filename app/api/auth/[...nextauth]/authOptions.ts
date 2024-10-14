// File: app/api/auth/[...nextauth]/authOptions.ts

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import LinkedInProvider from "next-auth/providers/linkedin";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User, { IUser, UserType } from "@/models/User";
import { Types } from 'mongoose';

// Type guard to check if a user object has the _id property
function isUserWithId(user: any): user is IUser & { _id: Types.ObjectId } {
  return user && user._id && typeof user._id.toString === 'function';
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
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

        if (!user || !user.password) {
          return null;
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordCorrect) {
          return null;
        }

        if (isUserWithId(user)) {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            userType: user.userType,
            onboardingCompleted: user.onboardingCompleted,
            image: user.image
          };
        }

        return null;
      }
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: { scope: 'openid profile email' }
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          userType: 'unassigned' as UserType,
          onboardingCompleted: false
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'linkedin') {
        await dbConnect();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          const newUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            userType: 'unassigned',
            onboardingCompleted: false
          });
          if (isUserWithId(newUser)) {
            user.id = newUser._id.toString();
            user.userType = newUser.userType;
            user.onboardingCompleted = newUser.onboardingCompleted;
          }
        } else if (isUserWithId(existingUser)) {
          user.id = existingUser._id.toString();
          user.userType = existingUser.userType;
          user.onboardingCompleted = existingUser.onboardingCompleted;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.userType = user.userType as UserType;
        token.onboardingCompleted = user.onboardingCompleted as boolean;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.userType = token.userType as UserType;
        session.user.onboardingCompleted = token.onboardingCompleted as boolean;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/user-type-selection",
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === 'development',
};