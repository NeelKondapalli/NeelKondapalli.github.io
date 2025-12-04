import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import './Experiences.css';

const Experiences = () => {
  const [decodedTexts, setDecodedTexts] = useState<{ [key: number]: string }>({});

  const experiences = [
    {
      company: 'Cubist Systematic Strategies',
      role: 'Incoming Quantitative Developer Intern'
    },
    {
      company: 'Tower Research Capital',
      role: 'Software Engineer Intern'
    },
    {
      company: 'Carbyne',
      role: 'Technical Consultant'
    },
    {
      company: 'Berkeley SkyDeck',
      role: 'Software Engineer Intern'
    },
    {
      company: 'TetraScience',
      role: 'Machine Learning Intern'
    },
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
    experiences.forEach((exp, index) => {
      const fullText = `${exp.company} - ${exp.role}`;
      setTimeout(() => decodeText(fullText, index), index * 100);
    });
  }, []);

  return (
    <div className="page experiences">
      <Navbar />
  
      <div className="content">
        <div className="experience-list">
          {experiences.map((exp, index) => {
            const fullText = `${exp.company} - ${exp.role}`;
            const displayText = decodedTexts[index] || " ";
            const [company, ...roleParts] = displayText.split(' - ');
            const role = roleParts.join(' - ');

            if (displayText == " ") {
              return (
                <div key={index} className="experience-item">
                </div>
              )
            }

            return (
              <div key={index} className="experience-item">
                <span className="company">{company}</span>
                <span className="separator"> - </span>
                <span className="role">{role}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Experiences;
