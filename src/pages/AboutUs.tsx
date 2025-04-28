import { motion } from 'framer-motion';
import { Gamepad2, Users, Rocket } from 'lucide-react';
import { useEffect } from 'react';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' }); 
  }, []);
  return (
    <div  className="bg-[#0d0d1c] text-white font-[Orbitron] min-h-screen pt-24 px-4 sm:px-6 lg:px-24 pb-20">
      {/* Hero */}
      <section id='strt' className="text-center mb-20">
        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold text-purple-500 drop-shadow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🎮 Welcome to <span className='font-[Audiowide] font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent tracking-wide transition duration-300 group-hover:brightness-125'>Bravyn Studios</span>
        </motion.h1>
        <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto">
          Where innovation meets immersion. We're building the ultimate ecosystem for indie developers and creative minds in the gaming universe.
        </p>
      </section>

      {/* Sections */}
      <div className="grid md:grid-cols-3 gap-12">
        {/* Who We Are */}
        <motion.div
          className="bg-[#1a1a2e] p-6 rounded-xl shadow-lg border border-purple-800 hover:border-cyan-500 transition-all"
          whileHover={{ scale: 1.03 }}
        >
          <Gamepad2 className="h-10 w-10 text-purple-500 mb-4" />
          <h2 className="text-xl font-bold text-cyan-400 mb-2">Who We Are</h2>
          <p className="text-gray-300 text-sm">
            Bravyn Studios is a Hyderabad-based digital studio, founded with a mission to empower game developers, artists, and storytellers. We're a team of passionate creators, tech nerds, and digital warriors.
          </p>
        </motion.div>

        {/* What We Do */}
        <motion.div
          className="bg-[#1a1a2e] p-6 rounded-xl shadow-lg border border-purple-800 hover:border-cyan-500 transition-all"
          whileHover={{ scale: 1.03 }}
        >
          <Rocket className="h-10 w-10 text-purple-500 mb-4" />
          <h2 className="text-xl font-bold text-cyan-400 mb-2">What We Do</h2>
          <p className="text-gray-300 text-sm">
            We offer a curated digital marketplace full of game-ready assets, 3D models, sound FX, and pixel-perfect UI kits. Our platform is built for rapid creation, collaboration, and community building.
          </p>
        </motion.div>

        {/* Our Community */}
        <motion.div
          className="bg-[#1a1a2e] p-6 rounded-xl shadow-lg border border-purple-800 hover:border-cyan-500 transition-all"
          whileHover={{ scale: 1.03 }}
        >
          <Users className="h-10 w-10 text-purple-500 mb-4" />
          <h2 className="text-xl font-bold text-cyan-400 mb-2">Our Community</h2>
          <p className="text-gray-300 text-sm">
            With thousands of users globally, our tribe is growing fast. Whether you're crafting your first game or launching your tenth, you're never alone. Join a network of creators who share your vision.
          </p>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        className="mt-24 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-3xl font-bold text-purple-400 mb-4">🚀 Let’s Build the Future of Gaming</h3>
        <p className="text-gray-400 mb-8">
          Partner with us. Contribute. Create. Join a studio that’s reimagining what’s possible.
        </p>
        <a
          href="/store"
          className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-700 hover:from-cyan-700 hover:to-purple-800 text-white font-semibold rounded-lg transition-transform transform hover:scale-105"
        >
          Explore the Marketplace
        </a>
      </motion.div>
    </div>
  );
};

export default AboutUs;
