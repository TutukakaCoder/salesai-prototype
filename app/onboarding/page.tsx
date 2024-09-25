'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import OnboardingForm from '../components/OnboardingForm';
import { UserType } from '@/models/User';

export default function Onboarding() {
  const { status } = useSession();
  const router = useRouter();
  const [userType, setUserType] = useState<UserType | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      fetch('/api/profile')
        .then(response => response.json())
        .then(data => {
          if (data.user && data.user.userType) {
            setUserType(data.user.userType as UserType);
          } else {
            router.push('/user-type-selection');
          }
        })
        .catch(error => {
          console.error('Error fetching user profile:', error);
          router.push('/user-type-selection');
        });
    }
  }, [status, router]);

  if (status === 'loading' || !userType) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 m-8">
        <h1 className="text-white text-3xl font-bold">Sales AI</h1>
      </div>
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Complete Your Profile
          </h2>
        </div>
        <OnboardingForm initialUserType={userType} />
      </div>
    </div>
  );
}