import React from 'react';
import {
  X,
  Zap,
  Shield,
  Terminal,
} from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface HowItWorksModalProps {
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ onClose }) => {
  return (
    <div
      id="how-it-works-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 overflow-y-auto"
    >
      <div className="my-8 w-full max-w-2xl border border-[#30363d] bg-[#0d1117] p-5 sm:p-6 space-y-5 font-mono">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              DOCTRINE // OPERATIONAL ARCHITECTURE
            </h3>
          </div>
          <button
            id="close-how-it-works-btn"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-1 text-slate-400 hover:text-slate-100 border border-transparent hover:border-[#30363d] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs leading-relaxed">
          {/* Core Philosophy Comparison */}
          <div className="border border-[#21262d] bg-[#161b22] p-3.5">
            <div className="text-[10px] text-cyan-400 uppercase tracking-wider mb-2 font-bold">
              SURVIVAL TRAINING PARADIGM
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="border border-rose-900/60 bg-rose-950/10 p-2.5">
                <div className="font-bold text-rose-400 mb-1">CONVENTIONAL QUIZ</div>
                <div className="text-[10px] text-slate-400 mb-1">
                  READ ➔ MULTIPLE CHOICE ➔ SCORE
                </div>
                <p className="text-[11px] font-sans text-slate-400">
                  Passive abstract memorization that fails to develop tactical instincts against real threat actors.
                </p>
              </div>

              <div className="border border-cyan-800/60 bg-cyan-950/20 p-2.5">
                <div className="font-bold text-cyan-400 mb-1">TACTICAL CYBER RPG</div>
                <div className="text-[10px] text-cyan-300 mb-1">
                  EXPLORE ➔ ENCOUNTER ➔ INVESTIGATE ➔ MITIGATE
                </div>
                <p className="text-[11px] font-sans text-slate-300">
                  Technical problem-solving where cybersecurity knowledge is your primary gameplay mechanic.
                </p>
              </div>
            </div>
          </div>

          {/* Three Key Mechanics */}
          <div className="space-y-3 font-mono">
            <div className="flex items-start gap-3 border border-[#21262d] bg-[#161b22] p-3">
              <div className="p-1 border border-[#30363d] bg-[#0d1117] text-cyan-400 shrink-0 mt-0.5">
                <Shield className="h-3.5 w-3.5" />
              </div>
              <div>
                <div className="font-bold text-slate-200 text-xs uppercase">
                  1. ZERO-TRUST PROGRESSION
                </div>
                <p className="text-xs font-sans text-slate-400 mt-0.5">
                  Operative trust starts at 0/100. Every access level must be earned through evidence-backed mitigation, verifying credentials, and containing rogue artifacts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 border border-[#21262d] bg-[#161b22] p-3">
              <div className="p-1 border border-[#30363d] bg-[#0d1117] text-cyan-400 shrink-0 mt-0.5">
                <Zap className="h-3.5 w-3.5" />
              </div>
              <div>
                <div className="font-bold text-slate-200 text-xs uppercase">
                  2. DEFENSIVE TOOLKIT ABILITIES
                </div>
                <p className="text-xs font-sans text-slate-400 mt-0.5">
                  Deploy active capabilities: <strong>OBSERVE</strong> headers, <strong>INSPECT</strong> payloads, <strong>VERIFY</strong> authentic channels, and <strong>ISOLATE</strong> malicious processes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 border border-[#21262d] bg-[#161b22] p-3">
              <div className="p-1 border border-[#30363d] bg-[#0d1117] text-cyan-400 shrink-0 mt-0.5">
                <Terminal className="h-3.5 w-3.5" />
              </div>
              <div>
                <div className="font-bold text-slate-200 text-xs uppercase">
                  3. INCIDENT POST-MORTEM &amp; DEBRIEF
                </div>
                <p className="text-xs font-sans text-slate-400 mt-0.5">
                  Post-operation debriefs systematically deconstruct the attack vectors, explain the structural security failure, and formulate the real-world operational rule.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-[#21262d] flex justify-end">
          <button
            id="acknowledge-how-it-works-btn"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-1.5 text-xs font-bold font-mono transition-colors uppercase"
          >
            ACKNOWLEDGE &amp; RESUME
          </button>
        </div>
      </div>
    </div>
  );
};

