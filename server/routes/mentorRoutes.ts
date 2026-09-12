import { Router } from "express";
import { GoogleGenAI } from "@google/genai";
import { db } from "../db";

export const mentorRouter = Router();

// Lazy initialization of Gemini client
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

// GET /api/mentor/status - Status of the AI Mentor Uplink
mentorRouter.get("/status", (_req, res) => {
  const isAvailable = Boolean(process.env.GEMINI_API_KEY);
  res.json({
    success: true,
    aiAvailable: isAvailable,
    mentorIdentity: "CyberMentor AI // SecOps Digital Survival Companion",
    primaryModel: isAvailable ? "gemini-3.8-flash" : "deterministic-knowledge-engine",
    activePerimeter: "Campus & Digital City Tactical Grid",
  });
});

// POST /api/mentor/analyze - Tactical evaluation of completed mission decisions
mentorRouter.post("/analyze", async (req, res) => {
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
    skillProfile,
    supportingEvidenceSelected = [],
    evidenceBonusAwarded = false,
  } = req.body;

  const client = getGeminiClient();

  if (client) {
    const prompt = `You are CyberMentor AI, a calm, analytical, and supportive cybersecurity mentor guiding a student operative through an interactive RPG training simulation.

Current Operational Context:
- Sector / Location: ${location || "Campus"}
- Mission: ${missionTitle || "The Incident"} (${missionId})
- Player Digital Trust: ${playerTrust}/100 (Decision Delta: ${trustChange > 0 ? "+" + trustChange : trustChange})
- Player Operative Level: ${playerLevel || 1}
- Evidence Uncovered in Investigation: ${evidenceCollected.length > 0 ? evidenceCollected.join(", ") : "None documented"}
- Evidence Specifically Cited to Support Decision: ${supportingEvidenceSelected.length > 0 ? supportingEvidenceSelected.join(", ") : "No supporting clues cited"}
- Evidence Reasoning Bonus: ${evidenceBonusAwarded ? "Yes (+5 Trust bonus awarded for forensic corroboration)" : "None"}
- Operative Skill Profile (Weaknesses/Focus Areas): ${skillProfile?.demonstratedWeaknesses?.join("; ") || "General Vigilance"}
- Operative Strengths: ${skillProfile?.demonstratedStrengths?.join("; ") || "Observant"}
- Decision Made: "${chosenAction?.label || "Unknown decision"}" (Outcome: ${isCorrect ? "Defensive Success" : "Perimeter Compromise"})
- Player Rationale / Action Description: "${chosenAction?.description || ""}"

Respond with concise, high-impact mentor guidance in valid JSON format only. Notice cross-mission patterns (e.g. noticing improvements in link inspection, but warning if they still fall for emotional urgency).
Output JSON schema:
{
  "evaluation": "2-3 sentences evaluating the decision based on evidence collected and investigative depth.",
  "securityPrinciple": "The fundamental security rule or mental model at play (e.g., 'Zero Trust in External Communication', 'Executable File Masquerading').",
  "mentorVoice": "A direct, calm quote from the mentor reacting to the player's judgment.",
  "personalizedPattern": "1-2 sentences recognizing their cross-mission habits or behavioral pattern (e.g., 'You are consistently checking domains, but be mindful of urgency tricks. Next time, verify via official phone or app.').",
  "realWorldDefense": "One concrete practical habit the player should use in everyday digital life.",
  "adaptiveRecommendation": "What the player should practice or investigate next in the Cyber World."
}`;

    const candidateModels = ["gemini-3.8-flash", "gemini-3.6-flash"];

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
        if (statusCode === 503 || msg.includes("503") || msg.includes("high demand")) {
          continue;
        } else {
          break;
        }
      }
    }
  }

  // Deterministic fallback with personalized cross-mission pattern recognition
  let fallbackEvaluation = "You investigated the scenario and executed a decisive operational choice.";
  let fallbackPrinciple = "Defensive Cyber Hygiene";
  let fallbackVoice = "Every keystroke and click leaves a digital footprint. Stay observant.";
  let fallbackDefense = "Verify the authenticity of communications through independent, secondary channels.";
  let fallbackRecommendation = "Proceed to the next perimeter scan.";
  let fallbackPattern = "You demonstrated evidence-based reasoning. Continue applying this forensic pause before every click.";

  if (supportingEvidenceSelected && supportingEvidenceSelected.length > 0) {
    fallbackPattern = `You cited concrete evidence (${supportingEvidenceSelected.length} verified indicator${supportingEvidenceSelected.length > 1 ? 's' : ''}) to back your choice. Relying on technical proof rather than gut feeling is the hallmark of an effective cyber investigator.`;
  } else if (!isCorrect) {
    fallbackPattern = "You've correctly explored the scenario, but responded to artificial urgency. Remember: panic is an attacker's lever to rush your decisions. Slow down and check the technical clues.";
  }

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
    personalizedPattern: fallbackPattern,
    realWorldDefense: fallbackDefense,
    adaptiveRecommendation: fallbackRecommendation,
  });
});

