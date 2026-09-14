import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { playerRouter } from "./server/routes/playerRoutes";
import { toolsRouter } from "./server/routes/toolsRoutes";
import { telemetryRouter } from "./server/routes/telemetryRoutes";
import { mentorRouter } from "./server/routes/mentorRoutes";
import { scenarioRouter } from "./server/routes/scenarioRoutes";
import { missionsRouter } from "./server/routes/missionsRoutes";
import { db } from "./server/db";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// System Health and Telemetry Overview
app.get("/api/health", (_req, res) => {
  const stats = db.getSystemStats();
  res.json({
    status: "ok",
    appName: "CyberMentor AI",
    version: "2.5.0",
    aiEnabled: Boolean(process.env.GEMINI_API_KEY),
    systemStats: stats,
    timestamp: Date.now(),
  });
});

// Mount Modular API Routers
app.use("/api/player", playerRouter);
app.use("/api/tools", toolsRouter);
app.use("/api/telemetry", telemetryRouter);
app.use("/api/mentor", mentorRouter);
app.use("/api/scenarios", scenarioRouter);
app.use("/api/scenario", scenarioRouter);
app.use("/api/missions", missionsRouter);

// Vite middleware or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[CyberMentor AI] Backend Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
