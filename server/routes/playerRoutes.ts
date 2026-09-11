import { Router } from "express";
import { db } from "../db";

export const playerRouter = Router();

// GET /api/player - Fetch current operative profile & server sync status
playerRouter.get("/", (_req, res) => {
  const operative = db.getOperative();
  const stats = db.getSystemStats();
  res.json({
    success: true,
    operative,
    stats,
    serverTime: Date.now(),
  });
});

// POST /api/player/sync - Two-way sync with local client state
playerRouter.post("/sync", (req, res) => {
  const clientState = req.body.operative;
  if (!clientState || typeof clientState !== "object") {
    return res.status(400).json({ success: false, error: "Invalid operative payload" });
  }

  const synced = db.syncOperative(clientState);
  res.json({
    success: true,
    operative: synced,
    stats: db.getSystemStats(),
  });
});

// POST /api/player/reset - Reset operative progress to zero-trust initial baseline
playerRouter.post("/reset", (_req, res) => {
  const fresh = db.resetOperative();
  res.json({
    success: true,
    operative: fresh,
    stats: db.getSystemStats(),
    message: "Operative dossier reset to default initial state.",
  });
});

// POST /api/player/trust - Log a trust change event
playerRouter.post("/trust", (req, res) => {
  const { delta, reason } = req.body;
  if (typeof delta !== "number" || !reason) {
    return res.status(400).json({ success: false, error: "delta (number) and reason (string) are required" });
  }

  const result = db.recordTrustDelta(delta, reason);
  res.json({
    success: true,
    newTrust: result.newTrust,
    record: result.record,
    operative: db.getOperative(),
  });
});

// POST /api/player/mission/complete - Complete a mission
playerRouter.post("/mission/complete", (req, res) => {
  const { missionId } = req.body;
  if (!missionId) {
    return res.status(400).json({ success: false, error: "missionId is required" });
  }

  const result = db.completeMission(missionId);
  res.json({
    success: true,
    operative: result.operative,
    newlyUnlockedAbilities: result.newlyUnlockedAbilities,
    newlyUnlockedAchievements: result.newlyUnlockedAchievements,
  });
});

// POST /api/player/evidence - Add an evidence item
playerRouter.post("/evidence", (req, res) => {
  const { item } = req.body;
  if (!item || !item.title) {
    return res.status(400).json({ success: false, error: "Valid evidence item is required" });
  }

  const added = db.addEvidence(item);
  res.json({
    success: true,
    added,
    operative: db.getOperative(),
  });
});

// POST /api/player/ability/unlock - Unlock an ability
playerRouter.post("/ability/unlock", (req, res) => {
  const { abilityId } = req.body;
  if (!abilityId) {
    return res.status(400).json({ success: false, error: "abilityId is required" });
  }

  const unlocked = db.unlockAbility(abilityId);
  res.json({
    success: true,
    unlocked,
    operative: db.getOperative(),
  });
});

// GET /api/player/audit - Retrieve security audit trail
playerRouter.get("/audit", (_req, res) => {
  res.json({
    success: true,
    logs: db.getAuditLogs(),
  });
});
