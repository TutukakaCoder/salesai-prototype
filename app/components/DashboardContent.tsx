import React from 'react';
import { useSession } from 'next-auth/react';

type UserType = 'introducer' | 'vendor' | 'buyer';

const DashboardContent: React.FC = () => {
  const { data: session } = useSession();
  const userType = session?.user?.userType as UserType;

  const renderDashboardContent = () => {
    switch (userType) {
      case 'introducer':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Introducer Dashboard</h2>
            {/* Add introducer-specific content here */}
          </div>
        );
      case 'vendor':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Vendor Dashboard</h2>
            {/* Add vendor-specific content here */}
          </div>
        );
      case 'buyer':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Buyer Dashboard</h2>
            {/* Add buyer-specific content here */}
          </div>
        );
      default:
        return <div>Invalid user type</div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to your Dashboard</h1>
      {renderDashboardContent()}
    </div>
  );
};

export default DashboardContent;