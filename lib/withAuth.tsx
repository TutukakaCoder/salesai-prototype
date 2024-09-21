'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ComponentType } from 'react';

export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  return function WithAuth(props: P) {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
      return <p>Loading...</p>;
    }

    if (!session) {
      router.push('/auth/signin');
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}