import { Router } from "express";
import { GoogleGenAI } from "@google/genai";

export const mangaRouter = Router();

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

// GET /api/manga/status
mangaRouter.get("/status", (_req, res) => {
  res.json({
    success: true,
    feature: "CyberMentor Manga Learning Engine",
    aiEnabled: Boolean(process.env.GEMINI_API_KEY),
    model: process.env.GEMINI_API_KEY ? "gemini-3.8-flash" : "deterministic-story-synthesizer",
  });
});

// POST /api/manga/generate
mangaRouter.post("/generate", async (req, res) => {
  const {
    topicId = "phishing",
    topicLabel = "Phishing",
    genreId = "comedy",
    genreLabel = "Comedy",
    studentName = "Ren",
    weaknessContext = "Needs practice identifying deceptive urgency and lookalike domains",
    customPrompt = "",
  } = req.body;

  const client = getGeminiClient();

  if (client) {
    const prompt = `You are the narrative engine for CyberMentor AI's CYBER MANGA system.
Create an original 8-panel manga/manhwa-inspired educational comic teaching a cybersecurity concept that the student struggles with.

STRICT SAFETY AND COPYRIGHT RULES:
- Use 100% ORIGINAL fictional characters, original environments, and original dialogue.
- Protagonist: Fictional student operative "${studentName || 'Ren'}" (relatable student with hoodies/sneakers/tech gear).
- Guide: Recurring companion "CyberMentor AI" (a calm, witty, neon holographic tactical AI that appears beside the student).
- Absolutely NO copyrighted or trademarked manga/anime characters (no Naruto, Luffy, Goku, etc.).
- Broad visual language of manga/manhwa: expressive reactions, visual sound effects (e.g. *BA-DUMP!*, *PING!*, *WHOOSH!*, *GASP!*, *BZZT!*, *DODON!!*), speed lines, dramatic shadows, speech bubbles.

SPECIFICATIONS:
- Cybersecurity Topic: ${topicLabel} (${topicId})
- Story Genre: ${genreLabel} (${genreId})
- Student's Weak Area / Learning Objective: ${weaknessContext}
${customPrompt ? `- Specific Direction: ${customPrompt}` : ""}

STRUCTURE REQUIREMENTS (8 PANELS):
1. PANEL 1 (story): Introduce the character and relatable campus/student situation.
2. PANEL 2 (problem): Introduce the specific cybersecurity threat or dilemma.
3. PANEL 3 (clue): Reveal subtle forensic clues, technical discrepancies, or warning signs.
4. PANEL 4 (tension or comedy): Create heightened tension or humorous panic as the stakes escalate.
5. PANEL 5 (decision): Present the interactive decision moment ("WHAT WOULD YOU DO?"). The story pauses here!
6. PANEL 6 (consequence): Reveal what happens when the correct defensive choice is executed.
7. PANEL 7 (mentor): CyberMentor AI provides a calm, student-friendly explanation of why the threat worked.
8. PANEL 8 (principle): Unroll the golden cybersecurity takeaway rule/mnemonic (e.g. "Pause → Inspect → Verify").

DECISION REQUIREMENT:
- A decision moment with 4 options (A, B, C, D) where:
  - Exactly ONE option is the secure/correct choice.
  - The other three represent common mistakes (e.g., panicking, blind trust, forwarding panic, contacting the attacker).
  - Each option must include consequenceTitle, consequenceReaction, consequenceText, and mentorCritique.

AI MENTOR DEBRIEF:
- quote: Punchy memorable quote.
- explanation: 2-3 sentences explaining the core psychology/vulnerability.
- keyLesson: 3-5 word memorable mantra.
- ruleOfThumb: 1 practical everyday habit.

KNOWLEDGE CHECK:
- 1 multiple-choice question testing understanding of the key warning sign.
- 3 options with 1 correct and helpful explanations.

Output ONLY valid JSON matching this schema:
{
  "title": "CATCHY MANGA TITLE IN ALL CAPS",
  "concept": "Core cybersecurity concept being taught",
  "summary": "1-2 sentence comic synopsis",
  "panels": [
    {
      "panelNumber": 1,
      "panelType": "story",
      "title": "SCENE 1 // THE SETUP",
      "sceneDescription": "Detailed visual description of the manga panel layout and composition",
      "visualTone": "comedic-sweat-drop" | "speed-lines" | "dramatic-shadow" | "alert-glow" | "sleuth-tint" | "cyber-grid",
      "soundEffect": "SOUND EFFECT IN CAPS",
      "characterAction": "What the character is doing physically",
      "dialogue": [
        { "speaker": "Ren", "role": "student", "text": "...", "bubbleType": "speech" | "shout" | "thought" | "whisper" | "hologram" }
      ],
      "clueOverlay": { "label": "CLUE LABEL", "text": "Forensic detail", "type": "warning" | "info" | "critical" },
      "artSvgVariant": "screen-urgency" | "phone-incoming" | "investigate-lens" | "panic-sweat" | "decision-split" | "shield-active" | "mentor-hologram" | "wisdom-scroll"
    }
  ],
  "decision": {
    "question": "The decision prompt for the reader",
    "options": [
      {
        "id": "A",
        "label": "Option text",
        "description": "Option detail",
        "isCorrect": false,
        "consequenceTitle": "...",
        "consequenceReaction": "...",
        "consequenceText": "...",
        "mentorCritique": "..."
      },
      {
        "id": "B",
        "label": "...",
        "description": "...",
        "isCorrect": true,
        "consequenceTitle": "...",
        "consequenceReaction": "...",
        "consequenceText": "...",
        "mentorCritique": "..."
      },
      {
        "id": "C",
        "label": "...",
        "description": "...",
        "isCorrect": false,
        "consequenceTitle": "...",
        "consequenceReaction": "...",
        "consequenceText": "...",
        "mentorCritique": "..."
      },
      {
        "id": "D",
        "label": "...",
        "description": "...",
        "isCorrect": false,
        "consequenceTitle": "...",
        "consequenceReaction": "...",
        "consequenceText": "...",
        "mentorCritique": "..."
      }
    ]
  },
  "aiMentorDebrief": {
    "quote": "...",
    "explanation": "...",
    "keyLesson": "...",
    "ruleOfThumb": "..."
  },
  "knowledgeCheck": {
    "id": "kc-gen-01",
    "question": "...",
    "options": [
      { "id": "opt-1", "text": "...", "isCorrect": false, "explanation": "..." },
      { "id": "opt-2", "text": "...", "isCorrect": true, "explanation": "..." },
      { "id": "opt-3", "text": "...", "isCorrect": false, "explanation": "..." }
    ]
  }
}`;

    const candidateModels = ["gemini-3.8-flash", "gemini-3.1-flash-lite"];

    for (const modelName of candidateModels) {
      try {
        const response = await client.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.7,
          },
        });

        const rawText = response.text || "{}";
        const parsed = JSON.parse(rawText);

        if (parsed.title && Array.isArray(parsed.panels) && parsed.decision) {
          const comic = {
            id: `manga-ai-${Date.now()}`,
            title: parsed.title,
            topicId,
            topicLabel,
            genreId,
            genreLabel,
            concept: parsed.concept || `${topicLabel} Defense`,
            summary: parsed.summary || `A ${genreLabel} comic exploring ${topicLabel}.`,
            createdAt: Date.now(),
            completed: false,
            protagonistName: studentName || "Ren",
            panels: parsed.panels,
            decision: parsed.decision,
            aiMentorDebrief: parsed.aiMentorDebrief || {
              quote: "Pause and inspect before taking action.",
              explanation: `Understanding ${topicLabel} is the key to digital resilience.`,
              keyLesson: "Pause → Inspect → Verify",
              ruleOfThumb: "Always verify through an independent channel.",
            },
            knowledgeCheck: parsed.knowledgeCheck,
            saved: true,
            source: "ai-generated",
          };

          return res.json({ success: true, comic });
        }
      } catch (err: any) {
        const statusCode = err?.status || err?.error?.code || err?.code;
        const msg = err?.message || String(err);
        const isTransient =
          statusCode === 503 ||
          statusCode === 429 ||
          msg.includes("503") ||
          msg.includes("429") ||
          msg.includes("high demand") ||
          msg.includes("RESOURCE_EXHAUSTED") ||
          msg.includes("UNAVAILABLE");

        if (isTransient) {
          console.info(`[CyberManga] Model ${modelName} temporarily busy/high demand, trying fallback candidate...`);
          // Brief pause before trying secondary candidate model
          await new Promise((r) => setTimeout(r, 200));
          continue;
        } else {
          console.info(`[CyberManga] Model ${modelName} unavailable, falling back.`);
          break;
        }
      }
    }
  }

  // Deterministic generator fallback: generates a structured manga episode immediately
  const fallbackComic = generateFallbackManga({
    topicId,
    topicLabel,
    genreId,
    genreLabel,
    studentName,
    weaknessContext,
  });

  return res.json({ success: true, comic: fallbackComic });
});

