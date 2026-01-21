import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../Layout/Footer';
import { useCart } from '../../context/CartContext';

// This would typically come from an API or database
const getProduct = (id) => {
  const allProducts = [
    {
      id: 1,
      name: "Premium Headphones",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
      category: "Electronics",
      description: "High-quality wireless headphones with noise cancellation",
      features: [
        "Active Noise Cancellation",
        "40-hour battery life",
        "Premium sound quality",
        "Comfortable fit",
        "Bluetooth 5.0"
      ],
      specs: {
        brand: "AudioTech",
        model: "Pro-X200",
        connectivity: "Wireless",
        color: "Black",
        warranty: "1 year"
      }
    },
    // Add more products as needed
  ];
  return allProducts.find(p => p.id === parseInt(id));
};

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const product = getProduct(id);

  if (!product) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Product Not Found</h2>
            <p className="mt-2 text-gray-600">The product you're looking for doesn't exist.</p>
            <Link
              to="/products"
              className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Back to Products
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-lg shadow-lg object-cover"
              />
              <span className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full">
                ${product.price}
              </span>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Key Features</h2>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <span className="font-medium text-gray-900">{key}: </span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add to Cart Section */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-4 py-2 text-gray-600 hover:text-gray-700"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-gray-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-700"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add to Cart - ${(product.price * quantity).toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;