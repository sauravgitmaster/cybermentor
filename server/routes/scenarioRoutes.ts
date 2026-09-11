import { Router } from "express";
import { GoogleGenAI } from "@google/genai";
import { SCENARIOS } from "../../src/data/scenarios";

export const scenarioRouter = Router();

// GET /api/scenarios - Return available tactical scenario challenges
scenarioRouter.get("/", (_req, res) => {
  res.json({
    success: true,
    scenarios: SCENARIOS,
  });
});

// POST /api/scenarios/debrief - Debrief scenario choices
scenarioRouter.post("/debrief", async (req, res) => {
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
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
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

      const candidateModels = ["gemini-3.8-flash", "gemini-3.6-flash"];
      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
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
        } catch (modelErr) {
          console.warn(`Gemini Scenario Debrief model ${modelName} error:`, modelErr);
        }
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
    realisticOutcome:
      chosenOption?.consequence ||
      "Attackers exploit cognitive pressure to extract credentials or execute payloads.",
    clueInsight:
      clueInsight || "Always examine technical parameters, domain spellings, and physical media integrity.",
    saferAction: bestOption?.label || "Verify independently out-of-band.",
    principle: securityPrinciple || "Verify before trust. Defense-in-depth protects the whole network.",
  });
});
