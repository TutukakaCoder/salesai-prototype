'use client';

import { useRouter } from 'next/navigation';
import BuyerOnboardingForm from '../../components/BuyerOnboardingForm';

export default function BuyerOnboarding() {
  const router = useRouter();

  const handleSkip = () => {
    router.push('/dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Buyer Onboarding</h1>
        <button
          onClick={handleSkip}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Skip for now
        </button>
      </div>
      <BuyerOnboardingForm />
    </div>
  );
}