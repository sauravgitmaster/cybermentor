import { PlayerState, EvidenceItem, TrustChangeRecord } from '../types';

export interface BackendStatus {
  online: boolean;
  aiEnabled: boolean;
  version?: string;
  threatLevel?: string;
  networkIntegrity?: number;
}

export interface DomainAnalysis {
  domain: string;
  isSuspicious: boolean;
  threatCategory: string;
  riskScore: number;
  targetMatch?: {
    legitimateDomain: string;
    similarityPercent: number;
  };
  detectedAnomalies: string[];
  recommendation: string;
}

export interface HashAnalysis {
  inputName: string;
  fileSizeEstimate: number;
  md5: string;
  sha1: string;
  sha256: string;
  entropy: number;
  isPackedOrEncrypted: boolean;
  signatureMatch?: string;
  isMalicious: boolean;
  detectedIndicators: string[];
  recommendation: string;
}

export interface HeaderAnalysis {
  fromAddress: string;
  returnPath: string;
  replyTo?: string;
  clientIp: string;
  spfStatus: 'PASS' | 'FAIL' | 'SOFTFAIL' | 'NONE';
  dkimStatus: 'PASS' | 'FAIL' | 'INVALID' | 'NONE';
  dmarcStatus: 'PASS' | 'FAIL' | 'NOT_CONFIGURED';
  isSpoofed: boolean;
  forensicSummary: string[];
}

export interface QRAnalysis {
  rawPayload: string;
  protocol: string;
  isDeepLink: boolean;
  destinationHost: string;
  hasExecutableExtension: boolean;
  isImmediateAction: boolean;
  verdict: 'BENIGN' | 'SUSPICIOUS' | 'MALICIOUS';
  riskFactors: string[];
  mitigation: string;
}

export interface TelemetryEvent {
  id: string;
  timestamp: number;
  sector: string;
  severity: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  source: string;
  message: string;
  indicators: string[];
}

export interface RadarSector {
  id: string;
  name: string;
  status: string;
  threatVector: string;
  severity: string;
}

export interface TelemetryData {
  stats: {
    serverStartedAt: number;
    totalInspections: number;
    totalMitigations: number;
    threatLevel: string;
    networkIntegrity: number;
    operativeTrust: number;
    operativeLevel: number;
    missionsResolved: number;
    evidenceLogged: number;
  };
  events: TelemetryEvent[];
  radarSectors: RadarSector[];
}

export const api = {
  // 1. Health check
  async checkHealth(): Promise<BackendStatus> {
    try {
      const res = await fetch('/api/health');
      if (!res.ok) throw new Error('Health check failed');
      const data = await res.json();
      return {
        online: true,
        aiEnabled: Boolean(data.aiEnabled),
        version: data.version,
        threatLevel: data.systemStats?.threatLevel,
        networkIntegrity: data.systemStats?.networkIntegrity,
      };
    } catch {
      return {
        online: false,
        aiEnabled: false,
      };
    }
  },

  // 2. Operative State Management
  async getPlayerState(): Promise<{ operative: PlayerState | null; online: boolean }> {
    try {
      const res = await fetch('/api/player');
      if (!res.ok) throw new Error('Failed to fetch player');
      const data = await res.json();
      return {
        operative: data.operative,
        online: true,
      };
    } catch (e) {
      return {
        operative: null,
        online: false,
      };
    }
  },

  async syncPlayerState(state: PlayerState): Promise<PlayerState | null> {
    try {
      const res = await fetch('/api/player/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operative: state }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.operative;
    } catch {
      return null;
    }
  },

  async recordTrustChange(
    delta: number,
    reason: string
  ): Promise<{ newTrust: number; record: TrustChangeRecord; operative: PlayerState } | null> {
    try {
      const res = await fetch('/api/player/trust', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ delta, reason }),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async completeMission(missionId: string): Promise<{
    operative: PlayerState;
    newlyUnlockedAbilities: string[];
    newlyUnlockedAchievements: string[];
  } | null> {
    try {
      const res = await fetch('/api/player/mission/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ missionId }),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async addEvidence(item: EvidenceItem): Promise<{ added: boolean; operative: PlayerState } | null> {
    try {
      const res = await fetch('/api/player/evidence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item }),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async unlockAbility(abilityId: string): Promise<{ unlocked: boolean; operative: PlayerState } | null> {
    try {
      const res = await fetch('/api/player/ability/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ abilityId }),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async resetPlayerState(): Promise<PlayerState | null> {
    try {
      const res = await fetch('/api/player/reset', {
        method: 'POST',
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.operative;
    } catch {
      return null;
    }
  },

  // 3. Telemetry & Threat Radar
  async getTelemetry(): Promise<TelemetryData | null> {
    try {
      const res = await fetch('/api/telemetry/live');
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  // 4. Interactive Forensic Tools Sandbox
  async analyzeDomain(domain: string): Promise<DomainAnalysis | null> {
    try {
      const res = await fetch('/api/tools/domain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.analysis;
    } catch {
      return null;
    }
  },

  async analyzeHash(fileName: string, snippet?: string): Promise<HashAnalysis | null> {
    try {
      const res = await fetch('/api/tools/hash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, snippet }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.analysis;
    } catch {
      return null;
    }
  },

  async analyzeHeaders(headers: string): Promise<HeaderAnalysis | null> {
    try {
      const res = await fetch('/api/tools/header', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headers }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.analysis;
    } catch {
      return null;
    }
  },

  async analyzeQR(payload: string): Promise<QRAnalysis | null> {
    try {
      const res = await fetch('/api/tools/qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.analysis;
    } catch {
      return null;
    }
  },

  async getToolSamples(): Promise<any> {
    try {
      const res = await fetch('/api/tools/samples');
      if (!res.ok) return null;
      const data = await res.json();
      return data.samples;
    } catch {
      return null;
    }
  },

  // 5. AI Mentor Comms
  async askMentor(question: string, currentSector?: string, activeMissionId?: string): Promise<string> {
    try {
      const res = await fetch('/api/mentor/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, currentSector, activeMissionId }),
      });
      if (!res.ok) throw new Error('Mentor uplink error');
      const data = await res.json();
      return data.answer || 'No transmission received from SecOps.';
    } catch {
      return 'SecOps comms relay is currently recalibrating. Rely on your local threat indicators and verify before trust.';
    }
  },
};
