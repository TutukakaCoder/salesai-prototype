'use client';

import BuyerOnboardingForm from '../../components/BuyerOnboardingForm';

export default function BuyerOnboarding() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Buyer Onboarding</h1>
      <BuyerOnboardingForm />
    </div>
  );
}