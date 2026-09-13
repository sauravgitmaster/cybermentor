import React from 'react';
import { CyberMangaComic } from '../../types/manga';
import { BookOpen, ShieldAlert, Sparkles, User, Award, CheckCircle2 } from 'lucide-react';
import { playClickSound } from '../../utils/audio';

interface MangaCoverPageProps {
  comic: CyberMangaComic;
  onStartReading: () => void;
  onBackToHub: () => void;
}

export const MangaCoverPage: React.FC<MangaCoverPageProps> = ({
  comic,
  onStartReading,
  onBackToHub,
}) => {
  const studentName = comic.protagonistName || 'Saurav';

  return (
    <div className="w-full max-w-4xl mx-auto my-4 sm:my-8 px-2 sm:px-4 select-none animate-fadeIn">
      {/* Authentic Tankōbon Manga Volume Jacket */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-4 border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.25)]">
        {/* Manga Spine Accent Bar on the Left Edge */}
        <div className="absolute top-0 left-0 w-3 sm:w-4 h-full bg-gradient-to-b from-cyan-600 via-blue-700 to-indigo-900 z-30 flex flex-col items-center justify-between py-6">
          <div className="text-[9px] font-mono font-black text-cyan-200 tracking-widest rotate-90 uppercase">
            STORY
          </div>
          <div className="text-[8px] font-mono font-bold text-white tracking-widest rotate-90">
            VOL.01
          </div>
          <div className="text-[9px] font-mono font-black text-cyan-200 tracking-widest rotate-90 uppercase">
            MODE
          </div>
        </div>

        {/* Cover Canvas Area */}
        <div className="pl-5 sm:pl-8 pr-4 sm:pr-8 pt-6 sm:pt-10 pb-8 sm:pb-12 flex flex-col justify-between min-h-[600px] sm:min-h-[700px] relative">
          {/* Halftone / Screentone Background Pattern */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#38bdf8 1.5px, transparent 1.5px)',
              backgroundSize: '12px 12px',
            }}
          />

          {/* Top Header Bar: Japanese Manga Magazine Branding */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b-2 border-cyan-500/40 pb-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <span className="px-3 py-1 bg-cyan-500 text-slate-950 font-mono text-xs font-black rounded tracking-wider uppercase">
                CYBERMENTOR STORIES
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-cyan-400 tracking-widest">
                週刊サイバー防衛 // ISSUE #01
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 bg-purple-950/80 border border-purple-500/60 rounded text-[11px] font-mono font-bold text-purple-300">
                GENRE: {comic.genreLabel.toUpperCase()}
              </span>
              <span className="px-2.5 py-1 bg-cyan-950/80 border border-cyan-500/60 rounded text-[11px] font-mono font-bold text-cyan-300">
                {comic.topicLabel.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Center Visual Area: High-Impact Seinen Manga Hero Art */}
          <div className="relative z-10 my-6 sm:my-10 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Column: Big Title & Concept Blurb */}
            <div className="flex-1 space-y-4 text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-400 text-cyan-300 font-mono text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OFFICIAL DIGITAL ARCHIVE EPISODE</span>
              </div>

              {/* Japanese Kanji Subtitle */}
              <div className="text-lg sm:text-2xl font-black text-cyan-400/80 tracking-widest font-sans">
                『脅威の瞬間、正しい選択を』
              </div>

              {/* Main Chapter Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-mono tracking-tight leading-none uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                {comic.title}
              </h1>

              {/* Concept Synopsis */}
              <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed max-w-xl">
                {comic.summary}
              </p>

              {/* Protagonist & Reading Info Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-slate-300">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>PROTAGONIST: <strong className="text-white">{studentName.toUpperCase()}</strong></span>
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-slate-300">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>FORMAT: <strong>5 STORY CHAPTERS</strong></span>
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-slate-300">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>REWARD: <strong className="text-emerald-300">+5 DIGITAL TRUST</strong></span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Graphic Illustration Card */}
            <div className="w-full md:w-80 h-72 sm:h-88 rounded-xl overflow-hidden border-2 border-cyan-400 shadow-2xl relative bg-slate-950 flex-shrink-0">
              <svg viewBox="0 0 320 400" className="w-full h-full select-none">
                {/* Dark Ink Background with Diagonal Speed Lines */}
                <rect width="320" height="400" fill="#090d16" />
                <g stroke="#38bdf8" strokeWidth="1.5" opacity="0.3">
                  <line x1="0" y1="0" x2="320" y2="400" />
                  <line x1="50" y1="0" x2="370" y2="400" />
                  <line x1="-50" y1="0" x2="270" y2="400" />
                </g>

                {/* CyberMentor AI Floating Holographic Presence in Upper Right */}
                <g transform="translate(180, 40) scale(0.65)">
                  <circle cx="80" cy="80" r="50" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="4 2" />
                  <ellipse cx="80" cy="60" rx="20" ry="26" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" />
                  <rect x="66" y="55" width="28" height="8" rx="2" fill="#22d3ee" />
                  <path d="M40 90 Q80 75 120 90 L110 160 L50 160 Z" fill="#0284c7" opacity="0.8" />
                </g>

                {/* Saurav Foreground Seinen Protagonist Key Visual */}
                <g transform="translate(50, 110)">
                  {/* Dramatic Rim Lighting from Phone Screen */}
                  <polygon points="40,180 180,180 160,280 20,280" fill="#1e2238" stroke="#090d16" strokeWidth="3" />
                  <polygon points="65,110 135,110 125,180 75,180" fill="#fed7aa" stroke="#090d16" strokeWidth="2.5" />
                  {/* Focused Eyes */}
                  <path d="M78 135 L90 132" stroke="#090d16" strokeWidth="3" />
                  <circle cx="85" cy="140" r="2.5" fill="#38bdf8" />
                  <path d="M110 132 L122 135" stroke="#090d16" strokeWidth="3" />
                  <circle cx="115" cy="140" r="2.5" fill="#38bdf8" />
                  {/* Seinen Dark Layered Hair */}
                  <path d="M50 110 Q100 70 150 110 L140 140 L60 140 Z" fill="#090d16" stroke="#38bdf8" strokeWidth="2" />
                  {/* Headphones around neck */}
                  <path d="M60 170 Q100 190 140 170" stroke="#38bdf8" strokeWidth="6" fill="none" strokeLinecap="round" />
                  {/* Glowing Smartphone in Hand */}
                  <rect x="110" y="210" width="55" height="85" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
                  <rect x="115" y="218" width="45" height="68" rx="4" fill="#0284c7" />
                  <rect x="120" y="230" width="35" height="14" rx="2" fill="#f8fafc" />
                </g>

                {/* Red Warning Alert Stamp */}
                <g transform="translate(180, 290) rotate(-12)">
                  <rect x="0" y="0" width="115" height="32" rx="4" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
                  <text x="57" y="21" fill="#ffffff" fontSize="12" fontWeight="900" fontFamily="monospace" textAnchor="middle">
                    CRITICAL THREAT
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* Bottom Action Section */}
          <div className="relative z-20 pt-6 border-t-2 border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => {
                playClickSound();
                onBackToHub();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-mono text-xs font-bold transition-colors cursor-pointer"
            >
              ← RETURN TO STORY LIBRARY
            </button>

            <button
              onClick={() => {
                playClickSound();
                onStartReading();
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-sm sm:text-base font-black tracking-wider uppercase shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.8)] transition-all flex items-center justify-center space-x-3"
            >
              <BookOpen className="w-5 h-5" />
              <span>START READING CHAPTER &gt;&gt;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
