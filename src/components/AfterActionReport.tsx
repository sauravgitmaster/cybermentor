import React, { useState } from 'react';
import {
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  Shield,
  Download,
  Share2,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import { AfterActionReport as AARType, MissionData, DecisionOption } from '../types';
import { playClickSound, playSuccessSound } from '../utils/audio';

interface AfterActionReportProps {
  report: AARType;
  mission: MissionData;
  chosenDecision: DecisionOption;
  onProceedNext: () => void;
  onReturnToMap: () => void;
  nextMissionId?: string | null;
}

export const AfterActionReport: React.FC<AfterActionReportProps> = ({
  report,
  mission,
  chosenDecision,
  onProceedNext,
  onReturnToMap,
  nextMissionId,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClipboard = () => {
    playClickSound();
    const formatted = `=== CYBERMENTOR SECOPS AFTER-ACTION REPORT ===
MISSION: ${mission.title} (${mission.code})
SECTOR: ${mission.locationId.toUpperCase()}
DECISION TAKEN: [${chosenDecision.id}] ${chosenDecision.label}
OUTCOME: ${chosenDecision.isOptimal ? 'OPTIMAL DEFENSE - THREAT CONTAINED' : 'PERIMETER COMPROMISE'}
TRUST DELTA: ${chosenDecision.trustChange > 0 ? '+' + chosenDecision.trustChange : chosenDecision.trustChange}

--- TECHNICAL INDICATORS (IOCs) DISCOVERED ---
${report.iocsFound.length > 0 ? report.iocsFound.map((i) => `* ${i}`).join('\n') : 'None documented'}

--- EXECUTIVE TAKEAWAY ---
${report.takeaway}

--- CYBERMENTOR MENTOR SUMMARY ---
${report.mentorSummary}
==============================================`;

    navigator.clipboard.writeText(formatted);
    setCopied(true);
    playSuccessSound();
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div id="after-action-report-view" className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="rounded-2xl border border-[#222e44] bg-[#0c101a] p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1b2438] pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-xl border ${
                chosenDecision.isOptimal
                  ? 'bg-emerald-950/70 border-emerald-700/60 text-emerald-400'
                  : 'bg-rose-950/70 border-rose-700/60 text-rose-400'
              }`}
            >
              <FileCheck2 className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-cyan-400">
                <span>{mission.code}</span>
                <span>•</span>
                <span>INCIDENT POST-MORTEM &amp; AAR</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100">{mission.title}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="aar-copy-clipboard-btn"
              onClick={handleCopyClipboard}
              className="px-3.5 py-2 rounded-lg border border-[#25334c] bg-[#111827] hover:bg-[#1a2438] text-xs font-mono text-slate-200 transition-colors flex items-center gap-2"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'DOSSIER COPIED' : 'EXPORT CASE DOSSIER'}</span>
            </button>
          </div>
        </div>

        {/* Verdict Badge & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            className={`rounded-xl border p-4 font-mono text-xs space-y-1 ${
              chosenDecision.isOptimal
                ? 'border-emerald-900/60 bg-emerald-950/30'
                : 'border-rose-900/60 bg-rose-950/30'
            }`}
          >
            <span className="text-[10px] text-slate-400 uppercase block">INCIDENT OUTCOME:</span>
            <div
              className={`text-sm font-bold flex items-center gap-1.5 ${
                chosenDecision.isOptimal ? 'text-emerald-300' : 'text-rose-300'
              }`}
            >
              {chosenDecision.isOptimal ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>CONTAINED DEFENSIVELY</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4" />
                  <span>COMPROMISE DETECTED</span>
                </>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-[#1d273a] bg-[#0d121c] p-4 font-mono text-xs space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">TRUST SCORE IMPACT:</span>
            <div
              className={`text-sm font-bold ${
                chosenDecision.trustChange >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {chosenDecision.trustChange > 0
                ? `+${chosenDecision.trustChange} Trust Delta`
                : `${chosenDecision.trustChange} Trust Delta`}
            </div>
          </div>

          <div className="rounded-xl border border-[#1d273a] bg-[#0d121c] p-4 font-mono text-xs space-y-1">
            <span className="text-[10px] text-slate-400 uppercase block">ATTACK VECTOR / FOCUS:</span>
            <div className="text-sm font-bold text-cyan-300">{mission.threatCategory}</div>
          </div>
        </div>

        {/* Incident Analysis Breakdown */}
        <div className="space-y-4 pt-2">
          {/* Action Taken */}
          <div className="rounded-xl border border-[#1b2538] bg-[#090d16] p-4 space-y-2">
            <div className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>DECISION RECORDED &amp; OPERATIONAL ANALYSIS</span>
            </div>
            <p className="text-xs text-slate-200 font-medium leading-relaxed">
              &quot;{chosenDecision.label}&quot;
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">{chosenDecision.consequenceText}</p>
          </div>

          {/* IOCs Extracted */}
          <div className="rounded-xl border border-[#1b2538] bg-[#090d16] p-4 space-y-3">
            <div className="text-xs font-mono text-cyan-400 font-bold flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <span>TECHNICAL INDICATORS OF COMPROMISE (IOCs)</span>
              </span>
              <span className="text-[10px] text-slate-400">
                {report.iocsFound.length} Discovered
              </span>
            </div>

            {report.iocsFound.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {report.iocsFound.map((ioc, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg border border-[#162132] bg-black/40 text-xs font-mono text-emerald-300/90 flex items-start gap-2"
                  >
                    <span className="text-slate-500 shrink-0">#{idx + 1}</span>
                    <span className="break-all">{ioc}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic font-mono">
                No technical indicators were forensically cataloged during this run.
              </p>
            )}
          </div>

          {/* Core Takeaway & Real World Transfer */}
          <div className="rounded-xl border border-indigo-950/80 bg-[#0c101c] p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-300">
              <Sparkles className="h-4 w-4" />
              <span>CRITICAL DEFENSIVE TAKEAWAY</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {report.takeaway}
            </p>
            <div className="p-3 rounded-lg border border-[#18233a] bg-black/50 text-xs font-mono text-cyan-200/90 italic leading-relaxed">
              &quot;{report.mentorSummary}&quot;
            </div>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="border-t border-[#1b2438] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            id="aar-return-map-btn"
            onClick={() => {
              playClickSound();
              onReturnToMap();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#232f46] bg-[#0c101a] hover:bg-[#141b2a] text-xs font-mono text-slate-300 transition-colors"
          >
            RETURN TO SECTOR MAP
          </button>

          {nextMissionId && (
            <button
              id="aar-proceed-next-mission-btn"
              onClick={() => {
                playClickSound();
                onProceedNext();
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>PROCEED TO NEXT OPERATION</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
