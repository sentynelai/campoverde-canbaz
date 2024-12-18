import { useState, useCallback, useRef } from 'react';
import type { StoreData } from '../types';
import { updateMarkerAppearance } from '../lib/maps/markers';

interface MapMarkers {
  [key: string]: google.maps.Marker;
}

export function useMapMarkers() {
  const markersRef = useRef<MapMarkers>({});
  const [, setMarkersState] = useState<MapMarkers>({});

  const clearMarkers = useCallback(() => {
    Object.values(markersRef.current).forEach(marker => marker.setMap(null));
    markersRef.current = {};
    setMarkersState({});
  }, []);

  const updateMarkersVisibility = useCallback((
    map: google.maps.Map | null,
    stores: StoreData[],
    activeTiers: Set<string>,
    selectedStoreId: number | null
  ) => {
    if (!map) return;

    Object.values(markersRef.current).forEach(marker => {
      const store = marker.get('storeData') as StoreData;
      if (store) {
        updateMarkerAppearance(marker, store, activeTiers, selectedStoreId);
      }
    });
  }, []);

  const createMarker = useCallback((
    store: StoreData,
    map: google.maps.Map,
    activeTiers: Set<string>,
    selectedStoreId: number | null,
    onMarkerClick: (store: StoreData) => void
  ) => {
    const markerId = `store-${store.id}`;
    
    if (markersRef.current[markerId]) {
      const existingMarker = markersRef.current[markerId];
      updateMarkerAppearance(existingMarker, store, activeTiers, selectedStoreId);
      return existingMarker;
    }

    const marker = new google.maps.Marker({
      position: { lat: store.latitude, lng: store.longitude },
      map,
      optimized: true,
      clickable: true
    });

    marker.set('storeData', store);
    marker.addListener('click', () => onMarkerClick(store));
    
    updateMarkerAppearance(marker, store, activeTiers, selectedStoreId);
    
    markersRef.current[markerId] = marker;
    setMarkersState(prev => ({ ...prev, [markerId]: marker }));
    return marker;
  }, []);

  return {
    markers: markersRef.current,
    createMarker,
    clearMarkers,
    updateMarkersVisibility
  };
}