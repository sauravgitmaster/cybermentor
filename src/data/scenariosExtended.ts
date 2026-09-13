import { Scenario } from '../types/scenario';

export const EXTENDED_SCENARIOS: Scenario[] = [
  // 11 — Friend Requests a Verification Code (OTP Hijacking)
  {
    id: 'scenario-11',
    number: 11,
    code: 'OPS-11',
    title: "The Friend's Emergency Verification Code",
    category: 'account-security',
    categoryLabel: 'Account Takeover & OTP Security',
    difficulty: 'Level 2 — Investigate',
    environment: 'dorm',
    environmentTitle: 'Student Residence Hall — Room 3B',
    context: 'You are studying in your dorm room when an urgent message pops up on your phone.',
    situation:
      'A direct message arrives from your close classmate Alex on Instagram: "Hey! My phone battery died and I am locked out of my account. I added you as a trusted recovery contact. A 6-digit code was just sent to your SMS. Can you send it to me right now so I do not lose my project files?" Moments later, an SMS from your own email provider arrives: "Use code 491-082 to reset your password. NEVER share this code with anyone."',
    participant: {
      name: 'Alex Chen',
      role: 'Dorm Neighbor & Classmate',
      avatarType: 'dorm-roommate',
    },
    dialogue: [
      'Hey, are you at your desk? It is an emergency!',
      'I am locked out of my account and my presentation is in 20 minutes.',
      'Did you get the 6-digit SMS code? Send it over quickly, please!',
    ],
    artifact: {
      type: 'mfa-alert',
      title: 'Incoming SMS Alert & Chat Message',
      subtitle: 'Dispatch: Shortcode 22000 (Account Recovery Service)',
      metadata: {
        'Chat Origin': 'Instagram DM (Alex Chen)',
        'Incoming SMS Sender': '22000 (Google Security / Microsoft)',
        'SMS Content': 'Use code 491-082 to reset YOUR password. Do not share.',
        Timestamp: 'Just now (14:32 EST)',
      },
      contentPreview:
        'ALERT: A password reset request was initiated for YOUR account.\n\nYour one-time verification code is:\n[ 491 - 082 ]\n\nSecurity Notice: Employees and friends will NEVER ask for this code.',
      clueCallout:
        'The SMS verification code was generated for YOUR account recovery, not your friend’s. The attacker has taken over Alex’s account and is trying to compromise yours next.',
      tags: ['OTP Theft', 'Account Takeover', 'Social Engineering'],
    },
    options: [
      {
        id: 'A',
        label: 'Send the 6-digit code to Alex immediately since they are a trusted friend.',
        description:
          'Copy the digits from your SMS message and paste them into the chat so Alex can regain access to their account.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The attacker uses your one-time code to reset your password, instantly locking you out of your primary email and connected accounts.',
        clueContext:
          'You trusted the friend’s display name without realizing the code was for your own account recovery.',
        saferAction: 'Never share security codes under any circumstances.',
      },
      {
        id: 'B',
        label: 'Refuse to share the code, verify with Alex in person, and secure your account.',
        description:
          'Recognize that legitimate recovery codes are never routed to someone else’s phone, decline in chat, and call or speak with Alex directly.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Alex confirms their Instagram account was hijacked 20 minutes ago. Your quick refusal prevents your own account from being breached.',
        clueContext:
          'You noticed the SMS was explicitly for your personal account and applied out-of-band verification.',
      },
      {
        id: 'C',
        label: 'Post in your dorm group chat asking if anyone knows why Alex needs your code.',
        description:
          'Ask your mutual friends in a public group chat whether Alex really lost access to their phone.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'While you did not give away the code, the delay gives the attacker time to target other students on Alex’s contact list.',
        clueContext:
          'Crowdsourcing takes too long and fails to take immediate protective action.',
        saferAction: 'Directly verify with the friend via phone call or in-person check.',
      },
      {
        id: 'D',
        label: 'Change your phone number in your account settings right away.',
        description:
          'Attempt to update your telephone number on file to prevent further SMS messages from arriving.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'Changing your phone number does not address the fact that the attacker already has your username/password and initiated a reset.',
        clueContext:
          'The issue is credential leakage, not your phone number itself.',
        saferAction: 'Update your password and revoke active sessions.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Never share one-time passcodes (OTPs) with anyone—even friends. Services never route a user’s recovery code to someone else’s phone.',
    learningObjective:
      'Identify compromised friend accounts attempting to steal password reset OTP codes.',
    deterministicFeedback: {
      A: {
        mentorVoice:
          'That was an account takeover trap. When an attacker compromises someone’s social account, their next move is tricking contacts into handing over their own OTP codes.',
        whyExplanation:
          'The SMS explicitly said "Use this code to reset YOUR password." Legitimate security systems never send one person’s verification code to another user’s device.',
        realisticOutcome:
          'Your account password would have been changed by the attacker within seconds, locking you out.',
        clueInsight:
          'Look at the SMS text itself: it warns "NEVER share this code." That warning exists specifically to stop this attack.',
        saferAction:
          'Never forward, read aloud, or paste one-time codes to anyone who requests them.',
        principle:
          'OTPs are private security keys meant exclusively for the device owner.',
      },
      B: {
        mentorVoice:
          'Outstanding judgment. You spotted that the code was for your own account and recognized a classic account takeover relay.',
        whyExplanation:
          'By refusing to relay the code and checking with Alex through an independent channel, you broke the attack chain and alerted your friend.',
        realisticOutcome:
          'Your account remained completely secure, and Alex was able to initiate recovery for their compromised account.',
        clueInsight:
          'The crucial clue was that the incoming SMS came from your email service, not Alex’s.',
        saferAction:
          'Continue practicing out-of-band verification whenever contacts make strange requests.',
        principle:
          'Always verify identity independently when urgent or out-of-character requests occur.',
      },
      C: {
        mentorVoice:
          'You avoided immediate disaster by not giving the code, but discussing it publicly in group chats is an inefficient defense.',
        whyExplanation:
          'While waiting for group chat replies, the attacker is actively messaging other contacts on Alex’s list who might fall for it.',
        realisticOutcome:
          'You kept your code, but classmates who saw Alex’s direct messages fell victim to the scam.',
        clueInsight:
          'Direct action is faster: call the person directly on their phone number or meet them in the hall.',
        saferAction:
          'Reach out directly to the affected person and advise others to ignore messages from the compromised handle.',
        principle:
          'Fast, direct verification stops social engineering attacks before they spread.',
      },
      D: {
        mentorVoice:
          'Changing your phone number misses the real threat vector.',
        whyExplanation:
          'The attacker already entered your email or username to trigger the reset. The phone number is your defense layer, not the vulnerability.',
        realisticOutcome:
          'You waste time altering profile settings while your password might still be known to the attacker.',
        clueInsight:
          'The trigger was an unauthorized password reset attempt using your existing credentials.',
        saferAction:
          'Change your password immediately and review active sessions.',
        principle:
          'Treat unauthorized OTP prompts as a signal to update your primary password.',
      },
    },
  },

  // 12 — Fake Delivery Message (Smishing)
  {
    id: 'scenario-12',
    number: 12,
    code: 'OPS-12',
    title: 'The Missed Express Package',
    category: 'phishing',
    categoryLabel: 'SMS Phishing (Smishing) & Fraudulent URLs',
    difficulty: 'Level 1 — Recognize',
    environment: 'cafe',
    environmentTitle: 'Campus Plaza Cafe',
    context: 'You are having lunch with a study partner when your phone buzzes with a delivery text.',
    situation:
      'You receive an SMS from +1 (440) 592-1104 stating: "USPS Notice: Parcel #US-9921-K could not be delivered due to an incomplete street address. Please confirm your residence within 12 hours to prevent return to sender: http://usps-post-redelivery77.top/track". You recently ordered a textbook online that you need for class next week.',
    participant: {
      name: 'Mia Tanaka',
      role: 'Study Partner',
      avatarType: 'student-casual',
    },
    dialogue: [
      'Did your textbook arrive yet? We need chapter 4 for tomorrow.',
      'Wait, you just got a package notification? What does it say?',
      'Careful—I heard people have been getting fake postal texts lately.',
    ],
    artifact: {
      type: 'chat-message',
      title: 'Incoming SMS Text Message',
      subtitle: 'Client: Default Messaging App',
      metadata: {
        Sender: '+1 (440) 592-1104 (Unknown Local Number)',
        Subject: 'USPS Delivery Failure Notification',
        URL: 'http://usps-post-redelivery77.top/track',
        Urgency: '12-hour expiration warning',
      },
      contentPreview:
        'USPS Alert: Package #US-9921-K paused at regional sorting hub.\n\nAddress verification required:\nhttp://usps-post-redelivery77.top/track\n\nA $1.50 redelivery fee applies.',
      clueCallout:
        'Official postal carriers do not dispatch texts from random 10-digit mobile numbers, nor do they use .top top-level domains. Legitimate USPS URLs end in .com.',
      tags: ['Smishing', 'Package Scam', 'Urgency Trap'],
    },
    options: [
      {
        id: 'A',
        label: 'Click the link and pay the $1.50 redelivery fee so your book arrives.',
        description:
          'Open the webpage on your phone, fill in your address, and enter your credit card number for the small fee.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The link leads to a phishing site that steals your full name, home address, and credit card number, leading to unauthorized charges.',
        clueContext:
          'You let the fear of missing your textbook override your suspicion of the strange URL.',
        saferAction: 'Never enter payment or personal details on unverified text links.',
      },
      {
        id: 'B',
        label: 'Reply "STOP" to the message to see if it is an automated delivery system.',
        description:
          'Send a text reply to test if an automated service responds or removes your number.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'Replying confirms to spammers that your phone number is active and monitored, causing a spike in spam calls and phishing texts.',
        clueContext:
          'Replying to smishing numbers validates your contact info in scammer lead databases.',
        saferAction: 'Block the sender without replying.',
      },
      {
        id: 'C',
        label: 'Check your order status on the official retailer website and report the text.',
        description:
          'Log in directly to the store where you bought the book to check real tracking, and flag the SMS as spam.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Your retailer account shows your book is actually on schedule for delivery tomorrow. You report the smishing text to 7726 (SPAM).',
        clueContext:
          'You bypassed the lure and checked the authoritative source directly.',
      },
      {
        id: 'D',
        label: 'Forward the message to Mia so she can check if her book had the same notice.',
        description:
          'Share the text message link with your classmate to compare tracking updates.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'Mia clicks the link out of curiosity, exposing her device to the deceptive form.',
        clueContext:
          'Forwarding active phishing links risks compromising your peers.',
        saferAction: 'Never distribute unverified links to classmates.',
      },
    ],
    bestOptionId: 'C',
    securityPrinciple:
      'Verify delivery alerts directly on the merchant’s official portal. Never click tracking links in unsolicited SMS messages.',
    learningObjective:
      'Recognize postal smishing attacks that exploit real-world delivery expectations.',
    deterministicFeedback: {
      A: {
        mentorVoice:
          'That small $1.50 fee is the hook. Scammers use tiny charges to steal full credit card details and identity data.',
        whyExplanation:
          'The URL "usps-post-redelivery77.top" is not the official USPS portal (usps.com). Once you submit card details, recurring fraudulent charges follow.',
        realisticOutcome:
          'Your bank account would be drained, and your personal address added to identity theft databases.',
        clueInsight:
          'Notice the top-level domain: .top is commonly used in low-cost automated phishing campaigns.',
        saferAction:
          'Always check tracking inside the app or store where you made the purchase.',
        principle:
          'Authoritative sources are the only reliable way to check shipping status.',
      },
      B: {
        mentorVoice:
          'Replying to spam feels intuitive, but it backfires with scammers.',
        whyExplanation:
          'Automated scammers blast thousands of numbers. Replying confirms your number is answered by a real human, making it more valuable to sell.',
        realisticOutcome:
          'You will experience a sharp increase in scam calls, robocalls, and malicious texts.',
        clueInsight:
          'Legitimate shortcodes support STOP; random 10-digit VOIP numbers use replies as proof of life.',
        saferAction:
          'Use your phone’s built-in "Report Junk" or "Block Sender" feature instead.',
        principle:
          'Do not engage with unverified senders.',
      },
      C: {
        mentorVoice:
          'Classic defensive discipline. You ignored the bait and navigated directly to the verified source.',
        whyExplanation:
          'Checking the actual merchant website gave you the real status without exposing credentials or payment cards to rogue domains.',
        realisticOutcome:
          'You confirmed your book was safe, avoided credit card compromise, and helped carriers flag the scam number.',
        clueInsight:
          'Scammers rely on coincidence: thousands of people order items daily, so package texts always seem plausible.',
        saferAction:
          'Maintain this habit: never follow shipping links received via SMS.',
        principle:
          'Always verify through independent, trusted channels.',
      },
      D: {
        mentorVoice:
          'Sharing malicious links spreads the attack surface to your friends.',
        whyExplanation:
          'Even if you are cautious, your friend might click the link without thinking.',
        realisticOutcome:
          'Mia could have entered her credentials or payment information, creating an avoidable incident.',
        clueInsight:
          'If you want to ask a peer, describe the situation in words—never forward the live URL.',
        saferAction:
          'Delete or report the link rather than sharing it.',
        principle:
          'Contain threats by refusing to propagate suspicious links.',
      },
    },
  },

  // 13 — Password Reuse
  {
    id: 'scenario-13',
    number: 13,
    code: 'OPS-13',
    title: 'The Universal Master Password',
    category: 'passwords',
    categoryLabel: 'Credential Hygiene & Password Management',
    difficulty: 'Level 2 — Investigate',
    environment: 'library',
    environmentTitle: 'Library Study Carrel',
    context: 'You are creating an account on an obscure citation tool for a research paper.',
    situation:
      'The citation generator "FreeCiteMaker.net" requires an account to export references. You are tempted to use your favorite 14-character password: "Dragon$Fire2024!". It contains uppercase, lowercase, numbers, and symbols. However, this is the exact same password you use for your university portal, your personal email, and your cloud storage.',
    participant: {
      name: 'David Park',
      role: 'Lab Research Assistant',
      avatarType: 'fellow-researcher',
    },
    dialogue: [
      'Just making an account on this citation site?',
      'Don’t use the same password you use for student email.',
      'Small free sites get breached all the time, and hackers test those passwords everywhere.',
    ],
    artifact: {
      type: 'login-alert',
      title: 'Registration Form Analysis',
      subtitle: 'Target: freecitemaker.net/register',
      metadata: {
        'Encryption Level': 'HTTP (Unencrypted Submission)',
        'Site Reputation': 'Unknown / Newly Registered',
        'Password Suggestion': 'Dragon$Fire2024! (Used on 4 other platforms)',
      },
      contentPreview:
        'Create Free Account:\nEmail: student@university.edu\nPassword: ••••••••••••••••\n\nSecurity Warning: If this site suffers a data leak, attackers use automated credential stuffing to unlock your other accounts.',
      clueCallout:
        'A complex password offers zero protection if the website storing it gets breached. Reusing credentials turns one small leak into a catastrophic multi-account takeover.',
      tags: ['Credential Stuffing', 'Password Reuse', 'Data Breaches'],
    },
    options: [
      {
        id: 'A',
        label: 'Use your favorite password because it is 14 characters long and complex.',
        description:
          'Trust that the complexity of your password makes it safe to use across all your online accounts.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'Six months later, FreeCiteMaker’s unhashed database leaks online. Attackers test your email and password across Gmail and your student portal, taking control of both.',
        clueContext:
          'Complexity cannot protect against a server-side database leak.',
        saferAction: 'Never reuse passwords across distinct services.',
      },
      {
        id: 'B',
        label: 'Generate a unique, random password and store it in a reputable password manager.',
        description:
          'Create a distinct set of random characters specifically for this citation website so no other accounts are linked.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Even if the citation website is compromised, the leaked credentials cannot unlock your email, bank, or university portal.',
        clueContext:
          'Compartmentalizing credentials prevents breach collateral damage.',
      },
      {
        id: 'C',
        label: 'Use your favorite password but add "123!" at the end to make it slightly different.',
        description:
          'Apply a minor variation to your core password for each website you register on.',
        classification: 'risky',
        riskAssessment: 'HIGH',
        consequence:
          'Automated cracking tools easily deduce simple pattern variations (e.g. adding 123 or the site name) once the base pattern is known.',
        clueContext:
          'Predictable pattern mutations are solved by standard credential-stuffing algorithms.',
        saferAction: 'Use truly random generated strings.',
      },
      {
        id: 'D',
        label: 'Write the password down on a sticky note attached to your laptop bezel.',
        description:
          'Keep your password visible on your hardware so you do not forget it.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'Anyone walking past your library desk or study group can glance at your laptop and record your active credentials.',
        clueContext:
          'Physical exposure bypasses all digital complexity.',
        saferAction: 'Store credentials in an encrypted digital password manager.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Every account requires a unique, distinct password. Compartmentalization ensures that one compromised service never endangers the rest of your digital life.',
    learningObjective:
      'Understand credential stuffing risks and the essential role of password managers in preventing cascading account breaches.',
    deterministicFeedback: {
      A: {
        mentorVoice:
          'Complexity only protects against brute-force guessing—it does nothing when the website itself gets hacked.',
        whyExplanation:
          'Small utilities frequently store passwords improperly. When their database leaks, automated bots immediately test those credentials on Google, Microsoft, and banking portals.',
        realisticOutcome:
          'A breach on an obscure homework tool leads directly to your university account and personal email being hijacked.',
        clueInsight:
          'The length of your password did not matter because the server leaked the plain text.',
        saferAction:
          'Generate unique random passwords for every single website.',
        principle:
          'Unique credentials prevent single points of failure.',
      },
      B: {
        mentorVoice:
          'Spot-on security hygiene. You isolated the risk to this single throwaway service.',
        whyExplanation:
          'If this citation generator gets compromised tomorrow, the leaked password is completely useless to an attacker trying to access your other profiles.',
        realisticOutcome:
          'Your critical accounts stay safe regardless of how poorly third-party websites protect their databases.',
        clueInsight:
          'Password managers make it effortless to maintain 50+ unique passwords without ever having to memorize them.',
        saferAction:
          'Enable two-factor authentication on your password manager for maximum security.',
        principle:
          'Credential isolation is the bedrock of modern identity protection.',
      },
      C: {
        mentorVoice:
          'Pattern mutations are an illusion of security.',
        whyExplanation:
          'Hackers use rulesets in tools like Hashcat that automatically try appending "123", "!", or current years to known leaked passwords.',
        realisticOutcome:
          'Your accounts would still be breached during automated credential stuffing runs.',
        clueInsight:
          'Predictable human habits are easily modeled by algorithms.',
        saferAction:
          'Let a password manager generate cryptographically random strings.',
        principle:
          'Randomness beats human pattern modifications.',
      },
      D: {
        mentorVoice:
          'Physical convenience should never compromise basic access control.',
        whyExplanation:
          'A sticky note on your laptop exposes your password to surveillance cameras, classmates, and anyone passing your desk.',
        realisticOutcome:
          'Your physical proximity becomes a vector for casual credential theft.',
        clueInsight:
          'Physical access is root access—never leave credentials in plain sight.',
        saferAction:
          'Use an encrypted password manager secured by biometrics or a master passphrase.',
        principle:
          'Protect credentials from physical observation.',
      },
    },
  },

  // 14 — Screen Sharing Privacy
  {
    id: 'scenario-14',
    number: 14,
    code: 'OPS-14',
    title: 'The Collaborative Screen Share',
    category: 'privacy',
    categoryLabel: 'Display Privacy & Accidental Data Exposure',
    difficulty: 'Level 2 — Investigate',
    environment: 'dorm',
    environmentTitle: 'Virtual Video Meeting Room',
    context: 'You are in an online study call with 15 classmates and a teaching assistant.',
    situation:
      'The group asks you to present your code solution. You are about to click the share button. Currently open on your desktop: a browser window with your personal healthcare portal, a private message window discussing personal family finances, and an open text file containing your home Wi-Fi and router admin credentials.',
    participant: {
      name: 'Tyler Brooks',
      role: 'Study Group Lead',
      avatarType: 'student-casual',
    },
    dialogue: [
      'Can you share your screen and show us how you solved problem 3?',
      'The TA is recording this session for people who could not attend.',
      'Whenever you are ready, just hit Share Screen!',
    ],
    artifact: {
      type: 'chat-message',
      title: 'Active Desktop Window Inventory',
      subtitle: 'Session: Cloud Video Call (Recording: Active)',
      metadata: {
        'Open Windows': 'VS Code, Personal Health Portal, Family WhatsApp, passwords.txt',
        'Recording Status': 'Saving to Cloud Drive',
        Audience: '16 students + Faculty TA',
      },
      contentPreview:
        'Screen Share Prompt:\n[ Share Entire Screen (Desktop 1) ]\n[ Share Window: VS Code ]\n\nWarning: Sharing your entire desktop will broadcast all notifications and background windows.',
      clueCallout:
        'Full desktop sharing broadcasts all open tabs, pop-up notifications, and taskbar icons. The meeting is also being recorded and archived.',
      tags: ['Screen Sharing', 'Data Leakage', 'Privacy Controls'],
    },
    options: [
      {
        id: 'A',
        label: 'Share your entire desktop immediately so it is easy to switch between apps.',
        description:
          'Broadcast your full monitor screen to the 16 participants and the cloud recording.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'When you minimize your editor, your private medical portal and passwords file are visible in high definition on the video recording uploaded to the class archive.',
        clueContext:
          'You shared full desktop display without filtering sensitive background tasks.',
        saferAction: 'Share only the specific application window required.',
      },
      {
        id: 'B',
        label: 'Close sensitive tabs, mute notifications, and share only the VS Code window.',
        description:
          'Take 15 seconds to close personal windows, enable Do Not Disturb, and select "Share Window: VS Code".',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Classmates only see your programming editor. No personal messages, medical records, or passwords are ever exposed or recorded.',
        clueContext:
          'You applied selective application-level window sharing.',
      },
      {
        id: 'C',
        label: 'Minimize sensitive windows to the taskbar and share your entire screen.',
        description:
          'Leave the sensitive windows minimized so only their taskbar titles are visible.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'During the presentation, unexpected pop-up notifications and taskbar hover previews display private message snippets on screen.',
        clueContext:
          'Minimized apps still generate desktop push notifications.',
        saferAction: 'Turn off notifications and share only the relevant app.',
      },
      {
        id: 'D',
        label: 'Turn off your webcam thinking that hiding your face keeps your screen private.',
        description:
          'Disable video camera input while sharing the entire uncurated desktop.',
        classification: 'risky',
        riskAssessment: 'HIGH',
        consequence:
          'Turning off your webcam does not alter screen broadcasting; your private data is still fully visible to all viewers.',
        clueContext:
          'Webcam video and screen sharing are completely independent channels.',
        saferAction: 'Focus on what the screen feed is actually broadcasting.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Always share specific application windows rather than your entire desktop, and mute notifications before broadcasting.',
    learningObjective:
      'Prevent accidental disclosure of sensitive credentials and personal data during video conferences.',
    deterministicFeedback: {
      A: {
        mentorVoice:
          'That was an irreversible privacy leak, especially because the meeting was being recorded.',
        whyExplanation:
          'Broadcasting your whole desktop exposes everything: open windows, bookmarks, taskbar icons, and sudden personal notifications.',
        realisticOutcome:
          'Your medical records and private passwords would be archived on the university video server for all students to review.',
        clueInsight:
          'Always select "Share Window" instead of "Share Desktop".',
        saferAction:
          'Take a moment before every call to prep your screen for presentation.',
        principle:
          'Limit visual broadcasting to the minimal necessary application.',
      },
      B: {
        mentorVoice:
          'Flawless operational security. You protected your private data while delivering a smooth presentation.',
        whyExplanation:
          'Sharing only the code editor ensured that even if you opened another file or received a private message, participants saw nothing but the code.',
        realisticOutcome:
          'Your privacy was preserved, no sensitive artifacts were recorded, and the class got the help they needed.',
        clueInsight:
          'Closing background sensitive apps removes all risk of accidental switching.',
        saferAction:
          'Make this standard practice before every screen-sharing session.',
        principle:
          'Window-level sharing provides bulletproof isolation against accidental leaks.',
      },
      C: {
        mentorVoice:
          'Minimizing windows is not enough when push notifications are active.',
        whyExplanation:
          'A message preview popping up in the corner of your screen can easily reveal private conversations to everyone watching.',
        realisticOutcome:
          'Sensitive personal messages pop up during your presentation and are captured on the class recording.',
        clueInsight:
          'Desktop notifications disregard whether an application is minimized.',
        saferAction:
          'Enable "Do Not Disturb" mode and close private communication apps before presenting.',
        principle:
          'Minimize background noise and eliminate notification leaks.',
      },
      D: {
        mentorVoice:
          'Your webcam and screen share are completely separate feeds.',
        whyExplanation:
          'Disabling your camera does not hide your display monitor. Participants still see everything on your screen.',
        realisticOutcome:
          'You mistakenly think your screen is private while everyone in the meeting reads your open documents.',
        clueInsight:
          'Camera settings have zero effect on desktop screen capture.',
        saferAction:
          'Manage screen permissions and window selection directly.',
        principle:
          'Understand your collaboration tools’ capture boundaries.',
      },
    },
  },

  // 15 — Too-Good-To-Be-True Deal
  {
    id: 'scenario-15',
    number: 15,
    code: 'OPS-15',
    title: 'The 90% Off Flagship Smartphone Deal',
    category: 'social-engineering',
    categoryLabel: 'E-Commerce Scams & Payment Safety',
    difficulty: 'Level 1 — Recognize',
    environment: 'dorm',
    environmentTitle: 'Dorm Room Workstation',
    context: 'While scrolling social media, a sponsored advertisement catches your attention.',
    situation:
      'The ad advertises a brand-new $1,200 flagship smartphone for just $89.00. The link takes you to "MegaDiscount-TechVault.shop". A flashing red countdown timer reads: "Only 4 minutes left! 3 units remaining!". The site has no physical address, the domain was registered 4 days ago, all reviews have identical timestamps, and the checkout accepts only direct wire transfer or gift cards.',
    participant: {
      name: 'Samira Khan',
      role: 'Dorm Roommate',
      avatarType: 'dorm-roommate',
    },
    dialogue: [
      'Look at this ad on my feed! A $1,200 phone for eighty-nine bucks!',
      'It says there are only 3 left and the timer is running down.',
      'Should we buy one right now before it sells out?',
    ],
    artifact: {
      type: 'email',
      title: 'E-Commerce Website Telemetry',
      subtitle: 'URL: megadiscount-techvault.shop/checkout',
      metadata: {
        'Domain Age': '4 days old',
        'Payment Methods': 'Wire Transfer, Zelle, Amazon Gift Cards (No Credit Cards)',
        'Physical Address': 'None Listed (Stock Photo HQ)',
        'Price Discrepancy': '92% below manufacturer MSRP',
      },
      contentPreview:
        'FLASH SALE // 90% DISCOUNT\nItem: Flagship Pro 512GB\nPrice: $89.00 (MSRP $1,200)\n\nPayment Requirement:\nSelect Gift Card / Direct Wire to unlock instant shipping.\n[ PROCEED TO WIRE TRANSFER ]',
      clueCallout:
        'Absurd discounts, artificial urgency countdowns, newly created domains, and demands for non-reversible payment methods (gift cards, wire transfers) are definitive hallmarks of fake storefronts.',
      tags: ['E-Commerce Fraud', 'Advance-Fee Scam', 'Payment Safety'],
    },
    options: [
      {
        id: 'A',
        label: 'Purchase the phone immediately using wire transfer before the countdown expires.',
        description:
          'Send the $89 via wire transfer to take advantage of the massive discount.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'Your $89 is wired to an untraceable offshore account. No phone is ever delivered, and wire transfers cannot be disputed or reversed.',
        clueContext:
          'You gave in to artificial urgency and used an irreversible payment channel.',
        saferAction: 'Never purchase from unverified sites offering unrealistic discounts.',
      },
      {
        id: 'B',
        label: 'Recognize the scam signs, close the site, and report the fraudulent ad.',
        description:
          'Identify the impossible price, new domain, and gift card payment demands, report the sponsored post, and buy only from authorized sellers.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'You protect your money, and reporting the ad helps the platform take down the fake storefront before other students lose funds.',
        clueContext:
          'You checked domain age, price plausibility, and payment protections.',
      },
      {
        id: 'C',
        label: 'Enter your shipping address and email to see if they offer cash on delivery.',
        description:
          'Submit your contact and home address to check alternative payment terms.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'Your physical address, full name, and email are harvested and added to marketing scam lists, leading to junk mail and phone spam.',
        clueContext:
          'Inputting personal info into scam portals fuels identity profiling.',
        saferAction: 'Do not enter any personal data on fraudulent sites.',
      },
      {
        id: 'D',
        label: 'Email the site’s customer support to ask if the phones are genuine refurbished units.',
        description:
          'Ask the site operators directly if the deal is legitimate.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'The scammers reply with convincing fake certificates and high-pressure messages urging you to buy immediately.',
        clueContext:
          'Scammers will always lie when asked if their store is legitimate.',
        saferAction: 'Rely on independent reviews and official retailer lists.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'If an online deal seems impossibly good, it is a scam. Genuine retailers never demand gift cards or wire transfers as the sole payment method.',
    learningObjective:
      'Identify fraudulent e-commerce websites through domain age, payment mechanism inspection, and price plausibility.',
    deterministicFeedback: {
      A: {
        mentorVoice:
          'Classic bait-and-switch. When payment happens via wire transfer or gift cards, there is zero buyer protection.',
        whyExplanation:
          'Credit cards offer fraud dispute mechanisms. Wire transfers and gift cards are treated like cash—once sent, they are gone forever.',
        realisticOutcome:
          'You lose $89, receive nothing, and your payment details may be traded on fraud forums.',
        clueInsight:
          'No authorized distributor sells brand new $1,200 flagship phones for $89.',
        saferAction:
          'Purchase electronics exclusively through reputable, authorized merchants.',
        principle:
          'Payment irreversibility is the scammer’s favorite weapon.',
      },
      B: {
        mentorVoice:
          'Excellent critical thinking. You evaluated the technical clues and saw right through the countdown illusion.',
        whyExplanation:
          'A 4-day-old domain demanding gift cards and claiming a 92% discount checks every box of an e-commerce scam.',
        realisticOutcome:
          'You kept your money safe and helped purge a malicious sponsored campaign.',
        clueInsight:
          'The countdown timer is hardcoded in JavaScript to reset every time someone refreshes the page.',
        saferAction:
          'Keep utilizing domain lookup tools and merchant verification checks.',
        principle:
          'Healthy skepticism protects your wallet online.',
      },
      C: {
        mentorVoice:
          'Entering personal details on scam sites still poses real risk.',
        whyExplanation:
          'Even without paying, submitting your home address and phone number gives scammers valuable lead data to target you with physical junk or targeted smishing.',
        realisticOutcome:
          'Your contact info is sold to lead generation networks, increasing your spam volume.',
        clueInsight:
          'Never fill out forms on sites you know are untrustworthy.',
        saferAction:
          'Close the browser tab immediately upon recognizing fraud indicators.',
        principle:
          'Protect your personal contact data as carefully as your payment cards.',
      },
      D: {
        mentorVoice:
          'Never ask a scammer if they are scamming you.',
        whyExplanation:
          'The customer service address is staffed by the same scammers who built the site. They are trained to reassure and deceive hesitant buyers.',
        realisticOutcome:
          'They send polished fake documents that convince you to send money.',
        clueInsight:
          'Independent verification (Trustpilot, WHOIS, BBB) is what matters—not claims made by the seller.',
        saferAction:
          'Verify merchant legitimacy through external, independent review platforms.',
        principle:
          'Seek independent third-party verification, never internal confirmation.',
      },
    },
  },

  // 16 — Fake Tech Support
  {
    id: 'scenario-16',
    number: 16,
    code: 'OPS-16',
    title: 'The Fullscreen "Critical Threat" Pop-Up',
    category: 'social-engineering',
    categoryLabel: 'Tech Support Scams & Psychological Coercion',
    difficulty: 'Level 1 — Recognize',
    environment: 'library',
    environmentTitle: 'Campus Computer Lab',
    context: 'You are researching journal articles on an unfamiliar website when your screen suddenly freezes.',
    situation:
      'A loud audio siren starts blaring through your headphones. Your browser enters forced fullscreen mode displaying a simulated Windows Defender screen: "CRITICAL ALERT: Trojan Spyware Detected. Your passwords, banking data, and files are being uploaded to an offshore server. Do not shut down your computer. Call official Microsoft Support immediately at 1-800-555-0199 for emergency remediation."',
    participant: {
      name: 'Marcus Vance',
      role: 'Lab Proctor',
      avatarType: 'lab-proctor',
    },
    dialogue: [
      'Whoa, is that alarm coming from your computer?',
      'It says your PC has a trojan and you have to call Microsoft right away.',
      'Wait, don’t dial that number—this looks like one of those browser scareware pop-ups.',
    ],
    artifact: {
      type: 'login-alert',
      title: 'Browser Fullscreen Viewport Analysis',
      subtitle: 'Source: secure-defender-warning-hub88.online',
      metadata: {
        'Process Origin': 'Web Browser (Google Chrome / Edge)',
        'Audio Track': 'Looping sound file: siren.mp3',
        'Fullscreen API': 'Active (Pointer Lock Triggered)',
        'Telephone Number': '1-800-555-0199 (Toll-free VOIP Call Center)',
      },
      contentPreview:
        'WINDOWS SECURITY SYSTEM LOCKOUT\n\nError Code: #0x80070422\nStatus: Hard Drive Locked\n\nCall Certified Technician Immediately:\n1-800-555-0199\n\nDo not turn off your computer.',
      clueCallout:
        'Real operating systems (Windows, macOS) never display browser popups instructing users to call a phone number. This is pure scareware designed to lure you into granting remote desktop access.',
      tags: ['Scareware', 'Tech Support Fraud', 'Remote Access'],
    },
    options: [
      {
        id: 'A',
        label: 'Call the 1-800 number immediately so the engineer can clean your computer.',
        description:
          'Dial the number on the screen and follow the technician’s instructions to install remote desktop software.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The scammer connects via remote access, installs keyloggers, opens Event Viewer to show harmless logs as "infections," and demands $400 for bogus software.',
        clueContext:
          'You dialed an unverified number displayed inside a web browser advertisement.',
        saferAction: 'Never call phone numbers listed in browser pop-ups.',
      },
      {
        id: 'B',
        label: 'Press Esc / Ctrl+Shift+Esc to force-close the browser and clear recent cookies.',
        description:
          'Exit fullscreen, terminate the browser process via Task Manager, and reopen without restoring previous tabs.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'The pop-up and blaring siren instantly vanish. A quick antivirus scan confirms your computer was never infected—it was just an annoying website script.',
        clueContext:
          'You identified browser scareware and terminated the web process safely.',
      },
      {
        id: 'C',
        label: 'Pull the power cord out of the wall immediately while the computer is running.',
        description:
          'Cut power abruptly to prevent the supposed trojan from transmitting files.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'Hard power cuts can corrupt unsaved documents and file systems, and when you reboot, the browser reopens the same tab by default.',
        clueContext:
          'Cutting hardware power is unnecessary for a browser-level JavaScript loop.',
        saferAction: 'Use standard task termination.',
      },
      {
        id: 'D',
        label: 'Click the "Cancel" or "Dismiss" button displayed on the red pop-up.',
        description:
          'Click the buttons drawn on the fake alert dialog to make it go away.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'The "Cancel" button is part of the webpage and triggers a rogue file download or redirects to an affiliate adware network.',
        clueContext:
          'Buttons inside malicious webpages do not behave like genuine system buttons.',
        saferAction: 'Close the window using browser keyboard shortcuts or Task Manager.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Operating systems never display browser pop-ups with customer support phone numbers. Scareware uses noise and panic to force irrational remote-access grants.',
    learningObjective:
      'Recognize and safely terminate browser-based tech support scareware without engaging phone scammers.',
    deterministicFeedback: {
      A: {
        mentorVoice:
          'Never call numbers shown in browser pop-ups. That phone number routes straight to a call center designed to extort you.',
        whyExplanation:
          'Once you call, they instruct you to install remote access tools like AnyDesk or TeamViewer. Once inside, they steal files and lock your computer with a syskey password.',
        realisticOutcome:
          'You would be pressured into paying hundreds of dollars, and your device would be genuinely compromised.',
        clueInsight:
          'Microsoft, Apple, and Google will never post a phone number inside a web page asking you to call them.',
        saferAction:
          'Force-close the browser using Task Manager (Ctrl+Shift+Esc) or Activity Monitor.',
        principle:
          'Legitimate OS security alerts do not solicit phone calls.',
      },
      B: {
        mentorVoice:
          'Handled like a seasoned professional. You recognized the browser trap and terminated the process calmly.',
        whyExplanation:
          'The entire spectacle—the loud audio, the locked cursor, the scary red screen—was simply HTML and JavaScript running in a web tab.',
        realisticOutcome:
          'You terminated the tab in 5 seconds with zero malware on your system and zero dollars lost.',
        clueInsight:
          'Closing the browser process stops the script without damaging the operating system.',
        saferAction:
          'Make sure your browser is set to block intrusive pop-ups and unprompted audio playback.',
        principle:
          'Separate browser artifacts from underlying operating system health.',
      },
      C: {
        mentorVoice:
          'Pulling the plug is an aggressive overreaction to a simple browser script.',
        whyExplanation:
          'Abruptly cutting power risks damaging physical storage drives and corrupting your operating system files.',
        realisticOutcome:
          'You could lose your unsaved homework, and upon restarting, the browser might automatically restore the exact same tab.',
        clueInsight:
          'Use software process controls (Task Manager) before resorting to physical power cuts.',
        saferAction:
          'Kill the browser task cleanly using standard operating system controls.',
        principle:
          'Apply measured technical responses to software-level alerts.',
      },
      D: {
        mentorVoice:
          'Never click buttons inside an adversarial website.',
        whyExplanation:
          'The "Cancel", "OK", and "X" buttons on the web page are completely fake graphics. Clicking anywhere inside the frame often triggers unwanted file downloads.',
        realisticOutcome:
          'Clicking the button might initiate a real malware payload download.',
        clueInsight:
          'Use operating system hotkeys (Alt+F4 or Ctrl+W) rather than on-screen webpage buttons.',
        saferAction:
          'Close tabs using the browser tab bar or keyboard shortcuts.',
        principle:
          'Do not interact with controls rendered inside untrusted webpages.',
      },
    },
  },

  // 17 — Suspicious Browser Extension
  {
    id: 'scenario-17',
    number: 17,
    code: 'OPS-17',
    title: 'The Mandatory Video Codec Extension',
    category: 'account-security',
    categoryLabel: 'Malicious Browser Extensions & Privilege Abuse',
    difficulty: 'Level 3 — Decide',
    environment: 'dorm',
    environmentTitle: 'Student Apartment',
    context: 'A link shared in a course discussion board promises access to archived guest lectures.',
    situation:
      'When you click play on a lecture video, a modal blocks playback: "Missing Ultra-HD Video Codec. To view this media, install the official player extension." The browser installation prompt opens: "Add \'UltraStream Player\'? It can read and change all your data on all websites you visit, read your browsing history, and access clipboard data."',
    participant: {
      name: 'Chloe Bennett',
      role: 'Course TA',
      avatarType: 'fellow-researcher',
    },
    dialogue: [
      'Did someone post a link to guest lectures?',
      'Be careful—modern browsers have built-in video decoders. You almost never need an extension just to stream a video.',
      'Check what permissions that extension is asking for before clicking yes.',
    ],
    artifact: {
      type: 'login-alert',
      title: 'Browser Extension Permission Manifest',
      subtitle: 'Package: UltraStream Player v3.2',
      metadata: {
        Publisher: 'Unknown Developer (Unverified WebStore Listing)',
        'Requested Scope': '<all_urls> (Full DOM Access)',
        Permissions: 'cookies, clipboardRead, webRequestBlocking',
        Installations: '< 100 users',
      },
      contentPreview:
        'Extension Permission Warning:\n"UltraStream Player" can:\n• Read and change all your data on all websites\n• Read sensitive clipboard contents\n• Read your browsing history\n\n[ ADD EXTENSION ]   [ CANCEL ]',
      clueCallout:
        'Legitimate video codecs do not require reading your data on every website you visit or accessing your clipboard. This extension is designed to steal session cookies and inject advertisements.',
      tags: ['Malicious Extensions', 'Session Hijacking', 'Least Privilege'],
    },
    options: [
      {
        id: 'A',
        label: 'Click "Add Extension" because you need to watch the lecture before class.',
        description:
          'Accept the permissions to unlock the video player and review the course material.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'The extension injects scripts into your banking and email sessions, copying your session cookies and transmitting them to a remote command-and-control server.',
        clueContext:
          'You granted omnipotent browser permissions to an unverified third-party utility.',
        saferAction: 'Deny extensions that demand access to all web data.',
      },
      {
        id: 'B',
        label: 'Cancel the installation, leave the website, and inform your instructor.',
        description:
          'Reject the permissions, recognize that modern browsers do not require extensions to play standard video, and report the bad link.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Your browser remains secure. The instructor investigates and discovers the shared link was posted by a compromised student account.',
        clueContext:
          'You evaluated permission scope against functional necessity.',
      },
      {
        id: 'C',
        label: 'Install the extension in an Incognito / Private window assuming it cannot read data.',
        description:
          'Allow the extension only within private browsing mode to isolate it.',
        classification: 'risky',
        riskAssessment: 'HIGH',
        consequence:
          'If an extension is granted access in Incognito, it still reads any credentials or sessions you open within that private window.',
        clueContext:
          'Private browsing does not sandbox extensions from the pages you load inside it.',
        saferAction: 'Never install untrusted extensions anywhere.',
      },
      {
        id: 'D',
        label: 'Install the extension, watch the video, and plan to remove it tomorrow.',
        description:
          'Temporarily accept the extension with the intention of uninstalling it later.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'A malicious extension steals active session tokens within seconds of installation—waiting until tomorrow is far too late.',
        clueContext:
          'Data exfiltration occurs in milliseconds upon extension initialization.',
        saferAction: 'Do not install malicious packages even temporarily.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Browser extensions have virtually unlimited visibility into your web traffic. Never install extensions that request full access to all websites for simple utility functions.',
    learningObjective:
      'Evaluate browser extension permission scopes and identify malicious codec lures used for credential theft.',
    deterministicFeedback: {
      A: {
        mentorVoice:
          'Browser extensions are one of the most dangerous software categories if abused.',
        whyExplanation:
          'With "<all_urls>" permission, an extension can read every password you type, steal authentication tokens, and modify bank transfer destinations in real time.',
        realisticOutcome:
          'Your accounts would be compromised from behind your own authenticated firewall.',
        clueInsight:
          'HTML5 natively plays video in all modern browsers—third-party extensions for basic playback are almost always malicious lures.',
        saferAction:
          'Never install extensions just to view content on a website.',
        principle:
          'Scrutinize extension permissions rigorously before installation.',
      },
      B: {
        mentorVoice:
          'Outstanding vigilance. You scrutinized the requested permissions and identified a serious privilege escalation.',
        whyExplanation:
          'Recognizing that a video player has no legitimate business reading your clipboard or all web data protected your entire digital session.',
        realisticOutcome:
          'Your browser remained clean, and you protected fellow students by alerting the instructor.',
        clueInsight:
          'Modern web standards (MP4, WebM, HLS) require zero browser plugins.',
        saferAction:
          'Audit your installed extensions every few months and remove anything you do not use.',
        principle:
          'Apply the principle of least privilege to your browser environment.',
      },
      C: {
        mentorVoice:
          'Incognito mode is not an impenetrable sandbox for extensions.',
        whyExplanation:
          'If you enable an extension in Incognito mode, it has the exact same power to read, record, and alter everything in that private session.',
        realisticOutcome:
          'The extension still exfiltrates data from any site you browse within the private window.',
        clueInsight:
          'Private browsing only prevents saving local history—it does not block active malicious code.',
        saferAction:
          'If software is untrusted, keep it completely off your device.',
        principle:
          'Privacy mode is not a malware defense layer.',
      },
      D: {
        mentorVoice:
          'Data theft does not wait for tomorrow.',
        whyExplanation:
          'The moment an extension is installed, its background worker script executes immediately, grabbing all stored cookies and active session headers within milliseconds.',
        realisticOutcome:
          'Uninstalling it tomorrow would be meaningless because the attacker already has your account tokens.',
        clueInsight:
          'Initial execution is all an attacker needs to harvest identity data.',
        saferAction:
          'Prevent the initial install rather than relying on delayed cleanup.',
        principle:
          'Compromise happens instantly upon authorization.',
      },
    },
  },

  // 18 — Social Media Quiz
  {
    id: 'scenario-18',
    number: 18,
    code: 'OPS-18',
    title: 'The Viral Childhood Memories Quiz',
    category: 'privacy',
    categoryLabel: 'Oversharing & Security Question Harvesting',
    difficulty: 'Level 1 — Recognize',
    environment: 'cafe',
    environmentTitle: 'Student Center Lounge',
    context: 'A fun visual quiz is trending across your social media feeds.',
    situation:
      'Several friends have shared an aesthetic graphic questionnaire titled "Unlock Your Childhood Energy!". The prompts ask you to write in: 1. Name of your first pet, 2. Street you grew up on, 3. Your elementary school, 4. Mother’s middle name, 5. The model of your family’s first car. The post encourages: "Tag 5 friends to see who remembers you best!"',
    participant: {
      name: 'Elena Gomez',
      role: 'Undergrad Classmate',
      avatarType: 'student-worried',
    },
    dialogue: [
      'Everyone in our dorm is doing this challenge on Instagram!',
      'It asks for your first pet and childhood street name.',
      'Should I post mine? It looks totally harmless, right?',
    ],
    artifact: {
      type: 'chat-message',
      title: 'Social Media Questionnaire Graphic',
      subtitle: 'Platform: Public Story & Feed Sticker',
      metadata: {
        'Viral Reach': '150,000+ shares',
        Questions: 'First pet, Street name, Elementary school, Mother middle name',
        'Audience Setting': 'Public (Visible to anyone on the internet)',
      },
      contentPreview:
        '✨ HOW RETRO ARE YOU? ✨\n1. First Pet’s Name: ________\n2. Street You Grew Up On: ________\n3. First School: ________\n4. Mother’s Maiden/Middle Name: ________\n5. Favorite Vacation City: ________\n\nTag your best friends to keep the chain going!',
      clueCallout:
        'These exact questions match the default security verification prompts used by banks, universities, and email providers to reset passwords.',
      tags: ['OSINT', 'Security Questions', 'Oversharing'],
    },
    options: [
      {
        id: 'A',
        label: 'Fill out the graphic with your real answers and post it to your public story.',
        description:
          'Participate in the viral trend so your friends can see your childhood memories.',
        classification: 'dangerous',
        riskAssessment: 'HIGH',
        consequence:
          'Open-source intelligence (OSINT) bots scrape your answers. An attacker uses your first pet and mother’s maiden name to bypass security questions on your bank account.',
        clueContext:
          'You published answers to standard security questions on a public profile.',
        saferAction: 'Never share security question answers online.',
      },
      {
        id: 'B',
        label: 'Decline to post and review your accounts to replace security questions with MFA.',
        description:
          'Recognize that viral quizzes are used for data harvesting, avoid sharing, and transition your accounts to modern authenticator apps.',
        classification: 'secure',
        riskAssessment: 'LOW',
        consequence:
          'Your personal history stays private, and moving to an authenticator app eliminates static security question vulnerabilities entirely.',
        clueContext:
          'You connected social media prompts with authentication vulnerability vectors.',
      },
      {
        id: 'C',
        label: 'Post your answers but set your Instagram story to "Close Friends" only.',
        description:
          'Share your real answers, trusting that limiting your audience to 40 contacts keeps it safe.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'Any compromised friend account or screen capture can leak the graphic outside your inner circle.',
        clueContext:
          'Audience rings still leak data when friends’ devices are compromised.',
        saferAction: 'Do not publish authentication secrets anywhere.',
      },
      {
        id: 'D',
        label: 'Fill out the answers but intentionally spell your pet’s name slightly wrong.',
        description:
          'Alter one or two characters in your answers thinking it foils automated scrapers.',
        classification: 'risky',
        riskAssessment: 'MEDIUM',
        consequence:
          'Human social engineers can easily infer slight spelling variations to guess your recovery answers.',
        clueContext:
          'Slight misspellings provide almost no defensive margin against human analysis.',
        saferAction: 'Keep recovery data completely off social media.',
      },
    ],
    bestOptionId: 'B',
    securityPrinciple:
      'Viral trivia quizzes often crowdsource answers to account recovery questions. Treat your childhood details as sensitive authentication data.',
    learningObjective:
      'Recognize social media data harvesting techniques targeting security question answers.',
    deterministicFeedback: {
      A: {
        mentorVoice:
          'You just handed out the master keys to your account recovery portals.',
        whyExplanation:
          'Almost every legacy bank and email provider asks "What was your first pet?" or "What street did you grow up on?" to verify identity when resetting passwords.',
        realisticOutcome:
          'A bad actor can initiate account recovery on your email and answer every challenge question correctly using your public story.',
        clueInsight:
          'These quizzes are purposefully engineered by threat actors to harvest OSINT data at scale.',
        saferAction:
          'Never answer biographical security questions on social platforms.',
        principle:
          'Public social media feeds must never contain authentication secrets.',
      },
      B: {
        mentorVoice:
          'Sharp awareness. You saw past the friendly graphics and recognized the underlying security risk.',
        whyExplanation:
          'Refusing to publish your background details and upgrading to app-based two-factor authentication permanently neutralizes this entire class of attacks.',
        realisticOutcome:
          'Your identity profiles remain airtight, and you helped raise awareness among your peers.',
        clueInsight:
          'Security questions are inherently flawed because personal history is often discoverable.',
        saferAction:
          'Use hardware keys or authenticator apps (TOTP) wherever possible.',
        principle:
          'Modern multi-factor authentication makes static security questions obsolete.',
      },
      C: {
        mentorVoice:
          'Close Friends settings provide a false sense of security.',
        whyExplanation:
          'If just one of those 40 friends has their account compromised or takes a screenshot, your data is out in the open.',
        realisticOutcome:
          'Your security answers end up stored on devices you do not control.',
        clueInsight:
          'Security answers must be treated like passwords—never shared with anyone.',
        saferAction:
          'Keep authentication secrets strictly confidential.',
        principle:
          'Do not rely on third-party platform privacy filters for sensitive credentials.',
      },
      D: {
        mentorVoice:
          'A minor spelling tweak is not enough to stop a motivated attacker.',
        whyExplanation:
          'Human investigators and automated fuzzy-matching tools test phonetic and common spelling variations during password recovery attempts.',
        realisticOutcome:
          'Your account could still be unlocked with only a few simple guesses.',
        clueInsight:
          'Fuzzy logic makes slight spelling variations trivial to crack.',
        saferAction:
          'Never provide clues to your actual security answers.',
        principle:
          'Obfuscation is not a substitute for true confidentiality.',
      },
    },
  },
];
