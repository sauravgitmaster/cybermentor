import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Hand } from 'lucide-react';
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
    <div className="md:hidden absolute inset-x-0 bottom-4 pointer-events-none flex justify-between items-end px-4 z-30 select-none">
      {/* Large Comfortable Virtual D-Pad */}
      <div className="pointer-events-auto flex flex-col items-center p-2 rounded-2xl bg-[#09111e]/90 border-2 border-[#223552] backdrop-blur-md shadow-2xl">
        {/* UP */}
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
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#17243a] border border-[#334b70] text-slate-100 active:bg-amber-500 active:text-slate-950 active:scale-95 shadow-md transition-all"
          aria-label="Up"
        >
          <ArrowUp className="h-6 w-6" />
        </button>

        {/* LEFT / DOWN / RIGHT */}
        <div className="flex items-center gap-2 mt-2">
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
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#17243a] border border-[#334b70] text-slate-100 active:bg-amber-500 active:text-slate-950 active:scale-95 shadow-md transition-all"
            aria-label="Left"
          >
            <ArrowLeft className="h-6 w-6" />
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
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#17243a] border border-[#334b70] text-slate-100 active:bg-amber-500 active:text-slate-950 active:scale-95 shadow-md transition-all"
            aria-label="Down"
          >
            <ArrowDown className="h-6 w-6" />
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
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#17243a] border border-[#334b70] text-slate-100 active:bg-amber-500 active:text-slate-950 active:scale-95 shadow-md transition-all"
            aria-label="Right"
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Large Comfortable Action / Interact Button */}
      {canInteract && (
        <div className="pointer-events-auto animate-in zoom-in-90 duration-150">
          <button
            onTouchStart={(e) => {
              e.preventDefault();
              onInteract();
            }}
            onClick={onInteract}
            className="flex h-16 px-6 items-center justify-center gap-2.5 rounded-2xl border-2 border-amber-300 bg-gradient-to-b from-amber-400 to-amber-500 text-slate-950 font-mono font-black text-sm shadow-2xl active:scale-90 transition-transform uppercase ring-4 ring-amber-400/20"
          >
            <span>[E] ACT</span>
            <Hand className="h-5 w-5 fill-current" />
          </button>
        </div>
      )}
    </div>
  );
};

