import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';

const GlobeComponent = () => {
  const globeContainer = useRef(null);

  useEffect(() => {
    const globe = Globe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg') // Add a dark Earth texture
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png') // Optional: Add a bump map for texture
      .pointsData([]) // Optional: You can add points of interest here
      .pointRadius(0.1)
      .pointColor(() => 'rgba(255, 255, 255, 0.5)') // For a starry effect
      .pointAltitude(0.1);

    // Adding stars using a background texture
    globeContainer.current.appendChild(globe());

    // Optional: Add additional customization or star animations
    globe
      .backgroundColor('#000') // Dark background to make stars visible
      .starFieldColor('#fff') // Star field color (white stars)
      .starFieldDensity(0.1); // Density of the stars in the background

    return () => globeContainer.current.removeChild(globe());
  }, []);

  return (
    <div
      ref={globeContainer}
      style={{ width: '100%', height: '500px', backgroundColor: '#000' }}
    />
  );
};

export default GlobeComponent;
