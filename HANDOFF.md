# HANDOFF: CyberMentor AI — Technical & UI Redesign Spec

Use this document to bring ChatGPT, collaborators, or future developers up to speed on the current state, architecture, and visual system of **CyberMentor AI**.

---

## 1. Executive Summary

**CyberMentor AI** is an interactive, single-player cybersecurity adventure where real-world cybersecurity knowledge serves as the core gameplay mechanic. Rather than passive multiple-choice quizzes, players investigate simulated operational environments (email clients, network logs, authentication headers, removable media) to identify threats, make tactical decisions, suffer realistic consequences, and receive in-character AI mentor debriefs.

- **Primary Paradigm**:
  $$\text{Explore} \rightarrow \text{Encounter} \rightarrow \text{Investigate} \rightarrow \text{Decide} \rightarrow \text{Consequence} \rightarrow \text{AI Debrief} \rightarrow \text{Unlock}$$
- **Visual Aesthetic**: Inspired by Google CTF, developer tools, and security forensics workstations (restrained dark charcoal base, clean hairlines, monospaced metadata, subtle electric cyan accents, and zero neon/AI clichés).

---

## 2. Core Game Systems & Mechanics

### A. Digital Trust Score (Strictly Starts at 0 / 100)
- Trust is **never granted by default**; the player begins at **0 / 100**.
- Trust is earned exclusively through verified defensive choices (quarantining suspicious attachments, cross-referencing sender authentication records, out-of-band verification).
- Careless decisions (opening double-extension `.pdf.exe` payloads, entering credentials on raw IP links) decrement trust and trigger compromise states.
- Every trust adjustment is permanently recorded in an immutable `trustHistory` telemetry log (`delta`, `reason`, `timestamp`, `newScore`).

### B. 2D Visual Exploration Layer & Network Topology
- **Explorable Sector Worlds (`/src/components/world/`)**:
  - Instead of static text cards, entering a sector drops the operative into an interactive 2D top-down environment with smooth camera tracking and delta-time physics.
  - **Avatars**: Vector-rendered, technical 4-directional operatives and NPCs (Jordan Rivera, Marcus Chen, Elena Rostova, Tariq Al-Mansoor) with animated walking cycles, directional silhouettes, and dynamic threat status indicators.
  - **Dynamic Progression**: In-world NPCs visually react to completed operations. Before resolution, Jordan Rivera appears stressed with an active `[OPS-01]` amber alert; after completion, Jordan displays relieved posture and a green `[RESOLVED]` badge.
  - **Physical In-World Consoles**:
    - *Gateway Console*: Direct access to macro Network Topology (World Map).
    - *Tactical Workstation*: Access to Cyber Abilities Matrix & live terminal.
    - *Evidence Board*: Access to forensic IOC notebook.
    - *ID Terminal*: Access to Agent profile and trust telemetry log.
    - *AI Mentor Comms Uplink*: Direct in-world consultation modal with CyberMentor AI.
  - **Dual View Modes**: Operatives can freely toggle between the `[2D SECTOR WORLD]` and `[DOSSIER CARDS]` list views at any time.
  - **Responsive Controls**: Full keyboard navigation (`WASD` / Arrow keys), click/tap-to-pathfind, proximity-based prompt (`[E] ACT`), and on-screen virtual D-pad for mobile touch devices.
- **Macro World Map (Network Topology Grid)**:
The world map is modeled as an interactive cyber infrastructure topology with 5 security tiers:
1. **Campus (`campus`)**: Unlocked by default (Trust: 0). Academic networks, student portals, phishing simulations.
2. **Digital City (`digital-city`)**: Unlocks at Trust 15. Rogue public Wi-Fi APs, cafe networks, malicious QR codes.
3. **Home (`home`)**: Unlocks at Trust 25. Personal workstations, IoT vulnerabilities, smart home router hygiene.
4. **CyberCorp (`cybercorp`)**: Unlocks at Trust 45. Enterprise perimeters, Active Directory, supply chain poisoning, C2 beaconing.
5. **The Internet (`the-internet`)**: Unlocks at Trust 70. BGP routing anomalies, global DNS poisoning, nation-state adversary simulations.

