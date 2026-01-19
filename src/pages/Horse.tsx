// @ts-nocheck
import { useState } from 'react';
import AsciiVideoJsonl from '../components/rune/AsciiVideoJsonl';
import ThemeToggle from '../components/ThemeToggle';
import InvertModeToggle from '../components/InvertModeToggle';
import './Home.css';

const Horse = () => {
  const [videoInvertMode, setVideoInvertMode] = useState(2);

  const handleInvertModeToggle = () => {
    setVideoInvertMode((prev) => (prev + 1) % 3);
  };

  return (
    <div className="home" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ThemeToggle />
      <InvertModeToggle invertMode={videoInvertMode} onToggle={handleInvertModeToggle} />
      <div className="video-container">
        <AsciiVideoJsonl framesPath="/horse_simple" preferGzip={true} invertMode={videoInvertMode} />
      </div>
    </div>
  );
};

export default Horse;
