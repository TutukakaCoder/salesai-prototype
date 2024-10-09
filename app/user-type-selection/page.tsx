'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function UserTypeSelection() {
  const [selectedType, setSelectedType] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session, update } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedType) {
      setError('Please select a user type');
      return;
    }

    try {
      const response = await fetch('/api/user/update-type', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userType: selectedType.toLowerCase() }),
      });

      if (response.ok) {
        await update({ userType: selectedType.toLowerCase() });
        router.push('/onboarding');
      } else {
        const data = await response.json();
        setError(data.message || 'An error occurred while updating user type');
      }
    } catch (error) {
      setError('An error occurred while updating user type');
      console.error('User type update error:', error);
    }
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Select Your User Type</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {['Introducer', 'Vendor', 'Buyer'].map((type) => (
              <div key={type} className="flex items-center">
                <input
                  id={type}
                  name="userType"
                  type="radio"
                  value={type}
                  checked={selectedType === type}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <label htmlFor={type} className="ml-3 block text-sm font-medium text-gray-700">
                  {type}
                </label>
              </div>
            ))}
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}