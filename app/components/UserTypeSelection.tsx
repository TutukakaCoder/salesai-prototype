// File: app/components/UserTypeSelection.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LoadingSpinner from './LoadingSpinner';

const UserTypeSelection: React.FC = () => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.userType && session.user.userType !== 'unassigned') {
      router.push('/dashboard');
    }
  }, [session, router]);

  const handleUserTypeSelection = async () => {
    if (!selectedType) return;

    try {
      const response = await fetch('/api/user/update-type', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userType: selectedType }),
      });

      if (response.ok) {
        await update({ userType: selectedType });
        router.push('/onboarding');
      } else {
        console.error('Failed to update user type');
      }
    } catch (error) {
      console.error('Error updating user type:', error);
    }
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Select Your User Type</h2>
      <div className="space-y-4">
        {['Introducer', 'Vendor', 'Buyer'].map((type) => (
          <button
            key={type}
            className={`w-full p-4 border rounded-lg transition-colors ${
              selectedType === type ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-100'
            }`}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <button
        className="w-full mt-6 p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        onClick={handleUserTypeSelection}
        disabled={!selectedType}
      >
        Continue
      </button>
    </div>
  );
};

export default UserTypeSelection;