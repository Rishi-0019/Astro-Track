import { useEffect, useRef } from 'react';
import Globe from 'globe.gl';

const GlobeComponent = () => {
  const globeContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!globeContainer.current) return;

    // Instantiate the Globe in the container. No manual append/remove needed!
    new Globe(globeContainer.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .pointsData([])
      .pointRadius(0.1)
      .pointColor(() => 'rgba(255, 255, 255, 0.5)')
      .pointAltitude(0.1)
      .backgroundColor('#000');
  }, []);

  return (
    <div
      ref={globeContainer}
      style={{ width: '100%', height: '500px', backgroundColor: '#000' }}
    />
  );
};

export default GlobeComponent;
