import React from 'react';
import { ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Lock, Footprints } from 'lucide-react';
import { AreaExit } from '../../types/world';

interface AreaExitGateProps {
  exit: AreaExit;
  isNearPlayer: boolean;
  isUnlocked: boolean;
  onInteract?: () => void;
}

export const AreaExitGate: React.FC<AreaExitGateProps> = ({
  exit,
  isNearPlayer,
  isUnlocked,
  onInteract,
}) => {
  const { position, direction, label, name, lockedMessage } = exit;

  const renderDirectionIcon = (className: string) => {
    switch (direction) {
      case 'left':
        return <ArrowLeft className={className} />;
      case 'right':
        return <ArrowRight className={className} />;
      case 'up':
        return <ArrowUp className={className} />;
      case 'down':
        return <ArrowDown className={className} />;
    }
  };

  return (
    <div
      id={`exit-${exit.id}`}
      onClick={onInteract}
      className={`absolute select-none cursor-pointer z-15 transition-all duration-150 group ${
        isNearPlayer ? 'scale-105' : 'hover:scale-102'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Floating Overhead Interaction Pill */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none z-30">
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider shadow-lg border backdrop-blur-sm transition-all duration-200 ${
            isUnlocked
              ? isNearPlayer
                ? 'bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-400/50 shadow-amber-400/20'
                : 'bg-[#0f172a]/95 text-cyan-300 border-cyan-500/50'
              : 'bg-[#18181b]/95 text-slate-400 border-rose-900/60'
          }`}
        >
          {isUnlocked ? (
            <>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{isNearPlayer ? `[E] ${label}` : label}</span>
              {renderDirectionIcon('h-3 w-3 shrink-0')}
            </>
          ) : (
            <>
              <Lock className="h-3 w-3 text-rose-400 shrink-0" />
              <span className="text-rose-300/90">{name} [LOCKED]</span>
            </>
          )}
        </div>
      </div>

      {/* Physical Exit Pathway Ground Threshold */}
      <div className="relative flex flex-col items-center">
        {/* Paved Transition Mat */}
        <div
          className={`w-16 h-12 rounded-lg border-2 flex items-center justify-center relative overflow-hidden transition-all duration-300 shadow-md ${
            isUnlocked
              ? isNearPlayer
                ? 'bg-[#e2d5c0] border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                : 'bg-[#cfc0a7] border-[#8c7d67]'
              : 'bg-[#3f3f46]/70 border-rose-950/80 grayscale'
          }`}
        >
          {/* Stepping flagstones */}
          <div className="absolute inset-1 grid grid-cols-2 grid-rows-2 gap-1 opacity-40">
            <div className="bg-[#8c7d67]/50 rounded-sm" />
            <div className="bg-[#8c7d67]/30 rounded-sm" />
            <div className="bg-[#8c7d67]/40 rounded-sm" />
            <div className="bg-[#8c7d67]/60 rounded-sm" />
          </div>

          {/* Animated Directional Chevrons */}
          {isUnlocked ? (
            <div className="relative flex items-center justify-center gap-1 z-10 text-amber-600 font-mono font-black">
              {renderDirectionIcon('h-5 w-5 animate-pulse')}
              {isNearPlayer && <Footprints className="h-4 w-4 text-amber-700 animate-bounce" />}
            </div>
          ) : (
            <div className="relative flex flex-col items-center justify-center z-10 text-rose-400">
              <Lock className="h-4 w-4" />
            </div>
          )}
        </div>

        {/* Directional Signpost Prop beside walkway */}
        <div className="absolute -right-5 top-0 flex flex-col items-center pointer-events-none">
          {/* Signboard */}
          <div
            className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold border shadow-sm ${
              isUnlocked ? 'bg-[#78350f] text-amber-200 border-[#92400e]' : 'bg-[#27272a] text-slate-400 border-[#3f3f46]'
            }`}
          >
            {direction === 'right' && '→'}
            {direction === 'left' && '←'}
            {direction === 'up' && '↑'}
            {direction === 'down' && '↓'}
          </div>
          {/* Post */}
          <div className="w-1.5 h-6 bg-[#451a03] border-x border-[#270e01]" />
        </div>
      </div>
    </div>
  );
};
