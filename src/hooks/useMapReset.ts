import { atom, useAtom } from 'jotai';
import { MAPS_CONFIG } from '../lib/maps';

const mapInstanceAtom = atom<google.maps.Map | null>(null);

export function useMapReset() {
  const [mapInstance, setMapInstance] = useAtom(mapInstanceAtom);

  const resetMap = () => {
    if (mapInstance) {
      mapInstance.setZoom(MAPS_CONFIG.defaultZoom);
      mapInstance.setCenter(MAPS_CONFIG.defaultCenter);
    }
  };

  return {
    resetMap,
    setMapInstance
  };
}