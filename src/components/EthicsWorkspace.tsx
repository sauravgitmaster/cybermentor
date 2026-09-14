import React, { useState } from 'react';
import {
  Scale,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  X,
  Lock,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';
import { EthicsOp, EthicsOption, EthicsPrinciple, EthicsAnalysisResponse } from '../types/ethics';
import { PlayerState } from '../types';
import { api } from '../services/api';
import {
  playClickSound,
  playSuccessSound,
  playWarningSound,
  playTrustChangeSound,
} from '../utils/audio';

interface EthicsWorkspaceProps {
  op: EthicsOp;
  player: PlayerState;
  onClose: () => void;
  onCommitEthicsDecision: (
    opId: string,
    chosenOption: EthicsOption,
    justification: string,
    ethicsDelta: number,
    trustDelta: number,
    analysis: EthicsAnalysisResponse | null
  ) => void;
}

const PRINCIPLE_LABELS: Record<EthicsPrinciple, string> = {
  consent: 'Subject Consent',
  harm: 'Harm Minimization',
  proportionality: 'Proportionality',
  'duty-to-report': 'Duty to Disclose',
  privacy: 'Stakeholder Privacy',
  integrity: 'Scientific Integrity',
  stewardship: 'Civil Stewardship',
};

export const EthicsWorkspace: React.FC<EthicsWorkspaceProps> = ({
  op,
  player,
  onClose,
  onCommitEthicsDecision,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [justification, setJustification] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<EthicsAnalysisResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'situation' | 'artifact' | 'stakeholders'>('situation');

  const chosenOption = op.options.find((o) => o.id === selectedOptionId) || null;

  const handleCommit = async () => {
    if (!chosenOption) return;
    setIsSubmitting(true);
    playClickSound();

    // Calculate ethics score delta based on chosen option scores
    const sumScores = (Object.values(chosenOption.scores) as number[]).reduce((a, b) => a + b, 0);
    const ethicsDelta = sumScores * 2; // e.g. +14 or -14
    const trustDelta = chosenOption.id === op.recommendedOptionId ? 10 : -8;

    try {
      const result = await api.analyzeEthics({
        ethicsOpId: op.id,
        opTitle: op.title,
        chosenOptionId: chosenOption.id,
        chosenOptionLabel: chosenOption.label,
        justification,
        operative: {
          name: player.name || 'Operative',
          trustScore: player.trustScore,
          ethicsScore: player.ethicsScore || 50,
        },
        scores: chosenOption.scores,
      });

      setAnalysisResult(result);
      if (chosenOption.id === op.recommendedOptionId) {
        playSuccessSound();
      } else {
        playWarningSound();
      }

      onCommitEthicsDecision(
        op.id,
        chosenOption,
        justification,
        ethicsDelta,
        trustDelta,
        result
      );
    } catch {
      // Fallback local completion
      onCommitEthicsDecision(
        op.id,
        chosenOption,
        justification,
        ethicsDelta,
        trustDelta,
        null
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="ethics-workspace-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-4xl rounded-2xl border border-indigo-900/60 bg-[#0b0e17] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1b2336] bg-[#101422] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-950/80 border border-indigo-700/60 text-indigo-400">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-indigo-400 font-bold">
                <span>{op.code}</span>
                <span>•</span>
                <span>CYBER ETHICS &amp; GOVERNANCE ENGINE</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100">{op.title}</h2>
            </div>
          </div>
          <button
            id="close-ethics-modal-btn"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-[#182030] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Situation & Doctrine Banner */}
          <div className="rounded-xl border border-indigo-950 bg-[#080b13] p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono border-b border-[#171f30] pb-2 text-indigo-300 font-bold">
              <span>{op.doctrineBrief.title}</span>
              <span className="text-slate-400">READING: {op.doctrineBrief.durationHint}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{op.situation}</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-[#1a2233] pb-2 text-xs font-mono">
            <button
              onClick={() => setActiveTab('situation')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'situation'
                  ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Doctrine &amp; Principles
            </button>
            <button
              onClick={() => setActiveTab('artifact')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'artifact'
                  ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Evidence Artifact ({op.artifact.title.slice(0, 24)}...)
            </button>
            <button
              onClick={() => setActiveTab('stakeholders')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'stakeholders'
                  ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              3. Stakeholder Impact Matrix
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'situation' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {op.doctrineBrief.facts.map((fact, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-[#1b2336] bg-[#0c101c] p-3 text-xs text-slate-300 space-y-1.5"
                  >
                    <div className="text-[10px] font-mono text-indigo-400 font-bold">
                      PRINCIPLE #{idx + 1}
                    </div>
                    <p className="leading-relaxed">{fact}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-[#1b2438] bg-[#090d18] p-4 text-xs space-y-2">
                <div className="font-mono text-indigo-300 font-bold">WHAT GOOD LOOKS LIKE:</div>
                <p className="text-slate-300 leading-relaxed">{op.doctrineBrief.whatGoodLooksLike}</p>
              </div>
            </div>
          )}

          {activeTab === 'artifact' && (
            <div className="rounded-xl border border-[#212b40] bg-[#080b13] p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 border-b border-[#161e2e] pb-2 text-[11px]">
                <span className="text-cyan-400 font-bold">{op.artifact.title}</span>
                <span className="uppercase">TYPE: {op.artifact.type}</span>
              </div>
              <pre className="whitespace-pre-wrap text-slate-300 bg-black/50 p-4 rounded border border-[#161f30] overflow-x-auto leading-relaxed">
                {op.artifact.content}
              </pre>
            </div>
          )}

          {activeTab === 'stakeholders' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {op.stakeholderMap.map((s, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[#1b2438] bg-[#0c101a] p-4 space-y-2 text-xs"
                >
                  <div className="font-bold text-slate-200 flex items-center justify-between font-mono">
                    <span>{s.name}</span>
                    <Users className="h-3.5 w-3.5 text-indigo-400" />
                  </div>
                  <div className="text-slate-400">
                    <span className="text-[10px] font-mono uppercase block text-indigo-300">
                      Primary Interest:
                    </span>
                    {s.interest}
                  </div>
                  <div className="text-slate-400">
                    <span className="text-[10px] font-mono uppercase block text-rose-400">
                      Exposure Risk:
                    </span>
                    {s.risk}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Decision Options Section */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-200 uppercase font-mono">
                Select Ethical Course of Action
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Ethics Score: <strong className="text-indigo-300">{player.ethicsScore || 50} / 100</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {op.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    id={`ethics-option-btn-${opt.id}`}
                    onClick={() => {
                      playClickSound();
                      setSelectedOptionId(opt.id);
                    }}
                    className={`rounded-xl border p-4 text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-950/50 shadow-lg'
                        : 'border-[#1b2438] bg-[#0c1018] hover:border-indigo-800/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`h-6 w-6 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                            isSelected
                              ? 'bg-indigo-500 text-slate-950'
                              : 'bg-[#182030] text-slate-300'
                          }`}
                        >
                          {opt.id}
                        </span>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-indigo-400" />}
                      </div>
                      <div className="text-xs font-bold text-slate-200 mb-1.5">{opt.label}</div>
                      <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                        {opt.description}
                      </p>
                    </div>

                    {/* Principles Radar Preview */}
                    <div className="border-t border-[#182030] pt-2 mt-2 flex flex-wrap gap-1">
                      {op.emphasizedPrinciples.map((p) => {
                        const score = opt.scores[p] || 0;
                        return (
                          <span
                            key={p}
                            className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                              score > 0
                                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60'
                                : score < 0
                                ? 'bg-rose-950/70 text-rose-300 border border-rose-800/60'
                                : 'bg-slate-900 text-slate-400'
                            }`}
                          >
                            {p}: {score > 0 ? `+${score}` : score}
                          </span>
                        );
                      })}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Justification Field */}
            {selectedOptionId && (
              <div className="rounded-xl border border-[#1b2438] bg-[#0c101a] p-4 space-y-2 animate-in fade-in duration-200">
                <label className="text-xs font-mono font-bold text-slate-300 block">
                  Operative Justification (ACM / Standard Reference)
                </label>
                <textarea
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  placeholder="Explain why this option upholds stakeholder safety, duty to report, and institutional integrity..."
                  rows={3}
                  className="w-full rounded-lg border border-[#232c40] bg-black/60 p-3 text-xs text-slate-200 placeholder:text-slate-500 font-mono focus:border-indigo-500 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Analysis Feedback Display if already evaluated */}
          {analysisResult && (
            <div className="rounded-xl border border-indigo-800/80 bg-[#121626] p-5 space-y-4 animate-in slide-in-from-bottom duration-300">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-300">
                <Sparkles className="h-4 w-4" />
                <span>CYBERMENTOR AI // ETHICS EVALUATION COMPLETE</span>
              </div>

              <div className="p-3 rounded bg-black/50 border border-[#20293d] text-xs text-indigo-200 italic font-mono leading-relaxed">
                &quot;{analysisResult.mentorVoice}&quot;
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded bg-[#090d18] border border-[#182136]">
                  <span className="text-[10px] text-slate-400 uppercase block">Professional Standard:</span>
                  <span className="text-slate-200">{analysisResult.professionalStandard}</span>
                </div>
                <div className="p-3 rounded bg-[#090d18] border border-[#182136]">
                  <span className="text-[10px] text-slate-400 uppercase block">Actionable Rule:</span>
                  <span className="text-slate-200">{analysisResult.realWorldRule}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-[#1b2336] bg-[#101422] px-6 py-4 flex items-center justify-between">
          <div className="text-xs font-mono text-slate-400">
            {chosenOption ? (
              <span>Selected Option: <strong className="text-indigo-300">[{chosenOption.id}]</strong></span>
            ) : (
              <span>Select an ethical option to continue</span>
            )}
          </div>

          <button
            id="commit-ethics-decision-btn"
            disabled={!chosenOption || isSubmitting}
            onClick={handleCommit}
            className={`rounded-xl px-6 py-2.5 text-xs font-bold font-mono transition-all flex items-center gap-2 ${
              !chosenOption || isSubmitting
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-slate-950 shadow-lg'
            }`}
          >
            <span>{isSubmitting ? 'EVALUATING WITH CYBERMENTOR AI...' : 'COMMIT ETHICAL JUDGMENT'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
