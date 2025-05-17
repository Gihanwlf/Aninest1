import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { motion } from 'framer-motion';
import { Calendar } from './components/Calendar/Calendar';
import { TelegramChannels } from './components/TelegramChannels/TelegramChannels';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { ParticleBackground } from './components/ParticleBackground/ParticleBackground';
import { AnimeModalProvider } from './contexts/AnimeModalContext';

// Initialize React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 15, // 15 minutes
    },
  },
});

function App() {
  const [activeSection, setActiveSection] = useState<string>('calendar');

  return (
    <QueryClientProvider client={queryClient}>
      <AnimeModalProvider>
        <div className="min-h-screen bg-white overflow-x-hidden">
          <ParticleBackground />
          
          <Header activeSection={activeSection} onSectionChange={setActiveSection} />
          
          <motion.main 
            className="container mx-auto px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {activeSection === 'calendar' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Calendar />
              </motion.div>
            )}
            
         
            
         
            
            {activeSection === 'telegram' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TelegramChannels />
              </motion.div>
            )}
          </motion.main>
          
          <Footer />
        </div>
      </AnimeModalProvider>
    </QueryClientProvider>
  );
}

export default App;