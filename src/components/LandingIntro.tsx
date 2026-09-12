import React, { useState } from 'react';
import {
  Play,
  Brain,
  Volume2,
  VolumeX,
  Shield,
  Compass,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  HardDrive,
  Wifi,
  User,
  RotateCcw,
  HelpCircle,
  Eye,
  Scale,
  BookOpen,
  MessageSquare,
  Award,
} from 'lucide-react';
import { PlayerState, MissionData, CyberSkillProfile } from '../types';
import { SKILL_CHECK_QUESTIONS, evaluateSkillCheck } from '../data/skillCheckQuestions';
import {
  playClickSound,
  playSuccessSound,
  playWarningSound,
  playInspectSound,
} from '../utils/audio';
import { useAdaptiveScreen } from '../hooks/useAdaptiveScreen';

// Miniature 2D RPG World Diorama (Adventure Beginning Feeling)
const RpgDioramaPreview: React.FC<{ isCompact?: boolean }> = ({ isCompact = false }) => {
  return (
    <div
      id="intro-adventure-diorama"
      className={`relative w-full ${
        isCompact ? 'h-40 sm:h-44' : 'h-48 sm:h-52 lg:h-64'
      } rounded-2xl border-2 border-slate-700/70 bg-gradient-to-b from-[#182638] via-[#142030] to-[#0d1624] shadow-xl overflow-hidden flex items-end justify-center`}
    >
      {/* Sky elements */}
      <div className="absolute top-3 left-4 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-200/80 animate-pulse" />
        <div className="w-1 h-1 rounded-full bg-sky-200/60 ml-4 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-200/70 ml-8 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="absolute top-3 right-5 flex items-center gap-1 opacity-75">
        <Wifi className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
        <span className="text-[9px] font-mono text-cyan-300 font-bold">CAMPUS SECTOR</span>
      </div>

      {/* Ground Grass & Cobblestone Path */}
      <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[#1b4332] via-[#2d6a4f] to-[#40916c] border-t-2 border-[#52b788]/50" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 sm:w-56 h-12 bg-[#334155] border-t-2 border-x-2 border-[#475569] rounded-t-xl overflow-hidden shadow-inner flex flex-col justify-around px-2 py-0.5">
        <div className="flex justify-around">
          <div className="w-6 h-2 bg-[#64748b]/50 rounded-xs" />
          <div className="w-8 h-2 bg-[#475569] rounded-xs" />
          <div className="w-6 h-2 bg-[#64748b]/50 rounded-xs" />
        </div>
        <div className="flex justify-around">
          <div className="w-8 h-2 bg-[#475569] rounded-xs" />
          <div className="w-6 h-2 bg-[#64748b]/50 rounded-xs" />
          <div className="w-8 h-2 bg-[#475569] rounded-xs" />
        </div>
      </div>

      {/* Tree on left */}
      <div className="absolute bottom-4 left-4 flex flex-col items-center pointer-events-none">
        <div className="w-9 h-9 rounded-full bg-[#2d6a4f] border border-[#1b4332]" />
        <div className="w-12 h-10 rounded-full bg-[#40916c] -mt-5" />
        <div className="w-2.5 h-4 bg-[#543821] -mt-1 rounded-b" />
      </div>

      {/* Cyber Terminal on right */}
      <div className="absolute bottom-4 right-4 flex flex-col items-center pointer-events-none">
        <div className="w-8 h-7 rounded-lg bg-[#0f172a] border-2 border-cyan-400/90 shadow-md flex items-center justify-center">
          <Shield className="h-3.5 w-3.5 text-cyan-300" />
        </div>
        <div className="w-2 h-2 bg-[#334155]" />
        <div className="w-9 h-1.5 bg-[#1e293b] rounded-t-xs" />
      </div>

      {/* Hero Avatar In Center */}
      <div className="relative z-10 flex flex-col items-center mb-2">
        <div className="w-10 h-2.5 bg-black/45 rounded-full blur-[1px] translate-y-2" />
        <div className="relative w-11 h-13 animate-bounce" style={{ animationDuration: '2.4s' }}>
          <svg viewBox="0 0 36 40" className="w-11 h-13 drop-shadow-md" fill="none">
            <rect x="10" y="27" width="5" height="7" rx="1" fill="#202938" />
            <rect x="9.5" y="33" width="6" height="4.5" rx="1.5" fill="#f8fafc" stroke="#334155" strokeWidth="0.8" />
            <rect x="21" y="27" width="5" height="7" rx="1" fill="#202938" />
            <rect x="20.5" y="33" width="6" height="4.5" rx="1.5" fill="#f8fafc" stroke="#334155" strokeWidth="0.8" />
            <rect x="8.5" y="15" width="19" height="13" rx="2.5" fill="#0369a1" stroke="#075985" strokeWidth="1" />
            <line x1="10" y1="16" x2="26" y2="26" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="13" cy="20" r="1.8" fill="#fbbf24" stroke="#d97706" strokeWidth="0.6" />
            <rect x="11" y="7" width="14" height="11" rx="3.5" fill="#fed7aa" />
            <path d="M10 9 C10 3, 26 3, 26 9 C26 12, 24 10, 22 10 C20 10, 19 8, 17 10 C15 11, 13 9, 10 9 Z" fill="#78350f" />
            <ellipse cx="14" cy="12" rx="1.2" ry="1.8" fill="#1e293b" />
            <circle cx="14.3" cy="11.4" r="0.5" fill="#ffffff" />
            <ellipse cx="22" cy="12" rx="1.2" ry="1.8" fill="#1e293b" />
            <circle cx="22.3" cy="11.4" r="0.5" fill="#ffffff" />
            <path d="M16.5 15 Q18 16.2 19.5 15" stroke="#9a3412" strokeWidth="0.8" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

interface LandingIntroProps {
  player: PlayerState;
  nextMission?: MissionData;
  onStartAdventure: () => void;
  onOpenScenarioOps?: () => void;
  onOpenHowItWorks: () => void;
  onOpenSkillCheck?: () => void;
  onNavigate?: (tab: 'world' | 'abilities' | 'evidence' | 'profile') => void;
  soundMuted?: boolean;
  onToggleSound?: () => void;
  onCompleteSkillCheck?: (profile: CyberSkillProfile) => void;
  onResetProgress?: () => void;
}

type OnboardingStep = 'intro' | 'skill-check' | 'profile' | 'mentor-intro';

export const LandingIntro: React.FC<LandingIntroProps> = ({
  player,
  onStartAdventure,
  onOpenScenarioOps,
  onOpenHowItWorks,
  onOpenSkillCheck,
  onNavigate,
  soundMuted,
  onToggleSound,
  onCompleteSkillCheck,
  onResetProgress,
}) => {
  // Responsive screen characteristics detection
  const screen = useAdaptiveScreen();
  // Desktop/Laptop or wide tablet gets the spacious 2-column hero composition
  const isWideHero =
    screen.isLargeDesktop ||
    screen.isLaptop ||
    (screen.isTablet && screen.isLandscape && screen.viewportWidth >= 900);

  // If player has already completed skill check, they are a returning user!
  const isReturningUser = Boolean(player.skillCheckCompleted);

  // New User Onboarding steps: intro -> skill-check -> profile -> mentor-intro
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('intro');

  // Skill Check Interactive State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [calculatedProfile, setCalculatedProfile] = useState<CyberSkillProfile | null>(null);

  const currentQuestion = SKILL_CHECK_QUESTIONS[currentQuestionIdx];
  const isLastQuestion = currentQuestionIdx === SKILL_CHECK_QUESTIONS.length - 1;

  // Question icon helper
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

  const handleStartJourneyClick = () => {
    playClickSound();
    setOnboardingStep('skill-check');
  };

  const handleSelectOption = (optId: 'A' | 'B' | 'C' | 'D') => {
    if (selectedOption) return; // already selected for this question
    setSelectedOption(optId);
    const chosen = currentQuestion.options.find((o) => o.id === optId);
    if (chosen?.isOptimal) {
      playSuccessSound();
    } else {
      playWarningSound();
    }
  };

  const handleNextQuestion = () => {
    playClickSound();
    if (!selectedOption) return;

    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: selectedOption,
    };
    setAnswers(nextAnswers);
    setSelectedOption(null);

    if (isLastQuestion) {
      const profile = evaluateSkillCheck(nextAnswers);
      setCalculatedProfile(profile);
      setOnboardingStep('profile');
      playSuccessSound();
    } else {
      setCurrentQuestionIdx((prev) => prev + 1);
    }
  };

  const handleProceedToMentorIntro = () => {
    playSuccessSound();
    setOnboardingStep('mentor-intro');
  };

  const handleEnterCyberMentorGame = () => {
    playSuccessSound();
    if (calculatedProfile && onCompleteSkillCheck) {
      onCompleteSkillCheck(calculatedProfile);
    }
    // Enter the existing RPG world (Campus)
    onStartAdventure();
  };

  // Helper for rendering 10-block visual score bar with responsive sizing
  const renderVisualBlocks = (score: number, colorClass: string) => {
    const filledCount = Math.min(10, Math.max(1, Math.round(score / 10)));
    return (
      <div className="flex items-center gap-1 sm:gap-1.5 flex-nowrap">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className={`h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-3.5 sm:w-3.5 rounded-xs shrink-0 transition-all ${
              i < filledCount ? colorClass : 'bg-slate-800/80 border border-slate-700/40'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      id="landing-page-root"
      className={`relative flex min-h-screen min-h-[100dvh] w-full flex-col items-center justify-center bg-[#0d1522] text-[#f1f5f9] select-none overflow-x-hidden ${
        screen.isShortScreen ? 'px-3 sm:px-6 py-4 sm:py-6' : 'px-4 sm:px-8 py-8 sm:py-12'
      }`}
    >
      {/* Soft warm background atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[400px] rounded-full bg-sky-900/20 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[450px] h-[250px] rounded-full bg-emerald-950/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, #94a3b8 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      {/* Top Bar with audio toggle */}
      {onToggleSound && (
        <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20">
          <button
            id="landing-sound-toggle-btn"
            onClick={() => {
              playClickSound();
              onToggleSound();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700/60 bg-slate-900/60 hover:bg-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors backdrop-blur-xs cursor-pointer"
            title={soundMuted ? 'Turn Sound On' : 'Turn Sound Off'}
            aria-label="Toggle game audio"
          >
            {soundMuted ? (
              <>
                <VolumeX className="h-4 w-4 text-slate-400" />
                <span className="hidden sm:inline">Sound Off</span>
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4 text-emerald-400" />
                <span className="hidden sm:inline">Sound On</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* =========================================================================
          CASE A: RETURNING USER FLOW
          If the user has already completed the Skill Check:
          DO NOT show the intro page again.
          DO NOT make them repeat the Skill Check.
          Show clean returning-user entry: WELCOME BACK -> [ CONTINUE ]
          ========================================================================= */}
      {isReturningUser ? (
        <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="mb-6">
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              OPERATIVE PROFILE ACTIVE
            </span>
            <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-sans">
              WELCOME BACK
            </h1>
            <p className="mt-1.5 text-base sm:text-lg text-slate-300 font-medium">
              Continue your CyberMentor journey.
            </p>
          </div>

          {/* Operative Status Card */}
          <div className="w-full rounded-2xl border-2 border-[#223552] bg-[#111c2c] p-5 shadow-xl mb-6 text-left">
            <div className="flex items-center justify-between border-b border-[#1b2c45] pb-3 mb-4">
              <div className="flex items-center gap-3">
                {/* 2D Sprite Avatar */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/60 bg-[#17263c] shadow-xs">
                  <svg width="26" height="26" viewBox="0 0 32 32">
                    <rect x="6" y="5" width="20" height="9" rx="3" fill="#92400e" />
                    <rect x="7" y="10" width="18" height="13" rx="3" fill="#e2b992" />
                    <rect x="10" y="14" width="3" height="3" fill="#0f172a" />
                    <rect x="19" y="14" width="3" height="3" fill="#0f172a" />
                    <rect x="13" y="19" width="6" height="1.5" rx="0.5" fill="#c2410c" />
                    <rect x="8" y="23" width="16" height="7" rx="2" fill="#0284c7" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-white uppercase tracking-wide font-mono">
                    OPERATIVE {player.name}
                  </div>
                  <div className="text-xs text-cyan-300 font-sans">
                    Level {player.level} • {player.title}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">
                  DIGITAL TRUST
                </span>
                <span className="text-sm sm:text-base font-bold font-mono text-amber-300">
                  🛡️ {player.digitalTrust} / 100
                </span>
              </div>
            </div>

            {/* Quick Summary */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-[#0d1624] border border-[#1b2b42]">
                <span className="text-slate-400 block text-[10px] uppercase">
                  Missions Resolved
                </span>
                <span className="text-slate-100 font-bold text-sm">
                  {player.completedMissions.length}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0d1624] border border-[#1b2b42]">
                <span className="text-slate-400 block text-[10px] uppercase">
                  Evidence Logged
                </span>
                <span className="text-slate-100 font-bold text-sm">
                  {player.evidence.length}
                </span>
              </div>
            </div>
          </div>

          {/* Primary Action Button: CONTINUE */}
          <button
            id="returning-continue-btn"
            onClick={() => {
              playClickSound();
              onStartAdventure();
            }}
            className="w-full group relative flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base sm:text-lg shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all duration-150 cursor-pointer border border-emerald-300/60"
          >
            <Play className="h-5 w-5 fill-slate-950 transition-transform group-hover:scale-110" />
            <span>CONTINUE</span>
          </button>

          {/* Secondary Options */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 text-xs">
            {onOpenScenarioOps && (
              <button
                id="returning-scenario-ops-btn"
                onClick={() => {
                  playClickSound();
                  onOpenScenarioOps();
                }}
                className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-amber-300 hover:text-amber-200 transition-colors font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <Brain className="h-3.5 w-3.5" />
                <span>Scenario Ops</span>
              </button>
            )}

            {onNavigate && (
              <button
                id="returning-dossier-btn"
                onClick={() => {
                  playClickSound();
                  onNavigate('profile');
                }}
                className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-cyan-300 hover:text-cyan-200 transition-colors font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <User className="h-3.5 w-3.5" />
                <span>Operative Dossier</span>
              </button>
            )}

            {onOpenSkillCheck && (
              <button
                id="returning-retake-skillcheck-btn"
                onClick={() => {
                  playClickSound();
                  onOpenSkillCheck();
                }}
                className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-colors font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Retake Skill Check</span>
              </button>
            )}
          </div>

          {/* Reset progress */}
          {onResetProgress && (
            <div className="mt-8 pt-4 border-t border-slate-800/60 w-full flex justify-center">
              <button
                id="returning-reset-btn"
                onClick={() => {
                  playClickSound();
                  onResetProgress();
                }}
                className="text-[11px] font-mono text-slate-500 hover:text-rose-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Start Fresh as New Recruit</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* =========================================================================
            CASE B: NEW USER FLOW
            FIRST EXPLAIN -> THEN ASSESS -> THEN PERSONALIZE -> THEN ENTER THE GAME
            ========================================================================= */
        <div
          className={`relative z-10 mx-auto flex w-full flex-col items-center ${
            onboardingStep === 'intro' ? 'max-w-5xl xl:max-w-6xl' : 'max-w-2xl'
          }`}
        >
          {/* -------------------------------------------------------------
              STEP 1: WELCOME / INTRO PAGE
              Explain the experience, What will I do here?, Why CyberMentor AI?
              ------------------------------------------------------------- */}
          {onboardingStep === 'intro' && (
            <div className="w-full flex flex-col items-center animate-in fade-in duration-200">
              {/* TOP HERO COMPOSITION:
                  DESKTOP/LAPTOP: 2-COLUMN HERO (Intro content on left, RPG preview on right, CTA immediately visible)
                  TABLET/MOBILE: CLEAN STACKED HERO */}
              {isWideHero ? (
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-6 lg:mb-8 text-left">
                  {/* Left Column: Title, Tagline, Description, and Prominent CTA */}
                  <div className="lg:col-span-7 flex flex-col justify-center space-y-3 lg:space-y-4">
                    <div className="space-y-1.5">
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase font-sans leading-tight">
                        CYBERMENTOR <span className="text-cyan-400">AI</span>
                      </h1>
                      <p className="text-base sm:text-lg lg:text-xl font-bold text-amber-400 italic">
                        "Your decisions leave a trace."
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed max-w-xl">
                      CyberMentor AI is an interactive cybersecurity learning experience where you learn
                      by making decisions in realistic digital situations.
                    </p>

                    {/* Primary CTA in Hero (Instantly visible above the fold on laptop/desktop!) */}
                    <div className="pt-2">
                      <button
                        id="start-your-journey-btn"
                        onClick={handleStartJourneyClick}
                        className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-slate-950 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-150 cursor-pointer border border-emerald-300/70 text-base lg:text-lg font-black tracking-wide uppercase font-sans"
                      >
                        <span>START YOUR JOURNEY</span>
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: RPG Diorama Preview */}
                  <div className="lg:col-span-5 w-full flex justify-center">
                    <RpgDioramaPreview isCompact={screen.isShortScreen} />
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center text-center space-y-3 sm:space-y-4 mb-5">
                  {/* Main Heading & Tagline */}
                  <div className="space-y-1.5">
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase font-sans">
                      CYBERMENTOR <span className="text-cyan-400">AI</span>
                    </h1>
                    <p className="text-sm sm:text-base font-bold text-amber-400 italic">
                      "Your decisions leave a trace."
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      CyberMentor AI is an interactive cybersecurity learning experience where you learn
                      by making decisions in realistic digital situations.
                    </p>
                  </div>

                  {/* Miniature 2D RPG World Diorama */}
                  <div className="w-full max-w-md">
                    <RpgDioramaPreview isCompact />
                  </div>
                </div>
              )}

              {/* 3 Steps: WHAT WILL I DO HERE? (EXPLORE | DECIDE | LEARN) */}
              <div className="w-full mb-5 lg:mb-7">
                <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2.5 text-center lg:text-left">
                  WHAT WILL YOU DO HERE?
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4 text-left">
                  <div className="p-3.5 sm:p-4 rounded-2xl border border-[#213550] bg-[#111c2c]/90 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                          <Compass className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold text-white uppercase font-sans">
                          EXPLORE
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-snug">
                        Explore a digital world and discover different situations.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-2xl border border-[#213550] bg-[#111c2c]/90 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                          <Scale className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold text-white uppercase font-sans">
                          DECIDE
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-snug">
                        Investigate clues, think carefully and choose what you would do.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-2xl border border-[#213550] bg-[#111c2c]/90 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold text-white uppercase font-sans">
                          LEARN
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-snug">
                        See the consequences of your decisions and learn from the AI Mentor.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-xs sm:text-sm font-semibold text-amber-300 font-sans text-center">
                  "Your journey changes based on the decisions you make."
                </div>
              </div>

              {/* LOWER BALANCED SECTION (WHY CYBERMENTOR AI? & HOW THE EXPERIENCE WORKS) */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 mb-6 text-left items-stretch">
                {/* WHY CYBERMENTOR AI? */}
                <div className="lg:col-span-5 p-4 sm:p-5 rounded-2xl border border-sky-800/40 bg-[#0e1929]/80 space-y-1.5 flex flex-col justify-center">
                  <div className="text-[11px] font-mono font-bold text-sky-400 uppercase tracking-wider">
                    WHY CYBERMENTOR AI?
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-200">
                    "Being comfortable online doesn't always mean being safe online."
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    CyberMentor AI helps you practice recognizing threats, thinking before you act,
                    and making responsible digital decisions.
                  </p>
                </div>

                {/* HOW THE EXPERIENCE WORKS (Visual Flow) */}
                <div className="lg:col-span-7 p-4 sm:p-5 rounded-2xl border border-slate-700/60 bg-[#111c2c]/80 flex flex-col justify-center space-y-2">
                  <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    HOW THE EXPERIENCE WORKS
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono font-bold">
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-950/70 border border-cyan-700/60 text-cyan-300">
                      EXPLORE
                    </span>
                    <span className="text-slate-500">→</span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
                      ENCOUNTER
                    </span>
                    <span className="text-slate-500">→</span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
                      INVESTIGATE
                    </span>
                    <span className="text-slate-500">→</span>
                    <span className="px-2.5 py-1 rounded-lg bg-amber-950/70 border border-amber-700/60 text-amber-300">
                      DECIDE
                    </span>
                    <span className="text-slate-500">→</span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
                      CONSEQUENCE
                    </span>
                    <span className="text-slate-500">→</span>
                    <span className="px-2.5 py-1 rounded-lg bg-purple-950/70 border border-purple-700/60 text-purple-300">
                      AI DEBRIEF
                    </span>
                    <span className="text-slate-500">→</span>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-950/70 border border-emerald-700/60 text-emerald-300">
                      IMPROVE
                    </span>
                  </div>
                </div>
              </div>

              {/* PRIMARY BUTTON ON MOBILE / TABLET PORTRAIT (Full width, touch target >= 48px, pb-safe) */}
              {!isWideHero && (
                <div className="w-full pb-safe">
                  <button
                    id="start-your-journey-btn-mobile"
                    onClick={handleStartJourneyClick}
                    className="w-full group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-slate-950 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-150 cursor-pointer border border-emerald-300/70 text-base sm:text-lg font-black tracking-wide uppercase font-sans touch-target"
                  >
                    <span>START YOUR JOURNEY</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* -------------------------------------------------------------
              STEP 2: CYBER SKILL CHECK (5 QUESTIONS, ONE AT A TIME)
              Interactive game feel, not a school examination!
              ------------------------------------------------------------- */}
          {onboardingStep === 'skill-check' && currentQuestion && (
            <div className="w-full animate-in fade-in zoom-in-95 duration-200">
              {/* Header */}
              <div className="text-center mb-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-400/40 bg-cyan-950/60 text-cyan-300 text-xs font-mono font-bold mb-1.5">
                  <Brain className="h-3.5 w-3.5" />
                  <span>STEP 1 // SKILL CHECK</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide font-sans">
                  CYBER SKILL CHECK
                </h2>
                <p className="text-xs sm:text-sm text-cyan-300 font-medium mt-0.5">
                  Before your journey begins, let's see how you make decisions online.
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  There are 5 short situations. Choose what you think you would really do.
                </p>
              </div>

              {/* Progress Indicator: Dots + Question count */}
              <div className="mb-4 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  {SKILL_CHECK_QUESTIONS.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-all ${
                        idx === currentQuestionIdx
                          ? 'bg-cyan-400 scale-125 ring-2 ring-cyan-400/50'
                          : idx < currentQuestionIdx
                          ? 'bg-emerald-400'
                          : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-mono font-bold text-slate-300">
                  QUESTION {currentQuestionIdx + 1} OF {SKILL_CHECK_QUESTIONS.length}
                </span>
              </div>

              {/* Question Card */}
              <div className="rounded-3xl border-2 border-[#263b5c] bg-[#101a2a] p-5 sm:p-6 shadow-2xl space-y-4 mb-4">
                {/* Category & Icon */}
                <div className="flex items-center gap-2 border-b border-[#1b2b42] pb-3">
                  {getQuestionIcon(currentQuestion.iconType)}
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold">
                    {currentQuestion.categoryLabel}
                  </span>
                </div>

                {/* Scenario Description */}
                <p className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed">
                  "{currentQuestion.scenario}"
                </p>

                {/* Prompt */}
                <div className="text-xs sm:text-sm font-bold text-amber-300 pt-1">
                  👉 {currentQuestion.prompt}
                </div>

                {/* Large Answer Choices */}
                <div className="space-y-2.5 pt-1">
                  {currentQuestion.options.map((option) => {
                    const isSelected = selectedOption === option.id;
                    let btnStyle =
                      'border-slate-700/80 bg-[#162438] hover:bg-[#1d2f47] text-slate-200 hover:border-cyan-400/70';

                    if (selectedOption) {
                      if (option.isOptimal) {
                        btnStyle =
                          'border-emerald-500 bg-emerald-950/50 text-emerald-100 ring-2 ring-emerald-500/50';
                      } else if (isSelected && !option.isOptimal) {
                        btnStyle =
                          'border-rose-500 bg-rose-950/50 text-rose-100 ring-2 ring-rose-500/50';
                      } else {
                        btnStyle = 'border-slate-800 bg-slate-950/40 text-slate-500 opacity-50';
                      }
                    }

                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelectOption(option.id)}
                        disabled={Boolean(selectedOption)}
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 cursor-pointer ${btnStyle}`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-xs font-mono font-bold ${
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

                {/* Instant Feedback & Advance */}
                {selectedOption && (
                  <div className="rounded-2xl border border-cyan-800/60 bg-[#0c1827] p-4 animate-in fade-in slide-in-from-bottom-2 duration-200 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <Sparkles className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] font-mono font-bold text-cyan-300 uppercase block mb-0.5">
                          INSIGHT:
                        </span>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                          {currentQuestion.options.find((o) => o.id === selectedOption)?.explanation}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        id="skillcheck-next-situation-btn"
                        onClick={handleNextQuestion}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                      >
                        <span>{isLastQuestion ? 'SEE MY STARTING PROFILE' : 'NEXT SITUATION'}</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              STEP 3: INITIAL CYBER PROFILE (YOUR STARTING PROFILE)
              Visual skill areas, strength + improvement area
              ------------------------------------------------------------- */}
          {onboardingStep === 'profile' && calculatedProfile && (
            <div className="w-full animate-in zoom-in-95 fade-in duration-300 space-y-5">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-400/40 bg-emerald-950/60 text-emerald-300 text-xs font-mono font-bold">
                  <Award className="h-3.5 w-3.5" />
                  <span>ASSESSMENT COMPLETE</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-sans">
                  YOUR STARTING PROFILE
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Here is how you currently handle digital risks and decisions.
                </p>
              </div>

              {/* Simple Visual Skill Indicators (10 visual blocks + percent) */}
              <div className="rounded-3xl border-2 border-[#243754] bg-[#101a2a] p-5 sm:p-6 shadow-2xl space-y-4 text-left">
                <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider border-b border-[#1b2a40] pb-2">
                  STARTING CAPABILITIES
                </div>

                {/* 1. Phishing Awareness */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-200 font-bold">🎣 Phishing Awareness</span>
                    <span className="text-cyan-400 font-bold">{calculatedProfile.phishing}%</span>
                  </div>
                  {renderVisualBlocks(calculatedProfile.phishing, 'bg-cyan-400')}
                </div>

                {/* 2. Privacy & Password Safety */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-200 font-bold">🔐 Privacy &amp; Password Safety</span>
                    <span className="text-purple-400 font-bold">{calculatedProfile.privacy}%</span>
                  </div>
                  {renderVisualBlocks(calculatedProfile.privacy, 'bg-purple-400')}
                </div>

                {/* 3. Device Safety */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-200 font-bold">📱 Device Safety</span>
                    <span className="text-emerald-400 font-bold">
                      {calculatedProfile.deviceSecurity}%
                    </span>
                  </div>
                  {renderVisualBlocks(calculatedProfile.deviceSecurity, 'bg-emerald-400')}
                </div>

                {/* 4. Social Engineering */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-200 font-bold">🧠 Social Engineering</span>
                    <span className="text-amber-400 font-bold">
                      {calculatedProfile.socialEngineering}%
                    </span>
                  </div>
                  {renderVisualBlocks(calculatedProfile.socialEngineering, 'bg-amber-400')}
                </div>
              </div>

              {/* STRENGTH + IMPROVEMENT AREA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <div className="rounded-2xl border border-emerald-700/50 bg-emerald-950/30 p-4 space-y-1">
                  <span className="font-mono font-bold text-emerald-400 text-xs uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    YOUR STRENGTH
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                    {calculatedProfile.topStrengthSentence ||
                      'You are good at protecting personal information.'}
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-700/50 bg-amber-950/30 p-4 space-y-1">
                  <span className="font-mono font-bold text-amber-400 text-xs uppercase flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" />
                    AREA TO IMPROVE
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                    {calculatedProfile.improvementAreaSentence ||
                      'You sometimes trust urgent messages too quickly.'}
                  </p>
                </div>
              </div>

              {/* Advance to AI Mentor */}
              <div className="pt-2">
                <button
                  id="meet-ai-mentor-btn"
                  onClick={handleProceedToMentorIntro}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm sm:text-base tracking-wide shadow-xl shadow-cyan-500/20 transition-all cursor-pointer"
                >
                  <span>MEET YOUR AI MENTOR</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              STEP 4: AI MENTOR INTRODUCTION
              Character introduction dialogue & Enter RPG world
              ------------------------------------------------------------- */}
          {onboardingStep === 'mentor-intro' && (
            <div className="w-full animate-in zoom-in-95 fade-in duration-300 space-y-6">
              {/* Character Visual: Holographic AI Mentor Core */}
              <div className="flex flex-col items-center">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-cyan-400 bg-gradient-to-b from-cyan-950/80 to-[#0c1626] shadow-[0_0_25px_rgba(6,182,212,0.35)]">
                  {/* Outer Pulsing Aura */}
                  <div className="absolute inset-0 rounded-3xl border border-cyan-300/40 animate-ping opacity-30" />
                  {/* Floating AI Core Icon */}
                  <Brain className="h-10 w-10 text-cyan-300 animate-pulse" />
                </div>
                <div className="mt-3 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                  CYBERMENTOR AI // ADAPTIVE GUIDE
                </div>
              </div>

              {/* Dialogue Box */}
              <div className="rounded-3xl border-2 border-cyan-500/60 bg-[#0e1929] p-6 sm:p-7 shadow-2xl text-left space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="text-xs font-mono font-black text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>AI MENTOR</span>
                </div>

                <div className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed space-y-3 font-medium">
                  <p>"Nice work.</p>
                  <p>I've learned a little about how you make decisions online.</p>
                  <p>
                    As you explore CyberMentor, I'll help you understand what you did well, where you
                    can improve, and why your decisions matter."
                  </p>
                </div>
              </div>

              {/* Enter CyberMentor Button */}
              <button
                id="enter-cybermentor-final-btn"
                onClick={handleEnterCyberMentorGame}
                className="w-full group relative flex items-center justify-center gap-3 py-4 sm:py-4.5 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base sm:text-lg tracking-wide uppercase shadow-2xl shadow-emerald-500/30 transition-all cursor-pointer border border-emerald-300/70"
              >
                <span>ENTER CYBERMENTOR</span>
                <Play className="h-5 w-5 fill-slate-950 transition-transform group-hover:scale-110" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
