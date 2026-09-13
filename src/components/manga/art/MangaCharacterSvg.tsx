import React from 'react';
import { VisualCharacterInstance } from '../../../types/manga';

interface MangaCharacterSvgProps {
  character: VisualCharacterInstance;
  customStudentName?: string;
  className?: string;
}

export const MangaCharacterSvg: React.FC<MangaCharacterSvgProps> = ({
  character,
  customStudentName = 'Saurav',
  className = '',
}) => {
  const { characterId, pose, position } = character;

  // Position alignment styling inside panel
  const getPositionClasses = () => {
    switch (position) {
      case 'left':
        return 'left-4 sm:left-8 bottom-0';
      case 'right':
        return 'right-4 sm:right-8 bottom-0';
      case 'foreground':
        return 'left-1/2 -translate-x-1/2 bottom-0 scale-105 sm:scale-110 z-20';
      case 'center':
      default:
        return 'left-1/2 -translate-x-1/2 bottom-0 z-10';
    }
  };

  // Render character artwork according to ID
  if (characterId === 'mentor') {
    return (
      <div className={`absolute pointer-events-none transition-transform duration-300 ${getPositionClasses()} ${className}`}>
        {renderCyberMentorAi(pose)}
      </div>
    );
  }

  if (characterId === 'maya') {
    return (
      <div className={`absolute pointer-events-none transition-transform duration-300 ${getPositionClasses()} ${className}`}>
        {renderMayaClassmate(pose)}
      </div>
    );
  }

  if (characterId === 'scammer') {
    return (
      <div className={`absolute pointer-events-none transition-transform duration-300 ${getPositionClasses()} ${className}`}>
        {renderScammerShadow(pose)}
      </div>
    );
  }

  // Default: Saurav (Student Protagonist)
  return (
    <div className={`absolute pointer-events-none transition-transform duration-300 ${getPositionClasses()} ${className}`}>
      {renderSauravProtagonist(pose, customStudentName)}
    </div>
  );
};

