import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Experience.css';

/* ── Experience Data ── */
const experiences = [
  {
    id: 1,
    company: 'Turing (via Swift Solutions)',
    role: 'LLM Trainer (QA)',
    date: 'Oct 2024 – Present',
    location: 'Remote',
    details: [
      'AI Trainer: Evaluated LLM code generation for logical consistency, security compliance, and task accuracy; contributed to RLHF pipelines',
      'Prompt Engineer (Anthropic): Executed and analyzed prompt-response cycles using GitHub-based tooling',
      'LLM Systems Developer: Designed domain-specific interaction frameworks for LLM agents including policies, tools/APIs, database schema',
      'Data Annotator (Meta): Annotated structured video datasets for LLM training pipelines',
      'Agent Evaluator (Meta – CUA): Evaluated computer-use agents for real-world task execution',
    ],
  },
  {
    id: 2,
    company: 'GDG ITU – CodeRush 2026',
    role: 'ML Competition – 3rd Place',
    date: '2026',
    location: 'Lahore',
    details: [
      'Built economic class classifier using LightGBM + Random Forest ensemble with threshold tuning',
      'Macro F1: 0.7325, Middle F1: 0.7050',
      'Engineered 198 bag-level features; improved middle-class recall by +46%',
    ],
  },
  {
    id: 3,
    company: 'Information Technology University',
    role: 'Teaching Assistant – DBMS',
    date: 'Feb 2025 – Jun 2025',
    location: 'Lahore',
    details: [
      'Conducted lab sessions: SQL, relational algebra, normalization, transaction management',
      'Graded assignments and provided one-on-one academic support',
    ],
  },
];

/* ── Animation Variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25 },
  },
};

const cardVariants = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === 'left' ? -60 : 60,
    y: 30,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

/* ── Timeline Card ── */
function TimelineCard({ experience, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const side = index % 2 === 0 ? 'left' : 'right';

  return (
    <div className={`exp-timeline-item exp-timeline-item--${side}`} ref={ref}>
      {/* Connector dot on the centre line */}
      <motion.div
        className="exp-timeline-dot"
        variants={dotVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <span className="exp-timeline-dot__ping" />
      </motion.div>

      {/* Card */}
      <motion.div
        className="exp-card glass-card"
        custom={side === 'left' ? 'left' : 'right'}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Hover glow element */}
        <div className="exp-card__glow" />

        <div className="exp-card__header">
          <h3 className="exp-card__company gradient-text">{experience.company}</h3>
          <p className="exp-card__role">{experience.role}</p>
          <div className="exp-card__meta">
            <span className="exp-card__date">{experience.date}</span>
            <span className="exp-card__separator">•</span>
            <span className="exp-card__location">{experience.location}</span>
          </div>
        </div>

        <ul className="exp-card__details">
          {experience.details.map((detail, i) => (
            <motion.li
              key={i}
              className="exp-card__detail"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
            >
              <span className="exp-card__bullet" />
              {detail}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

/* ── Experience Section ── */
export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section exp-section" ref={sectionRef}>
      {/* Background glow orbs */}
      <div className="exp-glow exp-glow--left" />
      <div className="exp-glow exp-glow--right" />

      <div className="container">
        {/* Section Header */}
        <motion.div
          className="exp-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">02 — Experience</span>
          <h2 className="section-title">
            Where I've Made <span className="gradient-text">Impact</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="exp-timeline"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Glowing centre line */}
          <div className="exp-timeline-line" />

          {experiences.map((exp, index) => (
            <TimelineCard key={exp.id} experience={exp} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
