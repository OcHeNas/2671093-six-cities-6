import { useRef, useEffect } from 'react';
import { Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { defaultIcon, currentIcon } from './markers';
import 'leaflet/dist/leaflet.css';
import { Offer, City } from '../../types/offer';

type CitiesMapProps = {
  city: City;
  points: Offer[];
  activeOfferId?: string;
  zoom?: number;
};

export function CitiesMap({ city, points, activeOfferId, zoom = 10 }: CitiesMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, city, zoom);

  useEffect(() => {
    if (!map) {
      return;
    }

    map.setView([city.location.latitude, city.location.longitude], zoom);

    const markerLayer = layerGroup().addTo(map);

    points.forEach((offer) => {
      new Marker([offer.location.latitude, offer.location.longitude], {
        icon: offer.id === activeOfferId ? currentIcon : defaultIcon,
      }).addTo(markerLayer);
    });

    return () => {
      markerLayer.remove();
    };
  }, [map, points, city, activeOfferId, zoom]);

  return <div className="cities__map" ref={mapRef}></div>;
}

export default CitiesMap;


