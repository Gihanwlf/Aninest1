import React from 'react';
import { motion } from 'framer-motion';
import { Calendar,Send } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onSectionChange }) => {
  const navItems = [
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'telegram', label: 'Telegram', icon: Send },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <div className="flex items-center mb-4 md:mb-0">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Calendar size={28} className="text-primary-500 mr-2" />
            </motion.div>
            <motion.h1 
              className="text-2xl font-bold text-gray-800"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Ani<span className="text-primary-500">Nest</span>
            </motion.h1>
          </div>
          
          <nav className="w-full md:w-auto">
            <ul className="flex justify-between md:justify-end space-x-1 md:space-x-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onSectionChange(item.id)}
                    className={`relative group flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                      activeSection === item.id
                        ? 'text-primary-500 font-medium'
                        : 'text-gray-600 hover:text-primary-500'
                    }`}
                  >
                    <item.icon size={18} className="mr-1" />
                    <span className="hidden md:inline">{item.label}</span>
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute inset-0 bg-primary-50 rounded-md -z-10"
                        initial={false}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};