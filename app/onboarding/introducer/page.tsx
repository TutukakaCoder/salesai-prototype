'use client';

import IntroducerOnboardingForm from '../../components/IntroducerOnboardingForm';

export default function IntroducerOnboarding() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Introducer Onboarding</h1>
      <IntroducerOnboardingForm />
    </div>
  );
}