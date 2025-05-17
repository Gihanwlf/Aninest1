import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, User } from 'lucide-react';
import { TelegramChannel } from '../../api/telegramAPI';

interface TelegramCardProps {
  channel: TelegramChannel;
}

export const TelegramCard: React.FC<TelegramCardProps> = ({ channel }) => {
  const formatSubscribers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-all"
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 0 15px rgba(249, 115, 22, 0.15), 0 0 5px rgba(249, 115, 22, 0.1)' 
      }}
    >
      <div className="h-32 overflow-hidden relative">
        <img
          src={channel.iconUrl}
          alt={channel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
          <h3 className="text-white font-semibold text-lg">{channel.name}</h3>
          
          <div className="flex items-center text-white bg-black/30 px-2 py-1 rounded-full text-xs">
            <User size={12} className="mr-1" />
            {formatSubscribers(channel.subscribers)}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-4 h-16 overflow-hidden">
          {channel.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-1">
            {channel.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 bg-primary-100 text-primary-800 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <motion.a
            href={channel.inviteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-800"
            whileHover={{ x: 3 }}
          >
            Join <ExternalLink size={14} className="ml-1" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};