### C. Cyber Ability Matrix & Terminal
Abilities act as the player’s investigative toolkit:
- **Baseline Instincts (Unlocked at Start)**:
  - `OBSERVE`: Identifies artificial urgency, emotional coercion, and psychological manipulation.
  - `INSPECT`: Dissects raw RFC headers, MIME envelopes, file extensions, and target URLs.
  - `VERIFY`: Validates cryptographic records (SPF, DKIM, DMARC) and TLS certificate issuers.
  - `QUESTION`: Cross-references institutional out-of-band security policies.
- **Advanced Specializations (Unlocked via Missions)**:
  - `ANALYZE`: Disassembles binaries, examines PE headers, measures entropy (Unlocked in Mission 01).
  - `ISOLATE`: Air-gaps infected endpoints, terminates rogue network adapters, blocks egress.
  - `TRACE`: Maps network hops, uncovers rogue access points, identifies adversary infrastructure.
  - `REPORT`: Packages cryptographic evidence chains for SOC / CERT dispatch.
  - `PROTECT`: Deploys hardware security keys and MFA enforcement.
  - `RESPOND`: Remediates stolen credentials and resets session states.
- **Integrated Terminal Sandbox**:
  - Live interactive shell with executable commands (`cyber inspect`, `cyber analyze`, `cyber verify`, `cyber isolate --network-kill`).

### D. Evidence Notebook (Forensic Repository)
- Discovered Indicators of Compromise (IOCs) during investigations are cataloged in an evidence locker.
- Categorized by type: `DOMAIN`, `URL`, `HEADER`, `PAYLOAD`, `BEHAVIOR`.
- Includes cryptographic hashes, discovery timestamps, risk levels, and direct references to the active mission.

### E. AI Mentor Debriefing Engine
- **Server Endpoint**: `POST /api/mentor/analyze` (`server.ts`).
- Powered by `@google/genai` (Gemini API) using server-side execution (keeps API keys completely off the client).
- **Deterministic Offline Fallback**: If the Gemini API is offline or the API key is not set, a built-in deterministic evaluation engine computes a deep forensic post-mortem tailored to the exact decision, explaining:
  1. Attack vector analysis
  2. Psychological pressure mechanisms
  3. Core defensive mental model
  4. Real-world rule of thumb

---

## 3. UI/UX Design System (CTF & Forensic Tooling)

The UI was redesigned to reflect an engineering/CTF platform rather than a generic SaaS or gamified dashboard:

| Element | Design Direction |
| :--- | :--- |
| **Color Palette** | Base: `#0a0c10`, Surface: `#11141a`, Raised: `#161b22`, Borders: `#21262d` / `#30363d` |
| **Accents** | Primary: `#38bdf8` (Electric Cyan), Amber: `#d29922`, Red: `#f85149`, Green: `#3fb950` |
| **Borders & Radii** | Sharp, precise 0–4px border radius. Hairline 1px borders instead of wide shadows. |
| **Typography** | Sans-serif (`Plus Jakarta Sans`) for narrative; Monospace (`Fira Code`) for technical IOCs, hashes, headers, status indicators, and terminal output. |
| **Structure** | Flat panels, split-screen consoles, collapsible drawers, and data tables (no floating glass cards). |
| **Audio** | Procedural Web Audio API sound generator (low-volume clicks, alert beeps, and success hums with a global mute toggle). |

---

## 4. File Structure & Component Map

