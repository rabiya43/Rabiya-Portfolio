import { motion } from 'framer-motion'
import { FaPython, FaReact, FaGitAlt, FaDatabase } from 'react-icons/fa'
import { SiPytorch, SiJavascript, SiCplusplus, SiMysql, SiPostman } from 'react-icons/si'
import './Skills.css'

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'Python', icon: FaPython, level: 95 },
      { name: 'C/C++', icon: SiCplusplus, level: 85 },
      { name: 'JavaScript', icon: SiJavascript, level: 80 },
      { name: 'SQL', icon: FaDatabase, level: 88 },
    ],
  },
  {
    title: 'AI & ML',
    skills: [
      { name: 'Machine Learning', level: 90 },
      { name: 'NLP', level: 85 },
      { name: 'LLMs & RLHF', level: 92 },
      { name: 'Agentic Systems', level: 88 },
      { name: 'Model Evaluation', level: 90 },
      { name: 'Function Calling', level: 85 },
    ],
  },
  {
    title: 'Tools & Frameworks',
    skills: [
      { name: 'PyTorch', icon: SiPytorch, level: 85 },
      { name: 'HuggingFace', level: 82 },
      { name: 'Ollama', level: 88 },
      { name: 'REST APIs', level: 85 },
      { name: 'Postman', icon: SiPostman, level: 80 },
      { name: 'MySQL', icon: SiMysql, level: 85 },
      { name: 'Git', icon: FaGitAlt, level: 88 },
      { name: 'React', icon: FaReact, level: 78 },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

const barVariants = {
  hidden: { width: 0 },
  visible: (level) => ({
    width: `${level}%`,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  }),
}

export default function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">04 — Skills</div>
          <h2 className="section-title">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
        </motion.div>

        <motion.div
          className="skills__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              className="skills__category glass-card"
              variants={cardVariants}
            >
              <h3 className="skills__category-title">
                <span className="skills__category-number">0{catIdx + 1}</span>
                {category.title}
              </h3>
              <div className="skills__list">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skills__item">
                    <div className="skills__item-header">
                      <div className="skills__item-name">
                        {skill.icon && <skill.icon className="skills__item-icon" />}
                        {skill.name}
                      </div>
                      <span className="skills__item-level">{skill.level}%</span>
                    </div>
                    <div className="skills__bar-track">
                      <motion.div
                        className="skills__bar-fill"
                        variants={barVariants}
                        custom={skill.level}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="glow-dot" style={{ bottom: '10%', left: '5%', opacity: 0.3 }} />
    </section>
  )
}
