import { useState } from 'react';
import { useForm, FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type OnboardingFormProps = {
  onSubmit: (data: Record<string, unknown>) => void;
};

const baseSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  userType: z.enum(['Introducer', 'Vendor', 'Buyer']),
});

const introducerSchema = baseSchema.extend({
  expertise: z.array(z.string()).min(1, 'Please specify at least one area of expertise'),
  industries: z.array(z.string()).min(1, 'Please specify at least one industry'),
});

const vendorSchema = baseSchema.extend({
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  products: z.array(z.string()).optional(),
  services: z.array(z.string()).optional(),
  commissionRates: z.record(z.number().min(0).max(100)),
});

const buyerSchema = baseSchema.extend({
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  requirements: z.array(z.string()).min(1, 'Please specify at least one requirement'),
  budget: z.number().min(0, 'Budget must be a positive number'),
});

const schema = z.discriminatedUnion('userType', [
  introducerSchema,
  vendorSchema,
  buyerSchema,
]);

export default function OnboardingForm({ onSubmit }: OnboardingFormProps) {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(schema),
  });

  const watchUserType = watch('userType');

  const renderErrorMessage = (error: FieldError | undefined) => {
    return error ? <p className="mt-2 text-sm text-red-600">{error.message}</p> : null;
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
              {renderErrorMessage(errors.name as FieldError)}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                {...register('email')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {renderErrorMessage(errors.email as FieldError)}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                {...register('password')}
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {renderErrorMessage(errors.password as FieldError)}
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
              {renderErrorMessage(errors.userType as FieldError)}
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
                  {renderErrorMessage(errors.expertise as FieldError)}
                </div>
                <div>
                  <label htmlFor="industries" className="block text-sm font-medium text-gray-700">Industries</label>
                  <input
                    {...register('industries')}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {renderErrorMessage(errors.industries as FieldError)}
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
                  {renderErrorMessage(errors.company as FieldError)}
                </div>
                <div>
                  <label htmlFor="products" className="block text-sm font-medium text-gray-700">Products</label>
                  <input
                    {...register('products')}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {renderErrorMessage(errors.products as FieldError)}
                </div>
                <div>
                  <label htmlFor="services" className="block text-sm font-medium text-gray-700">Services</label>
                  <input
                    {...register('services')}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {renderErrorMessage(errors.services as FieldError)}
                </div>
                <div>
                  <label htmlFor="commissionRates" className="block text-sm font-medium text-gray-700">Commission Rates</label>
                  <input
                    {...register('commissionRates')}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {renderErrorMessage(errors.commissionRates as FieldError)}
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
                  {renderErrorMessage(errors.company as FieldError)}
                </div>
                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">Requirements</label>
                  <input
                    {...register('requirements')}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {renderErrorMessage(errors.requirements as FieldError)}
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget</label>
                  <input
                    {...register('budget', { valueAsNumber: true })}
                    type="number"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {renderErrorMessage(errors.budget as FieldError)}
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {renderStep()}
      <div className="flex justify-between">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Previous
          </button>
        )}
        {step < 2 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
}