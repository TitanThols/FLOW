import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function WireframeIcosahedron() {
  const ref = useRef()
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.15
    ref.current.rotation.y += delta * 0.2
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshBasicMaterial color="#00FF66" wireframe opacity={0.25} transparent />
    </mesh>
  )
}

function WireframeTorus() {
  const ref = useRef()
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.1
    ref.current.rotation.z += delta * 0.08
  })
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.8, 0.25, 128, 16]} />
      <meshBasicMaterial color="#00FF66" wireframe opacity={0.12} transparent />
    </mesh>
  )
}

function GridFloor() {
  return (
    <gridHelper
      args={[20, 20, '#1a1a1a', '#111111']}
      position={[0, -2, 0]}
      rotation={[0, 0, 0]}
    />
  )
}

export default function HeroScene({ style, className }) {
  return (
    <div style={{ width: '100%', height: '100%', ...style }} className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <WireframeIcosahedron />
        </Float>
        <WireframeTorus />
        <GridFloor />
      </Canvas>
    </div>
  )
}
