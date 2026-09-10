export type ScenarioCategory =
  | 'phishing'
  | 'hardware'
  | 'wifi'
  | 'qr'
  | 'passwords'
  | 'social-engineering'
  | 'account-security'
  | 'privacy';

export type ScenarioDifficulty =
  | 'Level 1 — Recognize'
  | 'Level 2 — Investigate'
  | 'Level 3 — Decide'
  | 'Level 4 — Respond'
  | 'Level 5 — Analyze';

export type OptionClassification = 'secure' | 'risky' | 'dangerous';

export type RiskAssessment = 'LOW' | 'MEDIUM' | 'HIGH';

export interface ScenarioOption {
  id: 'A' | 'B' | 'C' | 'D';
  label: string;
  description: string;
  classification: OptionClassification;
  riskAssessment: RiskAssessment;
  consequence: string;
  clueContext: string;
  saferAction?: string;
}

export interface ScenarioParticipant {
  name: string;
  role: string;
  avatarType:
    | 'student-worried'
    | 'student-casual'
    | 'lab-proctor'
    | 'it-technician'
    | 'professor'
    | 'security-analyst'
    | 'fellow-researcher'
    | 'dorm-roommate';
}

export type ArtifactType =
  | 'email'
  | 'usb-device'
  | 'wifi-scanner'
  | 'qr-poster'
  | 'mfa-alert'
  | 'chat-message'
  | 'login-alert'
  | 'cloud-permissions';

export interface ScenarioArtifact {
  type: ArtifactType;
  title: string;
  subtitle?: string;
  metadata?: Record<string, string>;
  contentPreview?: string;
  clueCallout?: string;
  tags?: string[];
}

export interface ScenarioMentorFeedback {
  mentorVoice: string;
  whyExplanation: string;
  realisticOutcome: string;
  clueInsight: string;
  saferAction: string;
  principle: string;
}

export interface Scenario {
  id: string;
  number: number;
  code: string;
  title: string;
  category: ScenarioCategory;
  categoryLabel: string;
  difficulty: ScenarioDifficulty;
  environment: 'library' | 'hardware-lab' | 'cafe' | 'quad' | 'dorm' | 'office';
  environmentTitle: string;
  context: string;
  situation: string;
  participant: ScenarioParticipant;
  dialogue: string[];
  artifact: ScenarioArtifact;
  options: ScenarioOption[];
  bestOptionId: 'A' | 'B' | 'C' | 'D';
  securityPrinciple: string;
  learningObjective: string;
  deterministicFeedback: Record<'A' | 'B' | 'C' | 'D', ScenarioMentorFeedback>;
}

export interface ScenarioOpsDecisionRecord {
  scenarioId: string;
  chosenOptionId: 'A' | 'B' | 'C' | 'D';
  classification: OptionClassification;
  riskAssessment: RiskAssessment;
  timestamp: number;
}

export interface ScenarioOpsProgress {
  completedIds: string[];
  decisions: Record<string, ScenarioOpsDecisionRecord>;
  principlesLearned: string[];
}
