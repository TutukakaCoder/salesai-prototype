import NextAuth, { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import LinkedInProvider from "next-auth/providers/linkedin";
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import User, { IUser } from '@/models/User';

interface ExtendedUser extends NextAuthUser {
  userType?: string;
}

const useSecureCookies = process.env.NEXTAUTH_URL?.startsWith('https://') ?? !!process.env.VERCEL_URL;
const cookiePrefix = useSecureCookies ? '__Secure-' : '';
const hostName = process.env.NEXTAUTH_URL || process.env.VERCEL_URL || null;

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

        const user = await User.findOne({ email: credentials.email }).lean();

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
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid profile email',
          response_type: 'code',
        },
      },
      issuer: 'https://www.linkedin.com/oauth',
      jwks_endpoint: 'https://www.linkedin.com/oauth/openid/jwks',
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.userType = (user as ExtendedUser).userType;
      }
      if (account?.provider === "linkedin") {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as ExtendedUser).userType = token.userType as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "linkedin" && profile) {
        await dbConnect();
        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
          // Update existing user with LinkedIn data
          existingUser.name = user.name || '';
          existingUser.linkedinId = profile.sub;
          if (user.image) {
            existingUser.image = user.image;
          }
          await existingUser.save();
        } else {
          // Create new user with LinkedIn data
          const newUser = new User({
            email: user.email,
            name: user.name || '',
            linkedinId: profile.sub,
            userType: "unassigned", // Default user type
            image: user.image,
          });
          await newUser.save();
        }
      }
      return true;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        domain: hostName ? `.${hostName}` : undefined,
      },
    },
  },
};

export default NextAuth(authOptions);