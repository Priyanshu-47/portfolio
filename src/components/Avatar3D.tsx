import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment, ContactShadows, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/* ---------------------------------------------------------------------------
   Scroll context — lightweight provider so the 3D scene can read scroll
--------------------------------------------------------------------------- */
type ScrollState = { progress: number; section: string }

const DEFAULT_SCROLL: ScrollState = { progress: 0, section: 'home' }

let _scrollListeners: ((s: ScrollState) => void)[] = []
let _currentScroll = DEFAULT_SCROLL

if (typeof window !== 'undefined') {
  const sections = ['home', 'about', 'stack', 'experience', 'projects', 'skills', 'credentials', 'contact']

  const tick = () => {
    const y = window.scrollY
    const max = document.documentElement.scrollHeight - window.innerHeight
    const progress = max > 0 ? Math.min(y / max, 1) : 0

    let section = sections[0]
    for (const id of sections) {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top <= 120) section = id
    }

    _currentScroll = { progress, section }
    for (const fn of _scrollListeners) fn(_currentScroll)
  }

  window.addEventListener('scroll', tick, { passive: true })
  tick()
}

function useScrollState(): ScrollState {
  const [state, setState] = useState(_currentScroll)
  useEffect(() => {
    _scrollListeners.push(setState)
    return () => { _scrollListeners = _scrollListeners.filter((f) => f !== setState) }
  }, [])
  return state
}

/* ---------------------------------------------------------------------------
   3D Character — procedural developer avatar built from primitives
--------------------------------------------------------------------------- */
const PASTEL = {
  skin: new THREE.Color('#f5d6b8'),
  hair: new THREE.Color('#3c3025'),
  shirt: new THREE.Color('#9a86cf'),
  shirtDark: new THREE.Color('#7a6ab8'),
  pants: new THREE.Color('#5b6a78'),
  shoe: new THREE.Color('#3c4a57'),
  eye: new THREE.Color('#2c3640'),
  mouth: new THREE.Color('#c98070'),
  glow: new THREE.Color('#b8a4e8'),
}

function Eye({ side }: { side: 'left' | 'right' }) {
  const x = side === 'left' ? -0.12 : 0.12
  return (
    <group position={[x, 0.12, 0.42]}>
      <mesh>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color={PASTEL.eye} />
      </mesh>
      <mesh position={[0.008, 0.008, 0.045]}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  )
}

function Mouth({ speaking }: { speaking: boolean }) {
  return (
    <group position={[0, -0.06, 0.42]}>
      <mesh>
        <boxGeometry args={[0.1, speaking ? 0.035 : 0.015, 0.01]} />
        <meshStandardMaterial color={PASTEL.mouth} />
      </mesh>
    </group>
  )
}

