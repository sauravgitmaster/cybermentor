import React, { useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Shield,
  Clock,
  Crosshair,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { MissionData } from '../types';
import { playClickSound } from '../utils/audio';

interface DoctrineBriefViewProps {
  doctrine: MissionData['doctrineBrief'];
  threatCategory: string;
  defaultExpanded?: boolean;
}

export const DoctrineBriefView: React.FC<DoctrineBriefViewProps> = ({
  doctrine,
  threatCategory,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (!doctrine) return null;

  return (
    <div
      id="doctrine-brief-card"
      className="rounded-xl border border-cyan-900/60 bg-[#0c121e] overflow-hidden shadow-lg transition-all"
    >
      {/* Header */}
      <button
        onClick={() => {
          playClickSound();
          setIsExpanded(!isExpanded);
        }}
        className="w-full flex items-center justify-between p-4 bg-[#0f1626] hover:bg-[#131b2e] transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-700/60 text-cyan-400">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 font-bold">
              <span>{doctrine.title}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="h-3 w-3" />
                <span>{doctrine.durationHint}</span>
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-100">
              Technical Doctrine &amp; Defensive Posture
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>{isExpanded ? 'COLLAPSE' : 'EXPAND DOCTRINE'}</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-5 space-y-4 border-t border-cyan-950/80 animate-in fade-in duration-200">
          {/* Key Facts (Rule of 3) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {doctrine.facts.map((fact, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg border border-[#1b263a] bg-[#090d16] space-y-1 text-xs"
              >
                <div className="text-[10px] font-mono text-cyan-400 font-bold flex items-center gap-1">
                  <span>RULE #{idx + 1}</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">{fact}</p>
              </div>
            ))}
          </div>

          {/* Attacker Model & What Good Looks Like */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-4 rounded-lg border border-rose-950/70 bg-[#120a10] space-y-2 text-xs">
              <div className="text-[11px] font-mono text-rose-400 font-bold flex items-center gap-1.5">
                <Crosshair className="h-3.5 w-3.5" />
                <span>ATTACKER BEHAVIOR MODEL</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
                {doctrine.attackerModel}
              </p>
            </div>

            <div className="p-4 rounded-lg border border-emerald-950/70 bg-[#081310] space-y-2 text-xs">
              <div className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>WHAT GOOD LOOKS LIKE (ZERO TRUST)</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
                {doctrine.whatGoodLooksLike}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
