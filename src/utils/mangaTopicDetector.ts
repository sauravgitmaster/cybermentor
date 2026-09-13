import { PlayerState } from '../types';
import { MangaTopicId, MangaTopicMeta, TopicPerformanceRecord } from '../types/manga';
import { SCENARIOS } from '../data/scenarios';

export const MANGA_TOPICS: MangaTopicMeta[] = [
  {
    id: 'phishing',
    name: 'Phishing',
    icon: '🎣',
    category: 'core',
    summary: 'Urgent notices, lookalike domains, and deceptive links trying to steal credentials.',
    keyRule: 'Never act on artificial urgency; inspect domain characters before clicking.',
    exampleScenario: 'The 10-minute suspension email with a misspelled university domain.',
  },
  {
    id: 'passwords',
    name: 'Password Security',
    icon: '🔐',
    category: 'core',
    summary: 'Weak credentials, password reuse, lack of MFA, and credential harvesting.',
    keyRule: 'Use unique passphrases and enable multi-factor authentication everywhere.',
    exampleScenario: 'Reusing a gaming password on school portals and ignoring 2FA alerts.',
  },
  {
    id: 'privacy',
    name: 'Privacy',
    icon: '👁️',
    category: 'habits',
    summary: 'Over-sharing personal routines, geotags, and background details in public posts.',
    keyRule: 'Compartmentalize personal data; assume every public post is permanent.',
    exampleScenario: 'A harmless photo that accidentally reveals a student ID and dorm room number.',
  },
  {
    id: 'social-engineering',
    name: 'Social Engineering',
    icon: '🎭',
    category: 'core',
    summary: 'Manipulative authority, fake tech support, emotional pressure, and pretexting.',
    keyRule: 'Independent out-of-band verification beats polite compliance every time.',
    exampleScenario: 'An urgent call from a supposed department dean requesting immediate access.',
  },
  {
    id: 'device-security',
    name: 'Device Security',
    icon: '💻',
    category: 'threats',
    summary: 'Unattended unlocked laptops, stray USB drives, and unauthorized hardware.',
    keyRule: 'Lock your screen when leaving; never plug unverified flash drives into your machine.',
    exampleScenario: 'Finding a tempting USB thumbdrive labeled "Class Final Exam Prep".',
  },
  {
    id: 'wifi',
    name: 'Public Wi-Fi',
    icon: '📶',
    category: 'threats',
    summary: 'Rogue open hotspots, evil twin routers, and packet sniffing in public cafés.',
    keyRule: 'Avoid unencrypted open networks; verify SSID authenticity or use a trusted VPN.',
    exampleScenario: 'Connecting to "Free_Campus_HighSpeed_Wi-Fi" without a security portal.',
  },
  {
    id: 'social-media',
    name: 'Social Media Safety',
    icon: '📱',
    category: 'habits',
    summary: 'Quizzes asking for security question answers, impersonated friend accounts, and DM links.',
    keyRule: 'Never share personal history on viral quizzes designed to scrape password resets.',
    exampleScenario: 'A viral challenge asking "What was your first pet and high school mascot?".',
  },
  {
    id: 'shopping',
    name: 'Online Shopping',
    icon: '🛍️',
    category: 'threats',
    summary: 'Fake retail storefronts, counterfeit payment gateways, and unrealistically low prices.',
    keyRule: 'Check business registration, domain age, and use secure payment methods.',
    exampleScenario: 'A 90% discount on expensive noise-canceling headphones on an unknown store.',
  },
  {
    id: 'qr-scams',
    name: 'QR Scams',
    icon: '🏁',
    category: 'threats',
    summary: 'Malicious stickers placed over legitimate QR codes (Quishing) directing to phishing.',
    keyRule: 'Inspect physical QR stickers for tampering; check the preview destination domain.',
    exampleScenario: 'A fake payment QR code pasted over a campus parking meter or café table.',
  },
  {
    id: 'malware',
    name: 'Malware',
    icon: '🦠',
    category: 'threats',
    summary: 'Infected email attachments, fake software updaters, and trojanized downloads.',
    keyRule: 'Never run unexpected executable attachments like .exe, .scr, or .iso files.',
    exampleScenario: 'A downloaded course syllabus ending in "Syllabus_Fall2026.pdf.exe".',
  },
  {
    id: 'account-security',
    name: 'Account Security',
    icon: '🛡️',
    category: 'core',
    summary: 'Session hijacking, unexpected 2FA push notifications, and unauthorized recovery emails.',
    keyRule: 'Deny unexpected MFA prompts immediately; never approve a push you did not trigger.',
    exampleScenario: 'Receiving a sudden Authenticator push while eating lunch in the dining hall.',
  },
  {
    id: 'cloud-security',
    name: 'Cloud Security',
    icon: '☁️',
    category: 'habits',
    summary: 'Publicly readable shared drive links, misconfigured document permissions, and leaks.',
    keyRule: 'Always restrict shared links to specific accounts rather than "Anyone with the link".',
    exampleScenario: 'Accidentally sharing a folder with credentials set to open public view.',
  },
  {
    id: 'digital-footprint',
    name: 'Digital Footprint',
    icon: '👣',
    category: 'habits',
    summary: 'How breadcrumbs across multiple sites assemble into an Open Source Intelligence profile.',
    keyRule: 'Periodically search yourself and remove obsolete public accounts and listings.',
    exampleScenario: 'A threat actor mapping a student schedule from forum comments and photos.',
  },
  {
    id: 'ai-deepfakes',
    name: 'AI & Deepfake Scams',
    icon: '🤖',
    category: 'threats',
    summary: 'Synthetic voice clones mimicking friends or family pleading for emergency funds.',
    keyRule: 'Establish family safe-words and hang up to call back the known trusted contact number.',
    exampleScenario: 'A panicked voice message sounding identical to a roommate asking for $200.',
  },
  {
    id: 'physical-security',
    name: 'Physical Security',
    icon: '🚪',
    category: 'habits',
    summary: 'Tailgating through secure building doors, shoulder surfing PINs, and discarded docs.',
    keyRule: 'Do not hold secure doors open for unbadged strangers; shield your screens in transit.',
    exampleScenario: 'Someone carrying heavy boxes asking you to hold the server room door open.',
  },
  {
    id: 'gaming-security',
    name: 'Gaming Security',
    icon: '🎮',
    category: 'threats',
    summary: 'Free in-game currency generators, cheat engines bundling stealer malware, and trades.',
    keyRule: 'There is no such thing as free premium currency; third-party tools contain spyware.',
    exampleScenario: 'A Discord DM promising a free seasonal battle pass if you login on a third-party site.',
  },
];

