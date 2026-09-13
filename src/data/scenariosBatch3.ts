import { Scenario } from '../types/scenario';

export const BATCH3_SCENARIOS: Scenario[] = [
  // 19 — AI Voice Impersonation
  {
    id: 'scenario-19',
    number: 19,
    code: 'OPS-19',
    title: 'The Distressed Family Voice Note',
    category: 'social-engineering',
    categoryLabel: 'Generative AI Impersonation & Out-of-Band Verification',
    difficulty: 'Level 4 — Respond',
    environment: 'dorm',
    environmentTitle: 'Dorm Study Room',
    context: 'You receive an urgent voicemail from an unfamiliar telephone number.',
    situation:
      'The voice message sounds remarkably like your younger brother Leo. In a breathless, panicked voice, he says: "I had a minor car accident on my way back to campus! The tow truck driver will not release my car and my phone battery is at 1%. Please send $350 via CashApp or Zelle right now to fast-tow-service@dispatch.net. Do not call Mom, she will freak out—please hurry!"',
    participant: {
      name: 'Jordan Rivera',
      role: 'Dorm Resident',
      avatarType: 'student-worried',
    },
    dialogue: [
      'Whoa, is that your brother on the voicemail? He sounds terrified.',
      'He needs money right away for a tow truck?',
      'Wait... can people fake voices now with AI? Did you check his actual number?',
    ],
    artifact: {
      type: 'chat-message',
      title: 'Voicemail Audio Analysis & Metadata',
      subtitle: 'Audio Codec: Synthesized Cellular Voice Clip',
      metadata: {
        'Caller ID': '+1 (800) 555-0143 (Spoofed Number)',
        'Voice Match': '94% Acoustic Similarity to Family Member',
        'Urgency Markers': 'Extreme Panic, Time Pressure, "Do not call Mom"',
        'Payment Channel': 'P2P Wire (No Buyer Protection)',
      },
      contentPreview:
        'Voicemail Transcript:\n"Hey, it is Leo! I crashed the car near the highway. The tow driver needs $350 cash or CashApp to release the vehicle right now. My phone is dying. Do not call Mom. Send it to fast-tow-service@dispatch.net right now!"',
      clueCallout:
        'Generative AI voice cloning requires less than 5 seconds of sample audio from public social videos to replicate tone and cadence. Demands for immediate cash transfers and pleas not to contact other family members are signature hallmarks of deepfake extortion.',
      tags: ['Voice Cloning', 'AI Impersonation', 'Emergency Fraud'],
    },
    options: [
      {
        id: 'A',
        label: 'Send the $350 via CashApp immediately so your brother is not stranded on the road.',
        description:
          'Transfer the requested funds immediately to resolve the emergency as quickly as possible.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The money is instantly pocketed by offshore scammers. When you contact your brother later, he is safe at home and was never in an accident.',
        clueContext:
          'You responded to emotional distress and urgency without verifying the caller.',
        saferAction: 'Always verify through a known, trusted communication channel.',
      },
      {
        id: 'B',
        label: 'Pause, decline the transfer, and call your brother directly on his known number.',
        description:
          'Take a breath, ignore the pressure, dial your brother’s verified phone number, or contact your parents to verify his whereabouts.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Your brother answers his phone normally from his dorm. He confirms he is totally fine, exposing the voice note as a synthetic deepfake scam.',
        clueContext:
          'You applied out-of-band verification on a trusted, established channel.',
      },
      {
        id: 'C',
        label: 'Text the unknown number asking for a selfie holding today’s newspaper as proof.',
        description:
          'Attempt to negotiate proof of life with the unknown sender via text message.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'Scammers use AI image generators to create fake photos or escalate high-pressure intimidation tactics.',
        clueContext:
          'Engaging with scammers keeps you on their fraudulent communication channel.',
        saferAction: 'Switch to your verified contact list immediately.',
      },
      {
        id: 'D',
        label: 'Send half the requested amount ($175) to be safe just in case the accident is real.',
        description:
          'Compromise by transferring partial funds to reduce your potential financial loss.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'You still lose $175 to a scammer, and sending funds encourages them to call back demanding more money.',
        clueContext:
          'Partial payments still reward and validate criminal impersonators.',
        saferAction: 'Verify the truth before sending any money.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Generative AI makes voice cloning trivial. Always perform out-of-band verification on a known, verified channel before sending emergency funds.',
    learningObjective:
      'Recognize AI voice cloning scams and establish family verification protocols to defeat emotional extortion.',
    deterministicFeedback: {
      A: {
        mentorVoice:
          'That was an AI voice clone. Modern audio synthesizers can clone anyone’s voice using just a quick video clip from social media.',
        whyExplanation:
          'Scammers intentionally simulate distress and demand instant peer-to-peer transfers while saying "Don\'t call family" to prevent you from checking facts.',
        realisticOutcome:
          'You would lose $350 permanently with zero legal recourse.',
        clueInsight:
          'The instruction "Do not call Mom" is designed specifically to block verification.',
        saferAction:
          'Always hang up and call the real family member on their saved number.',
        principle:
          'Never transfer money based solely on an incoming voice message.',
      },
      B: {
        mentorVoice:
          'Incredible composure. You refused to let panic dictate your actions and followed the golden rule of out-of-band verification.',
        whyExplanation:
          'By calling your brother directly on his verified phone number, you bypassed the scammer’s fake channel and shattered the illusion immediately.',
        realisticOutcome:
          'You saved $350, confirmed your brother was safe, and alerted your family to the voice clone attempt.',
        clueInsight:
          'Many families now establish a secret "safe word" to verify real emergencies.',
        saferAction:
          'Establish a family verification passphrase for emergency situations.',
        principle:
          'Out-of-band verification neutralizes AI impersonation.',
      },
      C: {
        mentorVoice:
          'Staying in the scammer’s chat stream is a dangerous distraction.',
        whyExplanation:
          'Trying to interrogate a scammer on their own spoofed number wastes precious time while they use AI photo generation or aggressive threats to manipulate you.',
        realisticOutcome:
          'You stay trapped in an emotional tug-of-war instead of simply checking reality.',
        clueInsight:
          'The scammer controls the unknown number; they do not control your brother’s real phone.',
        saferAction:
          'Exit the unfamiliar thread and dial your saved contact directly.',
        principle:
          'Shift communication to trusted channels immediately.',
      },
      D: {
        mentorVoice:
          'Splitting the difference is not a security strategy.',
        whyExplanation:
          'Sending $175 gives the scammer pure profit and proves you believe the story, inviting them to harass you for the rest of the money.',
        realisticOutcome:
          'You lose $175 and confirm to criminals that their voice clone worked on you.',
        clueInsight:
          'A situation is either real or fake—there is no middle ground in verification.',
        saferAction:
          'Verify first, pay zero until authenticated.',
        principle:
          'Never compromise on credential or financial verification.',
      },
    },
  },

  // 20 — Gaming Account Scam
  {
    id: 'scenario-20',
    number: 20,
    code: 'OPS-20',
    title: 'The Free Legendary Cosmetic Trade',
    category: 'account-security',
    categoryLabel: 'Gaming Phishing & OAuth Token Theft',
    difficulty: 'Level 2 — Investigate',
    environment: 'dorm',
    environmentTitle: 'Gaming Rig in Residence Hall',
    context: 'During an online multiplayer match, a top-ranked player posts a giveaway link.',
    situation:
      'In the post-game lobby, a player with a verified clan tag writes: "Celebrating our tournament win! The first 50 players to claim get free $90 legendary knife skins. Go to steam-community-itemdrop.club/claim". You click the link out of curiosity. A page styled like the Steam platform opens: "Sign in with Steam to link your inventory and accept the trade offer."',
    participant: {
      name: 'Kevin Zhao',
      role: 'Gaming Squad Member',
      avatarType: 'student-casual',
    },
    dialogue: [
      'Dude, did you see that link in the match lobby?',
      'Free legendary skins? Those are worth real money on the market.',
      'Check the browser address bar though—does that URL look right to you?',
    ],
    artifact: {
      type: 'login-alert',
      title: 'Web Page URL & Authentication Analysis',
      subtitle: 'Target: steam-community-itemdrop.club/claim',
      metadata: {
        'Domain Name': 'steam-community-itemdrop.club (Authentic: steamcommunity.com)',
        'SSL Certificate': 'Free Let’s Encrypt Cert',
        'Authentication Method': 'Simulated Steam OpenID Login Popup',
        'Inventory Target': 'Full Steam / Discord Inventory Trade Permission',
      },
      contentPreview:
        'COMMUNITY INVENTORY DROP\n\nTo accept trade offer:\n[ SIGN IN WITH STEAM ]\n\nAlert: Entering your login name, password, and Steam Guard mobile authenticator code will grant complete API trade token authorization to this domain.',
      clueCallout:
        'The authentic domain is steamcommunity.com. Scammers use lookalike domains (e.g. steam-community-itemdrop.club) with hyphenated words to fool gamers into handing over credentials and 2FA tokens.',
      tags: ['Gaming Phishing', 'OAuth Theft', 'Inventory Hijacking'],
    },
    options: [
      {
        id: 'A',
        label: 'Log in with your Steam credentials and mobile authenticator to claim the skin.',
        description:
          'Enter your account username, password, and 2FA code so the website can transfer the item.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'Automated bots use your credentials and Steam Guard code to generate a Steam Web API key, instantly transferring your entire gaming inventory to an untraceable bot.',
        clueContext:
          'You submitted your credentials on a fake lookalike domain.',
        saferAction: 'Never log into gaming accounts through third-party chat links.',
      },
      {
        id: 'B',
        label: 'Inspect the address bar, close the site, and report the user in-game.',
        description:
          'Notice the deceptive domain name, refuse to enter credentials, and report the lobby message for phishing.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Your account and valuable items remain 100% protected. The scammer’s chat account is banned following multiple lobby reports.',
        clueContext:
          'You spotted the fake domain suffix and preserved account security.',
      },
      {
        id: 'C',
        label: 'Create a brand new empty gaming account and try to claim the skin on it.',
        description:
          'Use a throwaway account to test if the item drop is real without risking your main items.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'The throwaway account is compromised, and you waste time verifying that the supposed free skin was completely nonexistent.',
        clueContext:
          'Testing known scam links on burner accounts still exposes your device and IP.',
        saferAction: 'Ignore obviously fraudulent giveaways.',
      },
      {
        id: 'D',
        label: 'Type in a completely fake username and password to test if the site checks it.',
        description:
          'Submit garbage credentials to see if the page gives an error or accepts anything.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'Phishing sites often accept fake inputs and prompt for your mobile 2FA code anyway, wasting your time while loading tracker cookies.',
        clueContext:
          'Probing phishing sites exposes your browser to fingerprinting and exploits.',
        saferAction: 'Leave suspicious sites immediately.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Free in-game cosmetics are the premier lure for account theft. Never enter gaming credentials on third-party domains.',
    learningObjective:
      'Spot gaming phishing sites using lookalike domains and understand API key trade hijacking.',
    deterministicFeedback: {
      A: {
        mentorVoice:
          'Your entire gaming inventory would be wiped out in seconds.',
        whyExplanation:
          'The website "steam-community-itemdrop.club" is not Steam (steamcommunity.com). Entering your password and 2FA code allowed an automated bot to hijack your Steam Web API key.',
        realisticOutcome:
          'All your rare skins and games are traded away to overseas accounts, and Steam Support cannot reverse API trades.',
        clueInsight:
          'Real Steam OpenID popups automatically recognize you if you are already signed in on your browser—they never ask for your password again.',
        saferAction:
          'Verify that authentic login popups are hosted directly on valve.com or steamcommunity.com.',
        principle:
          'There is no such thing as free high-value digital assets from random players.',
      },
      B: {
        mentorVoice:
          'Eagle-eyed defense! You scrutinized the domain structure and identified a classic typosquatting domain.',
        whyExplanation:
          'Legitimate companies own their main domains. Adding hyphens and extra words like "-itemdrop.club" is standard phishing craft.',
        realisticOutcome:
          'You kept your inventory intact and helped clean up the gaming lobby by reporting the malicious link.',
        clueInsight:
          'Genuine Steam trades happen directly through the official Steam client interface, never via external web links.',
        saferAction:
          'Keep your mobile authenticator enabled and regularly review active Steam Web API keys.',
        principle:
          'Always inspect the fully qualified domain name before entering credentials.',
      },
      C: {
        mentorVoice:
          'Testing scams with burner accounts is a waste of time and energy.',
        whyExplanation:
          'The promised $90 skin does not exist. The entire website is just a facade designed to harvest logins.',
        realisticOutcome:
          'Your burner account is stolen, and visiting the page gives the scammers your browser fingerprint and IP address.',
        clueInsight:
          'When the premise is impossible, testing it yields nothing of value.',
        saferAction:
          'Dismiss the lure immediately without interacting.',
        principle:
          'Do not validate scams by interacting with them.',
      },
      D: {
        mentorVoice:
          'Submitting fake credentials to test phishing forms accomplishes nothing useful.',
        whyExplanation:
          'Phishing kits often do not even check passwords—they immediately display a fake loading spinner and prompt for your mobile 2FA code.',
        realisticOutcome:
          'You expose your browser to tracking scripts and malicious redirects.',
        clueInsight:
          'Engaging with malicious sites provides them telemetry on your browser environment.',
        saferAction:
          'Close the browser tab cleanly upon identifying a spoofed domain.',
        principle:
          'Avoid active reconnaissance on untrusted web infrastructure.',
      },
    },
  },

  // 21 — App Permissions
  {
    id: 'scenario-21',
    number: 21,
    code: 'OPS-21',
    title: 'The Flashlight App with 18 Permissions',
    category: 'privacy',
    categoryLabel: 'Mobile App Permissions & Data Harvesting',
    difficulty: 'Level 2 — Investigate',
    environment: 'quad',
    environmentTitle: 'Campus Quadrangle',
    context: 'You download a free flashlight and calculator app from your smartphone app store.',
    situation:
      'You open "SuperBeam Calculator & Torch" for the first time. Before the app functions, three system dialogs appear in rapid succession: 1. "Allow app to access Contacts and Call History?", 2. "Allow continuous background Microphone recording?", 3. "Allow full-time Precise Location Tracking?". A banner at the bottom states: "All permissions required for optimal tool calibration."',
    participant: {
      name: 'Professor Vance',
      role: 'Computer Science Faculty',
      avatarType: 'professor',
    },
    dialogue: [
      'Take a close look at what that app is requesting.',
      'A flashlight only needs camera flash hardware access.',
      'Why would a calculator need your microphone, location, and full contact list?',
    ],
    artifact: {
      type: 'cloud-permissions',
      title: 'Mobile Permission Audit Manifest',
      subtitle: 'App: SuperBeam Torch v4.1',
      metadata: {
        'Core Function': 'Toggle Camera LED / Basic Arithmetic',
        'Requested Scopes': 'READ_CONTACTS, RECORD_AUDIO, ACCESS_FINE_LOCATION, READ_SMS',
        'Data Broker SDKs': '3 Third-Party Ad & Telemetry Libraries Detected',
        Category: 'Utility / Tools',
      },
      contentPreview:
        'Manifest Request:\n• READ_CALL_LOGS\n• ACCESS_BACKGROUND_LOCATION\n• RECORD_AUDIO\n• READ_EXTERNAL_STORAGE\n\nPrivacy Risk: High. Over-permissioned app monetizes personal data through ad networks.',
      clueCallout:
        'A flashlight app requires zero access to contacts, microphone, or SMS. Applications requesting permissions far beyond their operational purpose are monetizing your personal telemetry or acting as spyware.',
      tags: ['Least Privilege', 'Mobile Permissions', 'Data Harvesting'],
    },
    options: [
      {
        id: 'A',
        label: 'Tap "Allow All" so the application opens without annoying warning prompts.',
        description:
          'Grant all requested permissions to quickly get the calculator and flashlight working.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The app’s embedded advertising SDK continuously records ambient sound, harvests your entire phonebook, and sells your real-time GPS location to third-party data brokers.',
        clueContext:
          'You ignored the massive mismatch between app functionality and requested privileges.',
        saferAction: 'Deny unnecessary permissions and uninstall intrusive apps.',
      },
      {
        id: 'B',
        label: 'Deny all sensitive permissions, uninstall the app, and use built-in tools.',
        description:
          'Recognize blatant over-permissioning, reject access, remove the app, and rely on your smartphone’s native flashlight and calculator.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Your contacts, location, and audio privacy remain protected. You realize your phone already had both tools built natively into the quick settings menu.',
        clueContext:
          'You applied the principle of least privilege and eliminated unnecessary third-party software.',
      },
      {
        id: 'C',
        label: 'Allow location access "While Using App" but deny microphone and contacts.',
        description:
          'Grant partial access to see if the app will work with limited permissions.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'The app still logs your physical location whenever you calculate numbers or toggle the light, feeding your commute patterns to advertisers.',
        clueContext:
          'A calculator has no valid use case for geographic location.',
        saferAction: 'Never grant location to basic offline utilities.',
      },
      {
        id: 'D',
        label: 'Keep the app installed but put it into a hidden folder on your home screen.',
        description:
          'Hide the app icon so you do not see it, assuming it cannot run in the background.',
        classification: 'risky',
        riskAssessment: 'HIGH',
        consequence:
          'Hiding an icon has zero effect on background permissions; the app continues tracking and recording data while hidden.',
        clueContext:
          'Visual layout does not alter operating system runtime permissions.',
        saferAction: 'Uninstall applications you do not trust.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Apply the principle of least privilege to mobile apps. If a simple utility demands access to your private contacts, microphone, or location, treat it as spyware.',
    learningObjective:
      'Audit mobile application permission requests against their functional scope and reject unnecessary access.',
    deterministicFeedback: {
      A: {
        mentorVoice:
          'You just turned your phone into a commercial tracking beacon.',
        whyExplanation:
          'A flashlight only needs access to the hardware LED. Giving it your contacts, microphone, and location allows it to profile your social graph and eavesdrop on conversations.',
        realisticOutcome:
          'Your friends’ phone numbers and your precise physical location are uploaded to data broker servers.',
        clueInsight:
          'Free utility apps frequently make their revenue by bundling aggressive spyware SDKs.',
        saferAction:
          'Always ask: "Does this tool actually need this capability to do its job?"',
        principle:
          'Deny all permissions that are not strictly necessary.',
      },
      B: {
        mentorVoice:
          'Flawless decision-making. You recognized obvious over-permissioning and cut off the risk at the root.',
        whyExplanation:
          'Modern smartphones have built-in flashlight and calculator controls that require zero external permissions and collect zero data.',
        realisticOutcome:
          'You preserved your personal privacy and avoided battery-draining telemetry background services.',
        clueInsight:
          'Uninstalling untrusted apps is always safer than trying to micromanage individual permissions.',
        saferAction:
          'Check the built-in system tools before downloading third-party utilities.',
        principle:
          'Minimize your application attack surface.',
      },
      C: {
        mentorVoice:
          'Why should a calculator know where you are standing?',
        whyExplanation:
          'Even "While Using App" location permissions allow the developer to map your home, school, and work addresses.',
        realisticOutcome:
          'Your movement patterns are cataloged and linked to your advertising identifier.',
        clueInsight:
          'Partial access to inappropriate data is still a compromise.',
        saferAction:
          'Refuse location access to any app that does not provide navigation or mapping.',
        principle:
          'Zero tolerance for irrelevant data requests.',
      },
      D: {
        mentorVoice:
          'Moving an icon to a folder does not change its background execution.',
        whyExplanation:
          'Permissions belong to the application process, not the home screen icon. The app continues running background services regardless of where its icon sits.',
        realisticOutcome:
          'The app continues harvesting data silently in the background.',
        clueInsight:
          'Out of sight does not mean out of execution.',
        saferAction:
          'Delete the application completely from the system settings.',
        principle:
          'Eliminate untrusted code rather than hiding it.',
      },
    },
  },

  // 22 — Lost Phone Incident Response
  {
    id: 'scenario-22',
    number: 22,
    code: 'OPS-22',
    title: 'The Misplaced Phone at the Student Union',
    category: 'hardware',
    categoryLabel: 'Device Theft & Immediate Incident Response',
    difficulty: 'Level 3 — Decide',
    environment: 'cafe',
    environmentTitle: 'Student Union Food Court',
    context: 'You leave a busy campus cafe and realize 15 minutes later that your smartphone is gone.',
    situation:
      'You rush back to your cafe table, but the phone is missing. The phone contains your active email, logged-in university account, banking apps, and password manager. The phone is secured with a 4-digit PIN. Calling the number goes straight to voicemail, suggesting someone has already powered it down or removed the SIM card.',
    participant: {
      name: 'Maya Lin',
      role: 'Campus Security Officer',
      avatarType: 'security-analyst',
    },
    dialogue: [
      'Did you lose your phone around here?',
      'If it goes straight to voicemail, whoever picked it up likely powered it off.',
      'You need to act quickly before someone tries to bypass your lock screen or swap your SIM.',
    ],
    artifact: {
      type: 'login-alert',
      title: 'Mobile Device Telemetry & Session Status',
      subtitle: 'Device: Pixel 8 / iPhone 15 (Status: Offline)',
      metadata: {
        'Lock Screen': '4-Digit Numeric PIN (Low Entropy)',
        'Active Sessions': 'University SSO, Gmail, Primary Bank, Bitwarden',
        'Find My Status': 'Offline (Last seen: Student Union, 12 mins ago)',
        'SIM State': 'Unregistered / Carrier Signal Lost',
      },
      contentPreview:
        'INCIDENT REPORT // LOST MOBILE TERMINAL\nActive Logins: 8 authenticated applications.\n\nImmediate Actions Required:\n1. Remote Device Lock & Erase command\n2. Global Session Revocation\n3. Mobile Carrier SIM Lock',
      clueCallout:
        'When physical custody of a device is lost and it goes offline immediately, assume malicious intent. 4-digit PINs can be brute-forced or bypassed. Immediate remote locking and cloud session revocation are essential.',
      tags: ['Physical Security', 'Incident Response', 'Session Revocation'],
    },
    options: [
      {
        id: 'A',
        label: 'Wait until tomorrow morning to see if someone brings it to the lost-and-found.',
        description:
          'Give it overnight to see if a good samaritan returns the phone before taking security steps.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'Overnight, the thief moves your SIM card to another phone to intercept SMS 2FA codes, resets your email password, and drains funds from your mobile banking app.',
        clueContext:
          'You delayed incident response during the critical initial containment window.',
        saferAction: 'Take immediate protective action the moment loss is confirmed.',
      },
      {
        id: 'B',
        label: 'Log into Find My on a laptop, trigger Remote Erase, and revoke all active sessions.',
        description:
          'From a secure laptop or campus terminal, mark the device as lost, queue a remote wipe, revoke account sessions, and call your carrier to freeze the SIM.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'The moment the phone reconnects, it wipes all data. Your accounts immediately terminate existing sessions, preventing unauthorized access.',
        clueContext:
          'You initiated swift containment across device, identity, and carrier layers.',
      },
      {
        id: 'C',
        label: 'Post on campus social media offering a $100 cash reward to whoever found it.',
        description:
          'Publish a message on university message boards asking whoever has your phone to contact you.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'Scammers contact you claiming they have your phone and demanding money upfront without ever returning the hardware.',
        clueContext:
          'Public reward broadcasts attract secondary extortionists without securing data.',
        saferAction: 'Secure your digital accounts first before seeking the hardware.',
      },
      {
        id: 'D',
        label: 'Change your desktop wallpaper to show your phone number in case someone finds it.',
        description:
          'Alter your computer wallpaper thinking it will sync to the lost phone’s lock screen.',
        classification: 'risky',
        riskAssessment: 'HIGH',
        consequence:
          'Changing desktop settings has no effect on an offline phone and wastes critical response time.',
        clueContext:
          'Desktop customizations do not perform mobile device management.',
        saferAction: 'Use official device recovery and session termination portals.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'When physical custody of a mobile device is lost, assume compromise immediately. Trigger remote lock/erase and revoke all active cloud sessions from a trusted machine.',
    learningObjective:
      'Execute prompt incident response procedures for lost or stolen hardware, including remote wipe and session termination.',
    deterministicFeedback: {
      A: {
        mentorVoice:
          'Time is the most critical variable in lost-device incident response.',
        whyExplanation:
          'Waiting overnight gives a thief hours to swap your SIM card into another phone, receive your SMS two-factor codes, and breach your bank and email accounts.',
        realisticOutcome:
          'By tomorrow morning, your accounts are hijacked and your personal photos exfiltrated.',
        clueInsight:
          'The phone going straight to voicemail was proof that the device was intentionally powered off.',
        saferAction:
          'Act within minutes of discovering device loss.',
        principle:
          'Fast containment prevents physical loss from becoming identity theft.',
      },
      B: {
        mentorVoice:
          'Masterclass incident response. You executed containment across all three vital fronts.',
        whyExplanation:
          'Triggering remote wipe protects on-device data, revoking cloud sessions severs access from stolen tokens, and freezing the SIM blocks SMS verification theft.',
        realisticOutcome:
          'The thief holds a useless paperweight. None of your emails, financial apps, or passwords were compromised.',
        clueInsight:
          'Remote erase commands stay queued on Apple/Google servers until the device connects to any network.',
        saferAction:
          'Keep regular cloud backups so hardware replacement does not result in permanent data loss.',
        principle:
          'Hardware is replaceable; unencrypted personal data and active sessions are not.',
      },
      C: {
        mentorVoice:
          'Public reward posts broadcast your vulnerability without securing your accounts.',
        whyExplanation:
          'Criminals use lost-and-found boards to target desperate victims with advance-fee extortion scams.',
        realisticOutcome:
          'You end up dealing with extortion threats while your actual accounts remain unprotected.',
        clueInsight:
          'Securing credentials must always take priority over recovering the physical phone.',
        saferAction:
          'File an official lost item report with campus police only after securing your digital identity.',
        principle:
          'Secure the digital perimeter before attempting physical recovery.',
      },
      D: {
        mentorVoice:
          'Confusing device management with desktop settings leaves your device wide open.',
        whyExplanation:
          'Your desktop computer’s display settings have zero connection to an offline mobile phone.',
        realisticOutcome:
          'Valuable minutes are wasted while your unlocked mobile sessions remain active.',
        clueInsight:
          'Use official management consoles like Google Find My Device or Apple iCloud.',
        saferAction:
          'Familiarize yourself with your phone’s remote tracking console before emergencies happen.',
        principle:
          'Use designated endpoint management tools for remote incident handling.',
      },
    },
  },

  // 23 — Social Media Location / Vacation Check-In
  {
    id: 'scenario-23',
    number: 23,
    code: 'OPS-23',
    title: 'The Real-Time Boarding Pass Post',
    category: 'privacy',
    categoryLabel: 'Digital Footprint, Geotagging & Physical Burglary Risk',
    difficulty: 'Level 2 — Investigate',
    environment: 'dorm',
    environmentTitle: 'Airport Transit Terminal',
    context: 'You and your roommate are leaving campus for a two-week winter vacation.',
    situation:
      'At the departure gate, your roommate snaps a high-resolution photo of both your paper boarding passes alongside the airport departure board. They post it to public Instagram with the caption: "Bye campus! Nobody home at apartment 4B for the next 14 days! Catch us in Spain!" They tag your public username and include the live airport geotag.',
    participant: {
      name: 'Jordan Rivera',
      role: 'Roommate & Travel Partner',
      avatarType: 'student-worried',
    },
    dialogue: [
      'Just posted our boarding passes to my story!',
      'Everyone knows we are heading to Europe for two weeks!',
      'Wait, why are you looking at me like that? It is just a travel photo!',
    ],
    artifact: {
      type: 'qr-poster',
      title: 'Social Media Post Artifact Analysis',
      subtitle: 'Channel: Public Instagram Story & Feed Post',
      metadata: {
        'Barcode Data': 'PDF417 2D Barcode fully legible in high-res photo',
        'Visible Information': 'Passenger Names, E-ticket number, Booking Reference (PNR)',
        Caption: '"Nobody home at apartment 4B for the next 14 days"',
        Audience: 'Public (Indexed by search engines & local bots)',
      },
      contentPreview:
        'POST PREVIEW:\n[ Photo of Boarding Pass: John Doe & Jordan Rivera ]\n[ High-Res 2D Barcode visible ]\nCaption: "Europe bound! Apartment 4B is empty until Jan 15th!"\nGeotag: International Terminal Gate B12',
      clueCallout:
        'Boarding pass barcodes contain your full Passenger Name Record (PNR), frequent flyer account number, and ticket details. Anyone can scan the photo from the screen, log into the airline website, cancel your return flights, or steal your loyalty miles. Furthermore, advertising an empty apartment invites burglary.',
      tags: ['Barcode Reconnaissance', 'Oversharing', 'Physical Security'],
    },
    options: [
      {
        id: 'A',
        label: 'Re-share the story to your own profile so all your followers see you traveling.',
        description:
          'Amplify the post to your own network to announce your international vacation.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'Someone scans the barcode from your story, accesses your airline reservation, and changes your assigned seating and return date. Meanwhile, your empty apartment is broken into.',
        clueContext:
          'You broadcast sensitive travel data and advertised a vacant home.',
        saferAction: 'Never post boarding passes or advertise empty residences.',
      },
      {
        id: 'B',
        label: 'Ask your roommate to delete the post, explain the barcode risk, and post photos later.',
        description:
          'Have the photo removed immediately, explain that barcodes contain booking keys, and agree to share vacation memories only after returning home.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'The post is deleted before anyone scrapes the PNR code. Your airline reservation stays secure, and your apartment does not become a marked target for local thieves.',
        clueContext:
          'You identified machine-readable barcode vulnerabilities and mitigated physical burglary risks.',
      },
      {
        id: 'C',
        label: 'Leave the post up but place an emoji over just the flight number in the photo.',
        description:
          'Cover the flight number with a digital sticker while leaving the 2D barcode fully visible.',
        classification: 'risky',
        riskAssessment: 'HIGH',
        consequence:
          'The flight number is irrelevant—the entire ticket data is encoded inside the 2D barcode, which remains completely readable.',
        clueContext:
          'Barcodes encode all flight details regardless of obscured text.',
        saferAction: 'Remove photos containing any scannable barcodes.',
      },
      {
        id: 'D',
        label: 'Turn off post comments so strangers cannot leave rude messages.',
        description:
          'Disable commenting while keeping the high-resolution photo and caption public.',
        classification: 'risky',
        riskAssessment: 'HIGH',
        consequence:
          'Disabling comments does not stop anyone from saving the image, decoding the barcode, or noting that your apartment is unoccupied.',
        clueContext:
          'Comments have zero bearing on data exfiltration and image scraping.',
        saferAction: 'Take down the post entirely.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Boarding pass barcodes encode full ticket credentials and passenger data. Never post scannable tickets online, and avoid broadcasting real-time absence from your home.',
    learningObjective:
      'Recognize the risks of publishing machine-readable travel barcodes and broadcasting vacant residences in real time.',
    deterministicFeedback: {
      A: {
        mentorVoice:
          'You just gave strangers the keys to your flight reservation and your apartment.',
        whyExplanation:
          'Anyone with a free barcode scanner app can decode the 2D barcode on a boarding pass photo to obtain your 6-character PNR booking code. With that, anyone can modify or cancel your flight.',
        realisticOutcome:
          'Your flight booking is altered, and local criminals are notified that your home is completely unattended for two weeks.',
        clueInsight:
          'Barcodes are not decorative patterns—they are unencrypted text records.',
        saferAction:
          'Post vacation photos after you are safely back home.',
        principle:
          'Delay travel social posts until after your return.',
      },
      B: {
        mentorVoice:
          'Terrific security foresight. You spotted both the technical digital risk and the physical security threat.',
        whyExplanation:
          'Taking down the post protected your airline reservation from unauthorized modification and kept your empty residence off the radar of local burglars.',
        realisticOutcome:
          'Your flight booking remained untouched, your apartment stayed safe, and you enjoyed your trip with peace of mind.',
        clueInsight:
          'Sharing vacation highlights "in retrospect" provides the exact same social sharing value with zero operational security risk.',
        saferAction:
          'Always shred paper boarding passes rather than tossing them into public airport trash bins.',
        principle:
          'Treat barcodes as sensitive credentials.',
      },
      C: {
        mentorVoice:
          'Hiding the flight number is completely useless if the barcode is visible.',
        whyExplanation:
          'The 2D barcode (PDF417) stores the passenger name, flight number, seat assignment, and electronic ticket number all in one scan.',
        realisticOutcome:
          'Anyone scanning the photo extracts the flight number from the barcode in half a second.',
        clueInsight:
          'Machine-readable codes bypass human visual redactions.',
        saferAction:
          'Do not photograph boarding passes at all.',
        principle:
          'Redacting human text does not redact machine data.',
      },
      D: {
        mentorVoice:
          'Disabling comments does nothing to restrict image viewing or data theft.',
        whyExplanation:
          'Attackers do not comment on your post; they quietly right-click the image, decode the barcode, and download your travel dossier.',
        realisticOutcome:
          'Your booking is compromised silently without a single comment being posted.',
        clueInsight:
          'View access is all an adversary needs—interaction is unnecessary.',
        saferAction:
          'Delete the media immediately.',
        principle:
          'Control visibility, not just commentary.',
      },
    },
  },

  // 24 — Fake Scholarship
  {
    id: 'scenario-24',
    number: 24,
    code: 'OPS-24',
    title: 'The $5,000 "Global Merit" Fellowship Grant',
    category: 'social-engineering',
    categoryLabel: 'Advance-Fee Fraud & Academic Scams',
    difficulty: 'Level 1 — Recognize',
    environment: 'library',
    environmentTitle: 'Science Hall Commons',
    context: 'You receive an impressive official-looking email in your student inbox.',
    situation:
      'An email from "Global Scholars International Endowment <disbursements@scholarship-awards-fund.org>" arrives with the subject: "OFFICIAL NOTICE: Unrestricted Undergraduate Grant Award ($5,000)". The letter claims you were nominated for scholastic excellence. It instructions: "To disburse your $5,000 grant into your direct deposit account, submit a one-time $65 international student clearing and wire registration fee via Western Union or crypto voucher within 48 hours." You do not remember applying for this program.',
    participant: {
      name: 'Dr. Emily Watson',
      role: 'Academic Advisor',
      avatarType: 'professor',
    },
    dialogue: [
      'Did you get an email about a five-thousand dollar grant?',
      'Check who it is from. Legitimate academic grants never ask the student to pay money upfront.',
      'That sounds like a textbook advance-fee scam.',
    ],
    artifact: {
      type: 'email',
      title: 'Incoming Scholarship Award Email',
      subtitle: 'From: disbursements@scholarship-awards-fund.org',
      metadata: {
        'Sender Address': 'disbursements@scholarship-awards-fund.org (External Free Domain)',
        'Award Amount': '$5,000.00 USD',
        Requirement: 'Upfront $65 Wire / Processing Fee',
        Deadline: '48-Hour Forfeiture Clause',
      },
      contentPreview:
        'Dear Recipient,\n\nYou have been chosen for the 2024 International Merit Grant.\nAward: $5,000.00\n\nTo release funds, you must remit the $65 clearing fee to our escrow account.\n\nFailure to remit within 48 hours will result in award reallocation.',
      clueCallout:
        'Authentic scholarships, fellowships, and university financial aid programs NEVER require recipients to pay an upfront "processing", "clearing", or "wire" fee. Demanding money to receive money is the definitive signature of advance-fee fraud.',
      tags: ['Advance-Fee Fraud', 'Scholarship Scam', 'Financial Safety'],
    },
    options: [
      {
        id: 'A',
        label: 'Pay the $65 clearing fee right away because $5,000 is an incredible payout.',
        description:
          'Send the $65 via wire transfer to secure the $5,000 scholarship disbursement.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'Your $65 is stolen. The scammers email back demanding another $150 for "foreign exchange clearance." No scholarship money ever exists.',
        clueContext:
          'You fell for advance-fee fraud by paying money to receive supposed money.',
        saferAction: 'Never pay upfront fees for scholarships or grants.',
      },
      {
        id: 'B',
        label: 'Recognize the advance-fee scam, refuse to pay, and report it to Financial Aid.',
        description:
          'Identify the classic scam pattern, delete the message, and alert your campus financial aid office so they can warn other students.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'You keep your money safe. The financial aid department issues a campus-wide bulletin warning students about the fraudulent grant campaign.',
        clueContext:
          'You recognized that real awards deduct administrative costs or have zero recipient fees.',
      },
      {
        id: 'C',
        label: 'Reply asking them to deduct the $65 fee directly from the $5,000 grant check.',
        description:
          'Send an email proposal asking the foundation to subtract the fee from the final disbursement.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'The scammers reply with aggressive legal threats or complicated explanations of why regulations prevent fee deductions, trying to manipulate you.',
        clueContext:
          'Engaging with advance-fee scammers validates your email as a live target.',
        saferAction: 'Do not negotiate with scammers.',
      },
      {
        id: 'D',
        label: 'Forward the email to your bank manager to ask if they can verify the escrow account.',
        description:
          'Ask your bank to investigate the external wire routing details.',
        classification: 'risky',
        riskAssessment: 'LOW',
        consequence:
          'Your bank confirms the routing belongs to an offshore account with fraud complaints, but you waste time on an obvious scam.',
        clueContext:
          'Obvious advance-fee fraud can be identified without banking inquiries.',
        saferAction: 'Reject upfront fee demands immediately.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Legitimate scholarships, lotteries, and grants never ask you to pay money to receive money. Any demand for an upfront processing fee is guaranteed fraud.',
    learningObjective:
      'Identify advance-fee scholarship fraud targeting students with unexpected grant offers.',
    deterministicFeedback: {
      A: {
        mentorVoice:
          'You just walked straight into the oldest trick in the book: advance-fee fraud.',
        whyExplanation:
          'No genuine scholarship foundation charges students an upfront fee to deliver funds. Once you pay $65, they invent another fee (e.g. tax validation, international clearance) until you stop paying.',
        realisticOutcome:
          'You lose your money, receive zero scholarship funds, and end up on sucker lists for future financial scams.',
        clueInsight:
          'If you did not apply for a scholarship, you did not win one.',
        saferAction:
          'Never pay money to receive prize or grant money.',
        principle:
          'Upfront fee demands for incoming funds are always fraudulent.',
      },
      B: {
        mentorVoice:
          'Spot-on evaluation. You recognized the advance-fee structure instantly and took action to protect your community.',
        whyExplanation:
          'Real universities and foundations either award funds directly or automatically handle processing internally. Upfront fees are a dead giveaway of criminal fraud.',
        realisticOutcome:
          'Your bank balance stayed safe, and your report helped campus authorities shield vulnerable peers from financial theft.',
        clueInsight:
          'The urgency deadline (48 hours) was intended to panic you into paying before thinking critically.',
        saferAction:
          'Apply for scholarships exclusively through verified university financial aid portals (.edu).',
        principle:
          'Legitimate grants provide funds; they never solicit payments from recipients.',
      },
      C: {
        mentorVoice:
          'Asking scammers to deduct the fee makes logical sense, but scammers don\'t operate in good faith.',
        whyExplanation:
          'Since there is no actual $5,000 grant, they cannot deduct anything. Replying simply confirms to the fraudsters that you are interested and gullible.',
        realisticOutcome:
          'They double down with convincing official-looking certificates to overcome your hesitation.',
        clueInsight:
          'Scammers always refuse deduction requests because their only goal is extracting real cash.',
        saferAction:
          'Disengage completely without replying.',
        principle:
          'Do not negotiate with fraudulent entities.',
      },
      D: {
        mentorVoice:
          'While asking your bank is safe, it is an unnecessary expenditure of effort.',
        whyExplanation:
          'The premise alone—paying money to get grant money you never applied for—is 100% sufficient to discard the message.',
        realisticOutcome:
          'Your banker tells you what you already knew: it is a scam.',
        clueInsight:
          'Trust your critical thinking: advance-fee rules are universal.',
        saferAction:
          'Flag the message as spam and delete it immediately.',
        principle:
          'Develop confidence in recognizing fundamental scam mechanics.',
      },
    },
  },

  // 25 — Account Recovery Alert
  {
    id: 'scenario-25',
    number: 25,
    code: 'OPS-25',
    title: 'The Ghost Recovery Information Change',
    category: 'account-security',
    categoryLabel: 'Account Takeover Detection & Recovery Lockdown',
    difficulty: 'Level 4 — Respond',
    environment: 'office',
    environmentTitle: 'Department Computer Lab',
    context: 'While working in the lab, a system notification pops up from your primary email service.',
    situation:
      'An official security alert states: "Your account recovery phone number was changed to +44 7911 123456 (United Kingdom). If this was you, you can safely ignore this alert. If you did NOT make this change, an unauthorized user has gained access to your account." You did not make this change, and you have never lived in the United Kingdom.',
    participant: {
      name: 'Alex Chen',
      role: 'IT Support Apprentice',
      avatarType: 'it-technician',
    },
    dialogue: [
      'Did you just see that notification on your screen?',
      'Someone changed your account recovery number to a foreign country.',
      'An attacker is locking you out of your account right now. You need to act this second!',
    ],
    artifact: {
      type: 'login-alert',
      title: 'Security Center Event Audit',
      subtitle: 'Provider: Google / Microsoft Account Security',
      metadata: {
        Event: 'Recovery Phone Modified',
        'New Value': '+44 7911 123456 (United Kingdom)',
        'Session IP': '185.220.101.5 (Known Tor Exit Node)',
        Status: 'Active Session Authenticated',
      },
      contentPreview:
        'SECURITY ALERT:\n\nRecovery credentials were updated on your account.\nNew Phone: +44 7911 ••••••\nTime: 14:02:11 UTC\n\nIf this was not you, someone else has your password and is preparing to reset all access keys.',
      clueCallout:
        'When an attacker breaches an account, their immediate next step is changing the recovery phone or email to their own. This allows them to trigger a password reset that you cannot reverse. Immediate intervention is required.',
      tags: ['Account Takeover', 'Incident Response', 'Session Revocation'],
    },
    options: [
      {
        id: 'A',
        label: 'Assume it is an automated server glitch and wait to see if it fixes itself by tomorrow.',
        description:
          'Do nothing and wait 24 hours to see if your normal phone number reappears.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'Within 10 minutes, the attacker changes your password, terminates your active session, and enables their own hardware security key. You are permanently locked out of your account.',
        clueContext:
          'You ignored an active, authenticated security takeover event.',
        saferAction: 'Take immediate remediation steps upon seeing unauthorized recovery changes.',
      },
      {
        id: 'B',
        label: 'Log in from your trusted device, revert the phone number, revoke all sessions, and update your password.',
        description:
          'Immediately navigate to security settings, remove the unauthorized number, terminate all other active sessions, and set a new strong password with app-based MFA.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'You sever the attacker’s active session, restore your own recovery number, and lock out the adversary before they can change your password.',
        clueContext:
          'You intervened during the critical window between credential change and session lockout.',
      },
      {
        id: 'C',
        label: 'Reply directly to the automated security alert email asking who authorized the change.',
        description:
          'Send a reply to no-reply@accounts.google.com explaining that you did not make the change.',
        classification: 'risky',
        riskAssessment: 'HIGH',
        consequence:
          'The email bounces because automated security alerts come from unmonitored mailboxes, wasting critical minutes while the attacker finalizes their takeover.',
        clueContext:
          'Automated security alerts do not accept incoming email responses.',
        saferAction: 'Use the official web interface to manage security settings directly.',
      },
      {
        id: 'D',
        label: 'Immediately abandon the account and create a completely new email address.',
        description:
          'Give up on the compromised account and register a fresh mailbox.',
        classification: 'risky',
        riskAssessment: 'HIGH',
        consequence:
          'The attacker now possesses all your existing emails, tax forms, private messages, and can reset passwords on every service tied to that mailbox.',
        clueContext:
          'Abandoning an active primary mailbox leaves all linked accounts exposed.',
        saferAction: 'Remediate and recover the account immediately.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'When an account alert indicates recovery information changed without your knowledge, treat it as an active takeover. Revert the changes, terminate all active sessions, and reset credentials immediately.',
    learningObjective:
      'Execute emergency account recovery procedures during an active unauthorized modification event.',
    deterministicFeedback: {
      A: {
        mentorVoice:
          'Security alerts about recovery details are never glitches.',
        whyExplanation:
          'When an attacker acquires your password, changing the recovery phone is their top priority so they can lock you out permanently. Waiting until tomorrow guarantees you lose the account forever.',
        realisticOutcome:
          'You lose total control of your email, cloud backups, and connected accounts.',
        clueInsight:
          'The IP address was an overseas Tor exit node—proof of an active hostile session.',
        saferAction:
          'Treat unauthorized security changes as code-red emergencies.',
        principle:
          'Act instantly when recovery credentials are modified unexpectedly.',
      },
      B: {
        mentorVoice:
          'Outstanding crisis response! You acted decisively during the attacker’s window of vulnerability.',
        whyExplanation:
          'Because your current session was still active, you were able to undo their changes, boot the attacker off via global session revocation, and seal the breach with a new password.',
        realisticOutcome:
          'The attacker was booted instantly, your recovery channels were restored, and your account is secure.',
        clueInsight:
          'The "Sign out of all other sessions" button is your strongest weapon during an account takeover attempt.',
        saferAction:
          'Audit your recent account activity log to see what the intruder may have accessed.',
        principle:
          'Immediate session revocation neutralizes active intruder access.',
      },
      C: {
        mentorVoice:
          'Replying to automated system alerts is a dead end.',
        whyExplanation:
          'Alerts are sent from automated no-reply servers. No human reads replies to those messages.',
        realisticOutcome:
          'While you wait for an email reply that will never come, the attacker changes your master password.',
        clueInsight:
          'Never communicate via email when you can interact directly with the account portal.',
        saferAction:
          'Navigate directly to your account settings in your browser.',
        principle:
          'Do not rely on passive email replies during an active incident.',
      },
      D: {
        mentorVoice:
          'Abandoning your primary email leaves your entire digital life in enemy hands.',
        whyExplanation:
          'Your email account is the master key to everything: bank accounts, social media, shopping profiles, and university portals. Leaving it to an attacker allows them to take over everything else.',
        realisticOutcome:
          'The attacker resets passwords across all your connected services using your abandoned email.',
        clueInsight:
          'Your primary email is the root of your digital trust hierarchy.',
        saferAction:
          'Fight for account recovery rather than abandoning root credentials.',
        principle:
          'Protect the root identity that underpins all secondary services.',
      },
    },
  },

  // 26 — Shared Computer / Public Terminal
  {
    id: 'scenario-26',
    number: 26,
    code: 'OPS-26',
    title: 'The Public Library Workstation Departure',
    category: 'account-security',
    categoryLabel: 'Public Kiosk Security & Session Persistence',
    difficulty: 'Level 1 — Recognize',
    environment: 'library',
    environmentTitle: 'City Central Library Kiosk',
    context: 'You use a public computer workstation at the public library to print tickets.',
    situation:
      'You just finished printing your travel itinerary and submitting an assignment through your university portal. Your bus arrives outside in 2 minutes. On the computer screen, your email, university portal, and cloud drive are still open in three browser tabs. Earlier, the browser prompted "Remember password for this device?", which you dismissed by clicking the small X.',
    participant: {
      name: 'Sara Miller',
      role: 'Library Desk Attendant',
      avatarType: 'lab-proctor',
    },
    dialogue: [
      'The library is closing in five minutes!',
      'Make sure you don’t leave anything on the public computers.',
      'Did you remember to sign out of your sessions?',
    ],
    artifact: {
      type: 'login-alert',
      title: 'Public Terminal Session Telemetry',
      subtitle: 'Machine: Terminal #14 (Shared Windows Kiosk)',
      metadata: {
        'Active Sessions': '3 Authenticated Web Accounts',
        'Session Cookies': 'Valid for 14 days (Unless explicitly revoked)',
        'Local Storage': 'Cached PDF files in Downloads folder',
        'Next User': 'Patron waiting behind your chair',
      },
      contentPreview:
        'TERMINAL STATE:\n• Chrome Browser: 3 Open Authenticated Tabs\n• Downloads: travel_itinerary_and_ssn.pdf\n• Session Tokens: Active in Memory\n\nRisk: Simply closing tabs does NOT terminate authentication cookies on shared machines.',
      clueCallout:
        'Closing the browser window or turning off the monitor does NOT log you out. Session tokens remain in browser memory, allowing the next patron who opens the browser to access your personal accounts without typing any password.',
      tags: ['Public Kiosk', 'Session Security', 'Cookie Persistence'],
    },
    options: [
      {
        id: 'A',
        label: 'Turn off the monitor and hurry out to catch your bus.',
        description:
          'Power off the computer display screen, assuming turning off the monitor secures the machine.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The next user sits down, turns the monitor on, and has immediate, unrestricted access to your email, university records, and personal files.',
        clueContext:
          'A monitor is just an output display; the computer continues running all sessions behind it.',
        saferAction: 'Log out explicitly and restart or log off the computer.',
      },
      {
        id: 'B',
        label: 'Explicitly sign out of each account, clear browser history/cookies, and log off the machine.',
        description:
          'Spend 60 seconds clicking "Sign Out" on each service, clearing browsing data, and selecting Windows Log Off.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'All session cookies are invalidated on the server, local cache is purged, and the computer resets cleanly for the next patron. You catch your bus safely.',
        clueContext:
          'You terminated the cryptographic session state at the server and client levels.',
      },
      {
        id: 'C',
        label: 'Close all browser tabs by clicking the red X and leave the desktop running.',
        description:
          'Close the browser program, trusting that closing tabs ends your authenticated session.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'When the next person launches the browser and presses Ctrl+Shift+T or clicks "Restore Tabs," your email and portal reopen fully authenticated.',
        clueContext:
          'Modern browsers restore previous sessions and maintain persistent session cookies.',
        saferAction: 'Always click the explicit Sign Out button.',
      },
      {
        id: 'D',
        label: 'Delete the downloaded PDF from the desktop without signing out of web accounts.',
        description:
          'Remove the printed file from the recycle bin while leaving active web browser tabs logged in.',
        classification: 'risky',
        riskAssessment: 'HIGH',
        consequence:
          'Deleting the local file removes one document, but leaves your entire live cloud drive and email account accessible to anyone.',
        clueContext:
          'Local file cleanup does nothing to revoke active cloud session tokens.',
        saferAction: 'Sign out of web services first.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Closing a browser window does not end your session. On shared or public terminals, you must explicitly log out, clear cookies, and log off the workstation.',
    learningObjective:
      'Practice proper shared terminal hygiene to prevent session hijacking on public kiosks.',
    deterministicFeedback: {
      A: {
        mentorVoice:
          'Turning off the monitor does not turn off the computer.',
        whyExplanation:
          'The display is just a screen. The operating system, browser, and all your open accounts continue running in memory.',
        realisticOutcome:
          'The person sitting behind you taps the power button on the monitor and browses your private emails immediately.',
        clueInsight:
          'Never confuse display hardware with computing state.',
        saferAction:
          'Always click "Log Off" on the operating system.',
        principle:
          'Physical displays do not govern cryptographic session lifecycles.',
      },
      B: {
        mentorVoice:
          'Flawless operational discipline. Taking one minute to log out properly protects weeks of work.',
        whyExplanation:
          'Clicking "Sign Out" instructs the server to destroy your session token, ensuring nobody can reuse it even if they try to restore tabs.',
        realisticOutcome:
          'Your data was left completely inaccessible, and the terminal was clean for the next patron.',
        clueInsight:
          'Logging off the workstation also purges temporary session caches.',
        saferAction:
          'When using public computers, prefer using Incognito mode from the very start.',
        principle:
          'Explicit termination is the only guarantee of session closure.',
      },
      C: {
        mentorVoice:
          'Clicking the red X is not the same as logging out.',
        whyExplanation:
          'Modern browsers remember tabs. Clicking "Restore Tabs" or re-navigating to the website reuses existing session cookies stored on the hard drive.',
        realisticOutcome:
          'The next student opens Chrome, clicks "History -> Recently Closed", and reopens your student account.',
        clueInsight:
          'Web authentication tokens persist until explicitly revoked or expired.',
        saferAction:
          'Click your profile avatar and select "Log Out" on every service.',
        principle:
          'Session tokens outlive application window closures.',
      },
      D: {
        mentorVoice:
          'Deleting files is good, but leaving web sessions open completely undermines it.',
        whyExplanation:
          'The next user can simply open your active cloud drive or email tab and redownload the exact same file you just deleted.',
        realisticOutcome:
          'Your documents remain exposed through the active web session.',
        clueInsight:
          'The browser is the gateway to all cloud storage.',
        saferAction:
          'Revoke web sessions before worrying about local desktop icons.',
        principle:
          'Prioritize identity session termination over cosmetic desktop cleanup.',
      },
    },
  },

  // 27 — Unknown Bluetooth Device
  {
    id: 'scenario-27',
    number: 27,
    code: 'OPS-27',
    title: 'The Persistent Bluetooth Handshake',
    category: 'hardware',
    categoryLabel: 'Bluetooth Exploitation (Bluebugging) & Wireless Reconnaissance',
    difficulty: 'Level 3 — Decide',
    environment: 'cafe',
    environmentTitle: 'Crowded Metro Commuter Train',
    context: 'You are commuting on a packed morning subway car with your smartphone in hand.',
    situation:
      'Within three minutes, your phone screen interrupts you with three unexpected pairing prompts: 1. "Pair with \'JBL-SoundPulse-92\'? Enter PIN 0000 to connect.", 2. "Pair with \'OBD2-Vehicle-Scanner\'?", 3. "Accept file transfer from \'Unknown_Device_X8\'?". You do not own any of these devices and you are standing shoulder-to-shoulder with 50 commuters.',
    participant: {
      name: 'Leo Martinez',
      role: 'Cybersecurity Student',
      avatarType: 'student-casual',
    },
    dialogue: [
      'Is your phone blowing up with Bluetooth requests too?',
      'Someone in this subway car is running an automated Bluetooth pairing tool.',
      'Don’t tap accept—they are trying to trigger an automated exploit or pull contacts.',
    ],
    artifact: {
      type: 'wifi-scanner',
      title: 'Wireless Spectrum Telemetry',
      subtitle: 'Interface: Bluetooth 5.2 (Broadcasting: Discoverable)',
      metadata: {
        'Signal Strength': '-44 dBm (Proximity < 2 meters)',
        'Incoming Packets': 'Continuous L2CAP Connection Requests',
        'Device Mode': 'Discoverable to All Nearby Devices',
        'Target Action': 'Automated Bluebugging / PBAP Contact Book Access',
      },
      contentPreview:
        'WIRELESS ALERT // BLE FLOODING DETECTED\n\nIncoming Connection:\nTarget: Phone Audio & Contact Sync\nSource MAC: AA:BB:CC:33:44:55 (Spoofed)\n\nRisk: Accepting pairing allows external hardware to execute AT commands, read contacts, and bridge audio.',
      clueCallout:
        'Attackers in crowded public transit use automated tools (like Flipper Zero or specialized Bluetooth scripts) to spam pairing requests. Tapping "Confirm" grants the attacker access to your address book, call logs, or audio streaming.',
      tags: ['Bluetooth Attacks', 'Bluebugging', 'Wireless Hygiene'],
    },
    options: [
      {
        id: 'A',
        label: 'Tap "Confirm" on the pairing prompt so the popups stop interrupting your screen.',
        description:
          'Accept the connection just to clear the annoying modal from your phone display.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The malicious Bluetooth device immediately syncs your entire phone contact list, reads recent SMS messages, and routes your phone audio to the attacker.',
        clueContext:
          'You authorized an unknown physical device to bridge with your handset.',
        saferAction: 'Never accept unsolicited Bluetooth pairing requests.',
      },
      {
        id: 'B',
        label: 'Turn off Bluetooth completely and set your device to non-discoverable.',
        description:
          'Disable Bluetooth in quick settings while in crowded transit to immediately eliminate the wireless attack surface.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Your wireless radio stops responding to external probes. The attacker’s automated tool skips your device, and your phone remains completely secure.',
        clueContext:
          'You shut down the transmission medium to eliminate the threat entirely.',
      },
      {
        id: 'C',
        label: 'Tap "Cancel" every time the popup appears without changing your Bluetooth settings.',
        description:
          'Keep dismissing each popup manually while leaving your Bluetooth discoverable.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'The script continues spamming pairing requests every 5 seconds, draining your battery and risking an accidental "Accept" tap while jostling in the crowd.',
        clueContext:
          'Passive rejection does not stop automated continuous radio flooding.',
        saferAction: 'Disable the radio interface.',
      },
      {
        id: 'D',
        label: 'Turn your screen brightness to maximum thinking it dazzles wireless sensors.',
        description:
          'Alter screen brightness to repel wireless signals.',
        classification: 'risky',
        riskAssessment: 'HIGH',
        consequence:
          'Display brightness has zero interaction with 2.4 GHz radio frequency transmissions.',
        clueContext:
          'Optical screen output is irrelevant to RF protocols.',
        saferAction: 'Manage radio toggles directly.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Disable Bluetooth and Wi-Fi in dense, crowded public spaces when not actively in use. Never accept unsolicited wireless pairing or file transfer requests.',
    learningObjective:
      'Understand Bluetooth exploitation techniques (bluebugging, pairing spam) and apply proactive wireless radio management.',
    deterministicFeedback: {
      A: {
        mentorVoice:
          'Never tap "Accept" just to make an alert go away.',
        whyExplanation:
          'Accepting a Bluetooth pairing handshake establishes a trusted link key. Attackers use this to download your contact book (PBAP profile) and intercept text messages.',
        realisticOutcome:
          'The stranger in the train car downloads your private contacts and messages in under 15 seconds.',
        clueInsight:
          'Pairing requests require mutual consent—rejecting or disabling Bluetooth halts the attack instantly.',
        saferAction:
          'Keep Bluetooth turned off when traveling through public spaces.',
        principle:
          'Never authorize unfamiliar hardware into your personal network.',
      },
      B: {
        mentorVoice:
          'Decisive and tactical. You eliminated the entire attack vector with one swipe.',
        whyExplanation:
          'Turning off Bluetooth disconnects your radio from the 2.4 GHz spectrum. When the receiver is powered off, zero exploits can reach your operating system.',
        realisticOutcome:
          'The pairing spam stopped immediately, saving your battery and keeping your device invisible to surrounding scanners.',
        clueInsight:
          'Setting your device to "Non-Discoverable" also stops passive reconnaissance.',
        saferAction:
          'Turn Bluetooth back on only when you are in a secure private location.',
        principle:
          'Reduce your wireless attack surface when in hostile or crowded environments.',
      },
      C: {
        mentorVoice:
          'Playing whack-a-mole with automated scripts is a losing battle.',
        whyExplanation:
          'Automated tools like Flipper Zero can blast hundreds of pairing requests per minute. One accidental bump in a crowded train could cause your finger to tap "Accept".',
        realisticOutcome:
          'Your screen stays unusable and you risk accidental authorization.',
        clueInsight:
          'Automated attacks require architectural defense, not manual clicking.',
        saferAction:
          'Turn off the Bluetooth radio toggle directly.',
        principle:
          'Disable the vulnerable interface instead of repeatedly rejecting requests.',
      },
      D: {
        mentorVoice:
          'Screen brightness has nothing to do with radio frequency signals.',
        whyExplanation:
          'Bluetooth operates on electromagnetic radio waves (2.4 GHz). Visible light from your display does not affect wireless data transmission.',
        realisticOutcome:
          'You drain your battery while the Bluetooth pairing spam continues uninterrupted.',
        clueInsight:
          'Radio waves pass straight through phone glass regardless of brightness.',
        saferAction:
          'Use the Bluetooth toggle in quick settings.',
        principle:
          'Apply controls that match the physical medium of the threat.',
      },
    },
  },

  // 28 — Fake Authority Message / Dean's Credential Audit
  {
    id: 'scenario-28',
    number: 28,
    code: 'OPS-28',
    title: 'The Executive Impersonation Audit Demand',
    category: 'social-engineering',
    categoryLabel: 'Authority Exploitation & Whaling Defense',
    difficulty: 'Level 4 — Respond',
    environment: 'office',
    environmentTitle: 'University Administration Wing',
    context: 'You work part-time as a student research assistant managing lab database backups.',
    situation:
      'An email marked [CONFIDENTIAL — IMMEDIATE MANDATORY COMPLIANCE] arrives from "Office of the Dean <dean.office@exec-university-audit.com>": "In accordance with federal compliance audit #FA-881, all student administrators are required to reply with their database root credentials and current active two-factor backup codes before 17:00 today. Failure to comply will be referred to academic integrity review for immediate suspension."',
    participant: {
      name: 'Dr. Arthur Sterling',
      role: 'Faculty Department Head',
      avatarType: 'professor',
    },
    dialogue: [
      'Did you see this audit email from the Dean’s office?',
      'It says we will be suspended if we don’t send our database passwords and 2FA backup codes before 5 PM!',
      'Look at that external domain name though: "exec-university-audit.com". That is not our campus domain!',
    ],
    artifact: {
      type: 'email',
      title: 'Incoming High-Urgency Executive Memo',
      subtitle: 'From: dean.office@exec-university-audit.com',
      metadata: {
        Sender: 'dean.office@exec-university-audit.com (External Lookalike Domain)',
        'True Campus Domain': 'university.edu',
        Authentication: 'SPF: Softfail, DKIM: None, DMARC: Action Quarantine',
        Tactics: 'Authority Intimidation, Time Crunch, Disciplinary Threats',
      },
      contentPreview:
        'OFFICIAL AUDIT DIRECTIVE // IMMEDIATE EXECUTION\n\nTo: Lab Administrators\nFrom: Executive Dean’s Office\n\nReply directly with:\n1. Server Root Username\n2. Master Password\n3. Unused 2FA Backup Scratch Codes\n\nNon-compliance deadline: 17:00 EST.\nPunishment: Immediate Academic Dismissal.',
      clueCallout:
        'Legitimate university executives, IT auditors, and deans will NEVER ask for passwords or two-factor backup codes via email. The domain "@exec-university-audit.com" is an external spoofed domain, and threats of academic suspension are textbook intimidation psychology.',
      tags: ['Whaling', 'Authority Bias', 'Social Engineering'],
    },
    options: [
      {
        id: 'A',
        label: 'Reply with your lab database password and 2FA codes to avoid suspension.',
        description:
          'Comply with the Dean’s directive to protect your academic standing and avoid disciplinary review.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'Attackers use your credentials to download sensitive student research records and plant ransomware on the university server, causing an institutional breach.',
        clueContext:
          'You surrendered root credentials due to intimidation and authority bias.',
        saferAction: 'Never send passwords or 2FA codes via email to anyone.',
      },
      {
        id: 'B',
        label: 'Recognize the spoofed domain, refuse to share credentials, and report the email to IT Security.',
        description:
          'Identify that legitimate administrators never request credentials, verify the external domain, and forward the headers to security@university.edu.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'IT security blocks the fraudulent domain campus-wide. The Dean confirms they never sent the email, and your prompt reporting protects the lab.',
        clueContext:
          'You verified policy, spotted the lookalike domain, and followed institutional reporting procedures.',
      },
      {
        id: 'C',
        label: 'Reply with an intentionally wrong password to see if the Dean notices.',
        description:
          'Send a fake password to test whether the auditor is actually validating credentials.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'The attackers realize you are playing games and launch targeted phishing attacks against your other accounts or escalate to your supervisor.',
        clueContext:
          'Trolling attackers alerts them that their target is actively monitoring the thread.',
        saferAction: 'Report through official channels without replying.',
      },
      {
        id: 'D',
        label: 'Forward the email to your personal Gmail account so you have a copy off campus.',
        description:
          'Send the email to personal mail in case your campus account gets suspended.',
        classification: 'risky',
        riskAssessment: 'LOW',
        consequence:
          'Forwarding the email does nothing to resolve the threat or report the external domain.',
        clueContext:
          'Personal archiving does not fulfill administrative incident response obligations.',
        saferAction: 'Escalate directly to your campus Security Operations Center.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'No legitimate administrator or auditor will ever ask for your password or two-factor codes. High-pressure intimidation by claimed authority is a classic social engineering signal.',
    learningObjective:
      'Identify and neutralize authority-based whaling attacks demanding administrative credentials and 2FA secrets.',
    deterministicFeedback: {
      A: {
        mentorVoice:
          'Authority intimidation is the most potent weapon in social engineering.',
        whyExplanation:
          'The scammer impersonated the Dean and threatened academic suspension specifically to override your critical thinking. No genuine administrator ever asks for passwords or 2FA codes.',
        realisticOutcome:
          'The university database is compromised, research data is held for ransom, and your credentials are traceably responsible for the breach.',
        clueInsight:
          'The domain was "@exec-university-audit.com", not your actual campus domain "@university.edu".',
        saferAction:
          'Policy prohibits sharing credentials with anyone under any circumstances.',
        principle:
          'Authority never trumps cryptographic and operational security policy.',
      },
      B: {
        mentorVoice:
          'Impeccable courage and judgment. You stood firm on security policy despite aggressive intimidation.',
        whyExplanation:
          'By inspecting the sender domain and recognizing that credentials are never transmitted via email, you prevented a full-scale institutional breach.',
        realisticOutcome:
          'Campus IT blacklisted the attacker’s domain within 15 minutes, safeguarding thousands of student records.',
        clueInsight:
          'Real audits use programmatic key vaults or in-person verification—never plain email text.',
        saferAction:
          'Always verify high-stakes executive directives via an internal phone directory or in-person check.',
        principle:
          'Authentication secrets must never be disclosed to anyone, regardless of their claimed rank.',
      },
      C: {
        mentorVoice:
          'Do not play games with cybercriminals.',
        whyExplanation:
          'Replying with fake passwords confirms that an active student administrator is reading the emails. The attackers will redouble their efforts using spear-phishing or phone calls.',
        realisticOutcome:
          'You invite personalized attacks against yourself and your lab colleagues.',
        clueInsight:
          'Professional incident response focuses on containment and reporting, not engagement.',
        saferAction:
          'Forward the email directly to your campus SOC and block the sender.',
        principle:
          'Contain and report threats through designated channels without replying.',
      },
      D: {
        mentorVoice:
          'Forwarding to personal mail is an unnecessary distraction.',
        whyExplanation:
          'Your personal email cannot stop the threat from targeting other student workers in the department.',
        realisticOutcome:
          'Other research assistants may fall for the scam while you archive emails on your personal account.',
        clueInsight:
          'Institutional security relies on swift centralized reporting.',
        saferAction:
          'Notify your supervisor and campus IT security immediately.',
        principle:
          'Collective defense requires rapid incident escalation.',
      },
    },
  },
];
