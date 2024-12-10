import React, { useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Map } from './components/Map';
import { AudienceMetrics } from './components/AudienceMetrics';
import { SocialFooter } from './components/SocialFooter';
import { LoadingScreen } from './components/LoadingScreen';
import { ChatAssistant } from './components/ChatAssistant';
import { ProductPerformance } from './components/ProductPerformance';
import { BusinessPerformance } from './components/BusinessPerformance';
import { AudienceKPIs } from './components/AudienceKPIs';
import { AnimatePresence, motion } from 'framer-motion';
import { useStoreSelection } from './hooks/useStoreSelection';
import { useStoreData } from './hooks/useStoreData';
import { LoginPage } from './components/LoginPage';
import { LoadingOverlay } from './components/LoadingOverlay';

function App() {
  const { isLoading, isError } = useStoreData();
  const { selectedStore, isLoadingStore, setSelectedStore } = useStoreSelection();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center bg-dark-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Error Loading Data</h1>
          <p className="text-dark-400">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="h-screen bg-dark-950 relative overflow-hidden">
        {/* Fixed Header */}
        <Header />
        
        {/* Background Map */}
        <div className="fixed inset-0 z-0">
          <Map />
        </div>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoadingStore && <LoadingOverlay />}
        </AnimatePresence>

        {/* Store Information Overlay and Modals */}
        <AnimatePresence>
          {selectedStore && (
            <>
              {/* Dark overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-dark-950/50 backdrop-blur-sm z-[5]"
                onClick={() => setSelectedStore(null)}
              />
              
              {/* Modals Container */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed top-24 left-0 right-0 z-10"
              >
                <div className="px-4 overflow-x-auto scrollbar-thin scrollbar-thumb-dark-700 scrollbar-track-dark-900">
                  <div className="flex gap-4 pb-4 min-w-max">
                    <AudienceMetrics key={`metrics-${selectedStore.id}`} />
                    <ProductPerformance key={`products-${selectedStore.id}`} />
                    <BusinessPerformance key={`business-${selectedStore.id}`} />
                    <AudienceKPIs key={`audience-${selectedStore.id}`} />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Social Footer */}
        <SocialFooter />

        {/* Chat Assistant */}
        <ChatAssistant />
      </div>
    </ErrorBoundary>
  );
}

export default App;