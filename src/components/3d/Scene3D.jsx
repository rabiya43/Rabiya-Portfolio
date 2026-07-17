import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingParticles({ count = 200, color = '#E8A0BF' }) {
  const mesh = useRef()
  const light = useRef()

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.002 + Math.random() / 200
      const x = (Math.random() - 0.5) * 50
      const y = (Math.random() - 0.5) * 50
      const z = (Math.random() - 0.5) * 50
      temp.push({ time, factor, speed, x, y, z })
    }
    return temp
  }, [count])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame(() => {
    particles.forEach((particle, i) => {
      let { time, factor, speed, x, y, z } = particle
      time = particle.time += speed
      const s = Math.cos(time) * 0.3 + 0.7
      dummy.position.set(
        x + Math.cos((time / 10) * factor) * 2,
        y + Math.sin((time / 10) * factor) * 2,
        z + Math.sin((time / 10) * factor) * 2
      )
      dummy.scale.set(s * 0.15, s * 0.15, s * 0.15)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.15, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </instancedMesh>
  )
}

function FloatingGem({ position, color, scale = 1, speed = 1 }) {
  const meshRef = useRef()

  useFrame((state) => {
    const time = state.clock.elapsedTime * speed
    meshRef.current.position.y = position[1] + Math.sin(time) * 0.8
    meshRef.current.rotation.x = time * 0.4
    meshRef.current.rotation.y = time * 0.6
    meshRef.current.rotation.z = time * 0.3
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.15}
        emissive={color}
        emissiveIntensity={0.3}
        transparent
        opacity={0.85}
      />
    </mesh>
  )
}

function FloatingTorus({ position, color, scale = 1, speed = 0.5 }) {
  const meshRef = useRef()

  useFrame((state) => {
    const time = state.clock.elapsedTime * speed
    meshRef.current.position.y = position[1] + Math.sin(time * 1.2) * 0.6
    meshRef.current.rotation.x = time * 0.3
    meshRef.current.rotation.y = time * 0.5
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.4, 16, 32]} />
      <meshStandardMaterial
        color={color}
        metalness={0.7}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.2}
        transparent
        opacity={0.75}
      />
    </mesh>
  )
}

function FloatingIcosahedron({ position, color, scale = 1, speed = 0.7 }) {
  const meshRef = useRef()

  useFrame((state) => {
    const time = state.clock.elapsedTime * speed
    meshRef.current.position.y = position[1] + Math.sin(time + 2) * 0.5
    meshRef.current.rotation.x = time * 0.2
    meshRef.current.rotation.z = time * 0.4
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        metalness={0.9}
        roughness={0.1}
        emissive={color}
        emissiveIntensity={0.25}
        transparent
        opacity={0.8}
        wireframe
      />
    </mesh>
  )
}

function GlowSphere({ position, color, scale = 1 }) {
  const meshRef = useRef()

  useFrame((state) => {
    const time = state.clock.elapsedTime
    meshRef.current.scale.setScalar(scale + Math.sin(time * 2) * 0.1)
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}

export default function Scene3D() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#E8A0BF" />
      <pointLight position={[-10, -5, 5]} intensity={0.5} color="#BA90C6" />
      <pointLight position={[5, -10, -10]} intensity={0.4} color="#C683D7" />
      <directionalLight position={[0, 5, 5]} intensity={0.3} color="#FFB6D5" />

      {/* Floating Geometric Shapes */}
      <FloatingGem position={[-6, 3, -5]} color="#E8A0BF" scale={0.8} speed={0.6} />
      <FloatingGem position={[7, -2, -8]} color="#C683D7" scale={0.6} speed={0.8} />
      <FloatingGem position={[-4, -4, -3]} color="#BA90C6" scale={0.5} speed={0.9} />
      <FloatingGem position={[5, 4, -6]} color="#FFB6D5" scale={0.7} speed={0.5} />

      <FloatingTorus position={[8, 2, -10]} color="#E8A0BF" scale={0.5} speed={0.4} />
      <FloatingTorus position={[-8, -3, -7]} color="#DA70D6" scale={0.4} speed={0.6} />

      <FloatingIcosahedron position={[-3, 5, -4]} color="#C683D7" scale={0.9} speed={0.5} />
      <FloatingIcosahedron position={[6, -5, -6]} color="#E8A0BF" scale={0.7} speed={0.7} />

      {/* Glow Spheres */}
      <GlowSphere position={[-5, 0, -8]} color="#E8A0BF" scale={2} />
      <GlowSphere position={[6, 3, -12]} color="#BA90C6" scale={3} />
      <GlowSphere position={[0, -6, -10]} color="#C683D7" scale={2.5} />

      {/* Particles */}
      <FloatingParticles count={150} color="#E8A0BF" />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0D0015', 5, 30]} />
    </>
  )
}
