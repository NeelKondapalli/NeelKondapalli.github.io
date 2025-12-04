import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import './Projects.css';

const Projects = () => {
  const [decodedTexts, setDecodedTexts] = useState<{ [key: number]: string }>({});

  const projects = [
    {
      name: 'Sure',
      description: 'Critize claims on X posts conditioned on prior research',
      url: 'https://github.com/NeelKondapalli/sure'
    },
    {
      name: 'Callisto',
      description: 'MCP CLI assistant for context-aware automation',
      url: 'https://github.com/NeelKondapalli/callisto-demo'
    },
    {
      name: 'Neptune',
      description: 'Multimodal music gen & editing with Meta MusicGen',
      url: 'https://github.com/NeelKondapalli/neptunev1'
    },
    {
      name: 'Solar',
      description: 'Natural language wallet transactions on the Flare Mainnet with Gemini',
      url: 'https://github.com/NeelKondapalli/solarv1'
    },
    {
      name: 'AITokenize',
      description: 'AI tokenization platform for model monetization',
      url: 'https://github.com/NeelKondapalli/aitokenize'
    }
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
    projects.forEach((project, index) => {
      const fullText = `${project.name} - ${project.description}`;
      setTimeout(() => decodeText(fullText, index), index * 100);
    });
  }, []);

  return (
    <div className="page projects">
      <Navbar />
      <div className="content">
        <div className="project-list">
          {projects.map((project, index) => {
            const fullText = `${project.name} - ${project.description}`;
            const displayText = decodedTexts[index] || " ";
            const [name, ...descParts] = displayText.split(' - ');
            const description = descParts.join(' - ');

            if (displayText == " ") {
              return (
                <div key={index} className="project-item">
                </div>
              )
            }

            return (
              <div key={index} className="project-item">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-name"
                >
                  {name}
                </a>
                <span className="separator"> - </span>
                <span className="project-description">{description}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
