import { CyberSkillProfile } from '../types';

export interface SkillCheckQuestion {
  id: string;
  category: 'phishing' | 'privacy' | 'deviceSecurity' | 'socialEngineering';
  categoryLabel: string;
  scenario: string;
  prompt: string;
  iconType: 'email' | 'password' | 'wifi' | 'usb' | 'message';
  options: {
    id: 'A' | 'B' | 'C' | 'D';
    text: string;
    points: {
      phishing: number;
      privacy: number;
      deviceSecurity: number;
      socialEngineering: number;
    };
    explanation: string;
    isOptimal: boolean;
  }[];
}

export const SKILL_CHECK_QUESTIONS: SkillCheckQuestion[] = [
  {
    id: 'q1-phishing-urgency',
    category: 'phishing',
    categoryLabel: 'Phishing & Urgent Messages',
    scenario: 'You receive a text message saying: "URGENT: Your gaming account will be deleted in 10 minutes unless you verify your password right now!"',
    prompt: 'What is your immediate move?',
    iconType: 'message',
    options: [
      {
        id: 'A',
        text: 'Tap the link immediately so you don\'t lose your game account.',
        points: { phishing: 10, privacy: 15, deviceSecurity: 20, socialEngineering: 10 },
        explanation: 'Scammers use false urgency (10 minutes!) to trigger panic and steal passwords.',
        isOptimal: false,
      },
      {
        id: 'B',
        text: 'Reply to the text asking "Is this really customer support?"',
        points: { phishing: 35, privacy: 35, deviceSecurity: 40, socialEngineering: 30 },
        explanation: 'Replying confirms your phone number is active and invites more targeted scam messages.',
        isOptimal: false,
      },
      {
        id: 'C',
        text: 'Do not tap the link. Open the official game launcher directly to check your account status.',
        points: { phishing: 100, privacy: 90, deviceSecurity: 90, socialEngineering: 95 },
        explanation: 'Excellent instinct! Always verify claims through the official app or website independently.',
        isOptimal: true,
      },
      {
        id: 'D',
        text: 'Forward the message to all your gaming friends to see if it happened to them.',
        points: { phishing: 30, privacy: 25, deviceSecurity: 40, socialEngineering: 25 },
        explanation: 'Forwarding unverified scam links can put your friends at risk of clicking by accident.',
        isOptimal: false,
      },
    ],
  },
  {
    id: 'q2-passwords-auth',
    category: 'privacy',
    categoryLabel: 'Password Safety & Credentials',
    scenario: 'You are setting up an account for a new online science project. You need to pick a password.',
    prompt: 'Which strategy gives you the strongest shield?',
    iconType: 'password',
    options: [
      {
        id: 'A',
        text: 'Use the same password as your email so you will never forget it.',
        points: { phishing: 30, privacy: 15, deviceSecurity: 20, socialEngineering: 20 },
        explanation: 'Password reuse is dangerous: if one site gets breached, all your accounts get compromised.',
        isOptimal: false,
      },
      {
        id: 'B',
        text: 'Create a memorable multi-word passphrase like "Galaxy-Dolphin-Jupiter-88" with two-factor authentication enabled.',
        points: { phishing: 90, privacy: 100, deviceSecurity: 95, socialEngineering: 90 },
        explanation: 'Passphrases are easy to remember, extremely hard for computers to crack, and 2FA stops unauthorized logins.',
        isOptimal: true,
      },
      {
        id: 'C',
        text: 'Use "Password123!" because it has uppercase, numbers, and a symbol.',
        points: { phishing: 40, privacy: 30, deviceSecurity: 35, socialEngineering: 30 },
        explanation: 'Common word patterns like "Password123" are the very first guesses hackers test in brute-force tools.',
        isOptimal: false,
      },
      {
        id: 'D',
        text: 'Write the password on a sticky note attached to your computer screen.',
        points: { phishing: 40, privacy: 20, deviceSecurity: 15, socialEngineering: 25 },
        explanation: 'Physical sticky notes expose your credentials to anyone walking by in the lab or classroom.',
        isOptimal: false,
      },
    ],
  },
  {
    id: 'q3-device-hardware',
    category: 'deviceSecurity',
    categoryLabel: 'Device & Hardware Security',
    scenario: 'You find an attractive metallic USB flash drive on a bench in the computer lab labeled "Final Exam Review - Honors".',
    prompt: 'What do you do with the flash drive?',
    iconType: 'usb',
    options: [
      {
        id: 'A',
        text: 'Plug it into your personal laptop to see who owns it so you can return it.',
        points: { phishing: 35, privacy: 30, deviceSecurity: 10, socialEngineering: 20 },
        explanation: 'Malicious USB drives (BadUSB) can inject keystrokes in 0.5 seconds and install malware automatically upon plugging in.',
        isOptimal: false,
      },
      {
        id: 'B',
        text: 'Plug it into a library computer instead of your own laptop so you stay safe.',
        points: { phishing: 30, privacy: 20, deviceSecurity: 15, socialEngineering: 20 },
        explanation: 'Plugging an unknown drive into a shared computer puts the entire school or university network in jeopardy.',
        isOptimal: false,
      },
      {
        id: 'C',
        text: 'Leave it quarantined and turn it in directly to the campus IT or security desk.',
        points: { phishing: 90, privacy: 90, deviceSecurity: 100, socialEngineering: 90 },
        explanation: 'True cyber defense! Hardware should never be trusted blindly. Safe triage belongs in an air-gapped lab.',
        isOptimal: true,
      },
      {
        id: 'D',
        text: 'Plug it in, but quickly run your antivirus right away.',
        points: { phishing: 45, privacy: 40, deviceSecurity: 30, socialEngineering: 35 },
        explanation: 'Hardware-level emulation attacks trigger before standard antivirus software even has time to scan files.',
        isOptimal: false,
      },
    ],
  },
  {
    id: 'q4-public-wifi',
    category: 'privacy',
    categoryLabel: 'Public Wi-Fi & Safe Browsing',
    scenario: 'You are studying at a local coffee shop. You see an open Wi-Fi network called "Free_HighSpeed_Campus_WiFi" with no password required.',
    prompt: 'How do you handle your connection?',
    iconType: 'wifi',
    options: [
      {
        id: 'A',
        text: 'Connect immediately and log into your student banking portal to check your balance.',
        points: { phishing: 20, privacy: 15, deviceSecurity: 20, socialEngineering: 20 },
        explanation: 'Rogue Wi-Fi access points can intercept and log all unencrypted passwords and traffic.',
        isOptimal: false,
      },
      {
        id: 'B',
        text: 'Connect only if you need to browse, but avoid logging into banking or sensitive portals unless on an encrypted VPN or cellular hotspot.',
        points: { phishing: 85, privacy: 95, deviceSecurity: 90, socialEngineering: 85 },
        explanation: 'Smart habit! Unencrypted networks are public airwaves. Use VPNs or trusted mobile hotspots for sensitive tasks.',
        isOptimal: true,
      },
      {
        id: 'C',
        text: 'If a browser pop-up asks you to install a "security certificate" to access the internet, accept it.',
        points: { phishing: 15, privacy: 10, deviceSecurity: 10, socialEngineering: 15 },
        explanation: 'Installing an unknown root certificate allows attackers to decrypt even your HTTPS connections!',
        isOptimal: false,
      },
      {
        id: 'D',
        text: 'Trust the network because its name has the word "Campus" in it.',
        points: { phishing: 30, privacy: 25, deviceSecurity: 25, socialEngineering: 20 },
        explanation: 'Anyone with a $20 Wi-Fi card can name their hotspot anything they want.',
        isOptimal: false,
      },
    ],
  },
  {
    id: 'q5-social-engineering',
    category: 'socialEngineering',
    categoryLabel: 'Social Engineering & Impersonation',
    scenario: 'A friend on social media suddenly sends you a message: "Hey! I am locked out of my account. Instagram is sending a 6-digit code to your phone. Can you send it to me real quick?"',
    prompt: 'How do you respond?',
    iconType: 'email',
    options: [
      {
        id: 'A',
        text: 'Send the code right away to help your friend out.',
        points: { phishing: 20, privacy: 15, deviceSecurity: 20, socialEngineering: 10 },
        explanation: 'That 6-digit code was the two-factor authentication code for YOUR account, not theirs! The attacker hijacked your friend\'s profile.',
        isOptimal: false,
      },
      {
        id: 'B',
        text: 'Call or speak to your friend in person through a different channel to verify, and NEVER share two-factor codes.',
        points: { phishing: 95, privacy: 95, deviceSecurity: 90, socialEngineering: 100 },
        explanation: 'Brilliant! Verification codes are private keys. Independent verification through voice or in-person confirms compromised accounts.',
        isOptimal: true,
      },
      {
        id: 'C',
        text: 'Post the screenshot of the code on your story so other friends can see what happened.',
        points: { phishing: 10, privacy: 10, deviceSecurity: 15, socialEngineering: 10 },
        explanation: 'Posting the code publicly lets anyone on the internet log into your account.',
        isOptimal: false,
      },
      {
        id: 'D',
        text: 'Ask the friend to answer a security question like "What color was my bike?" in the same chat.',
        points: { phishing: 45, privacy: 40, deviceSecurity: 40, socialEngineering: 45 },
        explanation: 'If the attacker has read the chat history, they might already know personal trivia. Verify out-of-band.',
        isOptimal: false,
      },
    ],
  },
];

