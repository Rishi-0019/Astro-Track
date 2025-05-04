import React, { useEffect } from 'react';
import './StarBackground.css';

const StarBackground: React.FC = () => {
  useEffect(() => {
    const stars = Array.from({ length: 100 }, (_, i) => {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      document.querySelector('.star-container')?.appendChild(star);
      return star;
    });

    return () => {
      stars.forEach(star => star.remove());
    };
  }, []);

  return <div className="star-container" />;
};

export default StarBackground;
