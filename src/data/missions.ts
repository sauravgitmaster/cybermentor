import { MissionData } from '../types';

export const MISSIONS: Record<string, MissionData> = {
  'mission-01-email': {
    id: 'mission-01-email',
    locationId: 'campus',
    code: 'OPS-01',
    title: 'The Suspicious Email',
    concept: 'Spear Phishing & Typosquatting Domain Masquerade',
    threatCategory: 'Social Engineering',
    difficulty: 'Basic',
    requiredTrust: 0,
    npc: {
      id: 'npc-jordan',
      name: 'Jordan Rivera',
      role: 'Sophomore Biology Student',
      location: 'Campus Library Commons',
      status: 'Anxious / Stressed',
    },
    briefing: {
      situation: 'A panicked student flags you down near the library terminal room clutching a laptop with an urgent notice on screen.',
      npcDialogue: '"Hey, look at this! I just got an urgent message saying my student account and course portals will be terminated at midnight unless I confirm my credentials right now. Finals registration closes tomorrow—if I lose my portal, I lose my semester!"',
      objective: 'Examine the message using your cyber abilities. Investigate the sender address, embedded links, headers, and attachment before recommending an action to Jordan.',
    },
    investigationWorkspace: {
      type: 'email-client',
      title: 'AetherMail Web Client v4.2 [Sandboxed Terminal]',
      interfaceMetadata: {
        clientName: 'Campus Webmail Ingest',
        timestamp: 'Today at 14:22:04 UTC',
        senderDisplay: 'Campus IT Administration',
        senderRaw: 'IT-Support@un1versity-help.com',
        subject: 'URGENT: Account Verification Required [Final Notice]',
        bodyText: `Dear Student / Faculty Member,

Our campus identity management database is undergoing a critical security migration following detected synchronization anomalies.

Failure to verify your university credentials within 6 hours will result in permanent suspension of your campus single sign-on (SSO), email access, and student portal accounts.

Please download and submit the attached emergency verification package or click the portal verification link below immediately to preserve your access.

Campus Help Desk & System Operations
Un1versity Support Operations Directorate`,
        attachmentName: 'Verification_Form_Security.pdf.exe',
        attachmentSize: '2.4 MB',
        attachmentType: 'Executable Binary disguised as PDF',
        linkDisplay: 'https://university.edu/verify-account',
        linkUrl: 'http://192.241.82.11/secure/portal-login.php?ref=un1versity-help.com',
      },
      targets: [
        {
          id: 'target-sender',
          label: 'Sender Address & Domain',
          requiredAbility: 'INSPECT',
          previewValue: 'IT-Support@un1versity-help.com',
          revealedDetail: {
            heading: 'Domain Origin Analysis',
            summary: 'The sender domain utilizes typosquatting (homoglyph character substitution) substituting the numeral "1" for the letter "i".',
            technicalData: {
              'Displayed Header': 'IT-Support@un1versity-help.com',
              'Legitimate Domain': 'university.edu',
              'Domain Age': 'Registered 3 days ago (Namecheap Inc.)',
              'Nameservers': 'ns1.offshore-dns-bulletproof.io',
              'Indicator': 'Typosquatted domain mimicking campus authority',
            },
            threatIndicator: 'HIGH RISK: Unofficial lookalike domain created to deceive users.',
            evidenceYielded: {
              id: 'ev-01-sender-spoof',
              title: 'Typosquatted Lookalike Domain',
              category: 'Domain Analysis',
              description: 'Sender used "un1versity-help.com" replacing the letter "i" with numeral "1". Registered only 3 days ago.',
              technicalDetail: 'RFC 5322 From: IT-Support@un1versity-help.com, WHOIS created 72h prior.',
            },
          },
        },
        {
          id: 'target-headers',
          label: 'MIME Headers & SPF/DKIM Records',
          requiredAbility: 'VERIFY',
          previewValue: 'Received: from mail-relay-un1v.external.net',
          revealedDetail: {
            heading: 'Authentication & Routing Headers',
            summary: 'SPF and DMARC checks both report softfail and domain misalignment. The message did not originate from official campus mail servers.',
            technicalData: {
              'Originating IP': '185.220.101.44 (Tor Exit Node / Hosting provider in Eastern Europe)',
              'SPF Verification': 'SoftFail (domain owner does not designate sending IP)',
              'DKIM Signature': 'None / Unsigned',
              'Return-Path': 'bounce-collector@attacker-c2-drop.org',
              'DMARC': 'p=none (Rejected alignment)',
            },
            threatIndicator: 'HIGH RISK: Failed cryptographic email authentication checks.',
            evidenceYielded: {
              id: 'ev-02-spf-failure',
              title: 'Failed Email Authentication (SPF SoftFail)',
              category: 'Indicator of Compromise',
              description: 'The email failed cryptographic origin verification and routed through a known offshore proxy.',
              technicalDetail: 'Authentication-Results: spf=softfail (sender IP 185.220.101.44); dkim=none',
            },
          },
        },
        {
          id: 'target-link',
          label: 'Embedded Verification Link',
          requiredAbility: 'INSPECT',
          previewValue: 'https://university.edu/verify-account',
          revealedDetail: {
            heading: 'Hyperlink Destination Discrepancy',
            summary: 'The visible anchor text reads like a legitimate campus URL, but the actual underlying destination routes to a raw unencrypted IP address hosting a fake login form.',
            technicalData: {
              'Visible Text': 'https://university.edu/verify-account',
              'Actual Target': 'http://192.241.82.11/secure/portal-login.php',
              'Protocol': 'HTTP (Unencrypted plaintext)',
              'SSL Certificate': 'None present',
              'Payload Action': 'Credential harvester mimicking campus SSO interface',
            },
            threatIndicator: 'CRITICAL RISK: Deceptive link routing to a credential phishing capture script.',
            evidenceYielded: {
              id: 'ev-03-fake-url',
              title: 'Mismatched Link Destination & Credential Harvester',
              category: 'Indicator of Compromise',
              description: 'Anchor text masked a raw IP destination running an unencrypted credential phishing script.',
              technicalDetail: 'Anchor: https://university.edu/verify-account -> Href: http://192.241.82.11/secure/portal-login.php',
            },
          },
        },
        {
          id: 'target-attachment',
          label: 'File Attachment: Verification_Form_Security.pdf.exe',
          requiredAbility: 'INSPECT',
          previewValue: 'Verification_Form_Security.pdf.exe (2.4 MB)',
          revealedDetail: {
            heading: 'Double Extension Executable Analysis',
            summary: 'The file appears to be a PDF document at first glance, but utilizes a double file extension (.pdf.exe) to trick operating systems with hidden extensions into executing a compiled binary.',
            technicalData: {
              'Full Filename': 'Verification_Form_Security.pdf.exe',
              'MIME Type': 'application/x-dosexec (PE32 executable)',
              'Magic Bytes': '4D 5A (MZ DOS header signature)',
              'Digital Signature': 'Unsigned / Self-signed certificate revoked',
              'Static Analysis': 'Contains embedded keylogger and reverse TCP shell payload',
            },
            threatIndicator: 'CRITICAL THREAT: Disguised executable payload capable of local system takeover.',
            evidenceYielded: {
              id: 'ev-04-double-extension',
              title: 'Double Extension Disguised Malware (.pdf.exe)',
              category: 'Payload Inspection',
              description: 'Malicious PE32 executable masquerading as a PDF form to execute unauthorized code upon opening.',
              technicalDetail: 'MZ signature detected. Payload: Trojan.Generic.Dropper disguised as .pdf.exe.',
            },
          },
        },
        {
          id: 'target-wording',
          label: 'Psychological Urgency & Social Engineering',
          requiredAbility: 'OBSERVE',
          previewValue: '"Failure to verify within 6 hours will result in permanent suspension"',
          revealedDetail: {
            heading: 'Social Engineering Pattern',
            summary: 'The message employs artificial time scarcity, severe penalties, and high-stakes panic to suppress Jordan\'s critical thinking and force an impulsive reaction.',
            technicalData: {
              'Primary Trigger': 'Artificial urgency (6-hour termination ultimatum)',
              'Target Vulnerability': 'Academic anxiety during registration deadlines',
              'Official Policy Note': 'Campus IT policy mandates 30-day advance notice via official portal announcements, never direct email ultimatums.',
            },
            threatIndicator: 'PSYCHOLOGICAL BAIT: Classic coercive pressure tactics.',
            evidenceYielded: {
              id: 'ev-05-urgency-hook',
              title: 'Coercive Urgency Hook',
              category: 'Behavioral Clue',
              description: 'Attacker leveraged artificial deadline fear to bypass rational verification checks.',
              technicalDetail: 'Threat of immediate academic portal cutoff used as social engineering catalyst.',
            },
          },
        },
        {
          id: 'target-npc',
          label: 'Interview Student (Jordan)',
          requiredAbility: 'QUESTION',
          previewValue: 'Ask Jordan about past communications from IT',
          revealedDetail: {
            heading: 'Student Corroboration',
            summary: 'Jordan remembers: "Now that you mention it, when IT updated the Wi-Fi certs last month, they posted a banner directly inside our Student Portal dashboard. They didn\'t send an email demanding my password!"',
            technicalData: {
              'Standard IT Channel': 'Portal internal notification bell',
              'Student Confirmation': 'No matching ticket found on student account',
            },
            threatIndicator: 'CORROBORATED: Message contradicts official institutional protocol.',
          },
        },
      ],
    },
    decisions: [
      {
        id: 'decision-report-isolate',
        label: 'Advise Jordan to stop, report to Campus SecOps, and flag the malicious sender',
        type: 'defensive',
        description: 'Quarantine the email, prevent Jordan from clicking any links or opening the payload, and submit the message headers to the official Campus IT Security Desk (soc@university.edu).',
        trustChange: 12,
        isOptimal: true,
        immediateReaction: 'SecOps confirms the threat. Domain is blacklisted across the campus DNS resolver within 4 minutes.',
        consequenceText: 'Jordan sighs with immense relief: "You saved my entire semester! If I had entered my password or opened that file, my financial aid and registration would have been compromised." SecOps issues a campus-wide alert crediting the quick report.',
        screenEffect: 'clean',
      },
      {
        id: 'decision-open-attachment',
        label: 'Open the attachment to "see what kind of form" the IT department sent',
        type: 'reckless',
        description: 'Double-click the .pdf.exe file directly on the student workstation to inspect its contents.',
        trustChange: -10,
        isOptimal: false,
        immediateReaction: 'ALERT: Suspicious child process spawned (powershell.exe -enc ...). Memory defense tripwire triggered.',
        consequenceText: 'The screen flickers as an unauthorized background process attempts to dump local credentials. The lab network quarantine immediately disconnects the machine. Jordan is frozen in horror as an IT security tech arrives to seize the machine for forensic wiping.',
        screenEffect: 'threat-alert',
      },
      {
        id: 'decision-click-link',
        label: 'Click the link to verify if the page looks like the real university portal',
        type: 'reckless',
        description: 'Navigate to http://192.241.82.11 in the browser to see the login screen.',
        trustChange: -8,
        isOptimal: false,
        immediateReaction: 'Insecure connection established. Browser warnings bypassed.',
        consequenceText: 'The browser connects over unencrypted HTTP to a crude replica of the campus SSO portal. A fake alert prompt demands Jordan enter username, password, and Duo 2FA code. Exposing the browser to this server leaks Jordan\'s IP, browser fingerprint, and session cookies.',
        screenEffect: 'caution',
      },
      {
        id: 'decision-reply-ask',
        label: 'Reply to the email asking: "Is this actually from IT Support?"',
        type: 'passive',
        description: 'Send a quick message back to IT-Support@un1versity-help.com asking for confirmation.',
        trustChange: -4,
        isOptimal: false,
        immediateReaction: 'Active response acknowledged by attacker server.',
        consequenceText: 'The attacker immediately receives confirmation that Jordan\'s email is monitored by an active human target. Within 12 minutes, targeted follow-up phone calls and spoofed SMS texts begin flooding Jordan\'s phone with even more aggressive pretexting.',
        screenEffect: 'caution',
      },
    ],
    learningTakeaways: [
      'Typosquatting: Attackers register domains with swapped characters (e.g. un1versity vs university) to exploit visual scanning.',
      'Double Extensions: File managers often hide known extensions; a file named .pdf.exe is a dangerous compiled application, not a document.',
      'Hyperlink Mismatches: Never judge a link by the text on screen. Always verify the true target destination protocol and domain.',
      'Artificial Urgency: Legitimate IT services do not issue 6-hour account termination ultimatums via surprise emails.',
    ],
    rewardAbility: {
      id: 'ANALYZE',
      name: 'ANALYZE',
      description: 'Perform static binary decomposition, decode obscured URL parameters, and evaluate cryptographic certificates.',
      tier: 'advanced',
      command: 'analyze --deep',
    },
    completionCertificate: {
      id: 'CERT-SOC-01',
      title: 'Perimeter Defense & Phishing Triage',
      field: 'Cyber Defense Operations',
    },
  },

  'mission-02-usb': {
    id: 'mission-02-usb',
    locationId: 'campus',
    code: 'OPS-02',
    title: 'The Lost USB Drive',
    concept: 'Hardware Injection Attacks (BadUSB) & Baiting',
    threatCategory: 'Physical & Hardware Security',
    difficulty: 'Intermediate',
    requiredTrust: 10,
    npc: {
      id: 'npc-marcus',
      name: 'Marcus Chen',
      role: 'Computer Lab Proctor',
      location: 'Engineering Building Room 204',
      status: 'Curious & Uncertain',
    },
    briefing: {
      situation: 'Marcus noticed a sleek metallic USB drive sitting on top of an open keyboard in the campus CAD computer lab.',
      npcDialogue: '"Someone left this black flash drive labeled \'CS301_Final_Exams_Grading_Key\'. Several students walked by and stared at it. I was thinking of plugging it into my laptop to check who owns the drive so I can email them."',
      objective: 'Examine the physical drive and its hardware footprint before deciding whether to plug it into any networked machine.',
    },
    investigationWorkspace: {
      type: 'hardware-analyzer',
      title: 'Isolated Hardware Diagnostic Cradle [Air-Gapped Rig]',
      interfaceMetadata: {
        clientName: 'Hardware USB Interceptor (Bus Pirate Interface)',
        timestamp: 'Today at 16:05:11 UTC',
        senderDisplay: 'Physical Artifact: Model RubberDucky / Custom Microcontroller',
        subject: 'USB Device Descriptor & VID/PID Inspection',
        bodyText: `PHYSICAL LABELS:
- Front: Hand-written silver marker: "CS301 Fall Final Exams - Prof. Miller"
- Rear: Small reset button recessed into the plastic case

HARDWARE EMULATION INTERFACE:
- Microcontroller: ATmega32U4 / RP2040 chip
- Enumerated Device Class: 0x03 (Human Interface Device - HID Keyboard)
- Storage Controller: Simulated / Secondary MicroSD slot
- Hardware Vendor ID (VID): 0x16C0 (Non-standard / Prototyping)
- Product ID (PID): 0x05DF`,
        attachmentName: 'inject.bin',
        attachmentSize: '48 KB',
        attachmentType: 'DuckyScript Micro-Payload',
        linkDisplay: 'Hardware Bus: Port 0x02',
      },
      targets: [
        {
          id: 'target-hid-descriptor',
          label: 'USB Device Descriptor (HID vs Storage)',
          requiredAbility: 'INSPECT',
          previewValue: 'Device Class: 0x03 (Human Interface Device Keyboard)',
          revealedDetail: {
            heading: 'Hardware Device Spoofing',
            summary: 'Despite looking like a simple flash drive, the device identifies to the operating system as a USB keyboard. When plugged in, it can type 1,000 keystrokes per second to open a terminal and execute malware.',
            technicalData: {
              'Actual Device Class': 'HID Keyboard (bInterfaceClass 0x03)',
              'Expected Class': 'Mass Storage Device (0x08)',
              'Attack Type': 'BadUSB / Keystroke Injection Weapon',
              'Execution Speed': 'Instantly fires commands upon port power',
            },
            threatIndicator: 'CRITICAL HARDWARE THREAT: Device will hijack keyboard control upon connection.',
            evidenceYielded: {
              id: 'ev-06-badusb-hid',
              title: 'BadUSB Hardware Emulator',
              category: 'Indicator of Compromise',
              description: 'The USB drive mimics a Human Interface Device (keyboard) rather than storage media to inject terminal commands.',
              technicalDetail: 'Device Class 0x03 (HID). Microcontroller firmware contains automated keystroke injection payload.',
            },
          },
        },
        {
          id: 'target-payload-script',
          label: 'Microcontroller Keystroke Script',
          requiredAbility: 'ANALYZE',
          previewValue: 'inject.bin (Embedded payload)',
          revealedDetail: {
            heading: 'DuckyScript Payload Analysis',
            summary: 'The script executes: GUI r -> cmd.exe -> downloads payload from remote staging server and establishes persistent backdoor.',
            technicalData: {
              'Command 1': 'DELAY 500',
              'Command 2': 'GUI r (Opens Run dialog)',
              'Command 3': 'STRING powershell -w hidden -c "IEX(New-Object Net.WebClient).DownloadString(...)"',
              'Risk': 'Complete system compromise in under 3 seconds',
            },
            threatIndicator: 'ACTIVE MALWARE: Automated reverse-shell script.',
            evidenceYielded: {
              id: 'ev-07-keystroke-payload',
              title: 'Keystroke Injection Payload',
              category: 'Payload Inspection',
              description: 'Pre-programmed keyboard script designed to open Windows Run dialog and execute remote PowerShell commands.',
              technicalDetail: 'DuckyScript binary payload containing obfuscated PowerShell download cradle.',
            },
          },
        },
        {
          id: 'target-baiting-psychology',
          label: 'Label Psychology (Baiting Attack)',
          requiredAbility: 'OBSERVE',
          previewValue: '"CS301 Fall Final Exams - Prof. Miller"',
          revealedDetail: {
            heading: 'Physical Social Engineering (Baiting)',
            summary: 'Attackers deliberately leave tempting or authoritative labels like "Exams", "Payroll", or "Executive Compensation" in public areas knowing human curiosity will prompt someone to plug it in.',
            technicalData: {
              'Bait Vector': 'High-interest academic material',
              'Placement Strategy': 'High-traffic lab desk beside shared printer',
            },
            threatIndicator: 'SOCIAL TRAP: Designed to exploit academic curiosity.',
          },
        },
      ],
    },
    decisions: [
      {
        id: 'decision-quarantine-usb',
        label: 'Confiscate the drive, keep it unpowered, and deliver to Campus SecOps for destruction',
        type: 'defensive',
        description: 'Instruct Marcus never to plug stray drives into campus workstations and turn the artifact over to the security team.',
        trustChange: 14,
        isOptimal: true,
        immediateReaction: 'SecOps logs the hardware serial and issues an advisory regarding targeted USB drops on campus.',
        consequenceText: 'Marcus realizes the danger: "That could have taken down our entire lab network and stolen everyone\'s lab accounts. I\'m glad we checked the hardware specs first!"',
        screenEffect: 'clean',
      },
      {
        id: 'decision-plug-laptop',
        label: 'Plug the drive into Marcus\'s laptop to see if there is an owner text file',
        type: 'reckless',
        description: 'Insert the drive into a USB 3.0 port on the proctor workstation.',
        trustChange: -12,
        isOptimal: false,
        immediateReaction: 'KEYSTROKE INJECTION IN PROGRESS: Ghost typing detected. Command prompt spawned.',
        consequenceText: 'Within 800 milliseconds of plugging the drive in, terminal windows flash across the monitor. The workstation begins exfiltrating saved browser passwords to a remote command server. The lab proctor account is compromised.',
        screenEffect: 'threat-alert',
      },
      {
        id: 'decision-format-drive',
        label: 'Plug it in and quickly format it to wipe any files',
        type: 'reckless',
        description: 'Attempt to insert the drive and quickly right-click "Format".',
        trustChange: -8,
        isOptimal: false,
        immediateReaction: 'Keystroke payload executes before the operating system can even mount the storage partition.',
        consequenceText: 'Formatting only affects storage partitions; it cannot prevent an emulated keyboard from firing keystrokes during initialization. The exploit completes before the format dialog even opens.',
        screenEffect: 'threat-alert',
      },
    ],
    learningTakeaways: [
      'BadUSB: USB controllers can be reprogrammed to act as keyboards, executing arbitrary keystrokes faster than human reaction time.',
      'Physical Baiting: Attackers rely on enticing labels like "Exams" or "Confidential" to provoke careless insertion.',
      'Hardware Isolation: Never test unknown physical storage devices on trusted or production workstations.',
    ],
    rewardAbility: {
      id: 'ISOLATE',
      name: 'ISOLATE',
      description: 'Quarantine compromised nodes, disconnect network interfaces, and prevent lateral movement.',
      tier: 'advanced',
      command: 'isolate --network-kill',
    },
  },

  'mission-03-wifi': {
    id: 'mission-03-wifi',
    locationId: 'campus',
    code: 'OPS-03',
    title: 'The Rogue Access Point',
    concept: 'Evil Twin Wi-Fi & SSL Stripping MitM',
    threatCategory: 'Network Security',
    difficulty: 'Intermediate',
    requiredTrust: 20,
    npc: {
      id: 'npc-elena',
      name: 'Elena Rostova',
      role: 'Graduate Research Fellow',
      location: 'Student Union Cafe',
      status: 'Working on Grant Proposal',
    },
    briefing: {
      situation: 'Elena is sitting at the crowded Student Union Cafe attempting to submit an encrypted research paper.',
      npcDialogue: '"The cafe Wi-Fi was really slow, but I just spotted a new network called \'Campus_HighSpeed_Guest_NoPassword\'. It doesn\'t ask for any login, and the signal is at full strength. Should I connect to get my grant submitted?"',
      objective: 'Inspect the Wi-Fi beacon frames, encryption protocols, and BSSID MAC addresses before connecting.',
    },
    investigationWorkspace: {
      type: 'network-scanner',
      title: 'Spectrum & Packet Sniffer [802.11 Monitor Mode]',
      interfaceMetadata: {
        clientName: 'AetherScan RF Inspector',
        timestamp: 'Today at 17:18:02 UTC',
        senderDisplay: 'SSID: Campus_HighSpeed_Guest_NoPassword',
        subject: '802.11 Beacon Frame Telemetry',
        bodyText: `DETECTED NEARBY WIRELESS ACCESS POINTS:
1. SSID: "Campus-Secure-802.1X"
   - Encryption: WPA3-Enterprise (EAP-TLS)
   - BSSID: 70:3A:0E:11:42:01 (Cisco Catalyst Campus AP)
   - Signal: -68 dBm

2. SSID: "Campus_HighSpeed_Guest_NoPassword"
   - Encryption: OPEN (None / Plaintext)
   - BSSID: 00:C0:CA:9A:88:14 (Alfa Network Pineapple / Portable USB NIC)
   - Signal: -32 dBm (Extremely close proximity, laptop beside counter)
   - Captive Portal Gateway: 10.0.0.1 running dnsmasq and mitmproxy`,
        attachmentName: 'pcap_capture_beacon.pcap',
        attachmentSize: '1.1 MB',
        attachmentType: 'Network Packet Trace',
        linkDisplay: 'BSSID: 00:C0:CA:9A:88:14',
      },
      targets: [
        {
          id: 'target-encryption-type',
          label: 'Encryption Standard & Authentication',
          requiredAbility: 'INSPECT',
          previewValue: 'Security: OPEN (No encryption, unauthenticated)',
          revealedDetail: {
            heading: 'Open Unencrypted Airwaves',
            summary: 'All packets transmitted over an open network can be sniffed out of the air by anyone in radio range. No mutual authentication exists between client and access point.',
            technicalData: {
              'Security Type': 'None (Open / Plaintext 802.11)',
              'Eavesdropping Risk': '100% of unencrypted local traffic visible',
              'Man-in-the-Middle Risk': 'Attacker routes all gateway traffic through proxy',
            },
            threatIndicator: 'HIGH RISK: Unencrypted broadcast transmission.',
            evidenceYielded: {
              id: 'ev-08-open-wifi',
              title: 'Unauthenticated Open Wi-Fi Rogue Node',
              category: 'Network Artifact',
              description: 'Open access point configured without WPA2/WPA3 encryption, allowing passive radio traffic capture.',
              technicalDetail: '802.11 Beacon: Capability Information: ESS (Privacy flag: 0)',
            },
          },
        },
        {
          id: 'target-bssid-hardware',
          label: 'BSSID Hardware Fingerprint',
          requiredAbility: 'VERIFY',
          previewValue: 'BSSID: 00:C0:CA:9A:88:14 (Alfa Network Vendor OUI)',
          revealedDetail: {
            heading: 'Hardware Identity Mismatch',
            summary: 'Official campus access points use Cisco/Aruba enterprise hardware. The MAC address prefix 00:C0:CA belongs to portable penetration testing hardware frequently used for rogue AP (Evil Twin) attacks.',
            technicalData: {
              'Vendor OUI': 'Alfa Network Inc. (High-power portable Wi-Fi card)',
              'Official Campus OUI': 'Cisco Systems / Aruba Networks',
              'Proximity': 'Transmitter is approximately 1.5 meters away (backpack under window)',
            },
            threatIndicator: 'CRITICAL INDICATOR: Commercial rogue AP hardware in use.',
            evidenceYielded: {
              id: 'ev-09-rogue-ap-hardware',
              title: 'Evil Twin Rogue Access Point',
              category: 'Indicator of Compromise',
              description: 'Access point broadcasted by portable attack tool (WiFi Pineapple / Alfa card) mimicking campus branding.',
              technicalDetail: 'OUI: 00:C0:CA (Alfa Network). RSSI -32 dBm indicates immediate physical vicinity.',
            },
          },
        },
      ],
    },
    decisions: [
      {
        id: 'decision-warn-elena',
        label: 'Instruct Elena to avoid the rogue network and connect only to the official 802.1X network with VPN',
        type: 'defensive',
        description: 'Stick to Campus-Secure-802.1X with campus VPN enabled and report the rogue SSID to network operations.',
        trustChange: 12,
        isOptimal: true,
        immediateReaction: 'Network security locates the rogue transmitter and disconnects the malicious station.',
        consequenceText: 'Elena submits her grant safely through encrypted tunnels. "I had no idea someone in the cafe could set up a fake Wi-Fi network named after the university. You saved my research data!"',
        screenEffect: 'clean',
      },
      {
        id: 'decision-connect-quick',
        label: 'Connect to the open Wi-Fi quickly just to upload the grant file',
        type: 'reckless',
        description: 'Associate with Campus_HighSpeed_Guest_NoPassword and start browsing.',
        trustChange: -10,
        isOptimal: false,
        immediateReaction: 'DNS queries intercepted. SSL Stripping downgrade in progress.',
        consequenceText: 'The rogue gateway intercepts all DNS lookups and injects spoofed responses. Elena\'s session tokens for the grant submission portal are captured by the operator\'s mitmproxy script.',
        screenEffect: 'threat-alert',
      },
    ],
    learningTakeaways: [
      'Evil Twin Wi-Fi: Attackers set up access points with familiar names to lure victims into routing traffic through attacker proxies.',
      'Open Networks: Avoid open public networks without end-to-end VPN tunnels.',
      'MAC OUI Verification: Enterprise networks utilize verified infrastructure hardware, not portable USB network adapters.',
    ],
    rewardAbility: {
      id: 'TRACE',
      name: 'TRACE',
      description: 'Follow network routes, map hops, inspect routing tables, and identify spoofed gateways.',
      tier: 'advanced',
      command: 'trace --hops',
    },
  },

  'mission-04-qr-scam': {
    id: 'mission-04-qr-scam',
    locationId: 'digital-city',
    code: 'OPS-04',
    title: 'The Tampered Transit QR',
    concept: 'QRLjacking & Malicious QR Code Overlays',
    threatCategory: 'Mobile & Social Engineering',
    difficulty: 'Intermediate',
    requiredTrust: 25,
    npc: {
      id: 'npc-tariq',
      name: 'Tariq Al-Mansoor',
      role: 'Commuter & App Developer',
      location: 'Metro Central Ticketing Station',
      status: 'Rushing for train',
    },
    briefing: {
      situation: 'At the central metro automated ticketing kiosk, Tariq is about to scan a glossy sticker placed over the payment screen.',
      npcDialogue: '"The card reader is out of order, but there is a sticker saying \'Quick Mobile Pay - 50% Metro Discount\'. If I scan it with my banking app, I can catch the 5:15 express train!"',
      objective: 'Inspect the physical sticker, decoded URL payload, and domain registration before Tariq scans it.',
    },
    investigationWorkspace: {
      type: 'hardware-analyzer',
      title: 'Optical Scanner & URL De-Obfuscator',
      interfaceMetadata: {
        clientName: 'QR Security Decoupler',
        timestamp: 'Today at 17:11:00 UTC',
        senderDisplay: 'Physical Overlay Sticker',
        subject: 'Decoded QR Matrix Telemetry',
        bodyText: `PHYSICAL INSPECTION:
- Surface: A vinyl adhesive sticker pasted directly over the official laser-etched metal payment plate
- Edges: Corner peeling reveals the original transit agency logo underneath

DECODED BARCODE PAYLOAD:
- Raw URI: https://bit.ly/metro-fast-pay-discount-2026
- Expanded Redirection Chain:
  Step 1: https://bit.ly/metro-fast-pay-discount-2026
  Step 2: https://metro-city-tickets-discount.xyz/pay/invoice.php?device=mobile
  Step 3: Webview triggers intent: bankpay://transfer?recipient=crypto-escrow-wallet&amount=250`,
        attachmentName: 'qr_matrix_decoded.png',
        attachmentSize: '64 KB',
        attachmentType: 'Barcode Payload Analysis',
        linkDisplay: 'https://metro-city-tickets-discount.xyz',
      },
      targets: [
        {
          id: 'target-physical-overlay',
          label: 'Physical Sticker Layer & Edge Inspection',
          requiredAbility: 'OBSERVE',
          previewValue: 'Physical vinyl sticker placed over official kiosk surface',
          revealedDetail: {
            heading: 'Physical Tampering (QR Overlay Attack)',
            summary: 'Criminals print sticker overlays and paste them over legitimate public QR codes (parking meters, bike rentals, transit kiosks).',
            technicalData: {
              'Physical State': 'Adhesive overlay, non-manufacturer material',
              'Original Plate': 'Metal laser engraving obscured underneath',
            },
            threatIndicator: 'PHYSICAL TAMPERING CONFIRMED: Unauthorized sticker placement.',
            evidenceYielded: {
              id: 'ev-10-qr-overlay',
              title: 'Physical QR Code Sticker Overlay',
              category: 'Indicator of Compromise',
              description: 'A fraudulent vinyl sticker was adhered over the official kiosk payment interface.',
              technicalDetail: 'Physical tampering observed: peelable adhesive layer concealing official terminal markings.',
            },
          },
        },
        {
          id: 'target-redirect-chain',
          label: 'URL Shortener & Deep Link Analysis',
          requiredAbility: 'ANALYZE',
          previewValue: 'Shortened URL -> bank transfer deep link intent',
          revealedDetail: {
            heading: 'Malicious Payment Deep Link',
            summary: 'The QR code uses a shortened URL to conceal an automated mobile banking intent that requests an immediate unauthorized fund transfer.',
            technicalData: {
              'Shortener': 'bit.ly (Obfuscation layer)',
              'Host Domain': 'metro-city-tickets-discount.xyz (Registered 48h ago)',
              'Target Intent': 'bankpay://transfer (Direct API call to mobile banking apps)',
            },
            threatIndicator: 'CRITICAL FINANCIAL THREAT: Pre-populated mobile wallet extraction.',
            evidenceYielded: {
              id: 'ev-11-qr-intent',
              title: 'Malicious Mobile Payment Deep Link',
              category: 'Payload Inspection',
              description: 'Shortened QR code resolved to a deep-link intent attempting to trigger instant fund transfer.',
              technicalDetail: 'Intent URI: bankpay://transfer?recipient=crypto-escrow-wallet. Target: metro-city-tickets-discount.xyz.',
            },
          },
        },
      ],
    },
    decisions: [
      {
        id: 'decision-peel-report-qr',
        label: 'Stop Tariq, alert transit security, and report the fraudulent sticker',
        type: 'defensive',
        description: 'Prevent the scan, photograph the sticker as evidence, and report the tampered kiosk to station staff.',
        trustChange: 15,
        isOptimal: true,
        immediateReaction: 'Station security removes 6 identical stickers across the terminal and issues a commuter warning.',
        consequenceText: 'Tariq checks his phone: "I almost authorized a $250 transfer to a crypto wallet! Thank you for spotting the sticker seam."',
        screenEffect: 'clean',
      },
      {
        id: 'decision-scan-qr',
        label: 'Let Tariq scan the QR code to see if the discount page loads',
        type: 'reckless',
        description: 'Scan the sticker using a mobile phone camera.',
        trustChange: -12,
        isOptimal: false,
        immediateReaction: 'Banking application prompted with high-value transfer authorization request.',
        consequenceText: 'The mobile browser opens the banking intent. If Tariq biometric-confirms without reading the recipient field, the funds are irreversibly wired.',
        screenEffect: 'threat-alert',
      },
    ],
    learningTakeaways: [
      'QR Code Overlays: Check physical QR codes for raised edges, stickers, or misalignment before scanning.',
      'URL Verification: Always preview the full destination domain before allowing a mobile app to navigate or execute intents.',
      'Payment Verification: Official transit systems do not offer random 50% discounts via pasted stickers.',
    ],
    rewardAbility: {
      id: 'REPORT',
      name: 'REPORT',
      description: 'Compile cryptographic evidence dossiers and dispatch incident reports to CERT / SecOps.',
      tier: 'advanced',
      command: 'report --cert-dispatch',
    },
  },
};
