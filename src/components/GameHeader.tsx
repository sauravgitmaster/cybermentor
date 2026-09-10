import React from 'react';
import {
  Home,
  Compass,
  Zap,
  FolderOpen,
  User,
  Volume2,
  VolumeX,
  RotateCcw,
  HelpCircle,
  Brain,
} from 'lucide-react';
import { PlayerState } from '../types';
import { playClickSound } from '../utils/audio';

interface GameHeaderProps {
  player: PlayerState;
  activeTab: 'home' | 'world' | 'location' | 'mission' | 'abilities' | 'evidence' | 'profile' | 'scenario-ops';
  onSelectTab: (tab: 'home' | 'world' | 'abilities' | 'evidence' | 'profile' | 'scenario-ops') => void;
  soundMuted: boolean;
  onToggleSound: () => void;
  onOpenHelp: () => void;
  onResetProgress: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  player,
  activeTab,
  onSelectTab,
  soundMuted,
  onToggleSound,
  onOpenHelp,
  onResetProgress,
}) => {
  const trustVal = Math.min(100, Math.max(0, player.digitalTrust));
  const unlockedAbilitiesCount = player.abilities.filter((a) => a.unlocked).length;

  return (
    <header
      id="game-header"
      className="sticky top-0 z-40 w-full border-b-2 border-[#385175] bg-[#0f172a] px-4 py-2 select-none shadow-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Brand & Operative Badge */}
        <div className="flex items-center gap-3">
          <button
            id="header-brand-btn"
            onClick={() => {
              playClickSound();
              onSelectTab('world');
            }}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            {/* Cute 2D RPG Protagonist mini sprite */}
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#3b5175] bg-[#1a2942] group-hover:border-amber-400/80 transition-colors shadow-inner">
              <svg width="22" height="22" viewBox="0 0 32 32">
                <rect x="6" y="5" width="20" height="9" rx="3" fill="#92400e" />
                <rect x="7" y="10" width="18" height="13" rx="3" fill="#e2b992" />
                <rect x="10" y="14" width="3" height="3" fill="#0f172a" />
                <rect x="19" y="14" width="3" height="3" fill="#0f172a" />
                <rect x="13" y="19" width="6" height="1.5" rx="0.5" fill="#c2410c" />
                <rect x="8" y="23" width="16" height="7" rx="2" fill="#0284c7" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono font-bold tracking-wider text-amber-300 uppercase">
                  CYBERMENTOR
                </span>
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  2D RPG
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {player.name.toUpperCase()} // LVL 1
              </span>
            </div>
          </button>
        </div>

        {/* Primary RPG Action Bar */}
        <nav className="hidden md:flex items-center gap-1 bg-[#16233b] p-1 rounded-lg border border-[#385175]">
          <button
            id="nav-tab-home"
            onClick={() => {
              playClickSound();
              onSelectTab('home');
            }}
            title="Return to CyberMentor AI Homepage"
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded transition-colors ${
              activeTab === 'home'
                ? 'bg-amber-500/20 border border-amber-500/60 text-amber-300 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-[#1a2b47]'
            }`}
          >
            <Home className="h-3.5 w-3.5" />
            <span>HOME</span>
          </button>

          <button
            id="nav-tab-scenario-ops"
            onClick={() => {
              playClickSound();
              onSelectTab('scenario-ops');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded transition-colors ${
              activeTab === 'scenario-ops'
                ? 'bg-amber-500/30 border border-amber-400 text-amber-300 font-bold shadow'
                : 'text-amber-300/90 hover:text-amber-200 hover:bg-[#1a2b47]'
            }`}
          >
            <Brain className="h-3.5 w-3.5 text-amber-400" />
            <span>SCENARIO OPS</span>
          </button>

          <button
            id="nav-tab-world"
            onClick={() => {
              playClickSound();
              onSelectTab('world');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded transition-colors ${
              activeTab === 'world' || activeTab === 'location' || activeTab === 'mission'
                ? 'bg-amber-500/20 border border-amber-500/60 text-amber-300 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-[#1a2b47]'
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            <span>SECTOR MAP</span>
          </button>

          <button
            id="nav-tab-abilities"
            onClick={() => {
              playClickSound();
              onSelectTab('abilities');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded transition-colors ${
              activeTab === 'abilities'
                ? 'bg-amber-500/20 border border-amber-500/60 text-amber-300 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-[#1a2b47]'
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>ABILITIES</span>
            <span className="text-[10px] px-1 rounded bg-black/40 text-cyan-300 font-bold">
              {unlockedAbilitiesCount}
            </span>
          </button>

          <button
            id="nav-tab-evidence"
            onClick={() => {
              playClickSound();
              onSelectTab('evidence');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded transition-colors ${
              activeTab === 'evidence'
                ? 'bg-amber-500/20 border border-amber-500/60 text-amber-300 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-[#1a2b47]'
            }`}
          >
            <FolderOpen className="h-3.5 w-3.5" />
            <span>EVIDENCE</span>
            {player.evidence.length > 0 && (
              <span className="text-[10px] px-1 rounded bg-black/40 text-amber-300 font-bold">
                {player.evidence.length}
              </span>
            )}
          </button>

          <button
            id="nav-tab-profile"
            onClick={() => {
              playClickSound();
              onSelectTab('profile');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded transition-colors ${
              activeTab === 'profile'
                ? 'bg-amber-500/20 border border-amber-500/60 text-amber-300 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-[#1a2b47]'
            }`}
          >
            <User className="h-3.5 w-3.5" />
            <span>DOSSIER</span>
          </button>
        </nav>

        {/* Digital Trust Bar & Utility Controls */}
        <div className="flex items-center gap-3">
          {/* Digital Trust Gauge */}
          <div
            id="trust-meter-display"
            className="flex items-center gap-2 rounded-lg border border-[#385175] bg-[#16233b] px-3 py-1 text-xs font-mono shadow-inner"
            title="Digital Trust strictly measures verified defensive cybersecurity decisions."
          >
            <span className="text-[11px] text-amber-400 font-bold">★ TRUST</span>
            <span className="text-cyan-300 font-bold">
              {trustVal.toString().padStart(3, '0')}
            </span>
            <span className="text-slate-400 text-[10px]">/100</span>

            {/* Segmented Trust Progress Bar */}
            <div className="hidden sm:flex items-center gap-0.5 ml-1">
              {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map((step) => (
                <div
                  key={step}
                  className={`h-2.5 w-1.5 rounded-sm transition-colors ${
                    trustVal > step
                      ? trustVal < 25
                        ? 'bg-amber-400 shadow-[0_0_4px_rgba(251,191,36,0.8)]'
                        : 'bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.8)]'
                      : 'bg-[#2b3c58]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Audio, Help & Reset Controls */}
          <div className="flex items-center gap-1">
            <button
              id="header-sound-toggle-btn"
              onClick={onToggleSound}
              title={soundMuted ? 'Unmute tactical audio' : 'Mute tactical audio'}
              className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-[#1a2b47] transition-colors border border-transparent hover:border-[#3b5175]"
            >
              {soundMuted ? (
                <VolumeX className="h-4 w-4 text-slate-400" />
              ) : (
                <Volume2 className="h-4 w-4 text-amber-400" />
              )}
            </button>

            <button
              id="header-help-btn"
              onClick={() => {
                playClickSound();
                onOpenHelp();
              }}
              title="Operative Guide & Rules"
              className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-[#1a2b47] transition-colors border border-transparent hover:border-[#3b5175]"
            >
              <HelpCircle className="h-4 w-4" />
            </button>

            <button
              id="header-reset-btn"
              onClick={onResetProgress}
              title="Reset operative simulation progress to zero"
              className="hidden sm:inline-flex p-1.5 rounded text-slate-400 hover:text-rose-400 hover:bg-[#1a2b47] transition-colors border border-transparent hover:border-[#3b5175]"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation tab strip */}
      <div className="mt-2 flex md:hidden items-center justify-around border-t border-[#385175] pt-1.5">
        <button
          id="nav-tab-mobile-home"
          onClick={() => {
            playClickSound();
            onSelectTab('home');
          }}
          className={`flex items-center gap-1 text-xs font-mono py-1 px-1.5 ${
            activeTab === 'home' ? 'text-amber-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Home className="h-3 w-3" />
          <span>[HOME]</span>
        </button>
        <button
          id="nav-tab-mobile-scenario-ops"
          onClick={() => {
            playClickSound();
            onSelectTab('scenario-ops');
          }}
          className={`flex items-center gap-1 text-xs font-mono py-1 px-1.5 ${
            activeTab === 'scenario-ops' ? 'text-amber-400 font-bold' : 'text-amber-400/70'
          }`}
        >
          <Brain className="h-3 w-3" />
          <span>[OPS]</span>
        </button>
        <button
          onClick={() => {
            playClickSound();
            onSelectTab('world');
          }}
          className={`text-xs font-mono py-1 px-2 ${
            activeTab === 'world' || activeTab === 'location' || activeTab === 'mission'
              ? 'text-amber-400 font-bold'
              : 'text-slate-400'
          }`}
        >
          [WORLD]
        </button>
        <button
          onClick={() => {
            playClickSound();
            onSelectTab('abilities');
          }}
          className={`text-xs font-mono py-1 px-2 ${
            activeTab === 'abilities' ? 'text-amber-400 font-bold' : 'text-slate-400'
          }`}
        >
          [ABILITIES:{unlockedAbilitiesCount}]
        </button>
        <button
          onClick={() => {
            playClickSound();
            onSelectTab('evidence');
          }}
          className={`text-xs font-mono py-1 px-2 ${
            activeTab === 'evidence' ? 'text-amber-400 font-bold' : 'text-slate-400'
          }`}
        >
          [EVIDENCE:{player.evidence.length}]
        </button>
        <button
          onClick={() => {
            playClickSound();
            onSelectTab('profile');
          }}
          className={`text-xs font-mono py-1 px-2 ${
            activeTab === 'profile' ? 'text-amber-400 font-bold' : 'text-slate-400'
          }`}
        >
          [DOSSIER]
        </button>
      </div>
    </header>
  );
};
