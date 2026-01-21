import React, { useState, Fragment, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon as SearchIcon,
  Bars3Icon as MenuIcon,
  XMarkIcon as XIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { useCart } from "../../context/CartContext";
import { useSearch } from "../../context/SearchContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { searchQuery, handleSearch } = useSearch();
  const { user, logout, isAuthenticated } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [showNavbar, setShowNavbar] = useState(true);

  const lastScrollY = useRef(0);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/categories", label: "Categories" },
    { path: "/deals", label: "Deals" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(localSearch);
    setSearchOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  /* 🔥 Scroll Hide / Show */
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY.current && currentScroll > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ⌨️ ESC to close mobile menu */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <nav
      className={`bg-gray-800 sticky top-0 z-50 transition-transform duration-300 ease-in-out ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white">
            Swift Mart
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  relative text-base font-medium text-gray-300 transition
                  hover:text-white
                  after:content-[''] after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-full after:bg-white
                  after:scale-x-0 after:origin-left
                  after:transition-transform after:duration-300 after:ease-in-out
                  ${isActive(link.path) && "text-white after:scale-x-100"}
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-5">
            {/* Search Desktop */}
            <form onSubmit={handleSubmit} className="hidden md:flex relative">
              <input
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search products..."
                className="w-56 rounded-lg py-2 px-4 focus:outline-none"
              />
              <button className="absolute right-3 top-2.5">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </button>
            </form>

            {/* Search Mobile */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              <SearchIcon className="h-7 w-7" />
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative text-white">
              <ShoppingCartIcon className="h-7 w-7" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            </Link>

            {/* User */}
            {isAuthenticated ? (
              <Menu as="div" className="relative">
                <Menu.Button>
                  {user.avatar ? (
                    <img src={user.avatar} className="h-10 w-10 rounded-full" />
                  ) : (
                    <UserCircleIcon className="h-10 w-10 text-gray-300" />
                  )}
                </Menu.Button>
                <Transition as={Fragment}>
                  <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow">
                    <Menu.Item>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link to="/login" className="hidden md:block text-white">
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-gray-300"
            >
              <MenuIcon className="h-7 w-7" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-gray-900/95 backdrop-blur-md z-50 flex flex-col px-8 py-10 md:hidden">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-5 text-white"
          >
            <XIcon className="h-8 w-8" />
          </button>

          <div className="mt-16 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block text-lg font-medium transition ${
                  isActive(link.path)
                    ? "text-white border-l-4 border-white pl-4"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Search */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSubmit} className="flex">
            <input
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="flex-1 rounded-lg px-4 py-2"
              placeholder="Search products..."
            />
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
