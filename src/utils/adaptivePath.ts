import { PlayerState, CyberSkillProfile } from '../types';
import { MISSIONS } from '../data/missions';

export interface AdaptiveRecommendation {
  weakestSkill: {
    axis: keyof CyberSkillProfile;
    label: string;
    score: number;
  };
  recommendedMissionId?: string;
  recommendedOpTitle: string;
  recommendedType: 'mission' | 'ethics' | 'challenge';
  rationale: string;
  calibrationLevel: 'Foundational' | 'Intermediate' | 'Advanced' | 'Mastery';
  redHerringAlert?: string;
}

const SKILL_AXIS_METADATA: Record<
  string,
  { label: string; associatedMissions: string[]; ethicsMatch: string }
> = {
  socialEngineering: {
    label: 'Social Engineering Defense',
    associatedMissions: ['mission-01-email', 'mission-04-qr-scam'],
    ethicsMatch: 'ethics-op-credential-scraping',
  },
  hardwareForensics: {
    label: 'Hardware & Media Forensics',
    associatedMissions: ['mission-02-badusb'],
    ethicsMatch: 'ethics-op-zero-day',
  },
  networkSecurity: {
    label: 'Network Security & RF',
    associatedMissions: ['mission-03-wifi'],
    ethicsMatch: 'ethics-op-whistleblower',
  },
  cryptography: {
    label: 'Cryptographic Verification',
    associatedMissions: ['mission-03-wifi', 'mission-04-qr-scam'],
    ethicsMatch: 'ethics-op-zero-day',
  },
  incidentResponse: {
    label: 'Incident Containment & Response',
    associatedMissions: ['mission-02-badusb', 'mission-01-email'],
    ethicsMatch: 'ethics-op-whistleblower',
  },
  ethicsDilemmas: {
    label: 'Applied Cyber Ethics',
    associatedMissions: [],
    ethicsMatch: 'ethics-op-whistleblower',
  },
};

/**
 * Evaluates the player's CyberSkillProfile and historical performance to compute
 * the next optimal training vector, calibrate difficulty, and inject red herrings.
 */
export function getAdaptiveRecommendation(player: PlayerState): AdaptiveRecommendation {
  const p = player.skillProfile || ({} as any);
  const normalizedScores: Record<string, number> = {
    socialEngineering: p.socialEngineering ?? p.phishing ?? 25,
    hardwareForensics: p.hardwareForensics ?? p.deviceSecurity ?? 15,
    networkSecurity: p.networkSecurity ?? p.privacy ?? 20,
    cryptography: p.cryptography ?? 15,
    incidentResponse: p.incidentResponse ?? 20,
    ethicsDilemmas: p.ethicsDilemmas ?? p.ethics ?? 15,
  };

  // Find lowest score
  let lowestAxis: keyof CyberSkillProfile = 'socialEngineering';
  let minScore = 999;

  (Object.keys(normalizedScores) as (keyof CyberSkillProfile)[]).forEach((axis) => {
    if (normalizedScores[axis] < minScore) {
      minScore = normalizedScores[axis];
      lowestAxis = axis;
    }
  });

  const meta = SKILL_AXIS_METADATA[lowestAxis] || SKILL_AXIS_METADATA.socialEngineering;

  // Determine calibration level
  let calibrationLevel: 'Foundational' | 'Intermediate' | 'Advanced' | 'Mastery' =
    'Foundational';
  if (minScore >= 70) calibrationLevel = 'Mastery';
  else if (minScore >= 45) calibrationLevel = 'Advanced';
  else if (minScore >= 25) calibrationLevel = 'Intermediate';

  // Check if player hasn't completed associated mission
  const uncompletedMission = meta.associatedMissions.find(
    (mId) => !player.completedMissions.includes(mId)
  );

  let recommendedType: 'mission' | 'ethics' | 'challenge' = 'mission';
  let recommendedOpTitle = '';
  let recommendedMissionId: string | undefined = undefined;

  if ((lowestAxis as string) === 'ethicsDilemmas' || !uncompletedMission) {
    if ((player.completedEthicsOps || []).length < 3) {
      recommendedType = 'ethics';
      recommendedOpTitle = 'Ethics Simulation: Responsible Disclosure or Whistleblowing';
    } else {
      recommendedType = 'challenge';
      recommendedOpTitle = 'Live Daily Cyber Triage Challenge';
    }
  } else {
    recommendedType = 'mission';
    recommendedMissionId = uncompletedMission;
    recommendedOpTitle = MISSIONS[uncompletedMission]?.title || 'Field Operation';
  }

  // Generate rationale
  let rationale = `Telemetry indicates your lowest readiness score is in ${meta.label} (${minScore}%). Focusing on this domain will prevent asymmetric failure in high-threat sectors.`;

  // Inject Red Herring Alert if player trust or experience is high
  let redHerringAlert: string | undefined = undefined;
  if (player.trustScore >= 40 || player.completedMissions.length >= 2) {
    redHerringAlert =
      'ELEVATED ADVERSARIAL SOPHISTICATION: Expect spoofed benign indicators, decoy log entries, and contradictory witness statements designed to test your critical thinking.';
  }

  return {
    weakestSkill: {
      axis: lowestAxis,
      label: meta.label,
      score: minScore,
    },
    recommendedMissionId,
    recommendedOpTitle,
    recommendedType,
    rationale,
    calibrationLevel,
    redHerringAlert,
  };
}
