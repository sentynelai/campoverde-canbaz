import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useStoreSelection } from '../hooks/useStoreSelection';
import { useStoreData } from '../hooks/useStoreData';
import { useTierFilter } from '../contexts/TierFilterContext';
import { useMapMarkers } from '../hooks/useMapMarkers';
import { MapError } from './MapError';
import { loadGoogleMaps } from '../lib/maps';
import { MAPS_CONFIG } from '../lib/maps';
import { useMapReset } from '../hooks/useMapReset';
import { MapLegend } from './MapLegend';

const BATCH_SIZE = 500;
const BATCH_DELAY = 100;

export const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const markersInitializedRef = useRef(false);
  
  const { selectedStore, setSelectedStore } = useStoreSelection();
  const { allStores } = useStoreData();
  const { setMapInstance: setGlobalMapInstance } = useMapReset();
  const { activeTiers } = useTierFilter();
  const { createMarker, updateMarkersVisibility, clearMarkers } = useMapMarkers();

  const handleMarkerClick = useCallback((store: StoreData) => {
    if (!mapInstance) return;
    setSelectedStore(store);
    mapInstance.panTo({ lat: store.latitude, lng: store.longitude });
    mapInstance.setZoom(16);
  }, [mapInstance, setSelectedStore]);

  // Initialize map
  useEffect(() => {
    let mounted = true;

    const initializeMap = async () => {
      try {
        if (!mapRef.current) return;

        const google = await loadGoogleMaps();
        const map = new google.maps.Map(mapRef.current, {
          ...MAPS_CONFIG,
          center: MAPS_CONFIG.defaultCenter,
          zoom: MAPS_CONFIG.defaultZoom,
          styles: MAPS_CONFIG.styles,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        });

        if (!mounted) return;
        setMapInstance(map);
        setGlobalMapInstance(map);

      } catch (err) {
        console.error('Error initializing map:', err);
        setMapError(err instanceof Error ? err.message : 'Failed to load map');
      }
    };

    initializeMap();
    return () => {
      mounted = false;
      clearMarkers();
    };
  }, [setGlobalMapInstance, clearMarkers]);

  // Create markers
  useEffect(() => {
    if (!mapInstance || !allStores.length || markersInitializedRef.current) return;

    const showMarkers = async () => {
      for (let i = 0; i < allStores.length; i += BATCH_SIZE) {
        const batch = allStores.slice(i, i + BATCH_SIZE);
        batch.forEach(store => {
          createMarker(
            store,
            mapInstance,
            activeTiers,
            selectedStore?.id ?? null,
            handleMarkerClick
          );
        });
        if (i + BATCH_SIZE < allStores.length) {
          await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
        }
      }
      markersInitializedRef.current = true;
    };

    showMarkers();
  }, [mapInstance, allStores, createMarker, activeTiers, selectedStore, handleMarkerClick]);

  // Update markers visibility when filters change
  useEffect(() => {
    if (!markersInitializedRef.current) return;
    updateMarkersVisibility(mapInstance, allStores, activeTiers, selectedStore?.id ?? null);
  }, [activeTiers, mapInstance, allStores, selectedStore, updateMarkersVisibility]);

  if (mapError) {
    return <MapError message={mapError} />;
  }

  return (
    <>
      <div ref={mapRef} className="w-full h-full opacity-90" />
      <MapLegend />
    </>
  );
};