import axios from 'axios';
import { Anime, Season } from '../types/anime';

const ANILIST_API_URL = 'https://graphql.anilist.co';

interface AnimeResponse {
  data: {
    Page: {
      media: Anime[];
    };
  };
}

/**
 * Convert a month number to the corresponding anime season
 */
export const getSeasonFromMonth = (month: number): Season => {
  if (month >= 0 && month <= 2) return 'WINTER'; // Jan-Mar
  if (month >= 3 && month <= 5) return 'SPRING'; // Apr-Jun
  if (month >= 6 && month <= 8) return 'SUMMER'; // Jul-Sep
  return 'FALL'; // Oct-Dec
};

/**
 * Convert a season to its starting month
 */
export const getStartMonthFromSeason = (season: Season): number => {
  switch (season) {
    case 'WINTER': return 0; // January
    case 'SPRING': return 3; // April
    case 'SUMMER': return 6; // July
    case 'FALL': return 9; // October
  }
};

/**
 * Get the current season based on the current date
 */
export const getCurrentSeason = (): Season => {
  const month = new Date().getMonth();
  return getSeasonFromMonth(month);
};

/**
 * Get the current year
 */
export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

/**
 * Fetch anime for a specific season and year
 */
export const fetchSeasonalAnime = async (
  season: Season,
  year: number
): Promise<Anime[]> => {
  const query = `
    query ($season: MediaSeason, $seasonYear: Int, $page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        media(season: $season, seasonYear: $seasonYear, type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
            medium
          }
          bannerImage
          season
          seasonYear
          description
          episodes
          duration
          genres
          averageScore
          popularity
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          nextAiringEpisode {
            airingAt
            timeUntilAiring
            episode
          }
          studios {
            nodes {
              id
              name
            }
          }
          streamingEpisodes {
            title
            thumbnail
            url
            site
          }
          trailer {
            id
            site
          }
          status
          source
        }
      }
    }
  `;

  try {
    const response = await axios.post<AnimeResponse>(
      ANILIST_API_URL,
      {
        query,
        variables: {
          season,
          seasonYear: year,
          page: 1,
          perPage: 50,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    if (!response.data?.data?.Page?.media) {
      throw new Error('Invalid API response structure');
    }

    return response.data.data.Page.media;
  } catch (error) {
    console.error('Error fetching seasonal anime:', error);
    return [];
  }
};

/**
 * Gets all available genres from AniList
 */
export const fetchAnimeGenres = async (): Promise<string[]> => {
  const query = `
    query {
      GenreCollection
    }
  `;

  try {
    const response = await axios.post(
      ANILIST_API_URL,
      {
        query,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    if (!response.data?.data?.GenreCollection) {
      throw new Error('Invalid API response structure');
    }

    return response.data.data.GenreCollection;
  } catch (error) {
    console.error('Error fetching anime genres:', error);
    return [];
  }
};