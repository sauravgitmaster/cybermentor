import React from 'react';
import {
  Shield,
  Award,
  Zap,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  BookOpen,
  Cpu,
} from 'lucide-react';
import {
  MissionData,
  DecisionOption,
  MentorAnalysisResponse,
  PlayerState,
} from '../types';
import { playClickSound } from '../utils/audio';

interface MentorDebriefProps {
  mission: MissionData;
  player: PlayerState;
  chosenDecision: DecisionOption;
  mentorFeedback: MentorAnalysisResponse | null;
  isLoadingFeedback: boolean;
  unlockedAbility: { name: string; description: string; command: string } | null;
  onReturnToWorld: () => void;
  onProceedNextMission?: () => void;
}

export const MentorDebrief: React.FC<MentorDebriefProps> = ({
  mission,
  player,
  chosenDecision,
  mentorFeedback,
  isLoadingFeedback,
  unlockedAbility,
  onReturnToWorld,
  onProceedNextMission,
}) => {
  const isPositive = chosenDecision.trustChange > 0;

  return (
    <div
      id="mentor-debrief-screen"
      className="mx-auto max-w-4xl space-y-6 py-4 animate-in fade-in duration-300"
    >
      {/* Simulation Result Header */}
      <div
        className={`rounded-xl border p-6 shadow-lg ${
          isPositive
            ? 'border-emerald-900/60 bg-[#0d1617]'
            : 'border-rose-900/60 bg-[#160e12]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1f2735] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-lg border ${
                isPositive
                  ? 'border-emerald-800 bg-emerald-950 text-emerald-400'
                  : 'border-rose-800 bg-rose-950 text-rose-400'
              }`}
            >
              {isPositive ? (
                <CheckCircle2 className="h-6 w-6" />
              ) : (
                <AlertCircle className="h-6 w-6" />
              )}
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                SCENARIO OUTCOME // {mission.code}
              </div>
              <h2 className="text-xl font-bold text-slate-100">
                {isPositive ? 'Perimeter Defended' : 'Compromise Recorded'}
              </h2>
            </div>
          </div>

          {/* Digital Trust Delta Pill */}
          <div
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 ${
              isPositive
                ? 'border-emerald-800/80 bg-emerald-950/60 text-emerald-300'
                : 'border-rose-800/80 bg-rose-950/60 text-rose-300'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <div>
              <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400">
                DIGITAL TRUST DELTA
              </div>
              <div className="text-sm font-bold font-mono">
                {isPositive ? `+${chosenDecision.trustChange}` : chosenDecision.trustChange} / 100
              </div>
            </div>
          </div>
        </div>

        {/* Immediate Consequence Description */}
        <div className="space-y-2 text-sm text-slate-300">
          <div className="font-semibold text-slate-200">
            Selected Action: "{chosenDecision.label}"
          </div>
          <p className="text-xs text-slate-300 leading-relaxed bg-[#0a0d13]/60 p-3 rounded border border-[#1b2230]">
            {chosenDecision.consequenceText}
          </p>
        </div>
      </div>

      {/* CyberMentor AI Contextual Debrief Box */}
      <div className="rounded-xl border border-cyan-800/60 bg-[#0e131d] p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3 border-b border-[#1b2434] pb-3 mb-5">
          <div className="h-7 w-7 rounded border border-cyan-700 bg-cyan-950 flex items-center justify-center text-cyan-400">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-cyan-300 tracking-wider">
              CYBERMENTOR AI // DEBRIEF
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              COGNITIVE DEFENSE ANALYSIS
            </div>
          </div>
        </div>

        {isLoadingFeedback ? (
          <div className="py-8 text-center space-y-2">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
            <div className="text-xs font-mono text-slate-400">
              Synthesizing behavioral and forensic evaluation...
            </div>
          </div>
        ) : mentorFeedback ? (
          <div className="space-y-4">
            {/* Mentor in-character quote */}
            <blockquote className="border-l-2 border-cyan-400 pl-4 py-1 italic text-slate-200 text-sm font-sans leading-relaxed">
              "{mentorFeedback.mentorVoice}"
            </blockquote>

            {/* Evaluation Analysis */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                Behavioral Analysis
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {mentorFeedback.evaluation}
              </p>
            </div>

            {/* Core Security Mental Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="rounded border border-[#1d2738] bg-[#090c12] p-3">
                <div className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider mb-1 flex items-center gap-1.5">
                  <Shield className="h-3 w-3" /> Fundamental Security Principle
                </div>
                <div className="text-xs font-semibold text-slate-200">
                  {mentorFeedback.securityPrinciple}
                </div>
              </div>

              <div className="rounded border border-[#1d2738] bg-[#090c12] p-3">
                <div className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider mb-1 flex items-center gap-1.5">
                  <BookOpen className="h-3 w-3" /> Real-World Defensive Rule
                </div>
                <div className="text-xs font-semibold text-slate-200">
                  {mentorFeedback.realWorldDefense}
                </div>
              </div>
            </div>

            {/* Adaptive Recommendation */}
            <div className="rounded border border-cyan-900/40 bg-cyan-950/20 p-3 text-xs text-slate-300">
              <span className="font-mono text-[10px] text-cyan-400 uppercase mr-2 font-bold">
                RECOMMENDED NEXT SECTOR:
              </span>
              <span>{mentorFeedback.adaptiveRecommendation}</span>
            </div>
          </div>
        ) : null}
      </div>

      {/* Cyber Ability Unlocked Notification */}
      {unlockedAbility && (
        <div className="rounded-xl border border-cyan-700 bg-gradient-to-r from-cyan-950/40 to-[#0e131d] p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="rounded-lg p-2.5 bg-cyan-500 text-slate-950 font-bold">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-bold">
                NEW CYBER ABILITY UNLOCKED
              </div>
              <h3 className="text-base font-bold text-slate-100 mt-0.5">
                [{unlockedAbility.name}]
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                {unlockedAbility.description}
              </p>
              <div className="mt-2 text-[10px] font-mono text-cyan-400">
                SYNTAX: <span className="text-slate-200">{unlockedAbility.command}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certificate / Milestone Award */}
      {mission.completionCertificate && isPositive && (
        <div className="rounded-xl border border-[#20293b] bg-[#0c1017] p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-amber-950/60 text-amber-400 border border-amber-800/50">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-amber-400 tracking-wider">
                CERTIFIED MILESTONE CREDENTIAL
              </div>
              <div className="text-xs font-bold text-slate-200">
                {mission.completionCertificate.title}
              </div>
              <div className="text-[10px] text-slate-400">
                Issued by CyberMentor AI • Field: {mission.completionCertificate.field}
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="rounded bg-[#161d2b] px-2 py-1 text-[10px] font-mono text-cyan-300 border border-[#232c3d]">
              LOGGED IN DOSSIER
            </span>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#1a202d]">
        <button
          id="debrief-return-world-btn"
          onClick={() => {
            playClickSound();
            onReturnToWorld();
          }}
          className="w-full sm:w-auto rounded border border-[#232b3c] bg-[#121622] hover:bg-[#181e2e] px-5 py-2.5 text-xs font-semibold text-slate-300 transition-colors"
        >
          RETURN TO WORLD MAP
        </button>

        {onProceedNextMission && (
          <button
            id="debrief-next-mission-btn"
            onClick={() => {
              playClickSound();
              onProceedNextMission();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-2.5 text-xs font-bold shadow transition-all"
          >
            <span>PROCEED TO NEXT ENCOUNTER</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
