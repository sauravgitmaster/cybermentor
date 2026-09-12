import React, { useState, useEffect } from 'react';
import {
  Play,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Brain,
  Home,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Search,
  ExternalLink,
  HardDrive,
  Ban,
  ShieldCheck,
  Send,
  KeyRound,
  HelpCircle,
  Check,
  BookOpen,
  MapPin,
  MessageSquare,
} from 'lucide-react';
import {
  Scenario,
  ScenarioOpsProgress,
  ScenarioMentorFeedback,
  OptionClassification,
} from '../../types/scenario';
import { PlayerState, CyberSkillProfile } from '../../types';
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
  player?: PlayerState;
  onExitToHome: () => void;
  onEnterRPG: () => void;
}

const STORAGE_KEY = 'cybermentor_scenario_ops_progress';

// Helper to determine intuitive action icon for option choices
const getOptionVisual = (label: string) => {
  const l = label.toLowerCase();
  if (
    l.includes('inspect') ||
    l.includes('check') ||
    l.includes('verify') ||
    l.includes('examine') ||
    l.includes('look') ||
    l.includes('scan')
  ) {
    return { icon: Search, color: 'text-sky-400 bg-sky-950/70 border-sky-600/60' };
  }
  if (
    l.includes('link') ||
    l.includes('open') ||
    l.includes('click') ||
    l.includes('connect')
  ) {
    return { icon: ExternalLink, color: 'text-amber-400 bg-amber-950/70 border-amber-600/60' };
  }
  if (
    l.includes('usb') ||
    l.includes('plug') ||
    l.includes('drive') ||
    l.includes('device') ||
    l.includes('hardware')
  ) {
    return { icon: HardDrive, color: 'text-amber-400 bg-amber-950/70 border-amber-600/60' };
  }
  if (
    l.includes('ignore') ||
    l.includes('delete') ||
    l.includes('leave') ||
    l.includes('do nothing')
  ) {
    return { icon: Ban, color: 'text-slate-300 bg-slate-800/70 border-slate-600/60' };
  }
  if (
    l.includes('report') ||
    l.includes('alert') ||
    l.includes('notify') ||
    l.includes('warn') ||
    l.includes('secops') ||
    l.includes('it')
  ) {
    return { icon: ShieldCheck, color: 'text-emerald-400 bg-emerald-950/70 border-emerald-600/60' };
  }
  if (
    l.includes('forward') ||
    l.includes('send') ||
    l.includes('share') ||
    l.includes('ask')
  ) {
    return { icon: Send, color: 'text-purple-400 bg-purple-950/70 border-purple-600/60' };
  }
  if (
    l.includes('sign in') ||
    l.includes('login') ||
    l.includes('password') ||
    l.includes('credentials')
  ) {
    return { icon: KeyRound, color: 'text-rose-400 bg-rose-950/70 border-rose-600/60' };
  }
  return { icon: HelpCircle, color: 'text-cyan-400 bg-cyan-950/70 border-cyan-600/60' };
};

