import { Scenario } from '../types/scenario';

export const SCENARIOS: Scenario[] = [
  // 01 — Suspicious University Email
  {
    id: 'scenario-01',
    number: 1,
    code: 'OPS-01',
    title: 'The Urgent Suspension Notice',
    category: 'phishing',
    categoryLabel: 'Phishing & Domain Spoofing',
    difficulty: 'Level 1 — Recognize',
    environment: 'library',
    environmentTitle: 'University Library — Digital Commons',
    context: 'You are studying at a library workstation before midterm week.',
    situation:
      'A priority notification pops up on your screen. An email marked [HIGH PRIORITY] states: "Immediate Action Required: Your campus single-sign-on credentials will be permanently deactivated at 5:00 PM today due to an unconfirmed security audit. Verify your identity now."',
    participant: {
      name: 'Jordan Rivera',
      role: 'Classmate at Adjacent Terminal',
      avatarType: 'student-worried',
    },
    dialogue: [
      'Hey, did you just get that email too?',
      'It says our university accounts get wiped in 30 minutes if we don’t verify immediately!',
      'Should I just click the button and log in so my midterm project doesn’t get locked out?',
    ],
    artifact: {
      type: 'email',
      title: 'Incoming Email Message',
      subtitle: 'Client: Campus WebMail v4.2',
      metadata: {
        From: 'University Helpdesk <support@un1versity-helpdesk.edu.co>',
        To: 'student-roster-distribution@university.edu',
        Subject: 'URGENT: Verify Campus Account Before 17:00',
        Date: 'Today, 16:28 EST',
      },
      contentPreview:
        'Your university network credentials must be re-certified. Failure to verify will result in immediate de-provisioning of email, cloud storage, and exam portals.\n\n[ VERIFY CREDENTIALS NOW ]\n\nDestination URL: http://portal-verify-auth92.xyz/login?session=active',
      clueCallout:
        'Note the sender domain "un1versity-helpdesk.edu.co" replaces the letter "i" with the number "1", and the button destination points to an unverified .xyz domain.',
      tags: ['Typosquatting', 'Urgency Pressure', 'Mismatched Suffix'],
    },
    options: [
      {
        id: 'A',
        label: 'Click the verification button and sign in immediately.',
        description:
          'Follow the link right away to avoid missing the deadline and having your academic account suspended.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'You are routed to a counterfeit lookalike landing page where entering your username and password submits your active credentials directly into an attacker’s credential harvester database.',
        clueContext:
          'You acted on panic without inspecting the destination URL or noting the number "1" in the sender domain.',
        saferAction: 'Inspect the true URL destination and cross-reference with official campus IT.',
      },
      {
        id: 'B',
        label: 'Ignore and delete the email without alerting anyone.',
        description:
          'Assume it is spam, delete it from your inbox, and return to studying without taking any further action.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'While your personal credentials stay safe, other students in the library—including Jordan—fall victim to the mass phishing campaign because campus SecOps was never alerted to filter the domain.',
        clueContext:
          'Deleting the message protected you individually, but failed to protect the wider campus community through timely reporting.',
        saferAction: 'Report the phishing email to the campus security operations desk.',
      },
      {
        id: 'C',
        label: 'Inspect sender headers, verify the true link destination, and report to SecOps.',
        description:
          'Examine the domain syntax, hover to preview the destination URL, do not enter any credentials, and forward the sample to phishing@university.edu.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'You confirm the domain is typosquatted (un1versity) and points to a rogue .xyz harvester. Campus SecOps rapidly blacklists the IP and blocks the sender campus-wide.',
        clueContext:
          'You spotted the urgency hook, examined the true technical destination, and applied defensive reporting.',
      },
      {
        id: 'D',
        label: 'Forward the email to your study group group-chat to ask if they think it is real.',
        description:
          'Share the email link with 40 fellow students in your WhatsApp/Discord study channel to crowdsource opinions.',
        classification: 'risky',
        riskAssessment: 'HIGH',
        consequence:
          'Multiple anxious classmates click the live link on their mobile devices directly from the chat, resulting in three students having their accounts compromised.',
        clueContext:
          'Forwarding unvetted phishing links to peers turns you into an accidental distributor for the attacker.',
        saferAction: 'Share a screenshot or warning text without distributing the active link.',
      },
    ],
    bestOptionId: 'C',
    securityPrinciple: 'Verify before you trust. Look past the display name to inspect the actual technical destination.',
    learningObjective: 'Recognize artificial urgency hooks and typosquatted domains in credential-harvesting emails.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'Urgency was the hook, and panic disarmed your skepticism.',
        whyExplanation:
          'The email used artificial urgency ("account suspended today") to push you into quick compliance before inspecting technical indicators.',
        realisticOutcome:
          'Your campus credentials would be compromised. Attackers routinely harvest student logins to access research networks, grade portals, and payroll systems.',
        clueInsight:
          'Look closely at the sender: "un1versity-helpdesk.edu.co" swapped the letter "i" for "1", and the button led to "portal-verify-auth92.xyz".',
        saferAction:
          'Never use email links to verify accounts. Open a fresh browser window and navigate manually to the official university portal.',
        principle: 'Never trust link text or display names. Verify the destination domain independently.',
      },
      B: {
        mentorVoice: 'You avoided the trap personally, but cybersecurity is a collective defense.',
        whyExplanation:
          'Ignoring phishing protects your machine in the short run, but silent deletion leaves active threats circulating against your peers.',
        realisticOutcome:
          'Jordan and dozens of other students might still click the link. Phishing campaigns rely on silence from people who recognize the scam.',
        clueInsight:
          'Because the message targeted a distribution list, reporting it allows SecOps to purge the email from thousands of student mailboxes instantly.',
        saferAction:
          'Use your email client’s "Report Phishing" button or forward the headers to your security operations team.',
        principle: 'Report incidents to protect the entire organization, not just your personal device.',
      },
      C: {
        mentorVoice: 'Flawless operational judgment. You slowed down and read the indicators.',
        whyExplanation:
          'You separated the emotional message from the technical reality by inspecting the sender address and link target without triggering execution.',
        realisticOutcome:
          'SecOps received actionable threat intelligence, allowing firewalls to sinkhole the domain before unsuspecting peers entered credentials.',
        clueInsight:
          'You correctly flagged both the typosquatted character substitution (un1versity) and the external top-level domain (.xyz).',
        saferAction:
          'Continue using this workflow: inspect the sender, inspect the destination, and report via established channels.',
        principle: 'Verify before you trust. Technical evidence trumps urgency.',
      },
      D: {
        mentorVoice: 'Good intentions, dangerous execution. You became an accidental multiplier.',
        whyExplanation:
          'Forwarding active phishing links spreads the blast radius. Anxious group members often click links simply because a trusted friend sent them.',
        realisticOutcome:
          'Classmates clicked the link trusting you, resulting in credential leaks and potential session hijacking on student devices.',
        clueInsight:
          'If you need a second opinion, send an informational warning or screenshot, never the live hyperlink or message object.',
        saferAction:
          'Warn your peers with text: "Be aware of a phishing email claiming account suspension. Do not click the link."',
        principle: 'Never circulate live attack payloads or phishing URLs to peer channels.',
      },
    },
  },

  // 02 — The Unknown USB
  {
    id: 'scenario-02',
    number: 2,
    code: 'OPS-02',
    title: 'The Abandoned Storage Drive',
    category: 'hardware',
    categoryLabel: 'Hardware & Peripheral Threats',
    difficulty: 'Level 1 — Recognize',
    environment: 'hardware-lab',
    environmentTitle: 'Engineering Annex — Hardware Prototyping Lab',
    context: 'You are packing up your backpack after a late-evening electronics lab.',
    situation:
      'Sitting neatly on a laboratory bench next to the shared 3D printer is a sleek, metal 128GB USB flash drive. It has a printed adhesive label reading: "CONFIDENTIAL — Faculty Exam Solutions & Midterm Answer Key 2026". Marcus, a student lab proctor, notices it.',
    participant: {
      name: 'Marcus Chen',
      role: 'Student Lab Proctor',
      avatarType: 'lab-proctor',
    },
    dialogue: [
      'Whoa, check this out on the lab bench.',
      'Someone left a labeled flash drive right next to the 3D printer.',
      'It says "Faculty Exam Solutions" on it. Should we plug it into the workstation to see who owns it?',
    ],
    artifact: {
      type: 'usb-device',
      title: 'Physical Media Inspection',
      subtitle: 'Found Item: Lab Table 4B',
      metadata: {
        Label: 'CONFIDENTIAL — Faculty Exam Solutions',
        FormFactor: 'Type-A / Aluminum Enclosure',
        Observation: 'Microcontroller solder seams visible along connector neck',
        Weight: 'Unusually light compared to standard NAND flash drives',
      },
      contentPreview:
        'PHYSICAL TELEMETRY:\nConnector pins show minimal wear. The neck of the plug houses a concealed ATtiny85 micro-controller chip capable of emulating Human Interface Device (HID) keystrokes.',
      clueCallout:
        'A rogue device can masquerade as a keyboard (BadUSB) to type terminal commands at 1,000 words per minute the instant it is inserted.',
      tags: ['BadUSB', 'HID Injection', 'Social Engineering Bait'],
    },
    options: [
      {
        id: 'A',
        label: 'Plug the drive into your personal laptop to check the file metadata for the owner’s name.',
        description:
          'Insert the USB drive into your MacBook or ThinkPad, open Finder/Explorer, and check "Properties" to return it to the professor.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The device immediately enumerates as an external USB keyboard rather than a storage drive. In 1.2 seconds, it types a PowerShell script that downloads a reverse shell and exfiltrates your saved browser passwords.',
        clueContext:
          'Antivirus software does not block keystroke inputs because your OS treats keyboards as fully trusted input devices by default.',
        saferAction: 'Never connect unvetted hardware to any trusted machine.',
      },
      {
        id: 'B',
        label: 'Deliver the unclaimed drive to the campus IT SecOps desk for air-gapped quarantine.',
        description:
          'Do not plug the drive into any device. Transport it to SecOps or the security desk for isolation and forensic analysis.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'SecOps tests the drive inside a dedicated hardware sandbox (air-gapped USB isolator) and confirms it is an automated Rubber Ducky attack targeting university systems.',
        clueContext:
          'You recognized that enticing labels on dropped media are a textbook social engineering vehicle for malicious hardware.',
      },
      {
        id: 'C',
        label: 'Plug it into a shared campus library public computer so your personal computer isn’t harmed.',
        description:
          'Use a public terminal since "it doesn’t belong to you anyway" to see what files are on the drive.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The HID payload infects the campus public workstation, installs a hardware keystroke logger, and compromises the university student credentials of every subsequent student who uses that desk.',
        clueContext:
          'Compromising shared infrastructure endangers the entire community and violates campus acceptable use policies.',
        saferAction: 'Keep the drive disconnected from all network-connected systems.',
      },
      {
        id: 'D',
        label: 'Take it back to your dorm room to scan it with your installed commercial antivirus.',
        description:
          'Insert it into your computer only with antivirus "real-time scanning" enabled, intending to scan before opening any files.',
        classification: 'risky',
        riskAssessment: 'HIGH',
        consequence:
          'Traditional antivirus scans file systems, but BadUSB attacks attack via the USB controller interface before file-scanning even initiates.',
        clueContext:
          'Antivirus cannot prevent a device from presenting itself as a human typing on a keyboard.',
        saferAction: 'Isolate the hardware completely.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple: 'Never insert untrusted physical media. Hardware can emulate human input before software security can react.',
    learningObjective: 'Understand BadUSB/HID injection mechanics and the danger of enticing physical baiting.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'Curiosity combined with a helpful label is the oldest trick in the physical playbook.',
        whyExplanation:
          'Plugging in an untrusted USB drive exposes your machine to hardware-level attacks that bypass operating system software guards.',
        realisticOutcome:
          'Within milliseconds of insertion, BadUSB devices execute pre-programmed terminal commands, download trojans, or install backdoors.',
        clueInsight:
          'Notice how the label specifically promised "Confidential Exam Solutions"—this is tailored bait designed to override critical thinking.',
        saferAction:
          'Deliver stray drives directly to IT Security or security personnel without ever plugging them in.',
        principle: 'Treat unknown physical media with the same quarantine protocol as malicious software.',
      },
      B: {
        mentorVoice: 'Exemplary physical security discipline. You kept the payload quarantined.',
        whyExplanation:
          'You correctly identified that the safest place for unverified hardware is inside an isolated, air-gapped evaluation environment.',
        realisticOutcome:
          'SecOps identified a targeted penetration test payload and avoided campus network infection.',
        clueInsight:
          'Enticing labels ("Exam Solutions", "Payroll", "Confidential") are standard indicators of a baiting attack.',
        saferAction: 'Maintain zero-trust regarding foreign USB accessories and storage media.',
        principle: 'Zero Trust applies to physical ports just as strictly as network packets.',
      },
      C: {
        mentorVoice: 'Sacrificing shared infrastructure is never a valid security strategy.',
        whyExplanation:
          'Public library computers are connected to university intra-nets and domain controllers. Infecting one exposes the campus network.',
        realisticOutcome:
          'An attacker gained an internal pivot point into the student records database through the compromised public desk.',
        clueInsight:
          'Public machines lack administrative immunity; in fact, their shared nature makes them higher-value infection targets.',
        saferAction:
          'Do not plug unknown hardware into any device, whether personal, public, or commercial.',
        principle: 'Protect shared public systems—compromise at the edge threatens the entire core.',
      },
      D: {
        mentorVoice: 'A common misconception: antivirus software cannot stop hardware deception.',
        whyExplanation:
          'Antivirus software scans storage volumes. It has no mechanism to block what the operating system registers as a standard USB keyboard.',
        realisticOutcome:
          'The keystroke payload executed within two seconds, while the antivirus software was still waiting for the storage drive to mount.',
        clueInsight:
          'BadUSB hardware injects commands at thousands of characters per minute through the keyboard driver.',
        saferAction:
          'Rely on physical separation and hardware quarantine rather than software antivirus for foreign media.',
        principle: 'Software controls cannot defend against compromised hardware architecture.',
      },
    },
  },

  // 03 — Free Campus Wi-Fi
  {
    id: 'scenario-03',
    number: 3,
    code: 'OPS-03',
    title: 'The Free Coffeehouse Wi-Fi',
    category: 'wifi',
    categoryLabel: 'Wireless & Network Eavesdropping',
    difficulty: 'Level 2 — Investigate',
    environment: 'cafe',
    environmentTitle: 'Student Union — Cyber Cafe',
    context: 'You need to upload an assignment 15 minutes before the deadline while having coffee.',
    situation:
      'You open your laptop’s Wi-Fi network picker. The official campus network "Campus-Secure-802.1X" is showing 2 out of 4 signal bars. Right beside it is another network called "FREE_Campus_HighSpeed_Guest_5G" showing full 100% signal strength with no padlock icon. Connecting to it presents a browser prompt: "Login with your student ID to unlock high-speed browsing."',
    participant: {
      name: 'Elena Rostova',
      role: 'Fellow Research Student',
      avatarType: 'fellow-researcher',
    },
    dialogue: [
      'My connection to the official campus Wi-Fi keeps lagging.',
      'There is a new open network called "FREE_Campus_HighSpeed_Guest_5G" with full bars.',
      'Should we switch over so we can upload our research paper in time?',
    ],
    artifact: {
      type: 'wifi-scanner',
      title: 'Wireless Network Beacon Analysis',
      subtitle: 'RF Telemetry: 2.4GHz / 5GHz Bands',
      metadata: {
        OfficialSSID: 'Campus-Secure-802.1X (WPA3-Enterprise, BSSID: 00:1A:2B:64:89:10)',
        SuspiciousSSID: 'FREE_Campus_HighSpeed_Guest_5G (Open/Unencrypted, BSSID: E8:9F:80:C1:22:99)',
        SignalDifference: 'Suspicious AP is +18dBm stronger, broadcasting from inside the cafe',
        Encryption: 'None (Cleartext RF Broadcast)',
      },
      contentPreview:
        'RADIO ANALYSIS:\nThe high-speed guest network BSSID vendor prefix belongs to a portable Raspberry Pi / WiFi Pineapple penetration testing device sitting in a nearby backpack, not the campus Cisco enterprise infrastructure.',
      clueCallout:
        'Anyone can name a Wi-Fi network anything. Full signal strength often indicates an unauthorized access point located right inside the room.',
      tags: ['Evil Twin', 'Man-in-the-Middle', 'Credential Captive Portal'],
    },
    options: [
      {
        id: 'A',
        label: 'Connect to the open 5G network because the upload deadline is only minutes away.',
        description:
          'Prioritize bandwidth and speed to submit your assignment before the portal closes, entering credentials when prompted.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'You connect to a rogue "Evil Twin" Wi-Fi pineapple. The attacker intercepts your cleartext network traffic, strips SSL on unpinned connections, and captures your university credentials through the fake captive portal.',
        clueContext:
          'Signal strength is a measure of physical proximity, not network trustworthiness.',
        saferAction: 'Stay on the authenticated enterprise network with WPA3 encryption.',
      },
      {
        id: 'B',
        label: 'Stay on the official Campus-Secure network, or use your phone’s cellular hotspot.',
        description:
          'Reject the unencrypted rogue network. Connect through the authenticated 802.1X network or switch to an encrypted cellular tether.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Your data passes through an encrypted tunnel with mutual certificate authentication. The paper uploads safely and the rogue access point cannot inspect your packets.',
        clueContext:
          'You recognized that enterprise 802.1X uses mutual authentication to prevent rogue impostors.',
      },
      {
        id: 'C',
        label: 'Connect to the free open network, but open an Incognito/Private browser window.',
        description:
          'Assume private browsing protects your passwords and data while on unencrypted public Wi-Fi.',
        classification: 'risky',
        riskAssessment: 'HIGH',
        consequence:
          'Private browsing prevents local history from being saved on your machine, but does NOTHING to encrypt wireless radio waves between your laptop and the rogue router.',
        clueContext:
          'Incognito mode is for local client privacy, not network-layer traffic encryption.',
        saferAction: 'Use an encrypted network or a trusted VPN service.',
      },
      {
        id: 'D',
        label: 'Connect to the open network but skip the portal login page.',
        description:
          'Try to bypass the captive portal prompt and browse without entering your password.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'Even without entering credentials, unencrypted network traffic, unencrypted DNS queries, and MAC address beacons remain broadcast in the clear for the rogue AP to record.',
        clueContext:
          'An unencrypted Wi-Fi medium allows anyone within radio range to monitor network packets.',
        saferAction: 'Avoid associating with unverified open networks.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple: 'Signal strength is not trust. Unencrypted open networks allow eavesdropping and credential harvesting.',
    learningObjective: 'Identify Evil Twin access points and understand that private browsing does not encrypt network transmission.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'Convenience was prioritized over verification, walking directly into a Man-in-the-Middle trap.',
        whyExplanation:
          'Rogue actors set up high-power access points in coffee shops with familiar names ("Campus Guest", "Free HighSpeed") to harvest traffic.',
        realisticOutcome:
          'Your assignment and student credentials were intercepted by an attacker sitting three tables away with a packet analyzer.',
        clueInsight:
          'The lack of an encryption padlock and the captive portal requesting your university credentials were dead giveaways.',
        saferAction:
          'Always use enterprise WPA2/WPA3 networks with verified certificates or a personal mobile hotspot.',
        principle: 'Never transmit sensitive data over open, unencrypted wireless networks.',
      },
      B: {
        mentorVoice: 'Disciplined operational hygiene. You refused to trade security for convenient speed.',
        whyExplanation:
          'Official enterprise networks use certificate-based mutual authentication, ensuring your device only talks to verified campus infrastructure.',
        realisticOutcome:
          'Your research upload was protected by robust end-to-end and transport encryption.',
        clueInsight:
          'You correctly deduced that an open network with suspiciously high signal was a rogue local transceiver.',
        saferAction: 'Maintain an encrypted VPN tunnel whenever working in public common areas.',
        principle: 'Mutual authentication guarantees network integrity. Never trust open airwaves.',
      },
      C: {
        mentorVoice: 'A dangerous myth: Incognito mode does not encrypt wireless airwaves.',
        whyExplanation:
          'Incognito/Private windows only prevent local cookies and history from saving to your hard drive. Every packet broadcast over the air remains visible.',
        realisticOutcome:
          'The rogue hotspot operator still read your unencrypted network requests and DNS inquiries in real time.',
        clueInsight:
          'Browser privacy modes only protect against someone inspecting your laptop screen after you log off.',
        saferAction: 'Use an encrypted VPN connection to secure packet payloads over public Wi-Fi.',
        principle: 'Local client privacy modes are completely decoupled from network transport encryption.',
      },
      D: {
        mentorVoice: 'Association alone exposes your device footprint.',
        whyExplanation:
          'Once associated with a rogue access point, background operating system services send DNS requests, system telemetry, and sync queries across the attacker’s router.',
        realisticOutcome:
          'The attacker mapped your device OS, unpatched software vulnerabilities, and browser fingerprints.',
        clueInsight:
          'Disconnecting or refusing to associate is the only safe stance against an unverified network.',
        saferAction: 'Keep Wi-Fi set to not automatically connect to open networks.',
        principle: 'Network association is consent to routing. Only associate with verified gateways.',
      },
    },
  },

  // 04 — The QR Poster
  {
    id: 'scenario-04',
    number: 4,
    code: 'OPS-04',
    title: 'The Textbook Giveaway QR Poster',
    category: 'qr',
    categoryLabel: 'Mobile Threats & Physical QR Phishing',
    difficulty: 'Level 2 — Investigate',
    environment: 'quad',
    environmentTitle: 'Campus Quad — Student Bulletin Board',
    context: 'You are walking past the main outdoor bulletin board between classes.',
    situation:
      'A colorful flyer is pinned to the board: "Free Open-Source STEM Textbooks & Exam Prep — Scan QR to Download All Course Materials". Upon closer inspection, you notice the QR code is printed on a glossy sticker that was visibly slapped directly on top of the original paper flyer.',
    participant: {
      name: 'Tariq Al-Mansoor',
      role: 'Student Commuter',
      avatarType: 'dorm-roommate',
    },
    dialogue: [
      'Hey, look at this poster for free course textbooks!',
      'Textbooks cost like four hundred dollars this semester.',
      'I was just about to scan this QR code with my phone camera. Let’s get the PDFs!',
    ],
    artifact: {
      type: 'qr-poster',
      title: 'Physical Bulletin Inspection',
      subtitle: 'Board Location: Science Hallway Exterior',
      metadata: {
        PosterTopic: 'Free Open-Source STEM Coursebooks',
        Substrate: 'Original matte paper flyer with gloss vinyl sticker overlay',
        CornerInspection: 'The sticker edge is peeling slightly, revealing a different QR code beneath',
        EncodedTarget: 'https://univ-textbooks.download-free-stem.top/auth?token=student',
      },
      contentPreview:
        'PHYSICAL TAMPERING DETECTED:\nA replacement sticker has been placed directly over the original legitimate university student union flyer. The encoded URL directs to a third-party APK/mobile malware dropper disguised as a PDF viewer.',
      clueCallout:
        'QR codes are optical URLs that humans cannot read with the naked eye. Physical sticker overlays are the primary indicator of QRishing (QR phishing).',
      tags: ['QR Phishing (QRishing)', 'Physical Tampering', 'Sticker Overlay'],
    },
    options: [
      {
        id: 'A',
        label: 'Scan the QR code and immediately download the recommended file.',
        description:
          'Point your smartphone camera at the poster, tap the banner, and install the "Viewer" app requested by the page.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'Your mobile browser opens an untrusted site that prompts you to install an unauthorized mobile profile or malicious APK that grants an attacker background access to SMS messages and mobile banking.',
        clueContext:
          'You trusted an unreadable barcode that showed clear physical evidence of tampering.',
        saferAction: 'Inspect physical signs of tampering and verify links through official websites.',
      },
      {
        id: 'B',
        label: 'Examine the sticker overlay, warn Tariq, and look up the official student union resource directly.',
        description:
          'Point out the physical sticker tampering. Do not scan the code. Open the official university library website directly on your device to search for legal open textbooks.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'You prevent Tariq from compromising his smartphone, find the legitimate textbooks through the university library catalog for free, and report the altered flyer to campus facilities.',
        clueContext:
          'You noticed the tactile vinyl sticker overlaid on matte paper and avoided blind URL execution.',
      },
      {
        id: 'C',
        label: 'Peel the sticker off and scan the original underlying QR code instead.',
        description:
          'Scrape the top sticker off with your fingernail and scan whatever was printed beneath it.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'While you removed the attacker’s sticker, public bulletin posters can still be printed by anyone, and the underlying link may still be outdated or lead to an unvetted third-party site.',
        clueContext:
          'Even original posters on public bulletin boards should not be blindly trusted for app downloads.',
        saferAction: 'Navigate to reputable official websites directly rather than scanning public barcodes.',
      },
      {
        id: 'D',
        label: 'Scan the QR code but only browse it on your phone’s cellular data instead of campus Wi-Fi.',
        description:
          'Assume that cellular data prevents mobile malware or fake login pages from working.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'Cellular data changes your internet carrier, but the destination website is still malicious and can still harvest credentials or prompt for malicious configuration profiles.',
        clueContext:
          'Malicious websites and drive-by downloads function equally well over cellular and Wi-Fi networks.',
        saferAction: 'Do not visit untrusted web destinations regardless of connection type.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple: 'A QR code is just an unreadable URL printed in ink. Check the physical substrate and verify the destination domain.',
    learningObjective: 'Identify physical QR sticker tampering and understand the risks of QRishing.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'You scanned blindly into an unverified optical link.',
        whyExplanation:
          'Unlike written text, humans cannot read where a QR code points without technical interpretation. Attackers paste stickers over legitimate posters in public areas.',
        realisticOutcome:
          'Your smartphone was redirected to a credential harvesting form or prompted to install a rogue device management profile.',
        clueInsight:
          'The peeling vinyl sticker on top of the original paper flyer was a clear sign of physical tampering.',
        saferAction:
          'Disable automatic link opening in your mobile camera app and preview the destination URL before visiting.',
        principle: 'Never scan QR codes that show physical tampering or sticker overlays.',
      },
      B: {
        mentorVoice: 'Sharp physical and digital awareness. You caught the tampering.',
        whyExplanation:
          'You recognized that QR codes are easily subverted with physical stickers and chose an independent, authoritative channel instead.',
        realisticOutcome:
          'Both you and Tariq obtained the required course materials safely through the verified library portal.',
        clueInsight:
          'Spotting the mismatch between the gloss sticker and the matte flyer prevented an unauthorized redirect.',
        saferAction: 'Continue bypassing public QR codes in favor of official bookmark channels.',
        principle: 'Physical verification precedes digital execution.',
      },
      C: {
        mentorVoice: 'An incomplete defense that still assumes the underlying poster is safe.',
        whyExplanation:
          'Peeling off a sticker does not guarantee the original print was legitimate or that the target site is still maintained securely.',
        realisticOutcome:
          'You risked visiting a dead domain that may have been acquired by a domain squatter.',
        clueInsight:
          'Direct navigation via official university portals is always safer than trusting bulletin boards.',
        saferAction: 'Search the university bookstore directly using official URLs.',
        principle: 'Do not rely on damaged or altered public media for software or file downloads.',
      },
      D: {
        mentorVoice: 'A misunderstanding of network boundaries vs application-layer payloads.',
        whyExplanation:
          'Cellular connections do not filter out phishing websites, malicious web forms, or credential harvesting pages.',
        realisticOutcome:
          'Your smartphone reached the identical malicious landing page, resulting in compromised accounts.',
        clueInsight:
          'The threat lives on the web server at the destination URL, not in the local radio frequency.',
        saferAction: 'Evaluate the URL destination, not the cellular carrier.',
        principle: 'Malicious content compromises systems regardless of connection bearer.',
      },
    },
  },

  // 05 — The Urgent Password Reset
  {
    id: 'scenario-05',
    number: 5,
    code: 'OPS-05',
    title: 'The Midnight MFA Bombing Alert',
    category: 'passwords',
    categoryLabel: 'MFA Fatigue & Credential Hijacking',
    difficulty: 'Level 3 — Decide',
    environment: 'dorm',
    environmentTitle: 'Campus Dormitory — Study Desk',
    context: 'It is 11:30 PM and you are finishing an essay on your laptop.',
    situation:
      'Your phone buzzes repeatedly. Within 90 seconds, you receive five push notifications from your university Authenticator app: "Approve login request from St. Petersburg, Russia?" You reject the first two, but the notifications keep chiming non-stop. Suddenly, your phone receives an SMS from an unknown number: "IT Security Support: We detect abnormal traffic on your account. To halt these notifications and secure your session, reply with your 6-digit one-time passcode immediately."',
    participant: {
      name: 'Alex Rivera',
      role: 'Dorm Roommate',
      avatarType: 'dorm-roommate',
    },
    dialogue: [
      'Dude, your phone has been vibrating every ten seconds.',
      'Whoever is doing that won’t stop.',
      'Can’t you just tap approve to make the buzzer stop, or text them back to fix it?',
    ],
    artifact: {
      type: 'mfa-alert',
      title: 'Mobile Authenticator & SMS Stream',
      subtitle: 'Device: Personal Phone (iOS / Android)',
      metadata: {
        PushAlerts: '5 repeated prompts: "Login Attempt — Windows 10, IP 185.220.101.5 (Russia)"',
        IncomingSMS: '+1 (555) 019-3829: "Campus Helpdesk: Reply with your 6-digit code to lock account"',
        TimeGap: 'SMS arrived 45 seconds after the first push prompt was rejected',
      },
      contentPreview:
        'ATTACK VECTOR IDENTIFIED:\nMFA Fatigue (MFA Bombing) paired with an Out-of-Band SMS Social Engineering lure. The attacker already possesses your primary password and is trying to coerce you into approving the secondary factor.',
      clueCallout:
        'IT departments will NEVER ask you to text them a one-time authentication code. The SMS is sent by the same attacker who is generating the login prompts.',
      tags: ['MFA Fatigue', 'Push Bombing', 'OTP Interception'],
    },
    options: [
      {
        id: 'A',
        label: 'Tap "Approve" on the authenticator prompt just to stop the non-stop buzzing.',
        description:
          'Give in to the notification fatigue so you can get back to writing your essay in peace.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The attacker immediately completes their multi-factor authentication handshake and logs into your student account, gaining full access to your email, financial aid data, and cloud documents.',
        clueContext:
          'MFA fatigue attacks rely on annoying victims until they instinctively tap approve to silence the phone.',
        saferAction: 'Never approve authentication requests that you did not initiate yourself.',
      },
      {
        id: 'B',
        label: 'Reply to the SMS text message with your 6-digit verification code.',
        description:
          'Text the code to the number claiming to be IT Support so they can "lock down" the session.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The SMS was sent by the attacker. By replying with the code, you hand the exact one-time token needed to bypass your security directly into the attacker’s hands.',
        clueContext:
          'Legitimate IT departments never request one-time passwords or MFA passcodes over SMS or phone calls.',
        saferAction: 'Treat any request for your MFA passcode as an active compromise attempt.',
      },
      {
        id: 'C',
        label: 'Reject all prompts, do not reply to the SMS, and immediately change your password via the official portal.',
        description:
          'Deny the push requests. Recognize that the attacker already has your current password. Open a fresh browser, go directly to the verified university account page, change your password, and alert SecOps.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Changing your master password immediately invalidates the attacker’s credentials, stopping the push prompts instantly. SecOps is notified to monitor the source IP.',
        clueContext:
          'If you receive unexpected MFA prompts, it means your primary password has ALREADY been compromised.',
      },
      {
        id: 'D',
        label: 'Turn on "Do Not Disturb" on your phone and go to sleep without taking action.',
        description:
          'Silence your phone to ignore the alerts until morning, hoping the problem resolves itself.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'While you won’t hear the chimes, your primary password remains compromised in the attacker’s possession, giving them all night to attempt credential stuffing or find an un-MFA’d portal.',
        clueContext:
          'Ignoring an active compromise attempt leaves the attack window open.',
        saferAction: 'Change your compromised primary password immediately.',
      },
    ],
    bestOptionId: 'C',
    securityPrinciple: 'Unexpected MFA prompts mean your password is already compromised. Reject the prompt and change your password immediately.',
    learningObjective: 'Recognize MFA fatigue attacks and understand that one-time passcodes must never be shared.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'You surrendered to MFA fatigue. The attacker won through sheer persistence.',
        whyExplanation:
          'MFA bombing relies on cognitive exhaustion. Attackers repeatedly trigger prompts hoping the user approves out of frustration or distraction.',
        realisticOutcome:
          'The attacker established an active session token, bypassing the exact protection MFA was configured to provide.',
        clueInsight:
          'Never approve any push notification you did not trigger through your own active login.',
        saferAction:
          'Deny the request and change your password immediately to stop the attacker from retrying.',
        principle: 'Only approve MFA prompts that correspond to your immediate, self-initiated logins.',
      },
      B: {
        mentorVoice: 'You handed the front-door keys directly to the burglar.',
        whyExplanation:
          'The SMS was an impersonation lure timed precisely to exploit your confusion during the prompt storm.',
        realisticOutcome:
          'The attacker entered your 6-digit code into their login screen within seconds, locking you out of your account.',
        clueInsight:
          'No legitimate security staff will ever ask for your one-time verification passcode. The code is meant for the login prompt alone.',
        saferAction:
          'Treat anyone asking for your one-time code as an attacker, no matter what caller ID or SMS handle they use.',
        principle: 'One-Time Passcodes (OTPs) are confidential keys. Never share them with anyone.',
      },
      C: {
        mentorVoice: 'Masterful tactical response. You diagnosed the root cause.',
        whyExplanation:
          'You understood the critical deduction: if MFA is prompting you, the attacker already has your primary password. Changing it at the source cuts off the attack.',
        realisticOutcome:
          'The attacker’s access was severed before they could establish a valid session, and SecOps logged the attacker’s IP.',
        clueInsight:
          'You refused to be baited by the fake SMS support message and used verified internal account management.',
        saferAction: 'Continue reporting MFA fatigue floods to your organization’s security team.',
        principle: 'MFA alerts indicate primary credential compromise. Remediate at the password level.',
      },
      D: {
        mentorVoice: 'Silencing the smoke alarm does not put out the fire.',
        whyExplanation:
          'Do Not Disturb stops the noise, but leaves your compromised password valid in the wild while you sleep.',
        realisticOutcome:
          'The attacker continued testing your password against secondary services that might not require MFA.',
        clueInsight:
          'Active attacks require proactive remediation, not just passive muting.',
        saferAction:
          'Take two minutes to change your password immediately upon recognizing an unauthorized login storm.',
        principle: 'Security alerts require prompt remediation, not postponement.',
      },
    },
  },

  // 06 — The Professor's Request
  {
    id: 'scenario-06',
    number: 6,
    code: 'OPS-06',
    title: 'The Department Chair’s Gift Card Request',
    category: 'social-engineering',
    categoryLabel: 'Social Engineering & Authority Pressure',
    difficulty: 'Level 3 — Decide',
    environment: 'office',
    environmentTitle: 'Faculty Annex — Department Office Hallway',
    context: 'You work as a student research assistant for the Computer Science department.',
    situation:
      'You receive an urgent text message on your personal cell phone from an unknown number. The sender’s profile picture is the official portrait of Professor Vance, your Department Chair. The message reads: "Hello, I am currently locked in an all-day accreditation board meeting and cannot take calls. I urgently need you to purchase four $100 Apple gift cards at the campus store to reward our guest speakers before 2:00 PM. I will reimburse you with departmental cash at 4:00 PM. Please scratch the backs and text me the codes ASAP."',
    participant: {
      name: 'Professor Vance (Impersonator)',
      role: 'Apparent Department Chair',
      avatarType: 'professor',
    },
    dialogue: [
      'This is Professor Vance. I need your urgent assistance with departmental guest speaker gifts.',
      'I am currently trapped in an executive accreditation session and cannot pick up phone calls.',
      'Please head to the campus store immediately, purchase four $100 cards, and text me the redemption codes.',
    ],
    artifact: {
      type: 'chat-message',
      title: 'SMS Message Thread',
      subtitle: 'Origin: +1 (555) 018-7741 (Carrier: VOIP Provider)',
      metadata: {
        SenderName: 'Dr. Arthur Vance (Claimed)',
        PhoneType: 'Virtual VoIP Number (Twilio / Bandwidth.com)',
        Timing: 'Sent 15 minutes before lunch hour',
        PressureTactic: 'Authority figure + Cannot take calls + Financial urgency',
      },
      contentPreview:
        'TEXT MESSAGE:\n"Are you at your desk? I need an urgent favor that requires your immediate attention. Please do not call as the provost is speaking right now. Go to the store, get 4x $100 gift cards, and text photos of the pin numbers back to this number. Do not let the department down."',
      clueCallout:
        'Gift card requests are universally fraudulent. Legitimate academic departments have formal procurement processes and will never ask students to front personal money via gift cards.',
      tags: ['Authority Impersonation', 'Gift Card Scam', 'Out-of-Band Verification'],
    },
    options: [
      {
        id: 'A',
        label: 'Rush to the campus store and buy the gift cards with your own money to impress the professor.',
        description:
          'Follow the instructions immediately to maintain good standing with the department head.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'You spend $400 of your personal savings and text the codes. The attacker drains the balances in minutes through an automated crypto-broker. You will never be reimbursed because it was an external scammer.',
        clueContext:
          'No university, business, or government agency uses consumer gift cards for legitimate institutional expenses.',
        saferAction: 'Recognize the classic gift card scam signature.',
      },
      {
        id: 'B',
        label: 'Verify out-of-band: Walk into the department main office or call the verified faculty landline.',
        description:
          'Do not purchase anything. Contact the department administrative assistant in person or call Professor Vance’s office number from the verified campus directory.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'The department administrator confirms that Professor Vance is at home on sabbatical today and never sent the text. The fraudulent number is reported to campus police.',
        clueContext:
          'You recognized that authority pressure combined with non-standard payment methods is the hallmark of executive impersonation.',
      },
      {
        id: 'C',
        label: 'Text back asking the sender to confirm their identity by answering a personal trivia question.',
        description:
          'Engage with the scammer over SMS to see if they know what course you took with them last semester.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'Scammers often research student course schedules and department websites online, or use plausible excuses to deceive you into continued conversation.',
        clueContext:
          'Engaging in back-and-forth dialogue with attackers gives them opportunities to refine their pretext.',
        saferAction: 'Break the channel and verify through an established independent path.',
      },
      {
        id: 'D',
        label: 'Forward the message to your student coworker asking them to buy two of the cards.',
        description:
          'Split the cost with another student researcher so that you don’t have to spend $400 alone.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'You drag an innocent coworker into the fraud, doubling the financial loss for students in your lab.',
        clueContext:
          'Passing fraudulent demands to peers compounds the harm of social engineering.',
        saferAction: 'Halt the request and report the impersonation.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple: 'Authority pressure combined with gift card requests is always a scam. Always verify out-of-band through known official contacts.',
    learningObjective: 'Recognize executive impersonation and out-of-band verification protocols.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'Authority intimidation bypassed your common sense.',
        whyExplanation:
          'Attackers weaponize titles ("Department Chair", "CEO", "Provost") because subordinates feel uncomfortable questioning superiors.',
        realisticOutcome:
          'You lost $400. Gift card transactions are irreversible and non-refundable once the codes are transmitted.',
        clueInsight:
          'The pretext ("I am in a meeting, do not call") is engineered specifically to prevent you from verifying their voice.',
        saferAction:
          'Remember this fundamental rule: legitimate institutions never conduct business or reimbursements through retail gift cards.',
        principle: 'Gift card requests from supervisors or authority figures are 100% fraudulent.',
      },
      B: {
        mentorVoice: 'Flawless verification protocol. You broke the attacker’s controlled channel.',
        whyExplanation:
          'By consulting the official directory and walking into the department office, you verified reality outside of the scammer’s text thread.',
        realisticOutcome:
          'The impersonation attempt was halted, your savings were protected, and the department sent a warning to all student assistants.',
        clueInsight:
          'Out-of-band verification (using an established, trusted channel instead of the incoming medium) neutralizes social engineering.',
        saferAction: 'Always verify unusual financial requests using trusted, pre-existing contact details.',
        principle: 'Always verify unexpected requests out-of-band using authoritative directories.',
      },
      C: {
        mentorVoice: 'Do not negotiate with scammers inside their chosen arena.',
        whyExplanation:
          'Texting back confirms your number is active and gives the attacker room to manipulate you with excuses or scraped social media data.',
        realisticOutcome:
          'The attacker guessed or evaded your question, keeping you engaged under stress.',
        clueInsight:
          'Attackers prepare for pushback. The only effective response is independent verification through a trusted channel.',
        saferAction: 'Do not respond to the suspicious number; contact the genuine party directly.',
        principle: 'Never use the incoming communication channel to verify the identity of the sender.',
      },
      D: {
        mentorVoice: 'Distributing the burden only spreads the victimization.',
        whyExplanation:
          'Delegating a suspicious task to a peer does not make the underlying transaction secure.',
        realisticOutcome:
          'Both you and your colleague suffered financial loss from a fraudulent scheme.',
        clueInsight:
          'If a request feels unusual enough that you want to split the risk, it is an indicator that the request itself is illegitimate.',
        saferAction: 'Stop the chain and consult campus staff.',
        principle: 'Stop the spread of unverified financial instructions.',
      },
    },
  },

  // 07 — The Suspicious Login Alert
  {
    id: 'scenario-07',
    number: 7,
    code: 'OPS-07',
    title: 'The Unrecognized Foreign Session',
    category: 'account-security',
    categoryLabel: 'Account Security & Session Hijacking',
    difficulty: 'Level 4 — Respond',
    environment: 'dorm',
    environmentTitle: 'Student Union — Study Lounge',
    context: 'You are checking your email before starting an afternoon study session.',
    situation:
      'A genuine security email from `no-reply@accounts.google.com` (verified DKIM/SPF) arrives: "Security Alert: A new sign-in was detected on Windows 10 from Frankfurt, Germany using Firefox. An active browser session token was synchronized." You are currently in your campus library in the United States and have never been to Germany, nor do you use Firefox or a VPN.',
    participant: {
      name: 'Campus Security Alert System',
      role: 'Automated Identity Threat Detection',
      avatarType: 'security-analyst',
    },
    dialogue: [
      'SYSTEM SECURITY ALERT: An unrecognized session has successfully authenticated against your primary account.',
      'Location: Frankfurt, Germany (IP: 194.26.29.112)',
      'Action Required: Review active device list and verify account integrity immediately.',
    ],
    artifact: {
      type: 'login-alert',
      title: 'Google Security Event Dispatch',
      subtitle: 'Authenticated Domain: accounts.google.com',
      metadata: {
        SecurityStatus: 'Active Authenticated Session Established',
        Client: 'Firefox 122.0 (Windows NT 10.0; Win64)',
        Location: 'Frankfurt am Main, Hesse, Germany',
        AuthType: 'Session Token / Cookie Replication',
      },
      contentPreview:
        'SECURITY TELEMETRY:\nA valid session cookie was presented from an anomalous IP range. This matches the behavior of infostealer malware (e.g., RedLine/Lumma) stealing session tokens from a local browser cache, bypassing traditional password entry.',
      clueCallout:
        'Changing your password is only part of the solution when session tokens are stolen. You must explicitly terminate and revoke all active sessions to kick the attacker out.',
      tags: ['Session Hijacking', 'Infostealer', 'Revoke All Sessions'],
    },
    options: [
      {
        id: 'A',
        label: 'Ignore it, assuming it was a harmless glitch caused by campus cloud proxy servers.',
        description:
          'Assume the university network routed your connection through an overseas server and take no action.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The attacker maintains an active session cookie, clones your email inbox, accesses your linked cloud drives, and uses your account to send spam to all your campus contacts.',
        clueContext:
          'Legitimate campus networks do not route routine traffic through commercial data centers in foreign nations.',
        saferAction: 'Treat anomalous foreign sessions as active unauthorized compromises.',
      },
      {
        id: 'B',
        label: 'Log into your account settings, revoke all active sessions, change your password, and scan for malware.',
        description:
          'Navigate to Account Security, click "Sign out of all other sessions" to invalidate active tokens, update your master password, check app permissions, and run a malware scan on your devices.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Revoking active sessions destroys the attacker’s stolen session token immediately. Changing your password prevents re-authentication, and the malware scan uncovers a malicious pirated game crack on your PC.',
        clueContext:
          'You understood that stolen session cookies allow attackers to stay logged in even without your password unless sessions are explicitly invalidated.',
      },
      {
        id: 'C',
        label: 'Change your password on your phone, but leave your laptop’s existing browser windows open.',
        description:
          'Change the password quickly on mobile, but don’t revoke active web sessions or inspect your laptop.',
        classification: 'risky',
        riskAssessment: 'HIGH',
        consequence:
          'Some authentication systems do not automatically terminate existing session cookies upon password changes. The attacker continues accessing your accounts until the token expires.',
        clueContext:
          'Password changes alone do not always invalidate existing cryptographic session tokens.',
        saferAction: 'Always click "Sign out of all devices" or "Revoke all sessions".',
      },
      {
        id: 'D',
        label: 'Immediately delete the email account and abandon it completely.',
        description:
          'Panic, delete the Google account, and create a brand new email address without investigating.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'You lose all academic history, course enrollments, and personal records, while the underlying malware on your laptop remains active to infect your new account.',
        clueContext:
          'Deleting an account does not fix an infected endpoint device.',
        saferAction: 'Remediate the account systematically and disinfect the local machine.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple: 'Session token theft bypasses passwords. Remediate by revoking all active sessions, changing credentials, and scanning endpoints.',
    learningObjective: 'Understand session hijacking mechanics and the importance of explicit session revocation.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'Dismissing authentic telemetry invites silent persistent compromise.',
        whyExplanation:
          'Security alerts from verified domains should never be ignored. Campus networks do not randomly route user logins through overseas hosting providers.',
        realisticOutcome:
          'The attacker maintained persistent access to your personal correspondence and academic submissions.',
        clueInsight:
          'The alert was verified genuine (DKIM/SPF passed). Genuine alerts require immediate response.',
        saferAction: 'Investigate unexpected logins from foreign countries immediately.',
        principle: 'Never ignore anomalous location alerts on verified authentication systems.',
      },
      B: {
        mentorVoice: 'Thorough, professional incident response. You eliminated the root vulnerability.',
        whyExplanation:
          'You recognized that modern infostealers steal session cookies to bypass MFA. Revoking active sessions invalidates those cookies instantly.',
        realisticOutcome:
          'The attacker was ejected from your account in real time, and the endpoint scan identified the source malware.',
        clueInsight:
          'You combined session termination, password rotation, and endpoint hygiene into a cohesive defense.',
        saferAction: 'Keep browser extensions minimal and avoid downloading unverified pirated software.',
        principle: 'Invalidate active session tokens when remediating account compromises.',
      },
      C: {
        mentorVoice: 'An incomplete defense that leaves active access tokens alive.',
        whyExplanation:
          'Many identity providers preserve active session tokens across password updates to avoid interrupting user workflows.',
        realisticOutcome:
          'The attacker continued downloading your private files using the existing session cookie.',
        clueInsight:
          'Explicitly revoking all sessions is required to guarantee that stolen cookies are invalidated.',
        saferAction: 'Always click "Sign out of all other web sessions" during a security incident.',
        principle: 'Session invalidation is as critical as credential reset.',
      },
      D: {
        mentorVoice: 'Panic destroys value without solving the underlying threat.',
        whyExplanation:
          'Deleting the account results in catastrophic data loss while ignoring the malware sitting on your hard drive.',
        realisticOutcome:
          'You lost years of academic work, and your new account was compromised the next day by the same malware.',
        clueInsight:
          'Incident response must be methodical: isolate, remediate, and verify.',
        saferAction: 'Follow structured incident response protocols rather than destroying data.',
        principle: 'Methodical remediation triumphs over panic.',
      },
    },
  },

  // 08 — The Shared Document
  {
    id: 'scenario-08',
    number: 8,
    code: 'OPS-08',
    title: 'The Public Cloud Storage Leak',
    category: 'privacy',
    categoryLabel: 'Data Privacy & Cloud Access Permissions',
    difficulty: 'Level 5 — Analyze',
    environment: 'library',
    environmentTitle: 'Campus Hub — Group Collaboration Lab',
    context: 'You are working with four classmates on a final capstone software project.',
    situation:
      'A teammate creates a shared Google Drive folder containing project files, database credentials, and a spreadsheet containing 300 student research subjects’ full names, student IDs, and medical survey responses. To make it "easy for everyone to access without logging into university accounts," they set the folder link sharing to: "Anyone on the internet with the link can EDIT."',
    participant: {
      name: 'Samir Patel',
      role: 'Capstone Project Teammate',
      avatarType: 'student-casual',
    },
    dialogue: [
      'Hey team, I set up the project folder on Google Drive!',
      'To save everyone time with university SSO logins, I set it to "Anyone with link can edit".',
      'That way we can all work from our phones or personal laptops without permission requests.',
    ],
    artifact: {
      type: 'cloud-permissions',
      title: 'Cloud Storage Permission Audit',
      subtitle: 'Service: Google Drive / Cloud Workspace',
      metadata: {
        FolderName: 'Capstone-2026-Final-Deliverables',
        Contents: 'DB_Config.env (API Keys), Subject_Medical_Data.xlsx (300 records)',
        AccessSetting: 'Public — Anyone with the link (No login required)',
        PermissionLevel: 'Editor (Full read, write, modify, delete)',
      },
      contentPreview:
        'ACCESS RISK ANALYSIS:\nPublic links are routinely indexed by search engines, exposed via public chat logs, browser extensions, and URL preview bots. Anyone discovering this link can read medical records and export AWS/database secrets.',
      clueCallout:
        'The Principle of Least Privilege dictates that access should only be granted to verified individuals who strictly require it, at the minimum permission level necessary.',
      tags: ['Least Privilege', 'Data Exposure', 'Cloud Misconfiguration'],
    },
    options: [
      {
        id: 'A',
        label: 'Leave the setting as is because convenience is essential for meeting the group deadline.',
        description:
          'Keep the link public to avoid annoying permission requests when group members work from mobile devices.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The link leaks through a group Discord server. An external bot scrapes the API keys from DB_Config.env, spins up unauthorized cloud compute, and the sensitive medical research data is published online, resulting in an institutional research ethics investigation.',
        clueContext:
          'Public links with edit permissions provide zero accountability and allow anonymous data destruction.',
        saferAction: 'Enforce authenticated access controls with named users.',
      },
      {
        id: 'B',
        label: 'Restrict the folder to specific university email accounts, enforce view/edit least privilege, and rotate exposed credentials.',
        description:
          'Change the link setting to "Restricted", invite team members individually using their verified institutional emails, remove API keys from shared documents, and rotate any credentials that were briefly exposed.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Only authorized teammates can access the folder, all file changes are tied to verifiable identities, and rotating the API keys ensures that any potential exposure is neutralized.',
        clueContext:
          'You applied the Principle of Least Privilege and recognized that exposed credentials must be treated as compromised.',
      },
      {
        id: 'C',
        label: 'Change the permission from "Anyone can edit" to "Anyone can view".',
        description:
          'Keep the link public, but reduce the permission level so anonymous internet users can only read the files.',
        classification: 'risky',
        riskAssessment: 'HIGH',
        consequence:
          'While anonymous users can no longer delete files, the 300 students’ medical survey responses and private database keys are still completely visible and downloadable by anyone with the URL.',
        clueContext:
          'Read-only public links still leak confidential data and credentials.',
        saferAction: 'Require individual user authentication and restrict access by identity.',
      },
      {
        id: 'D',
        label: 'Download the files to your personal laptop and delete the online folder without telling the team.',
        description:
          'Take the files offline entirely and wipe the cloud folder to eliminate the security risk.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'Deleting the group’s work causes panic and disruption, does not rotate the credentials that were already exposed online, and isolates data on an unbacked-up laptop.',
        clueContext:
          'Unilateral destructive actions do not remediate leaked secrets and disrupt legitimate workflows.',
        saferAction: 'Coordinate with the team to fix permissions and rotate secrets properly.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple: 'Enforce the Principle of Least Privilege. Never share sensitive data via public links, and rotate exposed credentials.',
    learningObjective: 'Understand cloud access controls, public link risks, and the need to rotate exposed API secrets.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'Convenience without authorization is the primary cause of cloud data breaches.',
        whyExplanation:
          'Public cloud links are not private passwords. They are shared across chat channels, web crawlers, and browser extensions.',
        realisticOutcome:
          'Sensitive student medical records and production database credentials leaked publicly.',
        clueInsight:
          'Anyone on the internet could edit or wipe the capstone project files with zero accountability.',
        saferAction:
          'Always restrict cloud folders to authenticated, named individual accounts.',
        principle: 'Public links should never be used for non-public or sensitive data.',
      },
      B: {
        mentorVoice: 'Excellence in data governance and defense-in-depth.',
        whyExplanation:
          'You restricted access to verified accounts and recognized the vital secondary step: rotating any API keys that existed in a public space.',
        realisticOutcome:
          'Student privacy was preserved, university compliance standards were satisfied, and project data was secured.',
        clueInsight:
          'You applied the Principle of Least Privilege: only authorized individuals, verified by identity, with minimum necessary permissions.',
        saferAction: 'Store environment secrets in secure vault managers, never in shared cloud document folders.',
        principle: 'Enforce least privilege and treat all exposed secrets as compromised.',
      },
      C: {
        mentorVoice: 'A false sense of security: confidentiality was still completely breached.',
        whyExplanation:
          'Changing to "Anyone with the link can view" prevents file tampering, but does nothing to protect data privacy.',
        realisticOutcome:
          'The medical research subjects had their confidential data leaked to third-party observers.',
        clueInsight:
          'The core violation was public exposure, not just write access.',
        saferAction: 'Restrict the folder to authenticated domain users.',
        principle: 'Confidentiality requires identity authentication, not just write-protection.',
      },
      D: {
        mentorVoice: 'Good defensive instinct, but chaotic remediation.',
        whyExplanation:
          'Deleting the folder stops ongoing access, but disrupts your team and fails to remediate the exposed API keys.',
        realisticOutcome:
          'Team panic ensued, while the exposed keys remained valid in memory.',
        clueInsight:
          'Security remediation requires communication and secret rotation, not silent sabotage.',
        saferAction: 'Communicate with your team to configure authenticated access properly.',
        principle: 'Remediate cloud permissions systematically through communication and secret rotation.',
      },
    },
  },
  // 09 — Open Internet: The Unsolicited Recruiter & Malicious Repo Task
  {
    id: 'scenario-09',
    number: 9,
    code: 'OPS-09',
    title: 'The Fake Tech Recruiter & Malicious Repo',
    category: 'social-engineering',
    categoryLabel: 'Open Internet — Fake Job Offers & Malware Droppers',
    difficulty: 'Level 4 — Respond',
    environment: 'office',
    environmentTitle: 'Open Internet // Remote Career Outreach & Chat',
    context: 'You receive an unsolicited direct message on LinkedIn and Telegram offering a high-paying junior remote developer role.',
    situation:
      'A recruiter named "Elena Rostova" claims to represent a fast-growing Web3 AI startup. She offers $75/hr and asks you to clone a private test repository from an external git link and run `npm install && npm test` to complete a 15-minute coding evaluation.',
    participant: {
      name: 'Kai Chen',
      role: 'Fellow Student & Job Seeker',
      avatarType: 'student-casual',
    },
    dialogue: [
      'Hey, Elena just sent me the exact same test assignment on Telegram!',
      'She said if we get the unit tests passing by tonight, we get an immediate interview stipend.',
      'Should we just run the npm test script on our dev laptops to see what the challenge looks like?',
    ],
    artifact: {
      type: 'chat-message',
      title: 'Recruiter Direct Message & Repo Dispatch',
      subtitle: 'Platform: Telegram Messenger v10.4',
      metadata: {
        Sender: 'Elena Rostova (@ElenaRecruit_Talent)',
        Handle: 'Verified Startup Talent Specialist',
        Package: 'test-challenge-v2.zip / git.smartcontract-eval.org/task',
        Instruction: 'Run: npm install && npm run eval',
      },
      contentPreview:
        'Hi! We reviewed your profile and love your background. We want to expedite your hiring process with a quick 15-minute code review test.\n\nClone our repo: https://git.smartcontract-eval.org/developer-test.git\nExtract and execute: npm install\n\nNote: Please run on your primary machine to test your local Node environment.',
      clueCallout:
        'Inspecting package.json in the zip reveals a "postinstall" script: "node ./scripts/check-env.js". That script secretly scans ~/.aws/credentials, browser cookie databases, and Discord tokens, exfiltrating them to an unlisted IP.',
      tags: ['Fake Job Scam', 'Malicious npm Postinstall', 'Credential Infostealer'],
    },
    options: [
      {
        id: 'A',
        label: 'Clone the repository and immediately run npm install and npm test as instructed.',
        description: 'Start the coding test right away on your computer so you do not lose the opportunity.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The malicious npm postinstall script automatically executes during install, silently stealing your saved browser passwords, GitHub session cookies, and SSH keys.',
        clueContext:
          'You ran unverified code from an unknown stranger without inspecting package scripts or running in a sandboxed disposable environment.',
        saferAction: 'Inspect package.json and verify the recruiter identity independently through official company channels.',
      },
      {
        id: 'B',
        label: 'Inspect the package.json and test scripts in an isolated text viewer before running anything.',
        description:
          'Open the files in a plain text editor without installing dependencies to inspect package.json scripts and dependencies for obfuscated code.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'You discover an obfuscated postinstall script designed to steal browser tokens and Discord sessions. You alert Kai and report the account to LinkedIn/Telegram security.',
        clueContext:
          'You applied Zero Trust to external code: never run npm install on untrusted repositories without inspecting postinstall hooks.',
        saferAction: 'Always examine package.json scripts or run tests inside containerized disposable sandboxes.',
      },
      {
        id: 'C',
        label: 'Ask the recruiter to send the test questions as plain text or PDF instead.',
        description: 'Message the recruiter asking if the challenge can be completed without downloading third-party repositories.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'The recruiter sends a malicious PDF weaponized with an embedded exploit link, keeping the attack active while Kai proceeds to download the infected zip.',
        clueContext:
          'Engaging with an obvious threat actor without reporting or alerting peers leaves others vulnerable.',
        saferAction: 'Cease communication, report the account, and warn peers who received the solicitation.',
      },
      {
        id: 'D',
        label: 'Delete the message and block the recruiter without investigating or warning Kai.',
        description: 'Ignore the offer completely and close your Telegram chat.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'You keep your machine safe, but Kai executes the payload on his laptop, resulting in complete credential exfiltration.',
        clueContext:
          'Defensive security is community-oriented. Reporting and warning classmates prevents widespread compromise.',
        saferAction: 'Warn Kai and report the recruiter profile to platform moderators.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple: 'Never execute npm install or untrusted binaries from unsolicited recruiters. Inspect package scripts and isolate external code in throwaway environments.',
    learningObjective: 'Recognize fake job recruiting scams that weaponize npm postinstall hooks to deploy infostealers.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'A devastating mistake, but an all-too-common trap in modern tech recruiting scams.',
        whyExplanation:
          'Running `npm install` automatically triggers any defined "preinstall" or "postinstall" shell hooks with full system permissions.',
        realisticOutcome:
          'Your machine was compromised by an infostealer payload, exfiltrating personal passwords and crypto wallet tokens.',
        clueInsight:
          'The fake company had no verified physical headquarters and contacted you exclusively via unverified messaging channels.',
        saferAction: 'Always view raw code in an isolated text editor or sandbox before installing dependencies.',
        principle: 'Untrusted repositories must never execute on primary workstations.',
      },
      B: {
        mentorVoice: 'Flawless forensic judgment. You caught a real-world nation-state / criminal infostealer vector.',
        whyExplanation:
          'By inspecting the manifest before running installation hooks, you uncovered the malicious postinstall script without exposing your operating system.',
        realisticOutcome:
          'You protected your developer credentials, saved Kai from financial theft, and exposed a fraudulent recruiting ring.',
        clueInsight:
          'Legitimate companies interview candidates before sending coding assignments and use established platforms like HackerRank or LeetCode.',
        saferAction: 'Run unknown coding evaluations only in ephemeral cloud containers or sandbox virtual machines.',
        principle: 'Enforce code inspection before dependency resolution.',
      },
      C: {
        mentorVoice: 'Cautious instinct, but continuing to negotiate with an attacker prolongs the risk.',
        whyExplanation:
          'Scammers adapt quickly and will redirect you to phishing portals or weaponized document attachments.',
        realisticOutcome:
          'The scammer shifted to a fake PDF invoice while your classmate fell victim to the original zip.',
        clueInsight:
          'The primary red flag was the unsolicited high-salary offer with immediate test requirements.',
        saferAction: 'Report and terminate communication when indicators of malicious code are detected.',
        principle: 'Do not negotiate with untrusted threat actors.',
      },
      D: {
        mentorVoice: 'Self-preservation succeeded, but collective defense failed.',
        whyExplanation:
          'Blocking the user kept you safe, but your peer who was actively asking for advice suffered complete credential theft.',
        realisticOutcome:
          'Kai lost his cloud accounts because no warning was issued.',
        clueInsight:
          'Classmates sharing job opportunities are prime targets for targeted recruitment campaigns.',
        saferAction: 'Share threat intelligence with peers when attacks target shared student networks.',
        principle: 'Cybersecurity is a collective defense ecosystem.',
      },
    },
  },
  // 10 — Open Internet: The Tampered Parking Meter & Kiosk Quishing Attack
  {
    id: 'scenario-10',
    number: 10,
    code: 'OPS-10',
    title: 'The Parking Meter QR Sticker (Quishing)',
    category: 'qr',
    categoryLabel: 'Open Internet — Physical Kiosk Tampering & QR Phishing',
    difficulty: 'Level 3 — Decide',
    environment: 'quad',
    environmentTitle: 'Open Internet // Downtown Curbside Parking Kiosk',
    context: 'You are parking downtown near the digital arts district before a team meetup.',
    situation:
      'The parking meter display screen has a sticker affixed directly over the coin slot reading: "METER OFFLINE: Pay with Mobile CityPass. Scan QR code below for instant parking validation."',
    participant: {
      name: 'Maya Lin',
      role: 'Student Driver & Friend',
      avatarType: 'student-casual',
    },
    dialogue: [
      'Look at this sticker right over the card reader!',
      'It says the card slot is broken, but we can pay 3 dollars on our phones by scanning this code.',
      'Let’s just scan it real quick so we don’t get a 50-dollar parking ticket!',
    ],
    artifact: {
      type: 'qr-poster',
      title: 'Adhesive Sticker on Physical Meter',
      subtitle: 'Location: City Meter #4092-B',
      metadata: {
        Surface: 'Vinyl adhesive label pasted on top of brushed metal housing',
        Header: 'OFFICIAL CITY PARKING VALIDATION',
        EncodedURL: 'https://city-parking-pay99.top/kiosk?id=4092',
        RequestedFields: 'Credit Card Number, Expiration, CVV, Phone, Social Security Number',
      },
      contentPreview:
        '[QR MATRIX CODE]\n\n"SCAN TO AVOID PARKING VIOLATIONS"\nDestination: https://city-parking-pay99.top/kiosk?id=4092\n\nRequires full billing profile and credit card input.',
      clueCallout:
        'The sticker is visibly raised on the edge and peeling slightly. The URL uses a suspicious .top top-level domain instead of the official municipal portal (.gov). It also requests an SSN for a 3-dollar parking fee!',
      tags: ['Quishing', 'Physical Tampering', 'Over-Permissioning'],
    },
    options: [
      {
        id: 'A',
        label: 'Scan the QR code and enter payment details on the mobile page to avoid a parking ticket.',
        description: 'Complete the payment quickly on the browser page so your parking spot is registered.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'Your credit card information and personal identity details are captured by an offshore scam ring, triggering fraudulent charges within minutes.',
        clueContext:
          'You overlooked the suspicious .top domain, the physical sticker overlay, and the absurd request for a Social Security Number for parking.',
        saferAction: 'Never input sensitive banking details into URLs from physical stickers without verifying official city apps.',
      },
      {
        id: 'B',
        label: 'Inspect the sticker edge, examine the URL destination, and use the official city parking app instead.',
        description:
          'Point out the vinyl sticker overlay to Maya, verify the fake .top domain, navigate independently to the city parking app or call the number on the metal plate.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'You avoid financial fraud, report the tampered meter to the parking authority, and pay legitimately using the official municipal mobile app.',
        clueContext:
          'You identified physical substrate tampering (sticker overlay) and domain spoofing (unauthorized .top domain).',
        saferAction: 'Inspect physical media for overlays and independently type verified municipal URLs.',
      },
      {
        id: 'C',
        label: 'Peel off the sticker and throw it away, then leave your car parked without paying.',
        description: 'Remove the fake sticker from the meter and assume parking is free since the meter is defective.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'You prevented other drivers from scanning the code, but you returned to your car to find a $65 parking violation ticket on your windshield.',
        clueContext:
          'Removing physical evidence does not pay for parking; parking enforcement does not honor handwritten excuses.',
        saferAction: 'Pay through the verified municipal app and report the tampering to parking enforcement.',
      },
      {
        id: 'D',
        label: 'Drive to another parking spot several blocks away without reporting the fake code.',
        description: 'Abandon the spot to avoid dealing with the fake meter.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'You avoid the scam, but the next driver who parks in the stall scans the code and has their credit card stolen.',
        clueContext:
          'Failing to alert parking enforcement allows the physical attack vector to persist against other community members.',
        saferAction: 'Report the scam sticker to the city transit hotline so maintenance can remove it.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple: 'Physical QR codes are easily overwritten by adhesive stickers. Always verify the domain suffix, check for tactile overlays, and prefer official bookmarked apps.',
    learningObjective: 'Identify physical Quishing attacks on public kiosks, parking meters, and scooters.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'A costly scan. The attacker turned your fear of a parking fine against you.',
        whyExplanation:
          'Anyone with a $20 sticker printer can paste a QR code over a parking meter, gas pump, or rental scooter.',
        realisticOutcome:
          'Credit card skimmed, identity data harvested, and unauthorized recurring charges applied.',
        clueInsight:
          'Municipal governments never use cheap third-level domains (.top) or ask for SSNs for parking transactions.',
        saferAction: 'Always use bookmarked official transit apps or call the number stamped into the metal housing.',
        principle: 'Physical QR codes have zero inherent integrity.',
      },
      B: {
        mentorVoice: 'Masterful situational vigilance. You connected physical reality to digital risk.',
        whyExplanation:
          'You checked the physical layer (sticker overlay) and the digital layer (domain authority), avoiding a double trap.',
        realisticOutcome:
          'Protected your finances and prompted municipal authorities to sweep the street for rogue stickers.',
        clueInsight:
          'Legitimate parking meters embed screens or display codes behind tamper-resistant polycarbonate glass.',
        saferAction: 'Inspect physical barcodes for peeling edges and check URL domain authenticity before paying.',
        principle: 'Verify physical substrate and digital domain before authorizing payments.',
      },
      C: {
        mentorVoice: 'Public-spirited, but expensive for your own wallet.',
        whyExplanation:
          'Removing the scam protected the public, but parking officers enforce payment regardless of broken meters.',
        realisticOutcome:
          'A legitimate parking citation was issued because no valid parking session was initiated.',
        clueInsight:
          'Legitimate payment options almost always exist via official phone numbers or official city apps.',
        saferAction: 'Use the official app or find another meter, while notifying parking enforcement.',
        principle: 'Public defense must be paired with operational compliance.',
      },
      D: {
        mentorVoice: 'You stayed safe, but left the trap armed for the next victim.',
        whyExplanation:
          'Physical scams rely on people walking away without reporting, allowing dozens of drivers to get compromised.',
        realisticOutcome:
          'Another student fell victim to the fake portal ten minutes later.',
        clueInsight:
          'A quick 30-second call to the number printed on the meter takes the trap down.',
        saferAction: 'Report physical tampering to kiosk operators immediately.',
        principle: 'Prompt reporting decommissions active threats.',
      },
    },
  },
];
