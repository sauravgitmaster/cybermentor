import React from 'react';
import { MangaDecisionOption } from '../../types/manga';
import { ShieldCheck, AlertTriangle, ArrowRight, Zap, CheckCircle2, XCircle } from 'lucide-react';

interface MangaDecisionForkProps {
  question: string;
  options: MangaDecisionOption[];
  selectedOptionId: string | null;
  onSelectOption: (option: MangaDecisionOption) => void;
  disabled?: boolean;
  studentName?: string;
}

export const MangaDecisionFork: React.FC<MangaDecisionForkProps> = ({
  question,
  options,
  selectedOptionId,
  onSelectOption,
  disabled = false,
  studentName = 'Saurav',
}) => {
  const selectedOption = options.find((opt) => opt.id === selectedOptionId);

  return (
    <div className="relative w-full my-6 p-4 sm:p-6 bg-slate-900/95 border-2 sm:border-[3px] border-amber-400/90 rounded-2xl shadow-2xl backdrop-blur-md">
      {/* Decorative Manga Corner Brackets */}
      <div className="absolute -top-2 -left-2 w-5 h-5 border-t-4 border-l-4 border-amber-400" />
      <div className="absolute -top-2 -right-2 w-5 h-5 border-t-4 border-r-4 border-amber-400" />
      <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-4 border-l-4 border-amber-400" />
      <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-4 border-r-4 border-amber-400" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest rounded font-mono shadow-sm">
            ⚡ INTERACTIVE DECISION FORK
          </span>
          <span className="text-xs text-amber-300 font-bold font-mono">
            {studentName.toUpperCase()}'S FATE IN YOUR HANDS
          </span>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          CHOOSE A DEFENSIVE ACTION TO UNLOCK CONSEQUENCE PANEL
        </div>
      </div>

      {/* Question Prompt */}
      <h3 className="text-base sm:text-lg font-bold text-white mb-5 leading-snug">
        {question}
      </h3>

      {/* 4 Interactive Choice Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const showResult = selectedOptionId !== null;

          return (
            <button
              key={option.id}
              disabled={disabled}
              onClick={() => onSelectOption(option)}
              className={`group relative text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all duration-200 transform ${
                isSelected
                  ? option.isCorrect
                    ? 'bg-emerald-950/80 border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)] scale-[1.02]'
                    : 'bg-rose-950/80 border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)] scale-[1.02]'
                  : showResult
                  ? 'bg-slate-900/50 border-slate-800 opacity-60'
                  : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 hover:border-cyan-400 hover:scale-[1.01]'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-sm font-mono transition-colors ${
                      isSelected
                        ? option.isCorrect
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-rose-500 text-white'
                        : 'bg-slate-700 text-cyan-300 group-hover:bg-cyan-400 group-hover:text-slate-950'
                    }`}
                  >
                    {option.id}
                  </span>
                  <span className="font-bold text-sm text-slate-100 group-hover:text-white">
                    {option.label}
                  </span>
                </div>

                {/* Status Indicator */}
                {isSelected && (
                  <div>
                    {option.isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" /> SECURE
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-rose-400">
                        <XCircle className="w-4 h-4" /> COMPROMISED
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Option Tactical Description */}
              <p className="text-xs sm:text-sm text-slate-300 pl-9 leading-relaxed">
                {option.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Post-Choice Reaction & Mentor Feedback */}
      {selectedOption && (
        <div
          className={`mt-5 p-4 rounded-xl border-2 animate-fadeIn ${
            selectedOption.isCorrect
              ? 'bg-emerald-950/70 border-emerald-500/80 text-emerald-100'
              : 'bg-rose-950/70 border-rose-500/80 text-rose-100'
          }`}
        >
          <div className="flex items-center gap-2 font-black text-sm sm:text-base mb-1.5 uppercase font-mono">
            {selectedOption.isCorrect ? (
              <>
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>{selectedOption.consequenceTitle}</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <span>{selectedOption.consequenceTitle}</span>
              </>
            )}
          </div>

          <p className="text-xs sm:text-sm mb-3 leading-relaxed opacity-95">
            {selectedOption.consequenceText}
          </p>

          <div className="pt-2.5 border-t border-slate-700/60 flex items-start gap-2 text-xs font-semibold text-cyan-200">
            <span className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500 text-cyan-300 font-mono text-[10px] uppercase">
              CYBERMENTOR AI FEEDBACK
            </span>
            <p className="leading-snug">
              "{selectedOption.mentorCritique}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
