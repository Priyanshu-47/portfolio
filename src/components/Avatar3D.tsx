import { useRef, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { TalkingHead, type TalkingHeadOptions } from '@met4citizen/talkinghead'

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
   TalkingHead — real-time 3D avatar controller (met4citizen, MIT)
--------------------------------------------------------------------------- */
// Resolves relative to `base: './'`, so it works under the GH Pages subpath.
// avatarsdk.glb = the male developer companion (AvatarSDK/MetaPerson origin):
// Mixamo-compatible rig, ARKit 52 blendshapes, Oculus visemes.
const AVATAR_URL = `${import.meta.env.BASE_URL}avatars/avatarsdk.glb`

const TALKING_HEAD_OPTIONS: TalkingHeadOptions = {
  cameraView: 'full', // full-body framing inside the tile
  cameraRotateEnable: false, // the tile is a button — no drag-rotate
  avatarIdleEyeContact: 0, // we drive gaze manually; don't fight it
  avatarSpeakingEyeContact: 0,
  avatarIgnoreCamera: false, // keep lookAt targets active
  modelRoot: 'Armature', // Mixamo GLB root bone
  modelPixelRatio: Math.min(window.devicePixelRatio || 1, 2),
  modelFPS: 60,
  dracoEnabled: false, // avatarsdk.glb is uncompressed — no Draco payload
  lipsyncModules: [], // this avatar never speaks — don't load the lipsync modules
}

/* Gaze target from scroll. lookAt(x, y, t) takes viewport-pixel coordinates
   (verified in the library source), so map the normalized sweep to window size:
   horizontal left→right as you scroll through sections, gentle downward tilt
   as page progress increases. */
function gazeFromScroll(scroll: ScrollState) {
  const idx = Math.max(0, SECTION_ORDER.indexOf(scroll.section))
  const nx = 0.25 + (idx / (SECTION_ORDER.length - 1)) * 0.5
  const ny = 0.35 + scroll.progress * 0.3
  return {
    x: window.innerWidth * nx,
    y: window.innerHeight * ny,
  }
}

/* The library creates its AudioContext eagerly in the constructor, which makes
   Chrome log its autoplay-intervention message on load even though this avatar
   never plays audio. The context can't be deferred without delaying the whole
   avatar, so we resume it on the first user gesture (making any future audio
   work) and filter the single browser message so the console stays clean. */
function silenceAutoplayIntervention() {
  const original = console.warn.bind(console)
  console.warn = (...args: unknown[]) => {
    if (args.some((a) => String(a).includes('AudioContext was not allowed to start'))) return
    original(...args)
  }
}

function resumeAudioOnFirstGesture(head: TalkingHead) {
  const resume = () => {
    if (head.audioCtx && head.audioCtx.state === 'suspended') {
      void head.audioCtx.resume()
    }
  }
  window.addEventListener('pointerdown', resume, { once: true })
  window.addEventListener('keydown', resume, { once: true })
  window.addEventListener('touchstart', resume, { once: true })
}

// Apply once, before any TalkingHead instance is constructed.
if (typeof window !== 'undefined') silenceAutoplayIntervention()

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

/* Gesture cadence — a teacher: waves hello, points to guide attention, and
   only steps in when the visitor signals interest. */
const WAVE_DURATION = 3.5
const WAVE_COOLDOWN = 15_000
const POINT_DURATION = 2.6

export function Avatar3D() {
  const scroll = useScrollState()
  const avatarCmd = useAvatarCommand()
  const reduced = useReducedMotion()
  const mountRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<TalkingHead | null>(null)
  const readyRef = useRef(false)
  const lastScrollGazeRef = useRef(0)
  const lastCursorRef = useRef(0)
  const lastWaveRef = useRef(0)

  /* Create the controller once per mount. The library appends its own <canvas>
     to the mount node and auto-resizes via an internal ResizeObserver. StrictMode
     double-invokes effects in dev, so cleanup must fully dispose the instance and
     gaze/gestures must wait until the avatar has actually loaded. */
  useEffect(() => {
    const node = mountRef.current
    if (!node) return
    const head = new TalkingHead(node, TALKING_HEAD_OPTIONS)
    headRef.current = head
    head.start()
    resumeAudioOnFirstGesture(head)
    head
      .showAvatar({ url: AVATAR_URL, body: 'M' })
      .then(() => {
        if (headRef.current !== head) return // superseded by a remount
        readyRef.current = true
        lastWaveRef.current = performance.now() // mark the greeting as used

        /* Welcome wave — face the camera first, then raise the hand. */
        head.lookAtCamera(350)
        window.setTimeout(() => {
          if (headRef.current === head) head.playGesture('handup', WAVE_DURATION, true)
        }, 550)
      })
      .catch(() => {
        if (headRef.current === head) readyRef.current = true
      })
    return () => {
      readyRef.current = false
      try { head.stop() } catch { /* noop */ }
      try { head.dispose() } catch { /* noop */ }
      headRef.current = null
    }
  }, [])

  /* Cursor head-tracking — the avatar follows the mouse in idle, giving the
     "lifelike, aware" baseline. Throttled: lookAt starts a ~300 ms transition,
     so firing ~12 Hz is plenty. Hand gestures and head/eye gaze share no bones,
     so pointing/waving never fights the tracking. */
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const head = headRef.current
      if (!head || !readyRef.current) return
      const now = performance.now()
      if (now - lastCursorRef.current < 80) return
      lastCursorRef.current = now
      head.lookAt(e.clientX, e.clientY, 300)
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  /* Scroll-synced gaze — throttled, since the pub/sub fires on every pixel. */
  useEffect(() => {
    const head = headRef.current
    if (!head || !readyRef.current) return
    const now = performance.now()
    if (now - lastScrollGazeRef.current < 120) return
    lastScrollGazeRef.current = now
    const { x, y } = gazeFromScroll(scroll)
    head.lookAt(x, y, 900)
  }, [scroll])

  /* Wave "hi" again when the visitor scrolls back to the hero top view. */
  useEffect(() => {
    if (scroll.section !== 'home' || !readyRef.current) return
    const now = performance.now()
    if (now - lastWaveRef.current < WAVE_COOLDOWN) return
    lastWaveRef.current = now
    const head = headRef.current
    if (!head) return
    head.lookAtCamera(350)
    head.playGesture('handup', WAVE_DURATION, true)
  }, [scroll.section, reduced])

  /* Teacher-style pointing — cards broadcast 'point' on hover, 'unpoint' on
     leave. We let the gesture play out for a beat before it fades back into
     the idle baseline (lookAt cursor-tracking resumes on its own). */
  useEffect(() => {
    if (!avatarCmd || !readyRef.current) return
    const head = headRef.current
    if (!head) return
    if (avatarCmd.type === 'wave') {
      head.lookAtCamera(350)
      head.playGesture('handup', WAVE_DURATION, true)
    } else if (avatarCmd.type === 'point') {
      head.playGesture('index', POINT_DURATION)
    }
    // 'unpoint' needs no action — the gesture simply runs its course.
  }, [avatarCmd])

  const goTop = () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })

  const onClick = () => {
    goTop()
    /* Clicking the avatar scrolls you home — greet with a wave. */
    const head = headRef.current
    if (!head || !readyRef.current) return
    head.lookAtCamera(350)
    head.playGesture('handup', WAVE_DURATION, true)
  }

  return (
    /* pointer-events-none on the outer wrapper: the avatar overlay never blocks
       text selection, button clicks, or card hovers underneath. Only the small
       interactive tile opts back in via pointer-events-auto on the <button>. */
    <motion.div
      className="pointer-events-none fixed bottom-4 right-4 z-40 hidden select-none items-end gap-3 sm:flex"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      {/* Caption chip — driven by the same shared scroll state as the gaze */}
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

      {/* Interactive tile — the TalkingHead mount node */}
      <button
        type="button"
        onClick={onClick}
        aria-label="Back to top"
        className="pointer-events-auto relative touch-pan-y"
      >
        <div
          ref={mountRef}
          className="h-[168px] w-[168px] overflow-hidden rounded-2xl border border-white/30 bg-white/20 shadow-lg shadow-lavender-deep/20 backdrop-blur-md"
        />
        {/* Online dot */}
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-sage-deep ring-2 ring-white/70" />
      </button>
    </motion.div>
  )
}
