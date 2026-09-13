import React from 'react';
import { MangaBackgroundScene, MangaVisualClue } from '../../../types/manga';

// Shared Manga Halftone / Screentone Pattern Defs
export const MangaScreentoneDefs: React.FC = () => (
  <defs>
    {/* Fine Halftone Dot Pattern */}
    <pattern id="seinen-dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="#0f172a" opacity="0.25" />
    </pattern>
    {/* Dense Screentone Pattern */}
    <pattern id="seinen-dense-dots" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.2" fill="#0f172a" opacity="0.4" />
    </pattern>
    {/* Diagonal Cross-Hatch Pattern */}
    <pattern id="seinen-hatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="10" stroke="#0f172a" strokeWidth="1.2" opacity="0.3" />
    </pattern>
    {/* Dramatic Ink Wash Gradient */}
    <linearGradient id="ink-vignette" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#090d16" stopOpacity="0.8" />
      <stop offset="50%" stopColor="#090d16" stopOpacity="0.1" />
      <stop offset="100%" stopColor="#090d16" stopOpacity="0.95" />
    </linearGradient>
    {/* Phone Screen Cyan Ray Gradient */}
    <linearGradient id="phone-glow-beam" x1="0.5" y1="1" x2="0.5" y2="0">
      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
      <stop offset="40%" stopColor="#0284c7" stopOpacity="0.3" />
      <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
    </linearGradient>
    {/* CyberMentor Energy Shield Gradient */}
    <linearGradient id="shield-matrix-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.85" />
      <stop offset="100%" stopColor="#0284c7" stopOpacity="0.95" />
    </linearGradient>
  </defs>
);

