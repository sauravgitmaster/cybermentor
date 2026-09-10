import { PlayerState, CyberAbility, Achievement } from '../types';

export const INITIAL_ABILITIES: CyberAbility[] = [
  {
    id: 'OBSERVE',
    name: 'OBSERVE',
    tier: 'basic',
    description: 'Scrutinize visual anomalies, wording patterns, urgency signals, and user context.',
    command: 'observe',
    unlocked: true,
  },
  {
    id: 'INSPECT',
    name: 'INSPECT',
    tier: 'basic',
    description: 'Examine metadata, file extensions, link destinations, and raw address fields.',
    command: 'inspect',
    unlocked: true,
  },
  {
    id: 'VERIFY',
    name: 'VERIFY',
    tier: 'basic',
    description: 'Validate cryptographic headers, SPF/DKIM/DMARC records, and authoritative sources.',
    command: 'verify',
    unlocked: true,
  },
  {
    id: 'QUESTION',
    name: 'QUESTION',
    tier: 'basic',
    description: 'Interview individuals, test assertions, and cross-reference institutional protocols.',
    command: 'question',
    unlocked: true,
  },
  {
    id: 'ANALYZE',
    name: 'ANALYZE',
    tier: 'advanced',
    description: 'Deconstruct executable binaries, decode obfuscated strings, and analyze payloads.',
    command: 'analyze --deep',
    unlocked: false,
    unlockedInMission: 'mission-01-email',
  },
  {
    id: 'TRACE',
    name: 'TRACE',
    tier: 'advanced',
    description: 'Map routing hops, identify rogue gateways, and track origin infrastructure.',
    command: 'trace --hops',
    unlocked: false,
    unlockedInMission: 'mission-03-wifi',
  },
  {
    id: 'ISOLATE',
    name: 'ISOLATE',
    tier: 'advanced',
    description: 'Quarantine infected hosts, disconnect wireless interfaces, and sever malicious C2 links.',
    command: 'isolate --network-kill',
    unlocked: false,
    unlockedInMission: 'mission-02-usb',
  },
  {
    id: 'PROTECT',
    name: 'PROTECT',
    tier: 'advanced',
    description: 'Deploy hardware keys, enforce multifactor safeguards, and lock access credentials.',
    command: 'protect --enforce-mfa',
    unlocked: false,
  },
  {
    id: 'REPORT',
    name: 'REPORT',
    tier: 'advanced',
    description: 'Compile cryptographic evidence packages and dispatch alerts to CERT / SecOps.',
    command: 'report --cert-dispatch',
    unlocked: false,
    unlockedInMission: 'mission-04-qr-scam',
  },
  {
    id: 'RESPOND',
    name: 'RESPOND',
    tier: 'advanced',
    description: 'Coordinate incident remediation, revoke compromised tokens, and restore system state.',
    command: 'respond --mitigate',
    unlocked: false,
  },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-step',
    title: 'First Digital Trace',
    description: 'Began the CyberMentor AI investigation journey.',
    category: 'Vigilance',
    unlocked: false,
  },
  {
    id: 'ach-phish-disarmed',
    title: 'Phish Disarmed',
    description: 'Identified a typosquatted domain and prevented credential harvest.',
    category: 'Forensics',
    unlocked: false,
  },
  {
    id: 'ach-evidence-collector',
    title: 'Forensic Collector',
    description: 'Logged 3 distinct indicators of compromise in the Evidence Notebook.',
    category: 'Forensics',
    unlocked: false,
  },
  {
    id: 'ach-hardware-defender',
    title: 'Perimeter Sentry',
    description: 'Neutralized a BadUSB hardware attack without plugging it into a live network.',
    category: 'Containment',
    unlocked: false,
  },
  {
    id: 'ach-digital-trust-master',
    title: 'Certified Operative',
    description: 'Attained a Digital Trust rating above 25/100 through rigorous defense.',
    category: 'Mastery',
    unlocked: false,
  },
];

export const DEFAULT_PLAYER_STATE: PlayerState = {
  name: 'Saurav',
  level: 1,
  title: 'Cyber Explorer',
  digitalTrust: 0, // MUST start at 0
  abilities: INITIAL_ABILITIES,
  evidence: [],
  completedMissions: [],
  currentLocationId: 'campus',
  activeMissionId: null,
  trustHistory: [],
  achievements: INITIAL_ACHIEVEMENTS,
  certificates: [],
};

const STORAGE_KEY = 'cybermentor_player_state_v1';

export function loadSavedPlayerState(): PlayerState {
  if (typeof window === 'undefined') return DEFAULT_PLAYER_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PLAYER_STATE;
    const parsed = JSON.parse(raw);
    // Ensure digitalTrust starts at 0 if new or uninitialized
    if (typeof parsed.digitalTrust !== 'number') {
      parsed.digitalTrust = 0;
    }
    return parsed;
  } catch {
    return DEFAULT_PLAYER_STATE;
  }
}

export function savePlayerState(state: PlayerState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export function resetPlayerState(): PlayerState {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }
  return DEFAULT_PLAYER_STATE;
}