function generateFallbackManga(params: {
  topicId: string;
  topicLabel: string;
  genreId: string;
  genreLabel: string;
  studentName: string;
  weaknessContext: string;
}) {
  const { topicId, topicLabel, genreId, genreLabel, studentName = "Ren" } = params;

  const titlesByTopic: Record<string, string> = {
    phishing: "THE DECEPTIVE DOMAIN DILEMMA",
    passwords: "THE VAULT OF PASSWORDS",
    privacy: "THE SHADOWED DIGITAL FOOTPRINT",
    "social-engineering": "THE PRETEXT PLAYBOOK",
    "device-security": "THE FORBIDDEN FLASH DRIVE",
    wifi: "THE ROGUE FREQUENCY PROTOCOL",
    "social-media": "THE VIRAL DISCLOSURE",
    shopping: "THE TOO-GOOD-TO-BE-TRUE DEAL",
    "qr-scams": "THE STICKER OF DECEPTION",
    malware: "THE TROJANIZED SYLLABUS",
    "account-security": "THE MIDNIGHT PUSH NOTIFICATION",
    "cloud-security": "THE OPEN LINK DISASTER",
    "digital-footprint": "THE MAP OF BREADCRUMBS",
    "ai-deepfakes": "THE SYNTHETIC EMERGENCY",
    "physical-security": "THE TAILGATING INCIDENT",
    "gaming-security": "THE BATTLE PASS TRAP",
  };

  const title = titlesByTopic[topicId] || `THE ${topicLabel.toUpperCase()} INCIDENT`;

  return {
    id: `manga-gen-${Date.now()}`,
    title,
    topicId,
    topicLabel,
    genreId,
    genreLabel,
    concept: `Mastering defensive instincts in ${topicLabel} under pressure`,
    summary: `A ${genreLabel.toLowerCase()} story where ${studentName} encounters a tricky ${topicLabel.toLowerCase()} dilemma on campus.`,
    createdAt: Date.now(),
    completed: false,
    protagonistName: studentName,
    panels: [
      {
        panelNumber: 1,
        panelType: "story",
        title: "SCENE 1 // THE CAMPUS COMMONS",
        sceneDescription: `${studentName} is focused on studying in the digital commons, preparing for upcoming project submissions.`,
        visualTone: "cyber-grid",
        soundEffect: "HUMMM... FOCUS ACTIVE",
        characterAction: `${studentName} sips tea while reviewing class files on a laptop.`,
        dialogue: [
          { speaker: studentName, role: "student", text: "Everything is on schedule. Just wrapping up today's work.", bubbleType: "speech" },
        ],
        artSvgVariant: "screen-urgency",
      },
      {
        panelNumber: 2,
        panelType: "problem",
        title: "SCENE 2 // THE UNEXPECTED EVENT",
        sceneDescription: `An unexpected notification alerts ${studentName} to a situation requiring immediate ${topicLabel} attention.`,
        visualTone: "speed-lines",
        soundEffect: "ALERT!! PING!!",
        characterAction: `${studentName} looks up with surprise at the sudden priority alert.`,
        dialogue: [
          { speaker: "Alert Notice", role: "adversary", text: `Notice: Urgent action required regarding your ${topicLabel} settings immediately!`, bubbleType: "shout" },
          { speaker: studentName, role: "student", text: "Wait, this didn't come through our standard communication board...", bubbleType: "thought" },
        ],
        artSvgVariant: "screen-urgency",
      },
      {
        panelNumber: 3,
        panelType: "clue",
        title: "SCENE 3 // FORENSIC SCRUTINY",
        sceneDescription: "CyberMentor AI materializes in glowing cyan hologram form, pointing out subtle technical markers.",
        visualTone: "sleuth-tint",
        soundEffect: "SCANNING FORENSIC MARKERS...",
        characterAction: "CyberMentor AI projects a magnifier over the anomalous headers and sender details.",
        dialogue: [
          { speaker: "CyberMentor AI", role: "mentor", text: `Look beneath the surface, ${studentName}. The sender address does not match verified records, and the destination is asking for sensitive data.`, bubbleType: "hologram" },
          { speaker: studentName, role: "student", text: "A subtle mismatch! The domain suffix is masquerading as our campus portal.", bubbleType: "thought" },
        ],
        clueOverlay: {
          label: "TECHNICAL INDICATOR",
          text: `Mismatched origin signature and unexpected demand for ${topicLabel} credentials.`,
          type: "critical",
        },
        artSvgVariant: "investigate-lens",
      },
      {
        panelNumber: 4,
        panelType: "tension",
        title: "SCENE 4 // THE PRESSURE RISES",
        sceneDescription: "The situation escalates with artificial urgency attempting to force a hasty response.",
        visualTone: "dramatic-shadow",
        soundEffect: "TICK TOCK... HEARTBEAT",
        characterAction: `${studentName} pauses, recognizing the emotional pressure tactic.`,
        dialogue: [
          { speaker: studentName, role: "student", text: "They want me to act before I have time to verify!", bubbleType: "thought" },
          { speaker: "CyberMentor AI", role: "mentor", text: "Adversaries rely on urgency to disable your critical thinking. Stand your ground.", bubbleType: "hologram" },
        ],
        artSvgVariant: "panic-sweat",
      },
      {
        panelNumber: 5,
        panelType: "decision",
        title: "SCENE 5 // WHAT WOULD YOU DO?",
        sceneDescription: "Monochrome high-contrast manga panel. The reader is presented with the critical fork in the road.",
        visualTone: "dramatic-shadow",
        soundEffect: "DODON!! (YOUR CALL)",
        characterAction: `${studentName} looks out to the reader, awaiting guidance.`,
        dialogue: [
          { speaker: "Narrator", role: "narrator", text: `How will you handle this ${topicLabel} threat? Choose your move wisely.`, bubbleType: "speech" },
        ],
        artSvgVariant: "decision-split",
      },
      {
        panelNumber: 6,
        panelType: "consequence",
        title: "SCENE 6 // THE DEFENSIVE OUTCOME",
        sceneDescription: "The selected path triggers immediate tactical consequences.",
        visualTone: "alert-glow",
        soundEffect: "DEFENSE ENGAGED!!",
        characterAction: "A glowing defensive barrier shields the operative from compromise.",
        dialogue: [
          { speaker: studentName, role: "student", text: "Verified through official channels. The threat is contained!", bubbleType: "speech" },
          { speaker: "CyberMentor AI", role: "mentor", text: "Excellent vigilance, operative. Threat isolated with zero data loss.", bubbleType: "hologram" },
        ],
        artSvgVariant: "shield-active",
      },
      {
        panelNumber: 7,
        panelType: "mentor",
        title: "SCENE 7 // CYBERMENTOR DEBRIEF",
        sceneDescription: "CyberMentor AI summarizes the security architecture and attack anatomy.",
        visualTone: "cyber-grid",
        soundEffect: "DEBRIEF LOGGED",
        characterAction: "CyberMentor AI reviews the tactical lesson.",
        dialogue: [
          { speaker: "CyberMentor AI", role: "mentor", text: `Every ${topicLabel} scenario boils down to verification over convenience. When something rushes you, take a tactical pause.`, bubbleType: "hologram" },
        ],
        artSvgVariant: "mentor-hologram",
      },
      {
        panelNumber: 8,
        panelType: "principle",
        title: "SCENE 8 // GOLDEN PROTOCOL",
        sceneDescription: "A golden scroll of defense unrolls across the screen with high-contrast manga lettering.",
        visualTone: "speed-lines",
        soundEffect: "SHIING!! CORE PRINCIPLE",
        characterAction: `${studentName} and CyberMentor AI stand ready for future challenges.`,
        dialogue: [
          { speaker: "Narrator", role: "narrator", text: "GOLDEN RULE: PAUSE → INSPECT THE DETAILS → VERIFY INDEPENDENTLY!", bubbleType: "shout" },
        ],
        artSvgVariant: "wisdom-scroll",
      },
    ],
    decision: {
      question: `What is the most secure response to this suspicious ${topicLabel} situation?`,
      options: [
        {
          id: "A",
          label: "Comply immediately to eliminate the risk of missing the deadline.",
          description: "Follow the prompt right away without checking origin details.",
          isCorrect: false,
          consequenceTitle: "PREMATURE COMPLIANCE",
          consequenceReaction: "⚠️ COMPROMISED",
          consequenceText: `Acting on unverified pressure resulted in an unauthorized exposure of ${topicLabel} assets.`,
          mentorCritique: "Never let urgency dictate your security posture. Always verify first.",
        },
        {
          id: "B",
          label: "Pause, inspect the technical indicators, and verify through an independent official channel.",
          description: "Check the true source and confirm legitimacy through established institutional channels.",
          isCorrect: true,
          consequenceTitle: "FLAWLESS ZERO-TRUST DEFENSE",
          consequenceReaction: "🛡️ PERIMETER SECURED",
          consequenceText: "By verifying through official channels, the fraudulent attempt was flagged and neutralized immediately.",
          mentorCritique: "Superb analytical judgment! You refused to be rushed and applied proper verification.",
        },
        {
          id: "C",
          label: "Reply back to the suspicious notification asking if it is authentic.",
          description: "Ask the sender to confirm whether they are legitimate.",
          isCorrect: false,
          consequenceTitle: "CIRCULAR VALIDATION TRAP",
          consequenceReaction: "🎭 DECEPTION MULTIPLIED",
          consequenceText: "The sender confirmed their own deception with fabricated documents, wasting valuable response time.",
          mentorCritique: "Never ask the threat actor to verify themselves. Always use an out-of-band channel.",
        },
        {
          id: "D",
          label: "Delete the notification and take no notes or reports.",
          description: "Ignore it and move on without alerting anyone.",
          isCorrect: false,
          consequenceTitle: "SILENT DISMISSAL",
          consequenceReaction: "❌ UNREPORTED HAZARD",
          consequenceText: "While you stayed safe personally, others in your organization fell for the attack because it went unreported.",
          mentorCritique: "Dismissing without reporting leaves the rest of your community vulnerable.",
        },
      ],
    },
    aiMentorDebrief: {
      quote: `Security is not about speed; it is about deliberate verification.`,
      explanation: `Attackers manipulate ${topicLabel} by creating conditions where you feel rushed. Recognizing the trigger gives you control.`,
      keyLesson: "Pause → Inspect → Verify",
      ruleOfThumb: `When in doubt about ${topicLabel}, always confirm via an official channel.`,
    },
    knowledgeCheck: {
      id: "kc-fallback-01",
      question: `What is the most reliable defense when dealing with an urgent ${topicLabel} request?`,
      options: [
        {
          id: "opt-1",
          text: "Out-of-band verification through an independent, trusted channel.",
          isCorrect: true,
          explanation: "Independent verification breaks the attacker's chain of deception.",
        },
        {
          id: "opt-2",
          text: "Replying immediately with questions.",
          isCorrect: false,
          explanation: "Replying directly to the suspect only provides them more opportunity to deceive you.",
        },
        {
          id: "opt-3",
          text: "Waiting 24 hours without taking any action.",
          isCorrect: false,
          explanation: "Inaction does not resolve security incidents; proactive verification does.",
        },
      ],
    },
    saved: true,
    source: "curated",
  };
}
