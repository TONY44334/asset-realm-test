import React from 'react';
import { Box, Palette, Map, Music, Film, Code } from 'lucide-react';

const CATEGORIES = [
  {
    icon: Box,
    name: "3D Models",
    description: "High-quality 3D assets for your games",
    count: 2500
  },
  {
    icon: Palette,
    name: "2D Assets",
    description: "Sprites, textures, and UI elements",
    count: 3800
  },
  {
    icon: Map,
    name: "Environments",
    description: "Complete game environments and locations",
    count: 1200
  },
  {
    icon: Music,
    name: "Audio",
    description: "Sound effects and background music",
    count: 4500
  },
  {
    icon: Film,
    name: "Animations",
    description: "Character and object animations",
    count: 1800
  },
  {
    icon: Code,
    name: "Scripts & Plugins",
    description: "Ready-to-use game mechanics and tools",
    count: 950
  }
];

const Categories = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Asset Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES.map((category) => {
          const IconComponent = category.icon;
          return (
            <div key={category.name} className="bg-gray-800 rounded-lg p-6 neon-border card-hover">
              <IconComponent className="h-12 w-12 text-purple-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
              <p className="text-gray-400 mb-4">{category.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">{category.count} assets</span>
                <button className="text-purple-500 hover:text-purple-400">
                  Browse →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;