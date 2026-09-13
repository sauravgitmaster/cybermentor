import React from 'react';
import { MangaPanel, VisualCharacterInstance } from '../../types/manga';
import { MangaBackgroundSvg } from './art/MangaBackgroundSvg';
import { MangaCharacterSvg } from './art/MangaCharacterSvg';
import { MangaSpeechBubble, MangaSoundEffect } from './art/MangaSpeechBubble';
import { MangaVisualClueCard } from './art/MangaVisualClueCard';

interface MangaIllustratedPanelProps {
  panel: MangaPanel;
  studentName?: string;
  className?: string;
  isCurrent?: boolean;
}

export const MangaIllustratedPanel: React.FC<MangaIllustratedPanelProps> = ({
  panel,
  studentName = 'Saurav',
  className = '',
  isCurrent = true,
}) => {
  const {
    panelNumber,
    panelType,
    title,
    visualTone,
    soundEffect,
    captionBox,
    backgroundScene = 'campus-cafeteria',
    compositionLayout = 'cinematic-wide',
    characters,
    speechBubbles,
    dialogue,
    clueOverlay,
    visualClue,
    characterAction,
  } = panel;

  // Derive characters if not explicitly defined
  const activeCharacters: VisualCharacterInstance[] =
    characters && characters.length > 0
      ? characters
      : deriveDefaultCharacters(panelType, studentName);

  // Derive speech bubbles from dialogue if not explicitly structured
  const activeSpeechBubbles =
    speechBubbles && speechBubbles.length > 0
      ? speechBubbles
      : deriveDefaultBubbles(dialogue, panelType, studentName);

  // Derive cinematic caption box if not provided
  const activeCaption =
    captionBox?.text ||
    deriveDefaultCaption(panelType, panelNumber, title);

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border-[3.5px] border-slate-900 bg-slate-950 shadow-2xl transition-all duration-300 ${
        isCurrent ? 'ring-2 ring-cyan-500/50' : 'opacity-90'
      } ${className}`}
    >
      {/* ---------------- COMIC PANEL CANVAS CONTAINER ---------------- */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[2/1] min-h-[300px] sm:min-h-[360px] overflow-hidden">
        {/* 1. Background Illustrated Scene */}
        <MangaBackgroundSvg
          scene={backgroundScene}
          composition={compositionLayout}
        />

        {/* 2. Manga Speed Lines / Action Overlay based on Visual Tone */}
        {renderMangaToneOverlay(visualTone)}

        {/* 3. Character Illustrations in Scene */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {activeCharacters.map((char, index) => (
            <MangaCharacterSvg
              key={`${char.characterId}-${index}`}
              character={char}
              customStudentName={studentName}
            />
          ))}
        </div>

        {/* 4. Visual Cybersecurity Clue in Scene */}
        {(visualClue || clueOverlay) && (
          <MangaVisualClueCard
            clue={visualClue}
            clueOverlay={clueOverlay}
          />
        )}

        {/* 5. Comic Speech Bubbles inside panel */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {activeSpeechBubbles.map((bubble, index) => (
            <MangaSpeechBubble
              key={bubble.id || `bubble-${index}`}
              bubble={bubble}
            />
          ))}
        </div>

        {/* 6. Sound Effect Lettering in Manga Typography */}
        <MangaSoundEffect soundText={soundEffect} />

        {/* 7. Classic Manga Caption Box in Top Corner */}
        {activeCaption && (
          <div className="absolute top-3 left-3 z-30 pointer-events-auto">
            <div className="bg-amber-100/95 border-2 border-slate-900 px-2.5 py-1 rounded shadow-md transform -rotate-1 max-w-[80%] sm:max-w-xs">
              <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase text-slate-900 font-mono">
                {activeCaption}
              </span>
            </div>
          </div>
        )}

        {/* 8. Panel Number Chip in Top Right */}
        <div className="absolute top-3 right-3 z-30 pointer-events-none">
          <div className="bg-slate-950/80 border border-slate-700 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-slate-300">
            PANEL {panelNumber}
          </div>
        </div>

        {/* 9. Subtle Vignette & Comic Edge Shadow */}
        <div className="absolute inset-0 pointer-events-none border-[6px] border-slate-950/40 shadow-[inset_0_0_30px_rgba(0,0,0,0.7)]" />
      </div>
    </div>
  );
};

// =========================================================================
// HELPER FUNCTIONS FOR SEAMLESS STORYTELLING
// =========================================================================

function renderMangaToneOverlay(tone: string) {
  if (tone === 'speed-lines') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 opacity-35 mix-blend-screen">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((pos) => (
            <line
              key={pos}
              x1="50"
              y1="50"
              x2={pos}
              y2="0"
              stroke="#ffffff"
              strokeWidth="0.75"
            />
          ))}
          {[0, 20, 40, 60, 80, 100].map((pos) => (
            <line
              key={`bot-${pos}`}
              x1="50"
              y1="50"
              x2={pos}
              y2="100"
              stroke="#ffffff"
              strokeWidth="0.75"
            />
          ))}
        </svg>
      </div>
    );
  }

  if (tone === 'alert-glow') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 bg-red-600/15 animate-pulse" />
    );
  }

  if (tone === 'sleuth-tint') {
    return (
      <div className="absolute inset-0 pointer-events-none z-10 bg-cyan-900/20" />
    );
  }

  return null;
}

function deriveDefaultCharacters(panelType: string, studentName: string): VisualCharacterInstance[] {
  switch (panelType) {
    case 'story':
      return [
        {
          characterId: 'saurav',
          name: studentName,
          pose: 'seated-laptop',
          position: 'center',
        },
      ];
    case 'problem':
      return [
        {
          characterId: 'saurav',
          name: studentName,
          pose: 'checking-phone',
          position: 'center',
        },
      ];
    case 'clue':
      return [
        {
          characterId: 'saurav',
          name: studentName,
          pose: 'suspicious-squint',
          position: 'left',
        },
        {
          characterId: 'mentor',
          name: 'CyberMentor AI',
          pose: 'mentor-pointing',
          position: 'right',
        },
      ];
    case 'tension':
      return [
        {
          characterId: 'saurav',
          name: studentName,
          pose: 'shocked-panic',
          position: 'center',
        },
      ];
    case 'decision':
      return [
        {
          characterId: 'saurav',
          name: studentName,
          pose: 'thinking',
          position: 'left',
        },
        {
          characterId: 'mentor',
          name: 'CyberMentor AI',
          pose: 'mentor-floating',
          position: 'right',
        },
      ];
    case 'consequence':
      return [
        {
          characterId: 'saurav',
          name: studentName,
          pose: 'relieved-thumbsup',
          position: 'left',
        },
        {
          characterId: 'mentor',
          name: 'CyberMentor AI',
          pose: 'mentor-shield',
          position: 'right',
        },
      ];
    case 'mentor':
    case 'principle':
      return [
        {
          characterId: 'mentor',
          name: 'CyberMentor AI',
          pose: 'mentor-floating',
          position: 'center',
        },
      ];
    default:
      return [
        {
          characterId: 'saurav',
          name: studentName,
          pose: 'idle',
          position: 'center',
        },
      ];
  }
}

function deriveDefaultBubbles(
  dialogue: any[] | undefined,
  panelType: string,
  studentName: string
) {
  if (!dialogue || dialogue.length === 0) return [];

  return dialogue.map((d, index) => {
    const isMentor = d.role === 'mentor' || d.speaker?.includes('AI') || d.speaker?.includes('Mentor');
    const isAdversary = d.role === 'adversary' || d.speaker?.includes('Alert') || d.speaker?.includes('Scammer');

    let bubbleType: any = d.bubbleType || 'speech';
    if (isMentor) bubbleType = 'hologram';
    if (isAdversary) bubbleType = 'system-alert';
    if (panelType === 'tension' && !isMentor) bubbleType = 'shout';

    let position: any = 'top-left';
    let tailDirection: any = 'down-left';

    if (isMentor) {
      position = 'top-right';
      tailDirection = 'down-right';
    } else if (index === 1) {
      position = 'top-right';
      tailDirection = 'down-right';
    }

    return {
      id: `bubble-${index}`,
      speaker: d.speaker === 'Ren' ? studentName : d.speaker,
      text: d.text?.replace(/\bRen\b/g, studentName),
      bubbleType,
      position,
      tailDirection,
      characterRole: d.role,
    };
  });
}

function deriveDefaultCaption(panelType: string, panelNumber: number, title?: string): string {
  if (title && !title.startsWith('SCENE')) {
    return title;
  }

  switch (panelType) {
    case 'story':
      return 'CAMPUS CAFETERIA — FRIDAY AFTERNOON';
    case 'problem':
      return 'UNEXPECTED HIGH-PRIORITY TRANSMISSION';
    case 'clue':
      return 'FORENSIC INSPECTION // SUSPICIOUS DOMAIN';
    case 'tension':
      return 'THE CLOCK IS TICKING DOWN...';
    case 'decision':
      return 'TACTICAL FORK: CHOOSE YOUR DEFENSIVE MOVE';
    case 'consequence':
      return 'THE RESULT OF YOUR CHOICE';
    case 'mentor':
      return 'CYBERMENTOR AI TACTICAL DEBRIEF';
    case 'principle':
      return 'THE GOLDEN CYBERSECURITY PRINCIPLE';
    default:
      return `PANEL ${panelNumber}`;
  }
}
