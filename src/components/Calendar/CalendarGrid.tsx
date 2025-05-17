import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { AnimeCalendarDay } from '../../types/anime';
import { CalendarCell } from './CalendarCell';

interface CalendarGridProps {
  days: AnimeCalendarDay[];
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ days }) => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Group days into weeks
  const weeks: AnimeCalendarDay[][] = [];
  let currentWeek: AnimeCalendarDay[] = [];

  days.forEach((day, index) => {
    currentWeek.push(day);
    
    if (index % 7 === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // Animation variants for the grid
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cellVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {weekdays.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-7 auto-rows-fr"
      >
        {days.map((day, i) => (
          <motion.div
            key={format(day.date, 'yyyy-MM-dd')}
            variants={cellVariants}
            transition={{ duration: 0.3 }}
            className={`min-h-[100px] border-b border-r border-gray-200 p-1 ${
              !day.isCurrentMonth ? 'bg-gray-50' : ''
            } ${
              i % 7 === 6 ? 'border-r-0' : ''
            } ${
              Math.floor(i / 7) === Math.floor(days.length / 7) ? 'border-b-0' : ''
            }`}
          >
            <CalendarCell day={day} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};