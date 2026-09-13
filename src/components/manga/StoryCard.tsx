import React from 'react';
import { CyberMangaComic, StoryReadingProgress } from '../../types/manga';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Flame,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
} from 'lucide-react';
import { playClickSound } from '../../utils/audio';

interface StoryCardProps {
  comic: CyberMangaComic;
  progress?: StoryReadingProgress | null;
  isRecommended?: boolean;
  recommendationReason?: string;
  onOpenStory: (comic: CyberMangaComic, initialPage?: number) => void;
  featured?: boolean;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  comic,
  progress,
  isRecommended = false,
  recommendationReason,
  onOpenStory,
  featured = false,
}) => {
  const isInProgress = progress && progress.progressPercent > 0 && progress.progressPercent < 100 && !comic.completed;
  const isCompleted = comic.completed || (progress && progress.progressPercent === 100);
  const progressPercent = isCompleted ? 100 : progress?.progressPercent || 0;
  const targetPage = isInProgress ? (progress?.pageNumber || 1) : 0;

  // Topic Color Palette for visual accents
  const getTopicAccent = (topicId: string) => {
    switch (topicId) {
      case 'phishing':
        return {
          border: 'border-amber-500/40 hover:border-amber-400',
          gradient: 'from-amber-950/60 via-[#0d1726] to-[#080d16]',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          glow: 'group-hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]',
          bar: 'bg-amber-400',
        };
      case 'passwords':
      case 'account-security':
        return {
          border: 'border-purple-500/40 hover:border-purple-400',
          gradient: 'from-purple-950/60 via-[#0d1726] to-[#080d16]',
          badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
          glow: 'group-hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]',
          bar: 'bg-purple-400',
        };
      case 'privacy':
      case 'social-media':
        return {
          border: 'border-emerald-500/40 hover:border-emerald-400',
          gradient: 'from-emerald-950/60 via-[#0d1726] to-[#080d16]',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          glow: 'group-hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]',
          bar: 'bg-emerald-400',
        };
      case 'ai-deepfakes':
      case 'ai-scams':
        return {
          border: 'border-rose-500/40 hover:border-rose-400',
          gradient: 'from-rose-950/60 via-[#0d1726] to-[#080d16]',
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          glow: 'group-hover:shadow-[0_0_25px_rgba(244,63,94,0.2)]',
          bar: 'bg-rose-400',
        };
      default:
        return {
          border: 'border-cyan-500/40 hover:border-cyan-400',
          gradient: 'from-cyan-950/60 via-[#0d1726] to-[#080d16]',
          badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
          glow: 'group-hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]',
          bar: 'bg-cyan-400',
        };
    }
  };

  const accent = getTopicAccent(comic.topicId);

  return (
    <div
      id={`story-card-${comic.id}`}
      className={`group relative flex flex-col justify-between rounded-2xl border-2 bg-gradient-to-b ${accent.gradient} ${
        isRecommended ? 'border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.25)]' : accent.border
      } ${accent.glow} transition-all duration-200 overflow-hidden text-left`}
    >
      {/* Top Graphic Art Banner (Simulated Manga Volume Cover) */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-950 flex items-center justify-center border-b border-slate-800/80">
        {/* Halftone dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#38bdf8 1.5px, transparent 1.5px)',
            backgroundSize: '10px 10px',
          }}
        />

        {/* Manga Speed Lines radiating from center */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

        {/* Japanese Manga Vertical Accent Strip */}
        <div className="absolute left-2.5 top-2.5 bottom-2.5 w-1 rounded bg-gradient-to-b from-cyan-400 via-indigo-500 to-amber-400 opacity-70" />

        {/* Manga Volume Art Graphic */}
        <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center space-y-1 max-w-[90%]">
          {/* Subtle Kanji Watermark */}
          <div className="text-3xl font-black text-slate-800/60 tracking-widest select-none pointer-events-none absolute -top-1">
            サイバー防衛
          </div>

          {/* Episode Badge */}
          <span className="px-2.5 py-0.5 rounded bg-black/80 border border-slate-700 text-[10px] font-mono font-black text-cyan-300 tracking-wider uppercase">
            CHAPTER 01 // 5 PAGES
          </span>

          {/* Large Title Typography on Cover */}
          <h4 className="text-base sm:text-lg font-black text-white font-mono uppercase tracking-tight line-clamp-2 drop-shadow-md group-hover:text-cyan-300 transition-colors">
            {comic.title}
          </h4>

          {/* Protagonist Lead */}
          <span className="text-[11px] font-mono text-slate-400">
            Protagonist: <strong className="text-slate-200">{comic.protagonistName || 'Ren'}</strong>
          </span>
        </div>

        {/* Top Badges (Genre & Recommended/Completed) */}
        <div className="absolute top-2 right-2 flex flex-col items-end gap-1.5 z-20">
          {isRecommended && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-mono text-[10px] font-black uppercase flex items-center gap-1 shadow-md">
              <Flame className="w-3 h-3 fill-slate-950" />
              <span>RECOMMENDED</span>
            </span>
          )}

          {isCompleted && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/90 text-slate-950 font-mono text-[10px] font-black uppercase flex items-center gap-1 shadow-md">
              <CheckCircle2 className="w-3 h-3 stroke-slate-950" />
              <span>COMPLETED</span>
            </span>
          )}

          <span className="px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-700/80 text-[10px] font-mono font-bold text-slate-300 uppercase backdrop-blur-xs">
            {comic.genreLabel}
          </span>
        </div>

        {/* Reading Time Tag */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-slate-300 border border-slate-800">
          <Clock className="w-3 h-3 text-cyan-400" />
          <span>~3 MIN</span>
        </div>
      </div>

      {/* Card Body Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Topic & Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`px-2.5 py-0.5 rounded-md border text-[10px] font-mono font-bold uppercase ${accent.badge}`}>
              {comic.topicLabel}
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Story Episode
            </span>
          </div>

          {/* Concept Headline */}
          <h3 className="text-sm sm:text-base font-bold text-white font-mono line-clamp-1 group-hover:text-cyan-200 transition-colors">
            {comic.title}
          </h3>

          {/* Synopsis Summary */}
          <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-2">
            {comic.summary}
          </p>

          {/* Recommendation Reason if applicable */}
          {recommendationReason && (
            <div className="rounded-lg bg-amber-950/40 border border-amber-500/30 p-2 text-[11px] font-mono text-amber-200/90 leading-snug">
              💡 {recommendationReason}
            </div>
          )}
        </div>

        {/* Progress Bar (if in progress or completed) */}
        {(isInProgress || isCompleted) && (
          <div className="space-y-1 pt-1 border-t border-slate-800/80">
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-slate-400">
                {isCompleted ? 'Finished Chapter' : `Progress: Page ${progress?.pageNumber || 1} of 5`}
              </span>
              <span className={isCompleted ? 'text-emerald-400 font-bold' : 'text-cyan-400 font-bold'}>
                {progressPercent}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className={`h-full transition-all duration-300 ${isCompleted ? 'bg-emerald-400' : accent.bar}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 flex items-center gap-2">
          {isInProgress ? (
            <>
              <button
                id={`resume-story-${comic.id}`}
                onClick={() => {
                  playClickSound();
                  onOpenStory(comic, targetPage);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>CONTINUE P.{targetPage}</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  onOpenStory(comic, 0);
                }}
                title="Restart from cover"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <button
              id={`read-story-${comic.id}`}
              onClick={() => {
                playClickSound();
                onOpenStory(comic, 0);
              }}
              className={`w-full py-2.5 px-3 rounded-xl font-black font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-98 cursor-pointer ${
                isCompleted
                  ? 'bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-emerald-500/20'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isCompleted ? 'RE-READ CHAPTER' : 'READ CHAPTER (FREE)'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
