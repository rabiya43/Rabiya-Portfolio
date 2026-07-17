import { motion } from 'framer-motion';
import aboutImg from '../../assets/images/profile-about.jpg';
import './About.css';

const stats = [
  { value: '3+', label: 'Years Coding' },
  { value: '5+', label: 'AI Projects' },
  { value: '3rd', label: 'ML Competition' },
  { value: 'TA', label: 'DBMS Course' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <motion.div
          className="about__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* ---- Text Column ---- */}
          <div className="about__text-col">
            <motion.span className="section-label" variants={fadeUp}>
              01 — About Me
            </motion.span>

            <motion.h2 className="section-title" variants={fadeUp}>
              Crafting AI Systems{' '}
              <span className="gradient-text">That Matter</span>
            </motion.h2>

            <motion.p className="about__bio" variants={fadeUp}>
              AI undergraduate at Information Technology University, Lahore with
              hands-on experience in LLM evaluation, RLHF pipelines, and
              agent-based system design. I build domain-specific frameworks
              involving policy definition, tool development, and database schema
              design for structured LLM task execution.
            </motion.p>

            <motion.p className="about__bio about__bio--secondary" variants={fadeUp}>
              From designing fully local tool-augmented agents using open-weight
              models to contributing to RLHF pipelines at Turing, I&rsquo;m
              passionate about scalable LLM systems, model reliability, and
              applied AI engineering.
            </motion.p>

            {/* ---- Stats Row ---- */}
            <motion.div
              className="about__stats"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  className="about__stat glass-card"
                  key={i}
                  variants={statVariants}
                  whileHover={{
                    y: -6,
                    boxShadow: '0 0 32px rgba(232,160,191,0.25)',
                  }}
                >
                  <span className="about__stat-value">{stat.value}</span>
                  <span className="about__stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ---- Photo Column ---- */}
          <motion.div className="about__photo-col" variants={fadeLeft}>
            {/* Decorative gradient blob */}
            <div className="about__blob" aria-hidden="true" />

            <div className="about__photo-frame">
              <div className="about__photo-inner">
                <img
                  src={aboutImg}
                  alt="Rabiya Tahir — AI Engineer"
                  className="about__photo"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Corner decorations */}
            <span className="about__corner about__corner--tl" aria-hidden="true" />
            <span className="about__corner about__corner--br" aria-hidden="true" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
