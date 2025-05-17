import React from 'react';
import { Spline as Spinner } from 'lucide-react';
import { useCalendar } from '../../hooks/useCalendar';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { CalendarFilters } from './CalendarFilters';

export const Calendar: React.FC = () => {
  const {
    calendarViewData,
    isLoading,
    error,
    filter,
    setFilter,
    goToPreviousMonth,
    goToNextMonth,
    goToCurrentMonth,
    goToSeason,
    availablePlatforms,
    availableGenres,
    availableStatuses,
    currentSeason,
    currentYear,
  } = useCalendar();

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Spinner className="animate-spin text-primary-500" size={32} />
        <span className="ml-2 text-gray-600">Loading anime calendar...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="text-center">
          <p className="text-error-600 mb-2">Failed to load anime calendar</p>
          <p className="text-sm text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CalendarFilters
        filter={filter}
        setFilter={setFilter}
        availableGenres={availableGenres}
        availableStatuses={availableStatuses}
        availablePlatforms={availablePlatforms}
      />
      
      <CalendarHeader
        month={calendarViewData.month}
        year={calendarViewData.year}
        season={calendarViewData.season}
        goToPreviousMonth={goToPreviousMonth}
        goToNextMonth={goToNextMonth}
        goToCurrentMonth={goToCurrentMonth}
        goToSeason={goToSeason}
        currentSeason={currentSeason}
        currentYear={currentYear}
      />
      
      <CalendarGrid days={calendarViewData.days} />
    </div>
  );
};