// app/dashboard/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (session?.user) {
      setUserType(session.user.userType as string);
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <nav>
            <Link href="/profile" className="text-gray-600 hover:text-gray-900 mr-4">
              Profile
            </Link>
            <button
              onClick={() => {
                // Add logout functionality here
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold text-gray-900">Welcome, {session.user?.name}!</h2>
            <p className="mt-2 text-gray-600">You are logged in as a {userType}.</p>

            {userType === 'Introducer' && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900">Introducer Dashboard</h3>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <DashboardCard title="Active Introductions" value="5" />
                  <DashboardCard title="Successful Matches" value="12" />
                  <DashboardCard title="Pending Requests" value="3" />
                </div>
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900">Recent Matches</h4>
                  {/* Add recent matches list here */}
                </div>
                <div className="mt-6">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Find New Matches
                  </button>
                </div>
              </div>
            )}

            {userType === 'Vendor' && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900">Vendor Dashboard</h3>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <DashboardCard title="Active Leads" value="8" />
                  <DashboardCard title="Products/Services" value="15" />
                  <DashboardCard title="Conversion Rate" value="65%" />
                </div>
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900">Recent Introductions</h4>
                  {/* Add recent introductions list here */}
                </div>
                <div className="mt-6">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">
                    Manage Products/Services
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View Leads
                  </button>
                </div>
              </div>
            )}

            {userType === 'Buyer' && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900">Buyer Dashboard</h3>
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <DashboardCard title="Active Requests" value="3" />
                  <DashboardCard title="Received Proposals" value="7" />
                  <DashboardCard title="Completed Purchases" value="2" />
                </div>
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900">Recent Matches</h4>
                  {/* Add recent matches list here */}
                </div>
                <div className="mt-6">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                    Create New Request
                  </button>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    View Proposals
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const DashboardCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
          {/* Add an icon here */}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="text-lg font-semibold text-gray-900">{value}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;