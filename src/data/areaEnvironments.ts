import { PlayableArea, WorldPosition, SavedWorldLocation, Direction } from '../types/world';
import { LocationId, PlayerState } from '../types';

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
    spawnPoint: { x: 230, y: 310 },
    theme: {
      groundColor: '#2b5336',
      gridColor: '#366343',
      pathColor: '#d6c7b2',
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
        x: 60,
        y: 35,
        w: 340,
        h: 175,
        doorPos: { x: 230, y: 210 },
        accentColor: '#38bdf8',
      },
    ],
    props: [
      // Shady boundary trees along north and courtyard edges
      { id: 'tree-lib-1', x: 440, y: 80, type: 'tree' },
      { id: 'tree-lib-2', x: 570, y: 80, type: 'tree' },
      { id: 'tree-lib-3', x: 700, y: 90, type: 'tree' },
      { id: 'tree-lib-4', x: 45, y: 440, type: 'tree' },
      { id: 'tree-lib-5', x: 460, y: 450, type: 'tree' },
      { id: 'tree-lib-6', x: 720, y: 450, type: 'tree' },
      // Planters flanking library entrance
      { id: 'planter-lib-1', x: 130, y: 220, type: 'planter' },
      { id: 'planter-lib-2', x: 330, y: 220, type: 'planter' },
      // Courtyard seating along park lawn
      { id: 'bench-lib-1', x: 120, y: 370, type: 'bench' },
      { id: 'bench-lib-2', x: 340, y: 370, type: 'bench' },
      // Vintage street lamps lighting paths
      { id: 'lamp-lib-1', x: 90, y: 245, type: 'lamp' },
      { id: 'lamp-lib-2', x: 370, y: 245, type: 'lamp' },
      { id: 'lamp-lib-3', x: 580, y: 245, type: 'lamp' },
      // Notice board and bike rack
      { id: 'sign-lib-dir', x: 470, y: 225, type: 'sign', label: 'CAMPUS BULLETIN' },
      { id: 'bike-lib', x: 470, y: 360, type: 'bike' },
    ],
    interactables: [
      {
        id: 'npc-jordan',
        type: 'npc',
        name: 'Jordan Rivera',
        subtext: 'Sophomore Biology • Urgent email lockout',
        position: { x: 230, y: 250 },
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
        position: { x: 470, y: 225 },
        interactionRadius: 50,
        actionPrompt: 'READ SECURITY ADVISORY',
        iconType: 'folder',
      },
      {
        id: 'info-study-term',
        type: 'terminal-mentor',
        name: 'DIGITAL COMMONS TERMINAL',
        subtext: 'Sandboxed Ingest Terminal',
        position: { x: 620, y: 225 },
        interactionRadius: 50,
        actionPrompt: 'EXAMINE COMMONS TERMINAL',
        iconType: 'cpu',
      },
    ],
    collisionBoxes: [
      { id: 'col-lib', x: 60, y: 35, w: 340, h: 175 },
      { id: 'col-lib-term', x: 605, y: 215, w: 30, h: 25 },
    ],
    exits: [
      {
        id: 'exit-lib-to-union',
        name: 'CAMPUS WALKWAY',
        label: 'CAMPUS PATHWAY → STUDENT UNION',
        targetAreaId: 'campus-student-union',
        position: { x: 740, y: 300 },
        targetSpawnPoint: { x: 80, y: 300 },
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
    spawnPoint: { x: 80, y: 300 },
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
        y: 35,
        w: 340,
        h: 175,
        doorPos: { x: 390, y: 210 },
        accentColor: '#34d399',
      },
    ],
    props: [
      // Rogue Wi-Fi pole & amenities off the thoroughfare
      { id: 'wifi-node', x: 530, y: 230, type: 'wifi', label: '802.11 AP NODE' },
      { id: 'vending-su', x: 160, y: 230, type: 'vending' },
      { id: 'bike-su', x: 620, y: 230, type: 'bike' },
      // Cafe patio seating on outer grass rim
      { id: 'bench-su-1', x: 230, y: 390, type: 'bench' },
      { id: 'bench-su-2', x: 550, y: 390, type: 'bench' },
      // Planters flanking entrance
      { id: 'planter-su-1', x: 290, y: 220, type: 'planter' },
      { id: 'planter-su-2', x: 490, y: 220, type: 'planter' },
      // Trees
      { id: 'tree-su-1', x: 70, y: 110, type: 'tree' },
      { id: 'tree-su-2', x: 710, y: 110, type: 'tree' },
      { id: 'tree-su-3', x: 70, y: 440, type: 'tree' },
      { id: 'tree-su-4', x: 710, y: 440, type: 'tree' },
      { id: 'tree-su-5', x: 220, y: 470, type: 'tree' },
      { id: 'tree-su-6', x: 560, y: 470, type: 'tree' },
      // Lamps
      { id: 'lamp-su-1', x: 220, y: 235, type: 'lamp' },
      { id: 'lamp-su-2', x: 560, y: 235, type: 'lamp' },
    ],
    interactables: [
      {
        id: 'npc-elena',
        type: 'npc',
        name: 'Elena Rostova',
        subtext: 'Research Fellow • Grant proposal on unencrypted Wi-Fi',
        position: { x: 390, y: 250 },
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
        position: { x: 530, y: 230 },
        interactionRadius: 50,
        actionPrompt: 'INSPECT WI-FI TRANSMITTER',
        iconType: 'zap',
      },
    ],
    collisionBoxes: [
      { id: 'col-su', x: 220, y: 35, w: 340, h: 175 },
      { id: 'col-su-vending', x: 145, y: 220, w: 35, h: 25 },
    ],
    exits: [
      {
        id: 'exit-union-to-lib',
        name: 'CAMPUS WALKWAY',
        label: 'CAMPUS PATHWAY ← LIBRARY',
        targetAreaId: 'campus-library',
        position: { x: 40, y: 300 },
        targetSpawnPoint: { x: 700, y: 300 },
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
        y: 325,
        w: 380,
        h: 180,
        doorPos: { x: 390, y: 325 },
        accentColor: '#fbbf24',
      },
    ],
    props: [
      // Electronic test bench & terminals flanking plaza
      { id: 'desk-eng', x: 230, y: 220, type: 'desk', label: 'AIR-GAPPED RIG' },
      { id: 'term-eng', x: 550, y: 220, type: 'terminal', label: 'CAD 204' },
      { id: 'sign-eng', x: 150, y: 220, type: 'sign', label: 'HARDWARE PROTOCOL' },
      // Planters flanking north door of engineering
      { id: 'planter-eng-1', x: 280, y: 310, type: 'planter' },
      { id: 'planter-eng-2', x: 500, y: 310, type: 'planter' },
      // Trees on northern quad lawn
      { id: 'tree-eng-1', x: 80, y: 110, type: 'tree' },
      { id: 'tree-eng-2', x: 220, y: 80, type: 'tree' },
      { id: 'tree-eng-3', x: 560, y: 80, type: 'tree' },
      { id: 'tree-eng-4', x: 700, y: 110, type: 'tree' },
      // Lamps
      { id: 'lamp-eng-1', x: 180, y: 220, type: 'lamp' },
      { id: 'lamp-eng-2', x: 600, y: 220, type: 'lamp' },
      // Benches
      { id: 'bench-eng-1', x: 100, y: 260, type: 'bench' },
      { id: 'bench-eng-2', x: 680, y: 260, type: 'bench' },
    ],
    interactables: [
      {
        id: 'npc-marcus',
        type: 'npc',
        name: 'Marcus Chen',
        subtext: 'Lab Proctor • Unlabeled USB drive found on desk',
        position: { x: 390, y: 275 },
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
        position: { x: 230, y: 220 },
        interactionRadius: 50,
        actionPrompt: 'INSPECT USB HARDWARE',
        iconType: 'zap',
      },
    ],
    collisionBoxes: [
      { id: 'col-eng', x: 200, y: 325, w: 380, h: 180 },
      { id: 'col-eng-desk', x: 215, y: 210, w: 35, h: 25 },
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
        position: { x: 740, y: 210 },
        targetSpawnPoint: { x: 80, y: 210 },
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
    spawnPoint: { x: 80, y: 210 },
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
        y: 35,
        w: 360,
        h: 180,
        doorPos: { x: 390, y: 215 },
        accentColor: '#f87171',
      },
    ],
    props: [
      // Border foliage
      { id: 'tree-sec-1', x: 60, y: 90, type: 'tree' },
      { id: 'tree-sec-2', x: 60, y: 390, type: 'tree' },
      { id: 'tree-sec-3', x: 720, y: 90, type: 'tree' },
      { id: 'tree-sec-4', x: 720, y: 390, type: 'tree' },
      // Entrance security lamps
      { id: 'lamp-sec-1', x: 190, y: 235, type: 'lamp' },
      { id: 'lamp-sec-2', x: 590, y: 235, type: 'lamp' },
      // Security planters
      { id: 'planter-sec-1', x: 280, y: 220, type: 'planter' },
      { id: 'planter-sec-2', x: 500, y: 220, type: 'planter' },
      // Tactical SOC row
      { id: 'desk-secops', x: 390, y: 440, type: 'desk', label: 'SOC CONSOLE ROW' },
    ],
    interactables: [
      {
        id: 'npc-chief-vance',
        type: 'npc',
        name: 'Chief Analyst Vance',
        subtext: 'Campus CISO • Perimeter defense briefing',
        position: { x: 390, y: 250 },
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
        position: { x: 220, y: 410 },
        interactionRadius: 50,
        actionPrompt: 'OPEN EVIDENCE NOTEBOOK',
        iconType: 'folder',
      },
      {
        id: 'station-abilities',
        type: 'terminal-abilities',
        name: 'TACTICAL WORKSTATION',
        subtext: 'Cyber Abilities Matrix & Live Terminal',
        position: { x: 340, y: 410 },
        interactionRadius: 50,
        actionPrompt: 'OPEN CYBER ABILITIES MATRIX',
        iconType: 'zap',
      },
      {
        id: 'station-profile',
        type: 'terminal-profile',
        name: 'OPERATIVE ID TERMINAL',
        subtext: 'Digital Trust Telemetry & Clearance',
        position: { x: 440, y: 410 },
        interactionRadius: 50,
        actionPrompt: 'ACCESS OPERATIVE DOSSIER',
        iconType: 'user',
      },
      {
        id: 'station-mentor',
        type: 'terminal-mentor',
        name: 'CYBERMENTOR AI CORE UPLINK',
        subtext: 'Tactical Consultation & Debrief',
        position: { x: 560, y: 410 },
        interactionRadius: 50,
        actionPrompt: 'UPLINK TO CYBERMENTOR AI',
        iconType: 'cpu',
      },
      {
        id: 'station-world-map',
        type: 'terminal-world',
        name: 'CAMPUS GATEWAY CONSOLE',
        subtext: 'Access Macro Network Topology',
        position: { x: 620, y: 235 },
        interactionRadius: 50,
        actionPrompt: 'ACCESS NETWORK TOPOLOGY [WORLD MAP]',
        iconType: 'map',
      },
    ],
    collisionBoxes: [
      { id: 'col-sec', x: 210, y: 35, w: 360, h: 175 },
      { id: 'col-sec-row', x: 190, y: 425, w: 400, h: 25 },
    ],
    exits: [
      {
        id: 'exit-sec-to-eng',
        name: 'SECURE BREEZEWAY',
        label: 'BREEZEWAY ← ENGINEERING LAB',
        targetAreaId: 'campus-engineering-lab',
        position: { x: 40, y: 210 },
        targetSpawnPoint: { x: 700, y: 210 },
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
      // Unlocks when library incident is completed or either incident is active
      return (
        completedMissions.includes('mission-01-email') ||
        completedMissions.includes('mission-03-wifi') ||
        completedMissions.includes('mission-02-usb')
      );
    case 'campus-secops-desk':
      // Unlocks when intermediate incidents are cleared
      return (
        completedMissions.includes('mission-02-usb') ||
        completedMissions.includes('mission-03-wifi') ||
        completedMissions.includes('mission-04-qr-scam')
      );
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

/**
 * Check if a 2D coordinate is safe and walkable within an area
 */
export function isPositionWalkable(x: number, y: number, area: PlayableArea): boolean {
  // 1. Boundary check: must be inside playable map bounds with padding
  const boundaryPadding = 24;
  const topPadding = 32;
  if (
    x < boundaryPadding ||
    x > area.width - boundaryPadding ||
    y < topPadding ||
    y > area.height - boundaryPadding
  ) {
    return false;
  }

  // 2. Collision boxes check (buildings, obstacles, trees, perimeter fences)
  const playerRadius = 14;
  for (const box of area.collisionBoxes) {
    if (
      x + playerRadius > box.x &&
      x - playerRadius < box.x + box.w &&
      y + playerRadius > box.y &&
      y - playerRadius < box.y + box.h
    ) {
      return false;
    }
  }

  // 3. Buildings check (ensure coordinates are outside building walls)
  for (const bld of area.buildings) {
    if (
      x + playerRadius > bld.x &&
      x - playerRadius < bld.x + bld.w &&
      y + playerRadius > bld.y &&
      y - playerRadius < bld.y + bld.h
    ) {
      return false;
    }
  }

  // 4. Props check (trees, solid desks, heavy equipment)
  for (const prop of area.props) {
    let propRadius = 12;
    if (prop.type === 'tree') propRadius = 22;
    else if (prop.type === 'desk') propRadius = 20;
    else if (prop.type === 'terminal' || prop.type === 'wifi') propRadius = 16;

    const dx = x - prop.x;
    const dy = y - prop.y;
    if (dx * dx + dy * dy < propRadius * propRadius) {
      return false;
    }
  }

  // 5. NPC proximity check (don't place inside NPC sprite collision)
  for (const item of area.interactables) {
    if (item.type === 'npc' && item.position) {
      const dx = x - item.position.x;
      const dy = y - item.position.y;
      if (dx * dx + dy * dy < 22 * 22) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Find the nearest safe walkable position to target coordinates.
 * If the exact position is blocked by an obstacle or wall,
 * spirals outward to locate the closest open tile.
 */
export function getSafeWalkablePosition(
  pos: WorldPosition,
  area: PlayableArea
): WorldPosition {
  if (isPositionWalkable(pos.x, pos.y, area)) {
    return { x: Math.round(pos.x), y: Math.round(pos.y) };
  }

  // Concentric radial search around the target coordinates
  const searchDistances = [10, 18, 28, 38, 50, 65, 85, 110, 140, 180];
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];

  for (const dist of searchDistances) {
    for (const deg of angles) {
      const rad = (deg * Math.PI) / 180;
      const testX = Math.round(pos.x + Math.cos(rad) * dist);
      const testY = Math.round(pos.y + Math.sin(rad) * dist);
      if (isPositionWalkable(testX, testY, area)) {
        return { x: testX, y: testY };
      }
    }
  }

  // Fallback to the area's design spawn point which is guaranteed walkable
  return { ...area.spawnPoint };
}

const GLOBAL_WORLD_POS_KEY = 'cybermentor_saved_world_position';
const SECTOR_WORLD_POS_PREFIX = 'cybermentor_sector_pos_';

/**
 * Persist the player's world location into browser storage
 */
export function saveWorldLocationToStorage(savedState: SavedWorldLocation): void {
  if (typeof window === 'undefined') return;
  try {
    const serialized = JSON.stringify(savedState);
    localStorage.setItem(GLOBAL_WORLD_POS_KEY, serialized);
    localStorage.setItem(`${SECTOR_WORLD_POS_PREFIX}${savedState.locationId}`, serialized);
    if (savedState.locationId === 'campus') {
      localStorage.setItem('cybermentor_active_campus_area', savedState.areaId);
    }
  } catch {}
}

/**
 * Retrieve the globally saved world location if available
 */
export function getSavedWorldLocationFromStorage(): SavedWorldLocation | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(GLOBAL_WORLD_POS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedWorldLocation;
  } catch {
    return null;
  }
}

/**
 * Retrieve the saved position for a specific sector, checking player state and storage.
 * Resolves to a safe walkable coordinate.
 */
export function getSavedPositionForSector(
  locationId: LocationId,
  player?: PlayerState
): SavedWorldLocation | null {
  // 1. Check player.lastWorldLocation if it matches this location
  if (player?.lastWorldLocation && player.lastWorldLocation.locationId === locationId) {
    const area = PLAYABLE_AREAS[player.lastWorldLocation.areaId];
    if (area && area.locationId === locationId) {
      const safePos = getSafeWalkablePosition(player.lastWorldLocation.position, area);
      return {
        locationId,
        areaId: area.id,
        position: safePos,
        direction: player.lastWorldLocation.direction,
        timestamp: player.lastWorldLocation.timestamp,
      };
    }
  }

  // 2. Check player.savedSectorLocations
  if (player?.savedSectorLocations?.[locationId]) {
    const entry = player.savedSectorLocations[locationId]!;
    const area = PLAYABLE_AREAS[entry.areaId];
    if (area && area.locationId === locationId) {
      const safePos = getSafeWalkablePosition(entry.position, area);
      return {
        locationId,
        areaId: area.id,
        position: safePos,
        direction: entry.direction,
        timestamp: entry.timestamp,
      };
    }
  }

  // 3. Check localStorage per-sector
  if (typeof window !== 'undefined') {
    try {
      const rawSector = localStorage.getItem(`${SECTOR_WORLD_POS_PREFIX}${locationId}`);
      if (rawSector) {
        const parsed = JSON.parse(rawSector) as SavedWorldLocation;
        const area = PLAYABLE_AREAS[parsed.areaId];
        if (area && area.locationId === locationId) {
          const rawPos = parsed.position || { x: (parsed as any).x, y: (parsed as any).y };
          const safePos = getSafeWalkablePosition(rawPos, area);
          return {
            locationId,
            areaId: area.id,
            position: safePos,
            direction: parsed.direction,
            timestamp: parsed.timestamp,
          };
        }
      }

      // 4. Check global saved position if location matches
      const rawGlobal = localStorage.getItem(GLOBAL_WORLD_POS_KEY);
      if (rawGlobal) {
        const parsed = JSON.parse(rawGlobal) as SavedWorldLocation;
        if (parsed.locationId === locationId) {
          const area = PLAYABLE_AREAS[parsed.areaId];
          if (area && area.locationId === locationId) {
            const rawPos = parsed.position || { x: (parsed as any).x, y: (parsed as any).y };
            const safePos = getSafeWalkablePosition(rawPos, area);
            return {
              locationId,
              areaId: area.id,
              position: safePos,
              direction: parsed.direction,
              timestamp: parsed.timestamp,
            };
          }
        }
      }
    } catch {}
  }

  return null;
}

/**
 * Return the natural world location and safe position where a mission takes place
 */
export function getDefaultMissionWorldLocation(missionId: string): SavedWorldLocation | null {
  switch (missionId) {
    case 'mission-01-email':
      return {
        locationId: 'campus',
        areaId: 'campus-library',
        position: { x: 230, y: 280 },
        direction: 'up',
      };
    case 'mission-02-usb':
      return {
        locationId: 'campus',
        areaId: 'campus-engineering-lab',
        position: { x: 290, y: 280 },
        direction: 'up',
      };
    case 'mission-03-wifi':
      return {
        locationId: 'campus',
        areaId: 'campus-student-union',
        position: { x: 490, y: 285 },
        direction: 'up',
      };
    case 'mission-04-qr-scam':
      return {
        locationId: 'digital-city',
        areaId: 'digital-city-transit',
        position: { x: 390, y: 310 },
        direction: 'up',
      };
    default:
      return null;
  }
}

