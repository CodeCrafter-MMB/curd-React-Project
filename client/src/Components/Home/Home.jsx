import React from "react";
import Footer from "../Layout/Footer";
import { Link } from "react-router-dom";
import { useCart } from '../../context/CartContext';

const featuredProducts = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80",
    category: "Electronics"
  },
  {
    id: 3,
    name: "Designer Backpack",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
    category: "Fashion"
  }
];

const categories = [
  { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80" },
  { name: "Fashion", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80" },
  { name: "Sports", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80" },
  { name: "Home & Living", image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=400&q=80" },
];

const Home = () => {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80"
            alt="Hero"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 flex items-center z-20 px-8 sm:px-16">
            <div className="text-white max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to ShopSmart</h1>
              <p className="text-lg mb-6">Discover amazing products at unbeatable prices</p>
              <Link
                to="/products"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-blue-600 hover:text-blue-700">View All →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">${product.price}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Shop by Category</h2>
              <Link to="/categories" className="text-blue-600 hover:text-blue-700">All Categories →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={`/categories/${category.name.toLowerCase()}`}
                  className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity z-10" />
                  <img src={category.image} alt={category.name} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300" />
                  <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold z-20">{category.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Special Offers Banner */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 sm:p-12 text-white">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-4">Special Offers</h2>
              <p className="text-lg mb-6">Get up to 50% off on selected items. Limited time offer!</p>
              <Link
                to="/deals"
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                View Deals
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;


