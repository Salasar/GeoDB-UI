import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { City } from '../../types/city';
import 'leaflet/dist/leaflet.css';
import styles from './CityMap.module.scss';

// hack to make icons work in prod
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

interface CityMapProps {
  cities: City[];
  selectedCity?: City | null;
}

const CityMap: React.FC<CityMapProps> = ({ cities, selectedCity }) => {
  const center = selectedCity
    ? [selectedCity.latitude, selectedCity.longitude]
    : [0, 0];

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={center as [number, number]}
        zoom={selectedCity ? 10 : 2}
        className={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {cities.map((city) => (
          <Marker
            icon={DefaultIcon}
            key={city.id}
            position={[city.latitude, city.longitude]}
          >
            <Popup>
              <h3>{city.name}</h3>
              <p>{city.country}</p>
              <p>Population: {city.population.toLocaleString()}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CityMap; 