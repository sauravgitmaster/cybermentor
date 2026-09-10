import React from 'react';
import { Terminal, CornerDownLeft, Hand } from 'lucide-react';
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

  return (
    <div
      id="interaction-prompt-container"
      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-auto transition-all duration-150 animate-in fade-in slide-in-from-bottom-2"
    >
      <button
        id="trigger-interaction-btn"
        onClick={onTrigger}
        className="flex items-center gap-2.5 px-3.5 py-1.5 border border-cyan-500/80 bg-[#0d1117]/95 text-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.7)] hover:bg-cyan-950/40 hover:border-cyan-400 transition-colors focus:outline-none cursor-pointer group"
      >
        {/* Monospaced Keycap */}
        <span className="flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono font-bold bg-[#161b22] border border-[#30363d] text-cyan-400 group-hover:border-cyan-400">
          E
        </span>

        {/* Action Label */}
        <div className="flex flex-col items-start text-left">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-300">
            {interactable.actionPrompt}
          </span>
          <span className="text-[9px] font-mono text-slate-400">
            {interactable.subtext}
          </span>
        </div>

        <CornerDownLeft className="h-3.5 w-3.5 text-slate-400 group-hover:text-cyan-400 ml-1" />
      </button>
    </div>
  );
};
