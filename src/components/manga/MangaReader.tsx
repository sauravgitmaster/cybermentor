import React, { useState, useEffect } from 'react';
import { CyberMangaComic, MangaDecisionOption, MangaPanel } from '../../types/manga';
import { saveStoryProgress } from '../../services/mangaService';
import { MangaCoverPage } from './MangaCoverPage';
import { MangaPageSheet } from './MangaPageSheet';
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Layers,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Square,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react';
import {
  playClickSound,
  playInspectSound,
  playSuccessSound,
  playWarningSound,
} from '../../utils/audio';

interface MangaReaderProps {
  comic: CyberMangaComic;
  initialPage?: number;
  allComics?: CyberMangaComic[];
  onSelectComic?: (comic: CyberMangaComic, initialPage?: number) => void;
  onBackToHub: () => void;
  onCompleteComic: (comicId: string, topicId: string, trustBonus: number) => void;
  onGenerateAnother: (topicId: string) => void;
}

export const MangaReader: React.FC<MangaReaderProps> = ({
  comic,
  initialPage = 0,
  allComics = [],
  onSelectComic,
  onBackToHub,
  onCompleteComic,
  onGenerateAnother,
}) => {
  // Reading format: 'page' (Tankōbon page-by-page) or 'webtoon' (continuous vertical stream)
  const [readingMode, setReadingMode] = useState<'page' | 'webtoon'>('webtoon');

  // Active page: 0 = Cover, 1 = Threat Emergence, 2 = Forensic Investigation,
  // 3 = Tactical Decision, 4 = Consequence, 5 = AI Mentor Epilogue
  const [currentPage, setCurrentPage] = useState<number>(() => {
    return initialPage >= 0 && initialPage <= 5 ? initialPage : 0;
  });

  // Decision State
  const [selectedOption, setSelectedOption] = useState<MangaDecisionOption | null>(null);

  // Knowledge Check State
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [claimedBonus, setClaimedBonus] = useState<boolean>(comic.completed);

  // Voice Narration State
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const studentName = comic.protagonistName || 'Ren';
  const totalStoryPages = 5;

  // Auto-save Reading Progress
  useEffect(() => {
    const percent = comic.completed
      ? 100
      : currentPage === 0
      ? 10
      : Math.min(100, Math.round((currentPage / 5) * 100));

    saveStoryProgress({
      comicId: comic.id,
      pageNumber: currentPage,
      readingMode,
      progressPercent: percent,
      lastReadAt: Date.now(),
    });
  }, [comic.id, comic.completed, currentPage, readingMode]);

  // Voice Narration Cleanup
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis && isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [currentPage, readingMode, comic.id]);

  // Toggle Read Aloud / Voice Narration
  const handleToggleReadAloud = () => {
    playClickSound();
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    let textToSpeak = '';
    if (readingMode === 'page') {
      if (currentPage === 0) {
        textToSpeak = `${comic.title}. Chapter 1. ${comic.summary}. Protagonist: ${studentName}.`;
      } else {
        const panel = comic.panels[currentPage - 1];
        if (panel) {
          textToSpeak = `Page ${currentPage}. ${panel.title || ''}. ${panel.sceneDescription}. `;
          if (panel.characterAction) {
            textToSpeak += `${panel.characterAction}. `;
          }
          if (panel.speechBubbles && panel.speechBubbles.length > 0) {
            panel.speechBubbles.forEach((b) => {
              textToSpeak += `${b.speaker} says: ${b.text}. `;
            });
          }
          if (panel.captionBox) {
            textToSpeak += `Caption: ${panel.captionBox.text}. `;
          }
        }
      }
    } else {
      textToSpeak = `${comic.title}. ${comic.summary}. `;
      comic.panels.forEach((p, idx) => {
        textToSpeak += `Panel ${idx + 1}: ${p.sceneDescription}. `;
        p.speechBubbles?.forEach((b) => {
          textToSpeak += `${b.speaker}: ${b.text}. `;
        });
      });
    }

    if (!textToSpeak.trim()) return;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Keyboard navigation for Tankōbon page turning
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (readingMode !== 'page') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (currentPage < totalStoryPages) {
          playClickSound();
          setCurrentPage((prev) => prev + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentPage > 0) {
          playClickSound();
          setCurrentPage((prev) => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [readingMode, currentPage, totalStoryPages]);

  // Handle Decision Choice
  const handleSelectDecision = (option: MangaDecisionOption) => {
    playInspectSound();
    setSelectedOption(option);
    if (option.isCorrect) {
      setTimeout(() => playSuccessSound(), 150);
    } else {
      setTimeout(() => playWarningSound(), 150);
    }
  };

  // Handle Quiz Answer Selection
  const handleSelectQuizAnswer = (answerId: string) => {
    playClickSound();
    setSelectedAnswerId(answerId);
  };

  // Finalize Chapter Completion
  const handleFinalizeComic = () => {
    if (claimedBonus) return;
    playSuccessSound();
    setClaimedBonus(true);
    onCompleteComic(comic.id, comic.topicId, 5);
  };

  // Find Next and Previous Comics in catalog
  const currentIndex = allComics.findIndex((c) => c.id === comic.id);
  const prevComic = currentIndex > 0 ? allComics[currentIndex - 1] : null;
  const nextComic = currentIndex >= 0 && currentIndex < allComics.length - 1 ? allComics[currentIndex + 1] : null;

  // Jump to next or previous story
  const handleGoToStory = (target: CyberMangaComic) => {
    playClickSound();
    if (isSpeaking && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    if (onSelectComic) {
      onSelectComic(target, 0);
    }
  };

  const progressPercent = comic.completed
    ? 100
    : currentPage === 0
    ? 15
    : Math.min(100, Math.round((currentPage / 5) * 100));

  return (
    <div id="manga-reader-viewport" className="min-h-screen bg-[#050811] text-slate-100 flex flex-col justify-between select-none">
      {/* ============================================================ */}
      {/* TOP NAVIGATION / MINIMALIST MANGA CHAPTER BAR               */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 bg-[#090d16]/95 backdrop-blur-md border-b-2 border-slate-800 px-3 sm:px-8 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
          {/* Back to Story Library & Title */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 truncate">
            <button
              id="reader-back-to-library-btn"
              onClick={() => {
                playClickSound();
                if (isSpeaking && typeof window !== 'undefined' && window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                }
                onBackToHub();
              }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white font-mono text-xs font-bold transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">STORY LIBRARY</span>
              <span className="sm:hidden">LIBRARY</span>
            </button>

            <div className="truncate max-w-[160px] sm:max-w-xs md:max-w-md text-left">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider truncate">
                  {comic.topicLabel} • {comic.genreLabel}
                </span>
                <span className="hidden md:inline text-[10px] font-mono text-slate-500">
                  // CH. 01
                </span>
              </div>
              <h1 className="text-xs sm:text-sm font-black text-white font-mono uppercase tracking-tight truncate">
                {comic.title}
              </h1>
            </div>
          </div>

          {/* Reading Controls: Read Aloud, View Mode Switcher, and Progress */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Read Aloud / Voice Narration Button */}
            <button
              id="reader-toggle-read-aloud-btn"
              onClick={handleToggleReadAloud}
              title={isSpeaking ? 'Stop Narration' : 'Read Aloud Dialogues & Captions'}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer border ${
                isSpeaking
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)] animate-pulse'
                  : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:text-white hover:border-slate-500'
              }`}
            >
              {isSpeaking ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  <span className="hidden md:inline">STOP VOICE</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden md:inline">READ ALOUD</span>
                </>
              )}
            </button>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-950 rounded-xl p-0.5 sm:p-1 border border-slate-800">
              <button
                onClick={() => {
                  playClickSound();
                  setReadingMode('webtoon');
                }}
                className={`px-2.5 sm:px-3 py-1 text-xs font-mono font-bold rounded-lg transition-colors flex items-center space-x-1 cursor-pointer ${
                  readingMode === 'webtoon'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WEBTOON FLOW</span>
                <span className="sm:hidden">SCROLL</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  setReadingMode('page');
                }}
                className={`px-2.5 sm:px-3 py-1 text-xs font-mono font-bold rounded-lg transition-colors flex items-center space-x-1 cursor-pointer ${
                  readingMode === 'page'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">PAGE-BY-PAGE</span>
                <span className="sm:hidden">PAGES</span>
              </button>
            </div>

            {/* Completion Pill */}
            {claimedBonus && (
              <span className="hidden lg:flex items-center space-x-1 px-2.5 py-1 bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 rounded-lg font-mono text-[11px] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>+5 TRUST</span>
              </span>
            )}
          </div>
        </div>

        {/* Slim Progress Bar at the base of header */}
        <div className="w-full bg-slate-900 h-1 mt-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* ============================================================ */}
      {/* MAIN MANGA READING CANVAS                                    */}
      {/* ============================================================ */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-2 sm:px-6 py-4 sm:py-6">
        {readingMode === 'page' ? (
          /* TANKŌBON PAGE-BY-PAGE EXPERIENCE */
          <div className="space-y-4">
            {currentPage === 0 ? (
              /* COVER SPREAD */
              <MangaCoverPage
                comic={comic}
                onStartReading={() => {
                  playClickSound();
                  setCurrentPage(1);
                }}
                onBackToHub={onBackToHub}
              />
            ) : (
              /* ACTIVE MANGA PAGE SHEET */
              <MangaPageSheet
                pageNumber={currentPage}
                totalPages={totalStoryPages}
                comic={comic}
                selectedOption={selectedOption}
                onSelectDecision={handleSelectDecision}
                studentName={studentName}
              />
            )}

            {/* Page 5 Epilogue Interactive Mini-Check & Claim */}
            {currentPage === 5 && comic.knowledgeCheck && (
              <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-slate-900 border-2 border-purple-500/80 rounded-2xl shadow-2xl space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span className="font-mono text-xs sm:text-sm font-black text-white uppercase">
                      CHAPTER KNOWLEDGE RETENTION CHECK
                    </span>
                  </div>
                  <span className="text-xs font-mono text-purple-300">
                    Reward: +5 Digital Trust
                  </span>
                </div>

                <p className="text-sm font-bold text-white font-mono">
                  {comic.knowledgeCheck.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {comic.knowledgeCheck.options.map((opt) => {
                    const isSelected = selectedAnswerId === opt.id;
                    const showResult = selectedAnswerId !== null;
                    const isAnswerCorrect = opt.isCorrect;

                    return (
                      <button
                        key={opt.id}
                        disabled={claimedBonus}
                        onClick={() => handleSelectQuizAnswer(opt.id)}
                        className={`p-3.5 rounded-xl border text-left font-sans text-xs sm:text-sm transition-all cursor-pointer ${
                          showResult
                            ? isAnswerCorrect
                              ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200'
                              : isSelected
                              ? 'bg-rose-950/80 border-rose-400 text-rose-200'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 opacity-60'
                            : isSelected
                            ? 'bg-cyan-950/80 border-cyan-400 text-white'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-600 text-slate-300'
                        }`}
                      >
                        <div className="font-bold mb-1">{opt.text}</div>
                        {showResult && isSelected && (
                          <div className="text-[11px] font-mono mt-1 font-semibold">
                            {isAnswerCorrect ? '✓ Correct analysis!' : '✗ Incorrect move.'}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    disabled={claimedBonus}
                    onClick={handleFinalizeComic}
                    className={`px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-black uppercase tracking-wider flex items-center space-x-2 transition-all shadow-xl cursor-pointer ${
                      claimedBonus
                        ? 'bg-emerald-600/60 text-emerald-200 cursor-not-allowed border border-emerald-500/50'
                        : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>
                      {claimedBonus ? '✓ CHAPTER COMPLETED' : 'COMPLETE CHAPTER (+5 TRUST)'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* CONTINUOUS WEBTOON VERTICAL SCROLL EXPERIENCE */
          <div className="space-y-6">
            {/* Episode Cover Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0c1524] to-[#080d16] border-2 border-cyan-500/40 text-center space-y-2 shadow-xl">
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/50 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                CHAPTER 01 // WEBTOON CONTINUOUS SCROLL
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-white font-mono uppercase tracking-tight">
                {comic.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-sans leading-relaxed">
                {comic.summary}
              </p>
            </div>

            {/* Seamless Stack of Pages 1 through 5 */}
            {[1, 2, 3, 4, 5].map((pageNum) => (
              <div key={pageNum} id={`webtoon-page-${pageNum}`} className="w-full">
                <MangaPageSheet
                  pageNumber={pageNum}
                  totalPages={totalStoryPages}
                  comic={comic}
                  selectedOption={selectedOption}
                  onSelectDecision={handleSelectDecision}
                  studentName={studentName}
                />
              </div>
            ))}

            {/* Mini Knowledge Check at Bottom of Webtoon */}
            {comic.knowledgeCheck && (
              <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-slate-900 border-2 border-purple-500/80 rounded-2xl shadow-2xl space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span className="font-mono text-xs sm:text-sm font-black text-white uppercase">
                      CHAPTER KNOWLEDGE RETENTION CHECK
                    </span>
                  </div>
                  <span className="text-xs font-mono text-purple-300">
                    Reward: +5 Digital Trust
                  </span>
                </div>

                <p className="text-sm font-bold text-white font-mono">
                  {comic.knowledgeCheck.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {comic.knowledgeCheck.options.map((opt) => {
                    const isSelected = selectedAnswerId === opt.id;
                    const showResult = selectedAnswerId !== null;
                    const isAnswerCorrect = opt.isCorrect;

                    return (
                      <button
                        key={opt.id}
                        disabled={claimedBonus}
                        onClick={() => handleSelectQuizAnswer(opt.id)}
                        className={`p-3.5 rounded-xl border text-left font-sans text-xs sm:text-sm transition-all cursor-pointer ${
                          showResult
                            ? isAnswerCorrect
                              ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200'
                              : isSelected
                              ? 'bg-rose-950/80 border-rose-400 text-rose-200'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 opacity-60'
                            : isSelected
                            ? 'bg-cyan-950/80 border-cyan-400 text-white'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-600 text-slate-300'
                        }`}
                      >
                        <div className="font-bold mb-1">{opt.text}</div>
                        {showResult && isSelected && (
                          <div className="text-[11px] font-mono mt-1 font-semibold">
                            {isAnswerCorrect ? '✓ Correct analysis!' : '✗ Incorrect move.'}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    disabled={claimedBonus}
                    onClick={handleFinalizeComic}
                    className={`px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-black uppercase tracking-wider flex items-center space-x-2 transition-all shadow-xl cursor-pointer ${
                      claimedBonus
                        ? 'bg-emerald-600/60 text-emerald-200 cursor-not-allowed border border-emerald-500/50'
                        : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>
                      {claimedBonus ? '✓ CHAPTER COMPLETED' : 'COMPLETE CHAPTER (+5 TRUST)'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Chapter Navigation Footer (Binge Reading Links) */}
        <div className="w-full max-w-4xl mx-auto mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevComic ? (
            <button
              onClick={() => handleGoToStory(prevComic)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-mono text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <div className="text-left">
                <span className="text-[10px] text-slate-500 block">PREVIOUS STORY</span>
                <span className="truncate max-w-[180px] block">{prevComic.title}</span>
              </div>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={() => {
              playClickSound();
              onBackToHub();
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-xs font-bold cursor-pointer"
          >
            ← Back to Story Library
          </button>

          {nextComic ? (
            <button
              onClick={() => handleGoToStory(nextComic)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer transition-all shadow-md"
            >
              <div className="text-right">
                <span className="text-[10px] text-cyan-200 block">NEXT STORY</span>
                <span className="truncate max-w-[180px] block">{nextComic.title}</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </main>

      {/* ============================================================ */}
      {/* TANKŌBON BOTTOM PAGE NAVIGATION CONTROLS                     */}
      {/* ============================================================ */}
      {readingMode === 'page' && (
        <footer className="sticky bottom-0 z-40 bg-[#090d16]/95 backdrop-blur-md border-t-2 border-slate-800 px-4 sm:px-8 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            {/* Previous Page Button */}
            <button
              disabled={currentPage === 0}
              onClick={() => {
                playClickSound();
                setCurrentPage((prev) => Math.max(0, prev - 1));
              }}
              className={`px-3 sm:px-4 py-2 rounded-xl font-mono text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                currentPage === 0
                  ? 'opacity-40 cursor-not-allowed text-slate-500'
                  : 'bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{currentPage === 1 ? 'COVER' : 'PREV PAGE'}</span>
            </button>

            {/* Page Indicator Pills */}
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <button
                onClick={() => {
                  playClickSound();
                  setCurrentPage(0);
                }}
                className={`px-2 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  currentPage === 0
                    ? 'bg-cyan-500 text-slate-950 font-black'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                COVER
              </button>

              {[1, 2, 3, 4, 5].map((pNum) => (
                <button
                  key={pNum}
                  onClick={() => {
                    playClickSound();
                    setCurrentPage(pNum);
                  }}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center cursor-pointer ${
                    currentPage === pNum
                      ? 'bg-cyan-500 text-slate-950 font-black shadow-lg scale-105'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {pNum}
                </button>
              ))}
            </div>

            {/* Next Page Button */}
            <button
              disabled={currentPage === totalStoryPages}
              onClick={() => {
                playClickSound();
                setCurrentPage((prev) => Math.min(totalStoryPages, prev + 1));
              }}
              className={`px-3 sm:px-4 py-2 rounded-xl font-mono text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                currentPage === totalStoryPages
                  ? 'opacity-40 cursor-not-allowed text-slate-500'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg'
              }`}
            >
              <span>{currentPage === 0 ? 'START CHAPTER' : 'NEXT PAGE'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </footer>
      )}
    </div>
  );
};
