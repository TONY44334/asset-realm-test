import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from './CartContext';
import { useAuth } from '../AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    if (location.pathname === '/cart') {
      setIsCartOpen(false);
    }
  }, [location.pathname]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Handle the menu toggle for mobile layout
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/70 border-b border-purple-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 group">
                <img
                  src="https://i.imgur.com/36STGV9.png"
                  alt="Bravyn Studios Logo"
                  className="h-10 sm:h-12 w-auto drop-shadow-lg transition-transform duration-300 group-hover:scale-105 pointer-events-none select-none"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
                <span
                  className="text-xl sm:text-2xl md:text-3xl font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent tracking-wide transition duration-300 group-hover:brightness-125"
                  style={{ fontFamily: "'Audiowide', sans-serif" }}
                >
                  Bravyn Studios
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
              {currentUser ? (
                <div className="relative group">
                  <Link to="/profile" className="text-gray-300 hover:text-purple-400 transition">
                    <User className="h-6 w-6" />
                  </Link>
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-purple-700 rounded shadow-md opacity-0 group-hover:opacity-100 transition duration-200 z-50">
                    <div className="px-4 py-2 text-sm text-white border-b border-gray-700">
                      {currentUser.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/auth" className="text-gray-300 hover:text-purple-400 flex items-center space-x-2">
                  <User className="h-6 w-6" />
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-purple-400 hover:text-purple-300 transition relative group"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 group-hover:scale-110 transition duration-300" />
                ) : (
                  <Menu className="h-6 w-6 group-hover:scale-110 transition duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden backdrop-blur bg-gray-900/80 shadow-lg transition-transform duration-300">
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

              {/* Cart Icon */}
              <div className="flex justify-between py-4 border-t border-purple-800 mt-4">
                <button
                  className="text-gray-300 hover:text-purple-400 flex items-center space-x-2"
                  onClick={toggleCart}
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span>Cart</span>
                </button>
              </div>

              {/* Profile and Logout for Mobile */}
              <div className="py-2 space-y-2">
                {currentUser ? (
                  <>
                    {/* Navigate to Profile Page */}
                    <Link
                      to="/profile"
                      className="block text-gray-300 hover:text-purple-400 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="block text-gray-300 hover:text-purple-400 py-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className="text-gray-300 hover:text-purple-400 flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-6 w-6" />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Cart Popup */}
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
                      <p className="text-sm text-gray-400">
                      ₹{item.price} × {item.quantity}
                      </p>
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
