import { Link } from 'react-router-dom';

import { Github, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-purple-900">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 font-[Orbitron]">&copy; Bravyn Studios</h3>
            <p className="text-gray-400"> Bravyn Studios is a marketplace for high quality, affordable game assets handcrafted by talented creators from all around the world.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Discover</h4>
            <ul className="space-y-2 text-gray-400">
            <li><Link to="/about-us" className="hover:text-purple-500">About Us</Link></li>
            <li><Link to="/terms" className="hover:text-purple-500">Terms of Service</Link></li>
              <li><Link to="/careers" className="hover:text-purple-500">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
            <li><Link to="/store" className="hover:text-purple-500">3D Models</Link></li>
            <li><Link to="/store" className="hover:text-purple-500">Textures</Link></li>
            <li><Link to="/store" className="hover:text-purple-500">Sound Effects</Link></li>
            <li><Link to="/store" className="hover:text-purple-500">Animations</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2025 Bravyn Studios. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;