import { Router } from "express";
import { db } from "../db";

export const telemetryRouter = Router();

// GET /api/telemetry/live - Real-time incident radar & telemetry
telemetryRouter.get("/live", (_req, res) => {
  const events = db.getTelemetry();
  const stats = db.getSystemStats();

  res.json({
    success: true,
    stats,
    events,
    radarSectors: [
      {
        id: "campus-library",
        name: "Campus Library Commons",
        status: stats.missionsResolved >= 1 ? "SECURED" : "ATTACK_ACTIVE",
        threatVector: "Spear-Phishing Credential Harvester",
        severity: stats.missionsResolved >= 1 ? "LOW" : "HIGH",
      },
      {
        id: "campus-union",
        name: "Student Union Cafe",
        status: stats.missionsResolved >= 3 ? "SECURED" : "SURVEILLANCE",
        threatVector: "Rogue 802.11 Evil Twin Access Point",
        severity: stats.missionsResolved >= 3 ? "LOW" : "HIGH",
      },
      {
        id: "campus-engineering",
        name: "Engineering Lab Room 204",
        status: stats.missionsResolved >= 2 ? "SECURED" : "CONTAINED",
        threatVector: "Physical Hardware BadUSB Keystroke Injection",
        severity: stats.missionsResolved >= 2 ? "LOW" : "MEDIUM",
      },
      {
        id: "digital-city-metro",
        name: "Metro Transit Plaza",
        status: stats.missionsResolved >= 4 ? "SECURED" : "MONITORED",
        threatVector: "QRLjacking / Tampered QR Payment Code",
        severity: stats.missionsResolved >= 4 ? "LOW" : "MEDIUM",
      },
      {
        id: "secops-command",
        name: "SecOps SOC Hub",
        status: "FORTIFIED",
        threatVector: "Zero-Trust Active Monitoring",
        severity: "LOW",
      },
    ],
  });
});

// POST /api/telemetry/report - Dispatch a new threat indicator from the field
telemetryRouter.post("/report", (req, res) => {
  const { sector, message, severity = "MEDIUM", indicators = [] } = req.body;
  if (!sector || !message) {
    return res.status(400).json({ success: false, error: "sector and message are required" });
  }

  const newEvent = {
    id: `tel-user-${Date.now()}`,
    timestamp: Date.now(),
    sector,
    severity,
    source: "Field Operative Sentry",
    message,
    indicators,
  };

  db.addTelemetry(newEvent);
  res.json({
    success: true,
    event: newEvent,
    stats: db.getSystemStats(),
  });
});
