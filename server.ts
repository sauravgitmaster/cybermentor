import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    appName: "CyberMentor AI",
    aiEnabled: Boolean(process.env.GEMINI_API_KEY),
  });
});

// AI Mentor Analysis Endpoint
app.post("/api/mentor/analyze", async (req, res) => {
  const {
    missionId,
    missionTitle,
    location,
    evidenceCollected = [],
    chosenAction,
    isCorrect,
    trustChange,
    playerTrust,
    playerLevel,
  } = req.body;

  const client = getGeminiClient();

  // If Gemini API is available, generate contextual, in-depth evaluation
  if (client) {
    const prompt = `You are CyberMentor AI, a calm, analytical, and supportive cybersecurity mentor guiding a student operative through a digital survival training simulation.

Current Context:
- Location: ${location || "Campus"}
- Mission: ${missionTitle || "The Incident"} (${missionId})
- Player Digital Trust: ${playerTrust}/100 (Trust Delta: ${trustChange > 0 ? "+" + trustChange : trustChange})
- Player Level: ${playerLevel || 1}
- Evidence Uncovered: ${evidenceCollected.length > 0 ? evidenceCollected.join(", ") : "None documented"}
- Decision Made: "${chosenAction?.label || "Unknown decision"}" (Outcome: ${isCorrect ? "Successful Defense" : "Security Compromise/Near Miss"})
- Player Rationale / Action Description: "${chosenAction?.description || ""}"

Respond with concise, high-impact mentor guidance in valid JSON format only.
Output JSON schema:
{
  "evaluation": "2-3 sentences evaluating the decision based on evidence collected and investigative depth.",
  "securityPrinciple": "The fundamental security rule or mental model at play (e.g., 'Zero Trust in External Communication', 'Executable File Masquerading').",
  "mentorVoice": "A direct, calm quote from the mentor reacting to the player's judgment.",
  "realWorldDefense": "One concrete practical habit the player should use in everyday digital life.",
  "adaptiveRecommendation": "What the player should investigate next in the Cyber World."
}`;

    // Try primary model first, with a fallback model if 503 / high demand spikes occur
    const candidateModels = ["gemini-3.8-flash", "gemini-flash-latest"];

    for (const modelName of candidateModels) {
      try {
        const response = await client.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.3,
          },
        });

        const responseText = response.text || "";
        if (responseText) {
          const parsed = JSON.parse(responseText.trim());
          return res.json({
            success: true,
            source: "gemini",
            ...parsed,
          });
        }
      } catch (err: any) {
        const statusCode = err?.status || err?.error?.code || err?.code;
        const msg = err?.message || String(err);
        // Only log a concise diagnostic notice instead of an uncaught crash warning
        if (statusCode === 503 || msg.includes("503") || msg.includes("high demand")) {
          // Model temporarily unavailable due to demand spike; try alternative model or fall back cleanly
          continue;
        } else {
          // Other unexpected API error, fall through cleanly
          break;
        }
      }
    }
  }

  // High-fidelity Deterministic Mentor Knowledge Engine fallback
  let fallbackEvaluation = "You investigated the scenario and executed a decisive operational choice.";
  let fallbackPrinciple = "Defensive Cyber Hygiene";
  let fallbackVoice = "Every keystroke and click leaves a digital footprint. Stay observant.";
  let fallbackDefense = "Verify the authenticity of communications through independent, secondary channels.";
  let fallbackRecommendation = "Proceed to the next perimeter scan.";

  if (missionId === "mission-01-email") {
    if (isCorrect) {
      fallbackEvaluation =
        "Excellent forensic discipline. You spotted the lookalike domain (un1versity-help.com) and the deceptive executable payload before taking action. Advising the student and reporting to SecOps contained the breach.";
      fallbackPrinciple = "Domain Verification & Executable Extension Awareness";
      fallbackVoice =
        "Sharp eye. The attacker was counting on panic and urgency to blind you. You slowed down and read the indicators.";
      fallbackDefense =
        "Always inspect the true domain suffix and never trust double-extension files like .pdf.exe.";
      fallbackRecommendation =
        "An unclaimed storage drive was recovered at the campus lab. Learn the risks of rogue hardware.";
    } else {
      fallbackEvaluation =
        "You reacted to the urgency without thoroughly validating the underlying sender and payload. Opening untrusted files executes arbitrary code directly within your memory space.";
      fallbackPrinciple = "The Principle of Suspicion & Payload Isolation";
      fallbackVoice =
        "A costly lesson, but a safe one in our sandbox. Urgency is the attacker's favorite weapon to bypass your critical thinking.";
      fallbackDefense =
        "Never open attachments or verify credentials from emails claiming urgent account termination.";
      fallbackRecommendation =
        "Review the evidence log to observe how typosquatting and fake headers operate.";
    }
  } else if (missionId === "mission-02-usb") {
    if (isCorrect) {
      fallbackEvaluation =
        "Proper containment protocol. Plugging an unknown flash drive into a networked device invites BadUSB or HID injection attacks. Handing it to SecOps preserved physical perimeter integrity.";
      fallbackPrinciple = "Hardware Trust & Air-Gapped Triage";
      fallbackVoice =
        "Curiosity is human; discipline is defensive. You kept the payload quarantined.";
      fallbackDefense =
        "Never insert stray flash drives. Modern payloads can emulate keyboards to type terminal commands in milliseconds.";
      fallbackRecommendation =
        "Proceed to Student Union Cafe to examine public Wi-Fi and captive portals.";
    } else {
      fallbackEvaluation =
        "Inserting an untrusted drive can trigger malicious HID keystrokes or silent dropper scripts before any antivirus can intervene.";
      fallbackPrinciple = "Physical Hardware Attack Vectors (BadUSB)";
      fallbackVoice =
        "A labeled drive ('Exams') is the oldest bait in the book. Social engineering often arrives in plastic and silicon.";
      fallbackDefense =
        "Treat unknown physical media with the same suspicion as an unvetted email attachment.";
      fallbackRecommendation =
        "Re-examine device autorun protections and hardware isolation.";
    }
  } else if (missionId === "mission-03-wifi") {
    if (isCorrect) {
      fallbackEvaluation =
        "Outstanding situational awareness. Inspecting the BSSID prefix revealed a portable penetration testing card rather than campus enterprise infrastructure. Elena's research paper was submitted safely through encrypted channels.";
      fallbackPrinciple = "Mutual Authentication & Evil Twin Detection";
      fallbackVoice =
        "Signal strength is not trust. Anyone with twenty dollars of hardware can broadcast your campus name.";
      fallbackDefense =
        "Always use verified WPA2/WPA3 enterprise networks with 802.1X and enforce an always-on VPN across public spaces.";
      fallbackRecommendation =
        "Proceed to Digital City to inspect commuter terminals and QR-based threats.";
    } else {
      fallbackEvaluation =
        "Connecting to an unauthenticated open network exposes all plaintext traffic and DNS queries to an attacker proxy, enabling SSL stripping and session credential hijacking.";
      fallbackPrinciple = "Eavesdropping & Man-in-the-Middle (MitM) Vulnerabilities";
      fallbackVoice =
        "Convenience and fast speed are the classic hooks. An unencrypted airwave belongs to whoever is listening.";
      fallbackDefense =
        "Never associate with open Wi-Fi networks without an independent, end-to-end encrypted VPN tunnel.";
      fallbackRecommendation =
        "Review RF beacon telemetry to observe how portable attacker transceivers impersonate campus SSIDs.";
    }
  } else if (missionId === "mission-04-qr-scam") {
    if (isCorrect) {
      fallbackEvaluation =
        "Superb observational discipline. Detecting the tactile sticker overlay prevented Tariq from triggering an automated $250 mobile banking transfer intent to an offshore escrow wallet.";
      fallbackPrinciple = "Physical Barcode Tampering (QRLjacking) & Intent Verification";
      fallbackVoice =
        "A QR code is just an unreadable executable link printed in ink. You checked the substrate before taking the leap.";
      fallbackDefense =
        "Always feel and inspect public QR codes for physical sticker overlays, and preview the full destination domain before allowing banking apps to act.";
      fallbackRecommendation =
        "Return to base to examine the cataloged evidence and unlock advanced forensics abilities.";
    } else {
      fallbackEvaluation =
        "Scanning an unverified QR code directed the mobile browser to a malicious deep-link intent that pre-populated an irreversible financial transfer.";
      fallbackPrinciple = "Blind Code Execution via Physical Media";
      fallbackVoice =
        "The attacker turned physical curiosity into instant digital exfiltration. Never scan a code without confirming its source.";
      fallbackDefense =
        "Disable automatic URL opening in your mobile camera app and verify payment kiosk stickers with station authorities.";
      fallbackRecommendation =
        "Examine the evidence notebook for deep link intent structures.";
    }
  }

  return res.json({
    success: true,
    source: "cybermentor-engine",
    evaluation: fallbackEvaluation,
    securityPrinciple: fallbackPrinciple,
    mentorVoice: fallbackVoice,
    realWorldDefense: fallbackDefense,
    adaptiveRecommendation: fallbackRecommendation,
  });
});

