import { CampaignFlags, PlayerState } from '../types';

export interface CampaignConsequence {
  id: string;
  flagKey: keyof CampaignFlags;
  title: string;
  threatLevel: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'CONTAINED';
  originLocation: string;
  affectedNpc: string;
  headline: string;
  description: string;
  ongoingDamage: string;
  trustDecayPerOp: number;
  remediationAction: {
    label: string;
    command: string;
    requiredAbility?: string;
    description: string;
    trustAward: number;
    successMessage: string;
  };
}

export const CAMPAIGN_CONSEQUENCES: Record<string, CampaignConsequence> = {
  phishCompromised: {
    id: 'consequence-phish-c2',
    flagKey: 'phishCompromised',
    title: 'Active C2 Beacon on Academic Subnet',
    threatLevel: 'HIGH',
    originLocation: 'Campus Library Workstation 12',
    affectedNpc: 'Dr. Sarah Lin',
    headline: 'Reverse Shell Active: un1versity-help.com / 198.51.100.88',
    description:
      'Because the malicious credential payload was authorized during the urgent library alert, the attacker successfully established an automated C2 reverse tunnel on Dr. Lin\'s research terminal. Local Kerberos tickets and session tokens are continuously exfiltrated.',
    ongoingDamage: '-2 Trust per operation as IT SecOps flags internal port 4444 beacons.',
    trustDecayPerOp: 2,
    remediationAction: {
      label: 'Execute Subnet Quarantine & Force Password Invalidation',
      command: 'isolate --node 198.51.100.88 --revoke-kerberos',
      requiredAbility: 'ISOLATE',
      description: 'Quarantine library subnet VLAN 4, kill active socket 4444, and reset Dr. Lin\'s enterprise credentials.',
      trustAward: 12,
      successMessage: 'Subnet VLAN 4 quarantined. Reverse socket terminated and enterprise credentials rotated. Threat contained.',
    },
  },

  badUsbExecuted: {
    id: 'consequence-badusb-botnet',
    flagKey: 'badUsbExecuted',
    title: 'CAD Lab Host Keystroke Compromise',
    threatLevel: 'CRITICAL',
    originLocation: 'Engineering Hall Lab Kiosk #04',
    affectedNpc: 'Marcus Vance',
    headline: 'Ghost Keystroke PowerShell Payload Running as NT AUTHORITY\\SYSTEM',
    description:
      'The unauthorized USB flash drive inserted into the CAD workstation triggered an immediate emulated keyboard injection. The payload downloaded a cryptominer and a lateral reconnaissance agent now scanning adjacent 3D printers and lab hosts.',
    ongoingDamage: '-3 Trust per operation due to campus lab network degradation.',
    trustDecayPerOp: 3,
    remediationAction: {
      label: 'Flash Host Firmware & Purge Keystroke Injector',
      command: 'quarantine --mac 70:3A:0E:CAD:04 --firmware-scrub',
      requiredAbility: 'ISOLATE',
      description: 'Isolate CAD Lab Kiosk #04 from the building switch, wipe emulated USB HID drivers, and re-image the host.',
      trustAward: 15,
      successMessage: 'CAD Lab host severed from building switch. Memory scrubbed and lateral scanning halted.',
    },
  },

  wifiSessionHijacked: {
    id: 'consequence-wifi-mitm',
    flagKey: 'wifiSessionHijacked',
    title: 'Rogue Gateway Session Hijack',
    threatLevel: 'HIGH',
    originLocation: 'Student Union Cafe',
    affectedNpc: 'Elena Rostova',
    headline: 'Grant Portal Auth Cookies Intercepted by MitM Pineapple',
    description:
      'Elena connected to the rogue "Campus-Secure_Free" evil twin access point. The rogue gateway intercepted her plaintext cookies and SSL session tokens, giving the adversary direct read/write access to her unpublished physics grant proposal.',
    ongoingDamage: '-2 Trust per operation as unauthorized drafts appear on Elena\'s grant repository.',
    trustDecayPerOp: 2,
    remediationAction: {
      label: 'Invalidate Grant Session Tokens & Blacklist Rogue BSSID',
      command: 'trace --spoof-detect 00:C0:CA:9A:88:14 --revoke-sessions',
      requiredAbility: 'TRACE',
      description: 'Send deauth frames to the Alfa Pineapple transmitter, ban its MAC address at campus boundary routers, and invalidate active grant tokens.',
      trustAward: 12,
      successMessage: 'Elena\'s session cookies invalidated globally. Rogue BSSID blacklisted at campus gateway.',
    },
  },

  qrPaymentLeaked: {
    id: 'consequence-qr-drain',
    flagKey: 'qrPaymentLeaked',
    title: 'Transit Terminal Wallet Drain Ring',
    threatLevel: 'ELEVATED',
    originLocation: 'Metro Central Ticketing Kiosk #4',
    affectedNpc: 'Tariq Al-Mansoor',
    headline: 'Crypto Escrow Wallet Draining Commuters Across City Line',
    description:
      'After the tampered QR code was scanned without inspection, Tariq\'s account was drained of $250. Surveillance reveals the sticker ring pasted overlays across five additional transit stations along the subway corridor.',
    ongoingDamage: '-2 Trust per operation as public complaints mount against transit ticketing security.',
    trustDecayPerOp: 2,
    remediationAction: {
      label: 'Dispatch Terminal Audit & Report Escrow Address to FinCEN',
      command: 'report --cert-dispatch IC3-TRANSIT-QR --freeze-escrow',
      requiredAbility: 'REPORT',
      description: 'File an emergency digital fraud notice with transit police, seize adhesive evidence, and flag crypto destination address.',
      trustAward: 14,
      successMessage: 'Transit police sweep removed 24 fraudulent stickers across 6 stations. Fraud dossier lodged with IC3.',
    },
  },
};

/**
 * Returns all currently active consequences given the player's campaign flags.
 */
export function getActiveConsequences(flags: CampaignFlags): CampaignConsequence[] {
  return Object.keys(CAMPAIGN_CONSEQUENCES)
    .filter((key) => flags[key as keyof CampaignFlags] === true)
    .map((key) => CAMPAIGN_CONSEQUENCES[key]);
}

/**
 * Calculates total passive trust decay from unresolved breaches.
 */
export function calculateTrustDecay(flags: CampaignFlags): number {
  const active = getActiveConsequences(flags);
  return active.reduce((acc, c) => acc + c.trustDecayPerOp, 0);
}

/**
 * Remediates a consequence by clearing its active flag.
 */
export function remediateConsequence(
  flags: CampaignFlags | undefined,
  consequenceId: string
): CampaignFlags {
  const current = { ...(flags || {}) } as CampaignFlags;
  const target = Object.values(CAMPAIGN_CONSEQUENCES).find((c) => c.id === consequenceId);
  if (target) {
    current[target.flagKey as keyof CampaignFlags] = false as any;
  }
  return current;
}

