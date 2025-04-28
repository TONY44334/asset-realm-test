import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Store from './pages/Store';
import AssetDetails from './pages/AssetDetails';
import Categories from './pages/Categories';
import ScrollToTop from './components/ScrollToTop';
import TermsOfService from './pages/TermsOfService';
import AboutUs from './pages/AboutUs';
import Careers from './pages/Careers';
import CartPage from './pages/CartPage';
import AuthForm from './AuthForm';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './components/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-[#0a0a17] text-white">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/store" element={<Store />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/asset/:id" element={<AssetDetails />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/careers" element={<Careers />} />
                
                {/* Protected Route for Cart */}
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <CartPage />
                    </ProtectedRoute>
                  }
                />

                {/* Protected Route for Profile */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route path="/auth" element={<AuthForm />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