// =========================================================================
// 1. SAURAV (STUDENT PROTAGONIST)
// Consistent design: Dark layered messy anime hair with electric cyan highlight,
// dark navy & cyan tech-hoodie jacket, white tee, backpack strap, expressive eyes
// =========================================================================
function renderSauravProtagonist(pose: string, studentName: string) {
  const isPanic = pose === 'shocked-panic';
  const isSuspicious = pose === 'suspicious-squint';
  const isRelieved = pose === 'relieved-thumbsup';
  const isThinking = pose === 'thinking';
  const isGlitch = pose === 'glitch-despair';

  return (
    <div className="relative w-40 h-56 sm:w-48 sm:h-64 select-none filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]">
      <svg
        viewBox="0 0 200 260"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Hair Gradient */}
          <linearGradient id="saurav-hair" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="60%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          {/* Hoodie Gradient */}
          <linearGradient id="saurav-hoodie" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e2238" />
            <stop offset="100%" stopColor="#0b0e1b" />
          </linearGradient>

          {/* Skin Tone */}
          <linearGradient id="saurav-skin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#fdba74" />
          </linearGradient>

          {/* Cyan Glow */}
          <filter id="cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ---------------- BODY & HOODIE ---------------- */}
        {/* Torso / Shoulders */}
        <path
          d="M45 170 C45 145, 70 140, 100 140 C130 140, 155 145, 155 170 L165 260 L35 260 Z"
          fill="url(#saurav-hoodie)"
          stroke="#0f172a"
          strokeWidth="3.5"
        />

        {/* Hoodie Cyan Trim Lines */}
        <path
          d="M82 143 L78 260"
          stroke="#06b6d4"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M118 143 L122 260"
          stroke="#06b6d4"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Inner Shirt Collar */}
        <path
          d="M82 145 Q100 162 118 145 L114 175 Q100 185 86 175 Z"
          fill="#f8fafc"
          stroke="#0f172a"
          strokeWidth="2"
        />

        {/* Backpack Strap diagonally across chest */}
        <path
          d="M58 150 L140 250"
          stroke="#334155"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M58 150 L140 250"
          stroke="#06b6d4"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        {/* Cyber Emblem on Chest */}
        <circle cx="135" cy="180" r="7" fill="#06b6d4" opacity="0.9" />
        <path d="M132 180 L138 180 M135 177 L135 183" stroke="#000" strokeWidth="1.5" />

        {/* ---------------- NECK ---------------- */}
        <path
          d="M88 125 L88 150 Q100 155 112 150 L112 125 Z"
          fill="url(#saurav-skin)"
          stroke="#0f172a"
          strokeWidth="2.5"
        />
        {/* Neck Shadow under chin */}
        <path d="M88 126 Q100 138 112 126 Z" fill="#ea580c" opacity="0.25" />

        {/* ---------------- HEAD & FACE ---------------- */}
        {/* Face Shape */}
        <path
          d="M68 85 C68 55, 132 55, 132 85 C132 115, 114 130, 100 134 C86 130, 68 115, 68 85 Z"
          fill="url(#saurav-skin)"
          stroke="#0f172a"
          strokeWidth="3"
        />

        {/* Ears */}
        <path d="M66 82 C60 82, 60 96, 68 98" fill="url(#saurav-skin)" stroke="#0f172a" strokeWidth="2.5" />
        <path d="M134 82 C140 82, 140 96, 132 98" fill="url(#saurav-skin)" stroke="#0f172a" strokeWidth="2.5" />

        {/* ---------------- EXPRESSION VARIATIONS ---------------- */}
        {isPanic ? (
          /* PANIC / SHOCK EXPRESSION */
          <>
            {/* High arched alarmed eyebrows */}
            <path d="M74 72 Q84 64 94 72" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            <path d="M106 72 Q116 64 126 72" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />

            {/* Huge wide anime shock eyes with tiny pupils */}
            <ellipse cx="83" cy="85" rx="9" ry="11" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <circle cx="83" cy="85" r="3.5" fill="#0f172a" />
            <circle cx="84" cy="83" r="1.5" fill="#ffffff" />

            <ellipse cx="117" cy="85" rx="9" ry="11" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <circle cx="117" cy="85" r="3.5" fill="#0f172a" />
            <circle cx="118" cy="83" r="1.5" fill="#ffffff" />

            {/* Open gaping scream mouth with visible teeth */}
            <path
              d="M88 106 Q100 102 112 106 Q116 122 100 123 Q84 122 88 106 Z"
              fill="#881337"
              stroke="#0f172a"
              strokeWidth="2.5"
            />
            <path d="M91 106 Q100 109 109 106" fill="#ffffff" />

            {/* Giant Anime Blue Sweat Drop on Temple */}
            <path
              d="M130 65 C130 65, 142 75, 140 82 C138 87, 130 87, 128 82 C126 75, 130 65, 130 65 Z"
              fill="#38bdf8"
              stroke="#0284c7"
              strokeWidth="2"
            />

            {/* Hands clutching head */}
            <path
              d="M50 85 C42 75, 48 60, 62 68 L68 80 Z"
              fill="url(#saurav-skin)"
              stroke="#0f172a"
              strokeWidth="2.5"
            />
            <path
              d="M150 85 C158 75, 152 60, 138 68 L132 80 Z"
              fill="url(#saurav-skin)"
              stroke="#0f172a"
              strokeWidth="2.5"
            />
          </>
        ) : isSuspicious ? (
          /* SUSPICIOUS / DETECTIVE SQUINT EXPRESSION */
          <>
            {/* Asymmetrical sharp detective eyebrows */}
            <path d="M74 74 L94 77" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M106 72 Q116 66 126 75" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />

            {/* Narrowed sharp eyes with glint */}
            <path d="M75 84 Q84 80 93 84 Q84 89 75 84 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <circle cx="84" cy="84" r="3" fill="#0f172a" />
            <circle cx="85" cy="83" r="1" fill="#06b6d4" />

            <path d="M107 83 Q116 79 125 83 Q116 88 107 83 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <circle cx="116" cy="83" r="3" fill="#0f172a" />
            <circle cx="117" cy="82" r="1" fill="#06b6d4" />

            {/* Thoughtful smirk mouth */}
            <path d="M92 108 Q100 111 110 107" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

            {/* Hand on chin (detective pose) */}
            <path
              d="M92 125 Q96 135 106 134 Q114 130 114 120"
              fill="url(#saurav-skin)"
              stroke="#0f172a"
              strokeWidth="2.5"
            />
            {/* Glasses / Visor Glint line */}
            <line x1="72" y1="80" x2="88" y2="76" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
          </>
        ) : isRelieved ? (
          /* RELIEVED / VICTORIOUS THUMBS UP */
          <>
            {/* Relaxed curved eyebrows */}
            <path d="M74 74 Q84 70 94 75" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M106 75 Q116 70 126 74" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

            {/* Happy closed arc eyes (^_^ anime eyes) */}
            <path d="M76 85 Q84 78 92 85" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M108 85 Q116 78 124 85" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Cheerful anime open smile with blush marks */}
            <path d="M90 104 Q100 118 110 104 Z" fill="#f43f5e" stroke="#0f172a" strokeWidth="2" />
            <ellipse cx="73" cy="94" rx="4" ry="2" fill="#fb7185" opacity="0.6" />
            <ellipse cx="127" cy="94" rx="4" ry="2" fill="#fb7185" opacity="0.6" />

            {/* Thumbs up hand in foreground */}
            <g transform="translate(130, 160)">
              <circle cx="16" cy="16" r="16" fill="url(#saurav-skin)" stroke="#0f172a" strokeWidth="2" />
              <path d="M16 6 L16 16 M12 12 L20 12" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              {/* Sparkle stars */}
              <path d="M28 2 L30 8 L36 10 L30 12 L28 18 L26 12 L20 10 L26 8 Z" fill="#fbbf24" />
            </g>
          </>
        ) : isGlitch ? (
          /* DESPAIR / GLITCHED / COMPROMISED */
          <>
            {/* Anime vertical despair shadow lines on forehead */}
            <line x1="82" y1="58" x2="82" y2="80" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />
            <line x1="90" y1="56" x2="90" y2="82" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />
            <line x1="100" y1="55" x2="100" y2="84" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />
            <line x1="110" y1="56" x2="110" y2="82" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />
            <line x1="118" y1="58" x2="118" y2="80" stroke="#3b82f6" strokeWidth="2" opacity="0.7" />

            {/* Hollow blank shocked pupils */}
            <ellipse cx="83" cy="85" rx="7" ry="8" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <ellipse cx="117" cy="85" rx="7" ry="8" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />

            {/* Wobbly wavy mouth */}
            <path d="M88 110 Q94 105 100 110 Q106 115 112 108" stroke="#0f172a" strokeWidth="2.5" fill="none" />
          </>
        ) : isThinking ? (
          /* THINKING / ANALYZING */
          <>
            <path d="M74 72 Q84 66 94 73" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M106 75 L126 73" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="83" cy="83" rx="7" ry="8" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <circle cx="85" cy="81" r="3" fill="#0f172a" />
            <ellipse cx="117" cy="83" rx="7" ry="8" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <circle cx="119" cy="81" r="3" fill="#0f172a" />
            <path d="M93 108 L107 108" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          </>
        ) : (
          /* STANDARD / CURIOUS FOCUS */
          <>
            <path d="M74 75 Q84 70 94 75" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M106 75 Q116 70 126 75" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="83" cy="85" rx="7" ry="9" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <circle cx="84" cy="85" r="3.5" fill="#0f172a" />
            <circle cx="86" cy="83" r="1.5" fill="#38bdf8" />
            <ellipse cx="117" cy="85" rx="7" ry="9" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            <circle cx="116" cy="85" r="3.5" fill="#0f172a" />
            <circle cx="118" cy="83" r="1.5" fill="#38bdf8" />
            <path d="M94 107 Q100 110 106 107" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          </>
        )}

        {/* Nose */}
        <path d="M99 92 L97 99 L101 99" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" />

        {/* ---------------- HAIR (MESSY ANIME STYLE) ---------------- */}
        {/* Back hair layers */}
        <path
          d="M56 80 C48 50, 75 25, 100 25 C125 25, 152 50, 144 80 L140 100 L60 100 Z"
          fill="url(#saurav-hair)"
          stroke="#0f172a"
          strokeWidth="3.5"
        />

        {/* Dynamic Spiky Bangs & Locks */}
        <path
          d="M58 75 Q68 55 80 62 Q90 40 105 58 Q120 42 132 60 Q142 50 144 75 L138 78 Q130 52 118 64 Q106 50 94 65 Q82 52 70 68 Z"
          fill="url(#saurav-hair)"
          stroke="#0f172a"
          strokeWidth="2.5"
        />

        {/* Signature Cyan Highlight Lock across left fringe */}
        <path
          d="M74 48 Q82 38 90 52 Q84 56 74 48 Z"
          fill="#06b6d4"
          filter="url(#cyan-glow)"
          opacity="0.95"
        />

        {/* Left Sideburns */}
        <path d="M66 75 L62 102 L70 94 Z" fill="url(#saurav-hair)" stroke="#0f172a" strokeWidth="2" />
        {/* Right Sideburns */}
        <path d="M134 75 L138 102 L130 94 Z" fill="url(#saurav-hair)" stroke="#0f172a" strokeWidth="2" />

        {/* ---------------- SMARTPHONE IN HAND (IF CHECKING PHONE) ---------------- */}
        {pose === 'checking-phone' && (
          <g transform="translate(68, 160)" className="animate-pulse">
            {/* Phone Body */}
            <rect x="0" y="0" width="64" height="96" rx="8" fill="#0f172a" stroke="#06b6d4" strokeWidth="3" />
            {/* Glowing Screen with Notification */}
            <rect x="4" y="6" width="56" height="84" rx="4" fill="#1e1b4b" />
            {/* Urgent Red Bar on phone */}
            <rect x="8" y="14" width="48" height="20" rx="3" fill="#e11d48" />
            <text x="32" y="27" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
              ⚠️ URGENT
            </text>
            {/* Screen lines */}
            <line x1="10" y1="42" x2="54" y2="42" stroke="#38bdf8" strokeWidth="2" />
            <line x1="10" y1="48" x2="44" y2="48" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="10" y1="54" x2="50" y2="54" stroke="#94a3b8" strokeWidth="1.5" />
            {/* Thumb on bezel */}
            <ellipse cx="62" cy="50" rx="6" ry="10" fill="url(#saurav-skin)" stroke="#0f172a" strokeWidth="2" />
          </g>
        )}

        {/* Name Tag on Hoodie */}
        <rect x="62" y="240" width="76" height="16" rx="4" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
        <text
          x="100"
          y="251"
          fill="#38bdf8"
          fontSize="9"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="monospace"
        >
          {studentName.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}

