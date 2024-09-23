'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [content, setContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    if (status === 'loading') {
      setContent(<p>Loading...</p>);
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else {
      setContent(
        <div className="min-h-screen bg-gray-100">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                  <p className="text-center mt-8">Welcome, {session?.user?.name}!</p>
                  {/* Add more dashboard content here */}
                </div>
              </div>
            </div>
          </main>
        </div>
      );
    }
  }, [session, status, router]);

  return <>{content}</>;
}