'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <p className="text-xl mb-4">Welcome, {session.user?.name}</p>
      {/* Add your dashboard content here */}
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Activity</h2>
        <p>Dashboard content coming soon...</p>
      </div>
    </div>
  );
}