import React from 'react';
import { MangaSpeechBubble as SpeechBubbleType } from '../../../types/manga';

interface MangaSpeechBubbleProps {
  bubble: SpeechBubbleType;
  className?: string;
}

export const MangaSpeechBubble: React.FC<MangaSpeechBubbleProps> = ({
  bubble,
  className = '',
}) => {
  const { speaker, text, bubbleType, position, tailDirection = 'down-left', characterRole } = bubble;

  // Compute absolute positioning classes within the comic panel
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4 sm:top-6 sm:left-6 max-w-[70%] sm:max-w-[48%]';
      case 'top-right':
        return 'top-4 right-4 sm:top-6 sm:right-6 max-w-[70%] sm:max-w-[48%]';
      case 'top-center':
        return 'top-4 left-1/2 -translate-x-1/2 max-w-[85%] sm:max-w-[60%]';
      case 'bottom-left':
        return 'bottom-8 left-4 sm:bottom-12 sm:left-6 max-w-[70%] sm:max-w-[48%]';
      case 'bottom-right':
        return 'bottom-8 right-4 sm:bottom-12 sm:right-6 max-w-[70%] sm:max-w-[48%]';
      case 'center-left':
        return 'top-1/3 left-4 max-w-[70%] sm:max-w-[45%]';
      case 'center-right':
        return 'top-1/3 right-4 max-w-[70%] sm:max-w-[45%]';
      default:
        return 'top-6 left-6 max-w-[65%]';
    }
  };

  // 1. HOLOGRAM BUBBLE (For CyberMentor AI)
  if (bubbleType === 'hologram' || characterRole === 'mentor') {
    return (
      <div className={`absolute z-30 pointer-events-auto select-text filter drop-shadow-[0_0_12px_rgba(6,182,212,0.6)] ${getPositionClasses()} ${className}`}>
        <div className="relative bg-slate-950/90 border-2 border-cyan-400 rounded-xl p-3 sm:p-3.5 backdrop-blur-md shadow-2xl">
          {/* Tech Corner Brackets */}
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-cyan-300" />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-cyan-300" />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-cyan-300" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-cyan-300" />

          {/* Speaker Badge */}
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[10px] sm:text-xs font-black tracking-widest text-cyan-300 uppercase font-mono">
              {speaker || 'CYBERMENTOR AI'}
            </span>
          </div>

          {/* Dialogue Text */}
          <p className="text-xs sm:text-sm font-semibold text-cyan-50 leading-snug">
            {text}
          </p>

          {/* Hologram Tail */}
          {tailDirection === 'down-left' && (
            <div className="absolute -bottom-3 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-cyan-400" />
          )}
          {tailDirection === 'down-right' && (
            <div className="absolute -bottom-3 right-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-cyan-400" />
          )}
        </div>
      </div>
    );
  }

  // 2. SHOUT / PANIC / URGENCY EXPLOSIVE BUBBLE
  if (bubbleType === 'shout') {
    return (
      <div className={`absolute z-30 pointer-events-auto select-text filter drop-shadow-[0_4px_14px_rgba(225,29,72,0.5)] ${getPositionClasses()} ${className}`}>
        <div className="relative bg-amber-50 border-[3.5px] border-red-600 rounded-lg p-3 sm:p-4 rotate-[-1deg]">
          {/* Spiky Comic Notches */}
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[10px] sm:text-xs font-black tracking-wider text-red-600 uppercase font-mono">
              {speaker}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-black text-slate-950 uppercase tracking-tight leading-snug">
            {text}
          </p>

          {/* Jagged Tail */}
          {tailDirection === 'down-left' && (
            <div className="absolute -bottom-3 left-6 w-4 h-4 bg-amber-50 border-r-[3.5px] border-b-[3.5px] border-red-600 rotate-45 transform" />
          )}
          {tailDirection === 'down-right' && (
            <div className="absolute -bottom-3 right-6 w-4 h-4 bg-amber-50 border-r-[3.5px] border-b-[3.5px] border-red-600 rotate-45 transform" />
          )}
        </div>
      </div>
    );
  }

  // 3. THOUGHT BUBBLE (Cloud-like with trailing circles)
  if (bubbleType === 'thought') {
    return (
      <div className={`absolute z-30 pointer-events-auto select-text filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] ${getPositionClasses()} ${className}`}>
        <div className="relative bg-white border-2 border-slate-800 rounded-3xl p-3 sm:p-3.5">
          <div className="text-[10px] font-bold text-slate-500 mb-0.5 font-mono">
            {speaker} (thinking...)
          </div>
          <p className="text-xs sm:text-sm font-medium italic text-slate-800 leading-snug">
            "{text}"
          </p>

          {/* Trailing Cloud Circles */}
          {tailDirection === 'down-left' && (
            <>
              <div className="absolute -bottom-2 left-6 w-3 h-3 rounded-full bg-white border-2 border-slate-800" />
              <div className="absolute -bottom-4 left-4 w-2 h-2 rounded-full bg-white border-2 border-slate-800" />
            </>
          )}
          {tailDirection === 'down-right' && (
            <>
              <div className="absolute -bottom-2 right-6 w-3 h-3 rounded-full bg-white border-2 border-slate-800" />
              <div className="absolute -bottom-4 right-4 w-2 h-2 rounded-full bg-white border-2 border-slate-800" />
            </>
          )}
        </div>
      </div>
    );
  }

  // 4. PHONE SCREEN / SYSTEM PUSH NOTIFICATION
  if (bubbleType === 'phone-screen' || bubbleType === 'system-alert') {
    return (
      <div className={`absolute z-30 pointer-events-auto select-text filter drop-shadow-xl ${getPositionClasses()} ${className}`}>
        <div className="bg-slate-900/95 border border-slate-700 text-white rounded-xl p-3 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 font-mono">
                {speaker || 'SECURITY ALERT'}
              </span>
            </div>
            <span className="text-[9px] text-slate-400 font-mono">NOW</span>
          </div>
          <p className="text-xs font-semibold text-slate-100 leading-snug">
            {text}
          </p>
        </div>
      </div>
    );
  }

  // 5. STANDARD MANGA SPEECH BUBBLE (Clean comic bubble with crisp tail)
  return (
    <div className={`absolute z-30 pointer-events-auto select-text filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)] ${getPositionClasses()} ${className}`}>
      <div className="relative bg-white border-[2.5px] border-slate-900 rounded-2xl p-3 sm:p-3.5 shadow-md">
        {speaker && (
          <div className="text-[10px] font-black text-slate-700 uppercase tracking-wider mb-0.5 font-mono">
            {speaker}
          </div>
        )}
        <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
          {text}
        </p>

        {/* Comic Tail */}
        {tailDirection === 'down-left' && (
          <div className="absolute -bottom-2.5 left-6 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[10px] border-t-slate-900">
            <div className="absolute -top-[10px] -left-[6px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[9px] border-t-white" />
          </div>
        )}
        {tailDirection === 'down-right' && (
          <div className="absolute -bottom-2.5 right-6 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[10px] border-t-slate-900">
            <div className="absolute -top-[10px] -left-[6px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[9px] border-t-white" />
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// SOUND EFFECT OVERLAY COMPONENT
// =========================================================================
interface MangaSoundEffectProps {
  soundText?: string;
  className?: string;
}

export const MangaSoundEffect: React.FC<MangaSoundEffectProps> = ({
  soundText,
  className = '',
}) => {
  if (!soundText) return null;

  return (
    <div className={`absolute z-20 pointer-events-none select-none top-4 right-4 sm:top-6 sm:right-8 transform rotate-[-8deg] filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] ${className}`}>
      <div className="relative px-3 py-1 bg-amber-400 border-2 border-slate-950 rounded shadow-lg transform hover:scale-105 transition-transform">
        <span className="text-xs sm:text-sm md:text-base font-black italic tracking-widest text-slate-950 uppercase font-sans">
          ★ {soundText} ★
        </span>
      </div>
    </div>
  );
};