// =========================================================================
// 1. SCENE: ESTABLISHING SHOT // SAURAV WALKING ON CAMPUS
// Cinematic full-body walking shot with architectural one-point perspective,
// brick pavers, campus buildings, screentone trees, headphones around neck
// =========================================================================
export const SceneEstablishingWalk: React.FC<{
  studentName?: string;
  backgroundScene?: MangaBackgroundScene | string;
}> = ({ studentName = 'Saurav', backgroundScene = 'campus-cafeteria' }) => {
  return (
    <svg viewBox="0 0 900 450" preserveAspectRatio="xMidYMid slice" className="w-full h-full select-none">
      <MangaScreentoneDefs />
      {/* Sky & Distant Campus Skyline */}
      <rect width="900" height="450" fill="#0f172a" />
      <rect width="900" height="230" fill="url(#seinen-dots)" />

      {/* University Main Hall Architecture (Deep One-Point Perspective) */}
      <polygon points="0,0 380,180 380,270 0,380" fill="#1e293b" stroke="#090d16" strokeWidth="2.5" />
      {/* Windows on left building */}
      <polygon points="40,60 120,105 120,180 40,160" fill="#334155" stroke="#090d16" strokeWidth="2" />
      <polygon points="150,120 220,155 220,210 150,195" fill="#334155" stroke="#090d16" strokeWidth="2" />
      <polygon points="240,165 300,195 300,235 240,225" fill="#334155" stroke="#090d16" strokeWidth="2" />

      {/* Right University Library Wing */}
      <polygon points="900,0 520,180 520,270 900,380" fill="#1e293b" stroke="#090d16" strokeWidth="2.5" />
      <polygon points="860,60 780,105 780,180 860,160" fill="#334155" stroke="#090d16" strokeWidth="2" />
      <polygon points="750,120 680,155 680,210 750,195" fill="#334155" stroke="#090d16" strokeWidth="2" />

      {/* Center Clocktower & Distant Trees in vanishing point */}
      <rect x="420" y="110" width="60" height="120" fill="#0f172a" stroke="#334155" strokeWidth="2" />
      <polygon points="410,110 450,60 490,110" fill="#090d16" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="450" cy="135" r="14" fill="#38bdf8" opacity="0.7" />
      <circle cx="390" cy="210" r="30" fill="#14532d" opacity="0.8" />
      <circle cx="510" cy="210" r="30" fill="#14532d" opacity="0.8" />

      {/* Ground Pavement & Perspective Lines converging at (450, 260) */}
      <polygon points="0,380 380,270 520,270 900,380 900,450 0,450" fill="#182032" stroke="#090d16" strokeWidth="2.5" />
      <line x1="450" y1="270" x2="100" y2="450" stroke="#334155" strokeWidth="2" strokeDasharray="6 4" />
      <line x1="450" y1="270" x2="320" y2="450" stroke="#334155" strokeWidth="2" />
      <line x1="450" y1="270" x2="580" y2="450" stroke="#334155" strokeWidth="2" />
      <line x1="450" y1="270" x2="800" y2="450" stroke="#334155" strokeWidth="2" strokeDasharray="6 4" />

      {/* Manga Screentone Floor Shadow */}
      <ellipse cx="460" cy="435" rx="90" ry="16" fill="url(#seinen-dense-dots)" />

      {/* SAURAV — FULL-BODY GROUNDED SEINEN MANGA PROTAGONIST IN MOTION */}
      <g transform="translate(380, 160)">
        {/* Shadow */}
        <ellipse cx="75" cy="275" rx="65" ry="12" fill="#090d16" opacity="0.7" />

        {/* Legs in walking stride */}
        {/* Back leg */}
        <path d="M60 170 L45 230 L38 270 L55 272 L65 240 L75 170 Z" fill="#0f172a" stroke="#090d16" strokeWidth="2.5" />
        {/* Sneaker back */}
        <polygon points="25,270 55,270 55,276 22,276" fill="#f8fafc" stroke="#090d16" strokeWidth="2" />

        {/* Front leg */}
        <path d="M80 170 L100 225 L115 265 L135 267 L115 235 L95 170 Z" fill="#1e293b" stroke="#090d16" strokeWidth="2.5" />
        {/* Sneaker front */}
        <polygon points="105,265 142,265 140,272 100,272" fill="#38bdf8" stroke="#090d16" strokeWidth="2" />

        {/* Backpack Strap across chest & bag on back */}
        <path d="M40 75 Q20 110 35 150 Q50 160 55 140 Z" fill="#090d16" stroke="#0284c7" strokeWidth="1.5" />
        <path d="M55 75 L85 130" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />

        {/* Tech Hoodie Body (Dark navy with sharp folds and seam lines) */}
        <path
          d="M50 70 L95 70 L110 110 L98 175 L52 175 L42 115 Z"
          fill="#1e2238"
          stroke="#090d16"
          strokeWidth="3"
        />
        {/* Center Zipper & Drawstrings */}
        <line x1="75" y1="70" x2="75" y2="175" stroke="#38bdf8" strokeWidth="2" />
        <line x1="68" y1="78" x2="68" y2="115" stroke="#f8fafc" strokeWidth="1.5" />
        <line x1="82" y1="78" x2="82" y2="112" stroke="#f8fafc" strokeWidth="1.5" />

        {/* Left Arm swinging back slightly */}
        <path d="M48 75 L30 115 L25 150 L35 152 L42 120 L55 80 Z" fill="#181e30" stroke="#090d16" strokeWidth="2.5" />

        {/* Right Arm swinging forward with phone in pocket / hand ready */}
        <path d="M96 75 L118 115 L112 145 L102 145 L106 120 L90 80 Z" fill="#1e2238" stroke="#090d16" strokeWidth="2.5" />

        {/* Headphones around neck */}
        <path d="M52 56 Q75 72 98 56" fill="none" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
        <circle cx="50" cy="56" r="9" fill="#090d16" stroke="#38bdf8" strokeWidth="2" />
        <circle cx="100" cy="56" r="9" fill="#090d16" stroke="#38bdf8" strokeWidth="2" />

        {/* Neck & Jaw */}
        <polygon points="66,45 84,45 82,60 68,60" fill="#fbcfe8" opacity="0.9" />

        {/* Seinen Head & Face */}
        <path d="M60 25 Q75 56 90 25 Q90 10 75 8 Q60 10 60 25 Z" fill="#fde047" opacity="0.15" />
        <path d="M62 26 L66 44 L75 52 L84 44 L88 26 Z" fill="#fed7aa" stroke="#090d16" strokeWidth="2" />

        {/* Determined Seinen Facial Features */}
        {/* Left Eye */}
        <path d="M67 30 Q70 28 73 30" stroke="#090d16" strokeWidth="2" fill="none" />
        <circle cx="70" cy="32" r="1.8" fill="#090d16" />
        {/* Right Eye */}
        <path d="M78 30 Q81 28 84 30" stroke="#090d16" strokeWidth="2" fill="none" />
        <circle cx="81" cy="32" r="1.8" fill="#090d16" />
        {/* Eyebrows (confident, focused) */}
        <line x1="66" y1="26" x2="74" y2="27" stroke="#090d16" strokeWidth="2.2" />
        <line x1="77" y1="27" x2="85" y2="26" stroke="#090d16" strokeWidth="2.2" />
        {/* Nose & Mouth */}
        <path d="M75 34 L76 38 L74 38" stroke="#090d16" strokeWidth="1.5" fill="none" />
        <line x1="72" y1="43" x2="78" y2="43" stroke="#090d16" strokeWidth="1.8" />

        {/* Layered Seinen Hair (Dark with wind-tousled ink spikes and cyan highlight) */}
        <path
          d="M56 25 Q50 15 62 8 Q75 0 88 8 Q98 16 94 28 Q98 22 92 14 Q80 4 66 12 Q58 20 56 25 Z"
          fill="#090d16"
          stroke="#090d16"
          strokeWidth="2.5"
        />
        {/* Front hair bangs */}
        <polygon points="62,12 65,24 69,15 74,25 78,16 83,23 88,14" fill="#0f172a" />
        {/* Cyan Manga Ink Edge Sheen */}
        <path d="M64 8 Q75 3 86 8" stroke="#38bdf8" strokeWidth="2" fill="none" />
      </g>

      {/* Manga Atmospheric Japanese Sound Effect Lettering: "ザッ... ザッ..." (Firm Stride) */}
      <g transform="translate(560, 360)">
        <text
          x="0"
          y="0"
          fill="#38bdf8"
          fontSize="36"
          fontWeight="900"
          fontFamily="sans-serif"
          fontStyle="italic"
          stroke="#090d16"
          strokeWidth="6"
          paintOrder="stroke"
          opacity="0.8"
        >
          ザッ...
        </text>
        <text
          x="80"
          y="25"
          fill="#f8fafc"
          fontSize="28"
          fontWeight="900"
          fontFamily="sans-serif"
          fontStyle="italic"
          stroke="#090d16"
          strokeWidth="5"
          paintOrder="stroke"
          opacity="0.7"
        >
          STEP...
        </text>
      </g>

      {/* Scene Vignette Overlay */}
      <rect width="900" height="450" fill="url(#ink-vignette)" pointerEvents="none" />
    </svg>
  );
};

