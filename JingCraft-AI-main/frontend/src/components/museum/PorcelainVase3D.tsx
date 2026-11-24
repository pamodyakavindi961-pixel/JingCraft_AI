
import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

interface PorcelainVase3DProps {
  artifactName: string
}

function PorcelainVase() {
  const groupRef = useRef<THREE.Group>(null)

  // Create the vase geometry once to avoid unnecessary recalculations.
  const vaseGeometry = useMemo(() => {
    const points = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.48, 0),
      new THREE.Vector2(0.68, 0.08),
      new THREE.Vector2(0.78, 0.28),
      new THREE.Vector2(0.82, 0.58),
      new THREE.Vector2(0.76, 0.95),
      new THREE.Vector2(0.62, 1.25),
      new THREE.Vector2(0.43, 1.52),
      new THREE.Vector2(0.34, 1.82),
      new THREE.Vector2(0.34, 2.12),
      new THREE.Vector2(0.43, 2.14),
      new THREE.Vector2(0.43, 2.22),
      new THREE.Vector2(0.28, 2.25),
      new THREE.Vector2(0.28, 2.12),
    ]

    return new THREE.LatheGeometry(points, 96)
  }, [])

  // Apply a subtle floating animation while keeping the vase centered.
  useFrame((state) => {
    if (!groupRef.current) return

    groupRef.current.position.y =
      -1.3 + Math.sin(state.clock.elapsedTime * 0.8) * 0.025
  })

  return (
    <group ref={groupRef} position={[0, -1.3, 0]}>
      {/* Main porcelain body */}
      <mesh geometry={vaseGeometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#F5F7F5"
          roughness={0.2}
          metalness={0}
          clearcoat={0.8}
          clearcoatRoughness={0.15}
        />
      </mesh>

      {/* Traditional cobalt-blue decorative bands */}
      {[0.32, 0.52, 1.12, 1.38].map((height, index) => (
        <mesh
          key={height}
          position={[0, height, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry
            args={[
              index === 2 ? 0.66 : index === 3 ? 0.55 : 0.78,
              0.012,
              8,
              96,
            ]}
          />
          <meshStandardMaterial color="#193C67" roughness={0.35} />
        </mesh>
      ))}

      {/* Blue floral-inspired ornamental decoration */}
      <group position={[0, 0.95, 0]}>
        {[0, 1, 2, 3, 4].map((index) => (
          <mesh
            key={index}
            position={[0, 0.12, 0.755]}
            rotation={[0, 0, (Math.PI * 2 * index) / 5]}
          >
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial color="#193C67" roughness={0.4} />
          </mesh>
        ))}

        <mesh position={[0, 0.12, 0.77]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color="#B69A62" />
        </mesh>
      </group>

      {/* Porcelain rim detail */}
      <mesh position={[0, 1.13, 0]}>
        <torusGeometry args={[0.36, 0.035, 12, 64]} />
        <meshStandardMaterial color="#DCE6E9" roughness={0.2} />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      {/* Museum-style lighting */}
      <ambientLight intensity={1.1} />

      <directionalLight
        position={[4, 6, 5]}
        intensity={2}
        castShadow
      />

      <pointLight
        position={[-4, 2, -3]}
        intensity={1.2}
        color="#B9D1E5"
      />

      <PorcelainVase />

      {/* Ground shadow beneath the artifact */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.32, 0]}
        receiveShadow
      >
        <circleGeometry args={[2, 64]} />
        <shadowMaterial opacity={0.14} />
      </mesh>

      {/* Interactive camera controls */}
      <OrbitControls
        target={[0, -0.15, 0]}
        enablePan={false}
        enableZoom
        minDistance={3.5}
        maxDistance={8}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
        autoRotate
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.06}
      />
    </>
  )
}

function PorcelainVase3D({ artifactName }: PorcelainVase3DProps) {
  return (
    <div className="relative h-[360px] w-full overflow-hidden sm:h-[460px] lg:h-[540px]">
      <Canvas
        camera={{
          position: [4, 2.2, 5],
          fov: 38,
        }}
        dpr={[1, 1.5]}
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Scene />
      </Canvas>

      {/* Both labels share one responsive row to prevent mobile overlap. */}
      <div className="pointer-events-none absolute inset-x-3 bottom-4 z-10 flex items-center justify-between gap-2 sm:inset-x-7 sm:bottom-7 sm:gap-4">
        {/* Interaction instructions */}
        <div className="min-w-0 rounded-full border border-white/70 bg-white/85 px-2.5 py-2 text-[8px] font-semibold tracking-wide text-[#193C67] shadow-sm backdrop-blur-md sm:px-5 sm:py-3 sm:text-xs">
          <span className="sm:hidden">DRAG · ZOOM</span>
          <span className="hidden sm:inline">
            DRAG TO ROTATE · SCROLL TO ZOOM
          </span>
        </div>

        {/* Translated artifact name */}
        <div className="min-w-0 max-w-[48%] truncate rounded-full border border-white/70 bg-white/85 px-3 py-2 text-[9px] font-medium text-[#193C67] shadow-sm backdrop-blur-md sm:max-w-none sm:px-5 sm:py-3 sm:text-xs">
          {artifactName}
        </div>
      </div>
    </div>
  )
}

export default PorcelainVase3D
