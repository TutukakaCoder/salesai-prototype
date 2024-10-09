'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

const buyerSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  companySize: z.string().min(1, 'Company size is required'),
  industry: z.string().min(1, 'Industry is required'),
  companyDescription: z.string().min(1, 'Company description is required'),
  linkedinProfile: z.string().url('Invalid LinkedIn URL'),
  businessChallenges: z.array(z.string()).min(1, 'At least one business challenge is required'),
  interestedProductsServices: z.array(z.string()).min(1, 'At least one product/service is required'),
  budgetRange: z.string().min(1, 'Budget range is required'),
  decisionTimeframe: z.string().min(1, 'Decision timeframe is required'),
});

type BuyerFormData = z.infer<typeof buyerSchema>;

export default function BuyerOnboardingForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<BuyerFormData>({
    resolver: zodResolver(buyerSchema),
  });

  const onSubmit: SubmitHandler<BuyerFormData> = async (data) => {
    try {
      const response = await fetch('/api/profile/onboarding-buyer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        console.error('Onboarding failed');
      }
    } catch (error) {
      console.error('Error during onboarding:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
        <input
          {...register('companyName')}
          type="text"
          id="companyName"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>}
      </div>

      <div>
        <label htmlFor="companySize" className="block text-sm font-medium text-gray-700">Company Size</label>
        <select
          {...register('companySize')}
          id="companySize"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select company size</option>
          <option value="1-10">1-10 employees</option>
          <option value="11-50">11-50 employees</option>
          <option value="51-200">51-200 employees</option>
          <option value="201-500">201-500 employees</option>
          <option value="501+">501+ employees</option>
        </select>
        {errors.companySize && <p className="mt-1 text-sm text-red-600">{errors.companySize.message}</p>}
      </div>

      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
        <input
          {...register('industry')}
          type="text"
          id="industry"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.industry && <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>}
      </div>

      <div>
        <label htmlFor="businessChallenges" className="block text-sm font-medium text-gray-700">Business Challenges</label>
        <input
          {...register('businessChallenges')}
          type="text"
          id="businessChallenges"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.businessChallenges && <p className="mt-1 text-sm text-red-600">{errors.businessChallenges.message}</p>}
      </div>

      <div>
        <label htmlFor="interestedProductsServices" className="block text-sm font-medium text-gray-700">Interested Products/Services</label>
        <input
          {...register('interestedProductsServices')}
          type="text"
          id="interestedProductsServices"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.interestedProductsServices && <p className="mt-1 text-sm text-red-600">{errors.interestedProductsServices.message}</p>}
      </div>

      <div>
        <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700">Budget Range</label>
        <select
          {...register('budgetRange')}
          id="budgetRange"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select budget range</option>
          <option value="0-10k">$0 - $10,000</option>
          <option value="10k-50k">$10,000 - $50,000</option>
          <option value="50k-100k">$50,000 - $100,000</option>
          <option value="100k-500k">$100,000 - $500,000</option>
          <option value="500k+">$500,000+</option>
        </select>
        {errors.budgetRange && <p className="mt-1 text-sm text-red-600">{errors.budgetRange.message}</p>}
      </div>

      <div>
        <label htmlFor="decisionTimeframe" className="block text-sm font-medium text-gray-700">Decision Timeframe</label>
        <select
          {...register('decisionTimeframe')}
          id="decisionTimeframe"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select decision timeframe</option>
          <option value="immediate">Immediate</option>
          <option value="1-3 months">1-3 months</option>
          <option value="3-6 months">3-6 months</option>
          <option value="6-12 months">6-12 months</option>
          <option value="12+ months">12+ months</option>
        </select>
        {errors.decisionTimeframe && <p className="mt-1 text-sm text-red-600">{errors.decisionTimeframe.message}</p>}
      </div>

      <div>
        <label htmlFor="linkedinProfile" className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
        <input
          {...register('linkedinProfile')}
          type="url"
          id="linkedinProfile"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.linkedinProfile && <p className="mt-1 text-sm text-red-600">{errors.linkedinProfile.message}</p>}
      </div>

      <div>
        <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700">Company Description</label>
        <textarea
          {...register('companyDescription')}
          id="companyDescription"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
        {errors.companyDescription && <p className="mt-1 text-sm text-red-600">{errors.companyDescription.message}</p>}
      </div>

      <div>
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          Complete Buyer Profile
        </button>
      </div>
    </form>
  );
}
