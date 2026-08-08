/* Type declarations for @met4citizen/talkinghead (v1.7.0) — the package ships no types.
   Signatures verified against the installed modules/talkinghead.mjs source. */

declare module '@met4citizen/talkinghead' {
  export type CameraView = 'full' | 'mid' | 'upper' | 'head'

  export interface TalkingHeadOptions {
    cameraView?: CameraView
    cameraDistance?: number
    cameraRotateEnable?: boolean
    avatarMood?: string
    avatarIdleEyeContact?: number
    avatarSpeakingEyeContact?: number
    avatarIgnoreCamera?: boolean
    modelRoot?: string
    modelPixelRatio?: number
    modelFPS?: number
    dracoEnabled?: boolean
    [key: string]: unknown
  }

  export interface ShowAvatarParams {
    url: string
    body?: 'M' | 'F'
  }

  export class TalkingHead {
    constructor(node: HTMLElement, options?: TalkingHeadOptions)
    audioCtx?: AudioContext
    showAvatar(avatar: ShowAvatarParams, onprogress?: (progress: number) => void): Promise<void>
    start(): void
    stop(): void
    dispose(): void
    lookAt(x: number, y: number, t?: number): void
    lookAtCamera(t?: number): void
    makeEyeContact(t?: number): void
    playGesture(name: string, dur?: number, mirror?: boolean, ms?: number): void
    setView(view?: CameraView, opt?: unknown): void
    setMood(s: string): void
  }
}
