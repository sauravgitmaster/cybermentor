import fs from "fs";
import path from "path";
import { PlayerState, Achievement, CyberAbility, EvidenceItem, TrustChangeRecord } from "../src/types";
import { INITIAL_ABILITIES, INITIAL_ACHIEVEMENTS, DEFAULT_PLAYER_STATE } from "../src/data/initialState";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "operatives_store.json");

interface SecurityAuditLog {
  id: string;
  timestamp: number;
  type: "TRUST_CHANGE" | "MISSION_COMPLETE" | "EVIDENCE_COLLECTED" | "ABILITY_UNLOCKED" | "SYSTEM_RESET";
  operativeName: string;
  details: Record<string, any>;
}

interface TelemetryEvent {
  id: string;
  timestamp: number;
  sector: string;
  severity: "INFO" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  source: string;
  message: string;
  indicators: string[];
}

interface BackendDatabase {
  operative: PlayerState;
  auditLogs: SecurityAuditLog[];
  telemetryEvents: TelemetryEvent[];
  systemStats: {
    serverStartedAt: number;
    totalInspections: number;
    totalMitigations: number;
    threatLevel: "ELEVATED" | "GUARDED" | "CRITICAL" | "SECURE";
    networkIntegrity: number;
  };
}

// Initial Telemetry Seed Events
const INITIAL_TELEMETRY: TelemetryEvent[] = [
  {
    id: "tel-01",
    timestamp: Date.now() - 120000,
    sector: "Campus Library",
    severity: "HIGH",
    source: "MailGate IDS",
    message: "Spear-phishing wave targeting students with fake emergency aid forfeiture notices.",
    indicators: ["un1versity-help.com", "urgent-action.pdf.exe", "198.51.100.42"],
  },
  {
    id: "tel-02",
    timestamp: Date.now() - 85000,
    sector: "Student Union",
    severity: "CRITICAL",
    source: "RF Sentry AP-3",
    message: "Rogue Evil Twin access point detected broadcasting open high-gain SSID.",
    indicators: ["SSID: Campus_HighSpeed_Guest_NoPassword", "BSSID: 00:C0:CA:91:22:B4"],
  },
  {
    id: "tel-03",
    timestamp: Date.now() - 45000,
    sector: "Engineering Lab",
    severity: "HIGH",
    source: "Host Endpoint Shield",
    message: "Unrecognized HID keyboard emulation payload detected on physical USB bus.",
    indicators: ["VID: 0x16C0", "PID: 0x0486", "Descriptor: HID Keyboard"],
  },
  {
    id: "tel-04",
    timestamp: Date.now() - 15000,
    sector: "SecOps SOC Hub",
    severity: "INFO",
    source: "SecOps Core Gateway",
    message: "Operative session authenticated. Zero-Trust perimeter monitoring active.",
    indicators: ["2FA Active", "Encrypted Tunnel AES-256"],
  },
];

class DatabaseManager {
  private db: BackendDatabase;

  constructor() {
    this.db = this.loadFromDisk();
  }

  private ensureDir() {
    if (!fs.existsSync(DATA_DIR)) {
      try {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      } catch (err) {
        console.warn("Could not create data dir:", err);
      }
    }
  }

