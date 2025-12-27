import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { City } from '../types/offer';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City,
  zoom: number
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: [city.location.latitude, city.location.longitude],
        zoom: zoom,
      });

      const tileLayer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      );

      tileLayer.addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city, zoom]);

  return map;
}

export default useMap;

