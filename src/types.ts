import type { SavedWorldLocation } from './types/world';

export type LocationId =
  | 'campus'
  | 'home'
  | 'digital-city'
  | 'cybercorp'
  | 'the-internet';

export interface CyberAbility {
  id: string;
  name: string;
  tier: 'basic' | 'advanced';
  description: string;
  command: string;
  unlocked: boolean;
  unlockedInMission?: string;
}

export interface EvidenceItem {
  id: string;
  missionId: string;
  title: string;
  category: string;
  description: string;
  indicator: string;
  timestamp: number;
}

export interface TrustChangeRecord {
  id: string;
  delta: number;
  reason: string;
  timestamp: number;
  newScore?: number;
}

export interface CampaignFlags {
  credentialsHarvested: boolean; // clicked fake portal or opened dropper in mission-01
  malwareOnEndpoint: boolean; // opened pdf.exe or plugged BadUSB
  wifiSessionHijacked: boolean; // joined rogue AP
  qrPaymentLeaked: boolean; // scanned malicious QR
  jordanAccountFollowupSent: boolean;
  itIncidentOpened: boolean;
  unauthorizedAccessAttempt?: boolean;
  phishCompromised?: boolean;
  badUsbExecuted?: boolean;
}

export interface EthicsChangeRecord {
  id: string;
  opId: string;
  delta: number;
  principle: string; // consent | harm | proportionality | duty-to-report | privacy | integrity | stewardship
  reasoningSummary: string;
  timestamp: number;
  newScore: number;
}

export interface AfterActionReport {
  id: string;
  missionId: string;
  title: string;
  decidedAt: number;
  choiceId: string;
  choiceLabel: string;
  wasOptimal: boolean;
  trustDelta: number;
  ethicsDelta?: number;
  iocsFound: string[];
  signalsMissed: string[];
  takeaway: string;
  mentorSummary: string;
  skillDeltas: Partial<Pick<CyberSkillProfile, 'phishing' | 'privacy' | 'deviceSecurity' | 'socialEngineering'>>;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'Forensics' | 'Vigilance' | 'Containment' | 'Mastery' | 'Ethics';
  unlocked: boolean;
  unlockedAt?: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuedTo: string;
  field: string;
  issueDate: string;
  credentialId: string;
  verifiedScore: number;
  description?: string;
  milestoneTrust?: number;
}

export interface CyberSkillProfile {
  phishing: number; // 0 - 100 percentage
  privacy: number; // 0 - 100 percentage
  deviceSecurity: number; // 0 - 100 percentage
  socialEngineering: number; // 0 - 100 percentage
  ethics?: number; // 0 - 100 percentage
  networkSecurity?: number;
  hardwareForensics?: number;
  cryptography?: number;
  incidentResponse?: number;
  ethicsDilemmas?: number;
  overallScore?: number;
  lastAssessedAt?: number;
  demonstratedStrengths: string[];
  demonstratedWeaknesses: string[];
  topStrengthSentence?: string;
  improvementAreaSentence?: string;
}

export interface PlayerState {
  name: string;
  level: number;
  title: string;
  digitalTrust: number; // MUST start at 0
  trustScore?: number; // alias for digitalTrust for components
  ethicsScore: number; // 0-100, starts at 0, separate from digitalTrust
  ethicsHistory: EthicsChangeRecord[];
  campaignFlags: CampaignFlags;
  recommendedMissionId: string | null;
  recommendedScenarioId: string | null;
  squadCode: string | null;
  squadCallsign: string | null;
  completedEthicsOps: string[];
  compromisedMissionIds: string[]; // missions where player picked reckless / non-optimal
  aaReports: AfterActionReport[];
  abilities: CyberAbility[];
  evidence: EvidenceItem[];
  completedMissions: string[];
  currentLocationId: LocationId;
  activeMissionId: string | null;
  trustHistory: TrustChangeRecord[];
  achievements: Achievement[];
  certificates: Certificate[];
  skillProfile: CyberSkillProfile;
  skillCheckCompleted?: boolean;
  dailyChallengeCompletedDate?: string;
  dailyChallengeStreak?: number;
  lastWorldLocation?: SavedWorldLocation;
  savedSectorLocations?: Partial<Record<LocationId, SavedWorldLocation>>;
}

export interface NPC {
  id: string;
  name: string;
  role: string;
  location: string;
  status: string;
  avatarSeed?: string;
}

export interface DialogueNode {
  id: string;
  speaker: 'npc' | 'player' | 'mentor';
  text: string;
  actionPrompt?: string;
}

export interface InspectableTarget {
  id: string;
  label: string;
  requiredAbility: string; // e.g. "INSPECT", "VERIFY", "ANALYZE"
  previewValue: string;
  isRedHerring?: boolean;
  revealedDetail: {
    heading: string;
    summary: string;
    technicalData: Record<string, string>;
    threatIndicator?: string;
    evidenceYielded?: {
      id: string;
      title: string;
      category: EvidenceItem['category'];
      description: string;
      technicalDetail: string;
    };
  };
}

export interface DecisionOption {
  id: string;
  label: string;
  type: 'defensive' | 'reckless' | 'passive' | 'inconclusive';
  description: string;
  trustChange: number;
  isOptimal: boolean;
  immediateReaction: string;
  consequenceText: string;
  screenEffect?: 'clean' | 'threat-alert' | 'caution';
}

export interface MissionData {
  id: string;
  locationId: LocationId;
  code: string;
  title: string;
  concept: string;
  threatCategory: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  requiredTrust: number;
  npc: NPC;
  doctrineBrief?: {
    title: string;
    durationHint: string;
    facts: [string, string, string];
    attackerModel: string;
    whatGoodLooksLike: string;
    relatedAbility: string;
  };
  briefing: {
    situation: string;
    npcDialogue: string;
    objective: string;
  };
  investigationWorkspace: {
    type: 'email-client' | 'hardware-analyzer' | 'network-scanner' | 'qr-inspector' | 'ethics-briefing';
    title: string;
    interfaceMetadata: {
      clientName: string;
      timestamp: string;
      senderDisplay?: string;
      senderRaw?: string;
      subject?: string;
      bodyText?: string;
      attachmentName?: string;
      attachmentSize?: string;
      attachmentType?: string;
      linkUrl?: string;
      linkDisplay?: string;
    };
    targets: InspectableTarget[];
  };
  decisions: DecisionOption[];
  learningTakeaways: string[];
  rewardAbility?: {
    id: string;
    name: string;
    description: string;
    tier: 'advanced';
    command: string;
  };
  completionCertificate?: {
    id: string;
    title: string;
    field: string;
  };
}

export interface WorldLocation {
  id: LocationId;
  name: string;
  tagline: string;
  description: string;
  ambientTone: string;
  gridPos: { x: number; y: number };
  requiredTrust: number;
  missions: string[];
}

export interface MentorAnalysisResponse {
  evaluation: string;
  securityPrinciple: string;
  mentorVoice: string;
  personalizedPattern?: string;
  realWorldDefense: string;
  adaptiveRecommendation: string;
  source?: 'gemini' | 'cybermentor-engine';
}