// =========================================================================
// 2. SCENE: PHONE VIBRATION ACTION SHOT (MEDIUM SHOT)
// Dynamic action angle: Saurav halts mid-step, drawing the smartphone out
// of his tech jacket pocket as jagged vibration speed lines radiate *BZZZT!*
// =========================================================================
export const ScenePhoneAlertMedium: React.FC<{
  soundEffect?: string;
  studentName?: string;
}> = ({ soundEffect = 'BZZZZT!! URGENT PING!', studentName = 'Saurav' }) => {
  return (
    <svg viewBox="0 0 500 450" preserveAspectRatio="xMidYMid slice" className="w-full h-full select-none">
      <MangaScreentoneDefs />
      {/* Dark Campus Corridor / Wall Backdrop with Diagonal Dynamic Cut */}
      <rect width="500" height="450" fill="#0f172a" />
      <polygon points="0,0 500,60 500,450 0,380" fill="#182032" />
      <line x1="0" y1="120" x2="500" y2="180" stroke="#334155" strokeWidth="2" />
      <line x1="0" y1="240" x2="500" y2="300" stroke="#334155" strokeWidth="2" />
      <rect width="500" height="450" fill="url(#seinen-dots)" />

      {/* Dramatic Kinetic Action Speed Lines Radiating from Phone at (260, 260) */}
      <g stroke="#38bdf8" strokeWidth="2" opacity="0.65">
        <line x1="260" y1="260" x2="60" y2="60" strokeDasharray="12 6" />
        <line x1="260" y1="260" x2="160" y2="30" strokeDasharray="18 8" />
        <line x1="260" y1="260" x2="380" y2="40" strokeDasharray="14 6" />
        <line x1="260" y1="260" x2="470" y2="140" strokeDasharray="20 10" />
        <line x1="260" y1="260" x2="480" y2="360" strokeDasharray="16 8" />
        <line x1="260" y1="260" x2="80" y2="390" strokeDasharray="15 6" />
      </g>

      {/* SAURAV MEDIUM PROFILE — REACHING INTO POCKET */}
      <g transform="translate(70, 40)">
        {/* Torso in high-contrast ink */}
        <path
          d="M70 180 L180 160 L240 230 L220 380 L60 380 Z"
          fill="#1e2238"
          stroke="#090d16"
          strokeWidth="3.5"
        />

        {/* Blue Phone Screen Glow Upward onto Jaw & Neck */}
        <polygon points="190,260 250,220 180,120 130,130" fill="url(#phone-glow-beam)" />

        {/* Neck & Jaw in sharp angle */}
        <polygon points="120,95 160,85 170,125 130,135" fill="#fed7aa" stroke="#090d16" strokeWidth="2.5" />
        {/* Shadow under jaw */}
        <polygon points="135,120 170,105 165,130 132,135" fill="#ea580c" opacity="0.3" />

        {/* Head profile turned 3/4 toward phone */}
        <path
          d="M110 50 Q145 20 175 45 Q190 70 175 95 L145 105 Z"
          fill="#fed7aa"
          stroke="#090d16"
          strokeWidth="3"
        />
        {/* Sharp Seinen Eye looking down at phone */}
        <path d="M150 65 L165 62 L158 72 Z" fill="#090d16" />
        <circle cx="158" cy="67" r="2.5" fill="#38bdf8" />
        <path d="M145 58 Q158 53 168 59" stroke="#090d16" strokeWidth="2.5" fill="none" />

        {/* Wind-blown layered ink hair */}
        <path
          d="M100 50 Q85 20 125 15 Q165 5 185 30 Q200 60 180 80 Q190 60 180 40 Q150 15 115 30 Z"
          fill="#090d16"
          stroke="#090d16"
          strokeWidth="3"
        />
        <polygon points="130,30 145,55 152,40 168,60 175,45" fill="#0f172a" />
        <path d="M120 20 Q150 12 175 22" stroke="#38bdf8" strokeWidth="2" fill="none" />

        {/* Headphones on neck */}
        <path d="M110 95 Q140 115 175 105" stroke="#38bdf8" strokeWidth="6" fill="none" strokeLinecap="round" />

        {/* Hand pulling out glowing smartphone */}
        {/* Arm */}
        <path d="M170 180 L230 220 L210 270 L160 215 Z" fill="#181e30" stroke="#090d16" strokeWidth="3" />
        {/* Hand grip */}
        <ellipse cx="235" cy="245" rx="14" ry="18" fill="#fed7aa" stroke="#090d16" strokeWidth="2.5" />
        {/* Smartphone held in hand */}
        <rect
          x="215"
          y="205"
          width="48"
          height="80"
          rx="6"
          transform="rotate(-15 240 245)"
          fill="#0f172a"
          stroke="#38bdf8"
          strokeWidth="3"
        />
        {/* Illuminated Screen */}
        <rect
          x="220"
          y="212"
          width="38"
          height="65"
          rx="3"
          transform="rotate(-15 240 245)"
          fill="#0284c7"
        />
        {/* Message notification bar on screen */}
        <rect
          x="224"
          y="220"
          width="30"
          height="12"
          rx="2"
          transform="rotate(-15 240 245)"
          fill="#f8fafc"
        />
      </g>

      {/* JAGGED MANGA SOUND EFFECT BALLOON: "ヴヴヴッ!!" (VIBRATION / BUZZ) */}
      <g transform="translate(290, 80)">
        <polygon
          points="0,40 25,10 60,35 90,0 120,30 160,5 145,50 180,80 135,90 150,130 110,105 80,140 65,95 20,110 35,70"
          fill="#090d16"
          stroke="#e11d48"
          strokeWidth="3.5"
        />
        <text
          x="85"
          y="72"
          fill="#fde047"
          fontSize="24"
          fontWeight="900"
          fontFamily="sans-serif"
          fontStyle="italic"
          textAnchor="middle"
          stroke="#090d16"
          strokeWidth="2"
        >
          BZZZT!
        </text>
      </g>

      {/* Bottom Vignette */}
      <rect width="500" height="450" fill="url(#ink-vignette)" pointerEvents="none" />
    </svg>
  );
};

