import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Layers,
  FileCode,
  ExternalLink,
  Mail,
  HardDrive,
  Wifi,
} from 'lucide-react';
import { MissionData, InspectableTarget, EvidenceItem, PlayerState } from '../types';
import {
  playInspectSound,
  playEvidenceDiscoveredSound,
  playClickSound,
} from '../utils/audio';

interface InvestigationPanelProps {
  mission: MissionData;
  player: PlayerState;
  inspectedTargetIds: string[];
  onTargetInspected: (target: InspectableTarget) => void;
  onProceedToDecision: () => void;
}

export const InvestigationPanel: React.FC<InvestigationPanelProps> = ({
  mission,
  player,
  inspectedTargetIds,
  onTargetInspected,
  onProceedToDecision,
}) => {
  const [selectedTarget, setSelectedTarget] = useState<InspectableTarget | null>(
    null
  );

  const meta = mission.investigationWorkspace.interfaceMetadata;

  const handleInspect = (target: InspectableTarget) => {
    playInspectSound();
    setSelectedTarget(target);
    if (!inspectedTargetIds.includes(target.id)) {
      playEvidenceDiscoveredSound();
      onTargetInspected(target);
    }
  };

  const isAbilityAvailable = (requiredAbility: string) => {
    return player.abilities.some(
      (a) => a.id === requiredAbility && a.unlocked
    );
  };

  return (
    <div className="space-y-6">
      {/* Investigation Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-[#1b2332] bg-[#0c1017] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <div>
            <div className="text-xs font-mono font-bold text-slate-200">
              {mission.investigationWorkspace.title}
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              EVIDENCE FOUND: {inspectedTargetIds.length} /{' '}
              {mission.investigationWorkspace.targets.length} IOCs DOCUMENTED
            </div>
          </div>
        </div>

        <button
          id="proceed-to-decision-top-btn"
          onClick={() => {
            playClickSound();
            onProceedToDecision();
          }}
          className="flex items-center justify-center gap-2 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 text-xs font-semibold shadow transition-all"
        >
          <span>FORMULATE DECISION</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Main Workspace Display - Type-specific simulation */}
      {mission.investigationWorkspace.type === 'email-client' && (
        <div className="rounded-xl border border-[#21293a] bg-[#0e121a] shadow-xl overflow-hidden">
          {/* Simulated Email Client Title Bar */}
          <div className="flex items-center justify-between border-b border-[#1b2230] bg-[#121622] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <span className="ml-2 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-cyan-400" />
                <span>Inbox // Message Inspection #7890</span>
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">{meta.timestamp}</span>
          </div>

          {/* Email Headers Section */}
          <div className="border-b border-[#1b2230] bg-[#10141e] p-4 text-xs space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-start sm:items-center gap-2">
                <span className="text-slate-400 font-mono w-14 shrink-0">FROM:</span>
                <span className="text-slate-200 font-semibold">{meta.senderDisplay}</span>
                <span className="rounded bg-[#161d2a] px-2 py-0.5 font-mono text-slate-300 border border-[#232c3e]">
                  &lt;{meta.senderRaw}&gt;
                </span>
              </div>
              <div className="flex gap-2 shrink-0">
                {mission.investigationWorkspace.targets
                  .filter((t) => t.id === 'target-sender' || t.id === 'target-headers')
                  .map((t) => {
                    const inspected = inspectedTargetIds.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        id={`inspect-btn-${t.id}`}
                        onClick={() => handleInspect(t)}
                        className={`text-[10px] font-mono px-2.5 py-1 rounded border flex items-center gap-1.5 transition-colors ${
                          inspected
                            ? 'border-emerald-800/60 bg-emerald-950/40 text-emerald-300'
                            : 'border-cyan-800/60 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/60'
                        }`}
                      >
                        <Search className="h-2.5 w-2.5" />
                        <span>
                          [{t.requiredAbility}] {t.label.split(' ')[0]}
                        </span>
                        {inspected && <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" />}
                      </button>
                    );
                  })}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-mono w-14 shrink-0">SUBJECT:</span>
              <span className="text-amber-300 font-semibold tracking-wide">
                {meta.subject}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <span className="w-14 shrink-0">ROUTE:</span>
              <span>Inbound MX -&gt; Relay gateway via mail-relay-un1v.external.net</span>
            </div>
          </div>

          {/* Email Body & Interactive Target Triggers */}
          <div className="p-6 space-y-5 text-sm text-slate-200">
            <div className="whitespace-pre-line leading-relaxed font-sans text-slate-300 bg-[#0a0d13] p-5 rounded-lg border border-[#1b2230]">
              {meta.bodyText}
            </div>

            {/* Simulated Attachment Box */}
            {meta.attachmentName && (
              <div className="rounded-lg border border-[#21293b] bg-[#121722] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-[#18202d] text-cyan-400 border border-cyan-900/40">
                    <FileCode className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-slate-100 flex items-center gap-1.5">
                      <span>{meta.attachmentName}</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        ({meta.attachmentSize})
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">{meta.attachmentType}</div>
                  </div>
                </div>

                {mission.investigationWorkspace.targets
                  .filter((t) => t.id === 'target-attachment')
                  .map((t) => {
                    const inspected = inspectedTargetIds.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        id={`inspect-btn-${t.id}`}
                        onClick={() => handleInspect(t)}
                        className={`text-xs font-mono px-3 py-1.5 rounded border flex items-center gap-1.5 transition-colors ${
                          inspected
                            ? 'border-emerald-800 bg-emerald-950/60 text-emerald-300'
                            : 'border-cyan-800 bg-cyan-950/60 text-cyan-300 hover:bg-cyan-900'
                        }`}
                      >
                        <Search className="h-3 w-3" />
                        <span>[{t.requiredAbility}] INSPECT ATTACHMENT</span>
                        {inspected && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                      </button>
                    );
                  })}
              </div>
            )}

            {/* Embedded Link Verification Trigger */}
            {meta.linkDisplay && (
              <div className="rounded-lg border border-[#21293b] bg-[#121722] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-[#18202d] text-cyan-400 border border-cyan-900/40">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">
                      EMBEDDED PORTAL HYPERLINK:
                    </div>
                    <div className="text-xs font-mono text-cyan-300 underline underline-offset-2">
                      {meta.linkDisplay}
                    </div>
                  </div>
                </div>

                {mission.investigationWorkspace.targets
                  .filter((t) => t.id === 'target-link')
                  .map((t) => {
                    const inspected = inspectedTargetIds.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        id={`inspect-btn-${t.id}`}
                        onClick={() => handleInspect(t)}
                        className={`text-xs font-mono px-3 py-1.5 rounded border flex items-center gap-1.5 transition-colors ${
                          inspected
                            ? 'border-emerald-800 bg-emerald-950/60 text-emerald-300'
                            : 'border-cyan-800 bg-cyan-950/60 text-cyan-300 hover:bg-cyan-900'
                        }`}
                      >
                        <Search className="h-3 w-3" />
                        <span>[{t.requiredAbility}] INSPECT DESTINATION URL</span>
                        {inspected && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                      </button>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hardware / Device Workspace for other missions */}
      {mission.investigationWorkspace.type !== 'email-client' && (
        <div className="rounded-xl border border-[#21293a] bg-[#0e121a] p-5 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 border-b border-[#1c2331] pb-3 mb-4">
            {mission.investigationWorkspace.type === 'hardware-analyzer' ? (
              <HardDrive className="h-4 w-4" />
            ) : (
              <Wifi className="h-4 w-4" />
            )}
            <span>SIMULATED HARNESS // {meta.clientName}</span>
          </div>

          <div className="rounded bg-[#0a0d13] p-4 font-mono text-xs text-slate-300 whitespace-pre-line leading-relaxed mb-4 border border-[#1b2230]">
            {meta.bodyText}
          </div>

          <div className="flex flex-wrap gap-2">
            {mission.investigationWorkspace.targets.map((t) => {
              const inspected = inspectedTargetIds.includes(t.id);
              return (
                <button
                  key={t.id}
                  id={`inspect-btn-${t.id}`}
                  onClick={() => handleInspect(t)}
                  className={`text-xs font-mono px-3 py-2 rounded border flex items-center gap-2 transition-colors ${
                    inspected
                      ? 'border-emerald-800 bg-emerald-950/60 text-emerald-300'
                      : 'border-cyan-800 bg-cyan-950/60 text-cyan-300 hover:bg-cyan-900'
                  }`}
                >
                  <Search className="h-3 w-3" />
                  <span>
                    [{t.requiredAbility}] {t.label}
                  </span>
                  {inspected && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Target Investigation Quick Grid (All Inspectable Areas) */}
      <div className="rounded-xl border border-[#1c2434] bg-[#0c1017] p-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Layers className="h-3.5 w-3.5 text-cyan-400" />
            <span>Cyber Ability Investigation Triggers ({mission.investigationWorkspace.targets.length})</span>
          </h4>
          <span className="text-[11px] font-mono text-slate-400">
            Click any trigger to apply cyber ability
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {mission.investigationWorkspace.targets.map((target) => {
            const inspected = inspectedTargetIds.includes(target.id);
            const abilityReady = isAbilityAvailable(target.requiredAbility);

            return (
              <button
                key={target.id}
                id={`target-tile-${target.id}`}
                onClick={() => handleInspect(target)}
                className={`text-left rounded-lg border p-3 transition-all ${
                  inspected
                    ? 'border-emerald-900/60 bg-[#0d161a]'
                    : 'border-[#1e2738] bg-[#111622] hover:border-cyan-500 hover:bg-[#151c2a]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="rounded bg-[#16202e] px-1.5 py-0.5 text-[10px] font-mono font-semibold text-cyan-300 border border-cyan-900/40">
                    [{target.requiredAbility}]
                  </span>
                  {inspected ? (
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> DOCUMENTED
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400">UNEXAMINED</span>
                  )}
                </div>

                <div className="text-xs font-semibold text-slate-200 mb-1">
                  {target.label}
                </div>
                <div className="text-[11px] font-mono text-slate-400 truncate">
                  {target.previewValue}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Forensic Evidence Detail Modal / Drawer */}
      {selectedTarget && (
        <div
          id="target-evidence-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        >
          <div className="w-full max-w-xl rounded-xl border border-cyan-800/80 bg-[#0d121c] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1b2332] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="rounded bg-cyan-950 px-2 py-0.5 text-[10px] font-mono font-bold text-cyan-300 border border-cyan-800/50">
                  [{selectedTarget.requiredAbility}] ANALYSIS
                </span>
                <h3 className="text-base font-bold text-slate-100">
                  {selectedTarget.revealedDetail.heading}
                </h3>
              </div>
              <button
                id="close-target-modal-btn"
                onClick={() => setSelectedTarget(null)}
                className="text-slate-400 hover:text-slate-100 text-xs font-mono px-2 py-1 rounded bg-[#161d2a]"
              >
                [ESC / CLOSE]
              </button>
            </div>

            {/* Threat Indicator Banner */}
            {selectedTarget.revealedDetail.threatIndicator && (
              <div className="rounded border border-rose-900/50 bg-rose-950/30 p-3 mb-4 flex items-start gap-2.5 text-xs text-rose-200">
                <ShieldAlert className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{selectedTarget.revealedDetail.threatIndicator}</span>
              </div>
            )}

            {/* Analysis Summary */}
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {selectedTarget.revealedDetail.summary}
            </p>

            {/* Technical IOC Data Grid */}
            <div className="rounded border border-[#1e2638] bg-[#090c12] p-3 mb-4">
              <div className="text-[10px] font-mono text-slate-400 uppercase mb-2">
                Technical Forensics &amp; IOCs
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                {Object.entries(selectedTarget.revealedDetail.technicalData).map(
                  ([key, val]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#151a24] pb-1">
                      <span className="text-slate-400">{key}:</span>
                      <span className="text-cyan-300 text-left sm:text-right">{val}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Evidence Yield Confirmation */}
            {selectedTarget.revealedDetail.evidenceYielded && (
              <div className="rounded border border-emerald-900/50 bg-emerald-950/20 p-3 mb-5 flex items-start gap-2 text-xs text-emerald-200">
                <Sparkles className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-emerald-300">
                    Logged in Evidence Notebook:
                  </div>
                  <div className="text-[11px] text-emerald-200/80">
                    {selectedTarget.revealedDetail.evidenceYielded.title} (
                    {selectedTarget.revealedDetail.evidenceYielded.category})
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#18202e]">
              <button
                id="dismiss-evidence-modal-btn"
                onClick={() => setSelectedTarget(null)}
                className="rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 px-4 py-2 text-xs font-semibold"
              >
                RETURN TO WORKSPACE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
