import React from 'react';

interface Match {
  id: string;
  vendorName: string;
  buyerName: string;
  matchScore: number;
  productService: string;
}

interface MatchRecommendationsProps {
  matches: Match[];
  onInitiateIntroduction: (matchId: string) => void;
}

const MatchRecommendations: React.FC<MatchRecommendationsProps> = ({ matches, onInitiateIntroduction }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {matches.map((match) => (
          <li key={match.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">
                  {match.vendorName} - {match.buyerName}
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Match Score: {match.matchScore}%
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {match.productService}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <button
                    onClick={() => onInitiateIntroduction(match.id)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Initiate Introduction
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchRecommendations;
