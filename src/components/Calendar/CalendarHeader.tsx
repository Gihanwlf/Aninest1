import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  ArrowRight
} from 'lucide-react';
import { format } from 'date-fns';
import { Season } from '../../types/anime';

interface CalendarHeaderProps {
  month: number;
  year: number;
  season: Season;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToCurrentMonth: () => void;
  goToSeason: (season: Season, year: number) => void;
  currentSeason: Season;
  currentYear: number;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  month,
  year,
  season,
  goToPreviousMonth,
  goToNextMonth,
  goToCurrentMonth,
  goToSeason,
  currentSeason,
  currentYear,
}) => {
  const [showSeasonDropdown, setShowSeasonDropdown] = React.useState(false);

  const seasonDisplay = {
    'WINTER': 'Winter',
    'SPRING': 'Spring',
    'SUMMER': 'Summer',
    'FALL': 'Fall',
  };

  const allSeasons: Season[] = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];
  
  const years = [currentYear - 1, currentYear, currentYear + 1];

  return (
    <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow-sm">
      <motion.button
        onClick={goToPreviousMonth}
        className="p-2 rounded-md hover:bg-gray-100"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft size={20} />
      </motion.button>
      
      <div className="flex items-center">
        <h3 className="text-lg font-medium">
          {format(new Date(year, month, 1), 'MMMM yyyy')}
        </h3>
        
        <div className="relative ml-2">
          <motion.button
            onClick={() => setShowSeasonDropdown(!showSeasonDropdown)}
            className="ml-2 px-3 py-1 text-sm bg-primary-50 text-primary-700 rounded-md hover:bg-primary-100 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {seasonDisplay[season]} Season
            <ArrowRight size={14} className="ml-1" />
          </motion.button>
          
          {showSeasonDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg py-1 right-0"
            >
              {years.map(yearOption => (
                <React.Fragment key={yearOption}>
                  <div className="px-4 py-2 text-xs font-medium text-gray-500">
                    {yearOption}
                  </div>
                  {allSeasons.map(seasonOption => (
                    <button
                      key={`${seasonOption}-${yearOption}`}
                      onClick={() => {
                        goToSeason(seasonOption, yearOption);
                        setShowSeasonDropdown(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        season === seasonOption && year === yearOption
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {seasonDisplay[seasonOption]} {yearOption}
                    </button>
                  ))}
                </React.Fragment>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="flex items-center">
        <motion.button
          onClick={goToCurrentMonth}
          className="p-2 rounded-md hover:bg-gray-100 mr-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CalendarIcon size={20} />
        </motion.button>
        
        <motion.button
          onClick={goToNextMonth}
          className="p-2 rounded-md hover:bg-gray-100"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
};