// =========================================================================
// 2. CYBERMENTOR AI (ORIGINAL AI MENTOR CHARACTER)
// Sleek holographic avatar with digital visor, futuristic cyber suit,
// floating geometric glyphs, glowing cyan circuitry
// =========================================================================
function renderCyberMentorAi(pose: string) {
  return (
    <div className="relative w-44 h-60 sm:w-52 sm:h-68 select-none filter drop-shadow-[0_0_25px_rgba(6,182,212,0.8)] animate-pulse">
      <svg
        viewBox="0 0 220 280"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="mentor-glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>

          <linearGradient id="mentor-suit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#083344" />
            <stop offset="100%" stopColor="#021319" />
          </linearGradient>

          {/* Hologram Scanlines pattern */}
          <pattern id="scanlines" width="100%" height="4" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="220" y2="0" stroke="#22d3ee" strokeWidth="0.75" opacity="0.3" />
          </pattern>
        </defs>

        {/* Floating Holographic Emitter Base Ring */}
        <ellipse cx="110" cy="265" rx="75" ry="12" fill="none" stroke="#22d3ee" strokeWidth="2.5" />
        <ellipse cx="110" cy="265" rx="55" ry="8" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="6 4" />
        {/* Hologram upward beam cone */}
        <polygon points="45,265 175,265 155,160 65,160" fill="url(#mentor-glow)" opacity="0.08" />

        {/* ---------------- BODY & HIGH-TECH SUIT ---------------- */}
        <path
          d="M55 170 C55 140, 80 135, 110 135 C140 135, 165 140, 165 170 L175 250 L45 250 Z"
          fill="url(#mentor-suit)"
          stroke="#22d3ee"
          strokeWidth="3"
        />

        {/* Circuit Board Traces on Chest */}
        <path d="M110 145 L110 210 M90 160 L110 180 L130 160 M85 200 L110 225 L135 200" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
        <circle cx="110" cy="180" r="4" fill="#ffffff" />
        <circle cx="90" cy="160" r="3" fill="#22d3ee" />
        <circle cx="130" cy="160" r="3" fill="#22d3ee" />

        {/* Holographic Lapel Collar */}
        <path d="M85 138 L110 175 L135 138" stroke="#38bdf8" strokeWidth="3" fill="none" />

        {/* ---------------- HEAD & HOLOGRAPHIC HAIR ---------------- */}
        {/* Face Structure */}
        <path
          d="M80 80 C80 50, 140 50, 140 80 C140 110, 125 125, 110 130 C95 125, 80 110, 80 80 Z"
          fill="#0c4a6e"
          stroke="#38bdf8"
          strokeWidth="3"
        />

        {/* Sleek Geometric Hair */}
        <path
          d="M72 75 C68 45, 95 20, 110 20 C125 20, 152 45, 148 75 L144 95 L76 95 Z"
          fill="url(#mentor-glow)"
          stroke="#22d3ee"
          strokeWidth="3"
        />
        <path d="M72 70 Q90 45 110 50 Q130 45 148 70 L140 75 Q125 55 110 60 Q95 55 80 75 Z" fill="#ffffff" opacity="0.4" />

        {/* ---------------- DIGITAL VISOR / GLASSES ---------------- */}
        {/* Visor Bar glowing cyan */}
        <rect x="76" y="70" width="68" height="20" rx="5" fill="#0284c7" stroke="#22d3ee" strokeWidth="3" />
        {/* Matrix Glyphs inside Visor */}
        <text x="110" y="84" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace" letterSpacing="2">
          0101 ▸ AI
        </text>

        {/* Confident Mentor Smile */}
        <path d="M102 108 Q110 114 118 108" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />

        {/* ---------------- POSE ADDITIONS ---------------- */}
        {pose === 'mentor-shield' ? (
          /* ZERO TRUST SHIELD PROJECTION */
          <g transform="translate(10, 80)">
            {/* Hexagonal Shield Barrier */}
            <polygon
              points="100,10 180,45 180,135 100,170 20,135 20,45"
              fill="#06b6d4"
              fillOpacity="0.25"
              stroke="#22d3ee"
              strokeWidth="4"
              strokeDasharray="8 4"
            />
            <text x="100" y="95" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle" fontFamily="monospace">
              ZERO TRUST
            </text>
            <text x="100" y="112" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              FIREWALL ACTIVE
            </text>
          </g>
        ) : (
          /* FLOATING DATA DISCS */
          <>
            <circle cx="40" cy="100" r="12" fill="#083344" stroke="#22d3ee" strokeWidth="2" />
            <text x="40" y="104" fill="#22d3ee" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">TLS</text>

            <circle cx="180" cy="110" r="14" fill="#083344" stroke="#22d3ee" strokeWidth="2" />
            <text x="180" y="114" fill="#22d3ee" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">2FA</text>
          </>
        )}

        {/* Scanlines overlay on entire avatar */}
        <rect x="30" y="20" width="160" height="240" fill="url(#scanlines)" pointerEvents="none" />

        {/* Label Plaque */}
        <rect x="55" y="250" width="110" height="18" rx="4" fill="#042f2e" stroke="#2dd4bf" strokeWidth="2" />
        <text x="110" y="262" fill="#5eead4" fontSize="9" fontWeight="black" textAnchor="middle" fontFamily="monospace">
          CYBERMENTOR AI
        </text>
      </svg>
    </div>
  );
}

