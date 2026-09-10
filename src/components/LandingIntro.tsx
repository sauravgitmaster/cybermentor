import React from 'react';
import { Play, HelpCircle, Compass, Zap, FolderOpen, ArrowRight, Activity, Brain } from 'lucide-react';
import { PlayerState, MissionData } from '../types';
import { playClickSound } from '../utils/audio';

interface LandingIntroProps {
  player: PlayerState;
  nextMission: MissionData;
  onStartAdventure: () => void;
  onOpenScenarioOps?: () => void;
  onOpenHowItWorks: () => void;
  onNavigate: (tab: 'world' | 'abilities' | 'evidence' | 'profile') => void;
}

export const LandingIntro: React.FC<LandingIntroProps> = ({
  player,
  nextMission,
  onStartAdventure,
  onOpenScenarioOps,
  onOpenHowItWorks,
  onNavigate,
}) => {
  const isBrandNew = player.digitalTrust === 0 && player.completedMissions.length === 0;

  return (
    <div
      id="landing-intro-screen"
      className="relative flex min-h-[calc(100vh-68px)] flex-col items-center justify-center px-4 py-10 sm:px-6"
    >
      {/* Background subtle atmospheric grid lines - subdued, not neon */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 30%, #1e293b 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-950/20 blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        {/* Subtle System Status Tag */}
        <div className="inline-flex items-center gap-2 rounded border border-[#1e2636] bg-[#10141d] px-3 py-1 text-xs font-mono text-slate-300 mb-6">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>CYBER WORLD SIMULATION ENGINE</span>
          <span className="text-slate-400">•</span>
          <span className="text-cyan-400">ACTIVE</span>
        </div>

        {/* Title and Statement */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 uppercase mb-3">
          CyberMentor <span className="text-cyan-400">AI</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 font-mono tracking-wide mb-2">
          Your decisions leave a trace.
        </p>

        <p className="mx-auto max-w-xl text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
          Learn to recognize, investigate, and respond to digital threats through interactive,
          decision-driven scenarios. Not quizzes—active digital survival.
        </p>

        {/* Player Status Card */}
        <div className="mx-auto mb-8 max-w-lg rounded-lg border border-[#1e2535] bg-[#111622]/90 p-5 text-left shadow-lg">
          <div className="flex items-center justify-between border-b border-[#1b212f] pb-3 mb-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Operative Identity
              </div>
              <div className="text-base font-bold text-slate-100 tracking-wide">
                {player.name.toUpperCase()}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Classification
              </div>
              <div className="text-xs font-mono text-cyan-300 font-medium">
                {player.title.toUpperCase()} // LVL {player.level.toString().padStart(2, '0')}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Digital Trust */}
            <div className="rounded border border-[#1a202d] bg-[#0d1017] p-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                <span>DIGITAL TRUST</span>
                <span className="font-bold text-slate-200">{player.digitalTrust}/100</span>
              </div>
              <div className="h-2 w-full bg-[#181e2b] rounded-full overflow-hidden border border-[#232a3a]">
                <div
                  className={`h-full transition-all duration-500 ${
                    player.digitalTrust === 0
                      ? 'w-0'
                      : player.digitalTrust < 25
                      ? 'bg-amber-400'
                      : 'bg-cyan-400'
                  }`}
                  style={{ width: `${player.digitalTrust}%` }}
                />
              </div>
              <div className="mt-1.5 text-[10px] text-slate-400">
                {player.digitalTrust === 0
                  ? 'Starts at 0. Earned strictly via defensive judgment.'
                  : `${player.trustHistory.length} decision records logged.`}
              </div>
            </div>

            {/* Current Mission Target */}
            <div className="rounded border border-[#1a202d] bg-[#0d1017] p-3">
              <div className="text-[11px] font-mono text-slate-400 mb-1">CURRENT PERIMETER</div>
              <div className="text-xs font-semibold text-slate-200 truncate">
                {nextMission.code} : {nextMission.title}
              </div>
              <div className="mt-1 text-[10px] font-mono text-cyan-400 truncate">
                LOCATION // {nextMission.locationId.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-[#181d29]">
            <div className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-cyan-400" />
              <span>
                {player.abilities.filter((a) => a.unlocked).length} Abilities Unlocked
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <FolderOpen className="h-3.5 w-3.5 text-slate-400" />
              <span>{player.evidence.length} Evidence Logged</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-slate-400" />
              <span>{player.completedMissions.length} Missions Cleared</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <button
            id="start-adventure-btn"
            onClick={() => {
              playClickSound();
              onStartAdventure();
            }}
            className="group flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-md bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-md hover:bg-cyan-400 transition-all focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0b0d11]"
          >
            <Play className="h-4 w-4 fill-current transition-transform group-hover:translate-x-0.5" />
            <span>{isBrandNew ? 'START ADVENTURE' : 'CONTINUE ADVENTURE'}</span>
            <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />
          </button>

          {onOpenScenarioOps && (
            <button
              id="scenario-ops-btn"
              onClick={() => {
                playClickSound();
                onOpenScenarioOps();
              }}
              className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-md border-2 border-amber-500/80 bg-amber-950/40 hover:bg-amber-500 hover:text-slate-950 px-5 py-3 text-sm font-bold font-mono text-amber-300 transition-all shadow-md"
            >
              <Brain className="h-4 w-4 text-amber-400 group-hover:text-slate-950 transition-colors" />
              <span>SCENARIO OPS</span>
            </button>
          )}

          <button
            id="how-it-works-btn"
            onClick={() => {
              playClickSound();
              onOpenHowItWorks();
            }}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-md border border-[#232b3b] bg-[#121620] px-5 py-3 text-sm font-medium text-slate-300 hover:bg-[#181d2a] hover:text-slate-100 transition-colors"
          >
            <HelpCircle className="h-4 w-4 text-slate-400" />
            <span>HOW IT WORKS</span>
          </button>
        </div>

        {/* Secondary Navigation Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400">
          <button
            id="intro-nav-world"
            onClick={() => {
              playClickSound();
              onNavigate('world');
            }}
            className="hover:text-cyan-300 transition-colors flex items-center gap-1 border border-[#1a202c] rounded px-3 py-1.5 bg-[#0e1219]"
          >
            <Compass className="h-3.5 w-3.5" />
            [WORLD MAP]
          </button>
          <button
            id="intro-nav-abilities"
            onClick={() => {
              playClickSound();
              onNavigate('abilities');
            }}
            className="hover:text-cyan-300 transition-colors flex items-center gap-1 border border-[#1a202c] rounded px-3 py-1.5 bg-[#0e1219]"
          >
            <Zap className="h-3.5 w-3.5" />
            [CYBER ABILITIES]
          </button>
          <button
            id="intro-nav-evidence"
            onClick={() => {
              playClickSound();
              onNavigate('evidence');
            }}
            className="hover:text-cyan-300 transition-colors flex items-center gap-1 border border-[#1a202c] rounded px-3 py-1.5 bg-[#0e1219]"
          >
            <FolderOpen className="h-3.5 w-3.5" />
            [EVIDENCE NOTEBOOK]
          </button>
        </div>
      </div>
    </div>
  );
};
