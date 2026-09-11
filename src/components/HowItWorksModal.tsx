import React from 'react';
import {
  X,
  Compass,
  Users,
  Search,
  CheckCircle2,
  Brain,
  Play,
} from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface HowItWorksModalProps {
  onClose: () => void;
  onStartPlaying?: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  onClose,
  onStartPlaying,
}) => {
  const steps = [
    {
      number: '1',
      title: 'Explore',
      description: 'Walk around campus and discover what is happening.',
      icon: Compass,
      color: 'text-sky-400 bg-sky-950/60 border-sky-700/50',
    },
    {
      number: '2',
      title: 'Meet People',
      description: 'Talk to students, professors, and campus staff who need help.',
      icon: Users,
      color: 'text-emerald-400 bg-emerald-950/60 border-emerald-700/50',
    },
    {
      number: '3',
      title: 'Investigate',
      description: 'Look closely at suspicious messages, strange links, and files.',
      icon: Search,
      color: 'text-amber-400 bg-amber-950/60 border-amber-700/50',
    },
    {
      number: '4',
      title: 'Make a Choice',
      description: 'Decide what to do to keep everyone safe from threats.',
      icon: CheckCircle2,
      color: 'text-cyan-400 bg-cyan-950/60 border-cyan-700/50',
    },
    {
      number: '5',
      title: 'Learn from your Mentor',
      description: 'Get helpful advice and build real cybersecurity knowledge.',
      icon: Brain,
      color: 'text-indigo-400 bg-indigo-950/60 border-indigo-700/50',
    },
  ];

  return (
    <div
      id="how-it-works-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 overflow-y-auto"
    >
      <div className="my-auto w-full max-w-lg rounded-2xl border border-slate-700 bg-[#0f172a] p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide">
              How to Play
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Five simple steps to explore and learn
            </p>
          </div>
          <button
            id="close-how-it-works-btn"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 5 Simple Steps */}
        <div className="space-y-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="flex items-center gap-3.5 p-3 rounded-xl border border-slate-800/80 bg-slate-900/50 hover:bg-slate-900 transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 ${step.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 font-mono">
                      STEP {step.number}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {step.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Close
          </button>

          {onStartPlaying && (
            <button
              onClick={() => {
                playClickSound();
                onClose();
                onStartPlaying();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>START PLAYING</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


