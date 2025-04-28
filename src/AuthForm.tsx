import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { saveUserData } from './firebase'; // You can remove fetchUserData if unused

// Friendly error messages for Firebase auth errors
const getFriendlyErrorMessage = (code: string): string => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Try logging in instead.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Contact support.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/missing-password':
      return 'Please enter your password.';
    default:
      return 'Something went wrong. Please try again.';
  }
};

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectMessage = location.state?.message || null;

  // Handle form submit (login/signup)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!isLogin && !acceptedTerms) {
      setLoading(false);
      setError('You must accept the Terms of Service to sign up.');
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await saveUserData(userCredential.user.uid, []); // Save empty cart
      }

      navigate('/');
    } catch (err: any) {
      const friendlyMessage = getFriendlyErrorMessage(err.code || err.message);
      setError(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a17] to-black px-4">
      <div className="w-full max-w-md bg-[#111122] border border-purple-800 rounded-xl shadow-2xl p-8 relative">
        <h2 className="text-3xl font-[Orbitron] font-bold text-purple-400 text-center mb-6 tracking-wide">
          {isLogin ? 'Welcome Back' : 'Sign Up'}
        </h2>

       
        {redirectMessage && (
          <div className="bg-yellow-900/30 text-yellow-400 text-sm p-2 mb-4 border border-yellow-500 rounded">
            {redirectMessage}
          </div>
        )}

        {/* Display error message if any */}
        {error && (
          <div className="bg-red-800/30 text-red-400 text-sm rounded p-2 mb-4 text-center border border-red-500">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#1a1a2e] border border-purple-700 text-white px-4 py-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#1a1a2e] border border-purple-700 text-white px-4 py-3 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {!isLogin && (
            <label className="flex items-start space-x-2 text-sm text-gray-400">
              <input
                type="checkbox"
                className="mt-1 accent-purple-600"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <span>
                I agree to the{' '}
                <Link to="/terms" className="text-purple-400 hover:underline" target="_blank">
                  Terms of Service
                </Link>
              </span>
            </label>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition"
          >
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-5 text-sm text-gray-400 text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            className="text-purple-400 hover:underline"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setAcceptedTerms(false);
            }}
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
