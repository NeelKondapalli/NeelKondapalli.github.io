import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => {
  const [nameVisible, setNameVisible] = useState(false);
  const [asciiFrame, setAsciiFrame] = useState(0);

  useEffect(() => {
    setTimeout(() => setNameVisible(true), 500);

    const interval = setInterval(() => {
      setAsciiFrame(prev => (prev + 1) % 4);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const asciiArt = [
    `
    .  +  .  * .    .
   * .  .  .  +  .
  .  *  +  .  . *
 .  .  *  .  +  .
    `,
    `
    *  .  +  . .    *
   .  +  .  *  .  +
  +  .  .  +  * .
 .  +  .  .  .  +
    `,
    `
    +  *  .  + .    .
   .  .  +  .  *  .
  .  +  *  .  . +
 *  .  .  +  .  .
    `,
    `
    .  .  *  . +    *
   +  *  .  +  .  .
  *  .  +  *  . .
 .  .  +  .  *  +
    `
  ];

  return (
    <div className="home">
      <Navbar />
      <div className="ascii-art">
        <pre>{asciiArt[asciiFrame]}</pre>
      </div>

      <h1 className={`name ${nameVisible ? 'visible' : ''}`}>
        NEEL KONDAPALLI
      </h1>

      <div className="social-icons">
        <a href="mailto:neel2h06@gmail.com" title="Email">
          <h3>[@]</h3>
        </a>
        <a href="https://x.com/neelkon" target="_blank" rel="noopener noreferrer" title="Twitter">
          <h3>[X]</h3>
        </a>
        <a href="https://linkedin.com/in/neel-kondapalli" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <h3>[In]</h3>
        </a>
        <a href="https://github.com/NeelKondapalli" target="_blank" rel="noopener noreferrer" title="GitHub">
          <h3>[Gh]</h3>
        </a>
      </div>
    </div>
  );
};

export default Home;