// Scenario Ops Debrief Endpoint
app.post("/api/scenario/debrief", async (req, res) => {
  const {
    scenarioId,
    scenarioTitle,
    category,
    situation,
    chosenOption,
    bestOption,
    securityPrinciple,
    clueInsight,
  } = req.body;

  if (process.env.GEMINI_API_KEY) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `You are CyberMentor AI, a calm, disciplined 2D cybersecurity RPG tactical instructor.
A student in Scenario Ops faced the following authentic situation:
Scenario: "${scenarioTitle}" (${category})
Situation: ${situation}
Student Chosen Action (${chosenOption?.classification?.toUpperCase()}): "${chosenOption?.label}"
Consequence: "${chosenOption?.consequence}"
Ideal Action: "${bestOption?.label}"
Key Principle: "${securityPrinciple}"
Technical Clue: "${clueInsight}"

Provide concise tactical debriefing in valid JSON format:
{
  "mentorVoice": "A sharp, 1-2 sentence direct mentor remark reflecting on their judgment",
  "whyExplanation": "Clear, concise technical explanation of why this action was ${chosenOption?.classification}",
  "realisticOutcome": "Realistic operational consequence of this decision in an organization or university",
  "clueInsight": "The specific indicator or evidence they should remember",
  "saferAction": "The safest defensive response protocol",
  "principle": "${securityPrinciple}"
}
Only output the raw JSON object, without markdown quotes or formatting.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        return res.json({
          success: true,
          source: "gemini-ai",
          ...parsed,
        });
      }
    } catch (err) {
      console.warn("Gemini Scenario Debrief fallback triggered:", err);
    }
  }

  // Deterministic fallback response
  return res.json({
    success: true,
    source: "cybermentor-scenario-engine",
    mentorVoice:
      chosenOption?.classification === "secure"
        ? "Exemplary operational discipline. You verified the indicators before committing action."
        : "Urgency and superficial trust bypassed your skepticism. Review the critical indicators.",
    whyExplanation:
      chosenOption?.classification === "secure"
        ? "You took an authoritative verification path that preserved system integrity without introducing unvetted variables."
        : "Acting on unverified external prompts introduces unauthorized attack vectors into trusted systems.",
    realisticOutcome: chosenOption?.consequence || "Attackers exploit cognitive pressure to extract credentials or execute payloads.",
    clueInsight: clueInsight || "Always examine technical parameters, domain spellings, and physical media integrity.",
    saferAction: bestOption?.label || "Verify independently out-of-band.",
    principle: securityPrinciple || "Verify before trust. Defense-in-depth protects the whole network.",
  });
});

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
    console.log(`CyberMentor AI Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
