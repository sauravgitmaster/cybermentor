import React from 'react';
import { ScenarioParticipant } from '../../types/scenario';

interface ScenarioParticipantAvatarProps {
  participant: ScenarioParticipant;
}

export const ScenarioParticipantAvatar: React.FC<ScenarioParticipantAvatarProps> = ({ participant }) => {
  const { avatarType } = participant;

  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Soft Ground Shadow */}
      <div className="absolute -bottom-2 w-16 h-4 bg-black/40 rounded-full blur-[2px]" />

      {/* SVG Character Sprite */}
      <div className="relative w-20 h-24 sm:w-24 sm:h-28 transition-transform hover:scale-105 duration-200">
        <svg viewBox="0 0 48 56" className="w-full h-full drop-shadow-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base Head for all characters */}
          {/* Default Hair & Accents based on avatarType */}

          {avatarType === 'student-worried' && (
            <g id="avatar-student-worried">
              {/* Legs / Shoes */}
              <rect x="15" y="40" width="7" height="10" rx="2" fill="#1e293b" />
              <rect x="26" y="40" width="7" height="10" rx="2" fill="#1e293b" />
              <rect x="14" y="48" width="8" height="5" rx="2" fill="#e2e8f0" stroke="#475569" strokeWidth="0.8" />
              <rect x="26" y="48" width="8" height="5" rx="2" fill="#e2e8f0" stroke="#475569" strokeWidth="0.8" />

              {/* Torso: Casual Hoodie */}
              <rect x="12" y="24" width="24" height="18" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="1" />
              <path d="M19 24 L24 30 L29 24" stroke="#ffffff" strokeWidth="1.5" fill="none" />
              {/* Open Laptop held in hands */}
              <rect x="14" y="32" width="20" height="9" rx="1.5" fill="#334155" stroke="#94a3b8" strokeWidth="0.8" />
              <rect x="16" y="33" width="16" height="5" rx="0.5" fill="#38bdf8" className="animate-pulse" />

              {/* Head & Neck */}
              <rect x="18" y="20" width="12" height="6" fill="#fcd34d" />
              <circle cx="24" cy="14" r="10" fill="#fcd34d" />

              {/* Hair: Messy student brown */}
              <path d="M14 12 C14 5, 34 5, 34 12 C34 14, 32 15, 30 13 C27 15, 23 11, 20 14 C17 15, 14 14, 14 12 Z" fill="#78350f" />

              {/* Worried Eyebrows & Eyes */}
              <path d="M19 11 L22 13" stroke="#451a03" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M29 11 L26 13" stroke="#451a03" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="20.5" cy="15" r="1.5" fill="#1e293b" />
              <circle cx="27.5" cy="15" r="1.5" fill="#1e293b" />
              {/* Wobbly mouth */}
              <path d="M21 19 Q24 17 27 19" stroke="#92400e" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              {/* Sweat drop */}
              <path d="M33 11 C33 9, 35 12, 35 13 C35 14, 34 15, 33 15 C32 15, 31 14, 31 13 Z" fill="#38bdf8" />
            </g>
          )}

          {avatarType === 'lab-proctor' && (
            <g id="avatar-lab-proctor">
              {/* Legs / Boots */}
              <rect x="15" y="40" width="7" height="10" rx="2" fill="#334155" />
              <rect x="26" y="40" width="7" height="10" rx="2" fill="#334155" />
              <rect x="14" y="48" width="8" height="5" rx="2" fill="#0f172a" />
              <rect x="26" y="48" width="8" height="5" rx="2" fill="#0f172a" />

              {/* Lab Technician Shirt + Tool Belt */}
              <rect x="12" y="24" width="24" height="18" rx="3" fill="#1e3a8a" stroke="#172554" strokeWidth="1" />
              <rect x="12" y="38" width="24" height="4" fill="#78350f" />
              <rect x="22" y="38" width="4" height="4" fill="#fbbf24" />
              {/* Lab Lanyard */}
              <path d="M20 24 L24 33 L28 24" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
              <rect x="22" y="33" width="4" height="5" rx="1" fill="#f8fafc" stroke="#64748b" strokeWidth="0.5" />

              {/* Head */}
              <rect x="18" y="20" width="12" height="6" fill="#fde047" />
              <circle cx="24" cy="14" r="10" fill="#fde047" />

              {/* Beanie Hat */}
              <path d="M13 14 C13 6, 35 6, 35 14 Z" fill="#0f766e" />
              <rect x="13" y="12" width="22" height="4" rx="1" fill="#115e59" />

              {/* Glasses */}
              <rect x="17" y="14" width="6" height="4" rx="1" stroke="#0f172a" strokeWidth="1.2" fill="#e0f2fe" fillOpacity="0.7" />
              <rect x="25" y="14" width="6" height="4" rx="1" stroke="#0f172a" strokeWidth="1.2" fill="#e0f2fe" fillOpacity="0.7" />
              <line x1="23" y1="16" x2="25" y2="16" stroke="#0f172a" strokeWidth="1.2" />

              {/* Mouth */}
              <line x1="22" y1="21" x2="26" y2="21" stroke="#854d0e" strokeWidth="1.2" strokeLinecap="round" />
            </g>
          )}

          {avatarType === 'professor' && (
            <g id="avatar-professor">
              {/* Legs */}
              <rect x="16" y="40" width="6" height="10" rx="2" fill="#475569" />
              <rect x="26" y="40" width="6" height="10" rx="2" fill="#475569" />
              <rect x="15" y="48" width="8" height="5" rx="2" fill="#451a03" />
              <rect x="25" y="48" width="8" height="5" rx="2" fill="#451a03" />

              {/* Tweed Jacket & Tie */}
              <rect x="12" y="24" width="24" height="18" rx="3" fill="#78350f" stroke="#451a03" strokeWidth="1" />
              <polygon points="18,24 24,34 30,24" fill="#f8fafc" />
              <polygon points="23,26 25,26 24,33" fill="#b91c1c" />

              {/* Head */}
              <circle cx="24" cy="14" r="10" fill="#fed7aa" />

              {/* Gray Receding Hair */}
              <path d="M14 12 C14 6, 17 6, 19 8 C21 5, 27 5, 29 8 C31 6, 34 6, 34 12 C34 16, 33 18, 33 18 L15 18 Z" fill="#94a3b8" />

              {/* Rimless Glasses */}
              <rect x="18" y="14" width="5" height="3" rx="0.5" stroke="#334155" strokeWidth="1" fill="#f1f5f9" fillOpacity="0.5" />
              <rect x="25" y="14" width="5" height="3" rx="0.5" stroke="#334155" strokeWidth="1" fill="#f1f5f9" fillOpacity="0.5" />
              <line x1="23" y1="15" x2="25" y2="15" stroke="#334155" strokeWidth="1" />

              {/* Serious Expression */}
              <line x1="21" y1="20" x2="27" y2="20" stroke="#78350f" strokeWidth="1.4" strokeLinecap="round" />
            </g>
          )}

          {avatarType === 'fellow-researcher' && (
            <g id="avatar-fellow-researcher">
              {/* Legs */}
              <rect x="16" y="40" width="6" height="10" rx="2" fill="#1e293b" />
              <rect x="26" y="40" width="6" height="10" rx="2" fill="#1e293b" />
              <rect x="15" y="48" width="8" height="5" rx="2" fill="#0f172a" />
              <rect x="25" y="48" width="8" height="5" rx="2" fill="#0f172a" />

              {/* Burgundy Turtleneck + Research Badge */}
              <rect x="12" y="24" width="24" height="18" rx="3" fill="#831843" stroke="#500724" strokeWidth="1" />
              <rect x="19" y="22" width="10" height="4" fill="#9d174d" />
              <circle cx="30" cy="30" r="2.5" fill="#f59e0b" />

              {/* Head */}
              <circle cx="24" cy="14" r="10" fill="#fde68a" />

              {/* Sleek Hair Bun */}
              <circle cx="24" cy="5" r="5" fill="#1c1917" />
              <path d="M14 12 C14 7, 34 7, 34 12 C34 17, 32 18, 30 16 C27 17, 21 17, 18 16 C16 18, 14 17, 14 12 Z" fill="#1c1917" />

              {/* Eyes & Glasses */}
              <circle cx="20" cy="15" r="1.5" fill="#1c1917" />
              <circle cx="28" cy="15" r="1.5" fill="#1c1917" />
              <path d="M21 20 Q24 22 27 20" stroke="#78350f" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </g>
          )}

          {/* Fallback for others (Security Analyst, Dorm Roommate, Student Casual) */}
          {(avatarType === 'security-analyst' || avatarType === 'dorm-roommate' || avatarType === 'student-casual') && (
            <g id="avatar-generic-operative">
              {/* Legs */}
              <rect x="15" y="40" width="7" height="10" rx="2" fill="#1e293b" />
              <rect x="26" y="40" width="7" height="10" rx="2" fill="#1e293b" />
              <rect x="14" y="48" width="8" height="5" rx="2" fill="#38bdf8" stroke="#0284c7" strokeWidth="0.8" />
              <rect x="26" y="48" width="8" height="5" rx="2" fill="#38bdf8" stroke="#0284c7" strokeWidth="0.8" />

              {/* Field Jacket with Cyber Shield */}
              <rect x="12" y="24" width="24" height="18" rx="3" fill="#047857" stroke="#064e3b" strokeWidth="1" />
              <polygon points="24,28 27,31 24,36 21,31" fill="#34d399" />

              {/* Head */}
              <circle cx="24" cy="14" r="10" fill="#fed7aa" />

              {/* Short Dark Hair */}
              <path d="M14 13 C14 6, 34 6, 34 13 C34 14, 30 11, 24 11 C18 11, 14 14, 14 13 Z" fill="#292524" />

              {/* Focused Eyes */}
              <circle cx="20" cy="15" r="1.5" fill="#1e293b" />
              <circle cx="28" cy="15" r="1.5" fill="#1e293b" />
              <line x1="21" y1="20" x2="27" y2="20" stroke="#78350f" strokeWidth="1.2" strokeLinecap="round" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
