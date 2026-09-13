import React from 'react';
import { MangaBackgroundScene, MangaPanelComposition } from '../../../types/manga';

interface MangaBackgroundSvgProps {
  scene?: MangaBackgroundScene;
  composition?: MangaPanelComposition;
  className?: string;
}

export const MangaBackgroundSvg: React.FC<MangaBackgroundSvgProps> = ({
  scene = 'campus-cafeteria',
  composition = 'cinematic-wide',
  className = '',
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Dynamic Environment Render */}
      {renderSceneEnvironment(scene)}

      {/* Comic Halftone Dot Matrix Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="manga-halftone-dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#ffffff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#manga-halftone-dots)" />
      </svg>
    </div>
  );
};

function renderSceneEnvironment(scene?: MangaBackgroundScene | string) {
  switch (scene) {
    case 'study-desk':
    case 'dorm-room':
      return (
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="desk-wall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="screen-glow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          {/* Back Wall */}
          <rect width="800" height="500" fill="url(#desk-wall)" />
          {/* Wall Shelves with Books */}
          <rect x="60" y="70" width="320" height="16" rx="3" fill="#334155" stroke="#1e293b" strokeWidth="2" />
          {/* Books on shelf */}
          <rect x="75" y="30" width="18" height="40" fill="#38bdf8" />
          <rect x="96" y="22" width="22" height="48" fill="#f43f5e" />
          <rect x="121" y="28" width="16" height="42" fill="#10b981" />
          <rect x="140" y="35" width="24" height="35" fill="#f59e0b" />
          {/* Cyber Wall Poster */}
          <rect x="480" y="45" width="140" height="180" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="3" />
          <text x="550" y="110" fill="#818cf8" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="monospace">
            CYBER
          </text>
          <text x="550" y="130" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            MENTOR // AI
          </text>
          {/* LED Strip along ceiling */}
          <line x1="0" y1="4" x2="800" y2="4" stroke="#06b6d4" strokeWidth="4" opacity="0.8" />

          {/* Wooden Study Desk Surface */}
          <polygon points="0,380 800,380 800,500 0,500" fill="#1e2238" stroke="#0f172a" strokeWidth="3" />
          <line x1="0" y1="384" x2="800" y2="384" stroke="#475569" strokeWidth="2" />

          {/* Dual Monitors Setup on Desk */}
          <rect x="180" y="220" width="220" height="140" rx="8" fill="#090d16" stroke="#475569" strokeWidth="4" />
          <rect x="190" y="230" width="200" height="120" fill="url(#screen-glow)" opacity="0.85" />
          <line x1="200" y1="250" x2="300" y2="250" stroke="#ffffff" strokeWidth="3" />
          <line x1="200" y1="265" x2="360" y2="265" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
          <line x1="200" y1="280" x2="280" y2="280" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
          {/* Monitor Stand */}
          <rect x="275" y="360" width="30" height="25" fill="#334155" />
          <ellipse cx="290" cy="385" rx="40" ry="6" fill="#1e293b" />

          {/* Vertical Second Monitor */}
          <rect x="425" y="195" width="110" height="165" rx="6" fill="#090d16" stroke="#475569" strokeWidth="3" />
          <rect x="432" y="202" width="96" height="151" fill="#022c22" />
          <text x="480" y="235" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle">
            SECURITY LOG
          </text>
          <line x1="440" y1="250" x2="520" y2="250" stroke="#10b981" strokeWidth="1.5" />
          <line x1="440" y1="265" x2="500" y2="265" stroke="#10b981" strokeWidth="1.5" />
          <line x1="440" y1="280" x2="515" y2="280" stroke="#10b981" strokeWidth="1.5" />

          {/* Desk Lamp Glowing */}
          <path d="M120 380 L140 260 L180 270" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" fill="none" />
          <polygon points="175,255 210,275 190,295 160,270" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
          {/* Lamp Light Cone */}
          <polygon points="190,285 340,400 120,400" fill="#fef08a" opacity="0.12" />
        </svg>
      );

    case 'coffee-shop':
      return (
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="cafe-brick" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#292524" />
              <stop offset="100%" stopColor="#1c1917" />
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill="url(#cafe-brick)" />
          {/* Brick lines */}
          {[60, 120, 180, 240, 300].map((y) => (
            <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#44403c" strokeWidth="1.5" />
          ))}
          {/* Neon "CYBER CAFE" Sign */}
          <rect x="250" y="40" width="300" height="70" rx="12" fill="#18181b" stroke="#f43f5e" strokeWidth="3" />
          <text x="400" y="85" fill="#fb7185" fontSize="24" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            ☕ CYBER COFFEE
          </text>
          {/* Hanging Industrial Pendant Lamps */}
          <line x1="200" y1="0" x2="200" y2="160" stroke="#78716c" strokeWidth="3" />
          <polygon points="170,190 230,190 210,160 190,160" fill="#eab308" />
          <line x1="600" y1="0" x2="600" y2="160" stroke="#78716c" strokeWidth="3" />
          <polygon points="570,190 630,190 610,160 590,160" fill="#eab308" />
          {/* Coffee Counter */}
          <polygon points="0,350 800,350 800,500 0,500" fill="#292524" stroke="#1c1917" strokeWidth="4" />
          {/* Suspicious Wi-Fi Router on Shelf */}
          <rect x="640" y="240" width="100" height="40" rx="4" fill="#09090b" stroke="#ef4444" strokeWidth="2" />
          {/* Antennas */}
          <line x1="660" y1="240" x2="650" y2="200" stroke="#ef4444" strokeWidth="3" />
          <line x1="720" y1="240" x2="730" y2="200" stroke="#ef4444" strokeWidth="3" />
          {/* Blinking router LEDs */}
          <circle cx="660" cy="260" r="3" fill="#22c55e" />
          <circle cx="680" cy="260" r="3" fill="#eab308" />
          <circle cx="700" cy="260" r="4" fill="#ef4444" className="animate-ping" />
        </svg>
      );

    case 'computer-lab':
      return (
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="lab-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#082f49" />
              <stop offset="100%" stopColor="#031926" />
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill="url(#lab-bg)" />
          {/* Server Rack on the right */}
          <rect x="620" y="40" width="160" height="420" rx="6" fill="#0f172a" stroke="#0ea5e9" strokeWidth="3" />
          {[80, 140, 200, 260, 320, 380].map((y) => (
            <g key={y}>
              <rect x="635" y={y} width="130" height="45" rx="3" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
              <circle cx="650" cy={y + 22} r="3" fill="#38bdf8" />
              <circle cx="665" cy={y + 22} r="3" fill="#22c55e" />
              <circle cx="680" cy={y + 22} r="3" fill="#f59e0b" />
            </g>
          ))}
          {/* Lab Table */}
          <polygon points="0,360 600,360 600,500 0,500" fill="#0f172a" stroke="#0284c7" strokeWidth="3" />
          {/* Row of Student Terminals */}
          {[80, 240, 400].map((x) => (
            <rect key={x} x={x} y="250" width="120" height="90" rx="4" fill="#021319" stroke="#0284c7" strokeWidth="2" />
          ))}
        </svg>
      );

    case 'subway-station':
      return (
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <rect width="800" height="500" fill="#18181b" />
          {/* Tiled Wall */}
          {[50, 100, 150, 200, 250, 300].map((y) => (
            <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#27272a" strokeWidth="2" />
          ))}
          {/* Vending Machine with QR Poster */}
          <rect x="520" y="100" width="180" height="340" rx="8" fill="#27272a" stroke="#3f3f46" strokeWidth="3" />
          <rect x="540" y="120" width="140" height="160" rx="4" fill="#09090b" stroke="#52525b" strokeWidth="2" />
          {/* Suspicious QR Code Sticker taped over payment */}
          <rect x="560" y="300" width="100" height="90" rx="4" fill="#ffffff" stroke="#ef4444" strokeWidth="3" />
          <text x="610" y="325" fill="#dc2626" fontSize="10" fontWeight="bold" textAnchor="middle">
            PAY HERE
          </text>
          {/* Tape strips holding QR code */}
          <rect x="550" y="295" width="30" height="8" rx="2" fill="#fef08a" opacity="0.8" transform="rotate(-15 550 295)" />
          <rect x="645" y="375" width="30" height="8" rx="2" fill="#fef08a" opacity="0.8" transform="rotate(-15 645 375)" />
        </svg>
      );

    case 'cyber-matrix':
      return (
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="matrix-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#022c22" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill="url(#matrix-grad)" />
          {/* Perspective 3D Grid */}
          {[0, 100, 200, 300, 400, 500, 600, 700, 800].map((x) => (
            <line key={x} x1="400" y1="180" x2={x} y2="500" stroke="#10b981" strokeWidth="1" opacity="0.4" />
          ))}
          {[220, 270, 330, 400, 480].map((y) => (
            <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#10b981" strokeWidth="1" opacity="0.4" />
          ))}
          {/* Digital Hexagons Floating */}
          <polygon points="400,80 440,100 440,140 400,160 360,140 360,100" fill="none" stroke="#34d399" strokeWidth="2" opacity="0.6" />
          <polygon points="200,120 230,135 230,165 200,180 170,165 170,135" fill="none" stroke="#06b6d4" strokeWidth="1.5" opacity="0.5" />
          <polygon points="600,130 630,145 630,175 600,190 570,175 570,145" fill="none" stroke="#f43f5e" strokeWidth="1.5" opacity="0.5" />
        </svg>
      );

    case 'campus-hallway':
      return (
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <rect width="800" height="500" fill="#1e293b" />
          {/* Lockers lining hallway on left */}
          {[40, 120, 200, 280].map((x) => (
            <g key={x}>
              <rect x={x} y="120" width="70" height="280" rx="3" fill="#334155" stroke="#0f172a" strokeWidth="2" />
              <line x1={x + 15} y1="160" x2={x + 55} y2="160" stroke="#0f172a" strokeWidth="3" />
              <line x1={x + 15} y1="175" x2={x + 55} y2="175" stroke="#0f172a" strokeWidth="3" />
              <circle cx={x + 55} cy="260" r="4" fill="#94a3b8" />
            </g>
          ))}
          {/* Campus Bulletin Board on right */}
          <rect x="440" y="100" width="280" height="200" rx="6" fill="#78350f" stroke="#451a03" strokeWidth="4" />
          <rect x="455" y="115" width="250" height="170" fill="#d97706" opacity="0.4" />
          {/* Fliers pinned to board */}
          <rect x="470" y="130" width="70" height="90" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
          <rect x="560" y="140" width="80" height="100" fill="#fbcfe8" stroke="#db2777" strokeWidth="1" />
          <rect x="510" y="180" width="75" height="85" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1" />
        </svg>
      );

    case 'campus-cafeteria':
    default:
      return (
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="cafe-interior" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="60%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <linearGradient id="sun-window" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
          </defs>
          {/* Wall Interior */}
          <rect width="800" height="500" fill="url(#cafe-interior)" />

          {/* Large Archway Campus Windows */}
          <path d="M120 70 Q220 20 320 70 L320 240 L120 240 Z" fill="url(#sun-window)" opacity="0.8" stroke="#475569" strokeWidth="4" />
          {/* Window Muntins */}
          <line x1="220" y1="35" x2="220" y2="240" stroke="#475569" strokeWidth="3" />
          <line x1="120" y1="150" x2="320" y2="150" stroke="#475569" strokeWidth="3" />

          {/* Second Window */}
          <path d="M480 70 Q580 20 680 70 L680 240 L480 240 Z" fill="url(#sun-window)" opacity="0.8" stroke="#475569" strokeWidth="4" />
          <line x1="580" y1="35" x2="580" y2="240" stroke="#475569" strokeWidth="3" />
          <line x1="480" y1="150" x2="680" y2="150" stroke="#475569" strokeWidth="3" />

          {/* Outside Trees visible through window */}
          <circle cx="180" cy="200" r="35" fill="#15803d" />
          <circle cx="260" cy="180" r="40" fill="#16a34a" />
          <circle cx="550" cy="190" r="38" fill="#16a34a" />

          {/* Campus Cafeteria Banners */}
          <polygon points="370,50 430,50 430,130 400,110 370,130" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
          <text x="400" y="85" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            CAMPUS
          </text>

          {/* Wooden Cafeteria Table in foreground */}
          <polygon points="0,370 800,370 800,500 0,500" fill="#1e2238" stroke="#0f172a" strokeWidth="4" />
          <line x1="0" y1="375" x2="800" y2="375" stroke="#334155" strokeWidth="2" />
          {/* Boba Cup / Coffee Mug on table */}
          <g transform="translate(620, 330)">
            <rect x="0" y="0" width="28" height="42" rx="4" fill="#fdba74" stroke="#7c2d12" strokeWidth="2" />
            <line x1="14" y1="-10" x2="14" y2="4" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" />
            <circle cx="8" cy="32" r="3" fill="#000" />
            <circle cx="18" cy="30" r="3" fill="#000" />
          </g>
        </svg>
      );
  }
}