export const ScenarioOpsView: React.FC<ScenarioOpsViewProps> = ({
  player,
  onExitToHome,
  onEnterRPG,
}) => {
  // Load saved progress internally to keep tracking data intact
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

  // Session history to avoid immediate repetition: Scenario A -> Scenario B -> Scenario C
  const [sessionHistory, setSessionHistory] = useState<string[]>(() => {
    if (SCENARIOS.length === 0) return [];
    const firstIdx = Math.floor(Math.random() * SCENARIOS.length);
    return [SCENARIOS[firstIdx].id];
  });

  // Current active scenario: starts immediately with a random scenario!
  const [activeScenarioId, setActiveScenarioId] = useState<string>(() => {
    if (SCENARIOS.length === 0) return '';
    const firstIdx = Math.floor(Math.random() * SCENARIOS.length);
    return SCENARIOS[firstIdx].id;
  });

  const [selectedOptionId, setSelectedOptionId] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [mentorResponse, setMentorResponse] = useState<ScenarioMentorFeedback | null>(null);

  // Keep progress saved in background
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {}
  }, [progress]);

  const activeScenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  // Helper to pick the next scenario from unplayed session pool with adaptive skill weighting
  const pickNextScenario = (currentId: string, history: string[]) => {
    let unplayed = SCENARIOS.filter((s) => !history.includes(s.id));
    let nextHistory = [...history];

    // If all scenarios have been seen in this session, reset session history
    if (unplayed.length === 0) {
      unplayed = SCENARIOS.filter((s) => s.id !== currentId);
      if (unplayed.length === 0) unplayed = SCENARIOS;
      nextHistory = [];
    }

    // Adaptive skill weighting: if player has a skillProfile, prioritize training areas
    if (player?.skillProfile) {
      const weightedPool: Scenario[] = [];
      unplayed.forEach((sc) => {
        let weight = 1;
        // Prioritize phishing / social engineering if score is lower
        if (
          player.skillProfile.phishingAwareness < 70 &&
          (sc.category === 'phishing' || sc.category === 'social-engineering')
        ) {
          weight += 2;
        }
        // Prioritize hardware security if score is lower
        if (player.skillProfile.hardwareSecurity < 70 && sc.category === 'hardware') {
          weight += 2;
        }
        // Prioritize network vigilance if score is lower
        if (
          player.skillProfile.networkVigilance < 70 &&
          (sc.category === 'wifi' || sc.category === 'qr')
        ) {
          weight += 2;
        }
        for (let i = 0; i < weight; i++) {
          weightedPool.push(sc);
        }
      });

      const randomIndex = Math.floor(Math.random() * weightedPool.length);
      const chosen = weightedPool[randomIndex] || unplayed[0];

      return {
        nextScenario: chosen,
        newHistory: [...nextHistory, chosen.id],
      };
    }

    const randomIndex = Math.floor(Math.random() * unplayed.length);
    const chosen = unplayed[randomIndex];

    return {
      nextScenario: chosen,
      newHistory: [...nextHistory, chosen.id],
    };
  };

  // Move to another random scenario
  const handleNextScenario = () => {
    playClickSound();
    const { nextScenario, newHistory } = pickNextScenario(activeScenarioId, sessionHistory);
    setActiveScenarioId(nextScenario.id);
    setSessionHistory(newHistory);
    setSelectedOptionId(null);
    setMentorResponse(null);
    setIsEvaluating(false);
    // Smooth scroll to top of scenario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Retry the current scenario
  const handleRetryScenario = () => {
    playClickSound();
    setSelectedOptionId(null);
    setMentorResponse(null);
    setIsEvaluating(false);
  };

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

    // Deterministic fallback (guaranteed reliable feedback)
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
            riskAssessment:
              scenario.options.find((o) => o.id === optionId)?.riskAssessment || 'HIGH',
            timestamp: Date.now(),
          },
        },
        principlesLearned: nextPrinciples,
      };
    });
  };

  const chosenOption = activeScenario?.options.find((o) => o.id === selectedOptionId);
  const isSecure = chosenOption?.classification === 'secure';

  return (
    <div
      id="scenario-ops-container"
      className="min-h-screen bg-[#0a0f18] text-slate-100 font-sans pb-16 select-none"
    >
      {/* 1. SIMPLE TOP HEADER BAR */}
      <header className="border-b border-slate-800 bg-[#0d1524]/95 backdrop-blur-md sticky top-[53px] z-30 px-4 py-3 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center">
              <Brain className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold tracking-wide text-white">
                  SCENARIO OPS
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-600/50">
                  SITUATION #{sessionHistory.length || 1}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Something happened. What would you do?
              </p>
            </div>
          </div>

          {/* Quick Exit Actions */}
          <div className="flex items-center gap-2">
            <button
              id="scenario-ops-home-btn"
              onClick={() => {
                playClickSound();
                onExitToHome();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
              title="Return to Home"
            >
              <Home className="h-3.5 w-3.5" />
              <span>HOME</span>
            </button>
            <button
              id="scenario-ops-rpg-btn"
              onClick={() => {
                playClickSound();
                onEnterRPG();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-cyan-300 hover:text-cyan-200 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-700/80 transition-colors"
              title="Enter Cyber World"
            >
              <Compass className="h-3.5 w-3.5" />
              <span>CYBER WORLD</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN SINGLE SCENARIO ENCOUNTER */}
      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* SCENARIO SITUATION CARD */}
        <div
          id="active-scenario-card"
          className="rounded-2xl border-2 border-slate-700/80 bg-[#121c2d] p-5 sm:p-6 shadow-2xl space-y-5"
        >
          {/* Location & Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3.5">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                CYBER ENCOUNTER
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
                {activeScenario.title}
              </h2>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs font-medium text-cyan-300 self-start sm:self-center">
              <MapPin className="h-3.5 w-3.5 text-cyan-400" />
              <span>{activeScenario.environmentTitle}</span>
            </div>
          </div>

          {/* NPC Character Dialogue Encounter */}
          <div className="rounded-xl bg-[#0b121e] border border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
            {/* NPC Avatar */}
            <div className="shrink-0 flex flex-col items-center">
              <ScenarioParticipantAvatar participant={activeScenario.participant} />
              <div className="mt-1.5 text-center">
                <div className="text-xs font-bold text-amber-300 font-mono">
                  {activeScenario.participant.name}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">
                  {activeScenario.participant.role}
                </div>
              </div>
            </div>

            {/* NPC Speech Bubbles */}
            <div className="flex-1 space-y-2.5 w-full">
              <div className="text-xs text-slate-400 italic">
                {activeScenario.context || activeScenario.situation}
              </div>

              {activeScenario.dialogue.map((line, idx) => (
                <div
                  key={idx}
                  className="relative p-3 rounded-xl bg-[#142032] border border-slate-700/70 text-xs sm:text-sm text-slate-100 leading-relaxed shadow-sm"
                >
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>"{line}"</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Evidence / Artifact (Suspicious email, USB, Wi-Fi screen, etc.) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                INSPECT THE CLUES
              </span>
              <span className="text-[11px] text-cyan-400 font-medium">
                Look closely at the details
              </span>
            </div>
            <ScenarioArtifactViewer artifact={activeScenario.artifact} />
          </div>
        </div>

        {/* 3. QUESTION & LARGE ANSWER CHOICES */}
        <div className="rounded-2xl border-2 border-slate-700/80 bg-[#101927] p-5 sm:p-6 shadow-2xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              YOUR DECISION
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
              What would you do?
            </h3>
          </div>

          {/* 3–4 Large Answer Choices */}
          <div className="space-y-3">
            {activeScenario.options.map((opt) => {
              const isChosen = selectedOptionId === opt.id;
              const isLocked = Boolean(selectedOptionId);
              const visual = getOptionVisual(opt.label);
              const VisualIcon = visual.icon;

              let cardStyle =
                'border-slate-800 bg-[#131e2f] hover:border-slate-600 hover:bg-[#18263a] text-slate-200 cursor-pointer';

              if (isChosen) {
                if (opt.classification === 'secure') {
                  cardStyle =
                    'border-emerald-500 bg-emerald-950/40 text-emerald-100 ring-2 ring-emerald-500/40';
                } else {
                  cardStyle =
                    'border-amber-500 bg-amber-950/40 text-amber-100 ring-2 ring-amber-500/40';
                }
              } else if (isLocked) {
                cardStyle = 'opacity-40 border-slate-800/60 bg-[#0c1320] cursor-not-allowed';
              }

              return (
                <button
                  key={opt.id}
                  id={`scenario-option-${opt.id}`}
                  disabled={isLocked}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-start gap-4 group relative shadow-md ${cardStyle}`}
                >
                  {/* Action Icon Pill */}
                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                      isChosen
                        ? opt.classification === 'secure'
                          ? 'text-emerald-300 bg-emerald-900 border-emerald-500'
                          : 'text-amber-300 bg-amber-900 border-amber-500'
                        : visual.color
                    }`}
                  >
                    <VisualIcon className="h-5 w-5" />
                  </div>

                  {/* Option Text */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {opt.label}
                    </div>
                    {opt.description && (
                      <p className="text-xs sm:text-[13px] text-slate-300 mt-1 leading-relaxed">
                        {opt.description}
                      </p>
                    )}
                  </div>

                  {/* Selection Checkmark / Warning Indicator */}
                  {isChosen && (
                    <div className="shrink-0 mt-1">
                      {opt.classification === 'secure' ? (
                        <CheckCircle2 className="h-6 w-6 text-emerald-400 animate-in zoom-in-50" />
                      ) : (
                        <AlertTriangle className="h-6 w-6 text-amber-400 animate-in zoom-in-50" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. CONSEQUENCE & AI CYBERMENTOR EXPLANATION */}
        {selectedOptionId && (
          <div
            id="scenario-result-box"
            className="rounded-2xl border-2 border-slate-700 bg-[#0e1626] p-5 sm:p-6 shadow-2xl space-y-5 animate-in slide-in-from-bottom-3 duration-300"
          >
            {/* Visual Outcome Status */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              {isSecure ? (
                <div className="w-11 h-11 rounded-2xl bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shrink-0">
                  <Check className="h-6 w-6 stroke-[3]" />
                </div>
              ) : (
                <div className="w-11 h-11 rounded-2xl bg-amber-950 border-2 border-amber-500 flex items-center justify-center text-amber-400 shrink-0">
                  <AlertTriangle className="h-6 w-6 stroke-[2.5]" />
                </div>
              )}

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  WHAT HAPPENED
                </span>
                <h4
                  className={`text-lg sm:text-xl font-extrabold tracking-tight ${
                    isSecure ? 'text-emerald-300' : 'text-amber-300'
                  }`}
                >
                  {isSecure ? '✓ SAFE DECISION' : '⚠ RISKY CHOICE'}
                </h4>
              </div>
            </div>

            {/* Immediate Consequence */}
            <div className="rounded-xl bg-[#142032] border border-slate-700/80 p-4">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wide block mb-1">
                {isSecure ? 'Result:' : 'That choice could have caused a problem:'}
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {chosenOption?.consequence}
              </p>
            </div>

            {/* CyberMentor Educational Debrief */}
            <div className="rounded-2xl border-2 border-cyan-800/80 bg-[#0a1322] p-4 sm:p-5 space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between border-b border-cyan-900/60 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-cyan-300" />
                  </div>
                  <span className="text-xs font-bold tracking-wider text-cyan-300 uppercase">
                    CYBERMENTOR
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  Mentor Advice
                </span>
              </div>

              {isEvaluating ? (
                <div className="py-6 flex flex-col items-center justify-center gap-2 text-xs font-mono text-cyan-300">
                  <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  <span>CyberMentor is reviewing the situation...</span>
                </div>
              ) : (
                <div className="space-y-3 text-xs sm:text-sm leading-relaxed">
                  {/* Direct Mentor Voice */}
                  {mentorResponse?.mentorVoice && (
                    <div className="text-slate-100 italic border-l-3 border-cyan-400 pl-3 py-0.5 text-xs sm:text-sm">
                      "{mentorResponse.mentorVoice}"
                    </div>
                  )}

                  {/* Why this mattered & Clue insight */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs pt-1">
                    <div className="p-3 rounded-xl bg-[#0f1b2c] border border-slate-800 space-y-1">
                      <span className="text-[10px] text-amber-300 font-bold uppercase">
                        WHY THIS HAPPENED
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {mentorResponse?.whyExplanation}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#0f1b2c] border border-slate-800 space-y-1">
                      <span className="text-[10px] text-cyan-300 font-bold uppercase">
                        WHAT TO LOOK FOR NEXT TIME
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {mentorResponse?.clueInsight}
                      </p>
                    </div>
                  </div>

                  {/* Safest Move recommendation if risky */}
                  {!isSecure && mentorResponse?.saferAction && (
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/60 text-xs space-y-1">
                      <span className="text-[10px] text-emerald-400 font-bold uppercase">
                        BETTER MOVE
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {mentorResponse.saferAction}
                      </p>
                    </div>
                  )}

                  {/* Key Lesson Pill */}
                  <div className="pt-2 border-t border-cyan-900/60">
                    <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-600/70 flex items-start gap-2.5">
                      <BookOpen className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-cyan-300 uppercase tracking-wide font-bold">
                          KEY LESSON
                        </span>
                        <p className="text-white font-bold text-xs sm:text-sm mt-0.5">
                          "{mentorResponse?.principle || activeScenario.securityPrinciple}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. NEXT SCENARIO BUTTON (The Primary Flow Action) */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Optional Try Again for learning */}
              {!isSecure ? (
                <button
                  id="retry-scenario-btn"
                  onClick={handleRetryScenario}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>TRY THIS SITUATION AGAIN</span>
                </button>
              ) : (
                <div />
              )}

              {/* PRIMARY NEXT SCENARIO BUTTON */}
              <button
                id="next-scenario-btn"
                onClick={handleNextScenario}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-slate-950 font-extrabold text-sm sm:text-base tracking-wide shadow-xl shadow-amber-400/20 hover:shadow-amber-400/30 transition-all cursor-pointer"
              >
                <span>NEXT SCENARIO</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
