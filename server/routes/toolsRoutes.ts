import { Router } from "express";
import { securityTools } from "../services/securityTools";
import { db } from "../db";

export const toolsRouter = Router();

// Preset samples for the interactive forensic sandbox
const PRESET_SAMPLES = {
  domains: [
    {
      name: "Campus Incident Sample #1",
      input: "un1versity-help.com",
      description: "Extracted from the urgent library phishing email.",
    },
    {
      name: "Legitimate Campus Domain",
      input: "https://library.university.edu/login",
      description: "Official campus library authentication endpoint.",
    },
    {
      name: "Suspicious High-Risk TLD",
      input: "http://campus-emergency-portal.xyz/verify",
      description: "External registrar claiming administrative status.",
    },
    {
      name: "Direct IP Link",
      input: "http://198.51.100.42/payload.bin",
      description: "Unauthenticated IP host bypassed domain resolution.",
    },
  ],
  hashes: [
    {
      name: "Library Email Attachment",
      fileName: "urgent-action.pdf.exe",
      snippet: "MZP\x00\x02\x00\x00\x00\x04\x00\x0f\x00\xff\xff\x00\x00STRING POWERSHELL -enc SQBFAFgA...",
      description: "Executable masquerading behind double extension.",
    },
    {
      name: "CAD Lab USB Keystroke Payload",
      fileName: "CS301_Final_Exams.key",
      snippet: "REM BadUSB Ducky Script\nDELAY 1000\nGUI r\nDELAY 200\nSTRING powershell -w hidden\nENTER",
      description: "Hardware keystroke injector script dump.",
    },
    {
      name: "Legitimate Campus Syllabus",
      fileName: "Cyber_Syllabus_2026.pdf",
      snippet: "%PDF-1.7 standard syllabus course outline for Computer Systems...",
      description: "Clean standard PDF document.",
    },
  ],
  headers: [
    {
      name: "Spoofed Campus Alert Header",
      description: "Urgent email header pretending to originate from Financial Aid.",
      raw: `From: "Campus Aid Office" <finaid@un1versity-help.com>
Return-Path: <bounce-daemon@external-mail-cluster.xyz>
Reply-To: <harvester99@proton.me>
Received: from mail.external-mail-cluster.xyz [198.51.100.88]
Received-SPF: fail (ip=198.51.100.88 does not match university.edu SPF record)
Authentication-Results: mx.campus.edu; dkim=fail; dmarc=fail`,
    },
    {
      name: "Legitimate SecOps Advisory Header",
      description: "Authentic cryptographically signed campus security dispatch.",
      raw: `From: "Campus SecOps" <alerts@university.edu>
Return-Path: <alerts@university.edu>
Received: from mail-internal.university.edu [10.0.4.12]
Received-SPF: pass (university.edu: domain of alerts@university.edu designates 10.0.4.12 as permitted sender)
Authentication-Results: mx.campus.edu; dkim=pass header.i=@university.edu; dmarc=pass`,
    },
  ],
  qrs: [
    {
      name: "Station Ticket Machine Overlay",
      description: "Malicious sticker pasted over genuine Metro ticket machine QR.",
      payload: "bank://transfer?recipient=0x9481a8b41&amount=250.00&memo=fare_recharge",
    },
    {
      name: "Genuine Metro App Download",
      description: "Legitimate city transit application store link.",
      payload: "https://apps.apple.com/app/metro-transit-official/id1029384",
    },
  ],
};

// GET /api/tools/samples - Get preset forensic samples
toolsRouter.get("/samples", (_req, res) => {
  res.json({
    success: true,
    samples: PRESET_SAMPLES,
  });
});

// POST /api/tools/domain - Analyze domain / URL
toolsRouter.post("/domain", (req, res) => {
  const { domain } = req.body;
  if (!domain || typeof domain !== "string") {
    return res.status(400).json({ success: false, error: "domain string is required" });
  }

  db.incrementInspections();
  const analysis = securityTools.analyzeDomain(domain);
  res.json({
    success: true,
    analysis,
  });
});

// POST /api/tools/hash - Analyze file payload & hashes
toolsRouter.post("/hash", (req, res) => {
  const { fileName, snippet } = req.body;
  if (!fileName || typeof fileName !== "string") {
    return res.status(400).json({ success: false, error: "fileName string is required" });
  }

  db.incrementInspections();
  const analysis = securityTools.analyzeFilePayload(fileName, snippet);
  res.json({
    success: true,
    analysis,
  });
});

// POST /api/tools/header - Analyze email headers
toolsRouter.post("/header", (req, res) => {
  const { headers } = req.body;
  if (!headers || typeof headers !== "string") {
    return res.status(400).json({ success: false, error: "headers string is required" });
  }

  db.incrementInspections();
  const analysis = securityTools.analyzeEmailHeaders(headers);
  res.json({
    success: true,
    analysis,
  });
});

// POST /api/tools/qr - Analyze QR / deep link payload
toolsRouter.post("/qr", (req, res) => {
  const { payload } = req.body;
  if (!payload || typeof payload !== "string") {
    return res.status(400).json({ success: false, error: "payload string is required" });
  }

  db.incrementInspections();
  const analysis = securityTools.analyzeQRIntent(payload);
  res.json({
    success: true,
    analysis,
  });
});
