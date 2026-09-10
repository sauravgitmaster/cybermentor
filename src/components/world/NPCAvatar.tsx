import React from 'react';
import { CheckCircle2, MessageCircle } from 'lucide-react';

interface NPCAvatarProps {
  id: string;
  name: string;
  role: string;
  x: number;
  y: number;
  isNearPlayer: boolean;
  isCompleted: boolean;
  isUnlocked: boolean;
  missionCode?: string;
  onInteract?: () => void;
}

export const NPCAvatar: React.FC<NPCAvatarProps> = ({
  id,
  name,
  role,
  x,
  y,
  isNearPlayer,
  isCompleted,
  isUnlocked,
  onInteract,
}) => {
  return (
    <div
      id={`npc-${id}`}
      onClick={onInteract}
      className={`absolute select-none z-20 cursor-pointer group transition-transform duration-150 ${
        isNearPlayer ? 'scale-110' : 'hover:scale-105'
      }`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -85%)',
      }}
    >
      {/* Overhead RPG Quest Bubble & Name */}
      <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap flex flex-col items-center pointer-events-none transition-all duration-150">
        {/* RPG Quest Bubble */}
        <div className="mb-0.5">
          {isCompleted ? (
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-600 shadow-md text-emerald-300 text-[9px] font-bold font-mono">
              <CheckCircle2 className="h-2.5 w-2.5" />
              <span>SAVED</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-500 border border-amber-300 shadow-md text-slate-950 text-[10px] font-black font-mono animate-bounce">
              <span>!</span>
              <span className="text-[8px] font-bold">HELP</span>
            </div>
          )}
        </div>

        {/* Character Name Tag */}
        <div
          className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wide border shadow-sm transition-colors ${
            isNearPlayer
              ? 'bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-400/40'
              : 'bg-[#0f172a]/90 text-slate-200 border-[#334155]'
          }`}
        >
          {name}
        </div>
      </div>

      {/* Ground Contact Shadow */}
      <div className="absolute left-1/2 top-[34px] -translate-x-1/2 w-7 h-2.5 bg-black/40 rounded-full blur-[1px]" />

      {/* 2D Vector RPG Sprite */}
      <div className="relative w-9 h-10 animate-pulse" style={{ animationDuration: '4s' }}>
        <svg
          viewBox="0 0 36 40"
          className="w-9 h-10 drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ================================================= */}
          {/* JORDAN RIVERA (Sophomore Biology)                 */}
          {/* ================================================= */}
          {id === 'npc-jordan' && (
            <g id="npc-jordan-sprite">
              {/* Shoes */}
              <rect x="10" y="32" width="5" height="4.5" rx="1" fill="#475569" />
              <rect x="21" y="32" width="5" height="4.5" rx="1" fill="#475569" />
              {/* Khaki Trousers */}
              <rect x="10" y="25" width="5" height="8" rx="1" fill="#78716c" />
              <rect x="21" y="25" width="5" height="8" rx="1" fill="#78716c" />

              {/* Utility Olive Jacket */}
              <rect x="8.5" y="15" width="19" height="12" rx="2.5" fill="#3f6212" stroke="#365314" strokeWidth="1" />
              <line x1="18" y1="15" x2="18" y2="26" stroke="#26390e" strokeWidth="1.2" />

              {/* Arms holding laptop or coffee */}
              {isCompleted ? (
                // Holding celebratory coffee cup
                <g>
                  <rect x="5.5" y="17" width="4" height="7" rx="1" fill="#3f6212" />
                  <rect x="26.5" y="17" width="4" height="7" rx="1" fill="#3f6212" />
                  <rect x="15" y="19" width="6" height="7" rx="1" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
                  <rect x="15" y="21" width="6" height="3" fill="#b45309" />
                </g>
              ) : (
                // Holding anxious glowing laptop
                <g>
                  <rect x="5.5" y="17" width="4" height="7" rx="1" fill="#3f6212" />
                  <rect x="26.5" y="17" width="4" height="7" rx="1" fill="#3f6212" />
                  <rect x="11" y="18" width="14" height="8" rx="1.5" fill="#1e293b" stroke="#475569" strokeWidth="0.8" />
                  <rect x="12.5" y="19" width="11" height="6" rx="0.5" fill="#f59e0b" className="animate-pulse" />
                </g>
              )}

              {/* Head & Face */}
              <rect x="11" y="7" width="14" height="11" rx="3.5" fill="#fed7aa" />

              {/* Messy Brown Student Hair */}
              <path
                d="M9 9 C9 3, 27 3, 27 9 C27 12, 25 10, 23 10 C21 11, 20 8, 18 10 C16 11, 14 9, 9 9 Z"
                fill="#543821"
              />
              <rect x="9.5" y="8" width="2" height="5" rx="0.5" fill="#543821" />
              <rect x="24.5" y="8" width="2" height="5" rx="0.5" fill="#543821" />

              {/* Eyes */}
              <circle cx="14.5" cy="12" r="1.3" fill="#1e293b" />
              <circle cx="21.5" cy="12" r="1.3" fill="#1e293b" />

              {/* Expression */}
              {isCompleted ? (
                <path d="M15 15 Q18 16.5 21 15" stroke="#9a3412" strokeWidth="0.9" fill="none" strokeLinecap="round" />
              ) : (
                <path d="M15 15.5 Q18 14.5 21 15.5" stroke="#9a3412" strokeWidth="0.9" fill="none" strokeLinecap="round" />
              )}
            </g>
          )}

          {/* ================================================= */}
          {/* MARCUS CHEN (Lab Proctor)                         */}
          {/* ================================================= */}
          {id === 'npc-marcus' && (
            <g id="npc-marcus-sprite">
              {/* Shoes & Jeans */}
              <rect x="10" y="32" width="5" height="4.5" rx="1" fill="#0f172a" />
              <rect x="21" y="32" width="5" height="4.5" rx="1" fill="#0f172a" />
              <rect x="10" y="25" width="5" height="8" rx="1" fill="#1e3a8a" />
              <rect x="21" y="25" width="5" height="8" rx="1" fill="#1e3a8a" />

              {/* Dark Navy Technical Shirt */}
              <rect x="8.5" y="15" width="19" height="12" rx="2.5" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
              {/* Lab ID Badge Lanyard */}
              <path d="M15 15 L18 20 L21 15" stroke="#38bdf8" strokeWidth="1" fill="none" />
              <rect x="16.5" y="20" width="3" height="4" rx="0.5" fill="#f8fafc" stroke="#64748b" strokeWidth="0.5" />

              {/* Arms holding USB drive */}
              <rect x="5.5" y="17" width="4" height="7" rx="1" fill="#1e293b" />
              <rect x="26.5" y="17" width="4" height="7" rx="1" fill="#1e293b" />
              {/* USB thumbdrive in hand */}
              <rect x="22" y="20" width="7" height="3" rx="0.5" fill="#000000" stroke="#64748b" strokeWidth="0.6" />
              <rect x="27" y="20.5" width="3" height="2" fill="#cbd5e1" />

              {/* Head */}
              <rect x="11" y="7" width="14" height="11" rx="3.5" fill="#ffedd5" />
              {/* Neat Black Hair */}
              <path d="M10 8 C10 3, 26 3, 26 8 C26 10, 24 9, 21 9 L15 9 Z" fill="#0f172a" />

              {/* Rectangular Glasses */}
              <rect x="13" y="10.5" width="3.5" height="3" rx="0.5" stroke="#0f172a" strokeWidth="0.8" fill="#e0f2fe" fillOpacity="0.4" />
              <line x1="16.5" y1="12" x2="19.5" y2="12" stroke="#0f172a" strokeWidth="0.8" />
              <rect x="19.5" y="10.5" width="3.5" height="3" rx="0.5" stroke="#0f172a" strokeWidth="0.8" fill="#e0f2fe" fillOpacity="0.4" />
              <circle cx="14.5" cy="12" r="0.8" fill="#0f172a" />
              <circle cx="21" cy="12" r="0.8" fill="#0f172a" />
            </g>
          )}

          {/* ================================================= */}
          {/* ELENA ROSTOVA (Research Fellow)                   */}
          {/* ================================================= */}
          {id === 'npc-elena' && (
            <g id="npc-elena-sprite">
              {/* Boots & Skirt */}
              <rect x="10" y="32" width="5" height="4.5" rx="1" fill="#451a03" />
              <rect x="21" y="32" width="5" height="4.5" rx="1" fill="#451a03" />
              <rect x="10" y="27" width="5" height="6" fill="#fed7aa" />
              <rect x="21" y="27" width="5" height="6" fill="#fed7aa" />
              <polygon points="9,25 27,25 28,29 8,29" fill="#334155" />

              {/* Burgundy Knit Turtleneck */}
              <rect x="8.5" y="15" width="19" height="12" rx="2.5" fill="#831843" stroke="#701a75" strokeWidth="1" />
              <rect x="14" y="14" width="8" height="3" rx="1" fill="#701a75" />

              {/* Arms holding tablet */}
              <rect x="5.5" y="17" width="4" height="7" rx="1" fill="#831843" />
              <rect x="26.5" y="17" width="4" height="7" rx="1" fill="#831843" />
              <rect x="12" y="18" width="12" height="8" rx="1" fill="#0f172a" stroke="#475569" strokeWidth="0.8" />
              <rect x="13" y="19" width="10" height="6" fill="#0284c7" />

              {/* Head */}
              <rect x="11" y="7" width="14" height="11" rx="3.5" fill="#ffedd5" />
              {/* Blonde Hair Bun */}
              <circle cx="18" cy="5" r="3.5" fill="#ca8a04" />
              <path d="M10 8 C10 3, 26 3, 26 8 C26 11, 23 10, 18 10 Z" fill="#ca8a04" />

              {/* Spectacles */}
              <circle cx="14" cy="12" r="2" stroke="#78350f" strokeWidth="0.7" fill="#e0f2fe" fillOpacity="0.3" />
              <line x1="16" y1="12" x2="20" y2="12" stroke="#78350f" strokeWidth="0.7" />
              <circle cx="22" cy="12" r="2" stroke="#78350f" strokeWidth="0.7" fill="#e0f2fe" fillOpacity="0.3" />
              <circle cx="14" cy="12" r="0.9" fill="#0f172a" />
              <circle cx="22" cy="12" r="0.9" fill="#0f172a" />
            </g>
          )}

          {/* ================================================= */}
          {/* CHIEF ANALYST VANCE (SecOps Lead)                */}
          {/* ================================================= */}
          {id === 'npc-chief-vance' && (
            <g id="npc-vance-sprite">
              <rect x="10" y="32" width="5" height="4.5" rx="1" fill="#0f172a" />
              <rect x="21" y="32" width="5" height="4.5" rx="1" fill="#0f172a" />
              <rect x="10" y="25" width="5" height="8" rx="1" fill="#1e293b" />
              <rect x="21" y="25" width="5" height="8" rx="1" fill="#1e293b" />

              {/* Tactical SecOps Navy Coat & Security Badge */}
              <rect x="8.5" y="15" width="19" height="12" rx="2.5" fill="#1e3a5f" stroke="#0f2744" strokeWidth="1" />
              <rect x="11" y="17" width="3" height="3" fill="#f59e0b" />
              <rect x="17" y="15" width="2" height="12" fill="#0f2744" />

              <rect x="5.5" y="17" width="4" height="7" rx="1" fill="#1e3a5f" />
              <rect x="26.5" y="17" width="4" height="7" rx="1" fill="#1e3a5f" />

              {/* Head */}
              <rect x="11" y="7" width="14" height="11" rx="3.5" fill="#e2c4a6" />
              {/* Short Silver-Gray Hair */}
              <path d="M10 8 C10 2, 26 2, 26 8 C26 9, 24 9, 18 9 Z" fill="#64748b" />
              <circle cx="14" cy="12" r="1.1" fill="#0f172a" />
              <circle cx="22" cy="12" r="1.1" fill="#0f172a" />
            </g>
          )}

          {/* ================================================= */}
          {/* DEFAULT / TARIQ (Urban Commuter)                 */}
          {id !== 'npc-jordan' && id !== 'npc-marcus' && id !== 'npc-elena' && id !== 'npc-chief-vance' && (
            <g id="npc-generic-sprite">
              <rect x="10" y="32" width="5" height="4.5" rx="1" fill="#1e293b" />
              <rect x="21" y="32" width="5" height="4.5" rx="1" fill="#1e293b" />
              <rect x="10" y="25" width="5" height="8" rx="1" fill="#334155" />
              <rect x="21" y="25" width="5" height="8" rx="1" fill="#334155" />

              <rect x="8.5" y="15" width="19" height="12" rx="2.5" fill="#475569" stroke="#334155" strokeWidth="1" />
              {/* Scarf */}
              <rect x="12" y="14" width="12" height="4" rx="1" fill="#d97706" />

              <rect x="5.5" y="17" width="4" height="7" rx="1" fill="#475569" />
              <rect x="26.5" y="17" width="4" height="7" rx="1" fill="#475569" />

              <rect x="11" y="7" width="14" height="11" rx="3.5" fill="#fed7aa" />
              <path d="M10 8 C10 3, 26 3, 26 8 C26 11, 23 10, 18 10 Z" fill="#1e293b" />
              <circle cx="14" cy="12" r="1.2" fill="#1e293b" />
              <circle cx="22" cy="12" r="1.2" fill="#1e293b" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
