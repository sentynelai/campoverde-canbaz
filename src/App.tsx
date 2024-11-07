import React from 'react';
import { Layout } from './components/Layout';
import { Map } from './components/Map';
import { MetricsOverlay } from './components/MetricsOverlay';
import { ChatAssistant } from './components/ChatAssistant';
import { BottomMetrics } from './components/BottomMetrics';
import { Logo } from './components/Logo';

function App() {
  return (
    <div className="min-h-screen bg-dark-950 relative overflow-hidden">
      {/* Map Background */}
      <div className="fixed inset-0 z-0">
        <Map />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 px-4 md:px-6 py-4 bg-gradient-to-b from-dark-950/80 to-transparent">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo />
            <h1 className="text-xl md:text-2xl font-bold text-[#00FF9C] opacity-80 hover:opacity-100 transition-opacity">
              Welcome to Campoverde's Canbaz
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <div className="pt-32 md:pt-36 px-4 md:px-6 pb-24">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
              {/* Left Column */}
              <div className="md:col-span-3 space-y-4">
                <MetricsOverlay position="left" />
              </div>

              {/* Center Column - Empty for map visibility */}
              <div className="hidden md:block md:col-span-6" />

              {/* Right Column */}
              <div className="md:col-span-3 space-y-4">
                <MetricsOverlay position="right" />
              </div>
            </div>

            {/* Bottom Metrics */}
            <div className="mt-4 md:mt-6">
              <BottomMetrics />
            </div>
          </div>
        </div>

        {/* Chat Assistant */}
        <ChatAssistant />
      </div>
    </div>
  );
}

export default App;