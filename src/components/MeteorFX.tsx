// components/MeteorFX.tsx
import React, { useEffect } from 'react';
import './MeteorFX.css';

const MeteorFX: React.FC = () => {
  useEffect(() => {
    const meteorContainer = document.getElementById('meteor-container');
    if (!meteorContainer) return;

    for (let i = 0; i < 5; i++) {
      const meteor = document.createElement('div');
      meteor.className = 'meteor';
      meteor.style.left = `${Math.random() * 100}vw`;
      meteor.style.animationDelay = `${Math.random() * 5}s`;
      meteorContainer.appendChild(meteor);
    }
  }, []);

  return <div id="meteor-container" className="meteor-wrapper" />;
};

export default MeteorFX;
