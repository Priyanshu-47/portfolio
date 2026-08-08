import { useEffect, useLayoutEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'

/* ---------------------------------------------------------------------------
   BackgroundFX — a fixed, scroll-reactive layer that sits BEHIND the content
   sections (main is `relative z-10`):
     • five floating 3D solids (RoamingShapes) that roam across the ENTIRE
       viewport while you scroll — and freeze when the page is idle,
     • four blurred pastel orbs that wash vertically on scroll, and
     • a faint structural grid.
   Everything is pointer-events-none, so no content beneath is ever blocked.
--------------------------------------------------------------------------- */

type Orb = {
  color: string
  size: number
  x: number // vw
  y: number // vh
  parallax: number // vh of travel per full scroll
  delay: number
}

const ORBS: Orb[] = [
  { color: 'rgba(223, 234, 221, 0.9)', size: 34, x: 8, y: 6, parallax: 26, delay: 0 },
  { color: 'rgba(233, 226, 250, 0.85)', size: 30, x: 72, y: 20, parallax: -34, delay: 0.5 },
  { color: 'rgba(251, 231, 220, 0.9)', size: 26, x: 40, y: 64, parallax: 22, delay: 1.1 },
  { color: 'rgba(220, 239, 230, 0.85)', size: 38, x: 84, y: 78, parallax: -18, delay: 1.6 },
]

/* ---------------------------------------------------------------------------
   Floating 3D solids. The camera sits at z=6 (fov 40°), so a shape parked at
   depth z spans halfH = (6 - z) * tan(20°) of visible height; pickTarget()
   randomizes inside that frustum (× aspect for width) so a shape can roam to
   any on-screen spot. Motion is driven ONLY by scrolling: shapes chase a
   random target while the visitor scrolls (a new target re-rolls after
   ~90px of cumulative scroll travel, so a nudge moves them a little and a
   long fling sends them sweeping across the viewport), then freeze ~0.35s
   after the last scroll pixel — no idle drift, no idle rotation.
--------------------------------------------------------------------------- */
type Shape = {
  kind: 'icosa' | 'octa' | 'torusKnot' | 'dodeca' | 'torus'
  r: number
  color: string
  speed: number
  zMin: number
  zMax: number
  opacity: number
}

const SHAPES: Shape[] = [
  { kind: 'icosa', r: 0.5, color: '#9a86cf', speed: 0.12, zMin: -3, zMax: -7, opacity: 0.22 },
  { kind: 'octa', r: 0.42, color: '#d98a76', speed: 0.18, zMin: -2.5, zMax: -6.5, opacity: 0.2 },
  { kind: 'torusKnot', r: 0.34, color: '#7a9a72', speed: 0.1, zMin: -3.5, zMax: -8, opacity: 0.24 },
  { kind: 'dodeca', r: 0.5, color: '#b7a8e0', speed: 0.14, zMin: -2.8, zMax: -6.8, opacity: 0.2 },
  { kind: 'torus', r: 0.42, color: '#e3b39b', speed: 0.09, zMin: -3.2, zMax: -7.5, opacity: 0.22 },
]

const CAM_Z = 6
const HALF_TAN = Math.tan((40 * Math.PI) / 180 / 2)

// Motion only happens while the visitor is actually scrolling. Shapes keep
// moving for this many seconds after the last scroll pixel (so they finish
// their path smoothly), then freeze completely — no idle drift, no idle
// rotation. Targets re-roll after this much cumulative scroll travel, never
// more often than RETARGET_MIN_T apart.
const SETTLE = 0.35
const RETARGET_DIST = 90
const RETARGET_MIN_T = 0.5 // tan(fov/2)

function pickTarget(shape: Shape, aspect: number, out: THREE.Vector3) {
  const z = shape.zMin + Math.random() * (shape.zMax - shape.zMin)
  const halfH = (CAM_Z - z) * HALF_TAN
  out.set((Math.random() * 2 - 1) * halfH * aspect * 0.82, (Math.random() * 2 - 1) * halfH * 0.78, z)
}

function RoamingShapes({ reduced }: { reduced: boolean }) {
  const refs = useRef<(THREE.Mesh | null)[]>([])
  const targets = useRef<THREE.Vector3[]>(SHAPES.map(() => new THREE.Vector3()))
  const lastY = useRef(0)
  const lastScrollRef = useRef(-1) // starts "idle" so shapes rest until the first scroll
  const scrollAccum = useRef(0)
  const lastRollRef = useRef(0)
  const moveClock = useRef(0) // only advances while active → rotation freezes cleanly

  // Park each shape at a random full-screen spot on mount — avoids a first
  // paint with everything piled at the origin, and reduced-motion users still
  // get a spread layout (just without the drift).
  useLayoutEffect(() => {
    SHAPES.forEach((s, i) => {
      const m = refs.current[i]
      if (!m) return
      pickTarget(s, 1.6, m.position)
      targets.current[i].copy(m.position)
    })
  }, [])

  useFrame(({ clock, size }, dt) => {
    if (reduced) return
    const t = clock.elapsedTime
    const aspect = size.width / Math.max(size.height, 1)

    const y = window.scrollY
    const v = Math.abs(y - lastY.current)
    lastY.current = y
    if (v > 0.5) lastScrollRef.current = t

    // Idle: no scrolling for SETTLE seconds → shapes stay put (no drift,
    // no rotation, no retargeting) until the visitor scrolls again.
    if (t - lastScrollRef.current > SETTLE) return

    const d = Math.min(dt, 0.05)
    moveClock.current += d // only advances while active → rotation freezes, no snap

    // Re-roll a random target after enough scroll travel; a tiny nudge moves
    // shapes a little, a long fling sends them across the whole viewport.
    scrollAccum.current += v
    if (scrollAccum.current > RETARGET_DIST && t - lastRollRef.current > RETARGET_MIN_T) {
      scrollAccum.current = 0
      lastRollRef.current = t
      SHAPES.forEach((s, i) => pickTarget(s, aspect, targets.current[i]))
    }

    const k = 1 - Math.exp(-(0.6 + Math.min(v * 0.012, 3)) * d)
    SHAPES.forEach((s, i) => {
      const m = refs.current[i]
      if (!m) return
      const target = targets.current[i]
      m.position.x += (target.x - m.position.x) * k
      m.position.y += (target.y - m.position.y) * k
      m.position.z += (target.z - m.position.z) * k
      m.rotation.x = moveClock.current * s.speed * 1.3
      m.rotation.y = moveClock.current * s.speed
    })
  })

  return (
    <group>
      {SHAPES.map((s, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el }}>
          {s.kind === 'icosa' && <icosahedronGeometry args={[s.r, 0]} />}
          {s.kind === 'octa' && <octahedronGeometry args={[s.r]} />}
          {s.kind === 'torusKnot' && <torusKnotGeometry args={[s.r, s.r * 0.32, 64, 8]} />}
          {s.kind === 'dodeca' && <dodecahedronGeometry args={[s.r, 0]} />}
          {s.kind === 'torus' && <torusGeometry args={[s.r, s.r * 0.3, 16, 48]} />}
          <meshStandardMaterial
            color={s.color}
            transparent
            opacity={s.opacity}
            flatShading
            depthWrite={false}
            side={THREE.DoubleSide}
            roughness={0.85}
          />
        </mesh>
      ))}
    </group>
  )
}

