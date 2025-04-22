import React, { useState, Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCartIcon, MagnifyingGlassIcon as SearchIcon, Bars3Icon as MenuIcon, XMarkIcon as XIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { searchQuery, handleSearch } = useSearch();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const isActive = (path) => location.pathname === path;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(localSearch);
    setIsSearchOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative flex h-20 items-center justify-between">
          {/* Mobile menu button */}
          <div className="flex sm:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? (
                <XIcon className="h-7 w-7" />
              ) : (
                <MenuIcon className="h-7 w-7" />
              )}
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Swift Mart</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex flex-1 items-center justify-center px-8">
            <div className="flex space-x-6">
              <Link to="/" className={`rounded-md px-4 py-2.5 text-base font-medium ${isActive("/") ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}>
                Home
              </Link>
              <Link to="/products" className={`rounded-md px-4 py-2.5 text-base font-medium ${isActive("/products") ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}>
                Products
              </Link>
              <Link to="/categories" className={`rounded-md px-4 py-2.5 text-base font-medium ${isActive("/categories") ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}>
                Categories
              </Link>
              <Link to="/deals" className={`rounded-md px-4 py-2.5 text-base font-medium ${isActive("/deals") ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}>
                Deals
              </Link>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-6">
            {/* Search - Desktop */}
            <form onSubmit={handleSubmit} className="hidden sm:flex relative">
              <input
                type="text"
                placeholder="Search products..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="rounded-lg py-2 px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 w-56"
              />
              <button type="submit" className="absolute right-3 top-2.5">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </button>
            </form>

            {/* Search - Mobile */}
            <button
              className="sm:hidden text-gray-300 hover:text-white"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <SearchIcon className="h-7 w-7" />
            </button>

            {/* Cart */}
            <Link to="/cart" className="text-white hover:text-gray-200 relative">
              <ShoppingCartIcon className="h-7 w-7" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center">
                {getCartCount()}
              </span>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <Menu as="div" className="relative ml-3">
                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  {user.avatar ? (
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.avatar}
                      alt={user.name}
                    />
                  ) : (
                    <UserCircleIcon className="h-10 w-10 text-gray-300" />
                  )}
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <div className="px-4 py-3 text-base text-gray-700 border-b border-gray-100">
                          <p className="font-medium">{user.name}</p>
                          <p className="text-gray-500 text-sm">{user.email}</p>
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } block px-4 py-2.5 text-base text-gray-700`}
                        >
                          Your Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/orders"
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } block px-4 py-2.5 text-base text-gray-700`}
                        >
                          Orders
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } block w-full text-left px-4 py-2.5 text-base text-gray-700`}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link
                to="/login"
                className="text-white hover:text-gray-200 text-base font-medium hidden sm:block"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="sm:hidden px-4 pb-4">
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              placeholder="Search products..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full rounded-lg py-2.5 px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="ml-3">
              <SearchIcon className="h-7 w-7 text-white" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-gray-800 pb-4">
          <div className="space-y-1.5 px-4">
            <Link
              to="/"
              className={`block rounded-md px-4 py-2.5 text-base font-medium ${isActive("/") ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`block rounded-md px-4 py-2.5 text-base font-medium ${isActive("/products") ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}
            >
              Products
            </Link>
            <Link
              to="/categories"
              className={`block rounded-md px-4 py-2.5 text-base font-medium ${isActive("/categories") ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}
            >
              Categories
            </Link>
            <Link
              to="/deals"
              className={`block rounded-md px-4 py-2.5 text-base font-medium ${isActive("/deals") ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}
            >
              Deals
            </Link>
            {!isAuthenticated && (
              <Link
                to="/login"
                className={`block rounded-md px-4 py-2.5 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white`}
              >
                Login
              </Link>
            )}
            {isAuthenticated && (
              <>
                <Link
                  to="/profile"
                  className={`block rounded-md px-4 py-2.5 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white`}
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className={`block rounded-md px-4 py-2.5 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white`}
                >
                  Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left rounded-md px-4 py-2.5 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
