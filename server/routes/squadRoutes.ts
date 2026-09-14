import { Router } from "express";

export interface SquadEntry {
  id: string;
  squadCode: string;
  squadName: string;
  callsign: string;
  totalScore: number;
  trustScore: number;
  ethicsScore: number;
  missionsCompleted: number;
  badgesUnlocked: number;
  teamSize: number;
  lastActive: string;
  badge: string;
}

export const squadRouter = Router();

// In-memory squad store seeded with CM-DEMO exhibition squads
const SQUAD_STORE: SquadEntry[] = [
  {
    id: 'squad-cm-01',
    squadCode: 'CM-DEMO-01',
    squadName: 'Echo Vanguard SecOps',
    callsign: 'Specter-Lead',
    totalScore: 2840,
    trustScore: 95,
    ethicsScore: 94,
    missionsCompleted: 4,
    badgesUnlocked: 6,
    teamSize: 4,
    lastActive: '12m ago',
    badge: '🏆 DIAMOND DEFENDER',
  },
  {
    id: 'squad-cm-02',
    squadCode: 'CM-DEMO-02',
    squadName: 'Zero-Day Shield Protocol',
    callsign: 'Kestrel-09',
    totalScore: 2510,
    trustScore: 88,
    ethicsScore: 96,
    missionsCompleted: 4,
    badgesUnlocked: 5,
    teamSize: 3,
    lastActive: '34m ago',
    badge: '🛡️ ETHICS STEWARD',
  },
  {
    id: 'squad-cm-03',
    squadCode: 'CM-DEMO-03',
    squadName: 'Packet Phantoms',
    callsign: 'Ghost-Wire',
    totalScore: 2190,
    trustScore: 82,
    ethicsScore: 84,
    missionsCompleted: 3,
    badgesUnlocked: 4,
    teamSize: 4,
    lastActive: '1h ago',
    badge: '⚡ RF SPECIALIST',
  },
  {
    id: 'squad-cm-04',
    squadCode: 'CM-DEMO-04',
    squadName: 'Bit Sentinel Division',
    callsign: 'Aegis-3',
    totalScore: 1850,
    trustScore: 76,
    ethicsScore: 88,
    missionsCompleted: 3,
    badgesUnlocked: 3,
    teamSize: 2,
    lastActive: '2h ago',
    badge: '🔍 IOC FORENSICIST',
  },
  {
    id: 'squad-cm-05',
    squadCode: 'CM-DEMO-05',
    squadName: 'Cyber Cadet Unit 7',
    callsign: 'Rook-Novice',
    totalScore: 1420,
    trustScore: 65,
    ethicsScore: 78,
    missionsCompleted: 2,
    badgesUnlocked: 2,
    teamSize: 3,
    lastActive: '3h ago',
    badge: '🔰 APPRENTICE',
  },
];

// GET /api/squad/board - Retrieve current squad leaderboard standings
squadRouter.get("/board", (_req, res) => {
  const sorted = [...SQUAD_STORE].sort((a, b) => b.totalScore - a.totalScore);
  res.json({
    success: true,
    exhibitionSeed: "CM-DEMO",
    count: sorted.length,
    leaderboard: sorted,
  });
});

// POST /api/squad/submit - Submit or update local player/squad score
squadRouter.post("/submit", (req, res) => {
  const {
    squadCode = 'CM-OPERATIVE',
    squadName = 'Independent SecOps',
    callsign = 'Operative',
    trustScore = 20,
    ethicsScore = 50,
    missionsCompleted = 0,
    badgesUnlocked = 0,
    teamSize = 1,
  } = req.body;

  // Calculate composite score
  const computedScore =
    trustScore * 15 +
    ethicsScore * 10 +
    missionsCompleted * 300 +
    badgesUnlocked * 100;

  const existingIdx = SQUAD_STORE.findIndex(
    (s) => s.squadCode.toUpperCase() === squadCode.toUpperCase()
  );

  const entry: SquadEntry = {
    id: existingIdx >= 0 ? SQUAD_STORE[existingIdx].id : `squad-${Date.now()}`,
    squadCode: squadCode.toUpperCase(),
    squadName,
    callsign,
    totalScore: computedScore,
    trustScore,
    ethicsScore,
    missionsCompleted,
    badgesUnlocked,
    teamSize,
    lastActive: 'Just now',
    badge:
      trustScore >= 80 && ethicsScore >= 85
        ? '🏆 DIAMOND DEFENDER'
        : ethicsScore >= 85
        ? '🛡️ ETHICS STEWARD'
        : missionsCompleted >= 3
        ? '⚡ RF SPECIALIST'
        : '🔰 FIELD CADET',
  };

  if (existingIdx >= 0) {
    SQUAD_STORE[existingIdx] = entry;
  } else {
    SQUAD_STORE.push(entry);
  }

  const sorted = [...SQUAD_STORE].sort((a, b) => b.totalScore - a.totalScore);
  const rank = sorted.findIndex((s) => s.squadCode === entry.squadCode) + 1;

  res.json({
    success: true,
    rank,
    entry,
    totalSquads: sorted.length,
  });
});
