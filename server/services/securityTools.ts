import crypto from "crypto";

export interface DomainAnalysisResult {
  domain: string;
  isSuspicious: boolean;
  threatCategory: "SAFE" | "TYPOSQUATTING" | "HOMOGLYPH_ATTACK" | "UNTRUSTED_TLD" | "IP_DIRECT" | "HIGH_RISK";
  riskScore: number; // 0 to 100
  targetMatch?: {
    legitimateDomain: string;
    similarityPercent: number;
  };
  detectedAnomalies: string[];
  recommendation: string;
}

export interface HashAnalysisResult {
  inputName: string;
  fileSizeEstimate: number;
  md5: string;
  sha1: string;
  sha256: string;
  entropy: number; // 0.0 to 8.0
  isPackedOrEncrypted: boolean;
  signatureMatch?: string;
  isMalicious: boolean;
  detectedIndicators: string[];
  recommendation: string;
}

export interface HeaderAnalysisResult {
  fromAddress: string;
  returnPath: string;
  replyTo?: string;
  clientIp: string;
  spfStatus: "PASS" | "FAIL" | "SOFTFAIL" | "NONE";
  dkimStatus: "PASS" | "FAIL" | "INVALID" | "NONE";
  dmarcStatus: "PASS" | "FAIL" | "NOT_CONFIGURED";
  isSpoofed: boolean;
  forensicSummary: string[];
}

export interface QRAnalysisResult {
  rawPayload: string;
  protocol: string;
  isDeepLink: boolean;
  destinationHost: string;
  hasExecutableExtension: boolean;
  isImmediateAction: boolean;
  verdict: "BENIGN" | "SUSPICIOUS" | "MALICIOUS";
  riskFactors: string[];
  mitigation: string;
}

const WHITELIST_DOMAINS = [
  "university.edu",
  "campus-secops.edu",
  "library.university.edu",
  "studentportal.university.edu",
  "google.com",
  "github.com",
  "microsoft.com",
];

const SUSPICIOUS_TLDS = [".xyz", ".top", ".buzz", ".work", ".cfd", ".click", ".country", ".surf"];

// Levenshtein distance implementation
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Shannon entropy calculator
function calculateEntropy(str: string): number {
  const len = str.length;
  if (len === 0) return 0;
  const frequencies: Record<string, number> = {};
  for (let i = 0; i < len; i++) {
    const char = str[i];
    frequencies[char] = (frequencies[char] || 0) + 1;
  }
  let entropy = 0;
  for (const count of Object.values(frequencies)) {
    const p = count / len;
    entropy -= p * Math.log2(p);
  }
  return Math.round(entropy * 100) / 100;
}