// =========================================================================
// 3. SCENE: SUSPICION CLOSE-UP // SAURAV'S EYES NARROWING
// Intense high-stakes facial acting shot: Seinen eyes narrowing, furrowed brows,
// phone glow reflecting across pupil, sweat bead, jaw clench
// =========================================================================
export const SceneSuspicionCloseup: React.FC<{
  studentName?: string;
  thoughtText?: string;
}> = ({ studentName = 'Saurav', thoughtText = 'Wait... this sender address looks completely off.' }) => {
  return (
    <svg viewBox="0 0 500 450" preserveAspectRatio="xMidYMid slice" className="w-full h-full select-none">
      <MangaScreentoneDefs />
      {/* High-Contrast Pitch Black Manga Ink Void with Screentone Gradient */}
      <rect width="500" height="450" fill="#090d16" />
      <rect width="500" height="450" fill="url(#seinen-dense-dots)" opacity="0.4" />

      {/* Dramatic Diagonal Suspense Slices */}
      <polygon points="0,0 220,0 120,450 0,450" fill="#0f172a" />
      <polygon points="380,0 500,0 500,450 300,450" fill="#0f172a" />

      {/* Kinetic Focus Speed Lines converging at Center Face (250, 200) */}
      <g stroke="#38bdf8" strokeWidth="1.5" opacity="0.4">
        <line x1="0" y1="50" x2="160" y2="150" />
        <line x1="0" y1="200" x2="140" y2="200" />
        <line x1="0" y1="380" x2="150" y2="280" />
        <line x1="500" y1="60" x2="350" y2="160" />
        <line x1="500" y1="220" x2="360" y2="220" />
        <line x1="500" y1="390" x2="340" y2="290" />
      </g>

      {/* SAURAV DRAMATIC EYE & FACE CLOSE-UP */}
      <g transform="translate(60, 40)">
        {/* Face Silhouette Base */}
        <polygon points="50,110 330,110 300,320 200,360 80,320" fill="#fed7aa" stroke="#090d16" strokeWidth="4" />

        {/* Upward Cyan Rim Light from Phone Screen */}
        <polygon points="80,240 300,240 270,350 110,350" fill="url(#phone-glow-beam)" opacity="0.8" />

        {/* LEFT SEINEN EYE (Narrowed in sharp analytical suspicion) */}
        <g transform="translate(100, 150)">
          {/* Eyebrow angled down aggressively */}
          <path d="M0 0 Q35 -15 65 -5 L55 5 Q30 -4 0 8 Z" fill="#090d16" />
          {/* Tension lines above eyebrow */}
          <line x1="20" y1="-18" x2="45" y2="-12" stroke="#090d16" strokeWidth="1.8" />
          <line x1="25" y1="-24" x2="40" y2="-19" stroke="#090d16" strokeWidth="1.5" />

          {/* Upper Eyelid & Lashes (Crisp black ink line) */}
          <path d="M-5 25 Q30 8 65 20" stroke="#090d16" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          {/* Lower Eyelid */}
          <path d="M5 38 Q30 46 55 35" stroke="#090d16" strokeWidth="2.5" fill="none" />

          {/* Eye Sclera */}
          <path d="M0 26 Q30 14 60 22 Q40 44 5 36 Z" fill="#f8fafc" />

          {/* Iris (Dark navy with bright cyan pupil reflection of phone screen) */}
          <circle cx="32" cy="28" r="13" fill="#0369a1" stroke="#090d16" strokeWidth="2" />
          <circle cx="32" cy="28" r="7" fill="#0f172a" />
          {/* Phone Screen Reflection in Eye */}
          <rect x="26" y="22" width="7" height="10" rx="1.5" fill="#38bdf8" />
          <line x1="27" y1="24" x2="31" y2="24" stroke="#ffffff" strokeWidth="1" />
          <line x1="27" y1="27" x2="31" y2="27" stroke="#ffffff" strokeWidth="1" />
        </g>

        {/* RIGHT SEINEN EYE (Slightly asymmetrical 3/4 perspective, piercing glare) */}
        <g transform="translate(220, 150)">
          {/* Eyebrow */}
          <path d="M-10 -5 Q20 -15 55 0 L50 8 Q20 -4 -8 4 Z" fill="#090d16" />
          {/* Tension lines */}
          <line x1="10" y1="-15" x2="35" y2="-10" stroke="#090d16" strokeWidth="1.8" />

          {/* Upper Eyelid */}
          <path d="M-10 20 Q25 8 60 25" stroke="#090d16" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          {/* Lower Eyelid */}
          <path d="M0 35 Q25 46 50 38" stroke="#090d16" strokeWidth="2.5" fill="none" />

          {/* Eye Sclera */}
          <path d="M-5 22 Q25 14 55 26 Q35 44 0 35 Z" fill="#f8fafc" />

          {/* Iris */}
          <circle cx="24" cy="28" r="13" fill="#0369a1" stroke="#090d16" strokeWidth="2" />
          <circle cx="24" cy="28" r="7" fill="#0f172a" />
          {/* Phone Screen Reflection */}
          <rect x="20" y="22" width="7" height="10" rx="1.5" fill="#38bdf8" />
        </g>

        {/* Glabella / Furrow lines between eyebrows */}
        <line x1="185" y1="135" x2="185" y2="155" stroke="#090d16" strokeWidth="2.5" />
        <line x1="192" y1="138" x2="192" y2="152" stroke="#090d16" strokeWidth="2" />

        {/* Nose Bridge with Sharp Ink Hatching */}
        <path d="M190 155 L182 220 L195 220" stroke="#090d16" strokeWidth="3" fill="none" />
        <polygon points="175,175 185,175 182,215 172,215" fill="#ea580c" opacity="0.3" />

        {/* Tense Tight Mouth */}
        <path d="M160 270 Q190 265 220 270" stroke="#090d16" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <line x1="175" y1="278" x2="205" y2="278" stroke="#090d16" strokeWidth="2" />

        {/* Sweat Bead of Suspicion & Tension */}
        <path
          d="M285 180 Q290 195 295 195 Q300 195 298 185 Q295 175 285 180 Z"
          fill="#38bdf8"
          stroke="#090d16"
          strokeWidth="1.5"
        />

        {/* Messy Black Seinen Bangs falling across forehead */}
        <path
          d="M40 70 L90 135 L115 85 L155 140 L180 80 L220 145 L250 85 L300 140 L340 70 Z"
          fill="#090d16"
          stroke="#090d16"
          strokeWidth="3"
        />
        {/* Cyan Hair Ink Accent Lines */}
        <path d="M80 80 L100 120" stroke="#38bdf8" strokeWidth="2" />
        <path d="M170 70 L190 115" stroke="#38bdf8" strokeWidth="2" />
        <path d="M260 75 L280 120" stroke="#38bdf8" strokeWidth="2" />
      </g>

      {/* Manga Action Text Overlay */}
      <g transform="translate(30, 410)">
        <text
          x="0"
          y="0"
          fill="#fde047"
          fontSize="22"
          fontWeight="900"
          fontFamily="monospace"
          fontStyle="italic"
          stroke="#090d16"
          strokeWidth="4"
          paintOrder="stroke"
        >
          ANOMALY DETECTED...
        </text>
      </g>
    </svg>
  );
};

