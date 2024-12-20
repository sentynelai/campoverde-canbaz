import { TIER_COLORS } from '../../constants/tiers';
import { isInContinentalUS } from '../../utils/locationFilters';
import type { StoreData } from '../../types';

interface MarkerOptions {
  isSelected: boolean;
  isVisible: boolean;
  tierColor: string;
}

export function createMarkerIcon({ isSelected, isVisible, tierColor }: MarkerOptions) {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    scale: isSelected ? 10 : 8,
    fillColor: tierColor,
    fillOpacity: isSelected ? 0.9 : (isVisible ? 0.7 : 0),
    strokeWeight: 2.5,
    strokeColor: '#ffffff',
    strokeOpacity: isVisible ? 0.9 : 0
  };
}

export function getMarkerVisibility(store: StoreData, activeTiers: Set<string>): boolean {
  // Check if store is in continental US before showing marker
  if (!isInContinentalUS(store.latitude, store.longitude)) {
    return false;
  }
  
  // Get the store's tier, defaulting to 'Unknown' if not set
  const storeTier = store.tier || 'Unknown';
  return activeTiers.has(storeTier);
}

export function getMarkerColor(store: StoreData): string {
  // Get the store's tier, defaulting to 'Unknown' if not set
  const storeTier = store.tier || 'Unknown';
  return TIER_COLORS[storeTier] || TIER_COLORS['Unknown'];
}

export function updateMarkerAppearance(
  marker: google.maps.Marker,
  store: StoreData,
  activeTiers: Set<string>,
  selectedStoreId: number | null
): void {
  const isVisible = getMarkerVisibility(store, activeTiers);
  const isSelected = store.id === selectedStoreId;
  const tierColor = getMarkerColor(store);

  marker.setIcon(createMarkerIcon({ isSelected, isVisible, tierColor }));
  marker.setVisible(isVisible);
}