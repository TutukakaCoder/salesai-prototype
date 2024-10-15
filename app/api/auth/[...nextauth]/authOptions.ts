import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import LinkedInProvider from "next-auth/providers/linkedin";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User, { IUser, UserType } from "@/models/User";
import { Document, Types } from 'mongoose';

interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        await dbConnect();
        const user = await User.findOne({ email: credentials.email }) as IUserDocument | null;
        if (!user || !user.password) {
          return null;
        }
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) {
          return null;
        }
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          userType: user.userType,
          onboardingCompleted: user.onboardingCompleted,
        };
      }
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: { scope: "openid profile email" }
      },
      issuer: "https://www.linkedin.com",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      async profile(profile, tokens) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          userType: "unassigned" as UserType,
          onboardingCompleted: false,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userType = user.userType;
        token.onboardingCompleted = user.onboardingCompleted;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).userType = token.userType;
        (session.user as any).onboardingCompleted = token.onboardingCompleted;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "linkedin") {
        try {
          await dbConnect();
          let existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            existingUser = new User({
              name: user.name,
              email: user.email,
              image: user.image,
              userType: "unassigned",
              onboardingCompleted: false,
            });
            await existingUser.save();
          }
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/user-type-selection",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
};