// =========================================================================
// 4. SCENE: OVER-THE-SHOULDER LOOKING AT PHONE DISPLAY
// Camera positioned behind Saurav's dark silhouette shoulder/neck, focusing
// sharply on the smartphone screen showing the incoming attack vector
// =========================================================================
export const SceneOverTheShoulderPhone: React.FC<{
  clue?: MangaVisualClue;
  headerText?: string;
  senderText?: string;
  bodySnippet?: string;
}> = ({
  clue,
  headerText = 'CAMPUS PORTAL URGENT NOTIFICATION',
  senderText = 'admin-verify@un1versity-portal.xyz',
  bodySnippet = 'Your student account is scheduled for immediate deletion within 600 seconds. Click below to verify credentials now.',
}) => {
  return (
    <svg viewBox="0 0 900 450" preserveAspectRatio="xMidYMid slice" className="w-full h-full select-none">
      <MangaScreentoneDefs />
      {/* Background: Moody Out-of-Focus Campus Library / Cafeteria */}
      <rect width="900" height="450" fill="#0f172a" />
      <rect width="900" height="450" fill="url(#seinen-dots)" opacity="0.35" />
      {/* Blurred background architectural lines */}
      <line x1="200" y1="0" x2="200" y2="450" stroke="#1e293b" strokeWidth="8" opacity="0.4" />
      <line x1="680" y1="0" x2="680" y2="450" stroke="#1e293b" strokeWidth="8" opacity="0.4" />

      {/* SAURAV'S FOREGROUND SILHOUETTE (Left side of frame, back of head & shoulder) */}
      <g transform="translate(0, 0)">
        {/* Massive dark silhouette shoulder */}
        <path
          d="M0 450 L0 260 Q80 230 180 280 Q260 320 280 450 Z"
          fill="#090d16"
          stroke="#1e293b"
          strokeWidth="3"
        />
        {/* Back of Head with Spiky Seinen Hair */}
        <path
          d="M30 140 Q60 80 140 85 Q200 95 210 170 Q215 220 180 260 Q130 270 90 240 Z"
          fill="#090d16"
          stroke="#0284c7"
          strokeWidth="1.5"
        />
        {/* Headphones on head/neck */}
        <path d="M120 120 Q190 140 185 220" stroke="#38bdf8" strokeWidth="8" fill="none" strokeLinecap="round" />
        <circle cx="185" cy="220" r="18" fill="#090d16" stroke="#38bdf8" strokeWidth="3" />
      </g>

      {/* TWO HANDS HOLDING HIGH-RESOLUTION SMARTPHONE IN SHARP FOCUS */}
      <g transform="translate(320, 30)">
        {/* Outer Phone Shell (Sleek dark matte titanium) */}
        <rect
          x="0"
          y="0"
          width="440"
          height="390"
          rx="24"
          fill="#090d16"
          stroke="#38bdf8"
          strokeWidth="4"
        />

        {/* Smartphone Screen Canvas */}
        <rect x="12" y="14" width="416" height="362" rx="16" fill="#020617" />

        {/* Phone Status Bar */}
        <rect x="12" y="14" width="416" height="30" fill="#090d16" />
        <circle cx="220" cy="24" r="5" fill="#020617" />
        <text x="35" y="34" fill="#94a3b8" fontSize="11" fontWeight="bold" fontFamily="monospace">
          12:48 PM
        </text>
        <text x="380" y="34" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">
          5G 88%
        </text>

        {/* Phishing Email / App Header */}
        <rect x="24" y="55" width="392" height="48" rx="8" fill="#1e1b4b" stroke="#e11d48" strokeWidth="2" />
        {/* Warning Icon */}
        <circle cx="48" cy="79" r="14" fill="#e11d48" />
        <text x="48" y="85" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">
          !
        </text>
        {/* Header Title */}
        <text x="74" y="75" fill="#f43f5e" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
          {headerText}
        </text>
        <text x="74" y="93" fill="#cbd5e1" fontSize="10" fontFamily="monospace">
          PRIORITY: CRITICAL // EXPIRATION: 10 MIN
        </text>

        {/* Sender Email Address Field (THE CLUE) */}
        <rect x="24" y="112" width="392" height="42" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
        <text x="36" y="128" fill="#64748b" fontSize="10" fontFamily="sans-serif">
          FROM:
        </text>
        <text x="75" y="128" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
          {clue?.displayValue || senderText}
        </text>
        <text x="36" y="145" fill="#64748b" fontSize="9" fontFamily="monospace">
          TO: saurav.student@campus.edu
        </text>

        {/* Forensic Red-Flag Box highlighting the typo / anomaly */}
        <rect
          x="120"
          y="116"
          width="210"
          height="18"
          rx="3"
          fill="#be123c"
          opacity="0.3"
          stroke="#f43f5e"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />

        {/* Message Body Box */}
        <rect x="24" y="164" width="392" height="135" rx="8" fill="#090d16" stroke="#1e293b" strokeWidth="1.5" />
        <text x="38" y="190" fill="#e2e8f0" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
          CRITICAL ACCOUNT NOTICE:
        </text>
        <text x="38" y="210" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">
          Security audit has detected an authentication discrepancy.
        </text>
        <text x="38" y="228" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">
          Failure to authenticate will permanently lock your records.
        </text>

        {/* Suspicious Action Button */}
        <rect x="40" y="250" width="360" height="36" rx="8" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
        <text
          x="220"
          y="273"
          fill="#ffffff"
          fontSize="12"
          fontWeight="bold"
          fontFamily="monospace"
          textAnchor="middle"
        >
          AUTHENTICATE NOW &gt;&gt;
        </text>

        {/* In-Panel Manga Forensic Note Tag */}
        <g transform="translate(180, 310)">
          <rect x="0" y="0" width="220" height="42" rx="6" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="2" />
          <text x="12" y="18" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">
            FORENSIC CLUE RECOGNIZED:
          </text>
          <text x="12" y="32" fill="#f8fafc" fontSize="9" fontFamily="sans-serif">
            {clue?.flawExplanation ? clue.flawExplanation.slice(0, 42) + '...' : 'Look closely at the domain letters!'}
          </text>
        </g>
      </g>

      {/* Fingers holding the phone edges */}
      {/* Left Thumb */}
      <path d="M310 240 Q330 230 340 250 Q330 270 310 265 Z" fill="#fed7aa" stroke="#090d16" strokeWidth="2.5" />
      {/* Right Index & Thumb */}
      <path d="M760 210 Q740 200 730 220 Q740 240 760 235 Z" fill="#fed7aa" stroke="#090d16" strokeWidth="2.5" />
    </svg>
  );
};

