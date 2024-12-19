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
import { AnimatePresence } from 'framer-motion';
import { useStoreSelection } from './hooks/useStoreSelection';
import { useStoreData } from './hooks/useStoreData';
import { LoginPage } from './components/LoginPage';
import { SummaryModals } from './components/SummaryModals';
import { SummaryModalsProvider } from './contexts/SummaryModalsContext';
import { TierFilterProvider } from './contexts/TierFilterContext';
import { MainLayout } from './components/layouts/MainLayout';
import { StoreOverlay } from './components/overlays/StoreOverlay';

export const App: React.FC = () => {
  const { isLoading, isError } = useStoreData();
  const { selectedStore } = useStoreSelection();
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
      <SummaryModalsProvider>
        <TierFilterProvider>
          <MainLayout>
            <Header />
            <Map />
            <SummaryModals />
            
            <AnimatePresence>
              {selectedStore && (
                <StoreOverlay>
                  <AudienceMetrics />
                  <BusinessPerformance />
                  <ProductPerformance />
                  <AudienceKPIs />
                </StoreOverlay>
              )}
            </AnimatePresence>

            <SocialFooter />
            <ChatAssistant />
          </MainLayout>
        </TierFilterProvider>
      </SummaryModalsProvider>
    </ErrorBoundary>
  );
};