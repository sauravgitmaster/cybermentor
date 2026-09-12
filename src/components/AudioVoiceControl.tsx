import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play, RotateCcw, Square } from 'lucide-react';
import {
  speakDialogue,
  stopSpeech,
  pauseSpeech,
  resumeSpeech,
  isSpeechActive,
  subscribeSpeechState,
  getAudioMuted,
  playClickSound,
} from '../utils/audio';

interface AudioVoiceControlProps {
  textToSpeak: string;
  label?: string;
  autoSpeak?: boolean;
  className?: string;
  compact?: boolean;
}

export const AudioVoiceControl: React.FC<AudioVoiceControlProps> = ({
  textToSpeak,
  label = 'Voice',
  autoSpeak = false,
  className = '',
  compact = false,
}) => {
  const [speaking, setSpeaking] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = subscribeSpeechState((isSpeaking) => {
      setSpeaking(isSpeaking);
      if (!isSpeaking) {
        setPaused(false);
      }
    });

    if (autoSpeak && textToSpeak && !getAudioMuted()) {
      const timer = setTimeout(() => {
        speakDialogue(textToSpeak, () => {
          setSpeaking(false);
          setPaused(false);
        });
        setHasStarted(true);
      }, 350);
      return () => {
        clearTimeout(timer);
        unsubscribe();
      };
    }

    return () => {
      unsubscribe();
    };
  }, [textToSpeak, autoSpeak]);

  // Clean up speech if component unmounts
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const handlePlay = () => {
    playClickSound();
    if (paused) {
      resumeSpeech();
      setPaused(false);
      setSpeaking(true);
    } else {
      speakDialogue(textToSpeak, () => {
        setSpeaking(false);
        setPaused(false);
      });
      setHasStarted(true);
      setSpeaking(true);
      setPaused(false);
    }
  };

  const handlePause = () => {
    playClickSound();
    pauseSpeech();
    setPaused(true);
    setSpeaking(false);
  };

  const handleReplay = () => {
    playClickSound();
    stopSpeech();
    setPaused(false);
    speakDialogue(textToSpeak, () => {
      setSpeaking(false);
      setPaused(false);
    });
    setSpeaking(true);
    setHasStarted(true);
  };

  const handleStop = () => {
    playClickSound();
    stopSpeech();
    setSpeaking(false);
    setPaused(false);
  };

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        {!speaking ? (
          <button
            type="button"
            onClick={handlePlay}
            title={paused ? 'Resume voice' : 'Play voice'}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-700/60 text-cyan-300 hover:text-white text-[11px] font-mono font-bold transition-colors cursor-pointer"
          >
            <Volume2 className="h-3.5 w-3.5 text-cyan-400" />
            <span>{paused ? 'RESUME' : label}</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-1 rounded-lg bg-cyan-950/80 border border-cyan-500/70 px-2 py-0.5 shadow-sm">
            <span className="flex items-center gap-0.5 mr-1">
              <span className="h-2 w-0.5 bg-cyan-400 animate-pulse" />
              <span className="h-3.5 w-0.5 bg-cyan-300 animate-pulse" style={{ animationDelay: '150ms' }} />
              <span className="h-2 w-0.5 bg-cyan-400 animate-pulse" style={{ animationDelay: '300ms' }} />
            </span>
            <button
              type="button"
              onClick={handlePause}
              title="Pause voice"
              className="p-1 hover:bg-cyan-800/60 text-cyan-200 rounded cursor-pointer"
            >
              <Pause className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={handleStop}
              title="Stop voice"
              className="p-1 hover:bg-rose-900/60 text-rose-300 rounded cursor-pointer"
            >
              <Square className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-cyan-600/40 bg-[#0d1624]/90 backdrop-blur-xs text-xs font-mono shadow-md ${className}`}
    >
      <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
        <Volume2 className={`h-4 w-4 ${speaking ? 'animate-bounce' : ''}`} />
        <span className="uppercase text-[11px] tracking-wider">{label}</span>
      </div>

      {speaking && (
        <span className="flex items-center gap-0.5 px-1">
          <span className="h-2 w-0.5 bg-cyan-400 animate-pulse" />
          <span className="h-3.5 w-0.5 bg-cyan-300 animate-pulse" style={{ animationDelay: '150ms' }} />
          <span className="h-2 w-0.5 bg-cyan-400 animate-pulse" style={{ animationDelay: '300ms' }} />
        </span>
      )}

      <div className="flex items-center gap-1 border-l border-cyan-800/60 pl-2">
        {!speaking ? (
          <button
            type="button"
            onClick={handlePlay}
            className="p-1.5 rounded-lg hover:bg-cyan-900/60 text-cyan-300 hover:text-white transition-colors cursor-pointer"
            title={paused ? 'Resume' : 'Listen'}
          >
            <Play className="h-3.5 w-3.5 fill-current" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePause}
            className="p-1.5 rounded-lg hover:bg-cyan-900/60 text-cyan-300 hover:text-white transition-colors cursor-pointer"
            title="Pause"
          >
            <Pause className="h-3.5 w-3.5 fill-current" />
          </button>
        )}

        {hasStarted && (
          <button
            type="button"
            onClick={handleReplay}
            className="p-1.5 rounded-lg hover:bg-cyan-900/60 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Replay from start"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        )}

        {(speaking || paused) && (
          <button
            type="button"
            onClick={handleStop}
            className="p-1.5 rounded-lg hover:bg-rose-950/60 text-rose-300 hover:text-rose-200 transition-colors cursor-pointer"
            title="Stop audio"
          >
            <Square className="h-3.5 w-3.5 fill-current" />
          </button>
        )}
      </div>
    </div>
  );
};
