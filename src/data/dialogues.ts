export interface NPCDialogue {
  id: string;
  name: string;
  role: string;
  avatarSeed: string;
  unresolvedText: string[];
  resolvedText: string[];
  primaryActionLabel: string;
  reviewActionLabel: string;
  missionId: string;
}

export const NPC_DIALOGUES: Record<string, NPCDialogue> = {
  'npc-jordan': {
    id: 'npc-jordan',
    name: 'Jordan Rivera',
    role: 'Sophomore Biology • Student',
    avatarSeed: 'jordan',
    unresolvedText: [
      'Hey! Are you the security operative from campus IT?',
      'Something really weird just landed in my student inbox. It says my tuition refund will be forfeited in two hours if I don’t verify my credentials, but the sender domain looks... strange.',
      'I almost entered my university password. Can you run a forensic check before I do something stupid?',
    ],
    resolvedText: [
      'Thank you so much for disarming that phishing lure!',
      'Campus IT confirmed it was a coordinated credential harvester targeting biology students. I told my entire study group what to look out for in raw email headers!',
    ],
    primaryActionLabel: 'Investigate Suspicious Email',
    reviewActionLabel: 'Review Email Forensics',
    missionId: 'mission-01-email',
  },
  'npc-marcus': {
    id: 'npc-marcus',
    name: 'Marcus Chen',
    role: 'Hardware Lab Proctor • Computer Engineering',
    avatarSeed: 'marcus',
    unresolvedText: [
      'Hold up operative, take a look at this.',
      'I found this unlabeled flash drive dropped right outside CAD Workstation 4. Someone hand-wrote "Final_Exam_Review_2026.pdf" on the casing.',
      'A couple of freshmen were about to plug it straight into the lab mainframe. Let’s isolate it in the quarantine rig and inspect the controller before anyone touches it.',
    ],
    resolvedText: [
      'That hardware quarantine call was textbook!',
      'The forensic dump showed the drive was emulating a USB Human Interface Device (HID) to type terminal commands at light speed. You saved our entire lab network.',
    ],
    primaryActionLabel: 'Isolate & Inspect USB Drive',
    reviewActionLabel: 'Review Hardware Inspection',
    missionId: 'mission-02-usb',
  },
  'npc-elena': {
    id: 'npc-elena',
    name: 'Elena Rostova',
    role: 'Research Fellow • Network Systems',
    avatarSeed: 'elena',
    unresolvedText: [
      'Excuse me—do you have a network analyzer handy?',
      'I was about to submit my doctoral fellowship proposal from the Student Union cafe, but my laptop auto-joined a network named "Campus-Guest-UltraFast".',
      'The signal strength is maxed out, but the BSSID prefix doesn’t match our university hardware manifest. It might be a rogue Evil Twin access point!',
    ],
    resolvedText: [
      'Your Wi-Fi beacon analysis was brilliant!',
      'The BSSID mapped to a portable penetration testing kit concealed in a backpack by the cafe counter. My grant submission went through cleanly over the encrypted tunnel.',
    ],
    primaryActionLabel: 'Analyze Wi-Fi Beacons',
    reviewActionLabel: 'Review RF Telemetry',
    missionId: 'mission-03-wifi',
  },
  'npc-tariq': {
    id: 'npc-tariq',
    name: 'Tariq Al-Mansoor',
    role: 'Urban Commuter • Graduate Student',
    avatarSeed: 'tariq',
    unresolvedText: [
      'Hey operative, take a close look at this transit parking kiosk.',
      'I was pulling out my phone to scan this quick-pay QR code, but when I brushed my finger against the plate, there was a raised sticker edge.',
      'Someone pasted an adhesive code over the official metal engraving. If this triggers a malicious deep link, it could hijack mobile banking intents!',
    ],
    resolvedText: [
      'That physical sticker inspection saved my account from an automated $250 transfer!',
      'Station security peeled back the fake sticker and found four more across the bus terminal. Great eye for physical tampering!',
    ],
    primaryActionLabel: 'Inspect QR Code Substrate',
    reviewActionLabel: 'Review Kiosk Evidence',
    missionId: 'mission-04-qr-scam',
  },
  'npc-chief-vance': {
    id: 'npc-chief-vance',
    name: 'Chief Analyst Vance',
    role: 'Campus IT Security Directorate • SecOps Command',
    avatarSeed: 'vance',
    unresolvedText: [
      'Outstanding work across the campus perimeter, operative.',
      'You successfully disarmed the spear-phishing attack at the Library, neutralized the rogue Wi-Fi at the Student Union, and quarantined the BadUSB weapon in Engineering.',
      'Our campus threat level has dropped significantly. You now have unrestricted access to all SecOps forensic terminals and the Macro Network Gateway!',
    ],
    resolvedText: [
      'All perimeter sectors report stable telemetry. Your investigative records and forensic evidence are securely archived in the Central Evidence Board.',
      'Continue monitoring the Gateway Console for outer perimeter anomalies across Digital City and enterprise networks.',
    ],
    primaryActionLabel: 'Review Sector Operations',
    reviewActionLabel: 'Access SecOps Terminal',
    missionId: 'mission-01-email',
  },
};
