'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserType } from '@/models/User';

export default function UserTypeSelection() {
  const [selectedType, setSelectedType] = useState<UserType | null>(null);
  const router = useRouter();

  const handleSelection = async (type: UserType) => {
    setSelectedType(type);
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userType: type }),
      });

      if (response.ok) {
        router.push('/onboarding');
      } else {
        console.error('Failed to update user type');
      }
    } catch (error) {
      console.error('Error updating user type:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 m-8">
        <h1 className="text-white text-3xl font-bold">Sales AI</h1>
      </div>
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Select Your User Type
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => handleSelection('Introducer')}
              className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 ${
                selectedType === 'Introducer' ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
              }`}
            >
              Introducer
            </button>
            <button
              onClick={() => handleSelection('Vendor')}
              className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 ${
                selectedType === 'Vendor' ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
              }`}
            >
              Vendor
            </button>
            <button
              onClick={() => handleSelection('Buyer')}
              className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 ${
                selectedType === 'Buyer' ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
              }`}
            >
              Buyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}