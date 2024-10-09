'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      fetchUserType();
    }
  }, [status, router]);

  const fetchUserType = async () => {
    try {
      const response = await fetch('/api/user/get-user-type');
      if (response.ok) {
        const data = await response.json();
        setUserType(data.userType);
      } else {
        console.error('Failed to fetch user type');
      }
    } catch (error) {
      console.error('Error fetching user type:', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Profile</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p>Name: {session.user?.name}</p>
                <p>Email: {session.user?.email}</p>
                <p>User Type: {userType || 'Not set'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}