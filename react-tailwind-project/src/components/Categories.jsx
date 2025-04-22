// filepath: /react-tailwind-project/react-tailwind-project/src/components/Categories.jsx
import React from 'react';

const Categories = () => {
  const categories = ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Toys'];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Product Categories</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <li key={index} className="border rounded-lg p-4 text-center hover:bg-gray-100 transition">
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;