// src/components/SatelliteInfoCard.tsx
import React from 'react';

interface SatelliteInfoCardProps {
  name: string;
  latitude: number;
  longitude: number;
  altitude: number;
}

const SatelliteInfoCard: React.FC<SatelliteInfoCardProps> = ({ name, latitude, longitude, altitude }) => {
  return (
    <div className="satellite-card">
      <h3>{name}</h3>
      <p>Latitude: {latitude.toFixed(2)}</p>
      <p>Longitude: {longitude.toFixed(2)}</p>
      <p>Altitude: {altitude.toFixed(2)} km</p>
    </div>
  );
};

export default SatelliteInfoCard;
