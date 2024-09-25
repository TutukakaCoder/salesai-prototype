import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { UserType } from '@/models/User';

interface FormData {
  name: string;
  email: string;
  userType: UserType;
  company: string;
  companySize: number;
  foundingDate: string;
  location: string;
  expertise?: string[];
  industries?: string[];
  products?: string[];
  services?: string[];
  commissionRate?: number;
  requirements?: string;
  budget?: number;
}

interface OnboardingFormProps {
  initialUserType: UserType;
}

export default function OnboardingForm({ initialUserType }: OnboardingFormProps) {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      userType: initialUserType,
    },
  });
  const router = useRouter();

  const userType = watch('userType');

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const skipOnboarding = () => {
    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {step === 1 && (
        <>
          <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              {...register('company')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="companySize" className="block text-sm font-medium text-gray-700">Company Size</label>
            <input
              {...register('companySize', { valueAsNumber: true })}
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="foundingDate" className="block text-sm font-medium text-gray-700">Founding Date</label>
            <input
              {...register('foundingDate')}
              type="date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              {...register('location')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </>
      )}

      {step === 2 && userType === 'Introducer' && (
        <>
          <h2 className="text-2xl font-bold mb-4">Introducer Details</h2>
          <div>
            <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">Expertise (comma-separated)</label>
            <input
              {...register('expertise')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="industries" className="block text-sm font-medium text-gray-700">Industries (comma-separated)</label>
            <input
              {...register('industries')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </>
      )}

      {step === 2 && userType === 'Vendor' && (
        <>
          <h2 className="text-2xl font-bold mb-4">Vendor Details</h2>
          <div>
            <label htmlFor="products" className="block text-sm font-medium text-gray-700">Products (comma-separated)</label>
            <input
              {...register('products')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="services" className="block text-sm font-medium text-gray-700">Services (comma-separated)</label>
            <input
              {...register('services')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="commissionRate" className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
            <input
              {...register('commissionRate', { valueAsNumber: true })}
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </>
      )}

      {step === 2 && userType === 'Buyer' && (
        <>
          <h2 className="text-2xl font-bold mb-4">Buyer Details</h2>
          <div>
            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">Requirements</label>
            <textarea
              {...register('requirements')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows={4}
            ></textarea>
          </div>
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget</label>
            <input
              {...register('budget', { valueAsNumber: true })}
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </>
      )}

      <div className="flex justify-between">
        {step > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Previous
          </button>
        )}
        {step < 2 ? (
          <button
            type="button"
            onClick={nextStep}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={skipOnboarding}
        className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Skip Onboarding
      </button>
    </form>
  );
}