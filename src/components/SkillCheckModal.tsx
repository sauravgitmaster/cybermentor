import React, { useState } from 'react';
import {
  ShieldCheck,
  Brain,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Lock,
  Mail,
  Wifi,
  HardDrive,
  MessageSquare,
  Award,
  X,
} from 'lucide-react';
import { SKILL_CHECK_QUESTIONS, evaluateSkillCheck } from '../data/skillCheckQuestions';
import { CyberSkillProfile } from '../types';
import { playClickSound, playSuccessSound, playWarningSound } from '../utils/audio';

interface SkillCheckModalProps {
  onComplete: (profile: CyberSkillProfile) => void;
  onClose?: () => void;
  initialName?: string;
}

export const SkillCheckModal: React.FC<SkillCheckModalProps> = ({
  onComplete,
  onClose,
  initialName = 'Operative',
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [calculatedProfile, setCalculatedProfile] = useState<CyberSkillProfile | null>(null);

  const question = SKILL_CHECK_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === SKILL_CHECK_QUESTIONS.length - 1;

  const getQuestionIcon = (type: string) => {
    switch (type) {
      case 'email':
      case 'message':
        return <Mail className="h-5 w-5 text-amber-400" />;
      case 'password':
        return <Lock className="h-5 w-5 text-purple-400" />;
      case 'usb':
        return <HardDrive className="h-5 w-5 text-rose-400" />;
      case 'wifi':
        return <Wifi className="h-5 w-5 text-sky-400" />;
      default:
        return <Brain className="h-5 w-5 text-cyan-400" />;
    }
  };

  const handleSelectOption = (optionId: 'A' | 'B' | 'C' | 'D') => {
    if (selectedOption) return; // already selected for this step
    setSelectedOption(optionId);
    const chosenOpt = question.options.find((o) => o.id === optionId);
    if (chosenOpt?.isOptimal) {
      playSuccessSound();
    } else {
      playWarningSound();
    }
  };

  const handleNext = () => {
    playClickSound();
    if (!selectedOption) return;

    const updatedAnswers = {
      ...answers,
      [question.id]: selectedOption,
    };
    setAnswers(updatedAnswers);
    setSelectedOption(null);

    if (isLastQuestion) {
      const profile = evaluateSkillCheck(updatedAnswers);
      setCalculatedProfile(profile);
      setIsCompleted(true);
      playSuccessSound();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleFinishCalibration = () => {
    if (calculatedProfile) {
      playSuccessSound();
      onComplete(calculatedProfile);
    }
  };

  return (
    <div
      id="cyber-skill-check-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="cyber-skill-check-card"
        className="relative w-full max-w-xl rounded-3xl border-2 border-[#2c4063] bg-[#0c1421] text-slate-100 shadow-2xl p-5 sm:p-7 overflow-hidden"
      >
        {/* Subtle decorative background light */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header with Title & Close (if allowed) */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#1c2c44] pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-950/60 shadow-inner text-cyan-300">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  ASSESSMENT // RPG TUTORIAL
                </span>
              </div>
              <h2 className="text-xl font-extrabold uppercase tracking-wide text-white font-sans">
                CYBER SKILL CHECK
              </h2>
              <p className="text-xs text-slate-300 font-medium">
                Let's see how you make decisions online.
              </p>
            </div>
          </div>

          {onClose && (
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close Skill Check"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* CONTENT STAGE 1: ACTIVE QUESTIONS */}
        {!isCompleted && question && (
          <div className="relative z-10 space-y-4">
            {/* Progress Bar & Counter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">
                  SITUATION {currentQuestionIndex + 1} OF {SKILL_CHECK_QUESTIONS.length}
                </span>
                <span className="text-cyan-400 font-bold">
                  {Math.round(((currentQuestionIndex + 1) / SKILL_CHECK_QUESTIONS.length) * 100)}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800/80 border border-slate-700/50">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300 rounded-full"
                  style={{
                    width: `${((currentQuestionIndex + 1) / SKILL_CHECK_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Scenario Box */}
            <div className="rounded-2xl border border-[#203450] bg-[#121c2d] p-4 sm:p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-2">
                {getQuestionIcon(question.iconType)}
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold">
                  {question.categoryLabel}
                </span>
              </div>
              <p className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed">
                "{question.scenario}"
              </p>
              <div className="pt-1 text-xs sm:text-sm font-bold text-amber-300">
                👉 {question.prompt}
              </div>
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {question.options.map((option) => {
                const isSelected = selectedOption === option.id;
                let optionStyle =
                  'border-slate-700/80 bg-slate-900/70 hover:bg-slate-800/90 text-slate-200 hover:border-cyan-400/60';

                if (selectedOption) {
                  if (option.isOptimal) {
                    optionStyle =
                      'border-emerald-500/80 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500/50';
                  } else if (isSelected && !option.isOptimal) {
                    optionStyle =
                      'border-rose-500/80 bg-rose-950/40 text-rose-200 ring-1 ring-rose-500/50';
                  } else {
                    optionStyle = 'border-slate-800 bg-slate-950/40 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    disabled={Boolean(selectedOption)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-mono font-bold ${
                        isSelected
                          ? option.isOptimal
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-rose-500 text-white'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {option.id}
                    </span>
                    <div className="flex-1 text-xs sm:text-sm font-medium leading-snug">
                      {option.text}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Revealed Educational Insight after Selection */}
            {selectedOption && (
              <div className="rounded-2xl border border-cyan-800/50 bg-[#0d1c2d] p-3.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                      TACTICAL INSIGHT:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                      {question.options.find((o) => o.id === selectedOption)?.explanation}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex justify-end">
                  <button
                    id="skill-check-next-btn"
                    onClick={handleNext}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    <span>{isLastQuestion ? 'SEE MY CYBER PROFILE' : 'NEXT SITUATION'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CONTENT STAGE 2: RESULTS & PERSONAL CYBER PROFILE */}
        {isCompleted && calculatedProfile && (
          <div className="relative z-10 space-y-5 animate-in zoom-in-95 fade-in duration-300">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-400/40 bg-emerald-950/50 text-emerald-300 text-xs font-mono font-bold">
                <Award className="h-3.5 w-3.5" />
                <span>PROFILE CALIBRATED</span>
              </div>
              <h3 className="text-xl font-black text-white uppercase font-sans">
                YOUR CYBER PROFILE
              </h3>
              <p className="text-xs text-slate-300 font-sans">
                Based on your decisions, here are your starting cybersecurity instincts.
              </p>
            </div>

            {/* Visual Skill Matrix Meters */}
            <div className="space-y-3 rounded-2xl border border-[#21334f] bg-[#101927] p-4 sm:p-5">
              <div className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider mb-2">
                TACTICAL CAPABILITIES
              </div>

              {/* Phishing Awareness */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">🎣 Phishing Awareness</span>
                  <span className="text-cyan-400 font-bold">{calculatedProfile.phishing}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full bg-cyan-400 rounded-full transition-all duration-700"
                    style={{ width: `${calculatedProfile.phishing}%` }}
                  />
                </div>
              </div>

              {/* Privacy & Passwords */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">🔐 Privacy &amp; Passwords</span>
                  <span className="text-purple-400 font-bold">{calculatedProfile.privacy}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full bg-purple-400 rounded-full transition-all duration-700"
                    style={{ width: `${calculatedProfile.privacy}%` }}
                  />
                </div>
              </div>

              {/* Device Security */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">🛡️ Device &amp; Hardware Safety</span>
                  <span className="text-emerald-400 font-bold">{calculatedProfile.deviceSecurity}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full bg-emerald-400 rounded-full transition-all duration-700"
                    style={{ width: `${calculatedProfile.deviceSecurity}%` }}
                  />
                </div>
              </div>

              {/* Social Engineering */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">🧠 Social Engineering Resistance</span>
                  <span className="text-amber-400 font-bold">
                    {calculatedProfile.socialEngineering}%
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-700"
                    style={{ width: `${calculatedProfile.socialEngineering}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Strengths & Growth Areas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-left">
              <div className="rounded-xl border border-emerald-800/40 bg-emerald-950/20 p-3 space-y-1">
                <span className="font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  YOUR STRENGTH
                </span>
                <p className="text-slate-200 font-sans leading-snug">
                  {calculatedProfile.topStrengthSentence ||
                    calculatedProfile.demonstratedStrengths[0] ||
                    'You are good at protecting personal information.'}
                </p>
              </div>

              <div className="rounded-xl border border-amber-800/40 bg-amber-950/20 p-3 space-y-1">
                <span className="font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  AREA TO IMPROVE
                </span>
                <p className="text-slate-200 font-sans leading-snug">
                  {calculatedProfile.improvementAreaSentence ||
                    calculatedProfile.demonstratedWeaknesses[0] ||
                    'You sometimes trust urgent messages too quickly.'}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                id="confirm-cyber-profile-btn"
                onClick={handleFinishCalibration}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm sm:text-base tracking-wide shadow-xl shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <span>APPLY PROFILE &amp; CONTINUE</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
