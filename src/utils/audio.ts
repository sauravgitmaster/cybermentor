// Synthesized audio engine using standard Web Audio API
// Lightweight, subtle, non-intrusive sound effects for game interactions

let audioCtx: AudioContext | null = null;
let isMuted = false;

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function setAudioMuted(muted: boolean) {
  isMuted = muted;
  try {
    localStorage.setItem('cybermentor_muted', muted ? 'true' : 'false');
  } catch {}
}

export function getAudioMuted(): boolean {
  try {
    const saved = localStorage.getItem('cybermentor_muted');
    if (saved !== null) {
      isMuted = saved === 'true';
    }
  } catch {}
  return isMuted;
}

// Low-volume subtle click for UI buttons
export function playClickSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.045);
  } catch {}
}

// Technical inspect sound (typing-style tick)
export function playInspectSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(540, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.065);
  } catch {}
}

// Evidence discovered chime (pleasant two-tone harmonic)
export function playEvidenceDiscoveredSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now); // D5
    osc2.frequency.setValueAtTime(880, now + 0.08); // A5

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.1);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.28);
  } catch {}
}

// Success action (positive rising chord)
export function playSuccessSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [440, 554.37, 659.25]; // A major
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      gain.gain.setValueAtTime(0.05, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.32);
    });
  } catch {}
}

// Warning sound (alert tone)
export function playWarningSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.setValueAtTime(196, now + 0.08);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
  } catch {}
}

// Trust change audio
export function playTrustChangeSound(isPositive: boolean) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';

    if (isPositive) {
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(700, now + 0.2);
    } else {
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.25);
    }

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (isPositive ? 0.22 : 0.27));

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + (isPositive ? 0.23 : 0.28));
  } catch {}
}

// =========================================================================
// SPEECH SYNTHESIS / TEXT-TO-SPEECH (TTS) SYSTEM
// =========================================================================

let currentUtterance: SpeechSynthesisUtterance | null = null;
let speechListeners: Set<(isSpeaking: boolean) => void> = new Set();

export function subscribeSpeechState(listener: (isSpeaking: boolean) => void) {
  speechListeners.add(listener);
  return () => {
    speechListeners.delete(listener);
  };
}

function notifySpeechState(isSpeaking: boolean) {
  speechListeners.forEach((l) => l(isSpeaking));
}

/**
 * Speaks text using the browser SpeechSynthesis API.
 * Automatically stops any ongoing speech to prevent overlapping voices.
 * Honors sound mute settings.
 */
export function speakDialogue(text: string, onFinish?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  if (getAudioMuted()) return;

  try {
    // Always cancel previous speech to prevent overlapping voices
    window.speechSynthesis.cancel();

    // Clean markdown or technical characters
    const cleanText = text
      .replace(/\[.*?\]/g, '')
      .replace(/[#*_`]/g, '')
      .replace(/→/g, ' to ')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    // Pick best English voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Natural') ||
          v.name.includes('Google') ||
          v.name.includes('Samantha') ||
          v.name.includes('Karen') ||
          v.name.includes('Arthur'))
    );
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onstart = () => {
      notifySpeechState(true);
    };

    utterance.onend = () => {
      currentUtterance = null;
      notifySpeechState(false);
      onFinish?.();
    };

    utterance.onerror = () => {
      currentUtterance = null;
      notifySpeechState(false);
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  } catch {}
}

/**
 * Stops any ongoing dialogue speech.
 */
export function stopSpeech() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    currentUtterance = null;
    notifySpeechState(false);
  } catch {}
}

/**
 * Pauses dialogue speech.
 */
export function pauseSpeech() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.pause();
    notifySpeechState(false);
  } catch {}
}

/**
 * Resumes dialogue speech.
 */
export function resumeSpeech() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.resume();
    notifySpeechState(true);
  } catch {}
}

/**
 * Returns true if speech synthesis is currently speaking.
 */
export function isSpeechActive(): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return window.speechSynthesis.speaking;
}

