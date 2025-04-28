import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Box,Palette,Map,Download,Users,Shield,Clock } from 'lucide-react';
import ASSETS_DATA from './AssetData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Loader from '../components/Loader';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const heroText = ["Craft.", "Create.", "Conquer."];
  const latestAssets = ASSETS_DATA.slice(0, 8);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % heroText.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loader onFinish={() => setLoading(false)} />;


  //const latestAssets = ASSETS_DATA.slice(0, 8);
  return (
    <div  className="font-[Orbitron]">
      {/* Hero Section */}
      <header className="relative flex items-center justify-center h-screen overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
        >
          <source
            src="/YouTube - YouTube (1080p, h264) (online-video-cutter.com).mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-20 text-center text-white px-4 sm:px-4 lg:px-8">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 drop-shadow-md tracking-wide">
            <span className="typewriter-wrapper sparkle-text">
              {heroText[currentWordIndex]}
            </span>
          </h1>

          <p className="text-xl sm:text-2xl mb-6 text-gray-300">
            Hand-picked assets and tools trusted by thousands of creators worldwide
          </p>
          <div className="mt-8">
            <Link
              to="/store"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-full text-white font-semibold text-lg tracking-wide transition-all transform hover:scale-110 shadow-xl hover:shadow-2xl ring-2 ring-purple-700 ring-opacity-50 hover:ring-4"
            >
              <motion.span
                className="mr-3 text-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                🚀
              </motion.span>
              <motion.span
                initial={{ y: '20px', opacity: 0 }}
                animate={{ y: '0', opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-lg sm:text-xl"
              >
                Browse Assets
              </motion.span>
            </Link>
          </div>
        </div>
      </header>
      {/* Featured Categories */}
      <section className="py-20 bg-gradient-to-br from-[#0f0f1c] to-[#1a1a2e] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-14 neon-title">🔥 Featured Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: <Box />, title: '3D Models', desc: 'High-quality 3D assets ready for your game' },
              { icon: <Palette />, title: '2D Assets', desc: 'Stunning sprites, textures, and UI elements' },
              { icon: <Map />, title: 'Environments', desc: 'Complete game environments and locations' }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#1f1f2e] p-6 rounded-lg border border-purple-900 hover:border-cyan-500 hover:shadow-cyan-500/20 shadow-md transition duration-300 group"
              >
                <div className="text-purple-500 mb-4">{item.icon}</div>
                <h3 className="text-2xl font-semibold mb-2 group-hover:text-cyan-400">{item.title}</h3>
                <p className="text-gray-400 mb-4">{item.desc}</p>
                <Link to="/store" className="text-cyan-500 hover:text-cyan-300">
                  View {item.title} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#12121c] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-purple-400">Why Choose AssetRealm?</h2>
            <ul className="space-y-4 text-gray-300">
              {[
                'Curated high-quality assets',
                'Regular new additions',
                'Commercial license included',
                '24/7 customer support'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-3 text-purple-500">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img
              src="https://img.itch.zone/aW1hZ2UvMjc5OTUwNi8xNjcxMzczNi5wbmc=/original/7K9fue.png"
              alt="Gaming retro art"
              className="rounded-lg shadow-lg border-2 border-purple-600 hover:scale-105 transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* Latest Releases */}
      <section className="mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white p-1" >
            Latest Releases
          </h2>
          <Link
            to="/store"
            className="text-indigo-600 hover:text-indigo-500 font-medium transition"
          >
            View All →
          </Link>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          navigation
          pagination={{ clickable: true }}
        >
          {latestAssets.map((asset) => (
            <SwiperSlide key={asset.id}>
              <Link
                to={`/asset/${asset.id}`}
                className="group bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={asset.image}
                    alt={asset.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate">
                    {asset.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {asset.category}
                  </p>
                  <p className="text-indigo-600 dark:text-indigo-400 font-bold text-base">
                    ${asset.price}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-[#0e0e1c] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-14 text-purple-400">⚙️ Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {[
              { icon: <Shield />, title: 'Secure Licensing', desc: 'Clear commercial rights' },
              { icon: <Download />, title: 'Instant Download', desc: 'Download assets immediately' },
              { icon: <Users />, title: 'Active Community', desc: 'Connect with developers' },
              { icon: <Clock />, title: 'Regular Updates', desc: 'New content weekly' }
            ].map((feature, i) => (
              <div key={i}>
                <div className="text-purple-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-700 to-indigo-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Create Amazing Games?</h2>
        <p className="text-xl mb-8 text-gray-300">Join thousands of game developers using AssetRealm</p>
        <Link
          to="/store"
          className="inline-flex items-center px-8 py-4 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-semibold text-lg transition"
        >
          Start Browsing
        </Link>
        <div className="mt-10 flex justify-center gap-10">
          {[
            { label: 'Assets', value: '10K+' },
            { label: 'Developers', value: '50K+' },
            { label: 'Downloads', value: '100K+' }
          ].map((stat, idx) => (
            <div key={idx}>
              <div className="text-3xl font-bold text-cyan-400">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
      {/* FAQ Section */}
<section className="py-20 bg-[#0a0a17] text-white">
  <div className="max-w-5xl mx-auto px-4">
    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-purple-400">
      🎮 Frequently Asked Questions
    </h2>
    <div className="space-y-6">
      {[
        {
          question: 'Can I use these assets in commercial games?',
          answer:
            'Absolutely. All assets come with a commercial license, so you can use them in both personal and commercial projects without any worries.',
        },
        {
          question: 'Are the assets compatible with Unity and Unreal Engine?',
          answer:
            'Yes! Most assets are engine-agnostic and come in standard formats like FBX, PNG, WAV, etc. Check individual asset pages for specifics.',
        },
        {
          question: 'How often do you update the library?',
          answer:
            'New assets are added weekly. We’re constantly scouting and curating top-tier content to keep your toolkit fresh.',
        },
        {
          question: 'Do I need an account to download assets?',
          answer:
            'Yes, creating a free account allows you to track your downloads, receive updates, and get access to exclusive content.',
        },
      ].map((item, idx) => (
        <div
          key={idx}
          className="border border-purple-800 rounded-lg p-6 hover:border-cyan-500 transition duration-300 bg-[#121222]"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-2">
            {item.question}
          </h3>
          <p className="text-gray-300">{item.answer}</p>
        </div>
      ))}
    </div>
  </div>
</section>
    </div>
  );
};

export default Home;
