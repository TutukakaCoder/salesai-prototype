'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import IntroducerOnboardingForm from '../components/IntroducerOnboardingForm';
import VendorOnboardingForm from '../components/VendorOnboardingForm';
import BuyerOnboardingForm from '../components/BuyerOnboardingForm';
import LoadingSpinner from '../components/LoadingSpinner';

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserType = async () => {
      const response = await fetch('/api/user/get-user-type');
      if (response.ok) {
        const data = await response.json();
        setUserType(data.userType);
      } else {
        console.error('Failed to fetch user type');
      }
    };

    if (session) {
      fetchUserType();
    }
  }, [session]);

  if (status === 'loading' || !userType) {
    return <LoadingSpinner />;
  }

  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  const handleSkip = () => {
    router.push('/dashboard');
  };

  const renderOnboardingForm = () => {
    switch (userType) {
      case 'introducer':
        return <IntroducerOnboardingForm />;
      case 'vendor':
        return <VendorOnboardingForm />;
      case 'buyer':
        return <BuyerOnboardingForm />;
      default:
        return <div>Invalid user type</div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Complete Your Profile</h1>
        <button
          onClick={handleSkip}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
        >
          Skip for now
        </button>
      </div>
      {renderOnboardingForm()}
    </div>
  );
}