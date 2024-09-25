'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { UserType } from '@/models/User';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  matchScore: number;
}

export default function Marketplace() {
  const { data: session, status } = useSession();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    if (session?.user?.userType) {
      fetchRecommendations(session.user.userType as UserType);
    }
  }, [session]);

  const fetchRecommendations = async (userType: UserType) => {
    // Placeholder data
    const placeholderRecommendations: Recommendation[] = [
      { id: '1', title: 'Product A', description: 'Description for Product A', matchScore: 0.95 },
      { id: '2', title: 'Service B', description: 'Description for Service B', matchScore: 0.88 },
      { id: '3', title: 'Product C', description: 'Description for Product C', matchScore: 0.82 },
    ];
    
    console.log(`Fetching recommendations for user type: ${userType}`);
    setRecommendations(placeholderRecommendations);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to access the marketplace.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Marketplace</h1>
      {recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((item) => (
            <div key={item.id} className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <p className="text-sm text-indigo-600">Match Score: {(item.matchScore * 100).toFixed(2)}%</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No recommendations available at the moment.</p>
      )}
    </div>
  );
}