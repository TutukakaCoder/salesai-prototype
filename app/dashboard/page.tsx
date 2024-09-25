'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardContent from '../components/DashboardContent';
import { UserType } from '@/models/User';

export default function Dashboard() {
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
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          <DashboardContent userType={userType} />
        </div>
      </div>
    </div>
  );
}