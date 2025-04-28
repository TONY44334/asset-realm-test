import { useCart } from '../components/CartContext';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  
  // States for managing loading and error
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleProceedToCheckout = () => {
    setIsLoading(true); // Start loading

    // Simulate loading for 10 seconds
    setTimeout(() => {
      setIsLoading(false); // Stop loading
      setHasError(true); // Show fatal error after 10s
    }, 12000); // 10000ms = 10 seconds
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-white">
      <h1 className="text-3xl font-extrabold mb-10 text-purple-400">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-400">
          <p>Your cart is empty.</p>
          <Link
            to="/store"
            className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition transform hover:scale-105"
          >
            Browse Assets
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-purple-900 border border-purple-900 rounded-xl shadow-lg mb-8">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-5 px-4 bg-[#1b1b2e] hover:bg-[#24243c] transition rounded-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg border border-purple-700 shadow-md"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-400">
                    ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                </div>

                {/* 🔥 Custom Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 rounded-full bg-red-600 bg-opacity-20 hover:bg-opacity-40 hover:scale-110 transition transform text-red-400 hover:text-white border border-red-500"
                  title="Remove"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>

          {/* Total */}
          <div className="flex justify-between items-center text-lg font-medium mb-8">
            <span>Total:</span>
            <span className="font-bold text-cyan-400 text-xl">₹{total}</span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={clearCart}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold transition transform hover:scale-105"
            >
              Clear Cart
            </button>
            <button
              onClick={handleProceedToCheckout}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-lg font-semibold transition transform hover:scale-105"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      {/* Show loading page with fun loader if in loading state */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white">
          <div className="text-center">
            <div className="spinner"></div>
            <h2 className="text-3xl font-extrabold mt-6">Processing Checkout...</h2>
            <p className="mt-4 text-lg">Please wait, we're processing your order.</p>
          </div>
        </div>
      )}

      {/* Show error message if there's a fatal error */}
      {hasError && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-red-500">Fatal Error</h2>
            <p className="mt-4 text-lg">Something went wrong. Please try again later.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
