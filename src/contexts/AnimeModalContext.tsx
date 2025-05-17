import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Anime } from '../types/anime';
import { AnimeModal } from '../components/Calendar/AnimeModal';

interface AnimeModalContextType {
  selectedAnime: Anime | null;
  isModalOpen: boolean;
  openModal: (anime: Anime) => void;
  closeModal: () => void;
}

const AnimeModalContext = createContext<AnimeModalContextType | undefined>(undefined);

export const useAnimeModal = () => {
  const context = useContext(AnimeModalContext);
  if (context === undefined) {
    throw new Error('useAnimeModal must be used within an AnimeModalProvider');
  }
  return context;
};

interface AnimeModalProviderProps {
  children: ReactNode;
}

export const AnimeModalProvider: React.FC<AnimeModalProviderProps> = ({ children }) => {
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (anime: Anime) => {
    setSelectedAnime(anime);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Clear the selected anime after the modal close animation finishes
    setTimeout(() => {
      setSelectedAnime(null);
    }, 300);
  };

  return (
    <AnimeModalContext.Provider
      value={{
        selectedAnime,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
      <AnimeModal />
    </AnimeModalContext.Provider>
  );
};