import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Projects.css';

const projectsData = [
  {
    number: '01',
    title: 'Local Autonomous Tool-Use Agent',
    tech: 'Python, Ollama, Llama 3.2',
    year: '2026',
    description:
      'Built a fully local, air-gapped LLM agent with JSON function-calling schema and custom Python tools. The agent autonomously invokes tools, ingests data, and produces structured automation plans.',
    tags: ['Python', 'Ollama', 'Llama 3.2', 'Agentic AI'],
    featured: true,
  },
  {
    number: '02',
    title: 'Integrated Transport Management System',
    tech: 'C++, HTML/CSS/JS',
    year: '2025',
    description:
      'Full-stack transport booking platform with C++ CGI backend handling dynamic input validation, fare calculation, and AJAX-powered seamless booking confirmations.',
    tags: ['C++', 'HTML/CSS', 'JavaScript', 'AJAX'],
    featured: false,
  },
  {
    number: '03',
    title: 'Emoji Detector',
    tech: 'Python, ML',
    year: '2025',
    description:
      'Image classification pipeline to recognize and categorize emojis with preprocessing, feature extraction, and iterative model tuning across multiple emoji classes.',
    tags: ['Python', 'ML', 'Computer Vision'],
    featured: false,
  },
  {
    number: '04',
    title: 'Recipe Book',
    tech: 'React',
    year: '2025',
    description:
      'A recipe management application built with Create React App, featuring optimized production builds and component-based structure.',
    tags: ['React', 'JavaScript', 'CSS'],
    featured: false,
  },
  {
    number: '05',
    title: 'Collaborative Text Editor',
    tech: 'C++',
    year: '2024',
    description:
      'Google Docs-style collaborative editor supporting simultaneous multi-user access with role-based permissions and conflict-free shared document state.',
    tags: ['C++', 'Data Structures', 'Real-time'],
    featured: false,
  },
];

/* ---- Animation variants ---- */
const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ---- 3-D tilt handler ---- */
function handleTilt(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * -8;
  const rotateY = ((x - centerX) / centerX) * 8;
  card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
}

function resetTilt(e) {
  e.currentTarget.style.transform =
    'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
}

/* ---- Component ---- */
export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="section projects-section" ref={ref}>
      {/* Ambient glow */}
      <div className="projects-glow projects-glow--left" />
      <div className="projects-glow projects-glow--right" />

      <div className="container">
        {/* Header */}
        <motion.div
          className="projects-header"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <span className="section-label">03 — Projects</span>
          <h2 className="section-title">
            Things I&rsquo;ve <span className="gradient-text">Built</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="projects-grid"
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projectsData.map((project) => (
            <motion.article
              key={project.number}
              className={`project-card glass-card${
                project.featured ? ' project-card--featured' : ''
              }`}
              variants={cardVariants}
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
            >
              {/* Gradient accent border on featured card */}
              {project.featured && <span className="project-card__accent" />}

              {/* Large faded number */}
              <span className="project-card__number">{project.number}</span>

              <div className="project-card__body">
                <div className="project-card__meta">
                  <span className="project-card__tech">{project.tech}</span>
                  <span className="project-card__year">{project.year}</span>
                </div>

                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>

                <div className="project-card__footer">
                  <ul className="project-card__tags">
                    {project.tags.map((tag) => (
                      <li key={tag} className="project-card__tag">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <span className="project-card__arrow" aria-hidden="true">
                    →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
