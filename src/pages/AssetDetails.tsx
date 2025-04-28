import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Download,
  ShoppingCart,
  Star,
  Eye,
  Clock,
  Heart,
  Share2,
  CheckCircle,
} from 'lucide-react';
import ASSETS_DATA from './AssetData.ts';
import LazyImage from '../components/LazyImage';
import { useCart } from '../components/CartContext';

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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' }); 
  }, []);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const [showToast, setShowToast] = useState(false);
  const [liked, setLiked] = useState(false);

  const assetId = Number(id);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const foundAsset = ASSETS_DATA.find((a) => a.id === assetId);
      setAsset(foundAsset || null);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  }, [assetId]);

  const handleAddToCart = () => {
    if (!asset) return;

    addToCart({
      id: asset.id.toString(),
      title: asset.title,
      price: Math.ceil(asset.price *85.30),
      image: asset.image,
      quantity: 1,
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleViewSimilar = () => {
    navigate('/store');
  };

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
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-white">Asset not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-white relative">
      {/* Cart Toast */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-[#1f1f2e] border border-purple-700 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 animate-toastIn z-50">
          <CheckCircle className="text-green-400 h-5 w-5" />
          <span className="text-sm text-white">Added to cart</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
          <LazyImage
  src={asset.images[selectedImage]}
  alt={asset.title}
  className="w-full h-[300px] sm:h-[400px] object-cover transition-all duration-300 pointer-events-none select-none"
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
  className="w-full h-20 object-cover pointer-events-none select-none"
/>

              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-extrabold">{asset.title}</h1>
            <div className="flex gap-2">
              {/* Heart Button */}
              <button
                onClick={() => setLiked(!liked)}
                className={`p-2 rounded-lg transition-all duration-300 border ${
                  liked
                    ? 'bg-pink-800/30 border-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.6)] scale-110'
                    : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                }`}
              >
                <Heart
                  className={`h-5 w-5 transition-all duration-300 ${
                    liked ? 'text-pink-500 fill-pink-500' : 'text-red-500'
                  }`}
                />
              </button>

              {/* Share Button */}
              <a
                href={`mailto:?subject=Check out this asset: ${asset.title}&body=Hey! Check out this awesome asset I found on CoolAssets.%0D%0A%0D%0ATitle: ${asset.title}%0D%0APrice: ₹${asset.price}%0D%0ALink: ${window.location.origin}/assets/${asset.id}`}
                className="p-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
                title="Share via email"
              >
                <Share2 className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 mr-1" />
              {asset.rating} ({asset.reviews} reviews)
            </div>
            <div className="flex items-center">
              <Eye className="h-5 w-5 mr-1" />
              {asset.views} views
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-1" />
              {asset.created}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
              <span className="text-3xl font-bold text-purple-400">₹{Math.ceil(asset.price *85.30)}</span>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={handleAddToCart}
                  className="w-full sm:w-auto px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md flex items-center justify-center transition-all"
                >
                  <ShoppingCart className="mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={handleViewSimilar}
                  className="w-full sm:w-auto px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-md flex items-center justify-center transition-all"
                >
                  <Download className="mr-2" />
                  View Similar
                </button>
              </div>
            </div>

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

          <div>
            <h2 className="text-xl font-semibold border-b border-gray-700 pb-1 mb-3">Description</h2>
            <p className="text-gray-300">{asset.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold border-b border-gray-700 pb-1 mb-3">Features</h2>
            <ul className="text-gray-300 space-y-2">
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

      {/* Animation keyframes */}
      <style>{`
        @keyframes toastIn {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-toastIn {
          animation: toastIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AssetDetails;
