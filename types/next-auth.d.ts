// File: types/next-auth.d.ts

import NextAuth, { DefaultSession } from "next-auth"
import { UserType } from "@/models/User"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userType: UserType;
      onboardingCompleted: boolean;
    } & DefaultSession["user"]
  }

  interface User {
    id: string;
    userType: UserType;
    onboardingCompleted: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userType: UserType;
    onboardingCompleted: boolean;
  }
}