export function evaluateSkillCheck(
  answers: Record<string, 'A' | 'B' | 'C' | 'D'>
): CyberSkillProfile {
  let phishingTotal = 0;
  let privacyTotal = 0;
  let deviceTotal = 0;
  let socialTotal = 0;
  let count = 0;

  SKILL_CHECK_QUESTIONS.forEach((q) => {
    const chosen = answers[q.id];
    if (chosen) {
      const opt = q.options.find((o) => o.id === chosen);
      if (opt) {
        phishingTotal += opt.points.phishing;
        privacyTotal += opt.points.privacy;
        deviceTotal += opt.points.deviceSecurity;
        socialTotal += opt.points.socialEngineering;
        count++;
      }
    }
  });

  const divisor = count > 0 ? count : 1;
  const phishing = Math.round(phishingTotal / divisor);
  const privacy = Math.round(privacyTotal / divisor);
  const deviceSecurity = Math.round(deviceTotal / divisor);
  const socialEngineering = Math.round(socialTotal / divisor);
  const overall = Math.round((phishing + privacy + deviceSecurity + socialEngineering) / 4);

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  const scores = [
    { name: 'Phishing Awareness', val: phishing, tip: 'Spotting fake senders & suspicious links' },
    { name: 'Privacy & Credentials', val: privacy, tip: 'Strong passphrases & 2FA protection' },
    { name: 'Device Security', val: deviceSecurity, tip: 'Hardware caution & rogue USB isolation' },
    { name: 'Social Engineering Defense', val: socialEngineering, tip: 'Resistance to false urgency & impersonation' },
  ];

  scores.sort((a, b) => b.val - a.val);

  // Top 2 are strengths
  scores.slice(0, 2).forEach((s) => {
    if (s.val >= 60) {
      strengths.push(`${s.name} (${s.val}%)`);
    }
  });
  if (strengths.length === 0) {
    strengths.push('Eager to Learn & Observant');
  }

  // Bottom 2 are weaknesses / growth areas
  scores.slice(2).forEach((s) => {
    if (s.val < 75) {
      weaknesses.push(`${s.name} (${s.val}%) - Practice ${s.tip}`);
    }
  });
  if (weaknesses.length === 0) {
    weaknesses.push('High foundational readiness across all vectors');
  }

  const strengthMap: Record<string, string> = {
    'Phishing Awareness': 'You have sharp instincts for spotting fake messages and suspicious urgent links.',
    'Privacy & Credentials': 'You are good at protecting personal information and using strong credentials.',
    'Device Security': 'You exercise great caution with unknown physical hardware and untrusted devices.',
    'Social Engineering Defense': 'You think critically before acting and verify requests independently.',
  };

  const improvementMap: Record<string, string> = {
    'Phishing Awareness': 'You sometimes trust urgent messages too quickly before verifying.',
    'Privacy & Credentials': 'You can strengthen your accounts with memorable passphrases and two-factor authentication.',
    'Device Security': 'Remember never to plug unknown USB devices or hardware into any computer.',
    'Social Engineering Defense': 'Be careful never to share one-time security codes or trust unexpected favors in chats.',
  };

  const topStrength = scores[0];
  const lowestScore = scores[scores.length - 1];

  const topStrengthSentence =
    strengthMap[topStrength.name] || 'You are good at protecting personal information.';
  const improvementAreaSentence =
    improvementMap[lowestScore.name] || 'You sometimes trust urgent messages too quickly.';

  return {
    phishing,
    privacy,
    deviceSecurity,
    socialEngineering,
    overallScore: overall,
    lastAssessedAt: Date.now(),
    demonstratedStrengths: strengths,
    demonstratedWeaknesses: weaknesses,
    topStrengthSentence,
    improvementAreaSentence,
  };
}
