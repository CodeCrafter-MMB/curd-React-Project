import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">ShopSmart</h3>
            <p className="text-sm">Your one-stop shop for all your needs. Quality products at unbeatable prices.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-sm hover:text-white transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/categories" className="text-sm hover:text-white transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/deals" className="text-sm hover:text-white transition-colors">Special Deals</Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm hover:text-white transition-colors">Shopping Cart</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sm hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm hover:text-white transition-colors">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm hover:text-white transition-colors">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:text-white transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm mb-4">Subscribe to our newsletter for the latest updates and exclusive offers.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} ShopSmart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;