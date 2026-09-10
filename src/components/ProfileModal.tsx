import React from 'react';
import {
  User,
  Clock,
  RotateCcw,
  Award,
} from 'lucide-react';
import { PlayerState } from '../types';
import { playClickSound } from '../utils/audio';

interface ProfileModalProps {
  player: PlayerState;
  onResetProgress: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  player,
  onResetProgress,
}) => {
  return (
    <div
      id="profile-dossier-view"
      className="mx-auto max-w-4xl px-4 py-5 sm:px-6 space-y-5"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[#21262d] pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
            <User className="h-3.5 w-3.5" />
            <span>OPERATIVE FILE // {player.name.toUpperCase()}</span>
          </div>
          <h2 className="text-lg font-mono font-bold text-slate-100 uppercase mt-0.5">
            Agent Dossier &amp; Trust Telemetry
          </h2>
        </div>

        <button
          id="profile-reset-btn"
          onClick={() => {
            playClickSound();
            if (
              window.confirm(
                'Reset all simulation progress? Digital Trust will return to 0 and all mission logs will be cleared.'
              )
            ) {
              onResetProgress();
            }
          }}
          className="flex items-center gap-1.5 text-xs font-mono text-rose-400 hover:text-rose-300 border border-rose-900/60 hover:border-rose-700 bg-rose-950/20 px-2.5 py-1 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="h-3 w-3" />
          <span>RESET TO ZERO</span>
        </button>
      </div>

      {/* Primary Stats Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
        {/* Digital Trust */}
        <div className="border border-[#21262d] bg-[#0d1117] p-4">
          <div className="text-[10px] text-slate-400 uppercase mb-1">
            DIGITAL TRUST RATING
          </div>
          <div className="text-xl font-bold text-cyan-400">
            {player.digitalTrust} / 100
          </div>
          <p className="text-[11px] text-slate-400 font-sans mt-1">
            Starts at 0. Earned strictly through sound defensive choices.
          </p>
        </div>

        {/* Operative Clearance */}
        <div className="border border-[#21262d] bg-[#0d1117] p-4">
          <div className="text-[10px] text-slate-400 uppercase mb-1">
            SECURITY RANK
          </div>
          <div className="text-base font-bold text-slate-200 uppercase truncate">
            {player.title}
          </div>
          <p className="text-[11px] text-cyan-400 mt-1">
            TIER {player.level.toString().padStart(2, '0')} // COMMAND
          </p>
        </div>

        {/* Missions Cleared */}
        <div className="border border-[#21262d] bg-[#0d1117] p-4">
          <div className="text-[10px] text-slate-400 uppercase mb-1">
            OPERATIONS RESOLVED
          </div>
          <div className="text-xl font-bold text-emerald-400">
            {player.completedMissions.length}
          </div>
          <p className="text-[11px] text-slate-400 font-sans mt-1">
            Active investigations contained and verified.
          </p>
        </div>
      </div>

      {/* Trust History Timeline */}
      <div className="border border-[#21262d] bg-[#0d1117] p-4 font-mono">
        <div className="flex items-center justify-between border-b border-[#21262d] pb-2 mb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              TRUST TELEMETRY LOG
            </h3>
          </div>
          <span className="text-[10px] text-slate-400">
            [{player.trustHistory.length} ENTRIES]
          </span>
        </div>

        {player.trustHistory.length === 0 ? (
          <div className="py-5 text-center text-xs text-slate-400 font-sans italic">
            No trust adjustments recorded yet. Digital Trust begins at 0 and adjusts
            as decisions unfold in the simulation.
          </div>
        ) : (
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {player.trustHistory.map((entry) => {
              const isPositive = entry.delta > 0;
              return (
                <div
                  key={entry.id}
                  className="flex items-center justify-between border border-[#21262d] bg-[#161b22] px-3 py-1.5 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-bold ${
                        isPositive ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isPositive ? `+${entry.delta}` : entry.delta}
                    </span>
                    <span className="text-slate-300 font-sans text-xs">{entry.reason}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 shrink-0">
                    TRUST: {entry.newScore}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Achievements / Badges Grid */}
      <div className="border border-[#21262d] bg-[#0d1117] p-4 font-mono">
        <div className="flex items-center gap-2 border-b border-[#21262d] pb-2 mb-3">
          <Award className="h-3.5 w-3.5 text-cyan-400" />
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            QUALIFICATION BADGES
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {player.achievements.map((ach) => (
            <div
              key={ach.id}
              className={`border p-2.5 flex items-start gap-2.5 ${
                ach.unlocked
                  ? 'border-cyan-800/60 bg-cyan-950/20'
                  : 'border-[#21262d] bg-[#161b22] opacity-50'
              }`}
            >
              <div
                className={`p-1.5 shrink-0 ${
                  ach.unlocked
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-700/50'
                    : 'bg-[#0d1117] text-slate-400 border border-[#21262d]'
                }`}
              >
                <Award className="h-3.5 w-3.5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-200">{ach.title}</span>
                  {ach.unlocked && (
                    <span className="text-[9px] text-cyan-300 border border-cyan-800 px-1 py-0.2">
                      CERTIFIED
                    </span>
                  )}
                </div>
                <p className="text-[11px] font-sans text-slate-400 mt-0.5">{ach.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