// =========================================================================
// 5. SCENE: HESITATION / FINGER HOVERING OVER LINK (SUSPENSE MOMENT)
// Macro close-up: Saurav's index finger poised millimeters above the screen,
// action freeze lines, internal monologue heartbeat: "DOKI... DOKI..."
// =========================================================================
export const SceneFingerHoverHesitation: React.FC<{
  warningLabel?: string;
}> = ({ warningLabel = 'ONE TAP FROM DISASTER' }) => {
  return (
    <svg viewBox="0 0 500 450" preserveAspectRatio="xMidYMid slice" className="w-full h-full select-none">
      <MangaScreentoneDefs />
      {/* Background Screen Glow */}
      <rect width="500" height="450" fill="#020617" />
      <rect width="500" height="450" fill="url(#seinen-dense-dots)" opacity="0.3" />

      {/* The Red Malicious Button under the glass */}
      <rect x="50" y="240" width="400" height="90" rx="16" fill="#991b1b" stroke="#ef4444" strokeWidth="3" />
      <text
        x="250"
        y="295"
        fill="#ffffff"
        fontSize="22"
        fontWeight="900"
        fontFamily="sans-serif"
        textAnchor="middle"
        letterSpacing="2"
      >
        [ TAP TO VERIFY LOGIN ]
      </text>

      {/* Concentric Suspense Sound Wave Rings radiating from button center */}
      <circle cx="250" cy="200" r="45" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.7" />
      <circle cx="250" cy="200" r="85" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />
      <circle cx="250" cy="200" r="130" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="8 6" opacity="0.3" />

      {/* SAURAV'S FOREFINGER HOVERING POISED IN MIDAIR */}
      <g transform="translate(160, 40)">
        {/* Hand Shadow cast onto the glass */}
        <ellipse cx="90" cy="185" rx="35" ry="18" fill="#000000" opacity="0.6" />

        {/* Arm & Hand coming from top right */}
        <path
          d="M180 0 L140 70 L95 140 L70 170 Q60 185 75 190 Q90 190 105 165 L150 100 L210 40 Z"
          fill="#fed7aa"
          stroke="#090d16"
          strokeWidth="3.5"
        />
        {/* Knuckle definition & fingernail */}
        <path d="M72 172 Q80 165 92 170" stroke="#090d16" strokeWidth="2" fill="none" />
        <ellipse cx="80" cy="178" rx="7" ry="5" fill="#fbcfe8" stroke="#090d16" strokeWidth="1.5" />
        {/* Tension Motion Lines around Finger */}
        <line x1="50" y1="165" x2="65" y2="170" stroke="#f43f5e" strokeWidth="2.5" />
        <line x1="55" y1="185" x2="68" y2="182" stroke="#f43f5e" strokeWidth="2.5" />
        <line x1="95" y1="195" x2="105" y2="208" stroke="#f43f5e" strokeWidth="2.5" />
      </g>

      {/* HEARTBEAT JAPANESE SFX: "ドキッ... ドキッ..." */}
      <g transform="translate(30, 80)">
        <text
          x="0"
          y="0"
          fill="#f43f5e"
          fontSize="32"
          fontWeight="900"
          fontFamily="sans-serif"
          fontStyle="italic"
          stroke="#090d16"
          strokeWidth="5"
          paintOrder="stroke"
        >
          ドキッ...
        </text>
        <text
          x="10"
          y="32"
          fill="#f8fafc"
          fontSize="14"
          fontWeight="bold"
          fontFamily="monospace"
        >
          THUMP... THUMP...
        </text>
      </g>

      {/* Warning Banner at Bottom */}
      <g transform="translate(60, 390)">
        <rect x="0" y="0" width="380" height="34" rx="8" fill="#1e1b4b" stroke="#38bdf8" strokeWidth="2" />
        <text
          x="190"
          y="22"
          fill="#38bdf8"
          fontSize="12"
          fontWeight="900"
          fontFamily="monospace"
          textAnchor="middle"
        >
          ⚠ STOP &amp; VERIFY // DO NOT CLICK BLINDLY
        </text>
      </g>
    </svg>
  );
};

