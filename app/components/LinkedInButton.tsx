import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { FaLinkedin } from 'react-icons/fa';

interface LinkedInButtonProps {
  className?: string;
}

const LinkedInButton: React.FC<LinkedInButtonProps> = ({ className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signIn('linkedin', { callbackUrl: '/dashboard' });
      if (result?.error) {
        setError('Failed to sign in with LinkedIn. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleSignIn}
        disabled={isLoading}
        className={`flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0A66C2] hover:bg-[#004182] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A66C2] transition-colors duration-200 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        } ${className}`}
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <FaLinkedin className="w-5 h-5 mr-2" />
        )}
        {isLoading ? 'Signing in...' : 'Sign in with LinkedIn'}
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default LinkedInButton;