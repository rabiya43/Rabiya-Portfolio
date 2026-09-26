# Rabiya Tahir — AI Engineer Portfolio

A personal portfolio built with React and Vite, with a 3D animated background, frosted-glass cards and a layout that works on any screen size.

**Live site:** [rabiya-portfolio-silk.vercel.app](https://rabiya-portfolio-silk.vercel.app/)

---

## Features

- **3D background**: floating shapes and particles drawn with three.js (React Three Fiber)
- **Tilting profile card**: the hero photo follows the mouse (Framer Motion)
- **Typewriter subtitle** in the hero section
- **Experience timeline** with cards alternating left and right
- **Project cards** that link to GitHub where the code is public
- **Skills grid** of languages, AI and ML tools, and frameworks
- **Resume** that opens in a new tab
- **Scroll animations** as each section comes into view
- **Responsive** on mobile, tablet and desktop
- **Dark theme** in a purple and rose palette

---

## Tech stack

| Category | Technology |
|---|---|
| Framework | React 18 + Vite |
| Animations | Framer Motion |
| 3D graphics | three.js with @react-three/fiber and @react-three/drei |
| Icons | react-icons |
| Styling | Plain CSS |
| Hosting | Vercel |

---

## Project structure

```
Rabiya-Portfolio/
├── resume/
│   └── Rabiya_Tahir_Resume.tex   # the resume's source (npm run resume builds the PDF)
├── scripts/build-resume.mjs
├── public/
│   ├── Rabiya_Tahir_Resume.pdf   # the resume the site links to
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/images/            # profile photos
│   ├── components/
│   │   ├── 3d/                   # Scene3D: the animated background
│   │   ├── sections/             # Hero, About, Experience, Projects, Skills, Contact
│   │   └── ui/                   # Navbar
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── vite.config.js
```

---

## Getting started

Requires Node.js 18 or later.

```bash
git clone https://github.com/rabiya43/Rabiya-Portfolio.git
cd Rabiya-Portfolio
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

To build for production:

```bash
npm run build
```

---

## Updating the resume

The resume is written in LaTeX: `resume/Rabiya_Tahir_Resume.tex` is the only file to edit.

```bash
npm run resume
```

This builds the PDF with [Tectonic](https://tectonic-typesetting.github.io) and saves it as `public/Rabiya_Tahir_Resume.pdf`, which the site's resume button opens. It also copies the PDF to any folders listed in `resume/copy-targets.json` (a file on your own computer, not in git; see `copy-targets.example.json`). Commit and push `public/` to update the live site.

The `.tex` also works in Overleaf with pdfLaTeX.

---

## Sections

| Section | What's in it |
|---|---|
| **Hero** | Name, typewriter subtitle, links, 3D tilting portrait |
| **About** | Bio and highlights: years coding, AI projects, final-year project (VLM security), ML competition result, DBMS teaching assistant |
| **Experience** | Turing (via Swift Solutions), GDG ITU CodeRush 2026, Teaching Assistant at ITU, GDG ITU, EMS ITU |
| **Projects** | Visual Prompt Injection Defense for Vision-Language Models (FYP), Local Autonomous Tool-Use Agent, Prompt Injection Guardrail, Emoji Detector, Recipe Book, XAI Medical Decision Support System |
| **Skills** | Languages, AI and ML tools, frameworks |
| **Contact** | Email, GitHub and LinkedIn |

---

## Contact

- **Email:** rabiyyatahir@gmail.com
- **LinkedIn:** [linkedin.com/in/rabiya-tahir](https://linkedin.com/in/rabiya-tahir)
- **GitHub:** [github.com/rabiya43](https://github.com/rabiya43)

---

Designed and built by Rabiya Tahir, 2026.
