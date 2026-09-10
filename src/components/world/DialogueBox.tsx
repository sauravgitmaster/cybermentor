import React, { useState } from 'react';
import { Play, ArrowRight, X, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { NPCDialogue } from '../../data/dialogues';
import { playClickSound, playInspectSound } from '../../utils/audio';

interface DialogueBoxProps {
  dialogue: NPCDialogue;
  isCompleted: boolean;
  onStartMission: (missionId: string) => void;
  onClose: () => void;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  dialogue,
  isCompleted,
  onStartMission,
  onClose,
}) => {
  const [speechIndex, setSpeechIndex] = useState<number>(0);
  const speechLines = isCompleted ? dialogue.resolvedText : dialogue.unresolvedText;
  const isLastLine = speechIndex >= speechLines.length - 1;

  const handleNext = () => {
    playClickSound();
    if (isLastLine) {
      // If already resolved or player clicks action, start mission / review
      onStartMission(dialogue.missionId);
    } else {
      setSpeechIndex((prev) => prev + 1);
    }
  };

  const handleAction = () => {
    playInspectSound();
    onStartMission(dialogue.missionId);
  };

  // Render character portrait based on identity
  const renderPortrait = () => {
    switch (dialogue.avatarSeed) {
      case 'jordan':
        return (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-[#243329] border-2 border-[#477a56] flex items-center justify-center relative overflow-hidden shadow-inner shrink-0">
            {/* Soft backdrop */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#345c40]/40 to-transparent" />
            {/* Stylized Face & Hair */}
            <div className="relative flex flex-col items-center">
              {/* Hair */}
              <div className="w-10 h-7 bg-[#543d2b] rounded-t-xl -mb-2 z-10" />
              {/* Head */}
              <div className="w-9 h-9 bg-[#e0b58f] rounded-lg relative flex items-center justify-center">
                {/* Eyes */}
                <div className="flex gap-2.5 -mt-1">
                  <div className="w-1.5 h-2 bg-[#2c1d11] rounded-full" />
                  <div className="w-1.5 h-2 bg-[#2c1d11] rounded-full" />
                </div>
                {/* Mouth */}
                <div className={`absolute bottom-2 w-2.5 h-1 rounded-full ${isCompleted ? 'bg-[#c25e5e] h-1.5' : 'border-t-2 border-[#4a2e1b]'}`} />
              </div>
              {/* Olive Green Jacket Collar */}
              <div className="w-12 h-6 bg-[#3d5a42] rounded-t-lg -mt-1 border-t border-[#628768]" />
            </div>
            {/* Status indicator badge */}
            <div className="absolute bottom-1 right-1">
              {isCompleted ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 bg-[#0d1f14] rounded-full" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-amber-400 bg-[#291e0a] rounded-full" />
              )}
            </div>
          </div>
        );

      case 'marcus':
        return (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-[#1c293d] border-2 border-[#3b5987] flex items-center justify-center relative overflow-hidden shadow-inner shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#2d4773]/40 to-transparent" />
            <div className="relative flex flex-col items-center">
              {/* Neat Black Hair */}
              <div className="w-10 h-6 bg-[#181a20] rounded-t-xl -mb-1.5 z-10" />
              {/* Head */}
              <div className="w-9 h-9 bg-[#dfb48e] rounded-lg relative flex items-center justify-center">
                {/* Rectangular Glasses */}
                <div className="absolute top-2.5 flex items-center gap-1 z-10">
                  <div className="w-3 h-2.5 border-2 border-[#1c2a38] bg-cyan-200/20" />
                  <div className="w-1 h-0.5 bg-[#1c2a38]" />
                  <div className="w-3 h-2.5 border-2 border-[#1c2a38] bg-cyan-200/20" />
                </div>
                {/* Mouth */}
                <div className="absolute bottom-2 w-2 h-0.5 bg-[#633a20]" />
              </div>
              {/* Navy Technical Shirt & Lab Lanyard */}
              <div className="w-12 h-6 bg-[#1f3554] rounded-t-lg -mt-1 relative flex justify-center">
                <div className="w-1 h-full bg-cyan-400" />
              </div>
            </div>
            <div className="absolute bottom-1 right-1">
              {isCompleted ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 bg-[#0d1f14] rounded-full" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-amber-400 bg-[#291e0a] rounded-full" />
              )}
            </div>
          </div>
        );

      case 'elena':
        return (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-[#331c26] border-2 border-[#7a435b] flex items-center justify-center relative overflow-hidden shadow-inner shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#5c2a3f]/40 to-transparent" />
            <div className="relative flex flex-col items-center">
              {/* Blonde Hair Bun */}
              <div className="w-6 h-4 bg-[#c49a45] rounded-full -mb-1 z-0" />
              <div className="w-10 h-6 bg-[#c49a45] rounded-t-xl -mb-1.5 z-10" />
              {/* Head */}
              <div className="w-9 h-9 bg-[#f0c8ab] rounded-lg relative flex items-center justify-center">
                {/* Wire Glasses */}
                <div className="absolute top-2.5 flex items-center gap-1 z-10">
                  <div className="w-2.5 h-2.5 border border-[#85542b] rounded-full bg-blue-100/20" />
                  <div className="w-1 h-0.5 bg-[#85542b]" />
                  <div className="w-2.5 h-2.5 border border-[#85542b] rounded-full bg-blue-100/20" />
                </div>
                <div className="absolute bottom-2 w-2 h-0.5 bg-[#8a4e3b]" />
              </div>
              {/* Burgundy Turtleneck */}
              <div className="w-12 h-6 bg-[#63203b] rounded-t-lg -mt-1" />
            </div>
            <div className="absolute bottom-1 right-1">
              {isCompleted ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 bg-[#0d1f14] rounded-full" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-amber-400 bg-[#291e0a] rounded-full" />
              )}
            </div>
          </div>
        );

      case 'vance':
        return (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-[#14213d] border-2 border-[#1f4068] flex items-center justify-center relative overflow-hidden shadow-inner shrink-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#1b2a4a]/40 to-transparent" />
            <div className="relative flex flex-col items-center">
              {/* Silver Hair */}
              <div className="w-10 h-6 bg-[#64748b] rounded-t-xl -mb-1.5 z-10" />
              {/* Head */}
              <div className="w-9 h-9 bg-[#e2c4a6] rounded-lg relative flex items-center justify-center">
                <div className="flex gap-2 -mt-1">
                  <div className="w-1.5 h-1.5 bg-[#0f172a] rounded-full" />
                  <div className="w-1.5 h-1.5 bg-[#0f172a] rounded-full" />
                </div>
                <div className="absolute bottom-2 w-3 h-0.5 bg-[#54331d]" />
              </div>
              {/* SecOps Navy Blazer with Gold Shield Badge */}
              <div className="w-12 h-6 bg-[#1e3a5f] rounded-t-lg -mt-1 relative flex justify-center">
                <div className="w-1.5 h-2 bg-amber-400 mt-1 rounded-sm" />
              </div>
            </div>
            <div className="absolute bottom-1 right-1">
              <ShieldCheck className="h-4 w-4 text-cyan-400 bg-[#0d1f14] rounded-full" />
            </div>
          </div>
        );

      default:
        return (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-[#2d281e] border-2 border-[#736340] flex items-center justify-center relative overflow-hidden shadow-inner shrink-0">
            <div className="relative flex flex-col items-center">
              <div className="w-10 h-6 bg-[#261f18] rounded-t-xl -mb-1.5 z-10" />
              <div className="w-9 h-9 bg-[#cca37c] rounded-lg relative flex items-center justify-center">
                <div className="flex gap-2 -mt-1">
                  <div className="w-1.5 h-2 bg-[#2c1d11] rounded-full" />
                  <div className="w-1.5 h-2 bg-[#2c1d11] rounded-full" />
                </div>
                <div className="absolute bottom-2 w-2 h-0.5 bg-[#54331d]" />
              </div>
              <div className="w-12 h-6 bg-[#705a41] rounded-t-lg -mt-1" />
            </div>
          </div>
        );
    }
  };

  return (
    <div
      id="rpg-dialogue-modal"
      className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 z-40 animate-in slide-in-from-bottom-3 duration-200 select-none"
    >
      <div className="max-w-4xl mx-auto rounded-xl border-2 border-[#425066] bg-[#101726]/95 backdrop-blur-md shadow-2xl p-4 sm:p-5 relative text-slate-100">
        {/* Subtle decorative RPG corners */}
        <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-[#f59e0b] border border-black" />
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#f59e0b] border border-black" />
        <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-[#f59e0b] border border-black" />
        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#f59e0b] border border-black" />

        {/* Close / Dismiss Button */}
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-slate-100 hover:bg-white/10 rounded transition-colors"
          title="Dismiss dialogue"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Character Portrait */}
          {renderPortrait()}

          {/* Dialogue Content */}
          <div className="flex-1 space-y-2 min-w-0 pr-6">
            {/* Header: Name and Affiliation Tag */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-amber-300 text-sm sm:text-base tracking-wide font-mono">
                {dialogue.name}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#1e2a40] text-cyan-300 border border-[#2d3e5e]">
                {dialogue.role}
              </span>
              {isCompleted && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  INCIDENT DISARMED
                </span>
              )}
            </div>

            {/* Spoken Text */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans min-h-[48px]">
              "{speechLines[speechIndex]}"
            </p>

            {/* Pagination Indicator if multi-part dialogue */}
            {speechLines.length > 1 && (
              <div className="flex items-center gap-1.5 pt-1">
                {speechLines.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === speechIndex ? 'w-5 bg-amber-400' : 'w-2 bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="mt-4 pt-3 border-t border-[#25334d] flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded bg-black/40 border border-slate-700 text-amber-400 font-bold">
              [SPACE]
            </span>
            <span>or click to continue</span>
          </div>

          <div className="flex items-center gap-2">
            {!isLastLine && (
              <button
                onClick={handleNext}
                className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-[#1e2a40] hover:bg-[#2a3c5a] border border-[#3b5175] rounded-md transition-colors flex items-center gap-1"
              >
                <span>Continue</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            )}

            <button
              onClick={handleAction}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-md shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                isCompleted
                  ? 'bg-slate-700 hover:bg-slate-600 text-white'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950'
              }`}
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>{isCompleted ? dialogue.reviewActionLabel : dialogue.primaryActionLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
