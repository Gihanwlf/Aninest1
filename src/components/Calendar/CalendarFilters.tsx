import React from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { AnimeFilter } from '../../types/anime';

interface CalendarFiltersProps {
  filter: AnimeFilter;
  setFilter: (filter: AnimeFilter) => void;
  availableGenres: string[];
  availableStatuses: string[];
  availablePlatforms: string[];
}

export const CalendarFilters: React.FC<CalendarFiltersProps> = ({
  filter,
  setFilter,
  availableGenres,
  availableStatuses,
  availablePlatforms,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // Toggle filter selection
  const toggleGenre = (genre: string) => {
    if (filter.genres.includes(genre)) {
      setFilter({
        ...filter,
        genres: filter.genres.filter(g => g !== genre),
      });
    } else {
      setFilter({
        ...filter,
        genres: [...filter.genres, genre],
      });
    }
  };

  const toggleStatus = (status: string) => {
    if (filter.status.includes(status)) {
      setFilter({
        ...filter,
        status: filter.status.filter(s => s !== status),
      });
    } else {
      setFilter({
        ...filter,
        status: [...filter.status, status],
      });
    }
  };

  const togglePlatform = (platform: string) => {
    if (filter.platforms.includes(platform)) {
      setFilter({
        ...filter,
        platforms: filter.platforms.filter(p => p !== platform),
      });
    } else {
      setFilter({
        ...filter,
        platforms: [...filter.platforms, platform],
      });
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setFilter({
      genres: [],
      status: [],
      platforms: [],
    });
  };

  // Format status for display
  const formatStatus = (status: string): string => {
    return status.charAt(0) + status.slice(1).toLowerCase().replace('_', ' ');
  };

  // Check if any filters are active
  const hasActiveFilters = filter.genres.length > 0 || filter.status.length > 0 || filter.platforms.length > 0;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Anime Calendar
        </h2>
        
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <motion.button
              onClick={clearFilters}
              className="px-3 py-1 rounded-md text-sm text-primary-600 hover:text-primary-800 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={16} className="mr-1" />
              Clear Filters
            </motion.button>
          )}
          
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`px-3 py-1 rounded-md text-sm ${
              isOpen || hasActiveFilters 
                ? 'bg-primary-100 text-primary-800' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } flex items-center`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter size={16} className="mr-1" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 px-1.5 py-0.5 bg-primary-500 text-white rounded-full text-xs">
                {filter.genres.length + filter.status.length + filter.platforms.length}
              </span>
            )}
          </motion.button>
        </div>
      </div>
      
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Genres */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {availableGenres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`px-2 py-1 rounded-md text-xs ${
                      filter.genres.includes(genre)
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Status */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
              <div className="flex flex-wrap gap-2">
                {availableStatuses.map(status => (
                  <button
                    key={status}
                    onClick={() => toggleStatus(status)}
                    className={`px-2 py-1 rounded-md text-xs ${
                      filter.status.includes(status)
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {formatStatus(status)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Platforms */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {availablePlatforms.map(platform => (
                  <button
                    key={platform}
                    onClick={() => togglePlatform(platform)}
                    className={`px-2 py-1 rounded-md text-xs ${
                      filter.platforms.includes(platform)
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filter.genres.map(genre => (
            <motion.span
              key={`genre-${genre}`}
              className="inline-flex items-center px-2 py-1 rounded-md bg-primary-100 text-primary-800 text-xs"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              {genre}
              <button
                onClick={() => toggleGenre(genre)}
                className="ml-1 text-primary-500 hover:text-primary-700"
              >
                <X size={12} />
              </button>
            </motion.span>
          ))}
          
          {filter.status.map(status => (
            <motion.span
              key={`status-${status}`}
              className="inline-flex items-center px-2 py-1 rounded-md bg-secondary-100 text-secondary-800 text-xs"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              {formatStatus(status)}
              <button
                onClick={() => toggleStatus(status)}
                className="ml-1 text-secondary-500 hover:text-secondary-700"
              >
                <X size={12} />
              </button>
            </motion.span>
          ))}
          
          {filter.platforms.map(platform => (
            <motion.span
              key={`platform-${platform}`}
              className="inline-flex items-center px-2 py-1 rounded-md bg-accent-100 text-accent-800 text-xs"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              {platform}
              <button
                onClick={() => togglePlatform(platform)}
                className="ml-1 text-accent-500 hover:text-accent-700"
              >
                <X size={12} />
              </button>
            </motion.span>
          ))}
        </div>
      )}
    </div>
  );
};