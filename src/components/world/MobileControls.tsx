import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Hand } from 'lucide-react';
import { Direction } from '../../types/world';
import { useAdaptiveScreen } from '../../hooks/useAdaptiveScreen';

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
  const screen = useAdaptiveScreen();

  // Only show virtual on-screen controls if device has touch capabilities, or is mobile/tablet
  if (!screen.isTouchDevice && !screen.isMobile && !screen.isTablet) {
    return null;
  }

  const isCompact = screen.isShortScreen || (screen.isLandscape && screen.viewportHeight < 600);
  const btnSize = isCompact ? 'h-10 w-10 sm:h-11 sm:w-11' : 'h-12 w-12 sm:h-13 sm:w-13';
  const iconSize = isCompact ? 'h-5 w-5' : 'h-6 w-6';

  return (
    <div className="absolute inset-x-0 bottom-3 sm:bottom-4 pointer-events-none flex justify-between items-end px-3 sm:px-5 z-30 select-none pb-safe">
      {/* Large Comfortable Virtual D-Pad */}
      <div className={`pointer-events-auto flex flex-col items-center ${isCompact ? 'p-1.5' : 'p-2 sm:p-2.5'} rounded-2xl bg-[#09111e]/90 border-2 border-[#223552] backdrop-blur-md shadow-2xl touch-target`}>
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
          className={`flex ${btnSize} items-center justify-center rounded-xl bg-[#17243a] border border-[#334b70] text-slate-100 active:bg-amber-500 active:text-slate-950 active:scale-95 shadow-md transition-all touch-target`}
          aria-label="Move Up"
        >
          <ArrowUp className={iconSize} />
        </button>

        {/* LEFT / DOWN / RIGHT */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
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
            className={`flex ${btnSize} items-center justify-center rounded-xl bg-[#17243a] border border-[#334b70] text-slate-100 active:bg-amber-500 active:text-slate-950 active:scale-95 shadow-md transition-all touch-target`}
            aria-label="Move Left"
          >
            <ArrowLeft className={iconSize} />
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
            className={`flex ${btnSize} items-center justify-center rounded-xl bg-[#17243a] border border-[#334b70] text-slate-100 active:bg-amber-500 active:text-slate-950 active:scale-95 shadow-md transition-all touch-target`}
            aria-label="Move Down"
          >
            <ArrowDown className={iconSize} />
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
            className={`flex ${btnSize} items-center justify-center rounded-xl bg-[#17243a] border border-[#334b70] text-slate-100 active:bg-amber-500 active:text-slate-950 active:scale-95 shadow-md transition-all touch-target`}
            aria-label="Move Right"
          >
            <ArrowRight className={iconSize} />
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
            className={`flex ${
              isCompact ? 'h-13 px-4 text-xs' : 'h-15 sm:h-16 px-5 sm:px-6 text-xs sm:text-sm'
            } items-center justify-center gap-2 rounded-2xl border-2 border-amber-300 bg-gradient-to-b from-amber-400 to-amber-500 text-slate-950 font-mono font-black shadow-2xl active:scale-90 transition-transform uppercase ring-4 ring-amber-400/20 touch-target`}
          >
            <span>{promptLabel ? promptLabel.replace(/^\[E\]\s*/, '') : 'ACT'}</span>
            <Hand className="h-5 w-5 fill-current" />
          </button>
        </div>
      )}
    </div>
  );
};

