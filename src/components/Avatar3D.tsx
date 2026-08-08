import { Suspense, useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

/* ---------------------------------------------------------------------------
   Scroll context — lightweight module-level pub/sub so the 3D avatar can read
   scroll without a global provider. Delivers { progress, section } on scroll.
--------------------------------------------------------------------------- */
type ScrollState = { progress: number; section: string }

const DEFAULT_SCROLL: ScrollState = { progress: 0, section: 'home' }

const SECTION_ORDER = ['home', 'about', 'stack', 'experience', 'projects', 'skills', 'credentials', 'contact']

let _scrollListeners: ((s: ScrollState) => void)[] = []
let _currentScroll = DEFAULT_SCROLL

if (typeof window !== 'undefined') {
  const tick = () => {
    const y = window.scrollY
    const max = document.documentElement.scrollHeight - window.innerHeight
    const progress = max > 0 ? Math.min(y / max, 1) : 0

    let section = SECTION_ORDER[0]
    for (const id of SECTION_ORDER) {
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
   Avatar command bus — cards call sendAvatarCommand('point' / 'unpoint') from
   their hover handlers. The avatar subscribes with useAvatarCommand(). This is
   deliberately a plain module-level pub/sub (no context provider) so any card
   can talk to the avatar without adding props to the tree.
--------------------------------------------------------------------------- */
export type AvatarCommand =
  | { type: 'wave' }
  | { type: 'point'; cardId: string }
  | { type: 'unpoint' }

let _avatarListeners: ((cmd: AvatarCommand) => void)[] = []

export function sendAvatarCommand(cmd: AvatarCommand) {
  for (const fn of _avatarListeners) fn(cmd)
}

function useAvatarCommand(): AvatarCommand | null {
  const [cmd, setCmd] = useState<AvatarCommand | null>(null)
  useEffect(() => {
    _avatarListeners.push(setCmd)
    return () => { _avatarListeners = _avatarListeners.filter((f) => f !== setCmd) }
  }, [])
  return cmd
}

/* ---------------------------------------------------------------------------
   Rig input — shared between the DOM listeners (mouse / scroll gaze) and the
   R3F frame loop. Normalized pointer coords, -1..1 (x right+, y up+).
--------------------------------------------------------------------------- */
type RigInput = {
  pointerX: number
  pointerY: number
  gazeX: number
  gazeY: number
  lastMouse: number
}

type AvatarState = 'idle' | 'wave' | 'point'

type RigApi = { setState(s: AvatarState): void }

const AVATAR_URL = `${import.meta.env.BASE_URL}avatars/avatarsdk.glb`

// World-space framing for the persistent bottom-right companion.
const CAMERA = { position: [0, 0.55, 3.6] as [number, number, number], fov: 40 }
const AVATAR_X = 1.55
const FEET_Y = -1.15
const TARGET_HEIGHT = 1.75

const WAVE_DURATION = 3.5
const WAVE_COOLDOWN = 15_000
const GESTURE_FADE = 6 // weight crossfade rate (higher = snappier)

/* ---------------------------------------------------------------------------
   Rig — procedural skeletal animation controller. avatarsdk.glb carries no
   animation clips (verified: 0 clips, Mixamo-compatible bone set), so every
   gesture is posed bone-by-bone: each frame we blend idle / wave / point pose
   weights toward their targets, compose the offset on top of each bone's bind
   pose (target = offset * bind) and damp the bone toward it. That gives a
   smooth crossfade between states without any AnimationMixer clips.
--------------------------------------------------------------------------- */
class Rig {
  bones = new Map<string, THREE.Bone>()
  binds = new Map<string, THREE.Quaternion>()
  lambdas = new Map<string, number>()
  state: AvatarState = 'idle'
  weights = { idle: 1, wave: 0, point: 0 }
  waveStart = 0
  time = 0
  dt = 0
  bobY = 0

  // scratch objects (no per-frame allocation)
  private _e = new THREE.Euler()
  private _q = new THREE.Quaternion()
  private _target = new THREE.Quaternion()

  constructor(scene: THREE.Object3D) {
    scene.traverse((o) => {
      const b = o as THREE.Bone
      if (b.isBone) {
        this.bones.set(b.name, b)
        this.binds.set(b.name, b.quaternion.clone())
      }
    })
    const setLambda = (names: string[], lambda: number) =>
      names.forEach((n) => { if (this.bones.has(n)) this.lambdas.set(n, lambda) })
    setLambda(['Head'], 14)
    setLambda(['Neck1', 'Neck2'], 10)
    setLambda(['LeftEye', 'RightEye'], 18)
    setLambda(['RightShoulder', 'RightArm', 'RightForeArm'], 9)
    setLambda(['RightHand'], 14)
    setLambda(['RightHandMiddle1', 'RightHandRing1', 'RightHandPinky1', 'RightHandThumb1'], 12)
    setLambda(['RightHandMiddle2', 'RightHandRing2', 'RightHandPinky2'], 12)
    setLambda(['RightHandMiddle3', 'RightHandRing3', 'RightHandPinky3'], 12)
    setLambda(['LeftArm', 'LeftForeArm'], 6)
    setLambda(['Spine1', 'Spine2'], 8)
  }

  setState(s: AvatarState) {
    if (s === this.state) return
    this.state = s
    if (s === 'wave') this.waveStart = this.time
  }

  update(input: RigInput) {
    this.time += this.dt

    if (this.state === 'wave' && this.time - this.waveStart > WAVE_DURATION) this.state = 'idle'

    // Smoothly crossfade state weights toward the active one.
    const target = { idle: this.state === 'idle' ? 1 : 0, wave: this.state === 'wave' ? 1 : 0, point: this.state === 'point' ? 1 : 0 }
    const k = 1 - Math.exp(-GESTURE_FADE * this.dt)
    this.weights.idle += (target.idle - this.weights.idle) * k
    this.weights.wave += (target.wave - this.weights.wave) * k
    this.weights.point += (target.point - this.weights.point) * k
    const { idle, wave, point } = this.weights

    // Gaze source: recent cursor wins, otherwise drift to the scroll gaze.
    const now = performance.now()
    const active = now - input.lastMouse < 2000
    const nx = active ? input.pointerX : input.gazeX
    const ny = active ? input.pointerY : input.gazeY

    this.bobY = Math.sin(this.time * 1.1) * 0.02 * idle

    /* Head / neck / eyes — track the cursor (or scroll gaze in idle). The eyes
       track a little further than the head so the gaze feels alive. */
    const yaw = nx * 0.45 + Math.sin(this.time * 0.5) * 0.025 * idle
    const pitch = -ny * 0.32
    this.offset('Head', pitch, yaw, 0)
    this.offset('Neck2', pitch * 0.35, yaw * 0.35, 0)
    this.offset('Neck1', pitch * 0.18, yaw * 0.18, 0)
    this.offset('LeftEye', pitch * 0.5, yaw * 0.6, 0)
    this.offset('RightEye', pitch * 0.5, yaw * 0.6, 0)

    /* Breathing — a slow ribcage rise on the spine chain, always on. */
    this.offset('Spine1', Math.sin(this.time * 1.1) * 0.02, 0, 0)
    this.offset('Spine2', Math.sin(this.time * 1.1 + 0.5) * 0.015, 0, 0)

    /* Right arm — the teacher's gesture arm.
       wave: upper arm raised, forearm bent up, hand flaps side to side.
       point: arm swung forward toward the cards, index stays extended. */
    this.offset('RightArm', 0, -1.25 * point, 1.2 * wave + 0.3 * point)
    this.offset('RightForeArm', 0, 0, -1.15 * wave + 0.35 * point)
    this.offset('RightShoulder', 0, 0, 0.18 * wave + 0.12 * point)
    const waveOsc = Math.sin(this.time * 7.5) * 0.4
    this.offset('RightHand', waveOsc * wave, 0, -0.25 * wave + 0.15 * point)

    /* Idle — gentle left-arm sway while relaxed. */
    this.offset('LeftArm', 0, 0, Math.sin(this.time * 0.6) * 0.05 * idle)
    this.offset('LeftForeArm', 0, 0, Math.sin(this.time * 0.6 + 1.2) * 0.04 * idle)

    /* Point — curl middle/ring/pinky (two knuckles), keep the index extended. */
    const c1 = -0.95 * point
    const c2 = -0.55 * point
    const c3 = -0.35 * point
    for (const n of ['Middle', 'Ring', 'Pinky']) {
      this.offset(`RightHand${n}1`, c1, 0, 0)
      this.offset(`RightHand${n}2`, c2, 0, 0)
      this.offset(`RightHand${n}3`, c3, 0, 0)
    }
    this.offset('RightHandThumb1', -0.35 * point, 0, 0)
  }

  /* Compose a bone-local offset on top of its bind pose and damp toward it. */
  private offset(name: string, x: number, y: number, z: number) {
    const bone = this.bones.get(name)
    if (!bone) return
    const bind = this.binds.get(name)
    if (!bind) return
    this._e.set(x, y, z)
    this._q.setFromEuler(this._e)
    this._target.copy(this._q).multiply(bind)
    const lambda = this.lambdas.get(name) ?? 10
    bone.quaternion.slerp(this._target, 1 - Math.exp(-lambda * this.dt))
  }
}

/* ---------------------------------------------------------------------------
   The model + rig, driven by the R3F frame loop.
--------------------------------------------------------------------------- */
function AvatarRig({ inputRef, rigApiRef, reduced }: {
  inputRef: RefObject<RigInput>
  rigApiRef: RefObject<RigApi | null>
  reduced: boolean
}) {
  const { scene } = useGLTF(AVATAR_URL)
  const groupRef = useRef<THREE.Group>(null!)
  const rigRef = useRef<Rig | null>(null)
  const baseYRef = useRef(FEET_Y)

  useLayoutEffect(() => {
    /* Scale the model to a target on-screen height and park its feet at FEET_Y,
       offset to the right so the companion sits clear of the content column. */
    const box = new THREE.Box3().setFromObject(scene)
    const s = TARGET_HEIGHT / box.getSize(new THREE.Vector3()).y
    groupRef.current.scale.setScalar(s)
    const scaledMin = box.min.clone().multiplyScalar(s)
    const baseY = FEET_Y - scaledMin.y
    baseYRef.current = baseY
    groupRef.current.position.set(AVATAR_X, baseY, 0)

    const rig = new Rig(scene)
    rigRef.current = rig
    rig.setState('wave') // welcome "hi" on mount
    rigApiRef.current = { setState: (st) => rig.setState(st) }
    return () => {
      rigRef.current = null
      rigApiRef.current = null
    }
  }, [scene, rigApiRef])

  useFrame((_, dt) => {
    const rig = rigRef.current
    if (!rig || reduced) return
    rig.dt = Math.min(dt, 1 / 30) // clamp dt so gestures stay smooth under lag
    rig.update(inputRef.current)
    groupRef.current.position.y = baseYRef.current + rig.bobY
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

/* ---------------------------------------------------------------------------
   Faint floating geometric background meshes — slow-rotating pastel solids
   far behind the avatar, giving the overlay depth without shouting.
--------------------------------------------------------------------------- */
const FX_SHAPES = [
  { kind: 'icosa', pos: [-3.4, 1.5, -5] as [number, number, number], r: 0.5, color: '#9a86cf', speed: 0.12 },
  { kind: 'octa', pos: [2.7, 2.3, -6] as [number, number, number], r: 0.4, color: '#d98a76', speed: 0.18 },
  { kind: 'torusKnot', pos: [-2.1, -1.7, -7] as [number, number, number], r: 0.34, color: '#7a9a72', speed: 0.1 },
  { kind: 'dodeca', pos: [3.5, -1.1, -8] as [number, number, number], r: 0.5, color: '#b7a8e0', speed: 0.14 },
  { kind: 'torus', pos: [0.3, 2.7, -9] as [number, number, number], r: 0.42, color: '#e3b39b', speed: 0.09 },
]

function FloatGeometry({ reduced }: { reduced: boolean }) {
  const refs = useRef<(THREE.Mesh | null)[]>([])
  useFrame(({ clock }) => {
    if (reduced) return
    const t = clock.elapsedTime
    FX_SHAPES.forEach((s, i) => {
      const m = refs.current[i]
      if (!m) return
      m.rotation.x = t * s.speed * 1.3
      m.rotation.y = t * s.speed
      m.position.y = s.pos[1] + Math.sin(t * 0.4 + i) * 0.25
    })
  })
  return (
    <group>
      {FX_SHAPES.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el }}
          position={s.pos}
        >
          {s.kind === 'icosa' && <icosahedronGeometry args={[s.r, 0]} />}
          {s.kind === 'octa' && <octahedronGeometry args={[s.r]} />}
          {s.kind === 'torusKnot' && <torusKnotGeometry args={[s.r, s.r * 0.32, 64, 8]} />}
          {s.kind === 'dodeca' && <dodecahedronGeometry args={[s.r, 0]} />}
          {s.kind === 'torus' && <torusGeometry args={[s.r, s.r * 0.3, 16, 48]} />}
          <meshStandardMaterial
            color={s.color}
            transparent
            opacity={0.16}
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
  const avatarCmd = useAvatarCommand()
  const reduced = !!useReducedMotion()
  const inputRef = useRef<RigInput>({ pointerX: 0, pointerY: 0, gazeX: 0, gazeY: 0.3, lastMouse: 0 })
  const rigApiRef = useRef<RigApi | null>(null)
  const lastWaveRef = useRef(0)

  /* Cursor head-tracking — normalize the pointer once per mouse move. The canvas
     is pointer-events-none, so we read the cursor at window level instead of
     from R3F's state.pointer (which never fires without events). */
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      inputRef.current.pointerX = (e.clientX / window.innerWidth) * 2 - 1
      inputRef.current.pointerY = -((e.clientY / window.innerHeight) * 2 - 1)
      inputRef.current.lastMouse = performance.now()
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  /* Scroll-synced gaze — drift the head across sections as you scroll (used
     whenever the mouse has been still for ~2s). */
  useEffect(() => {
    const idx = Math.max(0, SECTION_ORDER.indexOf(scroll.section))
    const nx = 0.1 + (idx / (SECTION_ORDER.length - 1)) * 0.6
    const ny = 0.35 + scroll.progress * 0.35
    inputRef.current.gazeX = nx * 2 - 1
    inputRef.current.gazeY = ny * 2 - 1
  }, [scroll])

  /* Wave "hi" again when the visitor scrolls back to the hero top view. */
  useEffect(() => {
    if (scroll.section !== 'home' || reduced) return
    const now = performance.now()
    if (now - lastWaveRef.current < WAVE_COOLDOWN) return
    lastWaveRef.current = now
    rigApiRef.current?.setState('wave')
  }, [scroll.section, reduced])

  /* Command bus — teacher-style pointing on card hover, wave on demand. */
  useEffect(() => {
    if (!avatarCmd || reduced) return
    if (avatarCmd.type === 'wave') {
      rigApiRef.current?.setState('wave')
    } else if (avatarCmd.type === 'point') {
      rigApiRef.current?.setState('point')
    } else if (avatarCmd.type === 'unpoint') {
      rigApiRef.current?.setState('idle')
    }
  }, [avatarCmd, reduced])

  const goTop = () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })

  const onChipClick = () => {
    goTop()
    if (!reduced) rigApiRef.current?.setState('wave')
  }

  return (
    /* Full-viewport transparent overlay. pointer-events-none: the 3D layer never
       blocks anything beneath it; the caption chip opts back in. */
    <div className="pointer-events-none fixed inset-0 z-40 hidden select-none sm:block">
      <Canvas
        camera={{ position: CAMERA.position, fov: CAMERA.fov }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 3]} intensity={1.1} color="#fff4ec" />
        <directionalLight position={[-4, 2, -3]} intensity={0.35} color="#d9d0f5" />
        <FloatGeometry reduced={reduced} />
        <Suspense fallback={null}>
          <AvatarRig inputRef={inputRef} rigApiRef={rigApiRef} reduced={reduced} />
        </Suspense>
        <ContactShadows position={[AVATAR_X, FEET_Y, 0]} opacity={0.3} scale={2.6} blur={2.6} far={1.4} />
      </Canvas>

      {/* Caption chip + online dot — a small interactive companion to the avatar */}
      <div className="absolute bottom-5 right-5 flex flex-col items-end gap-2">
        <AnimatePresence mode="wait">
          <motion.button
            key={scroll.section}
            type="button"
            onClick={onChipClick}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto cursor-pointer rounded-2xl rounded-br-sm border border-white/40 bg-white/45 px-3 py-1.5 text-xs font-medium text-ink shadow-lg shadow-lavender-deep/10 backdrop-blur-md transition hover:bg-white/65"
          >
            {SECTION_LABELS[scroll.section] ?? SECTION_LABELS.home}
          </motion.button>
        </AnimatePresence>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
          <span className="h-2.5 w-2.5 rounded-full bg-sage-deep ring-2 ring-white/70" />
          online
        </span>
      </div>
    </div>
  )
}