```
/
├── server.ts                       # Express backend (Port 3000), /api/mentor/analyze, Vite middleware
├── package.json                    # Scripts: dev (tsx), build (vite + esbuild bundle), start (node)
├── metadata.json                   # App name, permissions, and server-side capability metadata
├── index.html                      # Root HTML, Fira Code font import, viewport config
├── src/
│   ├── main.tsx                    # React 18 DOM mount
│   ├── App.tsx                     # Main state machine, tab routing, and modal managers
│   ├── index.css                   # Tailwind CSS base, variables, and dark surface theme
│   ├── types.ts                    # TypeScript types: PlayerState, MissionData, EvidenceItem, etc.
│   ├── data/
│   │   ├── locations.ts            # 5 World sectors, grid positions, and clearance thresholds
│   │   ├── missions.ts             # Mission 01 ("The Suspicious Email"), IOCs, choices, outcomes
│   │   └── initialState.ts         # Default player state (Trust: 0), abilities, achievements
│   ├── utils/
│   │   └── audio.ts                # Synthesized Web Audio API sound effects & mute state
│   └── components/
│       ├── GameHeader.tsx          # Top operations HUD (Trust score, [WORLD], [ABILITIES], etc.)
│       ├── WorldMap.tsx            # SVG network topology diagram & sector dossier
│       ├── LocationView.tsx        # Sector dispatch board with active operation cards
│       ├── MissionWorkspace.tsx    # Multi-step investigation flow (Briefing -> Action -> Debrief)
│       ├── InvestigationPanel.tsx  # Simulated client (RFC headers, link hover, attachment inspector)
│       ├── MentorDebrief.tsx       # Post-incident analysis report & ability unlock card
│       ├── AbilityPanel.tsx        # Cyber Ability Matrix + live interactive terminal sandbox
│       ├── EvidenceNotebook.tsx    # Forensic IOC repository with search, filter, and tags
│       ├── ProfileModal.tsx        # Agent dossier, trust telemetry timeline, and certificates
│       ├── LandingIntro.tsx        # Intro splash screen establishing narrative stakes
│       ├── HowItWorksModal.tsx     # Operational doctrine & educational philosophy breakdown
│       └── world/
│           ├── WorldScene.tsx          # 2D explorable canvas, camera follow, and physics loop
│           ├── PlayerAvatar.tsx        # 4-direction technical operative sprite and animations
│           ├── NPCAvatar.tsx           # Dynamic NPC character sprites and threat status tags
│           ├── WorldObjects.tsx        # In-world consoles, buildings, and environmental props
│           ├── InteractionPrompt.tsx   # Subtle monospaced proximity prompt ([E] ACT)
│           ├── MobileControls.tsx      # Responsive virtual D-pad for mobile touch devices
│           └── MentorUplinkModal.tsx   # In-world direct tactical consultation with AI Mentor
```

---

## 5. Active Mission Specification: Mission 01 ("The Suspicious Email")

- **Sector**: Campus (`campus`)
- **NPC**: Jordan Rivera (Freshman Biology major facing an urgent academic warning)
- **Threat Vector**: Phishing / Credential Harvesting with Double-Extension Dropper
- **Forensic Artifacts**:
  1. *From Header*: "University IT Support" `<helpdesk@un1versity-help.com>` (Typosquatted domain with numeral `1`).
  2. *Authentication Records*: SPF SoftFail, DKIM None, Relay via `mx01.untrusted-relay.net`.
  3. *Hyperlink*: Display text `https://portal.university.edu/verify` masks actual destination `http://198.51.100.42/login.php`.
  4. *Attachment*: `Semester_Schedule_Update.pdf.exe` (Executable masquerading as PDF via double extension).
- **Decision Matrix**:
  - `choice-1`: Click link & verify credentials $\rightarrow$ **Compromised** (-15 Trust).
  - `choice-2`: Download & open attachment $\rightarrow$ **Compromised** (-20 Trust).
  - `choice-3`: Forward to classmate $\rightarrow$ **Spreads Threat** (-10 Trust).
  - `choice-4`: Report to official IT Security channel & quarantine $\rightarrow$ **Mitigated** (+15 Trust, unlocks `ANALYZE`, awards *Phish Disarmed* badge).

---

## 6. Development & Run Instructions

- **Run Dev Server**: `npm run dev` (Runs `tsx server.ts` on port 3000).
- **Typecheck & Lint**: `npm run lint` (`tsc --noEmit`).
- **Production Build**: `npm run build` (`vite build` + `esbuild server.ts`).
- **Production Start**: `npm start` (`node dist/server.cjs`).
- **Environment Variables**:
  - `GEMINI_API_KEY` (Optional): Enables live AI responses for the mentor debrief. If omitted, the app smoothly uses the deterministic security debrief engine.