// =========================================================================
// 6. SCENE: CYBERMENTOR AI HOLOGRAM ARRIVAL
// Majestic holographic mentor materializes with geometric cyber traces,
// flowing tactical cape, glowing visor, and outstretched hand of warning
// =========================================================================
export const SceneCyberMentorArrival: React.FC<{
  mentorSpeech?: string;
}> = ({
  mentorSpeech = 'Operative, freeze! Analyze the sender address before your finger touches the glass.',
}) => {
  return (
    <svg viewBox="0 0 900 450" preserveAspectRatio="xMidYMid slice" className="w-full h-full select-none">
      <MangaScreentoneDefs />
      {/* Background Matrix Ink Grid */}
      <rect width="900" height="450" fill="#080c18" />
      <rect width="900" height="450" fill="url(#seinen-dots)" opacity="0.3" />

      {/* Perspective Wireframe Ground Grid */}
      <g stroke="#0284c7" strokeWidth="1" opacity="0.4">
        <line x1="450" y1="260" x2="0" y2="450" />
        <line x1="450" y1="260" x2="180" y2="450" />
        <line x1="450" y1="260" x2="360" y2="450" />
        <line x1="450" y1="260" x2="540" y2="450" />
        <line x1="450" y1="260" x2="720" y2="450" />
        <line x1="450" y1="260" x2="900" y2="450" />
        <line x1="200" y1="330" x2="700" y2="330" />
        <line x1="120" y1="370" x2="780" y2="370" />
        <line x1="40" y1="410" x2="860" y2="410" />
      </g>

      {/* Saurav in Lower Left Corner in Shocked Awe */}
      <g transform="translate(80, 240)">
        <polygon points="0,210 120,210 100,100 30,120" fill="#090d16" stroke="#334155" strokeWidth="2" />
        <circle cx="65" cy="80" r="30" fill="#090d16" stroke="#38bdf8" strokeWidth="2" />
        <path d="M50 75 Q65 65 80 75" stroke="#38bdf8" strokeWidth="3" fill="none" />
      </g>

      {/* CYBERMENTOR AI — FULL HOLOGRAPHIC PROJECTION */}
      <g transform="translate(420, 40)">
        {/* Holographic Concentric Rings under floating mentor */}
        <ellipse cx="80" cy="360" rx="90" ry="18" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
        <ellipse cx="80" cy="360" rx="60" ry="12" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 4" />

        {/* Dynamic Flowing Energy Cape with Circuit Lines */}
        <path
          d="M30 110 Q-30 200 -10 320 Q40 340 80 320 Q120 340 170 320 Q190 200 130 110 Z"
          fill="url(#shield-matrix-grad)"
          stroke="#67e8f9"
          strokeWidth="2.5"
          opacity="0.9"
        />
        {/* Cape circuit traces */}
        <path d="M10 170 L40 220 L40 280" stroke="#f8fafc" strokeWidth="1.5" fill="none" />
        <path d="M150 170 L120 220 L120 280" stroke="#f8fafc" strokeWidth="1.5" fill="none" />

        {/* Torso & Tactical Armor Vest */}
        <polygon points="45,95 115,95 125,210 35,210" fill="#0f172a" stroke="#22d3ee" strokeWidth="2.5" />
        {/* Cyber Core on Chest */}
        <polygon points="80,120 95,135 80,150 65,135" fill="#22d3ee" />

        {/* Head & Futuristic Tactical Visor */}
        <ellipse cx="80" cy="60" rx="26" ry="32" fill="#090d16" stroke="#22d3ee" strokeWidth="2.5" />
        {/* Glowing Cyan Visor */}
        <path d="M58 58 Q80 50 102 58 L100 68 Q80 62 60 68 Z" fill="#22d3ee" stroke="#ffffff" strokeWidth="1.5" />
        <line x1="62" y1="63" x2="98" y2="63" stroke="#ffffff" strokeWidth="1.5" />

        {/* Right Arm Outstretched with Open Palm (HALT/WARNING GESTURE) */}
        <path d="M35 110 L-30 140 L-70 145" stroke="#22d3ee" strokeWidth="10" strokeLinecap="round" fill="none" />
        {/* Open Palm */}
        <circle cx="-80" cy="145" r="14" fill="#0f172a" stroke="#22d3ee" strokeWidth="2.5" />
        <line x1="-80" y1="130" x2="-80" y2="120" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" />
        <line x1="-87" y1="133" x2="-92" y2="124" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" />
        <line x1="-73" y1="133" x2="-68" y2="124" stroke="#67e8f9" strokeWidth="3" strokeLinecap="round" />

        {/* Digital Firewall Hologram Projecting from Hand */}
        <polygon
          points="-120,80 -40,80 -10,140 -40,200 -120,200 -150,140"
          fill="#06b6d4"
          opacity="0.35"
          stroke="#22d3ee"
          strokeWidth="2.5"
          strokeDasharray="6 3"
        />
      </g>

      {/* JAPANESE SFX: "シュォォォン!!" (HOLOGRAPHIC FLASH) */}
      <g transform="translate(680, 80)">
        <text
          x="0"
          y="0"
          fill="#22d3ee"
          fontSize="36"
          fontWeight="900"
          fontFamily="sans-serif"
          fontStyle="italic"
          stroke="#090d16"
          strokeWidth="6"
          paintOrder="stroke"
        >
          シュォォン!
        </text>
        <text
          x="10"
          y="35"
          fill="#ffffff"
          fontSize="14"
          fontWeight="bold"
          fontFamily="monospace"
        >
          CYBER SHIELD ACTIVE
        </text>
      </g>
    </svg>
  );
};

