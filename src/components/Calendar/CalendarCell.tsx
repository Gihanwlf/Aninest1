import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { AnimeCalendarDay } from '../../types/anime';
import { useAnimeModal } from '../../contexts/AnimeModalContext';

interface CalendarCellProps {
  day: AnimeCalendarDay;
}

export const CalendarCell: React.FC<CalendarCellProps> = ({ day }) => {
  const { openModal } = useAnimeModal();
  
  const dayNumber = format(day.date, 'd');
  const hasAnime = day.animeList.length > 0;
  
  return (
    <div className="h-full flex flex-col">
      <div className={`text-xs font-medium mb-1 flex justify-center items-center w-6 h-6 rounded-full ${
        day.isToday 
          ? 'bg-primary-500 text-white' 
          : day.isCurrentMonth 
            ? 'text-gray-700' 
            : 'text-gray-400'
      }`}>
        {dayNumber}
      </div>
      
      <div className="flex-1 overflow-auto space-y-1">
        {hasAnime ? (
          day.animeList.slice(0, 3).map((anime) => (
            <motion.button
              key={anime.id}
              onClick={() => openModal(anime)}
              className="w-full block text-left bg-white hover:bg-gray-50 rounded p-1 transition-colors border border-gray-100 shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-1">
                <div className="w-8 h-10 flex-shrink-0 rounded overflow-hidden">
                  <img
                    src={anime.coverImage.medium}
                    alt={anime.title.english || anime.title.romaji}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-medium text-gray-800 truncate">
                    {anime.title.english || anime.title.romaji}
                  </h4>
                  {anime.genres[0] && (
                    <span className="text-[10px] text-gray-500">
                      {anime.genres[0]}
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          ))
        ) : (
          <div className="h-full flex items-center justify-center">
            {day.isCurrentMonth && (
              <span className="text-xs text-gray-300">No releases</span>
            )}
          </div>
        )}
        
        {hasAnime && day.animeList.length > 3 && (
          <div className="text-center">
            <span className="text-xs text-primary-500 font-medium">
              +{day.animeList.length - 3} more
            </span>
          </div>
        )}
      </div>
    </div>
  );
};