import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type OnboardingFormProps = {
  onSubmit: (data: FormData) => void;
};

const baseSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const introducerSchema = baseSchema.extend({
  userType: z.literal('Introducer'),
  expertise: z.array(z.string()).min(1, 'Please specify at least one area of expertise'),
  industries: z.array(z.string()).min(1, 'Please specify at least one industry'),
});

const vendorSchema = baseSchema.extend({
  userType: z.literal('Vendor'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  products: z.array(z.string()).optional(),
  services: z.array(z.string()).optional(),
  commissionRates: z.record(z.number().min(0).max(100)),
});

const buyerSchema = baseSchema.extend({
  userType: z.literal('Buyer'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  requirements: z.array(z.string()).min(1, 'Please specify at least one requirement'),
  budget: z.number().min(0, 'Budget must be a positive number'),
});

const formSchema = z.discriminatedUnion('userType', [
  introducerSchema,
  vendorSchema,
  buyerSchema,
]);

type FormData = z.infer<typeof formSchema>;

type IntroducerFields = {
  expertise: string[];
  industries: string[];
};

type VendorFields = {
  company: string;
  products?: string[];
  services?: string[];
  commissionRates: Record<string, number>;
};

type BuyerFields = {
  company: string;
  requirements: string[];
  budget: number;
};

export default function OnboardingForm({ onSubmit }: OnboardingFormProps) {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const watchUserType = watch('userType');

  const renderErrorMessage = (fieldName: keyof FormData | keyof IntroducerFields | keyof VendorFields | keyof BuyerFields) => {
    const error = errors[fieldName as keyof FormData];
    return error ? <p className="mt-1 text-sm text-red-600">{error.message}</p> : null;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                {...register('name')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {renderErrorMessage('name')}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                {...register('email')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {renderErrorMessage('email')}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                {...register('password')}
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {renderErrorMessage('password')}
            </div>
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">User Type</label>
              <select
                {...register('userType')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Introducer">Introducer</option>
                <option value="Vendor">Vendor</option>
                <option value="Buyer">Buyer</option>
              </select>
            </div>
          </>
        );
      case 2:
        switch (watchUserType) {
          case 'Introducer':
            return (
              <>
                <div>
                  <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">Expertise</label>
                  <input
                    {...register('expertise')}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {renderErrorMessage('expertise')}
                </div>
                <div>
                  <label htmlFor="industries" className="block text-sm font-medium text-gray-700">Industries</label>
                  <input
                    {...register('industries')}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {renderErrorMessage('industries')}
                </div>
              </>
            );
          case 'Vendor':
            return (
              <>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    {...register('company')}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {renderErrorMessage('company')}
                </div>
                <div>
                  <label htmlFor="products" className="block text-sm font-medium text-gray-700">Products</label>
                  <input
                    {...register('products')}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {renderErrorMessage('products')}
                </div>
                <div>
                  <label htmlFor="services" className="block text-sm font-medium text-gray-700">Services</label>
                  <input
                    {...register('services')}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {renderErrorMessage('services')}
                </div>
                <div>
                  <label htmlFor="commissionRates" className="block text-sm font-medium text-gray-700">Commission Rates</label>
                  <input
                    {...register('commissionRates')}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {renderErrorMessage('commissionRates')}
                </div>
              </>
            );
          case 'Buyer':
            return (
              <>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    {...register('company')}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {renderErrorMessage('company')}
                </div>
                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">Requirements</label>
                  <input
                    {...register('requirements')}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {renderErrorMessage('requirements')}
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget</label>
                  <input
                    {...register('budget', { valueAsNumber: true })}
                    type="number"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {renderErrorMessage('budget')}
                </div>
              </>
            );
          default:
            return null;
        }
      default:
        return null;
    }
  };

  const onSubmitForm = (data: FormData) => {
    if (step === 1) {
      setStep(2);
    } else {
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      {renderStep()}
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {step === 1 ? 'Next' : 'Submit'}
        </button>
      </div>
    </form>
  );
}