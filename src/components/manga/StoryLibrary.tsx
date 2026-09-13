import React, { useMemo, useState } from 'react';
import { PlayerState } from '../../types';
import {
  CyberMangaComic,
  MangaGenreId,
  MangaTopicId,
  StoryReadingProgress,
} from '../../types/manga';
import { MANGA_TOPICS } from '../../utils/mangaTopicDetector';
import { MANGA_GENRES } from '../../data/mangaGenres';
import { StoryCard } from './StoryCard';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Compass,
  Filter,
  Flame,
  Layers,
  Loader2,
  Play,
  RotateCcw,
  Search,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';
import { playClickSound, playInspectSound, playSuccessSound } from '../../utils/audio';

interface StoryLibraryProps {
  comics: CyberMangaComic[];
  progressMap: Record<string, StoryReadingProgress>;
  player: PlayerState;
  recommendedTopicId: MangaTopicId;
  recommendationReason: string;
  onOpenStory: (comic: CyberMangaComic, initialPage?: number) => void;
  onGenerateCustomStory: (topicId: MangaTopicId, genreId: MangaGenreId) => void;
  isGenerating: boolean;
}

export const StoryLibrary: React.FC<StoryLibraryProps> = ({
  comics,
  progressMap,
  player,
  recommendedTopicId,
  recommendationReason,
  onOpenStory,
  onGenerateCustomStory,
  isGenerating,
}) => {
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('all');
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed'>('all');

  // Custom AI Generation Toggle
  const [showAiGenerator, setShowAiGenerator] = useState<boolean>(false);
  const [genTopicId, setGenTopicId] = useState<MangaTopicId>(recommendedTopicId);
  const [genGenreId, setGenGenreId] = useState<MangaGenreId>('thriller');

  // Find In-Progress Stories
  const inProgressComics = useMemo(() => {
    return comics
      .filter((comic) => {
        const prog = progressMap[comic.id];
        return prog && prog.progressPercent > 0 && prog.progressPercent < 100 && !comic.completed;
      })
      .sort((a, b) => {
        const timeA = progressMap[a.id]?.lastReadAt || 0;
        const timeB = progressMap[b.id]?.lastReadAt || 0;
        return timeB - timeA;
      });
  }, [comics, progressMap]);

  // Find Completed Stories
  const completedComics = useMemo(() => {
    return comics.filter(
      (c) => c.completed || (progressMap[c.id] && progressMap[c.id].progressPercent === 100)
    );
  }, [comics, progressMap]);

  // Find Recommended Comic
  const recommendedComic = useMemo(() => {
    const matching = comics.find((c) => c.topicId === recommendedTopicId);
    return matching || comics[0];
  }, [comics, recommendedTopicId]);

  // Filtered Stories List
  const filteredComics = useMemo(() => {
    return comics.filter((comic) => {
      // Tab filter
      if (activeTab === 'in-progress') {
        const prog = progressMap[comic.id];
        if (!prog || prog.progressPercent === 0 || prog.progressPercent === 100 || comic.completed) {
          return false;
        }
      } else if (activeTab === 'completed') {
        const isDone = comic.completed || progressMap[comic.id]?.progressPercent === 100;
        if (!isDone) return false;
      }

      // Topic filter
      if (selectedTopicFilter !== 'all' && comic.topicId !== selectedTopicFilter) {
        return false;
      }

      // Genre filter
      if (selectedGenreFilter !== 'all' && comic.genreId !== selectedGenreFilter) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = comic.title.toLowerCase().includes(q);
        const matchesTopic = comic.topicLabel.toLowerCase().includes(q);
        const matchesConcept = comic.concept.toLowerCase().includes(q);
        const matchesSummary = comic.summary.toLowerCase().includes(q);
        return matchesTitle || matchesTopic || matchesConcept || matchesSummary;
      }

      return true;
    });
  }, [comics, activeTab, selectedTopicFilter, selectedGenreFilter, searchQuery, progressMap]);

  // Recommended Topic Meta
  const recommendedMeta = MANGA_TOPICS.find((t) => t.id === recommendedTopicId) || MANGA_TOPICS[0];

  return (
    <div id="story-mode-library-container" className="space-y-8 animate-in fade-in duration-300 select-none pb-12">
      {/* ============================================================ */}
      {/* 1. HERO PLATFORM BANNER                                      */}
      {/* ============================================================ */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-[#0d1627] to-[#121226] border-2 border-cyan-500/50 shadow-[0_0_35px_rgba(6,182,212,0.15)] overflow-hidden">
        {/* Manga Screentone Dots */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1.5px, transparent 1.5px)`,
            backgroundSize: '12px 12px',
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-cyan-950/80 border border-cyan-400/60 rounded-full text-cyan-300 font-mono text-xs font-bold tracking-widest uppercase shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>CYBERMENTOR STORIES // INTERACTIVE STORY MODE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono tracking-tight uppercase">
              📖 STORY MODE
            </h1>

            <p className="text-sm sm:text-base text-cyan-100 font-medium font-sans">
              "Learn cybersecurity through interactive stories."
            </p>

            <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed max-w-xl">
              Immerse yourself in episodic cybersecurity narratives where real online threats unfold.
              Inspect forensic clues inside the artwork, make choices under pressure, and experience the consequences.
            </p>
          </div>

          {/* Quick Stats & Badges */}
          <div className="flex flex-row lg:flex-col gap-3 bg-black/60 border border-slate-700/80 rounded-2xl p-4 backdrop-blur font-mono shrink-0 w-full lg:w-auto justify-between">
            <div className="text-left">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
                STORIES AVAILABLE
              </span>
              <span className="text-xl sm:text-2xl font-black text-white">
                {comics.length} <span className="text-xs text-slate-400 font-normal">EPISODES</span>
              </span>
            </div>

            <div className="text-left border-l lg:border-l-0 lg:border-t border-slate-700/80 pl-3 lg:pl-0 lg:pt-2.5">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
                STORIES COMPLETED
              </span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400">
                {completedComics.length} <span className="text-xs text-slate-400 font-normal">/ {comics.length}</span>
              </span>
            </div>

            {inProgressComics.length > 0 && (
              <div className="text-left border-l lg:border-l-0 lg:border-t border-slate-700/80 pl-3 lg:pl-0 lg:pt-2.5">
                <span className="text-[10px] text-amber-400 uppercase tracking-widest block">
                  IN PROGRESS
                </span>
                <span className="text-xl sm:text-2xl font-black text-amber-300">
                  {inProgressComics.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. CONTINUE READING SHELF (Shown if user has active stories) */}
      {/* ============================================================ */}
      {inProgressComics.length > 0 && (
        <section id="continue-reading-shelf" className="space-y-4 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Play className="w-4 h-4 fill-cyan-400" />
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white font-mono uppercase tracking-wide">
                CONTINUE READING ({inProgressComics.length})
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Pick up right where you left off
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inProgressComics.slice(0, 3).map((comic) => (
              <StoryCard
                key={comic.id}
                comic={comic}
                progress={progressMap[comic.id]}
                onOpenStory={onOpenStory}
              />
            ))}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 3. RECOMMENDED FOR YOU (Personalized Cyber Defense Story)     */}
      {/* ============================================================ */}
      <section id="recommended-story-section" className="relative rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#121c2d] via-[#0f1725] to-[#161226] border-2 border-amber-500/80 shadow-xl overflow-hidden text-left">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/60 rounded-full font-mono text-xs font-bold uppercase tracking-widest flex items-center space-x-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>RECOMMENDED FOR YOU</span>
              </span>
              <span className="px-2.5 py-0.5 bg-slate-900 text-cyan-300 border border-cyan-500/50 rounded text-xs font-mono font-bold uppercase">
                {recommendedMeta.name}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight uppercase">
              {recommendedComic.title}
            </h2>

            <div className="rounded-xl bg-black/50 border border-amber-500/30 p-3.5 space-y-1">
              <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                WHY CYBERMENTOR RECOMMENDS THIS:
              </span>
              <p className="text-xs sm:text-sm text-slate-200 font-mono leading-relaxed">
                "{recommendationReason}"
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              {recommendedComic.summary}
            </p>
          </div>

          {/* Action Box */}
          <div className="w-full lg:w-auto flex flex-col items-center sm:items-end justify-center gap-3 shrink-0">
            <button
              id="recommended-read-btn"
              onClick={() => {
                playClickSound();
                const prog = progressMap[recommendedComic.id];
                const targetPage = prog && prog.progressPercent > 0 && prog.progressPercent < 100 ? prog.pageNumber : 0;
                onOpenStory(recommendedComic, targetPage);
              }}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-black font-mono text-sm sm:text-base rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center justify-center space-x-2.5 transition-transform active:scale-98 cursor-pointer"
            >
              <BookOpen className="w-5 h-5" />
              <span>
                {progressMap[recommendedComic.id]?.progressPercent
                  ? `CONTINUE READING (PAGE ${progressMap[recommendedComic.id].pageNumber})`
                  : 'READ THIS CHAPTER'}
              </span>
            </button>

            <span className="text-[11px] text-slate-400 font-mono text-center sm:text-right">
              ~3 Min Read • Decision &amp; Interactive Consequence Included
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. TOPICS TO STRENGTHEN (16 Cyber Defense Areas)             */}
      {/* ============================================================ */}
      <section id="topics-filter-shelf" className="space-y-3 text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-black text-white font-mono uppercase tracking-wide">
              BROWSE BY CYBER DEFENSE DOMAIN
            </h3>
          </div>
          {selectedTopicFilter !== 'all' && (
            <button
              onClick={() => {
                playClickSound();
                setSelectedTopicFilter('all');
              }}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
            >
              Show All Topics
            </button>
          )}
        </div>

        {/* Topic Pills Grid */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              playClickSound();
              setSelectedTopicFilter('all');
            }}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
              selectedTopicFilter === 'all'
                ? 'bg-cyan-500 text-slate-950 shadow-md scale-105'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80'
            }`}
          >
            All Topics ({comics.length})
          </button>

          {MANGA_TOPICS.map((topic) => {
            const isSelected = selectedTopicFilter === topic.id;
            const count = comics.filter((c) => c.topicId === topic.id).length;
            const isRecommendedTopic = topic.id === recommendedTopicId;

            return (
              <button
                key={topic.id}
                onClick={() => {
                  playClickSound();
                  setSelectedTopicFilter(isSelected ? 'all' : topic.id);
                }}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 shadow-md scale-105'
                    : isRecommendedTopic
                    ? 'bg-amber-950/80 hover:bg-amber-900 border border-amber-500/60 text-amber-300'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80'
                }`}
              >
                <span>{topic.icon}</span>
                <span>{topic.name}</span>
                {count > 0 && <span className="opacity-60 text-[10px]">({count})</span>}
              </button>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. SEARCH & FILTER CONTROLS BAR                              */}
      {/* ============================================================ */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          {/* Library Tabs (All / In Progress / Completed) */}
          <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-2xl border border-slate-800 self-start">
            <button
              onClick={() => {
                playClickSound();
                setActiveTab('all');
              }}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ALL STORIES ({comics.length})
            </button>

            <button
              onClick={() => {
                playClickSound();
                setActiveTab('in-progress');
              }}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'in-progress'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              IN PROGRESS ({inProgressComics.length})
            </button>

            <button
              onClick={() => {
                playClickSound();
                setActiveTab('completed');
              }}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-colors cursor-pointer ${
                activeTab === 'completed'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              COMPLETED ({completedComics.length})
            </button>
          </div>

          {/* Search Box & AI Custom Generator Button */}
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories, topics..."
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* AI Generator Toggle Button */}
            <button
              id="toggle-ai-story-generator-btn"
              onClick={() => {
                playClickSound();
                setShowAiGenerator((prev) => !prev);
              }}
              className={`px-3.5 py-2 rounded-xl font-mono text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer shrink-0 ${
                showAiGenerator
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-purple-950/80 hover:bg-purple-900 border border-purple-500/60 text-purple-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span className="hidden sm:inline">CUSTOM AI EPISODE</span>
              <span className="sm:hidden">AI CUSTOM</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* COLLAPSIBLE AI STORY GENERATOR                               */}
        {/* ============================================================ */}
        {showAiGenerator && (
          <div className="rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-purple-950/90 via-slate-900 to-indigo-950/90 border-2 border-purple-500 shadow-2xl space-y-4 text-left animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between border-b border-purple-800/50 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="font-mono text-sm font-black text-white uppercase">
                  SYNTHESIZE A PERSONALIZED STORY EPISODE WITH AI
                </span>
              </div>
              <button
                onClick={() => setShowAiGenerator(false)}
                className="text-xs font-mono text-slate-400 hover:text-white"
              >
                Close ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Want a story for a specific scenario or atmosphere? Select any cybersecurity threat and genre.
              The AI will generate an original 5-chapter story tailored for operative <strong>{player.name || 'Ren'}</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Topic Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-purple-300 uppercase">
                  TARGET DEFENSE THREAT:
                </label>
                <select
                  value={genTopicId}
                  onChange={(e) => setGenTopicId(e.target.value as MangaTopicId)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-purple-400"
                >
                  {MANGA_TOPICS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.icon} {t.name} ({t.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Genre Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-purple-300 uppercase">
                  STORY ATMOSPHERE / GENRE:
                </label>
                <select
                  value={genGenreId}
                  onChange={(e) => setGenGenreId(e.target.value as MangaGenreId)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-purple-400"
                >
                  {MANGA_GENRES.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.icon} {g.name} — {g.tagline}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                disabled={isGenerating}
                onClick={() => onGenerateCustomStory(genTopicId, genGenreId)}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-black font-mono text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-xl flex items-center space-x-2 transition-transform active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>SYNTHESIZING STORY PANELS...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-white" />
                    <span>GENERATE CUSTOM STORY</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 6. STORIES GRID                                              */}
        {/* ============================================================ */}
        {filteredComics.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-800 p-12 text-center space-y-3">
            <BookOpen className="w-8 h-8 text-slate-600 mx-auto" />
            <div className="text-sm font-mono text-slate-400">
              No stories found matching your filter or search query.
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTopicFilter('all');
                setSelectedGenreFilter('all');
                setActiveTab('all');
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-400 hover:text-white cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredComics.map((comic) => (
              <StoryCard
                key={comic.id}
                comic={comic}
                progress={progressMap[comic.id]}
                isRecommended={comic.id === recommendedComic.id}
                recommendationReason={comic.id === recommendedComic.id ? recommendationReason : undefined}
                onOpenStory={onOpenStory}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
