import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import './About.css';

const About = () => {
  const [decodedTexts, setDecodedTexts] = useState<{ [key: number]: string }>({});

  const paragraphs = [
    "I'm a student at UC Berkeley studying Electrical Engineering & Computer Sciences. I'm passionate about building systems that solve real problems at scale.\n\nOutside of work, I'm involved with Venture Strategy Solutions and Blockchain at Berkeley, exploring the intersection of technology, finance, and entrepreneurship."
  ];

  const decodeText = (text: string, index: number) => {
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    let iteration = 0;

    // Initialize with random characters
    setDecodedTexts(prev => ({
      ...prev,
      [index]: text
        .split('')
        .map((char) => {
          if (char === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('')
    }));

    const interval = setInterval(() => {
      setDecodedTexts(prev => ({
        ...prev,
        [index]: text
          .split('')
          .map((char, charIndex) => {
            if (char === ' ') return ' ';
            if (charIndex < iteration) {
              return text[charIndex];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      }));

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    paragraphs.forEach((para, index) => {
      setTimeout(() => decodeText(para, index), index * 200);
    });
  }, []);

  return (
    <div className="page about">
      <Navbar />
      <div className="content">
        <div className="about-text">
          {paragraphs.map((para, index) => (
            <p key={index}>
              {decodedTexts[index]}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
