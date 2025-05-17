import { useState, useEffect, useMemo } from 'react';
import { 
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
  format
} from 'date-fns';
import { useQuery } from 'react-query';
import { 
  fetchSeasonalAnime, 
  getSeasonFromMonth, 
  getCurrentSeason,
  getCurrentYear
} from '../api/anilistAPI';
import { 
  Anime, 
  AnimeCalendarDay, 
  Season, 
  CalendarViewData,
  AnimeFilter
} from '../types/anime';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filter, setFilter] = useState<AnimeFilter>({
    genres: [],
    status: [],
    platforms: []
  });

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Get season based on current month
  const season = useMemo(() => getSeasonFromMonth(currentMonth), [currentMonth]);

  // Fetch anime data for the current season and year
  const { data: animeList, isLoading, error } = useQuery(
    ['anime', season, currentYear],
    () => fetchSeasonalAnime(season, currentYear),
    {
      staleTime: 1000 * 60 * 60, // 1 hour
    }
  );

  // Apply filters to anime list
  const filteredAnimeList = useMemo(() => {
    if (!animeList) return [];

    return animeList.filter(anime => {
      // Filter by genres
      if (filter.genres.length > 0) {
        const hasMatchingGenre = anime.genres.some(genre => 
          filter.genres.includes(genre)
        );
        if (!hasMatchingGenre) return false;
      }

      // Filter by status
      if (filter.status.length > 0) {
        if (!filter.status.includes(anime.status)) return false;
      }

      // Filter by streaming platforms
      if (filter.platforms.length > 0) {
        if (anime.streamingEpisodes.length === 0) return false;
        
        const animePlatforms = anime.streamingEpisodes.map(ep => ep.site);
        const hasMatchingPlatform = animePlatforms.some(platform => 
          filter.platforms.includes(platform)
        );
        if (!hasMatchingPlatform) return false;
      }

      return true;
    });
  }, [animeList, filter]);

  // Generate calendar days for the current month
  const calendarDays = useMemo(() => {
    if (!filteredAnimeList) return [];

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return days.map(day => {
      // Find anime that airs on this day
      const dayAnimeList = filteredAnimeList.filter(anime => {
        if (!anime.startDate.day) return false;
        
        const animeDate = new Date(
          anime.startDate.year,
          anime.startDate.month - 1, // JavaScript months are 0-indexed
          anime.startDate.day
        );
        
        return format(day, 'yyyy-MM-dd') === format(animeDate, 'yyyy-MM-dd');
      });

      return {
        date: day,
        animeList: dayAnimeList,
        isCurrentMonth: isSameMonth(day, currentDate),
        isToday: isToday(day),
      } as AnimeCalendarDay;
    });
  }, [currentDate, filteredAnimeList]);

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => subMonths(prevDate, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, 1));
  };

  const goToCurrentMonth = () => {
    setCurrentDate(new Date());
  };

  const goToSeason = (season: Season, year: number) => {
    const monthForSeason = getSasonStartMonth(season);
    const newDate = new Date(year, monthForSeason, 1);
    setCurrentDate(newDate);
  };

  // Helper function to get starting month for a season
  const getSasonStartMonth = (season: Season): number => {
    switch (season) {
      case 'WINTER': return 0; // January
      case 'SPRING': return 3; // April 
      case 'SUMMER': return 6; // July
      case 'FALL': return 9;   // October
    }
  };

  // Calendar view data
  const calendarViewData: CalendarViewData = {
    month: currentMonth,
    year: currentYear,
    season,
    days: calendarDays,
  };

  // Get all available streaming platforms from the anime list
  const availablePlatforms = useMemo(() => {
    if (!animeList) return [];
    
    const platforms = new Set<string>();
    
    animeList.forEach(anime => {
      anime.streamingEpisodes.forEach(episode => {
        platforms.add(episode.site);
      });
    });
    
    return Array.from(platforms);
  }, [animeList]);

  // Get all available genres from the anime list
  const availableGenres = useMemo(() => {
    if (!animeList) return [];
    
    const genres = new Set<string>();
    
    animeList.forEach(anime => {
      anime.genres.forEach(genre => {
        genres.add(genre);
      });
    });
    
    return Array.from(genres);
  }, [animeList]);

  // Get all available statuses from the anime list
  const availableStatuses = useMemo(() => {
    if (!animeList) return [];
    
    const statuses = new Set<string>();
    
    animeList.forEach(anime => {
      statuses.add(anime.status);
    });
    
    return Array.from(statuses);
  }, [animeList]);

  return {
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
    currentSeason: getCurrentSeason(),
    currentYear: getCurrentYear(),
  };
};