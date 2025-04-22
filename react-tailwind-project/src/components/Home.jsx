// filepath: /react-tailwind-project/react-tailwind-project/src/components/Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
      <p className="text-lg text-center mb-8">
        Discover amazing products and deals tailored just for you!
      </p>
      <a href="/products" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Shop Now
      </a>
    </div>
  );
};

export default Home;