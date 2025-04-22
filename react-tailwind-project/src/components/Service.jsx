// filepath: /react-tailwind-project/react-tailwind-project/src/components/Service.jsx
import React from 'react';

const Service = () => {
  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Our Services</h2>
      <p className="text-gray-700">
        We offer a variety of services to meet your needs. Our team is dedicated to providing the best experience possible.
      </p>
      <ul className="list-disc list-inside mt-4">
        <li className="mb-2">Service 1: Description of service 1.</li>
        <li className="mb-2">Service 2: Description of service 2.</li>
        <li className="mb-2">Service 3: Description of service 3.</li>
      </ul>
    </div>
  );
};

export default Service;