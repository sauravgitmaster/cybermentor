import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  HelpCircle,
  X,
  MessageSquare,
  ArrowRight,
  Send,
  Lightbulb,
} from 'lucide-react';
import { MissionData, PlayerState } from '../types';
import { api } from '../services/api';
import { playClickSound, playSuccessSound } from '../utils/audio';

interface SocraticMentorModalProps {
  mission: MissionData;
  stage: string;
  inspectedTargetCount: number;
  totalTargetCount: number;
  player: PlayerState;
  onClose: () => void;
}

export const SocraticMentorModal: React.FC<SocraticMentorModalProps> = ({
  mission,
  stage,
  inspectedTargetCount,
  totalTargetCount,
  player,
  onClose,
}) => {
  const [playerDoubt, setPlayerDoubt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [socraticResult, setSocraticResult] = useState<{
    guidingQuestion: string;
    conceptNudge: string;
    mentorObservation: string;
  } | null>(null);

  const handleAskMentor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    playClickSound();

    const res = await api.askSocraticMentor({
      missionId: mission.id,
      missionTitle: mission.title,
      stage,
      inspectedTargetCount,
      totalTargetCount,
      playerDoubt,
      operative: {
        name: player.name || 'Operative',
        trustScore: player.digitalTrust ?? player.trustScore ?? 0,
      },
    });

    if (res) {
      setSocraticResult(res);
      playSuccessSound();
    }
    setIsLoading(false);
  };

  return (
    <div
      id="socratic-mentor-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-xl rounded-2xl border border-cyan-900/60 bg-[#0c1018] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1b2538] bg-[#111724] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                CYBERMENTOR AI // SOCRATIC INQUIRY
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-100">
                Live Tactical Consultation
              </h2>
            </div>
          </div>
          <button
            id="close-socratic-modal-btn"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-[#1a2336] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="text-xs text-slate-300 leading-relaxed font-mono">
            Ask CyberMentor for guidance on technical anomalies. Rather than revealing answers, CyberMentor guides your critical analysis through targeted forensic questioning.
          </div>

          {/* Form */}
          <form onSubmit={handleAskMentor} className="space-y-3">
            <div className="relative">
              <textarea
                value={playerDoubt}
                onChange={(e) => setPlayerDoubt(e.target.value)}
                placeholder="What anomaly or dilemma are you weighing? (e.g., 'I see a strange SSID signal' or 'Why does the USB have high entropy?')"
                rows={3}
                className="w-full rounded-xl border border-[#1f2b40] bg-black/60 p-3 text-xs text-slate-200 font-mono placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-[11px] font-mono text-slate-400">
                Cataloged indicators: <strong className="text-cyan-300">{inspectedTargetCount}/{totalTargetCount}</strong>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 text-xs font-mono transition-all flex items-center gap-1.5 shadow"
              >
                {isLoading ? (
                  <span>SYNTHESIZING...</span>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>CONSULT MENTOR</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Socratic Response Display */}
          {socraticResult && (
            <div className="rounded-xl border border-cyan-800/80 bg-[#0e1724] p-5 space-y-3.5 animate-in slide-in-from-bottom duration-200">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
                <Lightbulb className="h-4 w-4 text-cyan-400" />
                <span>SOCRATIC GUIDING INQUIRY</span>
              </div>

              <div className="p-3.5 rounded-lg bg-black/50 border border-cyan-900/60 text-xs text-cyan-100 font-mono leading-relaxed">
                &quot;{socraticResult.guidingQuestion}&quot;
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2.5 rounded bg-[#090d16] border border-[#172338]">
                  <span className="text-slate-400 block uppercase text-[10px]">Technical Nudge:</span>
                  <span className="text-slate-200">{socraticResult.conceptNudge}</span>
                </div>
                <div className="p-2.5 rounded bg-[#090d16] border border-[#172338]">
                  <span className="text-slate-400 block uppercase text-[10px]">Mentor Observation:</span>
                  <span className="text-slate-300">{socraticResult.mentorObservation}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#1b2538] bg-[#111724] px-6 py-3 flex justify-end">
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="rounded bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-1.5 text-xs font-mono transition-colors"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