export function BackgroundFX() {
  const reduced = !!useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const orbRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (reduced || !wrapRef.current) return
    let raf = 0
    let current = 0
    let prevY = window.scrollY
    let lastMoved = -Infinity

    const tick = () => {
      const now = performance.now()
      const y = window.scrollY
      if (Math.abs(y - prevY) > 0.5) lastMoved = now
      prevY = y

      // Orbs trail the scroll like the shapes: freeze once scrolling has
      // been idle for SETTLE seconds, so nothing drifts at rest.
      if (now - lastMoved < SETTLE * 1000) {
        const max = document.documentElement.scrollHeight - window.innerHeight
        const target = max > 0 ? y / max : 0
        current += (target - current) * 0.15 // smooth trailing parallax
        const vh = window.innerHeight
        ORBS.forEach((orb, i) => {
          const el = orbRefs.current[i]
          if (!el) return
          el.style.transform = `translate3d(0, ${(-current * orb.parallax * vh) / 100}px, 0)`
        })
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  return (
    <div ref={wrapRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Faint structural grid for the "developer canvas" feel */}
      <div className="bg-grid absolute inset-0 opacity-40" />

      {/* Blurred pastel orbs washing up/down on scroll */}
      {ORBS.map((orb, i) => (
        <div
          key={i}
          ref={(el) => { orbRefs.current[i] = el }}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${orb.size}vw`,
            height: `${orb.size}vw`,
            left: `${orb.x}vw`,
            top: `${orb.y}vh`,
            background: `radial-gradient(circle at 35% 30%, ${orb.color}, transparent 70%)`,
            willChange: 'transform',
          }}
        />
      ))}

      {/* Floating 3D solids roaming the whole viewport on scroll */}
      <Canvas
        camera={{ position: [0, 0, CAM_Z], fov: 40 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 3]} intensity={1.1} color="#fff4ec" />
        <directionalLight position={[-4, 2, -3]} intensity={0.35} color="#d9d0f5" />
        <RoamingShapes reduced={reduced} />
      </Canvas>
    </div>
  )
}