  private loadFromDisk(): BackendDatabase {
    this.ensureDir();
    if (fs.existsSync(STORE_FILE)) {
      try {
        const raw = fs.readFileSync(STORE_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        if (parsed.operative && parsed.systemStats) {
          return parsed;
        }
      } catch (err) {
        console.warn("Failed reading operatives_store.json, initializing fresh store:", err);
      }
    }

    return {
      operative: { ...DEFAULT_PLAYER_STATE },
      auditLogs: [],
      telemetryEvents: INITIAL_TELEMETRY,
      systemStats: {
        serverStartedAt: Date.now(),
        totalInspections: 14,
        totalMitigations: 0,
        threatLevel: "ELEVATED",
        networkIntegrity: 78,
      },
    };
  }

  private saveToDisk() {
    this.ensureDir();
    try {
      fs.writeFileSync(STORE_FILE, JSON.stringify(this.db, null, 2), "utf-8");
    } catch (err) {
      console.warn("Could not save to disk:", err);
    }
  }

  // Operative methods
  public getOperative(): PlayerState {
    return this.db.operative;
  }

  public updateOperative(newState: Partial<PlayerState>): PlayerState {
    this.db.operative = {
      ...this.db.operative,
      ...newState,
    };
    this.saveToDisk();
    return this.db.operative;
  }

  public syncOperative(clientState: PlayerState): PlayerState {
    // Merge client progress with server store
    const mergedMissions = Array.from(
      new Set([...this.db.operative.completedMissions, ...clientState.completedMissions])
    );
    const highestTrust = Math.max(this.db.operative.digitalTrust, clientState.digitalTrust);
    const highestLevel = Math.max(this.db.operative.level, clientState.level);

    // Merge evidence
    const evidenceMap = new Map<string, EvidenceItem>();
    [...this.db.operative.evidence, ...clientState.evidence].forEach((item) => {
      evidenceMap.set(item.title, item);
    });

    // Merge unlocked abilities
    const abilitySet = new Set<string>();
    this.db.operative.abilities.filter((a) => a.unlocked).forEach((a) => abilitySet.add(a.id));
    clientState.abilities.filter((a) => a.unlocked).forEach((a) => abilitySet.add(a.id));

    const updatedAbilities = INITIAL_ABILITIES.map((ability) => ({
      ...ability,
      unlocked: ability.unlocked || abilitySet.has(ability.id),
    }));

    // Merge achievements
    const achSet = new Set<string>();
    this.db.operative.achievements.filter((a) => a.unlocked).forEach((a) => achSet.add(a.id));
    clientState.achievements.filter((a) => a.unlocked).forEach((a) => achSet.add(a.id));

    const updatedAchievements = INITIAL_ACHIEVEMENTS.map((ach) => ({
      ...ach,
      unlocked: ach.unlocked || achSet.has(ach.id),
    }));

    this.db.operative = {
      ...clientState,
      digitalTrust: highestTrust,
      level: highestLevel,
      completedMissions: mergedMissions,
      evidence: Array.from(evidenceMap.values()),
      abilities: updatedAbilities,
      achievements: updatedAchievements,
      trustHistory:
        clientState.trustHistory.length > this.db.operative.trustHistory.length
          ? clientState.trustHistory
          : this.db.operative.trustHistory,
    };

    this.updateThreatLevel();
    this.saveToDisk();
    return this.db.operative;
  }

  public resetOperative(): PlayerState {
    this.db.operative = { ...DEFAULT_PLAYER_STATE };
    this.logAudit({
      id: `audit-${Date.now()}`,
      timestamp: Date.now(),
      type: "SYSTEM_RESET",
      operativeName: this.db.operative.name,
      details: { reason: "Manual user reset request" },
    });
    this.db.systemStats.threatLevel = "ELEVATED";
    this.db.systemStats.networkIntegrity = 78;
    this.saveToDisk();
    return this.db.operative;
  }

  public recordTrustDelta(delta: number, reason: string): { newTrust: number; record: TrustChangeRecord } {
    const current = this.db.operative.digitalTrust;
    const newTrust = Math.max(0, Math.min(100, current + delta));
    const record: TrustChangeRecord = {
      id: `trust-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: Date.now(),
      delta,
      reason,
      newScore: newTrust,
    };

    let achievements = [...this.db.operative.achievements];
    if (newTrust >= 25) {
      achievements = achievements.map((a) =>
        a.id === "ach-digital-trust-master" ? { ...a, unlocked: true } : a
      );
    }

    this.db.operative.digitalTrust = newTrust;
    this.db.operative.trustHistory = [record, ...this.db.operative.trustHistory];
    this.db.operative.achievements = achievements;

    this.logAudit({
      id: `audit-${Date.now()}`,
      timestamp: Date.now(),
      type: "TRUST_CHANGE",
      operativeName: this.db.operative.name,
      details: { delta, reason, newTrust },
    });

    this.updateThreatLevel();
    this.saveToDisk();
    return { newTrust, record };
  }

  public completeMission(missionId: string): {
    operative: PlayerState;
    newlyUnlockedAbilities: string[];
    newlyUnlockedAchievements: string[];
  } {
    const newlyUnlockedAbilities: string[] = [];
    const newlyUnlockedAchievements: string[] = [];

    if (!this.db.operative.completedMissions.includes(missionId)) {
      this.db.operative.completedMissions.push(missionId);
      this.db.systemStats.totalMitigations += 1;

      // Check achievements
      this.db.operative.achievements = this.db.operative.achievements.map((ach) => {
        if (ach.id === "ach-first-step" && !ach.unlocked) {
          newlyUnlockedAchievements.push(ach.title);
          return { ...ach, unlocked: true };
        }
        if (missionId === "mission-01-email" && ach.id === "ach-phish-disarmed" && !ach.unlocked) {
          newlyUnlockedAchievements.push(ach.title);
          return { ...ach, unlocked: true };
        }
        if (missionId === "mission-02-usb" && ach.id === "ach-hardware-defender" && !ach.unlocked) {
          newlyUnlockedAchievements.push(ach.title);
          return { ...ach, unlocked: true };
        }
        return ach;
      });

      // Unlock mission-specific abilities
      this.db.operative.abilities = this.db.operative.abilities.map((ability) => {
        if (ability.unlockedInMission === missionId && !ability.unlocked) {
          newlyUnlockedAbilities.push(ability.name);
          return { ...ability, unlocked: true };
        }
        return ability;
      });

      this.db.operative.level = Math.min(5, Math.floor(this.db.operative.completedMissions.length / 1) + 1);

      this.logAudit({
        id: `audit-${Date.now()}`,
        timestamp: Date.now(),
        type: "MISSION_COMPLETE",
        operativeName: this.db.operative.name,
        details: { missionId, newLevel: this.db.operative.level },
      });

      // Add telemetry notification
      this.addTelemetry({
        id: `tel-complete-${Date.now()}`,
        timestamp: Date.now(),
        sector: "SecOps Perimeter",
        severity: "INFO",
        source: "Incident Response Engine",
        message: `Threat contained for ${missionId}. Operative clearance upgraded to Level ${this.db.operative.level}.`,
        indicators: [`Resolved by ${this.db.operative.name}`, `Mission: ${missionId}`],
      });
    }

    this.updateThreatLevel();
    this.saveToDisk();
    return {
      operative: this.db.operative,
      newlyUnlockedAbilities,
      newlyUnlockedAchievements,
    };
  }

  public addEvidence(item: EvidenceItem): boolean {
    if (this.db.operative.evidence.some((e) => e.title === item.title)) {
      return false;
    }

    this.db.operative.evidence = [item, ...this.db.operative.evidence];

    if (this.db.operative.evidence.length >= 3) {
      this.db.operative.achievements = this.db.operative.achievements.map((ach) =>
        ach.id === "ach-evidence-collector" ? { ...ach, unlocked: true } : ach
      );
    }

    this.logAudit({
      id: `audit-${Date.now()}`,
      timestamp: Date.now(),
      type: "EVIDENCE_COLLECTED",
      operativeName: this.db.operative.name,
      details: { title: item.title, category: item.category },
    });

    this.saveToDisk();
    return true;
  }

  public unlockAbility(abilityId: string): boolean {
    let changed = false;
    this.db.operative.abilities = this.db.operative.abilities.map((a) => {
      if (a.id === abilityId && !a.unlocked) {
        changed = true;
        return { ...a, unlocked: true };
      }
      return a;
    });

    if (changed) {
      this.logAudit({
        id: `audit-${Date.now()}`,
        timestamp: Date.now(),
        type: "ABILITY_UNLOCKED",
        operativeName: this.db.operative.name,
        details: { abilityId },
      });
      this.saveToDisk();
    }
    return changed;
  }

  // Telemetry & Stats
  public getTelemetry(): TelemetryEvent[] {
    return this.db.telemetryEvents;
  }

  public addTelemetry(event: TelemetryEvent) {
    this.db.telemetryEvents = [event, ...this.db.telemetryEvents.slice(0, 19)];
    this.saveToDisk();
  }

  public getSystemStats() {
    return {
      ...this.db.systemStats,
      operativeTrust: this.db.operative.digitalTrust,
      operativeLevel: this.db.operative.level,
      missionsResolved: this.db.operative.completedMissions.length,
      evidenceLogged: this.db.operative.evidence.length,
    };
  }

  public incrementInspections() {
    this.db.systemStats.totalInspections += 1;
    this.saveToDisk();
  }

  public getAuditLogs(): SecurityAuditLog[] {
    return this.db.auditLogs.slice(0, 50);
  }

  private logAudit(log: SecurityAuditLog) {
    this.db.auditLogs = [log, ...this.db.auditLogs.slice(0, 99)];
  }

  private updateThreatLevel() {
    const completed = this.db.operative.completedMissions.length;
    if (completed >= 4) {
      this.db.systemStats.threatLevel = "SECURE";
      this.db.systemStats.networkIntegrity = 98;
    } else if (completed >= 2) {
      this.db.systemStats.threatLevel = "GUARDED";
      this.db.systemStats.networkIntegrity = 88;
    } else if (completed >= 1) {
      this.db.systemStats.threatLevel = "ELEVATED";
      this.db.systemStats.networkIntegrity = 82;
    } else {
      this.db.systemStats.threatLevel = "CRITICAL";
      this.db.systemStats.networkIntegrity = 71;
    }
  }
}

export const db = new DatabaseManager();
