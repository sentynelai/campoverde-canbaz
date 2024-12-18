import { TIER_COLORS } from '../../constants/tiers';
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
  return activeTiers.has(store.tier);
}

export function getMarkerColor(store: StoreData): string {
  return TIER_COLORS[store.tier] || TIER_COLORS['Unknown'];
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