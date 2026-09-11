import React from 'react';
import {
  Play,
  Brain,
  HelpCircle,
  Volume2,
  VolumeX,
  Shield,
  Wifi,
} from 'lucide-react';
import { PlayerState, MissionData } from '../types';
import { playClickSound } from '../utils/audio';

interface LandingIntroProps {
  player: PlayerState;
  nextMission: MissionData;
  onStartAdventure: () => void;
  onOpenScenarioOps?: () => void;
  onOpenHowItWorks: () => void;
  onNavigate?: (tab: 'world' | 'abilities' | 'evidence' | 'profile') => void;
  soundMuted?: boolean;
  onToggleSound?: () => void;
}

export const LandingIntro: React.FC<LandingIntroProps> = ({
  player,
  onStartAdventure,
  onOpenScenarioOps,
  onOpenHowItWorks,
  soundMuted,
  onToggleSound,
}) => {
  return (
    <div
      id="landing-page-root"
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#0d1522] text-[#f1f5f9] px-4 py-6 sm:py-10 select-none overflow-hidden"
    >
      {/* Soft warm background atmosphere - inviting & friendly, not dark SaaS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Warm ambient radial glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[360px] rounded-full bg-sky-900/25 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[420px] h-[220px] rounded-full bg-emerald-950/20 blur-3xl" />
        {/* Subtle friendly starfield dots */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, #94a3b8 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      {/* Top Bar with optional sound toggle */}
      {onToggleSound && (
        <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20">
          <button
            onClick={() => {
              playClickSound();
              onToggleSound();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700/60 bg-slate-900/60 hover:bg-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors backdrop-blur-xs"
            title={soundMuted ? 'Turn Sound On' : 'Turn Sound Off'}
            aria-label="Toggle game audio"
          >
            {soundMuted ? (
              <>
                <VolumeX className="h-4 w-4 text-slate-400" />
                <span className="hidden sm:inline">Sound Off</span>
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4 text-emerald-400" />
                <span className="hidden sm:inline">Sound On</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Main Centered Content Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center text-center">
        {/* Title and Friendly Tagline */}
        <div className="mb-4 sm:mb-5">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase drop-shadow-sm flex items-center justify-center gap-2">
            <span>CYBERMENTOR</span>
            <span className="text-cyan-400 font-black">AI</span>
          </h1>
          <p className="mt-1.5 text-sm sm:text-base text-slate-300 font-medium">
            Learn cybersecurity by playing.
          </p>
        </div>

        {/* Miniature 2D RPG World Diorama */}
        <div
          id="rpg-visual-diorama"
          className="relative w-full h-44 sm:h-52 rounded-2xl border-2 border-slate-700/70 bg-gradient-to-b from-[#182638] via-[#142030] to-[#0d1624] shadow-xl overflow-hidden mb-6 flex items-end justify-center"
        >
          {/* Sky elements: Subtle moon & friendly stars */}
          <div className="absolute top-3 left-4 flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-200/80 animate-pulse" />
            <div className="w-1 h-1 rounded-full bg-sky-200/60 ml-4 animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-200/70 ml-8 animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          {/* Wi-Fi Wave Beacon in background */}
          <div className="absolute top-3 right-6 flex items-center gap-1 opacity-70">
            <Wifi className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span className="text-[9px] font-mono text-cyan-300 font-bold">CAMPUS NET</span>
          </div>

          {/* Lush Green Ground Grass Lawn */}
          <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[#1b4332] via-[#2d6a4f] to-[#40916c] border-t-2 border-[#52b788]/50" />

          {/* Cobblestone Campus Walkway */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 sm:w-56 h-12 bg-[#334155] border-t-2 border-x-2 border-[#475569] rounded-t-xl overflow-hidden shadow-inner flex flex-col justify-around px-2 py-0.5">
            <div className="flex justify-around">
              <div className="w-6 h-2 bg-[#64748b]/50 rounded-xs" />
              <div className="w-8 h-2 bg-[#475569] rounded-xs" />
              <div className="w-6 h-2 bg-[#64748b]/50 rounded-xs" />
            </div>
            <div className="flex justify-around">
              <div className="w-8 h-2 bg-[#475569] rounded-xs" />
              <div className="w-6 h-2 bg-[#64748b]/50 rounded-xs" />
              <div className="w-8 h-2 bg-[#475569] rounded-xs" />
            </div>
          </div>

          {/* Left Side: Layered Green Tree & Wooden Bench */}
          <div className="absolute bottom-4 left-3 sm:left-5 flex flex-col items-center pointer-events-none">
            {/* Tree Canopy */}
            <div className="relative flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-[#2d6a4f] border border-[#1b4332] shadow-sm" />
              <div className="w-13 h-11 rounded-full bg-[#40916c] border border-[#2d6a4f] -mt-6 shadow-sm" />
              <div className="w-15 h-10 rounded-full bg-[#52b788] border border-[#40916c] -mt-7 flex items-center justify-around px-1">
                <div className="w-2.5 h-2.5 rounded-full bg-[#74c69d]/80" />
                <div className="w-2 h-2 rounded-full bg-[#74c69d]/80" />
              </div>
            </div>
            {/* Trunk */}
            <div className="w-3 h-5 bg-[#543821] border-x border-[#3b2312] -mt-1 rounded-b" />
            {/* Ground Shadow */}
            <div className="w-12 h-2.5 bg-black/40 rounded-full blur-[1px] -mt-1" />
          </div>

          {/* Small Wooden Park Bench beside tree */}
          <div className="absolute bottom-3 left-18 sm:left-22 pointer-events-none hidden xs:block">
            <div className="w-7 h-2.5 bg-[#78350f] border border-[#451a03] rounded-xs shadow-xs" />
            <div className="flex justify-between px-1">
              <div className="w-0.5 h-2 bg-[#1e293b]" />
              <div className="w-0.5 h-2 bg-[#1e293b]" />
            </div>
          </div>

          {/* Right Side: Streetlamp with Warm Glow */}
          <div className="absolute bottom-4 right-16 sm:right-20 flex flex-col items-center pointer-events-none hidden xs:flex">
            {/* Light pool */}
            <div className="w-12 h-12 rounded-full bg-amber-300/25 blur-md absolute -top-1 pointer-events-none" />
            <div className="w-3 h-1.5 bg-[#1e293b] rounded-t-xs" />
            <div className="w-3.5 h-4.5 rounded-xs bg-[#fef08a] border border-[#78350f] flex items-center justify-center shadow-[0_0_8px_rgba(251,191,36,0.5)]">
              <div className="w-1.5 h-2 bg-amber-400 rounded-full animate-pulse" />
            </div>
            <div className="w-1 h-8 bg-[#1e293b]" />
            <div className="w-3 h-1.5 bg-[#0f172a] rounded-t-xs" />
          </div>

          {/* Right Side: Campus Cyber Terminal Workstation */}
          <div className="absolute bottom-4 right-3 sm:right-5 flex flex-col items-center pointer-events-none">
            {/* Screen */}
            <div className="w-9 h-8 rounded-lg bg-[#0f172a] border-2 border-cyan-400/90 shadow-md flex flex-col items-center justify-center p-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-cyan-500/10" />
              <Shield className="h-3.5 w-3.5 text-cyan-300" />
              {/* Blinking cursor */}
              <div className="w-3 h-0.5 bg-emerald-400 rounded-full mt-1 animate-pulse" />
            </div>
            {/* Stand */}
            <div className="w-2.5 h-2.5 bg-[#334155] border-x border-[#1e293b]" />
            {/* Base / Desk */}
            <div className="w-10 h-2 bg-[#1e293b] border-t border-[#475569] rounded-t-sm" />
            {/* Shadow */}
            <div className="w-10 h-2 bg-black/40 rounded-full blur-[1px] -mt-0.5" />
          </div>

          {/* Center: The RPG Protagonist Hero */}
          <div className="relative z-10 flex flex-col items-center mb-2.5">
            {/* Character Shadow */}
            <div className="absolute bottom-0 w-11 h-3 bg-black/45 rounded-full blur-[1px] translate-y-1" />

            {/* RPG Protagonist Character Sprite with subtle idle bobbing */}
            <div className="relative w-12 h-14 transition-transform duration-300 animate-bounce" style={{ animationDuration: '2.5s' }}>
              <svg
                viewBox="0 0 36 40"
                className="w-12 h-14 drop-shadow-md"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Left Leg & White/Cyan Sneaker */}
                <rect x="10" y="27" width="5" height="7" rx="1" fill="#202938" />
                <rect x="9.5" y="33" width="6" height="4.5" rx="1.5" fill="#f8fafc" stroke="#334155" strokeWidth="0.8" />
                <rect x="11" y="34.5" width="3" height="1.5" fill="#06b6d4" />

                {/* Right Leg & White/Cyan Sneaker */}
                <rect x="21" y="27" width="5" height="7" rx="1" fill="#202938" />
                <rect x="20.5" y="33" width="6" height="4.5" rx="1.5" fill="#f8fafc" stroke="#334155" strokeWidth="0.8" />
                <rect x="22" y="34.5" width="3" height="1.5" fill="#06b6d4" />

                {/* Left Arm */}
                <rect x="5.5" y="17" width="4" height="8" rx="1.5" fill="#0284c7" />
                <circle cx="7.5" cy="25.5" r="1.8" fill="#fed7aa" />

                {/* Right Arm */}
                <rect x="26.5" y="17" width="4" height="8" rx="1.5" fill="#0284c7" />
                <circle cx="28.5" cy="25.5" r="1.8" fill="#fed7aa" />

                {/* Operative Jacket Torso */}
                <rect x="8.5" y="15" width="19" height="13" rx="2.5" fill="#0369a1" stroke="#075985" strokeWidth="1" />
                {/* White Collar and Zipper */}
                <path d="M14 15 L18 19 L22 15" stroke="#ffffff" strokeWidth="1.2" fill="none" />
                <line x1="18" y1="19" x2="18" y2="28" stroke="#ffffff" strokeWidth="1" />

                {/* Crossbody Tactical Strap */}
                <line x1="10" y1="16" x2="26" y2="26" stroke="#f59e0b" strokeWidth="1.5" />
                {/* Cybersecurity Emblem Badge */}
                <circle cx="13" cy="20" r="1.8" fill="#fbbf24" stroke="#d97706" strokeWidth="0.6" />

                {/* Utility Belt */}
                <rect x="9" y="25" width="18" height="2.5" rx="0.5" fill="#1e293b" />
                <rect x="16.5" y="24.5" width="3" height="3" rx="0.5" fill="#06b6d4" />

                {/* Head & Face */}
                <rect x="11" y="7" width="14" height="11" rx="3.5" fill="#fed7aa" />

                {/* Hair */}
                <path
                  d="M10 9 C10 3, 26 3, 26 9 C26 12, 24 10, 22 10 C20 10, 19 8, 17 10 C15 11, 13 9, 10 9 Z"
                  fill="#78350f"
                />
                <rect x="10" y="8" width="2" height="5" rx="0.5" fill="#78350f" />
                <rect x="24" y="8" width="2" height="5" rx="0.5" fill="#78350f" />

                {/* Expressive Eyes */}
                <ellipse cx="14" cy="12" rx="1.2" ry="1.8" fill="#1e293b" />
                <circle cx="14.3" cy="11.4" r="0.5" fill="#ffffff" />

                <ellipse cx="22" cy="12" rx="1.2" ry="1.8" fill="#1e293b" />
                <circle cx="22.3" cy="11.4" r="0.5" fill="#ffffff" />

                {/* Friendly Smile */}
                <path d="M16.5 15 Q18 16.2 19.5 15" stroke="#9a3412" strokeWidth="0.8" fill="none" strokeLinecap="round" />

                {/* Tech Headset Earpiece with Cyan Light */}
                <circle cx="9.8" cy="11" r="1.2" fill="#06b6d4" stroke="#0891b2" strokeWidth="0.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* The Two Primary Action Buttons */}
        <div className="w-full space-y-3.5">
          {/* PRIMARY BUTTON: ENTER CYBER WORLD */}
          <button
            id="enter-cyber-world-btn"
            onClick={() => {
              playClickSound();
              onStartAdventure();
            }}
            className="w-full group relative flex flex-col items-center justify-center px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-slate-950 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all duration-150 cursor-pointer border border-emerald-300/60"
          >
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-extrabold tracking-wide">
              <Play className="h-5 w-5 fill-slate-950 transition-transform group-hover:scale-110" />
              <span>ENTER CYBER WORLD</span>
            </div>
            <span className="text-xs sm:text-[13px] font-medium text-emerald-950/85 mt-0.5">
              Explore the world and solve cyber incidents.
            </span>
          </button>

          {/* SECONDARY BUTTON: SCENARIO OPS */}
          {onOpenScenarioOps && (
            <button
              id="scenario-ops-btn"
              onClick={() => {
                playClickSound();
                onOpenScenarioOps();
              }}
              className="w-full group relative flex flex-col items-center justify-center px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border-2 border-amber-500/70 hover:border-amber-400 active:scale-[0.99] text-amber-300 shadow-lg transition-all duration-150 cursor-pointer"
            >
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold tracking-wide">
                <Brain className="h-4 w-4 text-amber-400 transition-transform group-hover:scale-110" />
                <span>◆ SCENARIO OPS</span>
              </div>
              <span className="text-xs sm:text-[13px] font-normal text-slate-300 mt-0.5">
                Face short cybersecurity situations and choose what to do.
              </span>
            </button>
          )}
        </div>

        {/* Optional Tertiary: HOW TO PLAY */}
        <div className="mt-5 sm:mt-6">
          <button
            id="how-to-play-btn"
            onClick={() => {
              playClickSound();
              onOpenHowItWorks();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <HelpCircle className="h-4 w-4 text-slate-400" />
            <span>HOW TO PLAY</span>
          </button>
        </div>
      </div>
    </div>
  );
};
