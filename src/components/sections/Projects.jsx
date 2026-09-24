import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Projects.css';

const projectsData = [
  {
    number: '01',
    title: 'Visual Prompt Injection Defense for Vision-Language Models',
    tech: 'Python, PyTorch, FastAPI, Docker',
    year: 'Ongoing FYP, 2026 – 2027',
    description: 'Final year project: a guardrail that screens screenshots for hidden or injected instructions before they reach a vision-language agent, preventing attackers from hijacking agent actions via manipulated images. Built a Layer 1 anomaly detector (ResNet50 patch embeddings + PatchCore memory bank, CVPR 2022) evaluated on 800 benign and 510 attack screenshots across 4 datasets, reaching a 55.83% detection rate at 10% FPR, a 200x gain over an FFT baseline (0.28%).',
    tags: ['Python', 'PyTorch', 'FastAPI', 'Docker', 'FYP'],
    featured: true,
  },
  {
    number: '02',
    title: 'Local Autonomous Tool-Use Agent',
    tech: 'Python, Ollama, Llama 3.2',
    year: '2026',
    description: 'Deployed a fully local, air-gapped LLM agent via Ollama (3B model), eliminating external API dependency. Built a multi-turn agent loop with custom JSON function-calling to autonomously generate 4-step automation plans, removing a manual data-entry bottleneck.',
    tags: ['Python', 'Ollama', 'Llama 3.2', 'Agentic AI'],
    featured: false,
  },
  {
    number: '03',
    title: 'Prompt Injection Guardrail',
    tech: 'Python, FastAPI, React, Docker',
    year: '2026',
    description: 'Built a full-stack guardrail layer that sits between an LLM agent and external content, using a dual-layer FastAPI pipeline (heuristics + LLM judge) to detect prompt injection attempts before they reach the agent’s context window. Includes an eval dashboard computing precision, recall, and F1 against synthetic attack vectors, containerized with Docker and CI/CD via GitHub Actions.',
    tags: ['Python', 'FastAPI', 'React', 'Docker', 'LLM Guardrail'],
    featured: false,
    link: 'https://github.com/rabiya43/Prompt-injection-guardrail',
  },
  {
    number: '04',
    title: 'Emoji Detector',
    tech: 'Python, ML',
    year: '2025',
    description: 'Image classification pipeline to recognize and categorize emojis with preprocessing, feature extraction, and iterative model tuning across multiple emoji classes.',
    tags: ['Python', 'ML', 'Computer Vision'],
    featured: false,
    link: 'https://github.com/Rizwan-0905/EmojiDetector',
  },
  {
    number: '05',
    title: 'Recipe Book',
    tech: 'React',
    year: '2025',
    description: 'A recipe management application built with Create React App, featuring optimized production builds and component-based structure.',
    tags: ['React', 'JavaScript', 'CSS'],
    featured: false,
    link: 'https://github.com/rabiya43/recipe-book',
  },
  {
    number: '06',
    title: 'XAI Medical Decision Support System',
    tech: 'Python, scikit-learn, SHAP, FastAPI, Streamlit',
    year: '2026',
    description: 'Explainable AI system on Heart Disease and Adult Income datasets; trained 4 models with SHAP for global/local prediction explanations. Led a fairness analysis auditing demographic parity, equal opportunity, and disparate impact across sex and age groups; served via FastAPI + Streamlit.',
    tags: ['Python', 'scikit-learn', 'SHAP', 'FastAPI', 'Streamlit'],
    featured: false,
    link: 'https://github.com/1amIbrahim/XAI',
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
          {projectsData.map((project) => {
            const CardWrapper = project.link ? motion.a : motion.article;
            const extraProps = project.link
              ? { href: project.link, target: '_blank', rel: 'noopener noreferrer', style: { display: 'block', textDecoration: 'none', color: 'inherit' } }
              : { style: { display: 'block', textDecoration: 'none', color: 'inherit' } };

            return (
              <CardWrapper
                key={project.number}
                className={`project-card glass-card${
                  project.featured ? ' project-card--featured' : ''
                }`}
                variants={cardVariants}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                {...extraProps}
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

                    {project.link && (
                      <span className="project-card__link">
                        View on GitHub
                        <span className="project-card__arrow" aria-hidden="true">
                          ↗
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </CardWrapper>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
