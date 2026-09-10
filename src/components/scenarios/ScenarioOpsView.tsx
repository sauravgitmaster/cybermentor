import React, { useState, useEffect } from 'react';
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RotateCcw,
  ArrowRight,
  ChevronLeft,
  Sparkles,
  BookOpen,
  Filter,
  Brain,
  Compass,
  Home,
  Check,
  Zap,
} from 'lucide-react';
import {
  Scenario,
  ScenarioCategory,
  ScenarioOpsProgress,
  ScenarioMentorFeedback,
  OptionClassification,
  ScenarioOpsDecisionRecord,
} from '../../types/scenario';
import { SCENARIOS } from '../../data/scenarios';
import { ScenarioParticipantAvatar } from './ScenarioParticipantAvatar';
import { ScenarioArtifactViewer } from './ScenarioArtifactViewer';
import {
  playClickSound,
  playInspectSound,
  playSuccessSound,
  playWarningSound,
} from '../../utils/audio';

interface ScenarioOpsViewProps {
  onExitToHome: () => void;
  onEnterRPG: () => void;
}

const STORAGE_KEY = 'cybermentor_scenario_ops_progress';

export const ScenarioOpsView: React.FC<ScenarioOpsViewProps> = ({ onExitToHome, onEnterRPG }) => {
  // Load saved progress
  const [progress, setProgress] = useState<ScenarioOpsProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      completedIds: [],
      decisions: {},
      principlesLearned: [],
    };
  });

  // Active scenario state
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ScenarioCategory | 'all'>('all');
  const [selectedOptionId, setSelectedOptionId] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [mentorResponse, setMentorResponse] = useState<ScenarioMentorFeedback | null>(null);

  // Save progress
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {}
  }, [progress]);

  const activeScenario = SCENARIOS.find((s) => s.id === activeScenarioId) || null;

  // Filter scenarios
  const filteredScenarios = SCENARIOS.filter((s) =>
    selectedCategory === 'all' ? true : s.category === selectedCategory
  );

  // Calculation of genuine stats
  const completedCount = progress.completedIds.length;
  const totalScenarios = SCENARIOS.length;
  const decisionRecords = Object.values(progress.decisions) as ScenarioOpsDecisionRecord[];
  const secureDecisionsCount = decisionRecords.filter(
    (d) => d && d.classification === 'secure'
  ).length;
  const riskyDecisionsCount = decisionRecords.filter(
    (d) => d && (d.classification === 'risky' || d.classification === 'dangerous')
  ).length;
  const principlesCount = progress.principlesLearned.length;

  // Handle Option Click
  const handleSelectOption = async (optionId: 'A' | 'B' | 'C' | 'D') => {
    if (!activeScenario || selectedOptionId) return;

    playInspectSound();
    setSelectedOptionId(optionId);
    setIsEvaluating(true);

    const chosenOption = activeScenario.options.find((o) => o.id === optionId);
    const deterministic = activeScenario.deterministicFeedback[optionId];

    if (chosenOption?.classification === 'secure') {
      setTimeout(() => playSuccessSound(), 150);
    } else {
      setTimeout(() => playWarningSound(), 150);
    }

    // Try calling AI Mentor server endpoint with graceful fallback
    try {
      const res = await fetch('/api/scenario/debrief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: activeScenario.id,
          scenarioTitle: activeScenario.title,
          category: activeScenario.category,
          situation: activeScenario.situation,
          chosenOption: {
            id: optionId,
            label: chosenOption?.label,
            classification: chosenOption?.classification,
            riskAssessment: chosenOption?.riskAssessment,
            consequence: chosenOption?.consequence,
          },
          bestOption: {
            id: activeScenario.bestOptionId,
            label: activeScenario.options.find((o) => o.id === activeScenario.bestOptionId)?.label,
          },
          securityPrinciple: activeScenario.securityPrinciple,
          clueInsight: chosenOption?.clueContext,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.mentorVoice) {
          setMentorResponse({
            mentorVoice: data.mentorVoice,
            whyExplanation: data.whyExplanation || deterministic.whyExplanation,
            realisticOutcome: data.realisticOutcome || deterministic.realisticOutcome,
            clueInsight: data.clueInsight || deterministic.clueInsight,
            saferAction: data.saferAction || deterministic.saferAction,
            principle: data.principle || deterministic.principle,
          });
          setIsEvaluating(false);
          updateProgress(activeScenario, optionId, chosenOption?.classification || 'risky');
          return;
        }
      }
    } catch {
      // Offline or network error: gracefully fall back to local deterministic feedback
    }

    // Deterministic fallback
    setMentorResponse(deterministic);
    setIsEvaluating(false);
    updateProgress(activeScenario, optionId, chosenOption?.classification || 'risky');
  };

  const updateProgress = (
    scenario: Scenario,
    optionId: 'A' | 'B' | 'C' | 'D',
    classification: OptionClassification
  ) => {
    setProgress((prev) => {
      const nextCompleted = prev.completedIds.includes(scenario.id)
        ? prev.completedIds
        : [...prev.completedIds, scenario.id];

      const nextPrinciples = prev.principlesLearned.includes(scenario.securityPrinciple)
        ? prev.principlesLearned
        : [...prev.principlesLearned, scenario.securityPrinciple];

      return {
        ...prev,
        completedIds: nextCompleted,
        decisions: {
          ...prev.decisions,
          [scenario.id]: {
            scenarioId: scenario.id,
            chosenOptionId: optionId,
            classification,
            riskAssessment: scenario.options.find((o) => o.id === optionId)?.riskAssessment || 'HIGH',
            timestamp: Date.now(),
          },
        },
        principlesLearned: nextPrinciples,
      };
    });
  };

  const handleRetryScenario = () => {
    playClickSound();
    setSelectedOptionId(null);
    setMentorResponse(null);
    setIsEvaluating(false);
  };

  const handleNextScenario = () => {
    playClickSound();
    if (!activeScenario) return;
    const currentIndex = SCENARIOS.findIndex((s) => s.id === activeScenario.id);
    const nextIndex = (currentIndex + 1) % SCENARIOS.length;
    setActiveScenarioId(SCENARIOS[nextIndex].id);
    setSelectedOptionId(null);
    setMentorResponse(null);
    setIsEvaluating(false);
  };

  const categoriesList: { id: ScenarioCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Operations' },
    { id: 'phishing', label: 'Phishing' },
    { id: 'hardware', label: 'USB & Hardware' },
    { id: 'wifi', label: 'Public Wi-Fi' },
    { id: 'qr', label: 'QR / Mobile' },
    { id: 'passwords', label: 'Passwords & MFA' },
    { id: 'social-engineering', label: 'Social Eng' },
    { id: 'account-security', label: 'Account Security' },
    { id: 'privacy', label: 'Data Privacy' },
  ];

  return (
    <div id="scenario-ops-container" className="min-h-screen bg-[#090d14] text-slate-100 font-sans pb-16">
      {/* Top Tactical Sub-Header */}
      <div className="border-b border-[#25354e] bg-[#0f1726]/90 backdrop-blur sticky top-[53px] z-30 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-amber-500/20 border border-amber-500/60 flex items-center justify-center">
              <Brain className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xs font-mono font-bold tracking-wider text-amber-300 uppercase">
                  SCENARIO OPS // TACTICAL SIMULATOR
                </h1>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold">
                  MODE: ACTIVE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
                Realistic situation response training • Real consequence analysis • AI Mentor debriefing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClickSound();
                onExitToHome();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-slate-300 hover:text-white bg-[#162235] hover:bg-[#1f2f47] border border-[#2b3d5b] transition-colors"
            >
              <Home className="h-3.5 w-3.5" />
              <span>HOME</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                onEnterRPG();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-cyan-300 hover:text-cyan-200 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/80 transition-colors"
            >
              <Compass className="h-3.5 w-3.5" />
              <span>ENTER CYBER WORLD</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: SCENARIO SELECTION DASHBOARD */}
      {!activeScenario && (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-200">
          {/* Progression Summary Banner */}
          <div className="rounded-xl border-2 border-[#2b3d5b] bg-[#121c2e] p-5 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#202f47]">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                  OPERATIONAL TRAINING MATRIX
                </span>
                <h2 className="text-xl font-bold text-slate-100 font-mono tracking-tight">
                  Cybersecurity Decision Readiness
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  Step inside authentic campus security incidents. Inspect evidence, choose your operational response,
                  and learn from the consequences through CyberMentor AI.
                </p>
              </div>

              {/* Progress Gauges */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-lg bg-[#0a101b] border border-[#23334d] px-3.5 py-2 text-center min-w-[95px]">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">COMPLETED</div>
                  <div className="text-lg font-mono font-bold text-cyan-300">
                    {completedCount} <span className="text-xs text-slate-500">/ {totalScenarios}</span>
                  </div>
                </div>

                <div className="rounded-lg bg-[#0a101b] border border-[#23334d] px-3.5 py-2 text-center min-w-[95px]">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">PRINCIPLES</div>
                  <div className="text-lg font-mono font-bold text-amber-300">{principlesCount}</div>
                </div>

                <div className="rounded-lg bg-[#0a101b] border border-[#23334d] px-3.5 py-2 text-center min-w-[95px]">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">SECURE MOVES</div>
                  <div className="text-lg font-mono font-bold text-emerald-400">{secureDecisionsCount}</div>
                </div>

                <div className="rounded-lg bg-[#0a101b] border border-[#23334d] px-3.5 py-2 text-center min-w-[95px]">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">RISKY MOVES</div>
                  <div className="text-lg font-mono font-bold text-rose-400">{riskyDecisionsCount}</div>
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 pt-4 overflow-x-auto pb-1 scrollbar-none">
              <Filter className="h-3.5 w-3.5 text-slate-400 shrink-0 ml-1" />
              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-3 py-1 text-xs font-mono rounded-md whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'bg-[#18253b] text-slate-300 hover:text-white hover:bg-[#20324f] border border-[#2a3e5e]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scenario Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredScenarios.map((scenario) => {
              const prevDecision = progress.decisions[scenario.id];
              const isDone = progress.completedIds.includes(scenario.id);

              return (
                <div
                  key={scenario.id}
                  className="rounded-xl border-2 border-[#24344d] bg-[#111928] hover:border-[#3d557c] transition-all flex flex-col justify-between overflow-hidden shadow-lg group"
                >
                  {/* Card Header & Badges */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-black/40 text-amber-300 border border-amber-500/30 font-bold">
                        {scenario.code}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{scenario.difficulty}</span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-100 font-mono group-hover:text-amber-300 transition-colors">
                        {scenario.title}
                      </h3>
                      <div className="text-[11px] font-mono text-cyan-400 mt-0.5">{scenario.categoryLabel}</div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{scenario.situation}</p>

                    {/* Environment tag */}
                    <div className="pt-2 border-t border-[#1a273b] flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>LOCATION:</span>
                      <span className="text-slate-300 truncate">{scenario.environmentTitle}</span>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-3 bg-[#0d1422] border-t border-[#1d2b40] flex items-center justify-between gap-2">
                    {/* Status Badge */}
                    <div>
                      {isDone ? (
                        prevDecision?.classification === 'secure' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400">
                            <CheckCircle2 className="h-3.5 w-3.5" /> DEFENDED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-400">
                            <AlertTriangle className="h-3.5 w-3.5" /> NEAR MISS
                          </span>
                        )
                      ) : (
                        <span className="text-[11px] font-mono text-slate-500">[STANDBY]</span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        playInspectSound();
                        setActiveScenarioId(scenario.id);
                        setSelectedOptionId(null);
                        setMentorResponse(null);
                      }}
                      className="px-3 py-1.5 rounded-md text-xs font-mono font-bold bg-[#1b283d] hover:bg-amber-500 hover:text-slate-950 text-slate-200 border border-[#33486a] transition-colors flex items-center gap-1.5"
                    >
                      <span>{isDone ? 'REPLAY OPS' : 'INITIATE OPS'}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: ACTIVE SCENARIO SIMULATOR */}
      {activeScenario && (
        <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 animate-in slide-in-from-bottom-2 duration-200">
          {/* Top Scenario Navigation Bar */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#23354d]">
            <button
              onClick={() => {
                playClickSound();
                setActiveScenarioId(null);
                setSelectedOptionId(null);
                setMentorResponse(null);
              }}
              className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1.5 rounded bg-[#131d2e] border border-[#253752] transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>RETURN TO SCENARIO OPS</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-black/40 text-amber-300 font-bold border border-amber-500/40">
                {activeScenario.code}
              </span>
              <span className="text-slate-400 hidden sm:inline">{activeScenario.difficulty}</span>
            </div>
          </div>

          {/* 1. SCENARIO INTRO & SETTING BANNER */}
          <div className="rounded-xl border-2 border-[#2f4263] bg-[#121c2e] p-5 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#23354d] pb-3 mb-4">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider font-bold">
                  {activeScenario.categoryLabel}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-100 font-mono tracking-tight">
                  {activeScenario.title}
                </h2>
              </div>
              <div className="px-2.5 py-1 rounded bg-[#090f1a] border border-[#202f47] text-[11px] font-mono text-cyan-300">
                📍 {activeScenario.environmentTitle}
              </div>
            </div>

            {/* Context Narrative */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">{activeScenario.situation}</p>

            {/* Participant Character + Dialogue Bubble */}
            <div className="rounded-lg bg-[#0a101b] border border-[#22334d] p-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="shrink-0 flex flex-col items-center">
                <ScenarioParticipantAvatar participant={activeScenario.participant} />
                <div className="mt-1 text-center">
                  <div className="text-xs font-bold text-amber-300 font-mono">{activeScenario.participant.name}</div>
                  <div className="text-[9px] font-mono text-slate-400">{activeScenario.participant.role}</div>
                </div>
              </div>

              {/* Dialogue Transcript */}
              <div className="flex-1 space-y-2 text-xs text-slate-200 font-sans">
                {activeScenario.dialogue.map((line, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#141f32] border border-[#223552] leading-relaxed">
                    <span className="text-amber-400 font-bold font-mono mr-1.5">💬</span>
                    "{line}"
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. INCIDENT ARTIFACT INSPECTOR */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                EVIDENCE & ARTIFACT TELEMETRY
              </span>
              <span className="text-[10px] font-mono text-cyan-400">[INSPECT TECHNICAL CLUES]</span>
            </div>
            <ScenarioArtifactViewer artifact={activeScenario.artifact} />
          </div>

          {/* 3. DECISION SELECTION AREA */}
          <div className="rounded-xl border-2 border-[#2b3d5b] bg-[#101726] p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#1f2d42] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                  OPERATIONAL RESPONSE
                </span>
                <h3 className="text-base font-bold text-slate-100 font-mono">WHAT WOULD YOU DO?</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">SELECT 1 TACTICAL ACTION</span>
            </div>

            {/* Option Cards */}
            <div className="grid grid-cols-1 gap-3">
              {activeScenario.options.map((opt) => {
                const isChosen = selectedOptionId === opt.id;
                const isLocked = Boolean(selectedOptionId);

                let badgeColor = 'bg-[#18253b] text-slate-300 border-[#2a3e5e]';
                if (isChosen) {
                  if (opt.classification === 'secure') badgeColor = 'bg-emerald-950 text-emerald-300 border-emerald-600';
                  if (opt.classification === 'risky') badgeColor = 'bg-amber-950 text-amber-300 border-amber-600';
                  if (opt.classification === 'dangerous') badgeColor = 'bg-rose-950 text-rose-300 border-rose-600';
                }

                return (
                  <button
                    key={opt.id}
                    disabled={isLocked}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3.5 group relative ${
                      isChosen
                        ? opt.classification === 'secure'
                          ? 'border-emerald-500 bg-emerald-950/30'
                          : opt.classification === 'risky'
                          ? 'border-amber-500 bg-amber-950/30'
                          : 'border-rose-500 bg-rose-950/30'
                        : isLocked
                        ? 'opacity-60 border-[#1a2537] bg-[#0c1322]'
                        : 'border-[#22334c] bg-[#121c2e] hover:border-[#3f577e] hover:bg-[#18253b]'
                    }`}
                  >
                    {/* Option Letter Pill */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm shrink-0 border ${badgeColor}`}
                    >
                      {opt.id}
                    </div>

                    {/* Option Details */}
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-100 text-xs sm:text-sm group-hover:text-amber-200 transition-colors">
                        {opt.label}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{opt.description}</p>
                    </div>

                    {isChosen && (
                      <div className="shrink-0 mt-1">
                        {opt.classification === 'secure' && (
                          <CheckCircle2 className="h-5 w-5 text-emerald-400 animate-in zoom-in-50" />
                        )}
                        {opt.classification === 'risky' && (
                          <AlertTriangle className="h-5 w-5 text-amber-400 animate-in zoom-in-50" />
                        )}
                        {opt.classification === 'dangerous' && (
                          <XCircle className="h-5 w-5 text-rose-400 animate-in zoom-in-50" />
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. CONSEQUENCE & AI MENTOR DEBRIEF (Visible once option is chosen) */}
          {selectedOptionId && (
            <div className="rounded-xl border-2 border-[#384c6e] bg-[#0d1424] p-5 sm:p-6 shadow-2xl space-y-5 animate-in slide-in-from-bottom-4 duration-300">
              {/* Outcome Header State */}
              {(() => {
                const chosen = activeScenario.options.find((o) => o.id === selectedOptionId);
                const isSecure = chosen?.classification === 'secure';
                const isRisky = chosen?.classification === 'risky';

                return (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#20314b]">
                    <div className="flex items-center gap-2.5">
                      {isSecure && (
                        <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400">
                          <Check className="h-6 w-6 stroke-[3]" />
                        </div>
                      )}
                      {isRisky && (
                        <div className="w-10 h-10 rounded-lg bg-amber-950 border border-amber-500 flex items-center justify-center text-amber-400">
                          <AlertTriangle className="h-6 w-6 stroke-[2.5]" />
                        </div>
                      )}
                      {!isSecure && !isRisky && (
                        <div className="w-10 h-10 rounded-lg bg-rose-950 border border-rose-500 flex items-center justify-center text-rose-400">
                          <XCircle className="h-6 w-6 stroke-[2.5]" />
                        </div>
                      )}

                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                          DECISION RECORDED
                        </div>
                        <h4
                          className={`text-base sm:text-lg font-mono font-bold tracking-tight ${
                            isSecure
                              ? 'text-emerald-300'
                              : isRisky
                              ? 'text-amber-300'
                              : 'text-rose-400'
                          }`}
                        >
                          {isSecure && '✓ SECURE DECISION'}
                          {isRisky && '⚠ RISKY DECISION'}
                          {!isSecure && !isRisky && '✕ DANGEROUS DECISION'}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">RISK ASSESSMENT:</span>
                      <span
                        className={`px-2.5 py-0.5 rounded font-mono font-bold text-xs ${
                          chosen?.riskAssessment === 'LOW'
                            ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                            : chosen?.riskAssessment === 'MEDIUM'
                            ? 'bg-amber-900/60 text-amber-300 border border-amber-700'
                            : 'bg-rose-900/60 text-rose-300 border border-rose-700'
                        }`}
                      >
                        {chosen?.riskAssessment}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Consequence Narrative */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                  REALISTIC CONSEQUENCE
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#121c2e] p-3.5 rounded-lg border border-[#21324c]">
                  {activeScenario.options.find((o) => o.id === selectedOptionId)?.consequence}
                </p>
              </div>

              {/* AI CyberMentor Tactical Debrief Box */}
              <div className="rounded-xl border-2 border-cyan-800/80 bg-[#0a1220] p-4 sm:p-5 space-y-3.5 shadow-xl">
                <div className="flex items-center justify-between border-b border-cyan-900/60 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-cyan-950 border border-cyan-500 flex items-center justify-center">
                      <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                    </div>
                    <span className="text-xs font-mono font-bold tracking-wider text-cyan-300 uppercase">
                      CYBERMENTOR AI DEBRIEF
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">COGNITIVE ANALYSIS</span>
                </div>

                {isEvaluating ? (
                  <div className="py-6 flex flex-col items-center justify-center gap-2 text-xs font-mono text-cyan-300">
                    <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    <span>CyberMentor is analyzing operational decision telemetry...</span>
                  </div>
                ) : (
                  <div className="space-y-3 text-xs sm:text-sm leading-relaxed">
                    {/* Mentor Direct Voice */}
                    {mentorResponse?.mentorVoice && (
                      <div className="text-slate-100 italic border-l-2 border-cyan-400 pl-3 py-0.5 text-xs sm:text-sm">
                        "{mentorResponse.mentorVoice}"
                      </div>
                    )}

                    {/* Educational Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                      <div className="p-3 rounded-lg bg-[#101c2d] border border-[#1d2f47] space-y-1">
                        <span className="font-mono text-[10px] text-amber-300 font-bold uppercase">
                          WHY THIS MATTERED
                        </span>
                        <p className="text-slate-300 leading-relaxed">{mentorResponse?.whyExplanation}</p>
                      </div>

                      <div className="p-3 rounded-lg bg-[#101c2d] border border-[#1d2f47] space-y-1">
                        <span className="font-mono text-[10px] text-cyan-300 font-bold uppercase">
                          THE CRITICAL CLUE
                        </span>
                        <p className="text-slate-300 leading-relaxed">{mentorResponse?.clueInsight}</p>
                      </div>
                    </div>

                    {/* Safer Action recommendation if not secure */}
                    {mentorResponse?.saferAction && (
                      <div className="p-3 rounded-lg bg-[#101c2d] border border-[#1d2f47] text-xs space-y-1">
                        <span className="font-mono text-[10px] text-emerald-300 font-bold uppercase">
                          RECOMMENDED DEFENSIVE PROTOCOL
                        </span>
                        <p className="text-slate-300 leading-relaxed">{mentorResponse.saferAction}</p>
                      </div>
                    )}

                    {/* Highlighted Security Principle */}
                    <div className="pt-2 border-t border-cyan-900/60">
                      <div className="p-3 rounded-lg bg-cyan-950/50 border border-cyan-600/70 flex items-start gap-2.5">
                        <BookOpen className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-mono text-[10px] text-cyan-300 uppercase tracking-wide font-bold">
                            CORE SECURITY PRINCIPLE:
                          </span>
                          <p className="text-slate-100 font-mono text-xs sm:text-sm font-semibold mt-0.5">
                            {mentorResponse?.principle || activeScenario.securityPrinciple}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons: RETRY, NEXT, RETURN */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#20314b]">
                <button
                  onClick={handleRetryScenario}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono text-slate-300 hover:text-white bg-[#162235] hover:bg-[#20324e] border border-[#2e4363] rounded-lg transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>[ RETRY SCENARIO ]</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      playClickSound();
                      setActiveScenarioId(null);
                      setSelectedOptionId(null);
                      setMentorResponse(null);
                    }}
                    className="px-3.5 py-2 text-xs font-mono text-slate-300 hover:text-white bg-[#141e30] border border-[#273a57] rounded-lg transition-colors"
                  >
                    <span>[ RETURN TO SCENARIO OPS ]</span>
                  </button>

                  <button
                    onClick={handleNextScenario}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-colors"
                  >
                    <span>NEXT SCENARIO</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
