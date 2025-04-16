import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Store from './pages/Store';
import AssetDetails from './pages/AssetDetails';
import Categories from './pages/Categories';
import ScrollToTop from './components/ScrollToTop';
import './index.css'; // or your CSS file location

function App() {
  return (
    <Router>
      {/* This makes sure scroll resets on route change */}
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/asset/:id" element={<AssetDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
