'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Box, Sphere, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

interface MouseState {
  x: number
  y: number
}

// Floating box component
function FloatingBox({
  position,
  rotation,
  scale,
  color,
  speed,
  mouseRef,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  color: string
  speed: number
  mouseRef: React.RefObject<MouseState>
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialPos = useMemo(() => new THREE.Vector3(...position), [position])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime

    // Float animation
    meshRef.current.position.y = initialPos.y + Math.sin(t * speed + position[0]) * 0.3

    // Rotation
    meshRef.current.rotation.x += 0.004 * speed
    meshRef.current.rotation.y += 0.006 * speed

    // Mouse parallax
    if (mouseRef.current) {
      meshRef.current.position.x = initialPos.x + mouseRef.current.x * 0.4
      meshRef.current.position.z = initialPos.z + mouseRef.current.y * 0.2
    }
  })

  return (
    <RoundedBox ref={meshRef} args={[1, 1, 1]} radius={0.1} scale={scale} castShadow>
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.1}
      />
    </RoundedBox>
  )
}

// Van body component
function DeliveryVan({ mouseRef }: { mouseRef: React.RefObject<MouseState> }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    // Gentle float
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.1

    // Mouse tilt
    if (mouseRef.current) {
      groupRef.current.rotation.y = mouseRef.current.x * 0.15
      groupRef.current.rotation.x = mouseRef.current.y * 0.08
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Van body */}
      <RoundedBox args={[3.5, 1.8, 1.6]} radius={0.12} position={[0, 0.9, 0]} castShadow>
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.3} />
      </RoundedBox>

      {/* Cab */}
      <RoundedBox args={[1.2, 1.2, 1.6]} radius={0.1} position={[-1.35, 1.3, 0]} castShadow>
        <meshStandardMaterial color="#f0f0f0" roughness={0.2} metalness={0.3} />
      </RoundedBox>

      {/* Windshield */}
      <Box args={[0.05, 0.8, 1.2]} position={[-1.97, 1.5, 0]}>
        <meshStandardMaterial color="#88ccff" roughness={0.1} metalness={0.5} transparent opacity={0.8} />
      </Box>

      {/* Red stripe */}
      <Box args={[3.5, 0.15, 1.62]} position={[0, 0.15, 0]}>
        <meshStandardMaterial color="#D32F2F" roughness={0.4} />
      </Box>

      {/* Wheels */}
      {[[-1.1, -0.1, 0.9], [1.1, -0.1, 0.9], [-1.1, -0.1, -0.9], [1.1, -0.1, -0.9]].map((pos, i) => (
        <Sphere key={i} args={[0.38, 16, 16]} position={pos as [number, number, number]} castShadow>
          <meshStandardMaterial color="#222222" roughness={0.8} />
        </Sphere>
      ))}

      {/* Rear door (open) */}
      <Box args={[0.05, 1.7, 1.55]} position={[1.76, 0.85, 0]} rotation={[0, -0.5, 0]}>
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.2} />
      </Box>

      {/* Unex logo plate */}
      <Box args={[0.6, 0.25, 0.02]} position={[0.2, 0.9, 0.82]}>
        <meshStandardMaterial color="#D32F2F" roughness={0.4} />
      </Box>
    </group>
  )
}

// Main scene setup
function Scene({ mouseRef }: { mouseRef: React.RefObject<MouseState> }) {
  const { size } = useThree()
  const isMobile = size.width < 768

  const boxes = useMemo(
    () => [
      { position: [2.8, 1.5, -1.2] as [number, number, number], rotation: [0.3, 0.5, 0.2] as [number, number, number], scale: 0.55, color: '#D32F2F', speed: 1.1 },
      { position: [3.5, 2.2, 0.5] as [number, number, number], rotation: [0.1, 0.8, 0.3] as [number, number, number], scale: 0.45, color: '#B71C1C', speed: 0.9 },
      { position: [2.2, 3.0, 1.0] as [number, number, number], rotation: [0.5, 0.2, 0.7] as [number, number, number], scale: 0.65, color: '#EF5350', speed: 1.3 },
      { position: [4.2, 0.8, -0.5] as [number, number, number], rotation: [0.2, 0.9, 0.1] as [number, number, number], scale: 0.4, color: '#ffffff', speed: 0.8 },
      { position: [1.8, 2.8, -1.8] as [number, number, number], rotation: [0.7, 0.3, 0.5] as [number, number, number], scale: 0.5, color: '#D32F2F', speed: 1.2 },
      { position: [3.8, 3.5, -0.8] as [number, number, number], rotation: [0.4, 0.6, 0.2] as [number, number, number], scale: 0.35, color: '#FF8A80', speed: 1.0 },
    ],
    []
  )

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-3, 4, -3]} intensity={0.4} color="#FFE0E0" />
      <pointLight position={[0, 5, 3]} intensity={0.8} color="#ffffff" />

      {/* Van */}
      {!isMobile && <DeliveryVan mouseRef={mouseRef} />}
      {isMobile && (
        <group scale={0.7}>
          <DeliveryVan mouseRef={mouseRef} />
        </group>
      )}

      {/* Flying boxes */}
      {boxes.map((box, i) => (
        <FloatingBox key={i} {...box} mouseRef={mouseRef} />
      ))}
    </>
  )
}

export default function HeroScene() {
  const mouseRef = useRef<MouseState>({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: -((e.clientY - rect.top) / rect.height - 0.5) * 2,
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    const rect = e.currentTarget.getBoundingClientRect()
    mouseRef.current = {
      x: ((touch.clientX - rect.left) / rect.width - 0.5) * 2,
      y: -((touch.clientY - rect.top) / rect.height - 0.5) * 2,
    }
  }

  return (
    <div
      className="absolute inset-0 w-full h-full"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <Scene mouseRef={mouseRef} />
      </Canvas>
    </div>
  )
}
