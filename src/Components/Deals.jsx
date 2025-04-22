import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from "./Footer";
import { useCart } from '../context/CartContext';

const dealCategories = [
  {
    id: "daily",
    title: "Daily Deals",
    description: "24-hour deals refreshed daily",
    icon: "🌟"
  },
  {
    id: "flash",
    title: "Flash Sales",
    description: "Limited-time offers with biggest discounts",
    icon: "⚡"
  },
  {
    id: "clearance",
    title: "Clearance",
    description: "End of season special offers",
    icon: "🏷️"
  },
  {
    id: "bundle",
    title: "Bundle Deals",
    description: "Save more when you buy together",
    icon: "📦"
  }
];

const deals = [
  {
    id: 1,
    title: "Summer Sale",
    discount: "50% OFF",
    originalPrice: 199.99,
    discountedPrice: 99.99,
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&q=80",
    description: "Get amazing discounts on summer collection",
    endDate: "2025-05-31",
    category: "Fashion",
    dealType: "daily",
    stockLeft: 15,
    totalStock: 50
  },
  {
    id: 2,
    title: "Tech Week",
    discount: "30% OFF",
    originalPrice: 999.99,
    discountedPrice: 699.99,
    image: "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?w=400&q=80",
    description: "Latest gadgets at unbeatable prices",
    endDate: "2025-04-30",
    category: "Electronics",
    dealType: "flash",
    stockLeft: 8,
    totalStock: 30
  },
  {
    id: 3,
    title: "Fitness Special",
    discount: "25% OFF",
    originalPrice: 149.99,
    discountedPrice: 112.49,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    description: "Premium sports equipment and gear",
    endDate: "2025-05-15",
    category: "Sports",
    dealType: "clearance",
    stockLeft: 20,
    totalStock: 40
  },
  {
    id: 4,
    title: "Home Essentials Bundle",
    discount: "40% OFF",
    originalPrice: 299.99,
    discountedPrice: 179.99,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80",
    description: "Complete home essentials package",
    endDate: "2025-05-20",
    category: "Home & Living",
    dealType: "bundle",
    stockLeft: 12,
    totalStock: 25
  }
];

const Deals = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const { addToCart } = useCart();

  const calculateDaysLeft = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const calculateStockPercentage = (stockLeft, totalStock) => {
    return (stockLeft / totalStock) * 100;
  };

  const filteredDeals = deals
    .filter(deal => selectedCategory === "all" || deal.dealType === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.discountedPrice - b.discountedPrice;
        case "price-high":
          return b.discountedPrice - a.discountedPrice;
        case "discount":
          return parseInt(b.discount) - parseInt(a.discount);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Exclusive Deals & Offers</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Discover incredible savings across our entire range. Don't miss out on these limited-time offers!
            </p>
          </div>
        </div>

        {/* Deal Categories */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Deal Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dealCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-6 rounded-lg text-left transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-800 hover:shadow-md'
                  }`}
                >
                  <span className="text-2xl mb-2 block">{category.icon}</span>
                  <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                  <p className={`text-sm ${
                    selectedCategory === category.id ? 'text-blue-100' : 'text-gray-600'
                  }`}>
                    {category.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Browse Deals</h3>
                <p className="text-gray-600">Explore our wide selection of deals across various categories</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Add to Cart</h3>
                <p className="text-gray-600">Select your favorite deals before they expire</p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Checkout & Save</h3>
                <p className="text-gray-600">Complete your purchase and enjoy the savings</p>
              </div>
            </div>
          </div>
        </section>

        {/* Deals Grid */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-lg ${
                    selectedCategory === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  All Deals
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="default">Sort by</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>
            </div>

            {/* Deals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDeals.map((deal) => (
                <div key={deal.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative">
                    <img 
                      src={deal.image} 
                      alt={deal.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold">
                      {deal.discount}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-bold mb-2">{deal.title}</h2>
                        <p className="text-gray-600 text-sm">{deal.description}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-500">{deal.category}</span>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-blue-600">
                        ${deal.discountedPrice}
                      </span>
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${deal.originalPrice}
                      </span>
                    </div>
                    
                    {/* Stock Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Stock left: {deal.stockLeft}</span>
                        <span className="text-gray-600">{deal.stockLeft} of {deal.totalStock}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 rounded-full h-2"
                          style={{ width: `${calculateStockPercentage(deal.stockLeft, deal.totalStock)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">
                          {calculateDaysLeft(deal.endDate)} days left
                        </span>
                      </div>
                      <button 
                        onClick={() => addToCart({...deal, price: deal.discountedPrice})}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Never Miss a Deal</h2>
            <p className="mb-8 text-blue-100">
              Subscribe to our newsletter and be the first to know about exclusive deals and offers.
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Deals;