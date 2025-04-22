// filepath: /react-tailwind-project/react-tailwind-project/src/components/Deals.jsx
import React from 'react';

const Deals = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Current Deals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example deal item */}
        <div className="border rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold">Deal Title</h2>
          <p className="text-gray-600">Description of the deal goes here.</p>
          <span className="text-lg font-bold text-green-600">Price: $XX.XX</span>
        </div>
        {/* Add more deal items as needed */}
      </div>
    </div>
  );
};

export default Deals;