// =========================================================================
// 3. MAYA (CLASSMATE / FRIEND)
// Warm amber tones, yellow hairpin, friendly college student
// =========================================================================
function renderMayaClassmate(pose: string) {
  return (
    <div className="relative w-36 h-52 sm:w-44 sm:h-60 select-none filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]">
      <svg viewBox="0 0 180 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Sweater */}
        <path d="M40 160 C40 135, 65 130, 90 130 C115 130, 140 135, 140 160 L150 240 L30 240 Z" fill="#ea580c" stroke="#7c2d12" strokeWidth="3" />
        {/* Collar */}
        <path d="M75 135 Q90 150 105 135" stroke="#fef08a" strokeWidth="4" />
        {/* Neck */}
        <path d="M80 115 L80 140 Q90 145 100 140 L100 115 Z" fill="#fed7aa" stroke="#7c2d12" strokeWidth="2.5" />
        {/* Face */}
        <path d="M62 80 C62 55, 118 55, 118 80 C118 105, 105 120, 90 124 C75 120, 62 105, 62 80 Z" fill="#fed7aa" stroke="#7c2d12" strokeWidth="3" />
        {/* Hair */}
        <path d="M52 75 C48 40, 75 20, 90 20 C105 20, 132 40, 128 75 L124 130 L110 135 L70 135 L56 130 Z" fill="#b45309" stroke="#7c2d12" strokeWidth="3" />
        {/* Yellow Star Hairpin */}
        <polygon points="68,55 70,61 76,62 71,66 73,72 68,68 63,72 65,66 60,62 66,61" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
        {/* Eyes */}
        <ellipse cx="76" cy="80" rx="5" ry="7" fill="#78350f" />
        <circle cx="78" cy="78" r="2" fill="#ffffff" />
        <ellipse cx="104" cy="80" rx="5" ry="7" fill="#78350f" />
        <circle cx="106" cy="78" r="2" fill="#ffffff" />
        {/* Friendly smile */}
        <path d="M82 100 Q90 108 98 100" stroke="#7c2d12" strokeWidth="2.5" strokeLinecap="round" />
        {/* Boba tea cup in hand */}
        <g transform="translate(115, 160)">
          <rect x="0" y="0" width="22" height="34" rx="4" fill="#fed7aa" stroke="#7c2d12" strokeWidth="2" />
          <line x1="11" y1="-8" x2="11" y2="4" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" />
          <circle cx="7" cy="26" r="3" fill="#000" />
          <circle cx="15" cy="24" r="3" fill="#000" />
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// 4. SCAMMER / ADVERSARY (DARK SHADOWY HOODIE FIGURE)
// Dramatic silhouette with glowing red spectacles and phone
// =========================================================================
function renderScammerShadow(pose: string) {
  return (
    <div className="relative w-40 h-56 sm:w-48 sm:h-64 select-none filter drop-shadow-[0_0_20px_rgba(225,29,72,0.7)]">
      <svg viewBox="0 0 200 260" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Dark Shadowy Coat */}
        <path d="M40 150 C40 120, 70 110, 100 110 C130 110, 160 120, 160 150 L175 260 L25 260 Z" fill="#0f0f17" stroke="#e11d48" strokeWidth="3" />
        {/* Hood covering face */}
        <path d="M60 70 C50 35, 80 15, 100 15 C120 15, 150 35, 140 70 L145 130 C130 145, 70 145, 55 130 Z" fill="#09090b" stroke="#e11d48" strokeWidth="3" />
        {/* Pure Shadow Void inside hood */}
        <path d="M68 75 C68 55, 132 55, 132 75 C132 110, 115 125, 100 125 C85 125, 68 110, 68 75 Z" fill="#000000" />
        {/* Glowing Sinister Red Spectacles */}
        <rect x="74" y="78" width="22" height="12" rx="3" fill="#e11d48" />
        <rect x="104" y="78" width="22" height="12" rx="3" fill="#e11d48" />
        <line x1="96" y1="84" x2="104" y2="84" stroke="#e11d48" strokeWidth="2.5" />
        {/* Sneering Sharp Grin */}
        <path d="M84 106 Q100 118 116 106 L112 110 Q100 122 88 110 Z" fill="#ffffff" />
        {/* Red Burner Phone in hand */}
        <g transform="translate(130, 165)">
          <rect x="0" y="0" width="36" height="58" rx="6" fill="#18181b" stroke="#e11d48" strokeWidth="2" />
          <rect x="4" y="6" width="28" height="46" fill="#4c0519" />
          <circle cx="18" cy="28" r="8" fill="#e11d48" opacity="0.8" className="animate-ping" />
        </g>
      </svg>
    </div>
  );
}
