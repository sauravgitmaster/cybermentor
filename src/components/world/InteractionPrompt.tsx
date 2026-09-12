import React from 'react';
import { Sparkles, MessageSquare, CornerDownLeft } from 'lucide-react';
import { WorldInteractable } from '../../types/world';

interface InteractionPromptProps {
  interactable: WorldInteractable | null;
  onTrigger: () => void;
}

export const InteractionPrompt: React.FC<InteractionPromptProps> = ({
  interactable,
  onTrigger,
}) => {
  if (!interactable) return null;

  // Derive a clean, friendly action label
  const rawPrompt = interactable.actionPrompt || 'INTERACT';
  // If it's an NPC or terminal, ensure it's punchy and clear
  const displayPrompt = rawPrompt.toUpperCase();

  return (
    <div
      id="interaction-prompt-container"
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto transition-all duration-200 animate-in fade-in zoom-in-95"
    >
      <button
        id="trigger-interaction-btn"
        onClick={onTrigger}
        className="flex items-center gap-3 px-5 py-2.5 rounded-full border-2 border-amber-400 bg-[#0d1624]/95 text-white shadow-[0_8px_30px_rgba(0,0,0,0.8)] hover:bg-[#162338] hover:border-amber-300 hover:scale-105 active:scale-95 transition-all focus:outline-none cursor-pointer group ring-4 ring-amber-400/20"
      >
        {/* Large Game-Style Keycap */}
        <span className="flex items-center justify-center w-8 h-8 rounded-lg text-sm font-mono font-black bg-amber-400 text-slate-950 shadow-md group-hover:bg-amber-300 transition-colors">
          E
        </span>

        {/* Clear Action Text */}
        <div className="flex flex-col items-start text-left pr-1">
          <span className="text-xs sm:text-sm font-mono font-black tracking-wide text-amber-300 uppercase">
            {displayPrompt}
          </span>
          {interactable.subtext && (
            <span className="text-[10px] text-slate-300 font-medium line-clamp-1">
              {interactable.subtext}
            </span>
          )}
        </div>

        <CornerDownLeft className="h-4 w-4 text-amber-400/80 group-hover:text-amber-300 transition-colors ml-0.5" />
      </button>
    </div>
  );
};

