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
    doctrineBrief: {
      title: 'DOCTRINE // PHISHING TRIAGE & DOMAIN SPOOFING',
      durationHint: '45 sec',
      facts: [
        '91% of targeted enterprise and campus intrusions originate from spear-phishing with spoofed domains or disguised binaries.',
        'Display names are unverified client strings with zero cryptographic authority; transport envelope headers (RFC 5322 From vs Return-Path) reveal the true sender.',
        'Double-extension files (.pdf.exe) exploit operating system extension hiding to execute compiled binaries on unsuspecting endpoints.',
      ],
      attackerModel:
        'Adversaries weaponize cognitive panic and manufactured urgency (such as immediate portal deactivation or missing finals) to induce reflexive credential submission before the target examines routing headers.',
      whatGoodLooksLike:
        'Zero Trust in unsolicited urgent directives. Inspect the raw From header against authoritative MX records, verify SPF/DKIM flags, inspect link targets without clicking, and report the message directly to campus SecOps without forwarding or running files.',
      relatedAbility: 'ANALYZE',
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
        label: 'Advise Jordan to stop, report to Campus SecOps, and quarantine the message',
        type: 'defensive',
        description: 'Quarantine the email, prevent Jordan from clicking any links or opening the payload, and submit the message headers to the official Campus IT Security Desk (soc@university.edu).',
        trustChange: 15,
        isOptimal: true,
        immediateReaction: 'SecOps confirms the threat. Domain is blacklisted across the campus DNS resolver within 4 minutes.',
        consequenceText: 'Jordan sighs with immense relief: "You saved my entire semester! If I had entered my password or opened that file, my financial aid and registration would have been compromised." SecOps issues a campus-wide alert crediting the quick report.',
        screenEffect: 'clean',
      },
      {
        id: 'decision-click-link',
        label: 'Click the verification link to inspect the student portal login page',
        type: 'reckless',
        description: 'Navigate to http://192.241.82.11 in the browser to see the login screen.',
        trustChange: -15,
        isOptimal: false,
        immediateReaction: 'Insecure connection established. Browser warnings bypassed. Credential harvester active.',
        consequenceText: 'The browser connects over unencrypted HTTP to a replica of the campus SSO portal. Exposing the browser leaks Jordan\'s IP, session cookies, and login credentials to an offshore proxy.',
        screenEffect: 'threat-alert',
      },
      {
        id: 'decision-open-attachment',
        label: 'Open Semester_Schedule_Update.pdf.exe to inspect the verification form',
        type: 'reckless',
        description: 'Double-click the .pdf.exe file directly on the student workstation to inspect its contents.',
        trustChange: -20,
        isOptimal: false,
        immediateReaction: 'ALERT: Suspicious child process spawned (powershell.exe -enc ...). Memory defense tripwire triggered.',
        consequenceText: 'The screen flickers as an unauthorized background process attempts to dump local credentials. The lab network quarantine immediately disconnects the machine, and SecOps seizes the workstation.',
        screenEffect: 'threat-alert',
      },
      {
        id: 'decision-forward-classmate',
        label: 'Forward the email to classmates to ask if they received the same notice',
        type: 'passive',
        description: 'Forward the phishing email and attachment to Jordan\'s biology class mailing list.',
        trustChange: -10,
        isOptimal: false,
        immediateReaction: 'Malicious payload re-distributed across campus student email distribution list.',
        consequenceText: 'By forwarding the unverified email, Jordan inadvertently helps the attacker propagate the threat. Three other students click the link before mail filters can purge the message.',
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
    doctrineBrief: {
      title: 'DOCTRINE // HARDWARE & REMOVABLE MEDIA THREATS',
      durationHint: '45 sec',
      facts: [
        'Modern BadUSB microcontrollers emulate standard USB HID keyboards, injecting arbitrary commands at up to 1,000 keystrokes per second.',
        'Plugging an untrusted USB into any device—even a supposed "test machine"—instantly triggers hardware bus enumeration and driver execution before OS-level antivirus scans run.',
        'Physical baiting exploits human curiosity or academic stress; dropped drives in computer labs have an estimated 48% plug-in rate without active training.',
      ],
      attackerModel:
        'Attackers rely on physical proximity and natural curiosity to bypass air-gapped or perimeter network firewalls. By packaging an ATmega or RP2040 microcontroller into a standard flash drive housing labeled with high-value lures ("Exam Keys", "Payroll"), adversaries ensure an unsuspecting insider plugs the weapon directly into internal workstations.',
      whatGoodLooksLike:
        'Zero execution on untrusted physical media. The moment an abandoned or unknown storage device is discovered, it is treated as a potential hardware payload. It must never be inserted into personal laptops or lab workstations—even to format it. Custody is maintained in an electrostatic containment bag and delivered directly to campus SecOps.',
      relatedAbility: 'ISOLATE',
    },
    briefing: {
      situation: 'Marcus noticed a sleek metallic USB drive sitting on top of an open keyboard in the campus CAD computer lab.',
      npcDialogue: '"Someone left this black flash drive labeled \'EXAM_SOLUTIONS_2026\'. Several students walked by and stared at it. I was thinking of plugging it into my laptop to check who owns the drive so I can email them."',
      objective: 'Examine the physical drive and its hardware footprint before deciding whether to plug it into any networked machine.',
    },
    investigationWorkspace: {
      type: 'hardware-analyzer',
      title: 'Air-Gapped Hardware Diagnostic Cradle [Bus Pirate Protocol Analyzer]',
      interfaceMetadata: {
        clientName: 'Hardware USB Interceptor (Air-Gapped Diagnostic Rig)',
        timestamp: 'Today at 16:05:11 UTC',
        senderDisplay: 'Physical Artifact: Model RubberDucky / ATmega32U4 Controller',
        subject: 'USB Device Descriptor & VID/PID Inspection',
        bodyText: `PHYSICAL LABELS & CASING:
- Front: Hand-written label "EXAM_SOLUTIONS_2026"
- Rear: Recessed pinhole hardware reset switch
- Volume Label: EXAM_SOLUTIONS_2026

HARDWARE EMULATION INTERFACE:
- Microcontroller: ATmega32U4 composite controller
- Enumerated Device Class: 0x03 (Human Interface Device - HID Keyboard)
- Storage Controller: Simulated secondary MicroSD bridge (0x08)
- Hardware Vendor ID (VID): 0x16C0 (Prototyping / Hak5 Hardware)
- Product ID (PID): 0x05DF (RubberDucky Emulation Mode)

FILESYSTEM & PAYLOAD DISASSEMBLY:
- autorun.inf (Hidden system file)
- grades.pdf.lnk (LNK shortcut pointing to powershell execution)
- update.ps1 (Staged cradle)`,
        attachmentName: 'inject.bin',
        attachmentSize: '48 KB',
        attachmentType: 'DuckyScript Keystroke Payload',
        linkDisplay: 'Hardware Bus: Port 0x02',
      },
      targets: [
        {
          id: 'target-baiting-psychology',
          label: 'Physical Exterior & Label Psychology (Baiting)',
          requiredAbility: 'OBSERVE',
          previewValue: 'Hand-written marker: "EXAM_SOLUTIONS_2026"',
          revealedDetail: {
            heading: 'Physical Social Engineering (Baiting Vector)',
            summary: 'Attackers deliberately place enticing labels like "EXAM_SOLUTIONS_2026", "Payroll", or "Bonus" on dropped media in university labs knowing human curiosity or academic stress will provoke hasty connection.',
            technicalData: {
              'Lure Type': 'High-value academic temptation',
              'Placement Strategy': 'Shared printer counter, Room 204',
              'Physical Form': 'Standard USB Type-A enclosure with recessed flash reset pin',
            },
            threatIndicator: 'SOCIAL ENGINEERING: Manufactured curiosity lure.',
            evidenceYielded: {
              id: 'ev-bait-label',
              title: 'Physical USB Baiting Artifact',
              category: 'Physical Security',
              description: 'Physical flash drive labeled with high-value exam key bait to induce connection.',
              technicalDetail: 'Physical baiting vector: "EXAM_SOLUTIONS_2026" written in silver permanent marker.',
            },
          },
        },
        {
          id: 'target-usb-descriptor',
          label: 'USB Device Descriptor (HID Keyboard vs Mass Storage)',
          requiredAbility: 'INSPECT',
          previewValue: 'VID: 0x16C0, PID: 0x05DF, Device Class: 0x03 (HID)',
          revealedDetail: {
            heading: 'Hardware Class Spoofing (BadUSB)',
            summary: 'Despite appearing as a standard flash drive, the device negotiates with the host bus as an HID Keyboard (0x03). As soon as power is applied, the microcontroller types arbitrary commands at 1,000 keystrokes per second before antivirus can intervene.',
            technicalData: {
              'Vendor ID (VID)': '0x16C0 (Non-standard prototyping)',
              'Product ID (PID)': '0x05DF (Keystroke Injection Hardware)',
              'Host Negotiation': 'bInterfaceClass 0x03 (Human Interface Device)',
              'Operating Mode': 'Composite HID Keyboard + Mass Storage Bridge',
            },
            threatIndicator: 'CRITICAL HARDWARE THREAT: Device acts as ghost keyboard.',
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
          id: 'target-duckyscript-payload',
          label: 'DuckyScript Micro-Payload & PowerShell Cradle',
          requiredAbility: 'ANALYZE',
          previewValue: 'DELAY 400 / GUI r / STRING powershell -enc ...',
          revealedDetail: {
            heading: 'Automated Keystroke Script Analysis',
            summary: 'The microcontroller executes: DELAY 400 -> GUI r (opens Windows Run prompt) -> types encoded PowerShell command to download and execute an in-memory reverse shell from a remote command server.',
            technicalData: {
              'Script Step 1': 'DELAY 400 (Wait for driver enumeration)',
              'Script Step 2': 'GUI r (Spawns Run dialog)',
              'Script Step 3': 'STRING powershell -w hidden -enc JABzAD0ATgBlAHcALQBPAGIAagBlAGMAdAA...',
              'Target Action': 'In-memory credential dumping and C2 beacon',
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
          id: 'target-chain-custody',
          label: 'Chain of Custody & Proctor Interview',
          requiredAbility: 'QUESTION',
          previewValue: 'Marcus Chen statement: Discovered at 15:45 in Room 204',
          revealedDetail: {
            heading: 'Custody & Physical Footprint Audit',
            summary: 'Marcus confirms an unknown individual wearing a grey hoodie entered Room 204 during the 15:30 lab changeover, lingered near the printer for 90 seconds without logging into any terminal, and departed without speaking.',
            technicalData: {
              'Discovery Time': '15:45 UTC',
              'Physical Location': 'CAD Lab Workstation 12',
              'Suspicious Activity': 'Subject did not authenticate; targeted physical drop',
            },
            threatIndicator: 'CORROBORATED: Coordinated physical drop confirmed.',
          },
        },
      ],
    },
    decisions: [
      {
        id: 'decision-plug-personal-laptop',
        label: 'Plug the drive into Marcus\'s personal laptop to inspect the owner files',
        type: 'reckless',
        description: 'Insert the drive into a USB port on Marcus\'s personal computer.',
        trustChange: -20,
        isOptimal: false,
        immediateReaction: 'KEYSTROKE INJECTION TRIGGERED: Ghost typing opens terminal and downloads reverse shell.',
        consequenceText: 'Within 500 milliseconds of connection, the keyboard controller injects an encoded PowerShell payload. The personal laptop is backdoored, local browser passwords are dumped, and the compromised endpoint joins an attacker botnet.',
        screenEffect: 'threat-alert',
      },
      {
        id: 'decision-plug-test-vm',
        label: 'Plug into a "test VM" running on the public lab kiosk machine',
        type: 'reckless',
        description: 'Insert the drive into the lab kiosk thinking the VM hypervisor will isolate hardware keystrokes.',
        trustChange: -15,
        isOptimal: false,
        immediateReaction: 'USB HID PASSTHROUGH FAILURE: Keystrokes fired directly into the host OS.',
        consequenceText: 'The emulated keyboard fires into the host kiosk operating system before the virtual machine even captures the USB bus. The campus engineering lab host is compromised and disconnected by SecOps.',
        screenEffect: 'threat-alert',
      },
      {
        id: 'decision-format-explorer',
        label: 'Insert the drive and quickly format it in Windows Explorer to sanitize it',
        type: 'reckless',
        description: 'Attempt to insert the drive and quickly right-click "Format" to wipe storage.',
        trustChange: -8,
        isOptimal: false,
        immediateReaction: 'Formatting only affects storage partitions; keyboard commands execute instantly on insertion.',
        consequenceText: 'Windows Explorer formatting dialog opens too late. The keystroke injection fires within 400 milliseconds of insertion, executing code before the user can even click Format.',
        screenEffect: 'caution',
      },
      {
        id: 'decision-quarantine-usb',
        label: 'Do not enumerate: bag in electrostatic container and report to Campus IT / SecOps',
        type: 'defensive',
        description: 'Place the drive in an anti-static evidence sleeve, maintain strict custody, and deliver it directly to the SecOps incident response lab.',
        trustChange: 15,
        isOptimal: true,
        immediateReaction: 'SecOps Secures the BadUSB artifact and issues a campus-wide advisory on physical baiting.',
        consequenceText: 'Marcus places the drive in an evidence bag. SecOps reverse-engineers the microcontroller, locates the attacker C2 server, and prevents dozens of lab workstations from falling victim.',
        screenEffect: 'clean',
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
    completionCertificate: {
      id: 'CERT-HW-02',
      title: 'Hardware Threat Containment',
      field: 'Physical Media Forensics',
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
    doctrineBrief: {
      title: 'DOCTRINE // ROGUE ACCESS POINTS & EVIL TWINS',
      durationHint: '45 sec',
      facts: [
        'Evil Twin access points spoof authorized network SSIDs to fool mobile devices and laptops into automatic association.',
        'An unencrypted open Wi-Fi network broadcasts all plaintext data into public radio space; any attacker in line-of-sight can capture transmitted packets.',
        'Rogue gateways position attackers as the default router, enabling DNS hijacking, captive portal credential theft, and SSL stripping attacks.',
      ],
      attackerModel:
        'Adversaries deploy compact wireless transceivers (such as WiFi Pineapples or Alfa high-gain antennas) in high-traffic public venues like student cafes. By transmitting beacon frames with names like "Campus-Secure_Free" at higher signal amplification (-32 dBm) than official ceiling fixtures, they induce devices to connect and route all campus portal credentials through a local Man-in-the-Middle proxy.',
      whatGoodLooksLike:
        'Enforce strict 802.1X enterprise authentication with verified certificate pinning. Never connect to open, unauthenticated public Wi-Fi networks when accessing institutional accounts. When an evil twin is spotted, report the physical beacon parameters (BSSID, channel, and anomalous signal strength) directly to campus network operations.',
      relatedAbility: 'TRACE',
    },
    briefing: {
      situation: 'Elena is sitting at the crowded Student Union Cafe attempting to submit an encrypted research paper.',
      npcDialogue: '"The cafe Wi-Fi was really slow, but I just spotted a new network called \'Campus-Secure_Free\'. It doesn\'t ask for any login, and the signal is at full strength. Should I connect to get my grant submitted?"',
      objective: 'Inspect the Wi-Fi beacon frames, encryption protocols, and BSSID MAC addresses before connecting.',
    },
    investigationWorkspace: {
      type: 'network-scanner',
      title: 'Spectrum & Packet Sniffer [802.11 Monitor Mode & Beacon Table]',
      interfaceMetadata: {
        clientName: 'AetherScan RF Inspector (802.11 Monitor)',
        timestamp: 'Today at 17:18:02 UTC',
        senderDisplay: 'SSID: Campus-Secure_Free',
        subject: '802.11 Beacon Frame Telemetry & Channel Spectrum',
        bodyText: `DETECTED NEARBY WIRELESS ACCESS POINTS:
1. SSID: "Campus-Secure"
   - Encryption: WPA2-Enterprise (802.1X EAP-TLS)
   - BSSID: 70:3A:0E:11:42:01 (Cisco Catalyst Campus AP)
   - Channel: 6 (2.4 GHz) | RSSI: -68 dBm (Ceiling mount)
   - RSNE: Valid IEEE 802.11i Information Element

2. SSID: "Campus-Secure_Free"
   - Encryption: OPEN (No WPA2/WPA3 / Plaintext airwaves)
   - BSSID: 00:C0:CA:9A:88:14 (Alfa Network Pineapple / Portable USB NIC)
   - Channel: 6 (Intentional channel overlap) | RSSI: -32 dBm (Table adjacent)
   - RSNE: MISSING (Zero encryption flags)
   - Captive Portal Gateway: http://10.0.0.1/login (mitmproxy SSL stripping active)

3. SSID: "Campus-Guest"
   - Encryption: WPA2-PSK | BSSID: 70:3A:0E:11:42:02 | RSSI: -70 dBm

4. SSID: "xfinitywifi"
   - Encryption: Open | BSSID: 00:1D:D5:3C:99:10 | RSSI: -84 dBm`,
        attachmentName: 'pcap_capture_beacon.pcap',
        attachmentSize: '1.1 MB',
        attachmentType: 'Network Packet Trace',
        linkDisplay: 'BSSID: 00:C0:CA:9A:88:14',
      },
      targets: [
        {
          id: 'target-encryption-type',
          label: 'Encryption Standard & Missing RSNE Element',
          requiredAbility: 'INSPECT',
          previewValue: 'Security: OPEN (Missing 802.11i RSNE)',
          revealedDetail: {
            heading: 'Unauthenticated Open Airwaves',
            summary: 'The access point advertises itself as a secure campus extension but transmits zero encryption parameters. All data frames, cookies, and tokens are transmitted in cleartext into the physical room.',
            technicalData: {
              'Security Type': 'None (Open / Plaintext 802.11)',
              'RSNE Status': 'Information Element missing from beacon frame',
              'Eavesdropping Vulnerability': '100% passive packet interception',
            },
            threatIndicator: 'HIGH RISK: Zero cryptographic protection.',
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
          label: 'BSSID MAC Address & Hardware Vendor OUI',
          requiredAbility: 'VERIFY',
          previewValue: 'BSSID: 00:C0:CA:9A:88:14 (Alfa Network Attack Card)',
          revealedDetail: {
            heading: 'Hardware Infrastructure Spoofing',
            summary: 'Official campus access points are Cisco Catalyst enterprise hardware (OUI 70:3A:0E). The prefix 00:C0:CA belongs to Alfa Network Inc., widely manufactured for portable penetration testing and Rogue AP Pineapple hardware.',
            technicalData: {
              'Transmitter OUI': '00:C0:CA (Alfa Network Inc.)',
              'Official Infrastructure OUI': '70:3A:0E (Cisco Systems)',
              'Device Type': 'High-power portable Wi-Fi transceiver',
            },
            threatIndicator: 'CRITICAL THREAT: Portable attacker hardware mimicking campus AP.',
            evidenceYielded: {
              id: 'ev-09-rogue-ap-hardware',
              title: 'Evil Twin Rogue Access Point',
              category: 'Indicator of Compromise',
              description: 'Access point broadcasted by portable attack tool (WiFi Pineapple / Alfa card) mimicking campus branding.',
              technicalDetail: 'OUI: 00:C0:CA (Alfa Network). RSSI -32 dBm indicates immediate physical vicinity.',
            },
          },
        },
        {
          id: 'target-signal-overlap',
          label: 'Signal Strength RSSI & Physical Proximity',
          requiredAbility: 'OBSERVE',
          previewValue: 'RSSI: -32 dBm (Unusually strong vs -68 dBm ceiling)',
          revealedDetail: {
            heading: 'Proximity Differential Analysis',
            summary: 'Official campus ceiling fixtures yield an RSSI of -68 dBm inside the cafe. An RSSI of -32 dBm proves the transmitter is located within 2 to 3 meters of Elena\'s table (e.g. concealed in a backpack nearby).',
            technicalData: {
              'Observed RSSI': '-32 dBm (Near-field transmission)',
              'Infrastructure Baseline': '-68 dBm (Campus ceiling AP)',
              'Estimated Distance': 'Under 2.5 meters from target',
            },
            threatIndicator: 'PROXIMITY ALERT: Transmitter located inside the cafe seating area.',
          },
        },
        {
          id: 'target-captive-gateway',
          label: 'Captive Gateway URL & MitM Proxy Trace',
          requiredAbility: 'ANALYZE',
          previewValue: 'http://10.0.0.1/login (mitmproxy SSL stripping)',
          revealedDetail: {
            heading: 'Man-in-the-Middle SSL Stripping Gateway',
            summary: 'The rogue DHCP server assigns clients 10.0.0.x addresses and forces DNS queries through 10.0.0.1. The captive portal executes an SSL stripping proxy to downgrade HTTPS sessions and harvest plaintext credentials.',
            technicalData: {
              'Gateway IP': '10.0.0.1 (dnsmasq rogue resolver)',
              'Interception Daemon': 'mitmproxy / sslstrip',
              'Certificate Status': 'Self-signed invalid root CA',
            },
            threatIndicator: 'CRITICAL THREAT: Active Man-in-the-Middle interception.',
          },
        },
      ],
    },
    decisions: [
      {
        id: 'decision-join-open-wifi',
        label: 'Join Campus-Secure_Free and log into the student research portal',
        type: 'reckless',
        description: 'Associate with Campus-Secure_Free and enter credentials into the captive portal prompt.',
        trustChange: -18,
        isOptimal: false,
        immediateReaction: 'SESSION HIJACKED: Rogue gateway intercepts credentials and captures auth cookies.',
        consequenceText: 'The captive portal intercepts Elena\'s login credentials and session tokens. The attacker gains full access to her grant proposal and internal university research storage.',
        screenEffect: 'threat-alert',
      },
      {
        id: 'decision-tell-nearby-faster',
        label: 'Tell nearby students in the cafe: "This new free Wi-Fi is way faster"',
        type: 'reckless',
        description: 'Advise other patrons in the cafe to connect to Campus-Secure_Free.',
        trustChange: -10,
        isOptimal: false,
        immediateReaction: 'THREAT AMPLIFIED: Five other cafe patrons connect to the rogue access point.',
        consequenceText: 'By spreading the rogue network to other students, multiple student devices connect to the rogue gateway, creating a major credential harvesting incident across the Student Union.',
        screenEffect: 'caution',
      },
      {
        id: 'decision-use-for-maps',
        label: 'Use the open Wi-Fi "just for transit maps" assuming background VPN protects it',
        type: 'passive',
        description: 'Connect to the network believing consumer VPN will prevent any interception.',
        trustChange: -8,
        isOptimal: false,
        immediateReaction: 'VPN LEAK DETECTED: DNS queries bypass tunnel before VPN handshake establishes.',
        consequenceText: 'The rogue gateway intercepts plaintext DNS requests before the VPN tunnel initializes, leaking Elena\'s device identity, active apps, and local IP routing information.',
        screenEffect: 'caution',
      },
      {
        id: 'decision-stay-cellular-report',
        label: 'Stay on cellular / known WPA2-Enterprise; report rogue BSSID to Campus IT',
        type: 'defensive',
        description: 'Instruct Elena to stay on official cellular data or 802.1X and immediately report the Alfa Network BSSID and -32 dBm signal to SecOps.',
        trustChange: 15,
        isOptimal: true,
        immediateReaction: 'SecOps dispatches a technician who locates the rogue Pineapple device in the cafe.',
        consequenceText: 'Elena submits her grant safely over validated channels. Campus security confiscates the rogue hardware and prevents a massive credential theft wave across the Student Union.',
        screenEffect: 'clean',
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
    completionCertificate: {
      id: 'CERT-WIFI-03',
      title: 'Wireless Threat Identification',
      field: 'Wireless Network Security',
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
    doctrineBrief: {
      title: 'DOCTRINE // QR CODE TAMPERING & PHYSICAL OVERLAYS',
      durationHint: '45 sec',
      facts: [
        'QR codes are optical data formats without human readability; a user cannot distinguish an official URL from a malicious link without dedicated pre-scan parsing.',
        'Physical QR overlay attacks (quishing / sticker swapping) involve sticking adhesive labels over legitimate payment terminals in parking and transit hubs.',
        'Malicious QR destinations frequently leverage URL shorteners and mobile deep links (intent://) to initiate fraudulent payment requests or force unauthorized permission grants.',
      ],
      attackerModel:
        'Adversaries exploit physical infrastructure trust and human impatience. By applying cheap printed vinyl stickers over parking meters, electric scooter QR codes, or train ticketing kiosks, attackers redirect hurried commuters to cloned payment portals that simulate 50% discounts while draining digital wallets or harvesting debit cards.',
      whatGoodLooksLike:
        'Always verify the physical integrity of public QR codes before aiming a mobile camera. Look for tactile sticker seams, peeling edges, or misaligned typography. When in doubt, navigate directly to official municipal portals or pay via validated hardware terminals and report the physical tampering to transit authorities immediately.',
      relatedAbility: 'REPORT',
    },
    briefing: {
      situation: 'At the central metro automated ticketing kiosk, Tariq is about to scan a glossy sticker placed over the payment screen.',
      npcDialogue: '"The card reader is out of order, but there is a sticker saying \'Quick Mobile Pay - 50% Metro Discount\'. If I scan it with my banking app, I can catch the 5:15 express train!"',
      objective: 'Inspect the physical sticker, decoded URL payload, and domain registration before Tariq scans it.',
    },
    investigationWorkspace: {
      type: 'qr-inspector',
      title: 'Optical QR Matrix & URL De-Obfuscation Inspector',
      interfaceMetadata: {
        clientName: 'QR Forensic Decoupler & Optical Analyzer',
        timestamp: 'Today at 17:11:00 UTC',
        senderDisplay: 'Physical Overlay Sticker on Metro Kiosk #4',
        subject: 'Decoded QR Matrix Telemetry & Deep-Link Intent Chain',
        bodyText: `PHYSICAL KIOSK INSPECTION:
- Surface: Glossy vinyl adhesive sticker physically pasted over laser-etched metal kiosk plate
- Edge Alignment: 2.5mm offset from original bezel; corner peeling reveals official transit logo underneath
- Printing Technique: Low-resolution inkjet matrix print vs industrial laser etch

DECODED OPTICAL PAYLOAD:
- Raw QR Data: https://pay-transit-secure.xyz/c?transit_id=8812&discount=50
- Official Domain Authority: transit.metrocity.gov (DNS registered 2011, DNSSEC signed)
- Destination Domain: pay-transit-secure.xyz (Registered 36 hours ago via anonymous registrar)

EXPANDED REDIRECTION & INTENT CHAIN:
- Step 1: HTTP GET https://pay-transit-secure.xyz/c?transit_id=8812
- Step 2: 302 Redirect -> https://pay-transit-secure.xyz/checkout/mobile_intent
- Step 3: Trigger Android / iOS Deep Link:
  intent://pay?recipient=crypto-escrow-wallet&amount=250#Intent;package=com.fake.quickpay;end
- Target Action: Pre-authorizes immediate $250 mobile wallet withdrawal`,
        attachmentName: 'qr_matrix_decoded.png',
        attachmentSize: '64 KB',
        attachmentType: 'Barcode Payload Analysis',
        linkDisplay: 'https://pay-transit-secure.xyz',
      },
      targets: [
        {
          id: 'target-physical-overlay',
          label: 'Physical Sticker Layer & Edge Offset',
          requiredAbility: 'OBSERVE',
          previewValue: 'Physical vinyl sticker pasted over laser-etched metal',
          revealedDetail: {
            heading: 'Physical Tampering (QR Overlay Attack)',
            summary: 'A vinyl adhesive sticker was pasted over the legitimate transit payment terminal. The peeling corner reveals the authentic laser-engraved municipal payment instructions obscured underneath.',
            technicalData: {
              'Physical Layer': 'Peelable adhesive vinyl sticker',
              'Original Plate': 'Laser-etched metal plate underneath',
              'Alignment Offset': '2.5mm off-axis misalignment',
            },
            threatIndicator: 'PHYSICAL TAMPERING CONFIRMED: Unauthorized adhesive overlay.',
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
          id: 'target-decoded-url',
          label: 'Decoded QR Destination Domain vs Official Authority',
          requiredAbility: 'INSPECT',
          previewValue: 'pay-transit-secure.xyz vs transit.metrocity.gov',
          revealedDetail: {
            heading: 'Domain Spoofing & TLD Deception',
            summary: 'The decoded destination is pay-transit-secure.xyz, registered 36 hours ago in an anonymous offshore jurisdiction. The official municipal transit authority operates exclusively under transit.metrocity.gov.',
            technicalData: {
              'Target Domain': 'pay-transit-secure.xyz',
              'Official Authority': 'transit.metrocity.gov',
              'Domain Age': '36 hours old (High fraud probability)',
              'Registrar': 'Anonymous Privacy Shield Ltd.',
            },
            threatIndicator: 'FRAUDULENT DESTINATION: Unofficial domain impersonation.',
            evidenceYielded: {
              id: 'ev-fake-qr-domain',
              title: 'Spoofed Transit Payment Domain',
              category: 'Domain & Infrastructure',
              description: 'Decoded QR destination points to newly registered pay-transit-secure.xyz instead of official gov domain.',
              technicalDetail: 'Domain age 36 hours. TLD .xyz with anonymous registrar.',
            },
          },
        },
        {
          id: 'target-redirect-chain',
          label: 'Deep Link Intent & Wallet Extraction Analysis',
          requiredAbility: 'ANALYZE',
          previewValue: 'intent://pay?recipient=crypto-escrow-wallet&amount=250',
          revealedDetail: {
            heading: 'Automated Wallet Draining Deep Link',
            summary: 'The QR destination redirects into an OS-level deep link (intent://) configured to prompt the user\'s default mobile banking or payment app with a pre-populated $250 transfer to a crypto wallet address.',
            technicalData: {
              'Protocol Intent': 'intent://pay (Mobile wallet invoke)',
              'Extraction Amount': '$250.00 USD',
              'Recipient': 'crypto-escrow-wallet-0x992B...',
              'Target Action': 'Irreversible automated wallet transfer',
            },
            threatIndicator: 'CRITICAL FINANCIAL THREAT: Pre-populated mobile wallet extraction.',
            evidenceYielded: {
              id: 'ev-11-qr-intent',
              title: 'Malicious Mobile Payment Deep Link',
              category: 'Payload Inspection',
              description: 'Shortened QR code resolved to a deep-link intent attempting to trigger instant fund transfer.',
              technicalDetail: 'Intent URI: bankpay://transfer?recipient=crypto-escrow-wallet. Target: pay-transit-secure.xyz.',
            },
          },
        },
        {
          id: 'target-signage-verification',
          label: 'Official Municipal Protocol & Signage Verification',
          requiredAbility: 'VERIFY',
          previewValue: 'Metro Transit Bulletin: Official kiosks never use stickers',
          revealedDetail: {
            heading: 'Official Institutional Signage Policy',
            summary: 'Official Metro Transit regulations strictly forbid handwritten notices or adhesive stickers. Kiosk maintenance issues must be resolved inside the station master booth or via the official Metro Transit mobile application.',
            technicalData: {
              'Metro Rule 412': 'No adhesive labels authorized on terminals',
              'Discount Policy': 'Discounts apply automatically at turnstile via student ID',
              'Verification Status': 'Sticker is 100% unauthorized contraband',
            },
            threatIndicator: 'POLICY VIOLATION: Sticker contradicts municipal operating protocol.',
          },
        },
      ],
    },
    decisions: [
      {
        id: 'decision-scan-pay',
        label: 'Scan the sticker and authorize the payment in Tariq\'s mobile banking app',
        type: 'reckless',
        description: 'Aim phone camera at the QR code and authorize the payment prompt.',
        trustChange: -16,
        isOptimal: false,
        immediateReaction: 'FUNDS EXFILTRATED: $250 transferred to attacker crypto escrow wallet.',
        consequenceText: 'Tariq\'s banking app confirms a $250 wire to an untraceable wallet. His bank account is drained, and no train ticket is issued. The transaction cannot be reversed.',
        screenEffect: 'threat-alert',
      },
      {
        id: 'decision-scan-just-see',
        label: 'Scan "just to see" what page loads, but refuse to enter payment details',
        type: 'reckless',
        description: 'Open the URL in the mobile browser to inspect the design without paying.',
        trustChange: -10,
        isOptimal: false,
        immediateReaction: 'MALICIOUS PERMISSION REQUEST: Page prompts for camera, location, and contacts.',
        consequenceText: 'The mobile page triggers a malicious browser exploit attempt and requests dangerous permissions. Tariq\'s device fingerprint and location are logged on the attacker\'s command server.',
        screenEffect: 'caution',
      },
      {
        id: 'decision-cover-ask-stranger',
        label: 'Cover the code and ask another commuter to test scan it on their phone',
        type: 'reckless',
        description: 'Ask an unsuspecting stranger to scan the code to verify if it works.',
        trustChange: -8,
        isOptimal: false,
        immediateReaction: 'COLLATERAL HARM: Stranger scans code and encounters banking intent.',
        consequenceText: 'Transferring unverified cyber hazards to innocent third parties breaches ethical security conduct and puts fellow commuters at immediate financial risk.',
        screenEffect: 'caution',
      },
      {
        id: 'decision-peel-report-qr',
        label: 'Do not scan: photograph sticker, report to Station Security, and pay via official counter',
        type: 'defensive',
        description: 'Stop Tariq from scanning, document the sticker seam as physical evidence, report the tampered kiosk to station staff, and pay through official kiosk app.',
        trustChange: 15,
        isOptimal: true,
        immediateReaction: 'Station security removes 6 identical stickers across the terminal and issues a commuter warning.',
        consequenceText: 'Tariq checks his phone: "I almost authorized a $250 transfer to a crypto wallet! Thank you for spotting the sticker seam." Station staff audit every terminal in the network.',
        screenEffect: 'clean',
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
    completionCertificate: {
      id: 'CERT-QR-04',
      title: 'Physical-Digital Fraud Response',
      field: 'Physical-Digital Fraud Response',
    },
  },
};

export const MISSION_ORDER: string[] = [
  'mission-01-email',
  'mission-02-usb',
  'mission-03-wifi',
  'mission-04-qr-scam',
];

/**
 * Determines the next mission ID in sequence or the next incomplete incident.
 */
export function getNextMissionId(
  currentMissionId: string,
  completedMissions: string[] = []
): string | null {
  const currentIndex = MISSION_ORDER.indexOf(currentMissionId);

  // 1. Check if the direct subsequent mission in order is uncompleted
  if (currentIndex >= 0 && currentIndex < MISSION_ORDER.length - 1) {
    const directNext = MISSION_ORDER[currentIndex + 1];
    if (!completedMissions.includes(directNext)) {
      return directNext;
    }
  }

  // 2. Find any other uncompleted mission in the campaign
  const anyUncompleted = MISSION_ORDER.find(
    (id) => id !== currentMissionId && !completedMissions.includes(id)
  );
  if (anyUncompleted) {
    return anyUncompleted;
  }

  // 3. If all missions in campaign have been finished at least once, allow sequential cycle
  if (currentIndex >= 0 && currentIndex < MISSION_ORDER.length - 1) {
    return MISSION_ORDER[currentIndex + 1];
  }

  return null;
}
