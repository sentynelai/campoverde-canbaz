import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useStoreSelection } from '../hooks/useStoreSelection';
import { useStoreData } from '../hooks/useStoreData';
import { MapError } from './MapError';
import { loadGoogleMaps } from '../lib/maps';
import { MAPS_CONFIG } from '../lib/maps';
import { useMapReset } from '../hooks/useMapReset';
import type { StoreData } from '../types';

const BATCH_SIZE = 500;
const BATCH_DELAY = 100;

const hasProductSales = (store: StoreData): boolean => {
  const productSalesFields = [
    'CV ENERGY BOOST Sales',
    'CV EXOTIC INDULGENCE Sales',
    'CV ACAI ENERGIZE PWR Sales',
    'CV PASSION BLISS Sales',
    'CV FIT & WELLNESS Sales',
    'CV CHIA SUPREMACY Sales'
  ];

  return productSalesFields.some(field => (store[field] || 0) > 0);
};

export const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout>();
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [markerData, setMarkerData] = useState<Record<number, google.maps.Marker>>({});
  const [error, setError] = useState<string | null>(null);
  
  const { selectedStore, setSelectedStore } = useStoreSelection();
  const { allStores, isLoading } = useStoreData();
  const { setMapInstance: setGlobalMapInstance } = useMapReset();

  const createMarker = useMemo(() => (store: StoreData, map: google.maps.Map) => {
    if (markerData[store.index]) {
      const existingMarker = markerData[store.index];
      existingMarker.setMap(map);
      return existingMarker;
    }

    const isSelected = selectedStore?.index === store.index;
    const hasSales = hasProductSales(store);

    const marker = new google.maps.Marker({
      position: { lat: store.latitude, lng: store.longitude },
      map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: isSelected ? 10 : 8,
        fillColor: hasSales ? '#00FF9C' : '#737373',
        fillOpacity: isSelected ? 0.9 : hasSales ? 0.7 : 0.4,
        strokeWeight: 2.5,
        strokeColor: '#ffffff',
        strokeOpacity: hasSales ? 0.9 : 0.5
      },
      optimized: true,
      clickable: hasSales,
      zIndex: isSelected ? 2 : hasSales ? 1 : 0
    });

    if (hasSales) {
      marker.addListener('click', () => {
        if (clickTimeoutRef.current) {
          clearTimeout(clickTimeoutRef.current);
        }

        clickTimeoutRef.current = setTimeout(async () => {
          setSelectedStore(store);
          map.panTo({ lat: store.latitude, lng: store.longitude });
          map.setZoom(16);
        }, 100);
      });
    }

    setMarkerData(prev => ({ ...prev, [store.index]: marker }));
    return marker;
  }, [selectedStore, setSelectedStore, markerData]);

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
        setError(err instanceof Error ? err.message : 'Failed to load map');
      }
    };

    initializeMap();
    return () => {
      mounted = false;
    };
  }, [setGlobalMapInstance]);

  useEffect(() => {
    if (!mapInstance || !allStores.length) return;

    const showMarkers = async () => {
      for (let i = 0; i < allStores.length; i += BATCH_SIZE) {
        const batch = allStores.slice(i, i + BATCH_SIZE);
        batch.forEach(store => createMarker(store, mapInstance));
        if (i + BATCH_SIZE < allStores.length) {
          await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
        }
      }
    };

    showMarkers();
  }, [mapInstance, allStores, createMarker]);

  if (error) {
    return <MapError message={error} />;
  }

  return (
    <div ref={mapRef} className="w-full h-full opacity-90" />
  );
};