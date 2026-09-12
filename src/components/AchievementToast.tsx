import React, { useEffect } from 'react';
import { Award, Sparkles, X } from 'lucide-react';
import { Achievement } from '../types';
import { playSuccessSound } from '../utils/audio';

interface AchievementToastProps {
  achievement: Achievement | null;
  onDismiss: () => void;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({
  achievement,
  onDismiss,
}) => {
  useEffect(() => {
    if (achievement) {
      playSuccessSound();
      const timer = setTimeout(() => {
        onDismiss();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onDismiss]);

  if (!achievement) return null;

  return (
    <div
      id="achievement-toast-banner"
      className="fixed bottom-6 right-4 sm:right-6 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-auto"
    >
      <div className="relative rounded-2xl border-2 border-amber-400/80 bg-[#0c1524]/95 backdrop-blur-md p-4 shadow-2xl ring-1 ring-amber-400/30 overflow-hidden">
        {/* Subtle glowing corner */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/15 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-400/60 text-amber-300 shadow-inner">
            <Award className="h-5 w-5 animate-bounce" style={{ animationDuration: '2s' }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400">
              <Sparkles className="h-3 w-3" />
              <span>ACHIEVEMENT UNLOCKED</span>
            </div>
            <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wide truncate mt-0.5">
              {achievement.title}
            </h4>
            <p className="text-xs text-slate-300 font-sans mt-0.5 leading-snug">
              {achievement.description}
            </p>
          </div>

          <button
            onClick={onDismiss}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Dismiss achievement"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
