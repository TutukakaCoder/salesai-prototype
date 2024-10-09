'use client';

import VendorOnboardingForm from '../../components/VendorOnboardingForm';

export default function VendorOnboarding() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Vendor Onboarding</h1>
      <VendorOnboardingForm />
    </div>
  );
}