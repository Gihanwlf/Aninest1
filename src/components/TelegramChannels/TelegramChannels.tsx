import React from 'react';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { Send, Spline as Spinner } from 'lucide-react';
import { fetchTelegramChannels } from '../../api/telegramAPI';
import { TelegramCard } from './TelegramCard';

export const TelegramChannels: React.FC = () => {
  const { data: channels, isLoading, error } = useQuery(
    'telegramChannels',
    fetchTelegramChannels
  );

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Spinner className="animate-spin text-primary-500" size={32} />
        <span className="ml-2 text-gray-600">Loading Telegram channels...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="text-center">
          <p className="text-error-600 mb-2">Failed to load Telegram channels</p>
          <p className="text-sm text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Send className="text-primary-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">
          Join Anime Telegram Channels
        </h2>
      </div>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {channels?.map((channel, index) => (
          <motion.div
            key={channel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TelegramCard channel={channel} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};