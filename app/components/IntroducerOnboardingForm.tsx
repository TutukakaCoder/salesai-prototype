'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

const introducerSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  companySize: z.string().min(1, 'Company size is required'),
  industry: z.string().min(1, 'Industry is required'),
  linkedinProfile: z.string().url('Invalid LinkedIn URL'),
  successfulIntroductions: z.number().min(0, 'Must be a positive number'),
  expertise: z.array(z.string()).min(1, 'At least one expertise is required'),
  yearsOfExperience: z.number().min(0, 'Must be a positive number'),
  professionalBio: z.string().min(1, 'Professional bio is required'),
  averageContractValue: z.string().min(1, 'Average contract value is required'),
  preferredIndustries: z.array(z.string()).min(1, 'At least one preferred industry is required'),
  networkSize: z.string().min(1, 'Network size is required'),
});

type IntroducerFormData = z.infer<typeof introducerSchema>;

export default function IntroducerOnboardingForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<IntroducerFormData>({
    resolver: zodResolver(introducerSchema),
  });

  const onSubmit: SubmitHandler<IntroducerFormData> = async (data) => {
    try {
      const response = await fetch('/api/profile/onboarding-introducer', {
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
        <label htmlFor="successfulIntroductions" className="block text-sm font-medium text-gray-700">
          Successful Introductions
        </label>
        <input
          type="number"
          id="successfulIntroductions"
          {...register('successfulIntroductions', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.successfulIntroductions && <p className="mt-1 text-sm text-red-600">{errors.successfulIntroductions.message}</p>}
      </div>

      <div>
        <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">
          Expertise (comma-separated)
        </label>
        <input
          type="text"
          id="expertise"
          {...register('expertise')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.expertise && <p className="mt-1 text-sm text-red-600">{errors.expertise.message}</p>}
      </div>

      <div>
        <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
          Years of Experience
        </label>
        <input
          type="number"
          id="yearsOfExperience"
          {...register('yearsOfExperience', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.yearsOfExperience && <p className="mt-1 text-sm text-red-600">{errors.yearsOfExperience.message}</p>}
      </div>

      <div>
        <label htmlFor="professionalBio" className="block text-sm font-medium text-gray-700">
          Professional Bio
        </label>
        <textarea
          id="professionalBio"
          {...register('professionalBio')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows={4}
        ></textarea>
        {errors.professionalBio && <p className="mt-1 text-sm text-red-600">{errors.professionalBio.message}</p>}
      </div>

      <div>
        <label htmlFor="averageContractValue" className="block text-sm font-medium text-gray-700">
          Average Contract Value
        </label>
        <input
          type="text"
          id="averageContractValue"
          {...register('averageContractValue')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.averageContractValue && <p className="mt-1 text-sm text-red-600">{errors.averageContractValue.message}</p>}
      </div>

      <div>
        <label htmlFor="preferredIndustries" className="block text-sm font-medium text-gray-700">
          Preferred Industries (comma-separated)
        </label>
        <input
          type="text"
          id="preferredIndustries"
          {...register('preferredIndustries')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.preferredIndustries && <p className="mt-1 text-sm text-red-600">{errors.preferredIndustries.message}</p>}
      </div>

      <div>
        <label htmlFor="networkSize" className="block text-sm font-medium text-gray-700">
          Network Size
        </label>
        <input
          type="text"
          id="networkSize"
          {...register('networkSize')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.networkSize && <p className="mt-1 text-sm text-red-600">{errors.networkSize.message}</p>}
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