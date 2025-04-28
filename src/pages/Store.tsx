import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import ASSETS_DATA from './AssetData.ts';
import LazyImage from '../components/LazyImage';

const Store = () => {
  const [sortBy, setSortBy] = useState('featured');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', '3D Models', '2D Assets', 'Environments', 'VFX'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold">Store</h1>
        <div className="flex flex-wrap gap-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-2 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 text-white "
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 text-white "
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="sales">Best Selling</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {ASSETS_DATA
          .filter(asset => filterCategory === 'all' || asset.category === filterCategory)
          .sort((a, b) => {
            switch (sortBy) {
              case 'price-low':
                return a.price - b.price;
              case 'price-high':
                return b.price - a.price;
              case 'rating':
                return b.rating - a.rating;
              case 'sales':
                return b.sales - a.sales;
              default:
                return 0;
            }
          })
          .map((asset) => (
            <Link key={asset.id} to={`/asset/${asset.id}`} className="card-hover">
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="relative">
                  <LazyImage
                    src={asset.image}
                    alt={asset.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded text-sm">
                  ₹{Math.ceil(asset.price *85.30)}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{asset.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{asset.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded">
                      {asset.category}
                    </span>
                    <div className="flex items-center text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1">{asset.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Store;