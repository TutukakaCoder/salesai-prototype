import React from 'react';

interface UserTypeSelectionProps {
  onSelect: (userType: string) => void;
}

const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {['Buyer', 'Vendor', 'Introducer'].map((type) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-6 border border-gray-400 rounded shadow text-center"
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default UserTypeSelection;