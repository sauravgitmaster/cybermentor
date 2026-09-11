import { Router } from "express";
import { MISSIONS } from "../../src/data/missions";
import { db } from "../db";

export const missionsRouter = Router();

// GET /api/missions - Get all missions overview
missionsRouter.get("/", (_req, res) => {
  const operative = db.getOperative();
  const list = Object.values(MISSIONS).map((m) => ({
    id: m.id,
    locationId: m.locationId,
    code: m.code,
    title: m.title,
    concept: m.concept,
    threatCategory: m.threatCategory,
    difficulty: m.difficulty,
    requiredTrust: m.requiredTrust,
    isCompleted: operative.completedMissions.includes(m.id),
    isUnlocked: operative.digitalTrust >= m.requiredTrust,
    npcName: m.npc.name,
    npcRole: m.npc.role,
    locationName: m.npc.location,
  }));

  res.json({
    success: true,
    missions: list,
  });
});

// GET /api/missions/:id - Get detailed mission dossier
missionsRouter.get("/:id", (req, res) => {
  const mission = MISSIONS[req.params.id];
  if (!mission) {
    return res.status(404).json({ success: false, error: "Mission not found" });
  }

  const operative = db.getOperative();
  res.json({
    success: true,
    mission,
    operativeStatus: {
      isCompleted: operative.completedMissions.includes(mission.id),
      hasRequiredTrust: operative.digitalTrust >= mission.requiredTrust,
    },
  });
});

// POST /api/missions/:id/action - Evaluate action choice server-side
missionsRouter.post("/:id/action", (req, res) => {
  const mission = MISSIONS[req.params.id];
  if (!mission) {
    return res.status(404).json({ success: false, error: "Mission not found" });
  }

  const { decisionId } = req.body;
  const chosenDecision = mission.decisions.find((d) => d.id === decisionId);

  if (!chosenDecision) {
    return res.status(400).json({ success: false, error: "Invalid decision ID" });
  }

  res.json({
    success: true,
    missionId: mission.id,
    decision: chosenDecision,
    isOptimal: chosenDecision.isOptimal,
    trustChange: chosenDecision.trustChange,
    consequenceText: chosenDecision.consequenceText,
    immediateReaction: chosenDecision.immediateReaction,
  });
});
