import React, { useState, useRef, useEffect } from 'react';
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
  Menu,
  X,
  Calendar,
  Sparkles,
  Lock,
} from 'lucide-react';
import { PlayerState } from '../types';
import { playClickSound } from '../utils/audio';
import { useAdaptiveScreen } from '../hooks/useAdaptiveScreen';

interface GameHeaderProps {
  player: PlayerState;
  activeTab: 'home' | 'world' | 'location' | 'mission' | 'abilities' | 'evidence' | 'profile' | 'scenario-ops';
  onSelectTab: (tab: 'home' | 'world' | 'abilities' | 'evidence' | 'profile' | 'scenario-ops') => void;
  soundMuted: boolean;
  onToggleSound: () => void;
  onOpenHelp: () => void;
  onOpenSkillCheck?: () => void;
  onOpenDailyChallenge?: () => void;
  onResetProgress: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  player,
  activeTab,
  onSelectTab,
  soundMuted,
  onToggleSound,
  onOpenHelp,
  onOpenSkillCheck,
  onOpenDailyChallenge,
  onResetProgress,
}) => {
  const screen = useAdaptiveScreen();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const unlockedAbilitiesCount = player.abilities.filter((a) => a.unlocked).length;

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const handleMenuSelect = (tab: 'home' | 'world' | 'abilities' | 'evidence' | 'profile' | 'scenario-ops') => {
    playClickSound();
    setIsMenuOpen(false);
    onSelectTab(tab);
  };

  return (
    <header
      id="game-header"
      className="sticky top-0 z-40 w-full border-b border-[#20324d] bg-[#0c1421]/90 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 select-none pt-safe"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 sm:gap-4">
        {/* Simple Brand: Protagonist + Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="header-brand-btn"
            onClick={() => {
              playClickSound();
              onSelectTab('home');
            }}
            className="flex items-center gap-2 sm:gap-2.5 text-left focus:outline-none group cursor-pointer touch-target"
          >
            {/* Cute 2D RPG Protagonist mini sprite */}
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-[#314a70] bg-[#142236] group-hover:border-amber-400/80 transition-colors shadow-sm shrink-0">
              <svg width="20" height="20" viewBox="0 0 32 32" className="sm:w-[22px] sm:h-[22px]">
                <rect x="6" y="5" width="20" height="9" rx="3" fill="#92400e" />
                <rect x="7" y="10" width="18" height="13" rx="3" fill="#e2b992" />
                <rect x="10" y="14" width="3" height="3" fill="#0f172a" />
                <rect x="19" y="14" width="3" height="3" fill="#0f172a" />
                <rect x="13" y="19" width="6" height="1.5" rx="0.5" fill="#c2410c" />
                <rect x="8" y="23" width="16" height="7" rx="2" fill="#0284c7" />
              </svg>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-100 uppercase font-sans">
                CYBERMENTOR <span className="text-cyan-400 font-extrabold">AI</span>
              </span>
            </div>
          </button>
        </div>

        {/* Minimal Controls Area - Does not compete with the game world */}
        <div className="flex items-center gap-1.5 sm:gap-2 relative" ref={menuRef}>
          {/* Direct HOME Button */}
          <button
            id="nav-tab-home"
            onClick={() => {
              playClickSound();
              onSelectTab('home');
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl border border-slate-700/60 bg-slate-900/60 hover:bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer shadow-xs touch-target min-h-[36px]"
          >
            <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400" />
            <span className="hidden xs:inline">HOME</span>
          </button>

          {/* Contextual In-Game Systems Menu */}
          <button
            id="nav-tab-menu"
            onClick={() => {
              playClickSound();
              setIsMenuOpen((prev) => !prev);
            }}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer shadow-xs text-xs font-semibold touch-target min-h-[36px] ${
              isMenuOpen
                ? 'border-amber-400/80 bg-amber-500/20 text-amber-300'
                : 'border-slate-700/60 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white'
            }`}
            aria-label="Toggle Systems Menu"
          >
            {isMenuOpen ? <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Menu className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            <span className="hidden sm:inline">SYSTEMS</span>
          </button>

          {/* Audio Toggle */}
          <button
            id="header-sound-toggle-btn"
            onClick={onToggleSound}
            title={soundMuted ? 'Turn Sound On' : 'Turn Sound Off'}
            className="p-1.5 sm:p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-700/40 transition-colors cursor-pointer touch-target min-h-[36px] min-w-[36px] flex items-center justify-center"
          >
            {soundMuted ? (
              <VolumeX className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" />
            ) : (
              <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400" />
            )}
          </button>

          {/* Help Button */}
          <button
            id="header-help-btn"
            onClick={() => {
              playClickSound();
              onOpenHelp();
            }}
            title="Guide & How It Works"
            className="p-1.5 sm:p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-700/40 transition-colors cursor-pointer touch-target min-h-[36px] min-w-[36px] flex items-center justify-center"
          >
            <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-300" />
          </button>

          {/* Dropdown Menu for Contextual Systems */}
          {isMenuOpen && (
            <div className="absolute right-0 top-11 sm:top-12 w-60 max-w-[calc(100vw-1.5rem)] rounded-2xl border-2 border-[#2b4163] bg-[#0c1524]/98 shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md ring-1 ring-white/10">
              <div className="px-3 py-1.5 border-b border-[#1f314d] text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                Operative Systems
              </div>
              <div className="mt-1 space-y-1">
                <button
                  onClick={() => handleMenuSelect('world')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#182942] text-xs font-medium text-slate-200 hover:text-white transition-colors text-left"
                >
                  <span className="flex items-center gap-2">
                    <Compass className="h-4 w-4 text-cyan-400" />
                    <span>Sector Map</span>
                  </span>
                </button>

                <button
                  onClick={() => handleMenuSelect('scenario-ops')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#182942] text-xs font-medium text-slate-200 hover:text-white transition-colors text-left"
                >
                  <span className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-amber-400" />
                    <span>Scenario Ops</span>
                  </span>
                </button>

                {/* Evidence Notebook - Revealed when evidence collected or after mission 1 */}
                {player.evidence.length > 0 || player.completedMissions.length > 0 ? (
                  <button
                    onClick={() => handleMenuSelect('evidence')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#182942] text-xs font-medium text-slate-200 hover:text-white transition-colors text-left"
                  >
                    <span className="flex items-center gap-2">
                      <FolderOpen className="h-4 w-4 text-indigo-400" />
                      <span>Evidence Notebook</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-amber-300 font-mono font-bold">
                      {player.evidence.length}
                    </span>
                  </button>
                ) : (
                  <div
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-500 cursor-not-allowed select-none"
                    title="Discovered during investigation missions"
                  >
                    <span className="flex items-center gap-2">
                      <Lock className="h-3.5 w-3.5 text-slate-600" />
                      <span>Evidence Notebook</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-600">Mission 1</span>
                  </div>
                )}

                {/* Abilities - Unlocked after completing first mission */}
                {player.completedMissions.length > 0 ? (
                  <button
                    onClick={() => handleMenuSelect('abilities')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#182942] text-xs font-medium text-slate-200 hover:text-white transition-colors text-left"
                  >
                    <span className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-amber-300" />
                      <span>Abilities</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-cyan-300 font-mono font-bold">
                      {unlockedAbilitiesCount}
                    </span>
                  </button>
                ) : (
                  <div
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-500 cursor-not-allowed select-none"
                    title="Unlocks after resolving your first incident"
                  >
                    <span className="flex items-center gap-2">
                      <Lock className="h-3.5 w-3.5 text-slate-600" />
                      <span>Abilities</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-600">After M1</span>
                  </div>
                )}

                {/* Operative Dossier - Full profile unlocked as progression advances */}
                {player.completedMissions.length > 0 ? (
                  <button
                    onClick={() => handleMenuSelect('profile')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#182942] text-xs font-medium text-slate-200 hover:text-white transition-colors text-left"
                  >
                    <span className="flex items-center gap-2">
                      <User className="h-4 w-4 text-emerald-400" />
                      <span>Operative Dossier</span>
                    </span>
                  </button>
                ) : (
                  <div
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-500 cursor-not-allowed select-none"
                    title="Dossier expands as you complete missions and unlock certificates"
                  >
                    <span className="flex items-center gap-2">
                      <Lock className="h-3.5 w-3.5 text-slate-600" />
                      <span>Operative Dossier</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-600">After M1</span>
                  </div>
                )}

                {/* Daily Challenge - Unlocked after establishing foundational knowledge */}
                {onOpenDailyChallenge && player.completedMissions.length > 0 && (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenDailyChallenge();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#182942] text-xs font-medium text-amber-300 hover:text-amber-200 transition-colors text-left"
                  >
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-amber-400" />
                      <span>Daily Challenge</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-700/60 text-amber-300 font-mono">
                      +10 Trust
                    </span>
                  </button>
                )}

                {onOpenSkillCheck && (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenSkillCheck();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#182942] text-xs font-medium text-cyan-300 hover:text-cyan-200 transition-colors text-left"
                  >
                    <span className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-cyan-400" />
                      <span>Skill Diagnostic</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-700/60 text-cyan-300 font-mono">
                      {player.skillCheckCompleted ? 'Retake' : 'New'}
                    </span>
                  </button>
                )}
              </div>

              <div className="mt-2 pt-2 border-t border-[#1f314d]">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onResetProgress();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 text-xs transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5 text-rose-400" />
                  <span>Reset Progress</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

