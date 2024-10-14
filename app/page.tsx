// File: app/page.tsx

'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from './components/LoadingSpinner';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      if (!session.user.userType) {
        router.push('/user-type-selection');
      } else {
        // Remove the check for onboardingCompleted as it's not part of the user object
        router.push('/dashboard');
      }
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return null;
}