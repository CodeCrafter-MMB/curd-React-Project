import React, { useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import Footer from "../Layout/Footer";
import { useCart } from '../../context/CartContext';
import { useSearch } from '../../context/SearchContext';
import ProductCard from './ProductCard';

const Products = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const { searchQuery } = useSearch();
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState("all");
  const { addToCart } = useCart();
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Premium Headphones",
      price: 199.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
      category: "Electronics",
      description: "High-quality wireless headphones with noise cancellation",
      rating: 4.5,
      reviews: 128,
      stock: 10,
      discount: 20
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 299.99,
      originalPrice: 349.99,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80",
      category: "Electronics",
      description: "Advanced smartwatch with health tracking features",
      rating: 4.8,
      reviews: 256,
      stock: 15,
      discount: 15
    },
    {
      id: 3,
      name: "Designer Backpack",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
      category: "Fashion",
      description: "Stylish and practical backpack for everyday use",
      rating: 4.2,
      reviews: 89,
      stock: 20,
      discount: 20
    },
    {
      id: 4,
      name: "Running Shoes",
      price: 129.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
      category: "Sports",
      description: "Comfortable running shoes with advanced cushioning",
      rating: 4.6,
      reviews: 156,
      stock: 8,
      discount: 15
    },
    {
      id: 5,
      name: "Wireless Earbuds",
      price: 159.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&q=80",
      category: "Electronics",
      description: "True wireless earbuds with premium sound quality",
      rating: 4.7,
      reviews: 203,
      stock: 12,
      discount: 20
    },
    {
      id: 6,
      name: "Laptop Bag",
      price: 49.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=400&q=80",
      category: "Fashion",
      description: "Professional laptop bag with multiple compartments",
      rating: 4.3,
      reviews: 78,
      stock: 25,
      discount: 25
    },
    {
      id: 7,
      name: "Yoga Mat",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://apollosports.pk/cdn/shop/files/YogaExerciseMat-TPEMaterial6mmThicknessDoubleColorDarkPurple_1a5a8197-8642-4e7e-ae52-740ab915076d.jpg?v=1738043276",
      category: "Sports",
      description: "Premium non-slip yoga mat for your workout",
      rating: 4.4,
      reviews: 92,
      stock: 30,
      discount: 25
    },
    {
      id: 8,
      name: "Smart Speaker",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&q=80",
      category: "Electronics",
      description: "Smart speaker with voice control and premium sound",
      rating: 4.5,
      reviews: 167,
      stock: 18,
      discount: 25
    }
  ]);

  const searchTerm = searchParams.get('search') || searchQuery;

  const filteredProducts = products.filter(product => {
    const matchesCategory = category 
      ? product.category.toLowerCase() === category.toLowerCase()
      : true;
      
    const matchesSearch = searchTerm
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  const sortProducts = (products) => {
    switch (sortBy) {
      case "price-low":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...products].sort((a, b) => b.price - a.price);
      case "name":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return products;
    }
  };

  const filterByPrice = (products) => {
    switch (priceRange) {
      case "0-50":
        return products.filter(p => p.price <= 50);
      case "50-100":
        return products.filter(p => p.price > 50 && p.price <= 100);
      case "100+":
        return products.filter(p => p.price > 100);
      default:
        return products;
    }
  };

  const displayProducts = sortProducts(filterByPrice(filteredProducts));

  const handleDelete = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleEdit = (updatedProduct) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
  };

  const handleAdd = (product) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">
                {category ? `${category} Products` : "All Products"}
              </h1>
              {searchTerm && (
                <p className="text-gray-600 mt-2">
                  Search results for "{searchTerm}"
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Prices</option>
                <option value="0-50">$0 - $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100+">$100+</option>
              </select>
            </div>
          </div>

          {displayProducts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-medium text-gray-600">No products found</h2>
              <p className="mt-2 text-gray-500">
                {searchTerm 
                  ? `No products match your search "${searchTerm}". Try different keywords or browse our categories.`
                  : "Try adjusting your filters or browse different categories."}
              </p>
              <Link
                to="/categories"
                className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Browse Categories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onAdd={handleAdd}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;