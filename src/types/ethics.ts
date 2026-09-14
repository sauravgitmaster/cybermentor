import { LocationId, NPC } from '../types';

export type EthicsPrinciple =
  | 'consent'
  | 'harm'
  | 'proportionality'
  | 'duty-to-report'
  | 'privacy'
  | 'integrity'
  | 'stewardship';

export interface EthicsOption {
  id: 'A' | 'B' | 'C' | 'D';
  label: string;
  description: string;
  scores: Record<EthicsPrinciple, number>; // -2..+2
  harmIfChosen: string;
  betterFraming: string;
}

export interface ScenarioArtifact {
  title: string;
  type: 'drive-share' | 'credential-paste' | 'log-snippet' | 'chat-log';
  content: string;
  metadata: Record<string, string>;
}

export interface EthicsOp {
  id: string;
  code: string; // ETH-01, ETH-02
  title: string;
  locationId: LocationId;
  requiredTrust: number;
  npc: NPC;
  doctrineBrief: {
    title: string;
    durationHint: string;
    facts: [string, string, string];
    attackerModel: string;
    whatGoodLooksLike: string;
    relatedAbility: string;
  };
  situation: string;
  stakeholderMap: { name: string; interest: string; risk: string }[];
  artifact: ScenarioArtifact;
  options: EthicsOption[];
  emphasizedPrinciples: EthicsPrinciple[];
  recommendedOptionId: 'A' | 'B' | 'C' | 'D';
  learningObjective: string;
}

export interface EthicsAnalysisResponse {
  verdictTone: 'supports' | 'challenges' | 'mixed';
  principles: { name: EthicsPrinciple; assessment: string }[];
  whoWasHarmed: string[];
  professionalStandard: string;
  betterAction: string;
  realWorldRule: string;
  mentorVoice: string;
}
