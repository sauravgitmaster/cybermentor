import React from 'react';
import { MangaPanel } from '../../types/manga';
import { AlertTriangle, Info, ShieldCheck, Sparkles, Terminal, Volume2 } from 'lucide-react';

interface MangaPanelCardProps {
  panel: MangaPanel;
  isActive?: boolean;
  totalPanels?: number;
}

export const MangaPanelCard: React.FC<MangaPanelCardProps> = ({
  panel,
  isActive = true,
  totalPanels = 8,
}) => {
  // Visual Tone backgrounds and border styling
  const getVisualToneClasses = () => {
    switch (panel.visualTone) {
      case 'speed-lines':
        return 'bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]';
      case 'dramatic-shadow':
        return 'bg-gradient-to-b from-zinc-950 via-neutral-900 to-black border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)]';
      case 'comedic-sweat-drop':
        return 'bg-gradient-to-b from-slate-900 via-sky-950 to-slate-950 border-sky-400/50 shadow-[0_0_20px_rgba(56,189,248,0.15)]';
      case 'alert-glow':
        return 'bg-gradient-to-b from-slate-950 via-rose-950/50 to-slate-950 border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
      case 'sleuth-tint':
        return 'bg-gradient-to-b from-slate-950 via-emerald-950/40 to-slate-950 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]';
      case 'cyber-grid':
      default:
        return 'bg-gradient-to-b from-slate-900 via-slate-950 to-black border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.1)]';
    }
  };

  // Render authentic manga-style vector illustrations based on variant
  const renderPanelIllustration = () => {
    switch (panel.artSvgVariant) {
      case 'screen-urgency':
        return (
          <div className="relative w-full h-44 sm:h-52 bg-slate-950 rounded-lg overflow-hidden border border-slate-700/80 flex items-center justify-center p-4">
            {/* Speed Lines Background */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="speed-radial" width="100%" height="100%" patternUnits="userSpaceOnUse">
                  <path d="M0,0 L200,100 M400,0 L200,100 M0,200 L200,100 M400,200 L200,100 M100,0 L200,100 M300,0 L200,100 M100,200 L200,100 M300,200 L200,100" stroke="#06b6d4" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#speed-radial)" />
            </svg>
            {/* Computer Screen */}
            <div className="relative z-10 w-full max-w-sm bg-slate-900 border-2 border-rose-500/80 rounded-md p-3 shadow-lg">
              <div className="flex items-center justify-between border-b border-rose-500/40 pb-1.5 mb-2">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                  <span className="text-[10px] font-mono uppercase font-bold text-rose-300 tracking-wider">CRITICAL ALERT // 09:59</span>
                </div>
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              </div>
              <p className="text-xs text-rose-200 font-mono leading-relaxed line-clamp-2">
                SSO Credentials Expiration Imminent. Identity authentication required to prevent lockout.
              </p>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">Dest: un1versity-portal.xyz</span>
                <span className="px-2 py-0.5 bg-rose-600 text-white font-mono text-[10px] font-bold rounded">VERIFY NOW</span>
              </div>
            </div>
          </div>
        );

      case 'phone-incoming':
        return (
          <div className="relative w-full h-44 sm:h-52 bg-slate-950 rounded-lg overflow-hidden border border-slate-700/80 flex items-center justify-center p-4">
            <div className="relative z-10 w-full max-w-xs bg-slate-900 border-2 border-indigo-500/80 rounded-2xl p-4 shadow-xl text-center">
              <div className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 mb-1">INCOMING AUDIO TRANSMISSION</div>
              <div className="text-sm font-bold text-white font-mono">UNKNOWN NUMBER (+1-555-0199)</div>
              {/* Synthetic Waveform */}
              <div className="flex items-center justify-center space-x-1 my-3 h-8">
                {[40, 70, 95, 30, 85, 100, 60, 45, 90, 80, 50, 65, 30].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-gradient-to-t from-cyan-500 to-indigo-400 rounded-full animate-pulse"
                    style={{ height: `${h}%`, animationDelay: `${i * 70}ms` }}
                  ></span>
                ))}
              </div>
              <div className="text-[11px] text-indigo-200 font-mono">"Maya: Alex, please send $180 right now!!"</div>
            </div>
          </div>
        );

      case 'investigate-lens':
        return (
          <div className="relative w-full h-44 sm:h-52 bg-slate-950 rounded-lg overflow-hidden border border-slate-700/80 flex items-center justify-center p-4">
            <div className="relative z-10 w-full max-w-sm bg-slate-900/90 border border-emerald-500/60 rounded-lg p-3 shadow-lg">
              <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-bold mb-2">
                <Terminal className="w-4 h-4" />
                <span>FORENSIC MAGNIFICATION MATRIX</span>
              </div>
              <div className="bg-black/80 p-2.5 rounded border border-emerald-500/40 font-mono text-xs text-slate-200 space-y-1">
                <div>Sender: <span className="text-amber-300 font-bold underline decoration-rose-500 decoration-2">admin@un1versity-help.xyz</span></div>
                <div>Status: <span className="text-rose-400 font-bold">TYPOSQUATTED DOMAIN (1 vs i)</span></div>
                <div>Protocol: <span className="text-slate-400">HTTP (Unencrypted login)</span></div>
              </div>
            </div>
          </div>
        );

      case 'panic-sweat':
        return (
          <div className="relative w-full h-44 sm:h-52 bg-slate-950 rounded-lg overflow-hidden border border-slate-700/80 flex items-center justify-center p-4">
            {/* Dramatic anime shock lines */}
            <div className="relative z-10 text-center max-w-xs">
              <div className="inline-block p-3 bg-slate-900 border-2 border-amber-500/80 rounded-xl shadow-xl">
                <div className="text-2xl font-black text-amber-400 tracking-wider mb-1 font-mono">00:09:59</div>
                <div className="text-xs text-amber-200 font-mono font-bold uppercase tracking-widest animate-pulse">
                  PRESSURE PEAK // EMOTIONAL OVERLOAD
                </div>
                <div className="mt-2 text-[11px] text-slate-300 italic">
                  Sweat drops fly as the countdown clock ticks down. One click changes everything!
                </div>
              </div>
            </div>
          </div>
        );

      case 'decision-split':
        return (
          <div className="relative w-full h-44 sm:h-52 bg-slate-950 rounded-lg overflow-hidden border-2 border-amber-400/80 flex items-center justify-center p-4">
            <div className="relative z-10 text-center space-y-2">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-mono text-xs font-bold rounded-full border border-amber-500/50">
                WHAT WOULD YOU DO?
              </span>
              <h4 className="text-lg font-black text-white font-mono tracking-wide">
                TACTICAL FORK IN THE ROAD
              </h4>
              <p className="text-xs text-slate-300 font-mono max-w-xs mx-auto">
                The story halts here. Review the options below and select your move to unlock Panel 6!
              </p>
            </div>
          </div>
        );

      case 'shield-active':
        return (
          <div className="relative w-full h-44 sm:h-52 bg-slate-950 rounded-lg overflow-hidden border border-emerald-500/80 flex items-center justify-center p-4">
            <div className="relative z-10 text-center space-y-2 max-w-sm">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.4)]">
                <ShieldCheck className="w-6 h-6 text-emerald-300" />
              </div>
              <div className="text-sm font-black font-mono text-emerald-300 tracking-wider uppercase">
                DEFENSE PROTOCOL CONFIRMED
              </div>
              <p className="text-xs text-emerald-100/90 font-mono">
                Threat deflected. The unverified lure failed against zero-trust discipline.
              </p>
            </div>
          </div>
        );

      case 'mentor-hologram':
        return (
          <div className="relative w-full h-44 sm:h-52 bg-slate-950 rounded-lg overflow-hidden border border-cyan-500/80 flex items-center justify-center p-4">
            <div className="relative z-10 flex items-center space-x-3 bg-slate-900/90 border border-cyan-400/50 rounded-xl p-3.5 max-w-md shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-cyan-950 border border-cyan-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <Sparkles className="w-6 h-6 text-cyan-300 animate-pulse" />
              </div>
              <div className="text-left space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  CYBERMENTOR AI // TACTICAL ARCHIVE
                </div>
                <p className="text-xs text-slate-200 font-mono leading-relaxed">
                  "Adversaries don't just attack machines. They attack human cognitive shortcuts."
                </p>
              </div>
            </div>
          </div>
        );

      case 'wisdom-scroll':
      default:
        return (
          <div className="relative w-full h-44 sm:h-52 bg-gradient-to-r from-amber-950/40 via-slate-950 to-amber-950/40 rounded-lg overflow-hidden border-2 border-amber-400/70 flex items-center justify-center p-4">
            <div className="relative z-10 text-center space-y-2 max-w-sm">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold rounded-full border border-amber-400/50 uppercase tracking-widest">
                GOLDEN DEFENSE TAKEAWAY
              </span>
              <div className="text-base font-black text-white font-mono tracking-wide">
                PAUSE → INSPECT → VERIFY
              </div>
              <p className="text-xs text-amber-100/90 font-mono">
                Memorize this mantra. It breaks 99% of social engineering and deceptive lures.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <article
      id={`manga-panel-${panel.panelNumber}`}
      className={`relative rounded-xl border-2 p-4 transition-all duration-300 ${getVisualToneClasses()}`}
    >
      {/* Halftone / Screen Tone Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5 rounded-xl"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '8px 8px',
        }}
      />

      {/* Top Header: Panel Number & Sound Effect */}
      <header className="relative z-10 flex items-center justify-between mb-3 border-b border-slate-700/60 pb-2">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 bg-black/80 text-cyan-400 font-mono text-xs font-bold rounded border border-cyan-500/40">
            PANEL {panel.panelNumber} of {totalPanels}
          </span>
          <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wide">
            {panel.title || `SCENE ${panel.panelNumber}`}
          </span>
        </div>

        {panel.soundEffect && (
          <div className="flex items-center space-x-1 px-2.5 py-0.5 bg-rose-950/80 border border-rose-500/60 text-rose-300 font-mono text-xs font-black rounded-md tracking-widest transform -rotate-1 shadow-sm">
            <Volume2 className="w-3 h-3 text-rose-400" />
            <span>*{panel.soundEffect}*</span>
          </div>
        )}
      </header>

      {/* Visual Artwork Centerpiece */}
      <div className="relative z-10 mb-3">
        {renderPanelIllustration()}
      </div>

      {/* Scene Description & Action */}
      <div className="relative z-10 mb-3 bg-black/40 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300 font-mono leading-relaxed">
        <span className="text-cyan-400 font-bold mr-1.5">[SCENE]</span>
        {panel.sceneDescription}
        {panel.characterAction && (
          <div className="mt-1 text-slate-400 italic">
            <span className="text-amber-400 font-bold not-italic mr-1.5">[ACTION]</span>
            {panel.characterAction}
          </div>
        )}
      </div>

      {/* Clue Overlay Callout */}
      {panel.clueOverlay && (
        <aside aria-label="Investigation Clue" className="relative z-10 mb-3 bg-amber-950/40 border border-amber-500/60 rounded-lg p-2.5 flex items-start space-x-2">
          <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs font-mono">
            <span className="font-bold text-amber-300 uppercase tracking-wide mr-1.5">
              {panel.clueOverlay.label}:
            </span>
            <span className="text-amber-100">{panel.clueOverlay.text}</span>
          </div>
        </aside>
      )}

      {/* Dialogue Speech Bubbles */}
      {panel.dialogue && panel.dialogue.length > 0 && (
        <section aria-label="Scene Dialogue" className="relative z-10 space-y-2 mt-2">
          {panel.dialogue.map((d, idx) => {
            const isMentor = d.role === 'mentor' || d.bubbleType === 'hologram';
            const isShout = d.bubbleType === 'shout';
            const isThought = d.bubbleType === 'thought';

            let bubbleStyle = 'bg-slate-900 border-slate-700 text-slate-100';
            if (isMentor) {
              bubbleStyle = 'bg-cyan-950/80 border-cyan-400/80 text-cyan-100 shadow-[0_0_10px_rgba(6,182,212,0.2)]';
            } else if (isShout) {
              bubbleStyle = 'bg-rose-950/80 border-rose-500 text-white font-bold tracking-wide shadow-[0_0_10px_rgba(244,63,94,0.2)]';
            } else if (isThought) {
              bubbleStyle = 'bg-slate-950/90 border-slate-600 border-dashed text-slate-300 italic';
            }

            return (
              <div key={idx} className={`p-2.5 rounded-lg border text-xs font-mono leading-relaxed ${bubbleStyle}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-bold uppercase tracking-wider text-[11px] ${isMentor ? 'text-cyan-400' : isShout ? 'text-rose-300' : 'text-amber-400'}`}>
                    {d.speaker} {isMentor ? '◈ HOLOGRAM' : isThought ? '💭 (THOUGHT)' : isShout ? '⚡ (SHOUT)' : '💬'}
                  </span>
                </div>
                <p>{d.text}</p>
              </div>
            );
          })}
        </section>
      )}
    </article>
  );
};
