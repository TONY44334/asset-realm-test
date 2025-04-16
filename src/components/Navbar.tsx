import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/70 border-b border-purple-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-extrabold text-purple-400 tracking-wider font-[Orbitron]">
                ⚔️ AssetRealm
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className="text-gray-300 hover:text-purple-400 transition font-medium">
              Home
            </Link>
            <Link to="/store" className="text-gray-300 hover:text-purple-400 transition font-medium">
              Store
            </Link>
            <Link to="/categories" className="text-gray-300 hover:text-purple-400 transition font-medium">
              Categories
            </Link>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search assets..."
                className="w-64 bg-gray-800/70 text-white px-4 py-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-inner"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-purple-400" />
            </div>

            {/* Icons */}
            <div className="flex space-x-4">
              <button className="text-gray-300 hover:text-purple-400 transition">
                <ShoppingCart className="h-6 w-6" />
              </button>
              <button className="text-gray-300 hover:text-purple-400 transition">
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-purple-400 hover:text-purple-300 transition"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden backdrop-blur bg-gray-900/80 shadow-lg">
          <div className="px-4 pt-4 pb-2 space-y-2">
            <Link
              to="/"
              className="block text-gray-300 hover:text-purple-400 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/store"
              className="block text-gray-300 hover:text-purple-400 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Store
            </Link>
            <Link
              to="/categories"
              className="block text-gray-300 hover:text-purple-400 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>

            {/* Search Field */}
            <div className="relative mt-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-800/80 text-white px-4 py-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-inner"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-purple-400" />
            </div>

            {/* Icons */}
            <div className="flex justify-around py-4 border-t border-purple-800 mt-4">
              <button className="text-gray-300 hover:text-purple-400 flex items-center space-x-2">
                <ShoppingCart className="h-6 w-6" />
                <span>Cart</span>
              </button>
              <button className="text-gray-300 hover:text-purple-400 flex items-center space-x-2">
                <User className="h-6 w-6" />
                <span>Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
