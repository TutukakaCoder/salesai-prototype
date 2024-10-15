import { signIn } from 'next-auth/react';
import { useState } from 'react';

const LinkedInButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLinkedInSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signIn('linkedin', { callbackUrl: '/user-type-selection' });
      console.log("LinkedIn sign-in result:", result);
    } catch (error) {
      console.error("LinkedIn sign-in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLinkedInSignIn}
      disabled={isLoading}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {isLoading ? 'Signing in...' : 'Sign in with LinkedIn'}
    </button>
  );
};

export default LinkedInButton;