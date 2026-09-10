import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, CornerDownLeft } from 'lucide-react';
import { Direction } from '../../types/world';

interface MobileControlsProps {
  onDirectionPress: (dir: Direction, active: boolean) => void;
  onInteract: () => void;
  canInteract: boolean;
  promptLabel?: string;
}

export const MobileControls: React.FC<MobileControlsProps> = ({
  onDirectionPress,
  onInteract,
  canInteract,
  promptLabel,
}) => {
  return (
    <div className="md:hidden absolute inset-x-0 bottom-3 pointer-events-none flex justify-between items-end px-3 z-30">
      {/* Directional Pad */}
      <div className="pointer-events-auto grid grid-cols-3 gap-1 bg-[#0d1117]/80 p-1.5 border border-[#30363d] backdrop-blur-sm">
        <div />
        <button
          onTouchStart={(e) => {
            e.preventDefault();
            onDirectionPress('up', true);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            onDirectionPress('up', false);
          }}
          onMouseDown={() => onDirectionPress('up', true)}
          onMouseUp={() => onDirectionPress('up', false)}
          className="flex h-10 w-10 items-center justify-center border border-[#30363d] bg-[#161b22] text-slate-300 active:bg-cyan-950 active:border-cyan-400"
          aria-label="Up"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
        <div />

        <button
          onTouchStart={(e) => {
            e.preventDefault();
            onDirectionPress('left', true);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            onDirectionPress('left', false);
          }}
          onMouseDown={() => onDirectionPress('left', true)}
          onMouseUp={() => onDirectionPress('left', false)}
          className="flex h-10 w-10 items-center justify-center border border-[#30363d] bg-[#161b22] text-slate-300 active:bg-cyan-950 active:border-cyan-400"
          aria-label="Left"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <button
          onTouchStart={(e) => {
            e.preventDefault();
            onDirectionPress('down', true);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            onDirectionPress('down', false);
          }}
          onMouseDown={() => onDirectionPress('down', true)}
          onMouseUp={() => onDirectionPress('down', false)}
          className="flex h-10 w-10 items-center justify-center border border-[#30363d] bg-[#161b22] text-slate-300 active:bg-cyan-950 active:border-cyan-400"
          aria-label="Down"
        >
          <ArrowDown className="h-4 w-4" />
        </button>

        <button
          onTouchStart={(e) => {
            e.preventDefault();
            onDirectionPress('right', true);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            onDirectionPress('right', false);
          }}
          onMouseDown={() => onDirectionPress('right', true)}
          onMouseUp={() => onDirectionPress('right', false)}
          className="flex h-10 w-10 items-center justify-center border border-[#30363d] bg-[#161b22] text-slate-300 active:bg-cyan-950 active:border-cyan-400"
          aria-label="Right"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Action / Interact Button */}
      {canInteract && (
        <div className="pointer-events-auto">
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              onInteract();
            }}
            onClick={onInteract}
            className="flex h-12 px-4 items-center justify-center gap-2 border border-cyan-400 bg-cyan-950/90 text-cyan-300 font-mono text-xs font-bold shadow-lg active:bg-cyan-500 active:text-slate-950 uppercase"
          >
            <span>[E] ACT</span>
            <CornerDownLeft className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};
