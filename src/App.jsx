import { useState, useEffect, Suspense, lazy } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene3D from './components/3d/Scene3D'
import Navbar from './components/ui/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Contact from './components/sections/Contact'
import './App.css'

function LoadingScreen({ isLoading }) {
  return (
    <div className={`loading-screen ${!isLoading ? 'hidden' : ''}`}>
      <div className="loading-logo">
        <span className="loading-logo-accent">R</span>abiya
        <span className="loading-logo-dot">.</span>
      </div>
      <div className="loading-bar-container">
        <div className="loading-bar" />
      </div>
      <div className="loading-text">Loading Experience</div>
    </div>
  )
}

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .glass-card')) {
        setHovering(true)
      } else {
        setHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  // Don't show custom cursor on touch devices
  if ('ontouchstart' in window) return null

  return (
    <>
      <div
        className={`custom-cursor ${hovering ? 'custom-cursor--hover' : ''}`}
        style={{ left: position.x, top: position.y }}
      />
      <div
        className={`custom-cursor-trail ${hovering ? 'custom-cursor-trail--hover' : ''}`}
        style={{ left: position.x, top: position.y }}
      />
    </>
  )
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <CustomCursor />

      {/* 3D Background Canvas */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </div>
    </>
  )
}
