import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from './CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/cart') {
      setIsCartOpen(false);
    }
  }, [location.pathname]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      {/* Navbar */}
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

              {/* Cart Icon */}
              <div className="relative">
                <button className="text-gray-300 hover:text-purple-400 transition relative" onClick={toggleCart}>
                  <ShoppingCart className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Profile Icon */}
              <button className="text-gray-300 hover:text-purple-400 transition">
                <User className="h-6 w-6" />
              </button>
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

        {/* Mobile Menu Dropdown */}
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

              <div className="flex justify-around py-4 border-t border-purple-800 mt-4">
                <button className="text-gray-300 hover:text-purple-400 flex items-center space-x-2" onClick={toggleCart}>
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

      {/* Cart Popup (outside navbar to prevent layout interference) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-gray-900 border border-purple-800 rounded-lg shadow-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">🛒 Your Cart</h2>

            {cartItems.length === 0 ? (
              <p className="text-gray-400 text-center">Your cart is empty.</p>
            ) : (
              <ul className="space-y-4 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-gray-400">${item.price} × {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex justify-between items-center">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={() => setIsCartOpen(false)}
              >
                Close
              </button>
              <Link to="/cart" onClick={() => setIsCartOpen(false)}>
                <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
                  Go to Cart Page
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