export interface TopicDetectionResult {
  recommendedTopic: MangaTopicMeta;
  recommendationReason: string;
  topicProfiles: TopicPerformanceRecord[];
  allTopics: MangaTopicMeta[];
}

export function detectUserWeakTopics(player: PlayerState): TopicDetectionResult {
  const skill = player.skillProfile || {
    phishing: 50,
    privacy: 50,
    deviceSecurity: 50,
    socialEngineering: 50,
    demonstratedWeaknesses: [],
  };

  // Inspect Scenario Ops history from localStorage if present
  const scenarioMistakeCategories: Record<string, number> = {};
  if (typeof window !== 'undefined') {
    try {
      const rawOps = localStorage.getItem('cybermentor_scenario_ops_progress_v1');
      if (rawOps) {
        const parsed = JSON.parse(rawOps);
        if (parsed.decisions) {
          Object.entries(parsed.decisions).forEach(([scId, optId]) => {
            const sc = SCENARIOS.find((s) => s.id === scId);
            if (sc) {
              const opt = sc.options.find((o) => o.id === optId);
              if (opt && (opt.classification === 'dangerous' || opt.classification === 'risky')) {
                scenarioMistakeCategories[sc.category] = (scenarioMistakeCategories[sc.category] || 0) + 1;
              }
            }
          });
        }
      }
    } catch {}
  }

  // Inspect Trust History for negative changes
  const trustMistakes: string[] = [];
  (player.trustHistory || []).forEach((record) => {
    if (record.delta < 0 && record.reason) {
      trustMistakes.push(record.reason.toLowerCase());
    }
  });

  const weaknessesStr = (skill.demonstratedWeaknesses || []).join(' ').toLowerCase();

  // Score each of the 16 topics
  const scoredTopics: TopicPerformanceRecord[] = MANGA_TOPICS.map((topic) => {
    let score = 65; // baseline moderate
    let mistakes = 0;
    let reasons: string[] = [];

    // Map to core skill profile fields
    if (topic.id === 'phishing') {
      score = skill.phishing ?? 50;
      if (scenarioMistakeCategories['phishing']) {
        mistakes += scenarioMistakeCategories['phishing'];
        score = Math.max(20, score - mistakes * 10);
        reasons.push('Recent risky responses to email urgency alerts in Scenario Ops');
      }
      if (weaknessesStr.includes('phishing') || weaknessesStr.includes('urgency') || weaknessesStr.includes('link')) {
        reasons.push('Demonstrated vulnerability to urgent messages and link spoofs');
        score = Math.min(score, 45);
      }
    } else if (topic.id === 'passwords' || topic.id === 'account-security') {
      const base = skill.privacy ?? 55;
      score = base;
      if (scenarioMistakeCategories['passwords'] || scenarioMistakeCategories['account-security']) {
        mistakes += (scenarioMistakeCategories['passwords'] || 0) + (scenarioMistakeCategories['account-security'] || 0);
        score = Math.max(25, score - mistakes * 12);
        reasons.push('Chose unverified credential entry or ignored MFA alerts');
      }
    } else if (topic.id === 'privacy' || topic.id === 'social-media' || topic.id === 'digital-footprint') {
      score = skill.privacy ?? 50;
      if (scenarioMistakeCategories['privacy']) {
        mistakes += scenarioMistakeCategories['privacy'];
        score = Math.max(25, score - mistakes * 10);
        reasons.push('Overshared operational or location details in simulated scenarios');
      }
      if (weaknessesStr.includes('privacy') || weaknessesStr.includes('footprint')) {
        reasons.push('Tendency to trust public channels without verifying privacy settings');
      }
    } else if (topic.id === 'social-engineering' || topic.id === 'ai-deepfakes') {
      score = skill.socialEngineering ?? 50;
      if (scenarioMistakeCategories['social-engineering']) {
        mistakes += scenarioMistakeCategories['social-engineering'];
        score = Math.max(20, score - mistakes * 12);
        reasons.push('Yielded to authority pressure or voice impersonation');
      }
      if (weaknessesStr.includes('social') || weaknessesStr.includes('authority') || weaknessesStr.includes('phone')) {
        reasons.push('Hesitated to challenge unverified claims of authority');
      }
    } else if (topic.id === 'device-security' || topic.id === 'malware') {
      score = skill.deviceSecurity ?? 50;
      if (scenarioMistakeCategories['hardware']) {
        mistakes += scenarioMistakeCategories['hardware'];
        score = Math.max(25, score - mistakes * 12);
        reasons.push('Interacted with untrusted external storage devices without containment');
      }
      if (weaknessesStr.includes('device') || weaknessesStr.includes('hardware') || weaknessesStr.includes('usb')) {
        reasons.push('Needed reminders to isolate unfamiliar physical media');
      }
    } else if (topic.id === 'wifi') {
      score = Math.min(skill.deviceSecurity ?? 55, skill.privacy ?? 55);
      if (scenarioMistakeCategories['wifi']) {
        mistakes += scenarioMistakeCategories['wifi'];
        score = Math.max(20, score - mistakes * 12);
        reasons.push('Connected to unencrypted or spoofed wireless networks');
      }
    } else if (topic.id === 'qr-scams') {
      score = Math.min(skill.phishing ?? 50, skill.deviceSecurity ?? 50);
      if (scenarioMistakeCategories['qr']) {
        mistakes += scenarioMistakeCategories['qr'];
        score = Math.max(20, score - mistakes * 12);
        reasons.push('Scanned tampered physical stickers without destination inspection');
      }
    } else {
      // General topics: scale by digital trust and overall skill
      const overall =
        (skill as any).overallScore ??
        Math.round(
          ((skill.phishing ?? 50) +
            (skill.privacy ?? 50) +
            (skill.deviceSecurity ?? 50) +
            (skill.socialEngineering ?? 50)) /
            4
        );
      score = Math.max(35, Math.min(85, overall));
    }

    // Check trust history keywords
    trustMistakes.forEach((m) => {
      if (m.includes(topic.id) || m.includes(topic.name.toLowerCase())) {
        mistakes += 1;
        score = Math.max(20, score - 8);
        reasons.push(`Lost digital trust during earlier exercise: "${m}"`);
      }
    });

    let status: 'Weak' | 'Needs Practice' | 'Good' | 'Strong';
    if (score < 45 || mistakes >= 2) {
      status = 'Weak';
    } else if (score < 70 || mistakes >= 1) {
      status = 'Needs Practice';
    } else if (score < 85) {
      status = 'Good';
    } else {
      status = 'Strong';
    }

    const defaultReason =
      reasons.length > 0
        ? reasons[0]
        : status === 'Weak' || status === 'Needs Practice'
        ? `Observed lower confidence and hesitation in recent ${topic.name} situations.`
        : `Demonstrated solid foundational awareness in ${topic.name}.`;

    return {
      topicId: topic.id,
      name: topic.name,
      icon: topic.icon,
      status,
      score: Math.round(score),
      recentMistakeCount: mistakes,
      reasonForRecommendation: defaultReason,
      description: topic.summary,
    };
  });

  // Sort: prioritize 'Weak' first, then 'Needs Practice', then lowest score, then highest mistakes
  const sortedProfiles = [...scoredTopics].sort((a, b) => {
    const statusWeight = { Weak: 0, 'Needs Practice': 1, Good: 2, Strong: 3 };
    if (statusWeight[a.status] !== statusWeight[b.status]) {
      return statusWeight[a.status] - statusWeight[b.status];
    }
    if (b.recentMistakeCount !== a.recentMistakeCount) {
      return b.recentMistakeCount - a.recentMistakeCount;
    }
    return a.score - b.score;
  });

  const topWeak = sortedProfiles[0];
  const recommendedMeta =
    MANGA_TOPICS.find((t) => t.id === topWeak.topicId) || MANGA_TOPICS[0];

  const recommendationReason =
    topWeak.status === 'Weak' || topWeak.status === 'Needs Practice'
      ? `The AI Mentor noticed that you've struggled with ${recommendedMeta.name.toLowerCase()} in recent situations. Turning this into a story will lock in the instincts you need.`
      : `Recommended for you: strengthen your defense instincts in ${recommendedMeta.name.toLowerCase()} with a quick story-driven challenge.`;

  return {
    recommendedTopic: recommendedMeta,
    recommendationReason,
    topicProfiles: sortedProfiles,
    allTopics: MANGA_TOPICS,
  };
}
