import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Calendar, ExternalLink, Star, Clock, Video, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAnimeModal } from '../../contexts/AnimeModalContext';

export const AnimeModal: React.FC = () => {
  const { selectedAnime, isModalOpen, closeModal } = useAnimeModal();

  if (!selectedAnime) return null;

  // Format anime start date
  const startDate = selectedAnime.startDate.year && selectedAnime.startDate.month && selectedAnime.startDate.day
    ? new Date(selectedAnime.startDate.year, selectedAnime.startDate.month - 1, selectedAnime.startDate.day)
    : null;

  const formattedDate = startDate 
    ? startDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) 
    : 'TBA';

  // Generate ICS calendar event data
  const generateCalendarEvent = () => {
    if (!startDate) return '';
    
    const title = selectedAnime.title.english || selectedAnime.title.romaji;
    const description = selectedAnime.description || `Watch ${title}`;
    
    // Format date for iCalendar
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };
    
    const now = formatDate(new Date());
    const start = formatDate(startDate);
    
    // Create a date 1 hour later for the end time
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1);
    const end = formatDate(endDate);
    
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//AniNest//Anime Calendar//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `UID:${selectedAnime.id}@aninest.com`,
      `DTSTAMP:${now}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsData)}`;
  };

  const calendarEventUrl = startDate ? generateCalendarEvent() : '';

  // Format trailer URL
  const getTrailerUrl = () => {
    if (!selectedAnime.trailer) return '';
    
    if (selectedAnime.trailer.site === 'youtube') {
      return `https://www.youtube.com/watch?v=${selectedAnime.trailer.id}`;
    }
    
    return '';
  };

  const trailerUrl = getTrailerUrl();

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-xl bg-white shadow-xl transition-all">
                <div className="relative">
                  {/* Banner image */}
                  <div className="h-48 md:h-64 bg-gradient-to-r from-primary-500 to-secondary-500 relative overflow-hidden">
                    {selectedAnime.bannerImage && (
                      <img 
                        src={selectedAnime.bannerImage} 
                        alt={selectedAnime.title.english || selectedAnime.title.romaji} 
                        className="w-full h-full object-cover opacity-50"
                      />
                    )}
                    
                    {/* Close button */}
                    <button
                      onClick={closeModal}
                      className="absolute top-4 right-4 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-10"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Cover image (overlapping) */}
                  <div className="absolute -bottom-20 left-8 w-32 h-48 md:w-40 md:h-56 rounded-lg overflow-hidden border-4 border-white shadow-xl">
                    <img 
                      src={selectedAnime.coverImage.large} 
                      alt={selectedAnime.title.english || selectedAnime.title.romaji} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="pt-24 px-8 pb-8">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {selectedAnime.title.english || selectedAnime.title.romaji}
                      </h2>
                      
                      {selectedAnime.title.native && (
                        <p className="text-lg text-gray-500 mt-1">
                          {selectedAnime.title.native}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {selectedAnime.genres.map((genre) => (
                          <span 
                            key={genre} 
                            className="px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-6 prose prose-sm max-w-none text-gray-700" 
                        dangerouslySetInnerHTML={{ __html: selectedAnime.description || 'No description available.' }} 
                      />
                    </div>
                    
                    <div className="w-full md:w-64 bg-gray-50 rounded-lg p-4 space-y-4">
                      {/* Info boxes */}
                      <div className="flex items-center">
                        <Calendar size={18} className="text-primary-500 mr-2" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-600">Release Date</h4>
                          <p className="text-sm text-gray-900">{formattedDate}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Star size={18} className="text-primary-500 mr-2" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-600">Rating</h4>
                          <p className="text-sm text-gray-900">
                            {selectedAnime.averageScore ? `${selectedAnime.averageScore}%` : 'N/A'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock size={18} className="text-primary-500 mr-2" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-600">Episodes</h4>
                          <p className="text-sm text-gray-900">
                            {selectedAnime.episodes || 'TBA'} {selectedAnime.duration && `(${selectedAnime.duration} min each)`}
                          </p>
                        </div>
                      </div>
                      
                      {selectedAnime.studios.nodes.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-600">Studios</h4>
                          <div className="text-sm text-gray-900">
                            {selectedAnime.studios.nodes.map(studio => studio.name).join(', ')}
                          </div>
                        </div>
                      )}
                      
                      {/* Action buttons */}
                      <div className="pt-2 space-y-3">
                        {trailerUrl && (
                          <motion.a
                            href={trailerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Video size={16} className="mr-2" />
                            Watch Trailer
                          </motion.a>
                        )}
                        
                        {calendarEventUrl && (
                          <motion.a
                            href={calendarEventUrl}
                            download={`${selectedAnime.title.english || selectedAnime.title.romaji}.ics`}
                            className="flex items-center justify-center w-full px-4 py-2 bg-white text-primary-700 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Download size={16} className="mr-2" />
                            Add to Calendar
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Streaming platforms */}
                  {selectedAnime.streamingEpisodes.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Where to Watch
                      </h3>
                      
                      <div className="flex flex-wrap gap-3">
                        {selectedAnime.streamingEpisodes.slice(0, 4).map((episode, index) => (
                          <motion.a
                            key={index}
                            href={episode.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ExternalLink size={16} className="mr-2 text-primary-500" />
                            {episode.site}
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};