import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, Github, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100 pt-8 pb-6 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-300 via-primary-500 to-primary-300 animate-glow" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <Calendar size={24} className="text-primary-500 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">
              Ani<span className="text-primary-500">Nest</span>
            </h2>
          </div>
          
          <div className="flex space-x-4 mb-6 md:mb-0">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-600 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={18} />
            </motion.a>
            <motion.a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-600 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink size={18} />
            </motion.a>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-6 pt-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>
              © {currentYear} Gihan. All rights reserved.
            </p>
            <p className="mt-2 md:mt-0">
              <span className="flex items-center justify-center md:justify-start">
                Built with <Heart size={14} className="mx-1 text-primary-500" /> for anime fans
              </span>
            </p>
          </div>
          
          <div className="mt-4 text-xs text-gray-400">
            <p>
              Data provided by AniList, MyAnimeList, and Jikan API
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};