// POST /api/mentor/ask - Real-time conversational inquiry to CyberMentor AI
mentorRouter.post("/ask", async (req, res) => {
  const { question, currentSector, activeMissionId } = req.body;
  if (!question || typeof question !== "string") {
    return res.status(400).json({ success: false, error: "question string is required" });
  }

  const operative = db.getOperative();
  const client = getGeminiClient();

  if (client) {
    try {
      const prompt = `You are CyberMentor AI, a calm, deeply knowledgeable, encouraging cybersecurity advisor and instructor in an interactive training world.
Operative State:
- Name: ${operative.name}
- Level: ${operative.level}
- Digital Trust Rating: ${operative.digitalTrust}/100
- Completed Missions: ${operative.completedMissions.join(", ") || "None yet"}
- Current Sector: ${currentSector || "Campus Perimeter"}
- Active Mission Focus: ${activeMissionId || "General Inquiry"}

Operative asks: "${question}"

Provide a direct, inspiring, and technically accurate answer (2-4 paragraphs maximum). Include:
1. Direct answer to their question with practical mental models (e.g. Zero-Trust, Defense-in-depth, Principle of Least Privilege).
2. One concrete real-world tip or habit they can adopt today.
3. Brief suggestion for what to observe or investigate in the simulation world.

Keep the tone calm, professional, tactical, and supportive.`;

      const candidateModels = ["gemini-3.8-flash", "gemini-3.6-flash"];
      let answerText = "";
      for (const modelName of candidateModels) {
        try {
          const response = await client.models.generateContent({
            model: modelName,
            contents: prompt,
          });

          if (response.text) {
            answerText = response.text.trim();
            break;
          }
        } catch (modelErr) {
          console.warn(`Gemini ask attempt with ${modelName} failed:`, modelErr);
        }
      }

      if (answerText) {
        return res.json({
          success: true,
          source: "gemini",
          answer: answerText,
        });
      }
    } catch (err) {
      console.warn("Gemini ask fallback triggered:", err);
    }
  }

  // Deterministic knowledge base answers for common cybersecurity queries
  const qLower = question.toLowerCase();
  let answer = "";

  if (qLower.includes("trust") || qLower.includes("zero trust")) {
    answer = `Zero Trust is our core operational principle: "Never trust, always verify." In traditional network setups, anything inside the perimeter was assumed safe. Today, attackers bypass perimeters routinely. Therefore, every request, link, packet, and thumb drive must prove its identity regardless of where it originates.`;
  } else if (qLower.includes("phish") || qLower.includes("email") || qLower.includes("domain")) {
    answer = `Spear-phishing relies on artificial urgency to short-circuit human skepticism. When evaluating any urgent communication:
1. Scrutinize the domain name after the '@' sign—watch for leetspeak or character swaps like 'un1versity'.
2. Inspect the file extension: genuine PDFs never end in '.pdf.exe'.
3. Always verify out-of-band: contact the institution directly via phone or official bookmarked portal.`;
  } else if (qLower.includes("usb") || qLower.includes("drive") || qLower.includes("hardware")) {
    answer = `A lost USB drive is rarely an accident. BadUSB attacks do not simply hold viruses—they reprogram the microcontroller to emulate a Human Interface Device (HID), such as a high-speed keyboard. Once inserted, it types hundreds of commands per second to download reverse shells before antivirus even reacts. Never connect unvetted hardware to any trusted endpoint.`;
  } else if (qLower.includes("wifi") || qLower.includes("wi-fi") || qLower.includes("network") || qLower.includes("evil twin")) {
    answer = `Open Wi-Fi networks transmit plaintext radio frames across the physical air. In an Evil Twin attack, an attacker uses a high-gain antenna to broadcast a matching campus SSID. Any device that connects routes its traffic through the attacker's proxy. Enforce 802.1X enterprise certificates and an authenticated VPN tunnel whenever operating in public spaces.`;
  } else if (qLower.includes("qr") || qLower.includes("sticker") || qLower.includes("qrljacking")) {
    answer = `A QR code is simply an executable URL encoded into graphical matrix dots. In physical spaces like metro ticket kiosks, attackers paste adhesive vinyl stickers over authentic codes. Scanning them triggers automatic deep links that can authorize unauthorized banking transfers. Always physically inspect the sticker and preview destination URLs.`;
  } else {
    answer = `Stay alert, Operative ${operative.name}. The digital domain rewards disciplined observation over hurried clicks. Continue gathering evidence in the local sector, inspect anomalous indicators with your forensic tools, and verify all credentials before taking action.`;
  }

  return res.json({
    success: true,
    source: "knowledge-engine",
    answer,
  });
});
