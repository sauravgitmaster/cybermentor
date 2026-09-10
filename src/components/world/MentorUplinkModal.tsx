import React from 'react';
import { Cpu, X, Shield, Terminal, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PlayerState, WorldLocation } from '../../types';
import { playClickSound } from '../../utils/audio';

interface MentorUplinkModalProps {
  player: PlayerState;
  location: WorldLocation;
  onClose: () => void;
  onNavigateTab: (tab: 'abilities' | 'evidence' | 'world' | 'profile') => void;
}

export const MentorUplinkModal: React.FC<MentorUplinkModalProps> = ({
  player,
  location,
  onClose,
  onNavigateTab,
}) => {
  const completedCount = player.completedMissions.filter((m) =>
    location.missions.includes(m)
  ).length;

  return (
    <div
      id="mentor-uplink-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 overflow-y-auto"
    >
      <div className="my-8 w-full max-w-xl border border-[#30363d] bg-[#0d1117] p-5 space-y-4 font-mono shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              CYBERMENTOR AI // TACTICAL COMMS UPLINK
            </span>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-1 text-slate-400 hover:text-slate-100 border border-transparent hover:border-[#30363d]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Sector Dossier Briefing */}
        <div className="border border-[#21262d] bg-[#161b22] p-3 space-y-2 text-xs">
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>SECTOR: {location.name}</span>
            <span className="text-cyan-400 font-bold">DIGITAL TRUST: {player.digitalTrust}/100</span>
          </div>
          <p className="text-slate-300 font-sans leading-relaxed">
            "Operative {player.name}, you are currently stationed in the {location.name} sector.
            {player.digitalTrust === 0
              ? ' You are starting from a strict Zero-Trust baseline. Remember: trust is not a default entitlement—it must be earned through evidence-backed verification.'
              : ` Your current clearance is backed by ${player.digitalTrust} trust points across ${player.completedMissions.length} resolved incident(s).`}
          </p>
        </div>

        {/* Threat Assessment & Status */}
        <div className="space-y-2 text-xs">
          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            ACTIVE SECTOR INCIDENTS ({completedCount}/{location.missions.length} MITIGATED)
          </div>
          <div className="space-y-1.5">
            {location.id === 'campus' && (
              <>
                <div className="flex items-start justify-between p-2 border border-[#21262d] bg-[#11141a]">
                  <div>
                    <div className="font-bold text-slate-200">OPS-01: The Suspicious Email</div>
                    <div className="text-[10px] text-slate-400">Location: Library Commons (Jordan Rivera)</div>
                  </div>
                  {player.completedMissions.includes('mission-01-email') ? (
                    <span className="text-[10px] text-emerald-400 border border-emerald-800/80 bg-emerald-950/20 px-1.5 py-0.5">
                      RESOLVED
                    </span>
                  ) : (
                    <span className="text-[10px] text-amber-400 border border-amber-800/80 bg-amber-950/20 px-1.5 py-0.5">
                      ACTIVE THREAT
                    </span>
                  )}
                </div>

                <div className="flex items-start justify-between p-2 border border-[#21262d] bg-[#11141a]">
                  <div>
                    <div className="font-bold text-slate-200">OPS-02: The Lost USB Drive</div>
                    <div className="text-[10px] text-slate-400">Location: Engineering Lab Room 204 (Marcus Chen)</div>
                  </div>
                  {player.completedMissions.includes('mission-02-usb') ? (
                    <span className="text-[10px] text-emerald-400 border border-emerald-800/80 bg-emerald-950/20 px-1.5 py-0.5">
                      RESOLVED
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 border border-[#30363d] bg-[#161b22] px-1.5 py-0.5">
                      AVAILABLE
                    </span>
                  )}
                </div>

                <div className="flex items-start justify-between p-2 border border-[#21262d] bg-[#11141a]">
                  <div>
                    <div className="font-bold text-slate-200">OPS-03: The Rogue Access Point</div>
                    <div className="text-[10px] text-slate-400">Location: Student Union Cafe (Elena Rostova)</div>
                  </div>
                  {player.completedMissions.includes('mission-03-wifi') ? (
                    <span className="text-[10px] text-emerald-400 border border-emerald-800/80 bg-emerald-950/20 px-1.5 py-0.5">
                      RESOLVED
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 border border-[#30363d] bg-[#161b22] px-1.5 py-0.5">
                      AVAILABLE
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick Station Teleport / Links */}
        <div className="pt-2 border-t border-[#21262d] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClickSound();
                onClose();
                onNavigateTab('abilities');
              }}
              className="text-[10px] border border-[#30363d] bg-[#161b22] hover:border-cyan-400 px-2 py-1 text-slate-300"
            >
              ABILITIES WORKSTATION
            </button>
            <button
              onClick={() => {
                playClickSound();
                onClose();
                onNavigateTab('evidence');
              }}
              className="text-[10px] border border-[#30363d] bg-[#161b22] hover:border-cyan-400 px-2 py-1 text-slate-300"
            >
              EVIDENCE BOARD
            </button>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-3 py-1 text-xs font-bold uppercase transition-colors"
          >
            DISMISS UPLINK
          </button>
        </div>
      </div>
    </div>
  );
};
