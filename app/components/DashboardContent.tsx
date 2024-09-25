import React, { useState, useEffect } from 'react';
import { UserType } from '@/models/User';

interface DashboardContentProps {
  userType: UserType;
}

interface UserData {
  name: string;
  successfulIntroductions?: number;
  totalEarnings?: number;
  totalSales?: number;
  totalPurchases?: number;
  // Add other fields as needed
}

const DashboardContent: React.FC<DashboardContentProps> = ({ userType }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome, {userData.name}</h2>
      
      {userType === 'Introducer' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Introducer Dashboard</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard title="Successful Introductions" value={userData.successfulIntroductions || 0} />
            <DashboardCard title="Pending Requests" value={0} />
            <DashboardCard title="Total Earnings" value={`$${userData.totalEarnings || 0}`} />
          </div>
          {/* Add more Introducer-specific content here */}
        </div>
      )}

      {userType === 'Vendor' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Vendor Dashboard</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard title="Active Leads" value={0} />
            <DashboardCard title="Conversion Rate" value="0%" />
            <DashboardCard title="Total Sales" value={`$${userData.totalSales || 0}`} />
          </div>
          {/* Add more Vendor-specific content here */}
        </div>
      )}

      {userType === 'Buyer' && (
           <div className="space-y-6">
           <h3 className="text-xl font-semibold text-gray-800">Buyer Dashboard</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <DashboardCard title="Ongoing Introductions" value={0} />
             <DashboardCard title="Potential Matches" value={0} />
             <DashboardCard title="Total Purchases" value={`$${userData.totalPurchases || 0}`} />
           </div>
           {/* Add more Buyer-specific content here */}
         </div>
       )}
     </div>
   );
 };
 
 const DashboardCard: React.FC<{ title: string; value: string | number }> = ({ title, value }) => {
   return (
     <div className="bg-white overflow-hidden shadow rounded-lg">
       <div className="px-4 py-5 sm:p-6">
         <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
         <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
       </div>
     </div>
   );
 };
 
 export default DashboardContent;