function Character({ scroll }: { scroll: ScrollState }) {
  const group = useRef<THREE.Group>(null!)
  const headRef = useRef<THREE.Group>(null!)
  const leftArm = useRef<THREE.Group>(null!)
  const rightArm = useRef<THREE.Group>(null!)

  const isExperience = scroll.section === 'experience'
  const isProjects = scroll.section === 'projects'

  useFrame((_, delta) => {
    if (!group.current) return
    // Subtle scroll-linked rotation
    const targetRotY = THREE.MathUtils.lerp(
      group.current.rotation.y,
      (scroll.progress - 0.5) * 0.6,
      delta * 3
    )
    group.current.rotation.y = targetRotY

    // Head bob
    if (headRef.current) {
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        isExperience ? -0.15 : isProjects ? 0.1 : 0,
        delta * 4
      )
      headRef.current.rotation.z = THREE.MathUtils.lerp(
        headRef.current.rotation.z,
        Math.sin(Date.now() * 0.002) * 0.04,
        delta * 3
      )
    }

    // Arm wave when at top
    const waveAmt = scroll.progress < 0.05 ? Math.sin(Date.now() * 0.004) * 0.3 : 0
    if (rightArm.current) {
      rightArm.current.rotation.x = THREE.MathUtils.lerp(rightArm.current.rotation.x, -0.3 + waveAmt, delta * 4)
      rightArm.current.rotation.z = THREE.MathUtils.lerp(rightArm.current.rotation.z, -0.4, delta * 4)
    }
    if (leftArm.current) {
      leftArm.current.rotation.x = THREE.MathUtils.lerp(leftArm.current.rotation.x, -0.3, delta * 4)
      leftArm.current.rotation.z = THREE.MathUtils.lerp(leftArm.current.rotation.z, 0.4, delta * 4)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={group} position={[0, -0.6, 0]} scale={1.1}>
        {/* Head */}
        <group ref={headRef} position={[0, 0.95, 0]}>
          <RoundedBox args={[0.55, 0.55, 0.5]} radius={0.18} smoothness={4}>
            <meshStandardMaterial color={PASTEL.skin} roughness={0.6} />
          </RoundedBox>
          {/* Hair */}
          <mesh position={[0, 0.18, -0.02]}>
            <sphereGeometry args={[0.32, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            <meshStandardMaterial color={PASTEL.hair} roughness={0.8} />
          </mesh>
          {/* Eyes */}
          <Eye side="left" />
          <Eye side="right" />
          {/* Mouth */}
          <Mouth speaking={isExperience || isProjects} />
          {/* Glasses for about/stack sections */}
          {(scroll.section === 'about' || scroll.section === 'stack') && (
            <group position={[0, 0.12, 0.43]}>
              {/* Left lens */}
              <mesh position={[-0.12, 0, 0]}>
                <torusGeometry args={[0.065, 0.008, 8, 24]} />
                <meshStandardMaterial color={PASTEL.shirt} metalness={0.3} roughness={0.4} />
              </mesh>
              {/* Right lens */}
              <mesh position={[0.12, 0, 0]}>
                <torusGeometry args={[0.065, 0.008, 8, 24]} />
                <meshStandardMaterial color={PASTEL.shirt} metalness={0.3} roughness={0.4} />
              </mesh>
              {/* Bridge */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.06, 0.008, 0.008]} />
                <meshStandardMaterial color={PASTEL.shirt} metalness={0.3} />
              </mesh>
            </group>
          )}
        </group>

        {/* Torso */}
        <RoundedBox args={[0.5, 0.6, 0.3]} radius={0.1} smoothness={2} position={[0, 0.35, 0]}>
          <meshStandardMaterial color={PASTEL.shirt} roughness={0.7} />
        </RoundedBox>

        {/* Left Arm */}
        <group ref={leftArm} position={[-0.35, 0.5, 0]}>
          <RoundedBox args={[0.14, 0.45, 0.14]} radius={0.06} smoothness={2} position={[0, -0.22, 0]}>
            <meshStandardMaterial color={PASTEL.shirt} roughness={0.7} />
          </RoundedBox>
          {/* Hand */}
          <mesh position={[0, -0.48, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color={PASTEL.skin} roughness={0.6} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArm} position={[0.35, 0.5, 0]}>
          <RoundedBox args={[0.14, 0.45, 0.14]} radius={0.06} smoothness={2} position={[0, -0.22, 0]}>
            <meshStandardMaterial color={PASTEL.shirt} roughness={0.7} />
          </RoundedBox>
          <mesh position={[0, -0.48, 0]}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshStandardMaterial color={PASTEL.skin} roughness={0.6} />
          </mesh>
        </group>

        {/* Legs */}
        <group position={[-0.12, -0.15, 0]}>
          <RoundedBox args={[0.16, 0.45, 0.16]} radius={0.06} smoothness={2} position={[0, -0.22, 0]}>
            <meshStandardMaterial color={PASTEL.pants} roughness={0.8} />
          </RoundedBox>
          <mesh position={[0, -0.48, 0.02]}>
            <boxGeometry args={[0.18, 0.08, 0.24]} />
            <meshStandardMaterial color={PASTEL.shoe} roughness={0.9} />
          </mesh>
        </group>
        <group position={[0.12, -0.15, 0]}>
          <RoundedBox args={[0.16, 0.45, 0.16]} radius={0.06} smoothness={2} position={[0, -0.22, 0]}>
            <meshStandardMaterial color={PASTEL.pants} roughness={0.8} />
          </RoundedBox>
          <mesh position={[0, -0.48, 0.02]}>
            <boxGeometry args={[0.18, 0.08, 0.24]} />
            <meshStandardMaterial color={PASTEL.shoe} roughness={0.9} />
          </mesh>
        </group>
      </group>
    </Float>
  )
}

/* ---------------------------------------------------------------------------
   Ground glow ring
--------------------------------------------------------------------------- */
function GlowRing() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += 0.003
    }
  })
  return (
    <mesh ref={ref} position={[0, -0.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.55, 0.015, 8, 64]} />
      <meshStandardMaterial
        color={PASTEL.glow}
        emissive={PASTEL.glow}
        emissiveIntensity={0.6}
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

/* ---------------------------------------------------------------------------
   Scene — sets up lights, camera, and character
--------------------------------------------------------------------------- */
function Scene({ scroll }: { scroll: ScrollState }) {
  const { camera } = useThree()

  useFrame(() => {
    // Gentle camera sway following scroll
    const targetX = (scroll.progress - 0.5) * 0.3
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05)
    camera.lookAt(0, 0.2, 0)
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={1} color="#fff5ee" />
      <directionalLight position={[-2, 3, -2]} intensity={0.4} color="#e9e2fa" />
      <pointLight position={[0, 2, 3]} intensity={0.5} color="#fbe7dc" />
      <Character scroll={scroll} />
      <GlowRing />
      <ContactShadows
        position={[0, -0.72, 0]}
        opacity={0.25}
        scale={3}
        blur={2.5}
        far={2}
        color="#9a86cf"
      />
      <Environment preset="city" environmentIntensity={0.3} />
    </>
  )
}

/* ---------------------------------------------------------------------------
   Avatar3D — the floating 3D canvas pinned bottom-right
--------------------------------------------------------------------------- */
const SECTION_LABELS: Record<string, string> = {
  home: "hi, I'm Priyanshu",
  about: 'full-stack engineer',
  stack: '.NET · React · AWS · Python',
  experience: 'shipping enterprise apps',
  projects: 'metrics trending up',
  skills: 'cloud-native toolkit',
  credentials: 'certified & award-winning',
  contact: "let's build something",
}

export function Avatar3D() {
  const scroll = useScrollState()
  const reduced = useReducedMotion()
  const goTop = () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-40 hidden select-none items-end gap-3 sm:flex"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      {/* Caption label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scroll.section}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.25 }}
          className="glass-soft mb-1 rounded-2xl rounded-br-sm px-3 py-1.5 text-xs font-medium text-ink"
        >
          {SECTION_LABELS[scroll.section] ?? SECTION_LABELS.home}
        </motion.div>
      </AnimatePresence>

      {/* 3D Canvas */}
      <button type="button" onClick={goTop} aria-label="Back to top" className="relative">
        <div className="h-[120px] w-[120px] rounded-2xl border border-white/30 bg-white/20 shadow-lg shadow-lavender-deep/20 backdrop-blur-md">
          <Canvas
            camera={{ position: [0, 0.5, 2.8], fov: 35 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <Scene scroll={scroll} />
          </Canvas>
        </div>
        {/* Online dot */}
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-sage-deep ring-2 ring-white/70" />
      </button>
    </motion.div>
  )
}
