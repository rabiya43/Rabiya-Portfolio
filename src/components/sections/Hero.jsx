import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import profileImg from '../../assets/images/profile-hero.jpg';
import './Hero.css';

/* ── animation helpers ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const photoVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -6 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 },
  },
};

const scrollIndicatorVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 2.2, duration: 0.8 },
  },
};

/* ── typewriter hook ── */
const useTypewriter = (text, speed = 60, startDelay = 1400) => {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(delayTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, started, text, speed]);

  return displayed;
};

/* ── component ── */
const Hero = () => {
  const subtitle = useTypewriter(
    'AI Engineer  •  LLM Systems Developer  •  ML Researcher',
    55,
    1600,
  );

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // 3D tilt effect
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="home" className="hero-section">
      {/* ambient glow blobs */}
      <div className="hero-glow hero-glow--left" />
      <div className="hero-glow hero-glow--right" />

      <div className="container hero-container">
        {/* ── text column ── */}
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="hero-greeting" variants={childVariants}>
            Hello, I'm
          </motion.p>

          <motion.h1 className="hero-name" variants={childVariants}>
            <span className="hero-name__text gradient-text">Rabiya Tahir</span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={childVariants}>
            <span className="hero-subtitle__typed">{subtitle}</span>
            <span className="hero-subtitle__cursor" aria-hidden="true">
              |
            </span>
          </motion.p>

          <motion.p className="hero-tagline" variants={childVariants}>
            Building intelligent systems that bridge the gap between AI research
            and real-world applications
          </motion.p>

          {/* CTA buttons */}
          <motion.div className="hero-cta" variants={childVariants}>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => handleScrollTo('projects')}
            >
              <span className="btn__shimmer" />
              View My Work
            </button>

            <a
              href="/Rabiya_Tahir_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
            >
              Download Resume
            </a>
          </motion.div>

          {/* social links */}
          <motion.div className="hero-socials" variants={childVariants}>
            <a
              href="https://github.com/rabiya43"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-socials__link"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/rabiya-tahir"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-socials__link"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="mailto:rabiyyatahir@gmail.com"
              className="hero-socials__link"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          </motion.div>
        </motion.div>

        {/* ── photo column ── */}
        <motion.div
          className="hero-photo-wrapper"
          variants={photoVariants}
          initial="hidden"
          animate="visible"
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className="hero-photo-frame glass-card"
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          >
            <div className="hero-photo-inner">
              <img
                src={profileImg}
                alt="Rabiya Tahir — AI Engineer"
                className="hero-photo"
              />
            </div>
            {/* floating badge */}
            <div className="hero-photo-badge">
              <span className="hero-photo-badge__dot" />
              <span className="hero-photo-badge__text">Available for opportunities</span>
            </div>
            {/* corner accent glow */}
            <div className="hero-photo-accent" />
          </motion.div>

          {/* soft glow behind photo */}
          <div className="hero-photo-glow" />
        </motion.div>
      </div>

      {/* ── scroll indicator ── */}
      <motion.div
        className="hero-scroll"
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate="visible"
        onClick={() => handleScrollTo('about')}
        role="button"
        tabIndex={0}
        aria-label="Scroll to next section"
      >
        <span className="hero-scroll__label">Scroll</span>
        <span className="hero-scroll__line" />
        <motion.span
          className="hero-scroll__arrow"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
};

export default Hero;
