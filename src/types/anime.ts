export interface Anime {
  id: number;
  title: {
    english: string | null;
    romaji: string;
    native: string | null;
  };
  coverImage: {
    large: string;
    medium: string;
  };
  bannerImage: string | null;
  season: string;
  seasonYear: number;
  description: string;
  episodes: number | null;
  duration: number | null;
  genres: string[];
  averageScore: number | null;
  popularity: number;
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  endDate: {
    year: number | null;
    month: number | null;
    day: number | null;
  };
  nextAiringEpisode: {
    airingAt: number;
    timeUntilAiring: number;
    episode: number;
  } | null;
  studios: {
    nodes: {
      id: number;
      name: string;
    }[];
  };
  streamingEpisodes: {
    title: string;
    thumbnail: string;
    url: string;
    site: string;
  }[];
  trailer: {
    id: string;
    site: string;
  } | null;
  status: string;
  source: string;
}

export interface AnimeCalendarDay {
  date: Date;
  animeList: Anime[];
  isCurrentMonth: boolean;
  isToday: boolean;
}

export type Season = 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL';

export interface CalendarViewData {
  month: number;
  year: number;
  season: Season;
  days: AnimeCalendarDay[];
}

export interface AnimeFilter {
  genres: string[];
  status: string[];
  platforms: string[];
}