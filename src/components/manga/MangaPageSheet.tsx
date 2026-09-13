import React, { useState } from 'react';
import { CyberMangaComic, MangaDecisionOption, MangaPanel, MangaVisualClue } from '../../types/manga';
import {
  SceneEstablishingWalk,
  ScenePhoneAlertMedium,
  SceneSuspicionCloseup,
  SceneOverTheShoulderPhone,
  SceneFingerHoverHesitation,
  SceneCyberMentorArrival,
  SceneActionConsequence,
} from './art/MangaSeinenScenes';
import { ZoomIn, X, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';
import { playClickSound, playInspectSound } from '../../utils/audio';

interface MangaPageSheetProps {
  pageNumber: number;
  totalPages: number;
  comic: CyberMangaComic;
  selectedOption: MangaDecisionOption | null;
  onSelectDecision: (option: MangaDecisionOption) => void;
  studentName?: string;
}

export const MangaPageSheet: React.FC<MangaPageSheetProps> = ({
  pageNumber,
  totalPages,
  comic,
  selectedOption,
  onSelectDecision,
  studentName = 'Saurav',
}) => {
  // Inspect clue modal state
  const [zoomedClue, setZoomedClue] = useState<MangaVisualClue | null>(null);

  // Extract primary clue from panels
  const primaryClue =
    comic.panels.find((p) => p.visualClue)?.visualClue || {
      type: 'domain',
      label: 'TYPOSQUATTED DOMAIN',
      displayValue: 'admin-verify@un1versity-portal.xyz',
      highlightSubstring: 'un1versity-portal.xyz',
      flawExplanation: 'Notice the number "1" replacing "i" and the illegitimate ".xyz" top-level domain!',
      isAnomaly: true,
    };

  // Dynamic panel shortcuts
  const p1 = comic.panels[0];
  const p2 = comic.panels[1];
  const p3 = comic.panels[2];
  const p4 = comic.panels[3];
  const p5 = comic.panels[4];
  const p7 = comic.panels[6];

  return (
    <div className="w-full max-w-4xl mx-auto my-3 sm:my-6 px-1 sm:px-4 select-none animate-fadeIn">
      {/* Authentic Manga Page Container (Off-black border with pure manga paper texture) */}
      <div className="relative rounded-2xl overflow-hidden bg-[#090d16] border-4 border-slate-700 shadow-[0_12px_40px_rgba(0,0,0,0.8)]">
        {/* Manga Page Running Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#0e1422] border-b-2 border-slate-800 text-[11px] font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="text-cyan-400 font-bold uppercase tracking-wider">
              {comic.title}
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400 hidden sm:inline">PROTAGONIST: {studentName.toUpperCase()}</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-[10px] font-black tracking-widest text-slate-300">
              PAGE {pageNumber} OF {totalPages}
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PAGE 1: THE THREAT EMERGES (INCITING INCIDENT)              */}
        {/* Multi-panel layout: Large Establishing Walk + Split Row +   */}
        {/* Intense Suspicion Close-Up                                  */}
        {/* ============================================================ */}
        {pageNumber === 1 && (
          <div className="p-3 sm:p-5 space-y-3 sm:space-y-4 bg-[#090d16]">
            {/* PANEL 1: LARGE CINEMATIC ESTABLISHING WALK */}
            <div className="relative rounded-xl overflow-hidden border-2 border-slate-700 bg-slate-950 aspect-[16/9] sm:aspect-[21/9]">
              <SceneEstablishingWalk
                studentName={studentName}
                backgroundScene={comic.panels[0]?.backgroundScene}
              />

              {/* Panel Number Badge */}
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 border border-slate-700 text-[10px] font-mono font-bold text-white rounded">
                PANEL 01
              </div>

              {/* In-Panel Manga Speech Balloon (Top-Right) */}
              <div className="absolute top-3 right-3 sm:top-5 sm:right-6 max-w-[240px] sm:max-w-[280px]">
                <div className="relative bg-white text-slate-950 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl rounded-tr-none shadow-2xl border-2 border-slate-900 font-sans text-xs sm:text-sm font-semibold leading-snug">
                  "{p1?.speechBubbles?.[0]?.text || "Another semester project submitted... finally time to relax at the cafeteria."}"
                  {/* Tail pointing down toward Saurav */}
                  <div className="absolute -bottom-2.5 right-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-white" />
                </div>
                <div className="text-[10px] font-mono font-bold text-slate-400 text-right pr-2 mt-1">
                  {(p1?.speechBubbles?.[0]?.speaker || studentName).toUpperCase()}
                </div>
              </div>

              {/* In-Panel Scene Time Stamp */}
              <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/85 border border-cyan-500/50 rounded text-[10px] font-mono text-cyan-300 font-bold">
                {p1?.captionBox?.text || p1?.title || 'CAMPUS // DAYTIME'}
              </div>
            </div>

            {/* MIDDLE ROW: SPLIT ACTION PANELS (2 COLUMNS) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {/* PANEL 2: MEDIUM ACTION SHOT // PHONE VIBRATING IN POCKET */}
              <div className="relative rounded-xl overflow-hidden border-2 border-slate-700 bg-slate-950 aspect-[4/3]">
                <ScenePhoneAlertMedium
                  soundEffect={p2?.soundEffect || 'BZZZZT!! URGENT PING!'}
                  studentName={studentName}
                />

                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 border border-slate-700 text-[10px] font-mono font-bold text-white rounded">
                  PANEL 02
                </div>

                {/* Jagged In-Panel Notification Speech Bubble */}
                <div className="absolute top-4 left-4 max-w-[200px]">
                  <div className="bg-rose-950/95 text-rose-200 px-3 py-1.5 rounded-lg border-2 border-rose-500 shadow-xl font-mono text-xs font-bold">
                    ⚡ {p2?.captionBox?.text || 'PRIORITY ALERT RECEIVED!'}
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 max-w-[200px]">
                  <div className="bg-white text-slate-950 px-3 py-1.5 rounded-xl rounded-br-none shadow-2xl border-2 border-slate-900 font-sans text-xs font-semibold">
                    "{p2?.speechBubbles?.[0]?.text || 'A message from administration? At this hour?'}"
                    <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
                  </div>
                </div>
              </div>

              {/* PANEL 3: OVER-THE-SHOULDER LOOKING AT PHONE DISPLAY */}
              <div className="relative rounded-xl overflow-hidden border-2 border-slate-700 bg-slate-950 aspect-[4/3] group">
                <SceneOverTheShoulderPhone clue={p3?.visualClue || primaryClue} />

                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 border border-slate-700 text-[10px] font-mono font-bold text-white rounded">
                  PANEL 03
                </div>

                {/* Interactive Clue Inspect Button */}
                <button
                  onClick={() => {
                    playInspectSound();
                    setZoomedClue(p3?.visualClue || primaryClue);
                  }}
                  className="absolute bottom-3 right-3 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-mono text-xs font-bold flex items-center space-x-1.5 shadow-xl border border-cyan-300 transition-all hover:scale-105"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>INSPECT PHONE CLUE</span>
                </button>
              </div>
            </div>

            {/* PANEL 4: DRAMATIC SUSPICION CLOSE-UP */}
            <div className="relative rounded-xl overflow-hidden border-2 border-slate-700 bg-slate-950 aspect-[16/7] sm:aspect-[21/7]">
              <SceneSuspicionCloseup
                studentName={studentName}
                thoughtText={p4?.speechBubbles?.[0]?.text || p4?.characterAction || "Wait... this doesn't match our university portal."}
              />

              <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 border border-slate-700 text-[10px] font-mono font-bold text-white rounded">
                PANEL 04
              </div>

              {/* Thought Cloud Bubble */}
              <div className="absolute top-4 right-4 sm:right-8 max-w-[260px] sm:max-w-[320px]">
                <div className="relative bg-slate-100 text-slate-950 px-4 py-2.5 rounded-3xl shadow-2xl border-2 border-slate-800 font-sans text-xs sm:text-sm font-semibold italic">
                  💭 "{p4?.speechBubbles?.[0]?.text || "Wait... 'Account deleted in 600 seconds'?! Why does the link look suspicious?"}"
                  <div className="absolute -bottom-2 left-6 w-3 h-3 bg-slate-100 rounded-full border border-slate-800" />
                  <div className="absolute -bottom-4 left-4 w-2 h-2 bg-slate-100 rounded-full border border-slate-800" />
                </div>
                <div className="text-[10px] font-mono font-bold text-slate-400 text-left pl-6 mt-4">
                  {studentName.toUpperCase()}'S THOUGHTS
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* PAGE 2: FORENSIC INVESTIGATION & SUSPENSE CLIMAX             */}
        {/* Split: Macro Hesitation + Clue Screen + Mentor Hologram      */}
        {/* ============================================================ */}
        {pageNumber === 2 && (
          <div className="p-3 sm:p-5 space-y-3 sm:space-y-4 bg-[#090d16]">
            {/* TOP ROW: SPLIT DETAIL PANELS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {/* PANEL 5A: OVER THE SHOULDER CLUE EXAMINATION */}
              <div className="relative rounded-xl overflow-hidden border-2 border-slate-700 bg-slate-950 aspect-[4/3] group">
                <SceneOverTheShoulderPhone clue={p4?.visualClue || primaryClue} />

                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 border border-slate-700 text-[10px] font-mono font-bold text-white rounded">
                  PANEL 05
                </div>

                <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-slate-900/90 border border-cyan-400/80 rounded-lg text-xs font-mono text-cyan-300">
                  🔍 FORENSIC FOCUS: LOOK AT SENDER
                </div>
              </div>

              {/* PANEL 5B: FINGER HOVERING IN SUSPENSE */}
              <div className="relative rounded-xl overflow-hidden border-2 border-slate-700 bg-slate-950 aspect-[4/3]">
                <SceneFingerHoverHesitation warningLabel="ONE TAP FROM COMPROMISE" />

                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 border border-slate-700 text-[10px] font-mono font-bold text-white rounded">
                  PANEL 06
                </div>

                <div className="absolute top-4 right-4 max-w-[200px]">
                  <div className="bg-white text-slate-950 px-3 py-1.5 rounded-xl rounded-tr-none shadow-2xl border-2 border-slate-900 font-sans text-xs font-semibold">
                    "{p5?.speechBubbles?.[0]?.text || "If I click this, I might hand over my session tokens!"}"
                    <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM PANEL: CYBERMENTOR AI HOLOGRAPHIC ARRIVAL */}
            <div className="relative rounded-xl overflow-hidden border-2 border-cyan-500/80 bg-slate-950 aspect-[16/8] sm:aspect-[21/8]">
              <SceneCyberMentorArrival
                mentorSpeech={p7?.speechBubbles?.[0]?.text || "Operative, hold! Look at the artificial countdown. Classic credential harvesting."}
              />

              <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 border border-cyan-400 text-[10px] font-mono font-bold text-cyan-300 rounded">
                PANEL 07 // EMERGENCE
              </div>

              {/* Holographic Cyan Speech Box */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 max-w-[280px] sm:max-w-[360px]">
                <div className="bg-cyan-950/95 text-cyan-200 px-4 py-3 rounded-2xl rounded-tl-none border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] font-mono text-xs sm:text-sm leading-relaxed">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1">
                    CYBERMENTOR AI // ADVISORY
                  </div>
                  "{p7?.speechBubbles?.[0]?.text || `Operative ${studentName}! Stop right there! Urgency is an attacker's favorite anesthetic. Analyze before you tap!`}"
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* PAGE 3: THE TACTICAL DECISION (IN-MANGA CHOICE MOMENT)        */}
        {/* Pauses the narrative at the crossroads for user choice       */}
        {/* ============================================================ */}
        {pageNumber === 3 && (
          <div className="p-4 sm:p-8 bg-[#090d16] space-y-6">
            {/* Top Dramatic Manga Split Header */}
            <div className="relative rounded-xl overflow-hidden border-2 border-slate-700 bg-slate-950 aspect-[21/8]">
              <SceneSuspicionCloseup studentName={studentName} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 flex items-center justify-center p-4">
                <div className="text-center space-y-2">
                  <div className="inline-block px-3 py-1 bg-amber-500 text-slate-950 font-mono text-xs font-black rounded uppercase tracking-wider">
                    CRITICAL PLOT FORK // CHOOSE YOUR MOVE
                  </div>
                  <h2 className="text-xl sm:text-3xl font-black text-white font-mono tracking-tight uppercase">
                    SAURAV HAS A CHOICE
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-lg mx-auto">
                    {comic.decision.question}
                  </p>
                </div>
              </div>
            </div>

            {/* In-Story Choice Cards (Styled as authentic Manga Tactical Options) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {comic.decision.options.map((option) => {
                const isChosen = selectedOption?.id === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => {
                      playClickSound();
                      onSelectDecision(option);
                    }}
                    className={`relative p-4 sm:p-5 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                      isChosen
                        ? 'bg-cyan-950/90 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-[1.02]'
                        : 'bg-slate-900/90 border-slate-700 hover:border-slate-500 hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-start justify-between space-x-3 mb-2">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-sm font-black ${
                            isChosen
                              ? 'bg-cyan-400 text-slate-950'
                              : 'bg-slate-800 text-slate-300 border border-slate-600'
                          }`}
                        >
                          {option.id}
                        </span>
                        <span className="font-mono text-xs font-bold text-slate-400 uppercase">
                          OPTION {option.id}
                        </span>
                      </div>

                      {isChosen && (
                        <span className="px-2 py-0.5 bg-cyan-500 text-slate-950 font-mono text-[10px] font-black rounded uppercase">
                          SELECTED
                        </span>
                      )}
                    </div>

                    <div className="font-sans text-sm font-bold text-white mb-2 leading-snug">
                      {option.label}
                    </div>

                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {option.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {selectedOption ? (
              <div className="p-4 rounded-xl bg-cyan-950/80 border-2 border-cyan-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div>
                  <div className="text-xs font-mono font-bold text-cyan-300">
                    CHOICE LOCKED: OPTION [{selectedOption.id}]
                  </div>
                  <div className="text-sm font-bold text-white">
                    Proceed to Page 4 to witness the consequence of your action!
                  </div>
                </div>
                <div className="text-xs font-mono font-bold text-cyan-400 bg-cyan-900/60 px-3 py-1.5 rounded-lg border border-cyan-500">
                  TURN PAGE →
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl border-2 border-dashed border-amber-500/60 bg-amber-950/30 text-center font-mono text-xs text-amber-300">
                ▲ SELECT ONE OF THE DEFENSIVE CHOICES ABOVE TO UNLOCK THE STORY'S RESOLUTION ON PAGE 4!
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* PAGE 4: THE ACTION CONSEQUENCE (VISUAL OUTCOME)              */}
        {/* Dynamic visceral consequence scene based on player's choice */}
        {/* ============================================================ */}
        {pageNumber === 4 && (
          <div className="p-3 sm:p-5 space-y-3 sm:space-y-4 bg-[#090d16]">
            {selectedOption ? (
              <>
                {/* PANEL 8: DRAMATIC ACTION CONSEQUENCE */}
                <div className="relative rounded-xl overflow-hidden border-2 border-slate-700 bg-slate-950 aspect-[16/9] sm:aspect-[21/9]">
                  <SceneActionConsequence
                    isCorrect={selectedOption.isCorrect}
                    title={selectedOption.consequenceTitle}
                    reactionText={selectedOption.consequenceText}
                    studentName={studentName}
                  />

                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 border border-slate-700 text-[10px] font-mono font-bold text-white rounded">
                    PANEL 08 // OUTCOME
                  </div>

                  {/* Consequence Badge */}
                  <div className="absolute top-2 right-2">
                    <span
                      className={`px-3 py-1 rounded-lg font-mono text-xs font-black uppercase shadow-xl ${
                        selectedOption.isCorrect
                          ? 'bg-emerald-500 text-slate-950 border border-emerald-300'
                          : 'bg-rose-600 text-white border border-rose-400'
                      }`}
                    >
                      {selectedOption.isCorrect ? 'SHIELD DEFENSE SUCCESS' : 'SECURITY BREACH'}
                    </span>
                  </div>
                </div>

                {/* BOTTOM SPLIT: CONSEQUENCE REACTION & MENTOR BREAKDOWN */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {/* Consequence Narrative Text */}
                  <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border-2 border-slate-700 flex flex-col justify-between space-y-2">
                    <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                      TACTICAL AFTERMATH // {selectedOption.consequenceTitle}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                      {selectedOption.consequenceText}
                    </p>
                    <div className="text-[11px] font-mono font-semibold text-cyan-300">
                      {selectedOption.isCorrect
                        ? '✓ Threat neutralized without credential exposure.'
                        : '⚠ System flagged anomaly. Emergency recovery required.'}
                    </div>
                  </div>

                  {/* Mentor Critique Dialogue Bubble */}
                  <div className="p-4 sm:p-5 rounded-xl bg-cyan-950/80 border-2 border-cyan-500/80 flex flex-col justify-between space-y-2">
                    <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-400">
                      <ShieldCheck className="w-4 h-4" />
                      <span>CYBERMENTOR AI // POST-ACTION ANALYSIS</span>
                    </div>
                    <blockquote className="text-xs sm:text-sm text-cyan-100 italic font-mono leading-relaxed">
                      "{selectedOption.mentorCritique}"
                    </blockquote>
                    <div className="text-[10px] font-mono text-cyan-400 text-right">
                      ANALYSIS COMPLETE
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center space-y-3">
                <div className="text-amber-400 font-mono text-sm font-bold">
                  Awaiting Tactical Choice from Page 3
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Please turn back to Page 3 and select an option to witness the consequence.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* PAGE 5: AI MENTOR EPILOGUE & GOLDEN PRINCIPLE                */}
        {/* Final manga splash + Core Takeaway + Mini Knowledge Check    */}
        {/* ============================================================ */}
        {pageNumber === 5 && (
          <div className="p-4 sm:p-8 bg-[#090d16] space-y-6">
            {/* Top Epilogue Splash Banner */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-400 bg-gradient-to-r from-slate-950 via-cyan-950/60 to-slate-950 p-6 sm:p-8 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-cyan-300" />
              </div>

              <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                CHAPTER CONCLUSION // ARCHIVED SECURE
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white font-mono uppercase tracking-tight">
                THE LESSON IN INK
              </h2>

              <blockquote className="text-sm sm:text-base text-cyan-200 italic font-mono max-w-xl mx-auto">
                "{comic.aiMentorDebrief.quote}"
              </blockquote>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed max-w-xl mx-auto">
                {comic.aiMentorDebrief.explanation}
              </p>

              <div className="inline-block px-5 py-2.5 bg-cyan-500 text-slate-950 font-mono text-xs sm:text-sm font-black rounded-full shadow-lg">
                GOLDEN RULE: {comic.aiMentorDebrief.ruleOfThumb}
              </div>
            </div>

            {/* In-Story Mini Knowledge Check */}
            {comic.knowledgeCheck && (
              <div className="rounded-xl border-2 border-purple-500/70 bg-slate-900/90 p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded text-xs font-mono font-bold text-purple-300">
                    FIELD KNOWLEDGE CHECK
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Lock in defensive reflexes (+5 Digital Trust)
                  </span>
                </div>

                <div className="text-sm sm:text-base font-bold text-white font-mono">
                  {comic.knowledgeCheck.question}
                </div>

                <div className="space-y-2">
                  {comic.knowledgeCheck.options.map((opt) => (
                    <div
                      key={opt.id}
                      className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-xs sm:text-sm text-slate-200 font-sans"
                    >
                      {opt.text}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Page Footer Navigation Bar */}
        <div className="px-4 sm:px-6 py-3 bg-[#0e1422] border-t-2 border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>CHAPTER 01 // CASE STUDY</span>
          <span className="text-cyan-400 font-bold">DIGITAL TANKŌBON EDITION</span>
        </div>
      </div>

      {/* Clue Magnifier Modal */}
      {zoomedClue && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setZoomedClue(null)}
        >
          <div
            className="bg-slate-900 border-2 border-cyan-400 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span className="font-mono text-sm font-bold text-white uppercase">
                  FORENSIC CLUE // {zoomedClue.label}
                </span>
              </div>
              <button
                onClick={() => setZoomedClue(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Magnified Artifact Display */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-sm text-cyan-300 break-all text-center">
              {zoomedClue.displayValue}
            </div>

            <div className="text-xs text-slate-300 font-sans leading-relaxed">
              <strong className="text-cyan-400 block mb-1">Forensic Analysis:</strong>
              {zoomedClue.flawExplanation}
            </div>

            <button
              onClick={() => setZoomedClue(null)}
              className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold rounded-lg transition-colors"
            >
              CLOSE MAGNIFIER
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
