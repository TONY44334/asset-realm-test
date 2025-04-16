import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Download, ShoppingCart, Star, Eye, Clock, Heart, Share2 } from 'lucide-react';
import ASSETS_DATA from './AssetData.ts';
import LazyImage from '../components/LazyImage';

interface Asset {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
  sales: number;
  reviews: number;
  views: number;
  created: string;
  description: string;
  features: string[];
  images: string[];
  category: string;
  fileSize: string;
  format: string;
  version: string;
}

const AssetDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);

  const assetId = Number(id);

  useEffect(() => {
    setLoading(true);
  
    setTimeout(() => {
      const foundAsset = ASSETS_DATA.find((a) => a.id === assetId);
      setAsset(foundAsset || null);
      setLoading(false);
  
      // 👇 Force scroll to top when asset changes
      window.scrollTo({ top: -100, behavior: 'smooth' });
    }, 800);
  }, [assetId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 border-opacity-50 mb-4 mx-auto" />
          <p className="text-xl text-gray-400">Loading asset details...</p>
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-white">Asset not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Image Gallery */}
        <div className="w-full">
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
            <LazyImage
              src={asset.images[selectedImage]}
              alt={`${asset.title} - Main`}
              className="w-full h-[300px] sm:h-[400px] object-cover transition-all duration-300"
            />
          </div>

          <div className="grid grid-cols-4 gap-3 mt-4">
            {asset.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`rounded-md overflow-hidden border-2 ${
                  selectedImage === i
                    ? 'border-purple-500 opacity-100'
                    : 'border-gray-700 opacity-70 hover:opacity-100'
                }`}
              >
                <LazyImage
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col gap-8">
          {/* Title & Icons */}
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-extrabold text-white">{asset.title}</h1>
            <div className="flex space-x-2">
              <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                <Heart className="h-5 w-5 text-red-500" />
              </button>
              <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                <Share2 className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 mr-1" />
              <span>{asset.rating} ({asset.reviews} reviews)</span>
            </div>
            <div className="flex items-center">
              <Eye className="h-5 w-5 mr-1" />
              <span>{asset.views} views</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-1" />
              <span>{asset.created}</span>
            </div>
          </div>

          {/* Price, Buttons, Specs */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-md">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-purple-400 text-center sm:text-left">
                ${asset.price}
              </span>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md flex items-center justify-center transition-all">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                <button className="w-full sm:w-auto px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-md flex items-center justify-center transition-all">
                  <Download className="h-5 w-5 mr-2" />
                  Demo
                </button>
              </div>
            </div>

            {/* Asset Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-400">Category:</span>
                <span>{asset.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">File Size:</span>
                <span>{asset.fileSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Format:</span>
                <span>{asset.format}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Version:</span>
                <span>{asset.version}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-3 border-b border-gray-700 pb-1">
              Description
            </h2>
            <p className="text-gray-300 leading-relaxed">{asset.description}</p>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-xl font-semibold mb-3 border-b border-gray-700 pb-1">
              Features
            </h2>
            <ul className="space-y-2 text-gray-300">
              {asset.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="h-2 w-2 bg-purple-500 rounded-full mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetails;
