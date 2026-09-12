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
    id: 'ach-phish-finder',
    title: 'Phish Finder',
    description: 'Successfully identified suspicious phishing and domain deception attempts.',
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
    id: 'ach-password-guardian',
    title: 'Password Guardian',
    description: 'Made robust credential and authentication defense decisions.',
    category: 'Containment',
    unlocked: false,
  },
  {
    id: 'ach-qr-detective',
    title: 'QR Detective',
    description: 'Successfully investigated and exposed a physical QR-based scam.',
    category: 'Forensics',
    unlocked: false,
  },
  {
    id: 'ach-evidence-collector',
    title: 'Forensic Collector',
    description: 'Logged distinct indicators of compromise in the Evidence Notebook.',
    category: 'Forensics',
    unlocked: false,
  },
  {
    id: 'ach-evidence-expert',
    title: 'Evidence Expert',
    description: 'Corroborated decisions with verified technical evidence in investigations.',
    category: 'Mastery',
    unlocked: false,
  },
  {
    id: 'ach-think-before-click',
    title: 'Think Before You Click',
    description: 'Completed multiple cyber situations without taking reckless or hasty actions.',
    category: 'Vigilance',
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
    id: 'ach-digital-defender',
    title: 'Digital Defender',
    description: 'Attained a Digital Trust rating above 50/100 through rigorous defense.',
    category: 'Mastery',
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

export const DEFAULT_SKILL_PROFILE = {
  phishing: 50,
  privacy: 50,
  deviceSecurity: 50,
  socialEngineering: 50,
  overallScore: 50,
  demonstratedStrengths: ['Curiosity', 'Eagerness to Learn'],
  demonstratedWeaknesses: ['Initial Assessment Pending'],
};

export const LEVEL_TITLES: Record<number, string> = {
  1: 'Digital Beginner',
  2: 'Cyber Explorer',
  3: 'Threat Spotter',
  4: 'Cyber Investigator',
  5: 'Digital Defender',
  6: 'Cyber Guardian',
};

export function computePlayerLevel(
  completedMissionsCount: number,
  digitalTrust: number,
  evidenceCount: number = 0
): { level: number; title: string } {
  let level = 1;
  if (digitalTrust >= 85 || (completedMissionsCount >= 4 && digitalTrust >= 70)) {
    level = 6;
  } else if (digitalTrust >= 65 || completedMissionsCount >= 4) {
    level = 5;
  } else if (digitalTrust >= 45 || completedMissionsCount >= 3) {
    level = 4;
  } else if (digitalTrust >= 25 || completedMissionsCount >= 2) {
    level = 3;
  } else if (digitalTrust >= 10 || completedMissionsCount >= 1 || evidenceCount >= 1) {
    level = 2;
  }
  return {
    level,
    title: LEVEL_TITLES[level] || 'Cyber Explorer',
  };
}

export const MILESTONE_CERTIFICATES = [
  {
    id: 'cert-cyber-safety-explorer',
    title: 'CYBER SAFETY EXPLORER',
    field: 'Foundational Threat Recognition & Digital Hygiene',
    milestoneTrust: 15,
    minLevel: 2,
    description:
      'Awarded for establishing verified cyber awareness and completing initial perimeter investigations.',
  },
  {
    id: 'cert-threat-investigator',
    title: 'CYBER INVESTIGATOR',
    field: 'Evidence-Based Forensic Investigation & Threat Isolation',
    milestoneTrust: 40,
    minLevel: 3,
    description:
      'Awarded for demonstrating forensic analysis, isolating rogue devices, and documenting indicators of compromise.',
  },
  {
    id: 'cert-digital-defender',
    title: 'DIGITAL DEFENDER',
    field: 'Advanced Perimeter Containment & Threat Neutralization',
    milestoneTrust: 65,
    minLevel: 4,
    description:
      'Awarded for defending against network spoofing, malicious links, and physical media exploitation.',
  },
  {
    id: 'cert-trust-guardian',
    title: 'TRUST GUARDIAN',
    field: 'Zero-Trust Protocol Leadership & Comprehensive Resilience',
    milestoneTrust: 85,
    minLevel: 5,
    description:
      'Highest honor awarded for exemplary digital trust, thorough verification, and zero reckless clicks across sectors.',
  },
];

export const DEFAULT_PLAYER_STATE: PlayerState = {
  name: 'Saurav',
  level: 1,
  title: 'Digital Beginner',
  digitalTrust: 0, // MUST start at 0
  abilities: INITIAL_ABILITIES,
  evidence: [],
  completedMissions: [],
  currentLocationId: 'campus',
  activeMissionId: null,
  trustHistory: [],
  achievements: INITIAL_ACHIEVEMENTS,
  certificates: [],
  skillProfile: DEFAULT_SKILL_PROFILE,
  skillCheckCompleted: false,
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
    // Ensure skillProfile exists
    if (!parsed.skillProfile) {
      parsed.skillProfile = DEFAULT_SKILL_PROFILE;
    }
    // Ensure title and level are refreshed
    const calculated = computePlayerLevel(
      (parsed.completedMissions || []).length,
      parsed.digitalTrust,
      (parsed.evidence || []).length
    );
    parsed.level = calculated.level;
    parsed.title = calculated.title;

    // Merge any missing achievements
    if (Array.isArray(parsed.achievements)) {
      const existingIds = new Set(parsed.achievements.map((a: any) => a.id));
      INITIAL_ACHIEVEMENTS.forEach((initAch) => {
        if (!existingIds.has(initAch.id)) {
          parsed.achievements.push(initAch);
        }
      });
    } else {
      parsed.achievements = INITIAL_ACHIEVEMENTS;
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