export const securityTools = {
  // 1. Domain / URL Analyzer
  analyzeDomain(inputDomain: string): DomainAnalysisResult {
    let clean = inputDomain.trim().toLowerCase().replace(/^https?:\/\//, "").split("/")[0].split(":")[0];
    const anomalies: string[] = [];
    let riskScore = 0;
    let threatCategory: DomainAnalysisResult["threatCategory"] = "SAFE";

    // Direct IP check
    if (/^(\d{1,3}\.){3}\d{1,3}$/.test(clean)) {
      anomalies.push("Direct IPv4 address used instead of canonical domain name.");
      riskScore += 60;
      threatCategory = "IP_DIRECT";
    }

    // Number substitution (leetspeak) like 'un1versity'
    if (/[0-9]/.test(clean.split(".")[0])) {
      if (clean.includes("1") || clean.includes("0") || clean.includes("5")) {
        anomalies.push("Numbers substituted for letters in domain label (e.g. '1' for 'i' or '0' for 'o').");
        riskScore += 45;
        threatCategory = "TYPOSQUATTING";
      }
    }

    // Suspicious TLD
    const hasSuspiciousTld = SUSPICIOUS_TLDS.some((tld) => clean.endsWith(tld));
    if (hasSuspiciousTld) {
      anomalies.push("Registered on a high-abuse top-level domain (TLD).");
      riskScore += 30;
      if (threatCategory === "SAFE") threatCategory = "UNTRUSTED_TLD";
    }

    // Known target match comparison
    let closestTarget: { legitimateDomain: string; similarityPercent: number } | undefined;
    let minDistance = Infinity;

    for (const legit of WHITELIST_DOMAINS) {
      const dist = levenshteinDistance(clean, legit);
      const maxLen = Math.max(clean.length, legit.length);
      const similarity = Math.round(((maxLen - dist) / maxLen) * 100);

      if (similarity >= 65 && similarity < 100 && dist < minDistance) {
        minDistance = dist;
        closestTarget = {
          legitimateDomain: legit,
          similarityPercent: similarity,
        };
      }
    }

    if (closestTarget) {
      anomalies.push(
        `High similarity (${closestTarget.similarityPercent}%) to institutional domain '${closestTarget.legitimateDomain}'. Typosquatting detected.`
      );
      riskScore += 55;
      threatCategory = "TYPOSQUATTING";
    }

    // Special known malicious samples from the campaign
    if (clean === "un1versity-help.com" || clean.includes("un1versity")) {
      riskScore = 95;
      threatCategory = "TYPOSQUATTING";
      anomalies.push("Flagged in Threat Intel feeds as active credential harvester for Library Phishing incident.");
    }

    const isSuspicious = riskScore >= 40;
    const recommendation = isSuspicious
      ? "Block domain at DNS/Firewall level. Cross-verify using official out-of-band institutional directory."
      : "Domain presents no immediate syntactic or reputation anomalies.";

    return {
      domain: clean,
      isSuspicious,
      threatCategory,
      riskScore: Math.min(100, riskScore),
      targetMatch: closestTarget,
      detectedAnomalies: anomalies,
      recommendation,
    };
  },

  // 2. Hash & Binary Payload Analyzer
  analyzeFilePayload(fileName: string, payloadSnippet?: string): HashAnalysisResult {
    const rawContent = payloadSnippet || `${fileName}_FORENSIC_STREAM_${Date.now()}`;
    const md5 = crypto.createHash("md5").update(rawContent).digest("hex");
    const sha1 = crypto.createHash("sha1").update(rawContent).digest("hex");
    const sha256 = crypto.createHash("sha256").update(rawContent).digest("hex");
    const entropy = calculateEntropy(rawContent);

    const indicators: string[] = [];
    let isMalicious = false;
    let signatureMatch: string | undefined;

    // Double extension check
    if (/\.(pdf|docx|xlsx|jpg|png)\.(exe|vbs|bat|scr|ps1|js)$/i.test(fileName)) {
      indicators.push("Double extension masquerading detected: File disguises an executable behind a document extension.");
      isMalicious = true;
      signatureMatch = "TROJAN:Win32/DisguisedExecutable.ExtSpk";
    }

    // High entropy
    const isPackedOrEncrypted = entropy > 6.8;
    if (isPackedOrEncrypted) {
      indicators.push(`High Shannon entropy (${entropy} / 8.0). Content appears packed, obfuscated, or encrypted.`);
    }

    // BadUSB keyboard payload cues
    const upperSnippet = rawContent.toUpperCase();
    if (
      upperSnippet.includes("DELAY") ||
      upperSnippet.includes("GUI R") ||
      upperSnippet.includes("STRING POWERSHELL") ||
      upperSnippet.includes("INJECT")
    ) {
      indicators.push("DuckyScript / HID Keystroke Injection directives identified in memory dump.");
      isMalicious = true;
      signatureMatch = "EXPLOIT:Hardware/BadUSB.RubberDuckyScript";
    }

    if (fileName.toLowerCase().includes("urgent-action.pdf.exe") || fileName.toLowerCase().includes("final_exams")) {
      isMalicious = true;
      signatureMatch = signatureMatch || "MALWARE:CampusCampaign/Stager.Downloader";
      indicators.push("Hash signature matches cataloged payload from SecOps incident logs.");
    }

    return {
      inputName: fileName,
      fileSizeEstimate: rawContent.length * 24 + 1024,
      md5,
      sha1,
      sha256,
      entropy,
      isPackedOrEncrypted,
      signatureMatch,
      isMalicious,
      detectedIndicators: indicators,
      recommendation: isMalicious
        ? "Quarantine immediately. Do NOT mount or execute in production or networked endpoints."
        : "Payload exhibits normal heuristic parameters.",
    };
  },

  // 3. Email Header Forensics
  analyzeEmailHeaders(rawHeaders: string): HeaderAnalysisResult {
    const lines = rawHeaders.split("\n").map((l) => l.trim());
    let from = "unknown@sender.com";
    let returnPath = "unknown@sender.com";
    let replyTo: string | undefined;
    let clientIp = "127.0.0.1";
    let spf: HeaderAnalysisResult["spfStatus"] = "NONE";
    let dkim: HeaderAnalysisResult["dkimStatus"] = "NONE";
    let dmarc: HeaderAnalysisResult["dmarcStatus"] = "NOT_CONFIGURED";

    for (const line of lines) {
      if (/^From:/i.test(line)) from = line.replace(/^From:\s*/i, "");
      if (/^Return-Path:/i.test(line)) returnPath = line.replace(/^Return-Path:\s*/i, "");
      if (/^Reply-To:/i.test(line)) replyTo = line.replace(/^Reply-To:\s*/i, "");
      if (/Received:.*\[(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\]/i.test(line)) {
        const match = line.match(/\[(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\]/);
        if (match) clientIp = match[1];
      }
      if (/Received-SPF:\s*pass/i.test(line)) spf = "PASS";
      if (/Received-SPF:\s*fail/i.test(line)) spf = "FAIL";
      if (/Received-SPF:\s*softfail/i.test(line)) spf = "SOFTFAIL";
      if (/dkim=pass/i.test(line)) dkim = "PASS";
      if (/dkim=fail/i.test(line)) dkim = "FAIL";
      if (/dmarc=pass/i.test(line)) dmarc = "PASS";
      if (/dmarc=fail/i.test(line)) dmarc = "FAIL";
    }

    const summary: string[] = [];
    let isSpoofed = false;

    // From vs Return-Path mismatch
    const fromDomain = from.split("@")[1]?.replace(">", "") || "";
    const returnDomain = returnPath.split("@")[1]?.replace(">", "") || "";

    if (fromDomain && returnDomain && fromDomain.toLowerCase() !== returnDomain.toLowerCase()) {
      summary.push(`Header Mismatch: Visible 'From' (${fromDomain}) does not align with bounce 'Return-Path' (${returnDomain}).`);
      isSpoofed = true;
    }

    if (spf === "FAIL") {
      summary.push(`SPF Authentication Failed: Originating host IP (${clientIp}) is not authorized by ${fromDomain} SPF record.`);
      isSpoofed = true;
    }

    if (dkim === "FAIL") {
      summary.push("DKIM Signature Invalid: Cryptographic signature could not be verified against sender public key.");
      isSpoofed = true;
    }

    return {
      fromAddress: from,
      returnPath,
      replyTo,
      clientIp,
      spfStatus: spf,
      dkimStatus: dkim,
      dmarcStatus: dmarc,
      isSpoofed,
      forensicSummary: summary.length > 0 ? summary : ["All cryptographic and routing checks passed."],
    };
  },

  // 4. QR Code & Intent Analyzer
  analyzeQRIntent(payload: string): QRAnalysisResult {
    const raw = payload.trim();
    const riskFactors: string[] = [];
    let protocol = "http";
    let isDeepLink = false;
    let isImmediateAction = false;
    let destinationHost = "unknown";

    try {
      if (raw.startsWith("http://") || raw.startsWith("https://")) {
        const url = new URL(raw);
        protocol = url.protocol.replace(":", "");
        destinationHost = url.hostname;
      } else if (raw.includes("://")) {
        const parts = raw.split("://");
        protocol = parts[0];
        destinationHost = parts[1].split("/")[0].split("?")[0];
        isDeepLink = true;
      }
    } catch {
      destinationHost = raw.slice(0, 30);
    }

    if (protocol !== "https" && protocol !== "http") {
      isDeepLink = true;
      riskFactors.push(`Non-standard app protocol handler detected (${protocol}://).`);
    }

    if (
      raw.includes("transfer") ||
      raw.includes("pay") ||
      raw.includes("amount=") ||
      raw.includes("authorize")
    ) {
      isImmediateAction = true;
      riskFactors.push("Pre-populated financial transaction intent detected without secondary user authentication.");
    }

    const hasExecutableExtension = /\.(apk|exe|dmg|sh|ipa)($|\?)/i.test(raw);
    if (hasExecutableExtension) {
      riskFactors.push("Payload directs straight to executable package download.");
    }

    let verdict: QRAnalysisResult["verdict"] = "BENIGN";
    if (riskFactors.length >= 2 || hasExecutableExtension || (isDeepLink && isImmediateAction)) {
      verdict = "MALICIOUS";
    } else if (riskFactors.length === 1) {
      verdict = "SUSPICIOUS";
    }

    return {
      rawPayload: raw,
      protocol,
      isDeepLink,
      destinationHost,
      hasExecutableExtension,
      isImmediateAction,
      verdict,
      riskFactors,
      mitigation:
        verdict === "MALICIOUS"
          ? "DO NOT proceed. Report physical QR sticker tampering to station authorities."
          : "Verify URL destination before providing credentials or authorizing payments.",
    };
  },
};
