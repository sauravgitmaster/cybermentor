import { PlayableArea } from '../types/world';
import { LocationId } from '../types';

export const PLAYABLE_AREAS: Record<string, PlayableArea> = {
  // =========================================================================
  // CAMPUS AREA 01: LIBRARY & DIGITAL COMMONS
  // =========================================================================
  'campus-library': {
    id: 'campus-library',
    locationId: 'campus',
    name: 'LIBRARY & DIGITAL COMMONS',
    subtitle: 'Campus North Quad • Academic Information Systems',
    areaCode: 'SEC-LIB-01',
    width: 780,
    height: 540,
    spawnPoint: { x: 250, y: 310 },
    theme: {
      groundColor: '#2b5336',
      gridColor: '#366343',
      pathColor: '#c5b59a',
      pathBorder: '#8c7d67',
      ambientGlow: 'rgba(56, 189, 248, 0.08)',
    },
    pathType: 'library-quad',
    primaryMissionId: 'mission-01-email',
    unresolvedObjective: 'Talk to Jordan Rivera at the Library entrance to investigate the suspicious email',
    resolvedObjective: 'Library incident secured! Take the East campus walkway to the Student Union',
    buildings: [
      {
        id: 'bld-library',
        name: 'CAMPUS LIBRARY',
        label: 'LIBRARY & DIGITAL COMMONS',
        code: 'BLD-01',
        x: 80,
        y: 40,
        w: 340,
        h: 175,
        doorPos: { x: 250, y: 215 },
        accentColor: '#38bdf8',
      },
    ],
    props: [
      // Trees framing the courtyard
      { id: 'tree-lib-1', x: 40, y: 130, type: 'tree' },
      { id: 'tree-lib-2', x: 470, y: 130, type: 'tree' },
      { id: 'tree-lib-3', x: 40, y: 380, type: 'tree' },
      { id: 'tree-lib-4', x: 470, y: 460, type: 'tree' },
      { id: 'tree-lib-5', x: 740, y: 130, type: 'tree' },
      { id: 'tree-lib-6', x: 740, y: 450, type: 'tree' },
      // Courtyard benches
      { id: 'bench-lib-1', x: 120, y: 340, type: 'bench' },
      { id: 'bench-lib-2', x: 380, y: 340, type: 'bench' },
      // Campus lamps
      { id: 'lamp-lib-1', x: 90, y: 240, type: 'lamp' },
      { id: 'lamp-lib-2', x: 410, y: 240, type: 'lamp' },
      { id: 'lamp-lib-3', x: 570, y: 240, type: 'lamp' },
      // Notice board & bike rack
      { id: 'sign-lib-dir', x: 450, y: 240, type: 'sign', label: 'CAMPUS BULLETIN' },
      { id: 'bike-lib', x: 450, y: 340, type: 'bike' },
    ],
    interactables: [
      {
        id: 'npc-jordan',
        type: 'npc',
        name: 'Jordan Rivera',
        subtext: 'Sophomore Biology • Urgent email lockout',
        position: { x: 250, y: 275 },
        interactionRadius: 55,
        actionPrompt: 'TALK TO JORDAN [MISSION 01]',
        missionId: 'mission-01-email',
        npcId: 'npc-jordan',
        iconType: 'user',
      },
      {
        id: 'info-notice-board',
        type: 'info',
        name: 'CAMPUS SECURITY NOTICE',
        subtext: 'Security Bulletin',
        position: { x: 450, y: 240 },
        interactionRadius: 50,
        actionPrompt: 'READ SECURITY ADVISORY',
        iconType: 'folder',
      },
      {
        id: 'info-study-term',
        type: 'terminal-mentor',
        name: 'DIGITAL COMMONS TERMINAL',
        subtext: 'Sandboxed Ingest Terminal',
        position: { x: 130, y: 245 },
        interactionRadius: 50,
        actionPrompt: 'EXAMINE COMMONS TERMINAL',
        iconType: 'cpu',
      },
    ],
    collisionBoxes: [
      { id: 'col-lib', x: 80, y: 40, w: 340, h: 170 },
      { id: 'col-lib-desk', x: 110, y: 235, w: 40, h: 25 },
    ],
    exits: [
      {
        id: 'exit-lib-to-union',
        name: 'CAMPUS WALKWAY',
        label: 'CAMPUS PATHWAY → STUDENT UNION',
        targetAreaId: 'campus-student-union',
        position: { x: 730, y: 280 },
        targetSpawnPoint: { x: 90, y: 280 },
        direction: 'right',
        requiredMissionId: 'mission-01-email',
        lockedMessage: 'CAMPUS PATH LOCKED: Help Jordan investigate the urgent email incident first!',
      },
    ],
  },

  // =========================================================================
  // CAMPUS AREA 02: STUDENT UNION & CYBER CAFE
  // =========================================================================
  'campus-student-union': {
    id: 'campus-student-union',
    locationId: 'campus',
    name: 'STUDENT UNION & CYBER CAFE',
    subtitle: 'Campus Central Quad • Social Hub & Wireless Perimeter',
    areaCode: 'SEC-SU-02',
    width: 780,
    height: 540,
    spawnPoint: { x: 90, y: 280 },
    theme: {
      groundColor: '#254e32',
      gridColor: '#305e3e',
      pathColor: '#d6c9b3',
      pathBorder: '#968872',
      ambientGlow: 'rgba(52, 211, 153, 0.08)',
    },
    pathType: 'union-patio',
    primaryMissionId: 'mission-03-wifi',
    unresolvedObjective: 'Talk to Elena Rostova at the Cyber Cafe patio regarding the rogue Wi-Fi',
    resolvedObjective: 'Wi-Fi secured! Follow the South walkway to the Engineering Lab',
    buildings: [
      {
        id: 'bld-student-center',
        name: 'STUDENT UNION',
        label: 'STUDENT UNION & CYBER CAFE',
        code: 'BLD-02',
        x: 220,
        y: 40,
        w: 340,
        h: 175,
        doorPos: { x: 390, y: 215 },
        accentColor: '#34d399',
      },
    ],
    props: [
      // Rogue Wi-Fi antenna and amenities
      { id: 'wifi-node', x: 490, y: 240, type: 'wifi', label: '802.11 AP NODE' },
      { id: 'vending-su', x: 170, y: 230, type: 'vending' },
      { id: 'bike-su', x: 610, y: 230, type: 'bike' },
      // Cafe patio seating
      { id: 'bench-su-1', x: 270, y: 350, type: 'bench' },
      { id: 'bench-su-2', x: 510, y: 350, type: 'bench' },
      // Trees
      { id: 'tree-su-1', x: 60, y: 120, type: 'tree' },
      { id: 'tree-su-2', x: 720, y: 120, type: 'tree' },
      { id: 'tree-su-3', x: 60, y: 440, type: 'tree' },
      { id: 'tree-su-4', x: 720, y: 440, type: 'tree' },
      { id: 'tree-su-5', x: 230, y: 460, type: 'tree' },
      { id: 'tree-su-6', x: 550, y: 460, type: 'tree' },
      // Lamps
      { id: 'lamp-su-1', x: 210, y: 230, type: 'lamp' },
      { id: 'lamp-su-2', x: 570, y: 230, type: 'lamp' },
    ],
    interactables: [
      {
        id: 'npc-elena',
        type: 'npc',
        name: 'Elena Rostova',
        subtext: 'Research Fellow • Grant proposal on unencrypted Wi-Fi',
        position: { x: 390, y: 275 },
        interactionRadius: 55,
        actionPrompt: 'TALK TO ELENA [MISSION 03]',
        missionId: 'mission-03-wifi',
        npcId: 'npc-elena',
        iconType: 'user',
      },
      {
        id: 'info-rogue-wifi',
        type: 'info',
        name: 'ROGUE ACCESS POINT',
        subtext: 'Inspect Antenna Hardware',
        position: { x: 490, y: 240 },
        interactionRadius: 50,
        actionPrompt: 'INSPECT WI-FI TRANSMITTER',
        iconType: 'zap',
      },
    ],
    collisionBoxes: [
      { id: 'col-su', x: 220, y: 40, w: 340, h: 170 },
      { id: 'col-su-vending', x: 155, y: 225, w: 35, h: 25 },
    ],
    exits: [
      {
        id: 'exit-union-to-lib',
        name: 'CAMPUS WALKWAY',
        label: 'CAMPUS PATHWAY ← LIBRARY',
        targetAreaId: 'campus-library',
        position: { x: 40, y: 280 },
        targetSpawnPoint: { x: 690, y: 280 },
        direction: 'left',
      },
      {
        id: 'exit-union-to-eng',
        name: 'SOUTH WALKWAY',
        label: 'SOUTH WALKWAY ↓ ENGINEERING LAB',
        targetAreaId: 'campus-engineering-lab',
        position: { x: 390, y: 500 },
        targetSpawnPoint: { x: 390, y: 80 },
        direction: 'down',
        requiredMissionId: 'mission-03-wifi',
        lockedMessage: 'WALKWAY LOCKED: Resolve the rogue Wi-Fi threat at Student Union first!',
      },
    ],
  },

  // =========================================================================
  // CAMPUS AREA 03: ENGINEERING & CAD LAB [RM 204]
  // =========================================================================
  'campus-engineering-lab': {
    id: 'campus-engineering-lab',
    locationId: 'campus',
    name: 'ENGINEERING & CAD LAB [RM 204]',
    subtitle: 'Campus South Quad • Hardware Prototyping & Microcontrollers',
    areaCode: 'SEC-ENG-03',
    width: 780,
    height: 540,
    spawnPoint: { x: 390, y: 80 },
    theme: {
      groundColor: '#1e382b',
      gridColor: '#284d3c',
      pathColor: '#b8a994',
      pathBorder: '#7d6e5a',
      ambientGlow: 'rgba(251, 191, 36, 0.08)',
    },
    pathType: 'eng-walkway',
    primaryMissionId: 'mission-02-usb',
    unresolvedObjective: 'Talk to Marcus Chen outside Room 204 to isolate the suspicious USB drive',
    resolvedObjective: 'Hardware threat contained! Proceed East through the breezeway to SecOps Desk',
    buildings: [
      {
        id: 'bld-engineering',
        name: 'ENGINEERING LAB',
        label: 'HARDWARE & CAD LAB [RM 204]',
        code: 'BLD-03',
        x: 200,
        y: 310,
        w: 380,
        h: 180,
        doorPos: { x: 390, y: 310 },
        accentColor: '#fbbf24',
      },
    ],
    props: [
      // Electronic test bench & terminals
      { id: 'desk-eng', x: 270, y: 235, type: 'desk', label: 'AIR-GAPPED RIG' },
      { id: 'term-eng', x: 510, y: 235, type: 'terminal', label: 'CAD 204' },
      { id: 'sign-eng', x: 170, y: 235, type: 'sign', label: 'HARDWARE PROTOCOL' },
      // Trees on northern quad
      { id: 'tree-eng-1', x: 80, y: 110, type: 'tree' },
      { id: 'tree-eng-2', x: 230, y: 90, type: 'tree' },
      { id: 'tree-eng-3', x: 550, y: 90, type: 'tree' },
      { id: 'tree-eng-4', x: 700, y: 110, type: 'tree' },
      // Lamps
      { id: 'lamp-eng-1', x: 190, y: 230, type: 'lamp' },
      { id: 'lamp-eng-2', x: 590, y: 230, type: 'lamp' },
      // Benches
      { id: 'bench-eng-1', x: 110, y: 190, type: 'bench' },
      { id: 'bench-eng-2', x: 670, y: 190, type: 'bench' },
    ],
    interactables: [
      {
        id: 'npc-marcus',
        type: 'npc',
        name: 'Marcus Chen',
        subtext: 'Lab Proctor • Unlabeled USB drive found on desk',
        position: { x: 390, y: 235 },
        interactionRadius: 55,
        actionPrompt: 'TALK TO MARCUS [MISSION 02]',
        missionId: 'mission-02-usb',
        npcId: 'npc-marcus',
        iconType: 'user',
      },
      {
        id: 'info-dropped-usb',
        type: 'info',
        name: 'DROPPED USB ARTIFACT',
        subtext: 'Inspect Physical Casing',
        position: { x: 270, y: 235 },
        interactionRadius: 50,
        actionPrompt: 'INSPECT USB HARDWARE',
        iconType: 'zap',
      },
    ],
    collisionBoxes: [
      { id: 'col-eng', x: 200, y: 310, w: 380, h: 180 },
      { id: 'col-eng-desk', x: 250, y: 225, w: 45, h: 25 },
    ],
    exits: [
      {
        id: 'exit-eng-to-union',
        name: 'NORTH WALKWAY',
        label: 'NORTH WALKWAY ↑ STUDENT UNION',
        targetAreaId: 'campus-student-union',
        position: { x: 390, y: 40 },
        targetSpawnPoint: { x: 390, y: 440 },
        direction: 'up',
      },
      {
        id: 'exit-eng-to-sec',
        name: 'SECURE BREEZEWAY',
        label: 'SECURE BREEZEWAY → SECOPS DESK',
        targetAreaId: 'campus-secops-desk',
        position: { x: 740, y: 200 },
        targetSpawnPoint: { x: 90, y: 200 },
        direction: 'right',
        requiredMissionId: 'mission-02-usb',
        lockedMessage: 'BREEZEWAY LOCKED: Complete the BadUSB investigation with Marcus first!',
      },
    ],
  },

  // =========================================================================
  // CAMPUS AREA 04: SECOPS DESK & COMMAND HUB
  // =========================================================================
  'campus-secops-desk': {
    id: 'campus-secops-desk',
    locationId: 'campus',
    name: 'CAMPUS IT SECURITY OPERATIONS',
    subtitle: 'Campus East Wing • Central Threat Monitoring & Forensics',
    areaCode: 'SEC-SOC-04',
    width: 780,
    height: 540,
    spawnPoint: { x: 90, y: 200 },
    theme: {
      groundColor: '#172338',
      gridColor: '#20324e',
      pathColor: '#93a3b8',
      pathBorder: '#475569',
      ambientGlow: 'rgba(248, 113, 113, 0.08)',
    },
    pathType: 'secops-perimeter',
    unresolvedObjective: 'Access SecOps terminals: Forensics, Abilities Matrix, and the Gateway Console',
    resolvedObjective: 'All Campus perimeter incidents resolved! Access the Gateway Console to reach outer sectors',
    buildings: [
      {
        id: 'bld-secops',
        name: 'SECOPS DESK',
        label: 'CAMPUS IT SECURITY OPERATIONS',
        code: 'BLD-04',
        x: 210,
        y: 40,
        w: 360,
        h: 180,
        doorPos: { x: 390, y: 220 },
        accentColor: '#f87171',
      },
    ],
    props: [
      // Trees on borders
      { id: 'tree-sec-1', x: 60, y: 100, type: 'tree' },
      { id: 'tree-sec-2', x: 60, y: 380, type: 'tree' },
      { id: 'tree-sec-3', x: 720, y: 100, type: 'tree' },
      { id: 'tree-sec-4', x: 720, y: 380, type: 'tree' },
      // Lamps
      { id: 'lamp-sec-1', x: 190, y: 240, type: 'lamp' },
      { id: 'lamp-sec-2', x: 590, y: 240, type: 'lamp' },
      // Tactical desk row
      { id: 'desk-secops', x: 390, y: 420, type: 'desk', label: 'SOC CONSOLE ROW' },
    ],
    interactables: [
      {
        id: 'npc-chief-vance',
        type: 'npc',
        name: 'Chief Analyst Vance',
        subtext: 'Campus CISO • Perimeter defense briefing',
        position: { x: 390, y: 275 },
        interactionRadius: 55,
        actionPrompt: 'REPORT TO CHIEF VANCE',
        npcId: 'npc-chief-vance',
        iconType: 'user',
      },
      {
        id: 'station-evidence',
        type: 'terminal-evidence',
        name: 'FORENSIC EVIDENCE BOARD',
        subtext: 'Cataloged IOCs, Hashes & Artifacts',
        position: { x: 230, y: 410 },
        interactionRadius: 50,
        actionPrompt: 'OPEN EVIDENCE NOTEBOOK',
        iconType: 'folder',
      },
      {
        id: 'station-abilities',
        type: 'terminal-abilities',
        name: 'TACTICAL WORKSTATION',
        subtext: 'Cyber Abilities Matrix & Live Terminal',
        position: { x: 390, y: 410 },
        interactionRadius: 50,
        actionPrompt: 'OPEN CYBER ABILITIES MATRIX',
        iconType: 'zap',
      },
      {
        id: 'station-profile',
        type: 'terminal-profile',
        name: 'OPERATIVE ID TERMINAL',
        subtext: 'Digital Trust Telemetry & Clearance',
        position: { x: 550, y: 410 },
        interactionRadius: 50,
        actionPrompt: 'ACCESS OPERATIVE DOSSIER',
        iconType: 'user',
      },
      {
        id: 'station-mentor',
        type: 'terminal-mentor',
        name: 'CYBERMENTOR AI CORE UPLINK',
        subtext: 'Tactical Consultation & Debrief',
        position: { x: 390, y: 340 },
        interactionRadius: 50,
        actionPrompt: 'UPLINK TO CYBERMENTOR AI',
        iconType: 'cpu',
      },
      {
        id: 'station-world-map',
        type: 'terminal-world',
        name: 'CAMPUS GATEWAY CONSOLE',
        subtext: 'Access Macro Network Topology',
        position: { x: 580, y: 250 },
        interactionRadius: 50,
        actionPrompt: 'ACCESS NETWORK TOPOLOGY [WORLD MAP]',
        iconType: 'map',
      },
    ],
    collisionBoxes: [
      { id: 'col-sec', x: 210, y: 40, w: 360, h: 175 },
      { id: 'col-sec-row', x: 200, y: 400, w: 380, h: 25 },
    ],
    exits: [
      {
        id: 'exit-sec-to-eng',
        name: 'SECURE BREEZEWAY',
        label: 'BREEZEWAY ← ENGINEERING LAB',
        targetAreaId: 'campus-engineering-lab',
        position: { x: 40, y: 200 },
        targetSpawnPoint: { x: 690, y: 200 },
        direction: 'left',
      },
    ],
  },

  // =========================================================================
  // SECTOR: DIGITAL CITY (FOCUSED DISTRICT: METRO TRANSIT PLAZA)
  // =========================================================================
  'digital-city-transit': {
    id: 'digital-city-transit',
    locationId: 'digital-city',
    name: 'METRO TRANSIT PLAZA & TICKETING',
    subtitle: 'Digital City • Public Transit & Payment Terminals',
    areaCode: 'SEC-METRO-01',
    width: 780,
    height: 540,
    spawnPoint: { x: 200, y: 310 },
    theme: {
      groundColor: '#0b1329',
      gridColor: '#172554',
      pathColor: '#1e293b',
      pathBorder: '#334155',
      ambientGlow: 'rgba(56, 189, 248, 0.12)',
    },
    pathType: 'city-plaza',
    primaryMissionId: 'mission-04-qr-scam',
    unresolvedObjective: 'Inspect the tampered transit QR payment sticker with Tariq Al-Mansoor',
    resolvedObjective: 'Transit QR attack contained! Access the City Gateway Console to return to Campus',
    buildings: [
      {
        id: 'bld-metro',
        name: 'METRO CENTRAL STATION',
        label: 'AUTOMATED TICKETING TERMINALS',
        code: 'BLD-METRO',
        x: 180,
        y: 40,
        w: 420,
        h: 175,
        doorPos: { x: 390, y: 215 },
        accentColor: '#38bdf8',
      },
    ],
    props: [
      { id: 'term-kiosk-1', x: 280, y: 235, type: 'terminal', label: 'TICKET KIOSK 1' },
      { id: 'term-kiosk-2', x: 500, y: 235, type: 'terminal', label: 'TICKET KIOSK 2' },
      { id: 'sign-transit', x: 180, y: 235, type: 'sign', label: 'METRO FARE SCHEDULE' },
      { id: 'bench-city-1', x: 120, y: 350, type: 'bench' },
      { id: 'bench-city-2', x: 660, y: 350, type: 'bench' },
      { id: 'lamp-city-1', x: 110, y: 230, type: 'lamp' },
      { id: 'lamp-city-2', x: 670, y: 230, type: 'lamp' },
    ],
    interactables: [
      {
        id: 'npc-tariq',
        type: 'npc',
        name: 'Tariq Al-Mansoor',
        subtext: 'Commuter • Suspicious adhesive QR discount sticker',
        position: { x: 390, y: 275 },
        interactionRadius: 55,
        actionPrompt: 'TALK TO TARIQ [MISSION 04]',
        missionId: 'mission-04-qr-scam',
        npcId: 'npc-tariq',
        iconType: 'user',
      },
      {
        id: 'station-world-city',
        type: 'terminal-world',
        name: 'TRANSIT GATEWAY TERMINAL',
        subtext: 'Access Network Topology [World Map]',
        position: { x: 600, y: 245 },
        interactionRadius: 50,
        actionPrompt: 'ACCESS NETWORK TOPOLOGY',
        iconType: 'map',
      },
    ],
    collisionBoxes: [
      { id: 'col-metro', x: 180, y: 40, w: 420, h: 175 },
    ],
    exits: [],
  },

  // =========================================================================
  // SECTOR: HOME (FOCUSED RESIDENCE: HOME WORKSPACE & SMART IOT)
  // =========================================================================
  'home-residence': {
    id: 'home-residence',
    locationId: 'home',
    name: 'HOME RESIDENCE & SMART IOT LAB',
    subtitle: 'Private Residence • Personal IoT Gateway & Local Perimeter',
    areaCode: 'SEC-HOME-01',
    width: 780,
    height: 540,
    spawnPoint: { x: 390, y: 270 },
    theme: {
      groundColor: '#1e1b4b',
      gridColor: '#312e81',
      pathColor: '#3730a3',
      pathBorder: '#4338ca',
      ambientGlow: 'rgba(129, 140, 248, 0.1)',
    },
    pathType: 'home-interior',
    unresolvedObjective: 'Verify home IoT devices and private network perimeter settings',
    resolvedObjective: 'Home network secured! Use the Gateway Console to navigate sectors',
    buildings: [
      {
        id: 'bld-home',
        name: 'HOME WORKSPACE',
        label: 'PERSONAL DIAGNOSTIC LAB',
        code: 'BLD-HOME',
        x: 180,
        y: 40,
        w: 420,
        h: 175,
        doorPos: { x: 390, y: 215 },
        accentColor: '#818cf8',
      },
    ],
    props: [
      { id: 'desk-home', x: 300, y: 240, type: 'desk', label: 'PERSONAL WORKSTATION' },
      { id: 'wifi-home', x: 480, y: 240, type: 'wifi', label: 'WPA3 ROUTER' },
    ],
    interactables: [
      {
        id: 'station-mentor-home',
        type: 'terminal-mentor',
        name: 'CYBERMENTOR HOME RELAY',
        subtext: 'Tactical Consultation',
        position: { x: 390, y: 330 },
        interactionRadius: 50,
        actionPrompt: 'CONSULT CYBERMENTOR AI',
        iconType: 'cpu',
      },
      {
        id: 'station-world-home',
        type: 'terminal-world',
        name: 'HOME VPN GATEWAY',
        subtext: 'Connect to Network Topology',
        position: { x: 560, y: 245 },
        interactionRadius: 50,
        actionPrompt: 'ACCESS NETWORK TOPOLOGY',
        iconType: 'map',
      },
    ],
    collisionBoxes: [
      { id: 'col-home', x: 180, y: 40, w: 420, h: 175 },
    ],
    exits: [],
  },

  // =========================================================================
  // SECTOR: CYBERCORP (ENTERPRISE SOC & SIEM CENTER)
  // =========================================================================
  'cybercorp-soc': {
    id: 'cybercorp-soc',
    locationId: 'cybercorp',
    name: 'CYBERCORP ENTERPRISE SOC',
    subtitle: 'Corporate Headquarters • Tier-3 Threat Hunting Vault',
    areaCode: 'SEC-CORP-01',
    width: 780,
    height: 540,
    spawnPoint: { x: 390, y: 280 },
    theme: {
      groundColor: '#0a0f1d',
      gridColor: '#0f172a',
      pathColor: '#1e293b',
      pathBorder: '#334155',
      ambientGlow: 'rgba(59, 130, 246, 0.12)',
    },
    pathType: 'corp-vault',
    unresolvedObjective: 'Monitor active directory enterprise event feeds and SIEM alerts',
    resolvedObjective: 'Enterprise telemetry synchronized with CyberMentor command',
    buildings: [
      {
        id: 'bld-corp',
        name: 'CYBERCORP TOWER',
        label: 'ENTERPRISE SECURITY OPERATIONS',
        code: 'BLD-CORP',
        x: 180,
        y: 40,
        w: 420,
        h: 175,
        doorPos: { x: 390, y: 215 },
        accentColor: '#60a5fa',
      },
    ],
    props: [
      { id: 'desk-corp-1', x: 260, y: 240, type: 'desk', label: 'SIEM CONSOLE' },
      { id: 'desk-corp-2', x: 520, y: 240, type: 'desk', label: 'FIREWALL ROW' },
    ],
    interactables: [
      {
        id: 'station-world-corp',
        type: 'terminal-world',
        name: 'ENTERPRISE GATEWAY',
        subtext: 'Access Macro Network Topology',
        position: { x: 560, y: 245 },
        interactionRadius: 50,
        actionPrompt: 'ACCESS NETWORK TOPOLOGY',
        iconType: 'map',
      },
    ],
    collisionBoxes: [
      { id: 'col-corp', x: 180, y: 40, w: 420, h: 175 },
    ],
    exits: [],
  },

  // =========================================================================
  // SECTOR: THE INTERNET (AUTONOMOUS SYSTEMS CORE)
  // =========================================================================
  'internet-backbone': {
    id: 'internet-backbone',
    locationId: 'the-internet',
    name: 'TIER-1 AUTONOMOUS SYSTEMS BACKBONE',
    subtitle: 'The Open Internet • Root DNS Mesh & Global BGP Routing',
    areaCode: 'SEC-NET-01',
    width: 780,
    height: 540,
    spawnPoint: { x: 390, y: 280 },
    theme: {
      groundColor: '#05131e',
      gridColor: '#0c2236',
      pathColor: '#082f49',
      pathBorder: '#0284c7',
      ambientGlow: 'rgba(34, 211, 238, 0.12)',
    },
    pathType: 'internet-mesh',
    unresolvedObjective: 'Inspect global BGP peering routes and root DNS beacon integrity',
    resolvedObjective: 'Global network routes verified. Access gateway to return',
    buildings: [
      {
        id: 'bld-internet',
        name: 'BGP CORE EXCHANGE',
        label: 'TRANSIT & ROUTING EXCHANGE',
        code: 'BLD-NET',
        x: 180,
        y: 40,
        w: 420,
        h: 175,
        doorPos: { x: 390, y: 215 },
        accentColor: '#22d3ee',
      },
    ],
    props: [
      { id: 'term-net-1', x: 280, y: 240, type: 'terminal', label: 'BGP PEERING NODE' },
      { id: 'term-net-2', x: 500, y: 240, type: 'terminal', label: 'DNS ROOT BEACON' },
    ],
    interactables: [
      {
        id: 'station-world-net',
        type: 'terminal-world',
        name: 'BACKBONE ROUTER GATEWAY',
        subtext: 'Access Network Topology',
        position: { x: 560, y: 245 },
        interactionRadius: 50,
        actionPrompt: 'ACCESS NETWORK TOPOLOGY',
        iconType: 'map',
      },
    ],
    collisionBoxes: [
      { id: 'col-net', x: 180, y: 40, w: 420, h: 175 },
    ],
    exits: [],
  },
};

