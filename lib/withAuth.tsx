'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ComponentType, useEffect } from 'react';

export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  return function WithAuth(props: P) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'loading') return; // Do nothing while loading
      if (!session) router.push('/auth/signin');
    }, [session, status, router]);

    if (status === 'loading') {
      return <p>Loading...</p>;
    }

    if (!session) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}