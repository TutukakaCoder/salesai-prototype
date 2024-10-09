import 'next-auth';
import { UserType } from '@/models/User'

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    userType?: UserType;
    company?: string;
    companySize?: number;
    foundingDate?: Date;
    location?: string;
    socialMediaProfiles?: string[];
    expertise?: string[];
    industries?: string[];
    products?: string[];
    services?: string[];
    requirements?: string;
    budget?: number;
    onboardingCompleted?: boolean;
  }

  interface Session {
    user: User;
  }
}