/**
 * Return the sequential campus areas in progression order
 */
export const CAMPUS_AREA_SEQUENCE = [
  'campus-library',
  'campus-student-union',
  'campus-engineering-lab',
  'campus-secops-desk',
];

/**
 * Check if a campus area is unlocked given the completed missions
 */
export function isAreaUnlocked(areaId: string, completedMissions: string[]): boolean {
  switch (areaId) {
    case 'campus-library':
      return true; // Area 01 is always unlocked!
    case 'campus-student-union':
      // Unlocks when library incident (mission-01-email) is completed
      return completedMissions.includes('mission-01-email');
    case 'campus-engineering-lab':
      // Unlocks when student union incident (mission-03-wifi) is completed
      return completedMissions.includes('mission-03-wifi');
    case 'campus-secops-desk':
      // Unlocks when engineering incident (mission-02-usb) is completed
      return completedMissions.includes('mission-02-usb');
    default:
      return true;
  }
}

/**
 * Determine the initial or highest unlocked area for a location
 */
export function getInitialAreaForLocation(
  locationId: LocationId,
  completedMissions: string[] = []
): PlayableArea {
  if (locationId === 'campus') {
    // Check saved preference in localStorage
    const savedArea = typeof window !== 'undefined' ? localStorage.getItem('cybermentor_active_campus_area') : null;
    if (savedArea && PLAYABLE_AREAS[savedArea] && isAreaUnlocked(savedArea, completedMissions)) {
      return PLAYABLE_AREAS[savedArea];
    }

    // Default to progression: start at library, or progress to next incomplete incident
    if (!completedMissions.includes('mission-01-email')) {
      return PLAYABLE_AREAS['campus-library'];
    }
    if (!completedMissions.includes('mission-03-wifi')) {
      return PLAYABLE_AREAS['campus-student-union'];
    }
    if (!completedMissions.includes('mission-02-usb')) {
      return PLAYABLE_AREAS['campus-engineering-lab'];
    }
    return PLAYABLE_AREAS['campus-secops-desk'];
  }

  if (locationId === 'digital-city') return PLAYABLE_AREAS['digital-city-transit'];
  if (locationId === 'home') return PLAYABLE_AREAS['home-residence'];
  if (locationId === 'cybercorp') return PLAYABLE_AREAS['cybercorp-soc'];
  if (locationId === 'the-internet') return PLAYABLE_AREAS['internet-backbone'];

  return PLAYABLE_AREAS['campus-library'];
}
