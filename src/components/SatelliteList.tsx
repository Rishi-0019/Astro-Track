// src/components/SatelliteList.tsx
import React from 'react';
import Select from 'react-select';

interface SatelliteListProps {
  satellites: Array<{ id: string; name: string }>;
  onSelect: (selected: any) => void;
}

const SatelliteList: React.FC<SatelliteListProps> = ({ satellites, onSelect }) => {
  const satelliteOptions = satellites.map((satellite) => ({
    value: satellite.id,
    label: satellite.name,
  }));

  return (
    <div className="satellite-list">
      <Select
        options={satelliteOptions}
        onChange={onSelect}
        placeholder="Select a Satellite"
        className="react-select-container"
      />
    </div>
  );
};

export default SatelliteList;
