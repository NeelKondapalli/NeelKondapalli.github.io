// @ts-nocheck
import { useState } from 'react';
import AsciiVideo from '../components/rune/AsciiVideo';
import AsciiVideoJsonl from '../components/rune/AsciiVideoJsonl';
import AsciiImageJsonl from '../components/rune/AsciiImageJsonl';
import ThemeToggle from '../components/ThemeToggle';
import InvertModeToggle from '../components/InvertModeToggle';
import './Home.css';

const Home = () => {
  const [videoInvertMode, setVideoInvertMode] = useState(1);
  const projects = [
    {
      name: 'Rune',
      description: 'C++ video/image to ascii art converter',
      url: 'https://github.com/NeelKondapalli/rune'
    },
    {
      name: 'Sure',
      description: 'Critize X posts based on prior research',
      url: 'https://github.com/NeelKondapalli/sure'
    },
    {
      name: 'Neptune',
      description: 'Music creation & editing with Meta MusicGen',
      url: 'https://github.com/NeelKondapalli/neptunev1'
    },
    {
      name: 'Solar',
      description: 'Agentic wallet interactions on the Flare Mainnet',
      url: 'https://github.com/NeelKondapalli/solarv1'
    },
    {
      name: 'AITokenize',
      description: 'Tokenization platform for model monetization',
      url: 'https://github.com/NeelKondapalli/aitokenize'
    }
  ];

  const experiences = [
    {
      company: 'Cubist Systematic Strategies',
      role: 'Incoming Quant Developer Intern',
      url: 'https://point72.com/cubist/',
      asciiPath: '/logos/p72',
      fontSize: 2,
      offsetX: -245,
      invertMode: 2
    },
    {
      company: 'Tower Research Capital',
      role: 'Software Engineer Intern',
      url: 'https://tower-research.com/',
      asciiPath: '/logos/tower',
      fontSize: 2,
      offsetX: -245,
      invertMode: 2
    },
    {
      company: 'Berkeley Skydeck',
      role: 'Software Engineer Intern',
      url: 'https://skydeck.berkeley.edu/',
      asciiPath: '/logos/skydeck',
      fontSize: 3,
      offsetX: -260,
      invertMode: 2
    },
    {
      company: 'TetraScience',
      role: 'Machine Learning Intern',
      url: 'https://www.tetrascience.com/',
      asciiPath: '/logos/tetra',
      fontSize: 3,
      offsetX: -270,
      invertMode: 2
    },
  ];

  const handleInvertModeToggle = () => {
    setVideoInvertMode((prev) => (prev + 1) % 3);
  };

  return (
    <div className="home">
      <ThemeToggle />
      {/* <InvertModeToggle invertMode={videoInvertMode} onToggle={handleInvertModeToggle} /> */}
      <br/>
      <div className="video-container">
        {/* <AsciiVideo framesPath="/horse" /> */}
        <AsciiVideoJsonl framesPath="/horse_simple" preferGzip={true} invertMode={videoInvertMode} />
      </div>

      <div className="content">
        <h1>Hi, I'm Neel</h1>
        <p className="tagline">
          I'm an EECS student at Berkeley interested in performant computing, infrastructure, and distributed 
          systems
        </p>

        <section className="section">
          <h2>Experience</h2>
          <div className="list">
            {experiences.map((exp, index) => (
              <div key={index} className="list-item-with-hover">
                 {/* {exp.asciiPath && (
                  <div
                    className="ascii-hover-image"
                    style={{
                      transform: `translateX(${exp.offsetX || 0}px)`
                    }}
                  >
                    <AsciiImageJsonl
                      framesPath={exp.asciiPath}
                      preferGzip={true}
                      fontSize={exp.fontSize}
                      invertMode={exp.invertMode || 0}
                    />
                  </div>
                )} */}
                <div className="list-item">
                  <a className="company" href={exp.url} target="_blank" rel="noopener noreferrer ">
                    <span className="company">{exp.company}</span>
                  </a>
                  <span> - {exp.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2>Projects</h2>
          <div className="list">
            {projects.map((project, index) => (
              <div key={index} className="list-item">
                <a className = "project" href={project.url} target="_blank" rel="noopener noreferrer">
                <span className="project">{project.name}</span>
                </a>
                <span> - {project.description}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section socials">
          <a href="mailto:neel_kondapalli@berkeley.edu">Email</a>
          <a href="https://x.com/neelkon" target="_blank" rel="noopener noreferrer">X</a>
          <a href="https://linkedin.com/in/neel-kondapalli" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/NeelKondapalli" target="_blank" rel="noopener noreferrer">GitHub</a>
        </section>
      </div>
    </div>
  );
};

export default Home;