// =========================================================================
// 7. SCENE: DYNAMIC CONSEQUENCE ACTION PANEL
// Shows the visceral outcome of the user's choice:
// - If correct: Kinetic defense, shield barrier blocks attack vector, relief!
// - If incorrect: Red breach flare, screen shattered, panic & containment!
// =========================================================================
export const SceneActionConsequence: React.FC<{
  isCorrect: boolean;
  title: string;
  reactionText: string;
  studentName?: string;
}> = ({ isCorrect, title, reactionText, studentName = 'Saurav' }) => {
  if (isCorrect) {
    return (
      <svg viewBox="0 0 900 450" preserveAspectRatio="xMidYMid slice" className="w-full h-full select-none">
        <MangaScreentoneDefs />
        {/* Heroic Cyan/Emerald Energy Sky */}
        <rect width="900" height="450" fill="#064e3b" />
        <rect width="900" height="450" fill="url(#seinen-dots)" opacity="0.3" />

        {/* High-Velocity Kinetic Shield Rays bursting from Center (450, 225) */}
        <g stroke="#34d399" strokeWidth="2.5" opacity="0.7">
          <line x1="450" y1="225" x2="0" y2="40" />
          <line x1="450" y1="225" x2="120" y2="0" />
          <line x1="450" y1="225" x2="780" y2="0" />
          <line x1="450" y1="225" x2="900" y2="50" />
          <line x1="450" y1="225" x2="900" y2="380" />
          <line x1="450" y1="225" x2="0" y2="400" />
        </g>

        {/* Deflected Phishing Hook / Malware Spear shattering against the barrier */}
        <g transform="translate(180, 100)">
          {/* Shattered dark spear fragments */}
          <line x1="20" y1="20" x2="160" y2="100" stroke="#f43f5e" strokeWidth="6" strokeDasharray="12 8" />
          <polygon points="170,105 190,120 165,130" fill="#f43f5e" />
          <circle cx="180" cy="115" r="28" fill="#fef08a" opacity="0.8" />
        </g>

        {/* SAURAV CONFIDENT & RELIEVED IN FOREGROUND */}
        <g transform="translate(420, 100)">
          {/* Confident Seinen Hero Stance */}
          <polygon points="40,90 140,90 150,260 30,260" fill="#1e293b" stroke="#090d16" strokeWidth="3.5" />
          {/* Head & Smile */}
          <polygon points="65,40 115,40 105,85 75,85" fill="#fed7aa" stroke="#090d16" strokeWidth="2.5" />
          {/* Confident smile */}
          <path d="M78 70 Q90 80 102 70" stroke="#090d16" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Seinen eyes open & victorious */}
          <circle cx="80" cy="55" r="3" fill="#090d16" />
          <circle cx="100" cy="55" r="3" fill="#090d16" />
          {/* Messy hair */}
          <path d="M50 35 Q90 10 130 35 L120 60 L60 60 Z" fill="#090d16" stroke="#34d399" strokeWidth="2" />
          {/* Thumbs-Up Hand */}
          <path d="M145 130 L185 110 L195 130 L165 155 Z" fill="#fed7aa" stroke="#090d16" strokeWidth="2.5" />
          <rect x="180" y="95" width="14" height="24" rx="4" fill="#fed7aa" stroke="#090d16" strokeWidth="2" />
        </g>

        {/* JAPANESE SFX: "バシィィィッ!!" (DEFLECTED / BLOCKED!) */}
        <g transform="translate(600, 80)">
          <text
            x="0"
            y="0"
            fill="#34d399"
            fontSize="42"
            fontWeight="900"
            fontFamily="sans-serif"
            fontStyle="italic"
            stroke="#090d16"
            strokeWidth="7"
            paintOrder="stroke"
          >
            バシィッ!!
          </text>
          <text
            x="0"
            y="35"
            fill="#fef08a"
            fontSize="16"
            fontWeight="900"
            fontFamily="monospace"
          >
            ATTACK DEFLECTED!
          </text>
        </g>
      </svg>
    );
  }

  // INCORRECT CHOICE: VISCERAL ALARM & CONTAINMENT
  return (
    <svg viewBox="0 0 900 450" preserveAspectRatio="xMidYMid slice" className="w-full h-full select-none">
      <MangaScreentoneDefs />
      {/* Alarming Red Alert Environment */}
      <rect width="900" height="450" fill="#450a0a" />
      <rect width="900" height="450" fill="url(#seinen-dense-dots)" opacity="0.4" />

      {/* Shattered Glass Fracture Lines across the frame */}
      <g stroke="#fca5a5" strokeWidth="2.5" opacity="0.8">
        <line x1="450" y1="225" x2="200" y2="40" />
        <line x1="450" y1="225" x2="350" y2="0" />
        <line x1="450" y1="225" x2="650" y2="30" />
        <line x1="450" y1="225" x2="820" y2="180" />
        <line x1="450" y1="225" x2="700" y2="420" />
        <line x1="450" y1="225" x2="260" y2="380" />
        <line x1="450" y1="225" x2="80" y2="240" />
        {/* Jagged cross-fractures */}
        <polyline points="200,40 280,120 350,0" fill="none" />
        <polyline points="650,30 580,140 820,180" fill="none" />
        <polyline points="260,380 340,300 450,225" fill="none" />
      </g>

      {/* SAURAV CLUTCHING HEAD IN HORRIFIED REALIZATION */}
      <g transform="translate(340, 80)">
        {/* Body bent slightly forward */}
        <polygon points="40,110 180,110 160,280 60,280" fill="#1e2238" stroke="#090d16" strokeWidth="3.5" />
        {/* Head with wide shock eyes */}
        <polygon points="75,50 145,50 135,110 85,110" fill="#fed7aa" stroke="#090d16" strokeWidth="2.5" />
        {/* Horrified Eyes with Tiny Pupils */}
        <circle cx="95" cy="72" r="8" fill="#f8fafc" stroke="#090d16" strokeWidth="2" />
        <circle cx="95" cy="72" r="2.5" fill="#ef4444" />
        <circle cx="125" cy="72" r="8" fill="#f8fafc" stroke="#090d16" strokeWidth="2" />
        <circle cx="125" cy="72" r="2.5" fill="#ef4444" />
        {/* Agonized Open Mouth */}
        <ellipse cx="110" cy="95" rx="14" ry="10" fill="#090d16" />
        {/* Hands clutching hair in despair */}
        <ellipse cx="60" cy="50" rx="16" ry="12" fill="#fed7aa" stroke="#090d16" strokeWidth="2" />
        <ellipse cx="160" cy="50" rx="16" ry="12" fill="#fed7aa" stroke="#090d16" strokeWidth="2" />
      </g>

      {/* WARNING FLASH BANNER & JAPANESE SFX: "ドガァァン!!" (BREACH / CRASH!) */}
      <g transform="translate(80, 80)">
        <text
          x="0"
          y="0"
          fill="#ef4444"
          fontSize="44"
          fontWeight="900"
          fontFamily="sans-serif"
          fontStyle="italic"
          stroke="#090d16"
          strokeWidth="7"
          paintOrder="stroke"
        >
          ドガァン!!
        </text>
        <text
          x="0"
          y="35"
          fill="#fef08a"
          fontSize="18"
          fontWeight="900"
          fontFamily="monospace"
        >
          CREDENTIAL LEAK TRIGGERED!
        </text>
      </g>
    </svg>
  );
};
