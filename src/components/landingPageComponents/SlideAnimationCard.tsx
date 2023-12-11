import React, { useEffect, useState } from 'react';
import './SlideAnimationCard.css';

const SlideAnimationCard = () => {
  const [topPosition, setTopPosition] = useState('5vh');
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPosition = (scrollTop + clientHeight) / scrollHeight * 100;

      if (scrollPosition > 88) {
        setTopPosition(`0%`);
        setOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="card-container">
      <div className="slide-animation-card" style={{top: topPosition, opacity: opacity}}>
        <div className="card-item"><p>content here:</p></div>
        <div className="card-item"><p>content here:</p></div>
        <div className="card-item"><p>content here:</p></div>
      </div>
    </div>
  
  );
}

export default SlideAnimationCard;