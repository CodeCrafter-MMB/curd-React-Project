import React from 'react';
import { Link } from 'react-router-dom';
import Footer from "./Layout/Footer";

const categories = [
  { 
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80",
    description: "Latest gadgets and electronic devices",
    subcategories: ["Smartphones", "Laptops", "Audio", "Gaming", "Accessories"],
    features: ["Latest Tech", "Best Brands", "Warranty Support"]
  },
  {
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80",
    description: "Trendy clothing and accessories",
    subcategories: ["Men's Wear", "Women's Fashion", "Kids", "Footwear", "Accessories"],
    features: ["Trending Styles", "Premium Brands", "Size Guide"]
  },
  {
    name: "Sports",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80",
    description: "Sports equipment and athletic wear",
    subcategories: ["Fitness", "Outdoor", "Team Sports", "Training", "Equipment"],
    features: ["Quality Gear", "Performance", "Expert Advice"]
  },
  {
    name: "Home & Living",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=400&q=80",
    description: "Furniture and home decor",
    subcategories: ["Furniture", "Decor", "Kitchen", "Bedding", "Lighting"],
    features: ["Modern Design", "Comfort", "Durability"]
  },
  {
    name: "Books",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&q=80",
    description: "Books, magazines, and literature",
    subcategories: ["Fiction", "Non-Fiction", "Academic", "Children", "E-Books"],
    features: ["Wide Selection", "Best Sellers", "New Releases"]
  },
  {
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
    description: "Cosmetics and beauty products",
    subcategories: ["Skincare", "Makeup", "Haircare", "Fragrances", "Tools"],
    features: ["Top Brands", "Natural Products", "Expert Tips"]
  }
];

const featuredCategories = [
  {
    name: "New Arrivals",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&q=80",
    description: "Explore the latest additions to our collection"
  },
  {
    name: "Best Sellers",
    image: "https://images.unsplash.com/photo-1483181957632-8bda974cbc91?w=400&q=80",
    description: "Shop from our most popular categories"
  },
  {
    name: "Trending Now",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80",
    description: "Discover what's hot right now"
  }
];

const Categories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-gray-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Categories</h1>
            <p className="text-lg text-gray-300 max-w-2xl">
              Discover a wide range of products across various categories. From electronics to fashion,
              find everything you need in one place.
            </p>
          </div>
        </div>

        {/* Featured Categories */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Featured Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCategories.map((category) => (
                <div key={category.name} className="relative group overflow-hidden rounded-lg shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10" />
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                    <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-200">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Categories Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div key={category.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Link
                    to={`/categories/${category.name.toLowerCase()}`}
                    className="block relative group"
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity z-10" />
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                      <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.description}</p>
                    </div>
                  </Link>
                  
                  {/* Category Features */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.features.map((feature) => (
                          <span 
                            key={feature}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Subcategories */}
                    <div>
                      <h4 className="font-semibold mb-2">Popular in {category.name}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {category.subcategories.map((sub) => (
                          <Link
                            key={sub}
                            to={`/categories/${category.name.toLowerCase()}?subcategory=${sub.toLowerCase()}`}
                            className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
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
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="mb-8 text-blue-100">
              Subscribe to our newsletter to receive updates about new products and special offers.
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

export default Categories;