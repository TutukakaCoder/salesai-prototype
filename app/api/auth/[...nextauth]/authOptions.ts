import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import LinkedInProvider from "next-auth/providers/linkedin";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User, { IUser, UserType } from "@/models/User";

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
        const user = await User.findOne({ email: credentials.email }) as (IUser & { _id: any }) | null;
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
        params: {
          scope: 'openid profile email',
          redirect_uri: 'https://salesai-prototype-pi.vercel.app/api/auth/callback/linkedin',
        },
      },
      profile(profile) {
        console.log("LinkedIn profile:", profile);
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
    async signIn({ user, account, profile, email, credentials }) {
      console.log("SignIn callback:", { user, account, profile, email });
      if (account?.provider === "linkedin") {
        try {
          await dbConnect();
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            console.log("Creating new user:", user);
            const newUser = new User({
              name: user.name,
              email: user.email,
              image: user.image,
              userType: "unassigned",
              onboardingCompleted: false,
            });
            await newUser.save();
          } else {
            console.log("Existing user found:", existingUser);
          }
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      console.log("JWT callback:", { token, user, account });
      if (user) {
        token.userType = user.userType;
        token.onboardingCompleted = user.onboardingCompleted;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback:", { session, token });
      if (session.user) {
        session.user.userType = token.userType as UserType;
        session.user.onboardingCompleted = token.onboardingCompleted as boolean;
        (session as any).accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/user-type-selection",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === 'development',
};