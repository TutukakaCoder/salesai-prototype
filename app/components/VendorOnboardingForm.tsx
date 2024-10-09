'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

const vendorSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  companySize: z.string().min(1, 'Company size is required'),
  industry: z.string().min(1, 'Industry is required'),
  productsServices: z.array(z.string()).min(1, 'At least one product/service is required'),
  foundedYear: z.number().min(1800, 'Invalid year').max(new Date().getFullYear(), 'Year cannot be in the future'),
  headquartersLocation: z.string().min(1, 'Headquarters location is required'),
  companyDescription: z.string().min(1, 'Company description is required'),
  targetIndustries: z.array(z.string()).min(1, 'At least one target industry is required'),
  contractValueRange: z.string().min(1, 'Contract value range is required'),
  linkedinProfile: z.string().url('Invalid LinkedIn URL'),
});

type VendorFormData = z.infer<typeof vendorSchema>;

export default function VendorOnboardingForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),
  });

  const onSubmit: SubmitHandler<VendorFormData> = async (data) => {
    try {
      const response = await fetch('/api/profile/onboarding-vendor', {
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          {...register('companyName')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>}
      </div>

      <div>
        <label htmlFor="companySize" className="block text-sm font-medium text-gray-700">
          Company Size
        </label>
        <input
          type="text"
          id="companySize"
          {...register('companySize')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.companySize && <p className="mt-1 text-sm text-red-600">{errors.companySize.message}</p>}
      </div>

      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
          Industry
        </label>
        <input
          type="text"
          id="industry"
          {...register('industry')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.industry && <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>}
      </div>

      <div>
        <label htmlFor="productsServices" className="block text-sm font-medium text-gray-700">
          Products/Services (comma-separated)
        </label>
        <input
          type="text"
          id="productsServices"
          {...register('productsServices')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.productsServices && <p className="mt-1 text-sm text-red-600">{errors.productsServices.message}</p>}
      </div>

      <div>
        <label htmlFor="foundedYear" className="block text-sm font-medium text-gray-700">
          Founded Year
        </label>
        <input
          type="number"
          id="foundedYear"
          {...register('foundedYear', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.foundedYear && <p className="mt-1 text-sm text-red-600">{errors.foundedYear.message}</p>}
      </div>

      <div>
        <label htmlFor="headquartersLocation" className="block text-sm font-medium text-gray-700">
          Headquarters Location
        </label>
        <input
          type="text"
          id="headquartersLocation"
          {...register('headquartersLocation')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.headquartersLocation && <p className="mt-1 text-sm text-red-600">{errors.headquartersLocation.message}</p>}
      </div>

      <div>
        <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700">
          Company Description
        </label>
        <textarea
          id="companyDescription"
          {...register('companyDescription')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows={4}
        ></textarea>
        {errors.companyDescription && <p className="mt-1 text-sm text-red-600">{errors.companyDescription.message}</p>}
      </div>

      <div>
        <label htmlFor="targetIndustries" className="block text-sm font-medium text-gray-700">
          Target Industries (comma-separated)
        </label>
        <input
          type="text"
          id="targetIndustries"
          {...register('targetIndustries')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.targetIndustries && <p className="mt-1 text-sm text-red-600">{errors.targetIndustries.message}</p>}
      </div>

      <div>
        <label htmlFor="contractValueRange" className="block text-sm font-medium text-gray-700">
          Contract Value Range
        </label>
        <input
          type="text"
          id="contractValueRange"
          {...register('contractValueRange')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.contractValueRange && <p className="mt-1 text-sm text-red-600">{errors.contractValueRange.message}</p>}
      </div>

      <div>
        <label htmlFor="linkedinProfile" className="block text-sm font-medium text-gray-700">
          LinkedIn Profile
        </label>
        <input
          type="url"
          id="linkedinProfile"
          {...register('linkedinProfile')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.linkedinProfile && <p className="mt-1 text-sm text-red-600">{errors.linkedinProfile.message}</p>}
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Complete Onboarding
        </button>
      </div>
    </form>
  );
}