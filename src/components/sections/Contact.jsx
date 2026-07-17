import { motion } from 'framer-motion'
import { FaGithub, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa'
import './Contact.css'

const education = [
  {
    school: 'Information Technology University',
    degree: 'BS Artificial Intelligence',
    period: 'Sep 2023 – May 2027',
    location: 'Lahore',
  },
  {
    school: 'Kinnaird College',
    degree: 'Intermediate (ICS) – 89%',
    period: '2021 – 2023',
    location: 'Lahore',
  },
]

const leadership = [
  {
    org: 'EMS ITU',
    role: 'Vice President',
    year: '2025',
  },
  {
    org: 'GDG ITU – CodeRush',
    role: 'Decor Head',
    year: '2025',
  },
]

const contactLinks = [
  { icon: FaEnvelope, label: 'Email', value: 'rabiyyatahir@gmail.com', href: 'mailto:rabiyyatahir@gmail.com' },
  { icon: FaLinkedinIn, label: 'LinkedIn', value: 'linkedin.com/in/rabiya-tahir', href: 'https://linkedin.com/in/rabiya-tahir' },
  { icon: FaGithub, label: 'GitHub', value: 'github.com/rabiya43', href: 'https://github.com/rabiya43' },
  { icon: FaMapMarkerAlt, label: 'Location', value: 'Lahore, Pakistan', href: null },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Contact() {
  return (
    <>
      {/* Education Section */}
      <section className="section education" id="education">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">05 — Education</div>
            <h2 className="section-title">
              Academic <span className="gradient-text">Journey</span>
            </h2>
          </motion.div>

          <motion.div
            className="education__cards"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {education.map((edu) => (
              <motion.div key={edu.school} className="education__card glass-card" variants={itemVariants}>
                <div className="education__card-accent" />
                <h3 className="education__school">{edu.school}</h3>
                <p className="education__degree">{edu.degree}</p>
                <div className="education__meta">
                  <span>{edu.period}</span>
                  <span>{edu.location}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="section leadership">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">06 — Leadership</div>
            <h2 className="section-title">
              Beyond <span className="gradient-text">Code</span>
            </h2>
          </motion.div>

          <motion.div
            className="leadership__cards"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {leadership.map((item) => (
              <motion.div key={item.org} className="leadership__card glass-card" variants={itemVariants}>
                <div className="leadership__card-icon">
                  <FaHeart />
                </div>
                <h3 className="leadership__org">{item.org}</h3>
                <p className="leadership__role">{item.role}</p>
                <span className="leadership__year">{item.year}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact" id="contact">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-label">07 — Contact</div>
            <h2 className="section-title">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="contact__subtitle">
              Have an interesting project or opportunity? I'd love to hear from you.
            </p>
          </motion.div>

          <motion.div
            className="contact__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="contact__info" variants={itemVariants}>
              <div className="contact__links">
                {contactLinks.map((link) => (
                  <motion.div
                    key={link.label}
                    className="contact__link-item glass-card"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="contact__link-icon">
                      <link.icon />
                    </div>
                    <div className="contact__link-text">
                      <span className="contact__link-label">{link.label}</span>
                      {link.href ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="contact__link-value">
                          {link.value}
                        </a>
                      ) : (
                        <span className="contact__link-value">{link.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div className="contact__cta-card glass-card" variants={itemVariants}>
              <h3 className="contact__cta-title">Ready to collaborate?</h3>
              <p className="contact__cta-text">
                Whether it's an AI research project, an LLM system design challenge, or just a chat about the latest in ML —
                I'm always open to new conversations.
              </p>
              <a href="mailto:rabiyyatahir@gmail.com" className="contact__cta-button">
                Say Hello <span>→</span>
              </a>
              <div className="contact__social-row">
                <a href="https://github.com/rabiya43" target="_blank" rel="noopener noreferrer" className="contact__social-link">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com/in/rabiya-tahir" target="_blank" rel="noopener noreferrer" className="contact__social-link">
                  <FaLinkedinIn />
                </a>
                <a href="mailto:rabiyyatahir@gmail.com" className="contact__social-link">
                  <FaEnvelope />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="glow-dot" style={{ top: '20%', right: '5%', opacity: 0.2 }} />
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer__inner">
            <p className="footer__text">
              Designed & Built by <span className="gradient-text">Rabiya Tahir</span>
            </p>
            <p className="footer__copyright">© 2026 All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </>
  )
}
