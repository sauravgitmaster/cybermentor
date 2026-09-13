import React, { useState } from 'react';
import { MangaVisualClue } from '../../../types/manga';
import { Search, AlertTriangle, ShieldCheck, ZoomIn, Info } from 'lucide-react';

interface MangaVisualClueCardProps {
  clue?: MangaVisualClue;
  clueOverlay?: {
    label: string;
    text: string;
    type: 'warning' | 'info' | 'critical';
  };
  className?: string;
}

export const MangaVisualClueCard: React.FC<MangaVisualClueCardProps> = ({
  clue,
  clueOverlay,
  className = '',
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!clue && !clueOverlay) return null;

  // Use provided clue or derive from clueOverlay
  const displayLabel = clue?.label || clueOverlay?.label || 'FORENSIC EVIDENCE';
  const displayValue = clue?.displayValue || clueOverlay?.text || '';
  const explanation = clue?.flawExplanation || clueOverlay?.text || '';
  const highlightTarget = clue?.highlightSubstring || '1';

  return (
    <div className={`absolute z-30 pointer-events-auto bottom-3 right-3 sm:bottom-4 sm:right-4 max-w-[85%] sm:max-w-sm ${className}`}>
      {/* Interactive Detective Magnifier Card */}
      <div
        onClick={() => setIsZoomed(!isZoomed)}
        className={`group cursor-pointer bg-slate-950/95 border-2 ${
          isZoomed ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-cyan-400/70 hover:border-cyan-300'
        } rounded-xl p-2.5 sm:p-3 shadow-2xl backdrop-blur-md transition-all duration-200 transform hover:-translate-y-0.5`}
      >
        {/* Card Header */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="text-[10px] sm:text-xs font-black tracking-wider uppercase text-amber-300 font-mono">
              {displayLabel}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-semibold text-cyan-400 group-hover:underline flex items-center gap-0.5 font-mono">
              <ZoomIn className="w-3 h-3" />
              {isZoomed ? 'COLLAPSE' : 'INSPECT CLUE'}
            </span>
          </div>
        </div>

        {/* Clue Visual Presentation */}
        <div className="bg-slate-900 border border-slate-700/80 rounded-lg p-2 font-mono text-xs">
          {renderClueVisualContent(clue, displayValue, highlightTarget)}
        </div>

        {/* Expanded Detective Explanation */}
        {isZoomed && (
          <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] sm:text-xs text-slate-200 leading-relaxed animate-fadeIn">
            <div className="flex items-start gap-1.5 text-amber-300 font-semibold mb-1">
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-400" />
              <span>Detective Forensic Analysis:</span>
            </div>
            <p className="text-slate-300 pl-5">
              {explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

function renderClueVisualContent(
  clue: MangaVisualClue | undefined,
  fallbackText: string,
  highlightTarget: string
) {
  if (!clue) {
    return (
      <div className="text-slate-200 text-xs">
        <span className="text-amber-400 font-bold">DETECTED: </span>
        {fallbackText}
      </div>
    );
  }

  switch (clue.type) {
    case 'domain':
    case 'url':
      return (
        <div>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-1">
            <span className="px-1 py-0.2 bg-red-950/80 border border-red-500/50 text-red-400 rounded text-[9px] font-bold">
              HTTP // INSECURE
            </span>
            <span>URL TARGET:</span>
          </div>
          <div className="text-xs sm:text-sm font-bold tracking-wide break-all">
            <span className="text-slate-400">http://</span>
            {renderHighlightedUrl(clue.displayValue, highlightTarget)}
          </div>
        </div>
      );

    case 'wifi':
      return (
        <div>
          <div className="text-[10px] text-slate-400 mb-1">NEARBY WI-FI NETWORKS:</div>
          <div className="space-y-1">
            <div className="flex items-center justify-between p-1 rounded bg-red-950/40 border border-red-500/60 text-rose-300 font-bold">
              <span>⚠️ {clue.displayValue}</span>
              <span className="text-[9px] bg-red-500 text-white px-1 rounded">OPEN / NO LOCK</span>
            </div>
            <div className="flex items-center justify-between p-1 rounded bg-slate-800 text-slate-400 text-[10px]">
              <span>🔒 CampusSecure_802.1X</span>
              <span className="text-emerald-400 text-[9px]">WPA3-ENTERPRISE</span>
            </div>
          </div>
        </div>
      );

    case 'qr':
      return (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white border-2 border-red-500 rounded p-0.5 flex-shrink-0 flex items-center justify-center">
            <div className="w-full h-full bg-slate-900 grid grid-cols-3 gap-0.5 p-0.5">
              <div className="bg-white" />
              <div className="bg-red-500" />
              <div className="bg-white" />
              <div className="bg-red-500" />
              <div className="bg-white" />
              <div className="bg-white" />
              <div className="bg-white" />
              <div className="bg-red-500" />
              <div className="bg-white" />
            </div>
          </div>
          <div className="text-[11px] leading-tight text-rose-300">
            <span className="text-white font-bold block">PEELED QR STICKER:</span>
            Points to: <span className="text-amber-400 underline">{clue.displayValue}</span>
          </div>
        </div>
      );

    case 'phone':
      return (
        <div>
          <div className="text-[10px] text-slate-400 mb-0.5">CALLER ID SPOOFING:</div>
          <div className="text-sm font-bold text-rose-400">
            {clue.displayValue}
          </div>
          <div className="text-[10px] text-amber-300 flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            Synthetic voice artifacts detected (+4.2dB jitter)
          </div>
        </div>
      );

    default:
      return (
        <div className="text-xs text-amber-200">
          <span className="text-cyan-400 font-bold">KEY CLUE: </span>
          {clue.displayValue}
        </div>
      );
  }
}

function renderHighlightedUrl(url: string, highlight: string) {
  if (!highlight || !url.includes(highlight)) {
    return <span className="text-rose-400 underline">{url}</span>;
  }

  const parts = url.split(highlight);
  return (
    <span>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          <span className="text-slate-200">{part}</span>
          {index < parts.length - 1 && (
            <span className="bg-red-600 text-white font-black px-1 rounded ring-2 ring-red-400 animate-pulse">
              {highlight}
            </span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
}
