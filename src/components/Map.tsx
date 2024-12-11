import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useStoreSelection } from '../hooks/useStoreSelection';
import { useStoreData } from '../hooks/useStoreData';
import { MapError } from './MapError';
import { loadGoogleMaps } from '../lib/maps';
import { MAPS_CONFIG } from '../lib/maps';
import type { StoreData } from '../types';
import { AnimatePresence } from 'framer-motion';

const BATCH_SIZE = 500;
const BATCH_DELAY = 100;
const MIN_ZOOM_FOR_MARKERS = 9;

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
  const [currentZoom, setCurrentZoom] = useState(MAPS_CONFIG.defaultZoom);
  const [markerData, setMarkerData] = useState<Record<number, google.maps.Marker>>({});
  const [error, setError] = useState<string | null>(null);
  
  const { selectedStore, setSelectedStore } = useStoreSelection();
  const { allStores, isLoading } = useStoreData();

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
      zIndex: isSelected ? 2 : hasSales ? 1 : 0,
      title: hasSales ? `${store.name} - ${store.city}, ${store.state}` : undefined
    });

    if (hasSales) {
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-3">
            <div class="font-semibold text-lg mb-1">${store.name}</div>
            <div class="text-sm mb-1">${store.street_address}</div>
            <div class="text-sm">${store.city}, ${store.state} ${store.zip_code}</div>
            <div class="text-sm mt-2 font-medium">Sales: $${(store.sales/1000000).toFixed(1)}M</div>
          </div>
        `,
        pixelOffset: new google.maps.Size(0, -5)
      });

      marker.addListener('mouseover', () => {
        marker.setIcon({
          ...marker.getIcon(),
          fillOpacity: 0.9,
          scale: 12,
          zIndex: 3
        });
        infoWindow.open(map, marker);
      });

      marker.addListener('mouseout', () => {
        if (selectedStore?.index !== store.index) {
          marker.setIcon({
            ...marker.getIcon(),
            fillOpacity: 0.7,
            scale: 8,
            zIndex: 1
          });
        }
        infoWindow.close();
      });

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

        map.addListener('zoom_changed', () => {
          const zoom = map.getZoom();
          if (zoom) {
            setCurrentZoom(zoom);
            
            // Toggle markers visibility
            Object.values(markerData).forEach(marker => {
              marker.setVisible(zoom >= MIN_ZOOM_FOR_MARKERS);
            });
          }
        });

      } catch (err) {
        console.error('Error initializing map:', err);
        setError(err instanceof Error ? err.message : 'Failed to load map');
      }
    };

    initializeMap();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!mapInstance || !allStores.length || currentZoom < MIN_ZOOM_FOR_MARKERS) return;

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
  }, [mapInstance, allStores, currentZoom, createMarker]);

  if (error) {
    return <MapError message={error} />;
  }

  return (
    <>
      <div ref={mapRef} className="w-full h-full opacity-90" />
      {currentZoom < MIN_ZOOM_FOR_MARKERS && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dark-950/90 backdrop-blur-sm px-6 py-3 rounded-lg border border-dark-800/50 text-sm">
          Zoom in closer to see store locations
        </div>
      )}
    </>
  );
};