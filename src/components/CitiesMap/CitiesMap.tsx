import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import 'leaflet/dist/leaflet.css';
import { Offer, City } from '../../types/offer';

type CitiesMapProps = {
  city: City;
  points: Offer[];
  activeOfferId?: string;
  zoom?: number;
};

const defaultIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function CitiesMap({ city, points, activeOfferId, zoom = 10 }: CitiesMapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, city, zoom);

  useEffect(() => {
    if (map) {
      // Центрируем карту на новый город с нужным масштабом
      map.setView([city.location.latitude, city.location.longitude], zoom);

      const markerLayer = layerGroup().addTo(map);

      points.forEach((offer) => {
        const marker = new Marker([offer.location.latitude, offer.location.longitude], {
          icon: offer.id === activeOfferId ? currentIcon : defaultIcon,
        });
        marker.addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, city, activeOfferId, zoom]);

  return <div className="cities__map" ref={mapRef}></div>;
}

export default CitiesMap;

