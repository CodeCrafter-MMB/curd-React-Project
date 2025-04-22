// filepath: /react-tailwind-project/react-tailwind-project/src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white text-lg font-bold">
          <Link to="/">My Website</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
          <Link to="/services" className="text-gray-300 hover:text-white">Services</Link>
          <Link to="/products" className="text-gray-300 hover:text-white">Products</Link>
          <Link to="/cart" className="text-gray-300 hover:text-white">Cart</Link>
          <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;