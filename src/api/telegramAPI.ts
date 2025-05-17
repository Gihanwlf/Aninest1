export interface TelegramChannel {
  id: string;
  name: string;
  description: string;
  subscribers: number;
  iconUrl: string;
  inviteLink: string;
  tags: string[];
}

// Mock Telegram channels data
export const telegramChannels: TelegramChannel[] = [
  {
    id: '1',
    name: 'AnimeWorldUpdates',
    description: 'Get the latest updates on currently airing anime series, new episode notifications, and schedule changes.',
    subscribers: 25000,
    iconUrl: 'https://images.pexels.com/photos/9008490/pexels-photo-9008490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    inviteLink: 'https://t.me/animeworldupdates',
    tags: ['Updates', 'Schedules'],
  },
  {
    id: '2',
    name: 'AnimeNewsNetwork',
    description: 'Official channel for anime industry news, announcements, and coverage of major events and conventions.',
    subscribers: 50000,
    iconUrl: 'https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    inviteLink: 'https://t.me/animenewsnetwork',
    tags: ['News', 'Industry'],
  },
  {
    id: '3',
    name: 'AnimeMemes',
    description: 'Daily dose of the funniest anime memes, jokes, and humorous content from across the anime community.',
    subscribers: 100000,
    iconUrl: 'https://images.pexels.com/photos/9733807/pexels-photo-9733807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    inviteLink: 'https://t.me/animememes',
    tags: ['Memes', 'Humor'],
  },
  {
    id: '4',
    name: 'AnimeWallpapers',
    description: 'High-quality anime wallpapers for your phone and desktop, updated daily with stunning artwork.',
    subscribers: 75000,
    iconUrl: 'https://images.pexels.com/photos/6507483/pexels-photo-6507483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    inviteLink: 'https://t.me/animewallpapers',
    tags: ['Wallpapers', 'Art'],
  },
  {
    id: '5',
    name: 'AnimeMusicLovers',
    description: 'Share and discover anime soundtracks, openings, endings, and music from your favorite series.',
    subscribers: 35000,
    iconUrl: 'https://images.pexels.com/photos/9733794/pexels-photo-9733794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    inviteLink: 'https://t.me/animemusic',
    tags: ['Music', 'OST'],
  },
  {
    id: '6',
    name: 'AnimeDiscussions',
    description: 'In-depth discussions and analysis of anime series, character developments, plot theories, and more.',
    subscribers: 40000,
    iconUrl: 'https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    inviteLink: 'https://t.me/animediscussions',
    tags: ['Discussions', 'Analysis'],
  },
];

export const fetchTelegramChannels = async (): Promise<TelegramChannel[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return telegramChannels;
};