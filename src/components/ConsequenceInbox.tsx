import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldCheck,
  Zap,
  Terminal,
  X,
  Radio,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { CampaignFlags, PlayerState } from '../types';
import {
  CAMPAIGN_CONSEQUENCES,
  CampaignConsequence,
  getActiveConsequences,
} from '../data/consequences';
import {
  playClickSound,
  playSuccessSound,
  playWarningSound,
} from '../utils/audio';

interface ConsequenceInboxProps {
  player: PlayerState;
  onClose: () => void;
  onRemediate: (flagKey: keyof CampaignFlags, consequence: CampaignConsequence) => void;
}

export const ConsequenceInbox: React.FC<ConsequenceInboxProps> = ({
  player,
  onClose,
  onRemediate,
}) => {
  const activeConsequences = getActiveConsequences(player.campaignFlags);
  const [remediatingKey, setRemediatingKey] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleExecuteRemediation = (consequence: CampaignConsequence) => {
    playClickSound();
    setRemediatingKey(consequence.id);

    setTimeout(() => {
      onRemediate(consequence.flagKey, consequence);
      setRemediatingKey(null);
      playSuccessSound();
      setSuccessToast(consequence.remediationAction.successMessage);

      setTimeout(() => {
        setSuccessToast(null);
      }, 5000);
    }, 800);
  };

  return (
    <div
      id="consequence-inbox-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-2xl rounded-2xl border border-[#26334a] bg-[#0c1017] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#1b2332] bg-[#111724] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-950/60 border border-rose-800/60 text-rose-400">
              <Radio className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>CAMPAIGN INCIDENT DESK</span>
                {activeConsequences.length > 0 && (
                  <span className="rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-mono px-2 py-0.5">
                    {activeConsequences.length} ACTIVE THREATS
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Persistent lateral movement, compromised nodes &amp; remediation tasks
              </p>
            </div>
          </div>
          <button
            id="close-consequence-inbox-btn"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-[#192233] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Success Alert Toast */}
        {successToast && (
          <div className="bg-emerald-950/80 border-b border-emerald-800/80 px-6 py-3 flex items-center gap-2.5 text-xs text-emerald-200 animate-in slide-in-from-top duration-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span className="font-mono">{successToast}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {activeConsequences.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-xl border border-[#1a2333] bg-[#080c13]">
              <ShieldCheck className="h-12 w-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-200 uppercase font-mono">
                No Active Lateral Compromises
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto leading-relaxed">
                All campus subnets, transit kiosks, and student devices operate within secure tolerances. Avoid reckless operational choices to maintain integrity.
              </p>
            </div>
          ) : (
            activeConsequences.map((c) => {
              const hasRequiredAbility = c.remediationAction.requiredAbility
                ? player.unlockedAbilities.includes(c.remediationAction.requiredAbility)
                : true;

              return (
                <div
                  key={c.id}
                  className="rounded-xl border border-rose-900/60 bg-[#120e15] p-5 shadow-lg space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-950/80 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 text-[10px] font-mono font-bold">
                        {c.threatLevel}
                      </span>
                      <h3 className="text-sm font-bold text-slate-100">{c.title}</h3>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      ORIGIN: <span className="text-slate-200">{c.originLocation}</span> ({c.affectedNpc})
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{c.description}</p>

                  <div className="rounded-lg border border-[#211928] bg-[#0a070e] p-3 text-xs font-mono space-y-1">
                    <div className="flex items-center justify-between text-rose-300">
                      <span>ONGOING IMPACT:</span>
                      <span className="font-bold">{c.ongoingDamage}</span>
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      STATUS: Active lateral beaconing across sector
                    </div>
                  </div>

                  {/* Remediation Action Box */}
                  <div className="rounded-lg border border-[#232c3d] bg-[#090d14] p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                        <Terminal className="h-3.5 w-3.5" />
                        <span>REMEDIATION PROTOCOL</span>
                      </span>
                      {c.remediationAction.requiredAbility && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded border ${
                            hasRequiredAbility
                              ? 'border-emerald-800 bg-emerald-950/60 text-emerald-300'
                              : 'border-amber-800 bg-amber-950/60 text-amber-300'
                          }`}
                        >
                          REQUIRES ABILITY: {c.remediationAction.requiredAbility}{' '}
                          {hasRequiredAbility ? '✓ READY' : '🔒 LOCKED'}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300">
                      {c.remediationAction.description}
                    </p>

                    <div className="rounded bg-black/60 p-2 font-mono text-xs text-emerald-300 border border-[#16202e] flex items-center justify-between overflow-x-auto">
                      <span>$ {c.remediationAction.command}</span>
                      <span className="text-[10px] text-cyan-400 shrink-0 ml-2">
                        +{c.remediationAction.trustAward} TRUST
                      </span>
                    </div>

                    <button
                      id={`remediate-btn-${c.id}`}
                      disabled={remediatingKey === c.id || !hasRequiredAbility}
                      onClick={() => handleExecuteRemediation(c)}
                      className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 ${
                        !hasRequiredAbility
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : remediatingKey === c.id
                          ? 'bg-cyan-700 text-slate-200 animate-pulse'
                          : 'bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-md'
                      }`}
                    >
                      <Zap className="h-4 w-4" />
                      <span>
                        {remediatingKey === c.id
                          ? 'EXECUTING REMEDIATION...'
                          : !hasRequiredAbility
                          ? `ACQUIRE ${c.remediationAction.requiredAbility} TO REMEDIATE`
                          : c.remediationAction.label}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-[#1b2332] bg-[#0c1017] px-6 py-3.5 flex items-center justify-between">
          <div className="text-[11px] font-mono text-slate-400">
            CURRENT SECTOR TRUST:{' '}
            <strong
              className={
                player.trustScore >= 50
                  ? 'text-emerald-400'
                  : player.trustScore >= 25
                  ? 'text-cyan-400'
                  : 'text-amber-400'
              }
            >
              {player.trustScore} / 100
            </strong>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="rounded bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-1.5 text-xs font-mono transition-colors"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
};
