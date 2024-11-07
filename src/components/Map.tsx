import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { GOOGLE_MAPS_API_KEY, MAP_STYLES } from '../config/constants';
import { MapError } from './MapError';
import { StoreData } from '../types';
import { STORE_DATA } from '../data/stores';

export const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map>();
  const [error, setError] = useState<string>('');
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  useEffect(() => {
    const initMap = async () => {
      if (!GOOGLE_MAPS_API_KEY) {
        setError('Google Maps API key is missing');
        return;
      }

      try {
        const loader = new Loader({
          apiKey: GOOGLE_MAPS_API_KEY,
          version: 'weekly',
          libraries: ['places', 'visualization']
        });

        const google = await loader.load();
        
        if (mapRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            center: { lat: 39.8283, lng: -98.5795 },
            zoom: 4,
            styles: [
              ...MAP_STYLES,
              {
                featureType: 'all',
                elementType: 'geometry',
                stylers: [{ saturation: -100 }]
              }
            ],
            disableDefaultUI: false,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            gestureHandling: 'greedy'
          });

          mapInstanceRef.current = map;

          STORE_DATA.forEach((store, index) => {
            // Animated circle effect
            const circle = new google.maps.Circle({
              strokeColor: '#00FF9C',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#00FF9C',
              fillOpacity: 0.35,
              map,
              center: { lat: store.lat, lng: store.lng },
              radius: 50000,
              clickable: true
            });

            // Pulse animation
            let expanding = true;
            const animate = () => {
              const radius = circle.getRadius();
              if (expanding) {
                if (radius < 75000) circle.setRadius(radius + 1000);
                else expanding = false;
              } else {
                if (radius > 50000) circle.setRadius(radius - 1000);
                else expanding = true;
              }
              requestAnimationFrame(animate);
            };
            animate();

            // Create marker
            const marker = new google.maps.Marker({
              position: { lat: store.lat, lng: store.lng },
              map,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#00FF9C',
                fillOpacity: 0.8,
                strokeWeight: 2,
                strokeColor: '#ffffff',
              },
              title: `Store #${store.id}`,
              cursor: 'pointer'
            });

            // Info window with store data
            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div style="background-color: rgba(17, 17, 17, 0.95); color: white; padding: 1rem; border-radius: 0.5rem; min-width: 250px; backdrop-filter: blur(10px);">
                  <h3 style="font-weight: 600; margin-bottom: 0.5rem; color: #00FF9C;">Store #${store.id}</h3>
                  <div style="margin-bottom: 0.5rem;">
                    <p style="color: #9CA3AF; margin-bottom: 0.25rem;">Monthly Sales</p>
                    <p style="font-weight: 600;">$${store.sales.toLocaleString()}</p>
                  </div>
                  <div style="margin-bottom: 0.5rem;">
                    <p style="color: #9CA3AF; margin-bottom: 0.25rem;">Monthly Customers</p>
                    <p style="font-weight: 600;">${store.customers.toLocaleString()}</p>
                  </div>
                  <div style="margin-bottom: 0.5rem;">
                    <p style="color: #9CA3AF; margin-bottom: 0.25rem;">Digital Audience</p>
                    <p style="font-weight: 600;">${store.digitalAudience.toLocaleString()}</p>
                  </div>
                  <div>
                    <p style="color: #9CA3AF; margin-bottom: 0.25rem;">Growth Trend</p>
                    <p style="font-weight: 600; color: ${store.trend >= 0 ? '#00FF9C' : '#EF4444'}">
                      ${store.trend >= 0 ? '+' : ''}${store.trend}%
                    </p>
                  </div>
                </div>
              `,
            });

            // Add click listeners
            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });

            circle.addListener('click', () => {
              infoWindow.setPosition({ lat: store.lat, lng: store.lng });
              infoWindow.open(map);
            });

            markers.push(marker);
          });
        }
      } catch (err) {
        setError('Failed to load Google Maps');
        console.error(err);
      }
    };

    initMap();

    return () => {
      markers.forEach(marker => marker.setMap(null));
    };
  }, []);

  if (error) {
    return <MapError message={error} />;
  }

  return <div ref={mapRef} className="w-full h-full" />;
};