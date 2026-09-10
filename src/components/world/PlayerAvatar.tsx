import React from 'react';
import { Direction } from '../../types/world';

interface PlayerAvatarProps {
  x: number;
  y: number;
  direction: Direction;
  isMoving: boolean;
  playerName: string;
}

export const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  x,
  y,
  direction,
  isMoving,
  playerName,
}) => {
  return (
    <div
      id="player-avatar"
      className="absolute pointer-events-none select-none z-25 transition-transform duration-75 ease-linear"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -85%)',
      }}
    >
      {/* Operative Nameplate - Crisp, Charming RPG Badge */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <div className="px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-amber-300 bg-[#162032]/95 border border-[#3b5278] rounded-full shadow-md flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{playerName.toUpperCase()}</span>
        </div>
      </div>

      {/* Ground Contact Shadow */}
      <div
        className={`absolute left-1/2 top-[34px] -translate-x-1/2 rounded-full bg-black/40 blur-[1px] transition-all duration-200 ${
          isMoving ? 'w-6 h-2 opacity-60' : 'w-7 h-2.5 opacity-80'
        }`}
      />

      {/* 2D RPG Protagonist Character Sprite */}
      <div
        className={`relative w-9 h-10 transition-transform duration-150 ease-out ${
          isMoving ? 'avatar-walk-bob' : 'hover:scale-105'
        }`}
      >
        <svg
          viewBox="0 0 36 40"
          className="w-9 h-10 drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ================================================= */}
          {/* DIRECTION: DOWN (Facing South / Toward Player)   */}
          {/* ================================================= */}
          {direction === 'down' && (
            <g id="rpg-hero-down">
              {/* Left Leg & White/Cyan Sneaker */}
              <g className={isMoving ? 'avatar-leg-left-moving' : ''}>
                <rect x="10" y="27" width="5" height="7" rx="1" fill="#202938" />
                <rect x="9.5" y="33" width="6" height="4.5" rx="1.5" fill="#f8fafc" stroke="#334155" strokeWidth="0.8" />
                <rect x="11" y="34.5" width="3" height="1.5" fill="#06b6d4" />
              </g>

              {/* Right Leg & White/Cyan Sneaker */}
              <g className={isMoving ? 'avatar-leg-right-moving' : ''}>
                <rect x="21" y="27" width="5" height="7" rx="1" fill="#202938" />
                <rect x="20.5" y="33" width="6" height="4.5" rx="1.5" fill="#f8fafc" stroke="#334155" strokeWidth="0.8" />
                <rect x="22" y="34.5" width="3" height="1.5" fill="#06b6d4" />
              </g>

              {/* Left Arm & Sleeve */}
              <g className={isMoving ? 'avatar-arm-left-moving' : ''}>
                <rect x="5.5" y="17" width="4" height="8" rx="1.5" fill="#0284c7" />
                <circle cx="7.5" cy="25.5" r="1.8" fill="#fbcfe8" />
              </g>

              {/* Right Arm & Sleeve */}
              <g className={isMoving ? 'avatar-arm-right-moving' : ''}>
                <rect x="26.5" y="17" width="4" height="8" rx="1.5" fill="#0284c7" />
                <circle cx="28.5" cy="25.5" r="1.8" fill="#fbcfe8" />
              </g>

              {/* Operative Jacket Torso */}
              <rect x="8.5" y="15" width="19" height="13" rx="2.5" fill="#0369a1" stroke="#075985" strokeWidth="1" />
              {/* White Collar and Center Zipper */}
              <path d="M14 15 L18 19 L22 15" stroke="#ffffff" strokeWidth="1.2" fill="none" />
              <line x1="18" y1="19" x2="18" y2="28" stroke="#ffffff" strokeWidth="1" />

              {/* Crossbody Tactical Bag Strap */}
              <line x1="10" y1="16" x2="26" y2="26" stroke="#f59e0b" strokeWidth="1.5" />
              {/* Cyber Security Emblem Badge */}
              <circle cx="13" cy="20" r="1.8" fill="#fbbf24" stroke="#d97706" strokeWidth="0.6" />

              {/* Utility Belt */}
              <rect x="9" y="25" width="18" height="2.5" rx="0.5" fill="#1e293b" />
              <rect x="16.5" y="24.5" width="3" height="3" rx="0.5" fill="#06b6d4" />

              {/* Head & Face (Warm Skin Tone) */}
              <rect x="11" y="7" width="14" height="11" rx="3.5" fill="#fed7aa" />

              {/* Operative Hair (Auburn / Brown Adventurer Style) */}
              <path
                d="M10 9 C10 3, 26 3, 26 9 C26 12, 24 10, 22 10 C20 10, 19 8, 17 10 C15 11, 13 9, 10 9 Z"
                fill="#78350f"
              />
              {/* Sideburns */}
              <rect x="10" y="8" width="2" height="5" rx="0.5" fill="#78350f" />
              <rect x="24" y="8" width="2" height="5" rx="0.5" fill="#78350f" />

              {/* Big Expressive RPG Eyes */}
              <ellipse cx="14" cy="12" rx="1.2" ry="1.8" fill="#1e293b" />
              <circle cx="14.3" cy="11.4" r="0.5" fill="#ffffff" />

              <ellipse cx="22" cy="12" rx="1.2" ry="1.8" fill="#1e293b" />
              <circle cx="22.3" cy="11.4" r="0.5" fill="#ffffff" />

              {/* Smile */}
              <path d="M16.5 15 Q18 16 19.5 15" stroke="#9a3412" strokeWidth="0.8" fill="none" strokeLinecap="round" />

              {/* Operative Tech Headset / Earpiece */}
              <circle cx="9.8" cy="11" r="1.2" fill="#06b6d4" stroke="#0891b2" strokeWidth="0.5" />
            </g>
          )}

          {/* ================================================= */}
          {/* DIRECTION: UP (Facing North / Facing Away)       */}
          {/* ================================================= */}
          {direction === 'up' && (
            <g id="rpg-hero-up">
              {/* Left Leg */}
              <g className={isMoving ? 'avatar-leg-left-moving' : ''}>
                <rect x="10" y="27" width="5" height="7" rx="1" fill="#202938" />
                <rect x="9.5" y="33" width="6" height="4.5" rx="1.5" fill="#f8fafc" stroke="#334155" strokeWidth="0.8" />
              </g>

              {/* Right Leg */}
              <g className={isMoving ? 'avatar-leg-right-moving' : ''}>
                <rect x="21" y="27" width="5" height="7" rx="1" fill="#202938" />
                <rect x="20.5" y="33" width="6" height="4.5" rx="1.5" fill="#f8fafc" stroke="#334155" strokeWidth="0.8" />
              </g>

              {/* Left Arm */}
              <g className={isMoving ? 'avatar-arm-left-moving' : ''}>
                <rect x="5.5" y="17" width="4" height="8" rx="1.5" fill="#0284c7" />
              </g>

              {/* Right Arm */}
              <g className={isMoving ? 'avatar-arm-right-moving' : ''}>
                <rect x="26.5" y="17" width="4" height="8" rx="1.5" fill="#0284c7" />
              </g>

              {/* Jacket Back */}
              <rect x="8.5" y="15" width="19" height="13" rx="2.5" fill="#0369a1" stroke="#075985" strokeWidth="1" />

              {/* Tech Messenger Backpack on Back */}
              <rect x="12" y="18" width="12" height="8" rx="1.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.8" />
              <line x1="14" y1="21" x2="22" y2="21" stroke="#06b6d4" strokeWidth="1" />
              <circle cx="18" cy="24" r="1" fill="#10b981" />

              {/* Hair Back */}
              <rect x="10" y="5" width="16" height="12" rx="4" fill="#78350f" />
              <path d="M12 15 L14 17 L16 15 L18 17 L20 15 L22 17 L24 15" stroke="#542308" strokeWidth="1" />
            </g>
          )}

          {/* ================================================= */}
          {/* DIRECTION: LEFT (Facing West)                    */}
          {/* ================================================= */}
          {direction === 'left' && (
            <g id="rpg-hero-left">
              {/* Moving Legs Profile */}
              <g className={isMoving ? 'avatar-leg-left-moving' : ''}>
                <rect x="12" y="27" width="6" height="7" rx="1" fill="#202938" />
                <rect x="9.5" y="33" width="8" height="4.5" rx="1.5" fill="#f8fafc" stroke="#334155" strokeWidth="0.8" />
                <rect x="10.5" y="34.5" width="3" height="1.5" fill="#06b6d4" />
              </g>

              {/* Jacket Torso Profile */}
              <rect x="11" y="15" width="15" height="13" rx="2.5" fill="#0369a1" stroke="#075985" strokeWidth="1" />
              {/* Side Tech Pouch */}
              <rect x="19" y="19" width="4" height="6" rx="1" fill="#0f172a" stroke="#f59e0b" strokeWidth="0.8" />

              {/* Swinging Arm */}
              <g className={isMoving ? 'avatar-arm-left-moving' : ''}>
                <rect x="14" y="17" width="4.5" height="8" rx="1.5" fill="#0284c7" />
                <circle cx="16" cy="25.5" r="1.8" fill="#fed7aa" />
              </g>

              {/* Head Profile */}
              <rect x="11" y="7" width="13" height="11" rx="3.5" fill="#fed7aa" />
              {/* Hair Profile */}
              <path d="M10 8 C11 3, 24 3, 24 9 C24 14, 22 13, 20 12 L19 8 Z" fill="#78350f" />
              {/* Eye Profile */}
              <ellipse cx="13.5" cy="12" rx="1" ry="1.6" fill="#1e293b" />
              <circle cx="13.2" cy="11.5" r="0.4" fill="#ffffff" />
            </g>
          )}

          {/* ================================================= */}
          {/* DIRECTION: RIGHT (Facing East)                   */}
          {/* ================================================= */}
          {direction === 'right' && (
            <g id="rpg-hero-right">
              {/* Moving Legs Profile */}
              <g className={isMoving ? 'avatar-leg-right-moving' : ''}>
                <rect x="18" y="27" width="6" height="7" rx="1" fill="#202938" />
                <rect x="18.5" y="33" width="8" height="4.5" rx="1.5" fill="#f8fafc" stroke="#334155" strokeWidth="0.8" />
                <rect x="22.5" y="34.5" width="3" height="1.5" fill="#06b6d4" />
              </g>

              {/* Jacket Torso Profile */}
              <rect x="10" y="15" width="15" height="13" rx="2.5" fill="#0369a1" stroke="#075985" strokeWidth="1" />
              {/* Side Tech Pouch */}
              <rect x="13" y="19" width="4" height="6" rx="1" fill="#0f172a" stroke="#f59e0b" strokeWidth="0.8" />

              {/* Swinging Arm */}
              <g className={isMoving ? 'avatar-arm-right-moving' : ''}>
                <rect x="17.5" y="17" width="4.5" height="8" rx="1.5" fill="#0284c7" />
                <circle cx="20" cy="25.5" r="1.8" fill="#fed7aa" />
              </g>

              {/* Head Profile */}
              <rect x="12" y="7" width="13" height="11" rx="3.5" fill="#fed7aa" />
              {/* Hair Profile */}
              <path d="M26 8 C25 3, 12 3, 12 9 C12 14, 14 13, 16 12 L17 8 Z" fill="#78350f" />
              {/* Eye Profile */}
              <ellipse cx="22.5" cy="12" rx="1" ry="1.6" fill="#1e293b" />
              <circle cx="22.8" cy="11.5" r="0.4" fill="#ffffff" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
