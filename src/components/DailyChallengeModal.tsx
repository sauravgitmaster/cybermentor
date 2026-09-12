import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Shield,
  X,
  Zap,
} from 'lucide-react';
import { playClickSound, playSuccessSound, playWarningSound } from '../utils/audio';

interface DailyChallengeModalProps {
  onClose: () => void;
  onRecordDecision: (points: number, reason: string) => void;
  alreadyCompleted?: boolean;
}

const DAILY_SCENARIOS = [
  {
    id: 'daily-cert-popup',
    title: 'The Coffee Shop SSL Pop-up',
    situation:
      'You are connected to a cafe Wi-Fi network. While attempting to open a web search, an urgent browser pop-up demands: "Security Certificate Update Required: Click Accept to install our network trust profile and continue browsing."',
    question: 'What is the safest move?',
    options: [
      {
        id: 'A',
        text: 'Click Accept. It says it is a security certificate, so it must keep you safe.',
        isOptimal: false,
        feedback:
          'Installing untrusted root certificates allows malicious routers or captive portals to decrypt and inspect all your supposedly private HTTPS web traffic.',
      },
      {
        id: 'B',
        text: 'Cancel and disconnect immediately. Turn on mobile hotspot or trusted VPN.',
        isOptimal: true,
        feedback:
          'Excellent defensive posture! Legit public Wi-Fi networks never require you to install root certificates on your device.',
      },
      {
        id: 'C',
        text: 'Keep browsing other websites to see if the certificate pop-up goes away on its own.',
        isOptimal: false,
        feedback:
          'If the network is intercepting SSL connections, lingering on other unencrypted pages still leaves your browsing open to snooping.',
      },
    ],
  },
  {
    id: 'daily-gaming-skin',
    title: 'The Discord Free Skin Trade',
    situation:
      'A fellow player in a multiplayer game chat sends you a direct link: "Get $50 in free game currency right now! Just log in through this Steam verification mirror page."',
    question: 'How do you respond?',
    options: [
      {
        id: 'A',
        text: 'Never enter your credentials on links sent by random players in chat.',
        isOptimal: true,
        feedback:
          'Spot on! Credential-stealing phishing mirrors look identical to the real login screen but send your login and steam-guard tokens straight to thieves.',
      },
      {
        id: 'B',
        text: 'Type a fake password first to see if the page accepts it.',
        isOptimal: false,
        feedback:
          'Even visiting the site can expose your browser to exploit kits or fingerprint your system. Simply avoid clicking unknown vanity links.',
      },
      {
        id: 'C',
        text: 'Click the link and log in because they have a high player level.',
        isOptimal: false,
        feedback:
          'Player accounts are frequently stolen and automated to spam everyone on their friends list with malicious links.',
      },
    ],
  },
  {
    id: 'daily-package-delivery',
    title: 'The Missing Package SMS',
    situation:
      'You receive an SMS text: "USPS Notice: Your delivery #9821 has a missing house number. Update your address and pay a $0.35 redelivery fee in the next 2 hours or package is returned."',
    question: 'What should you do?',
    options: [
      {
        id: 'A',
        text: 'Tap the link and enter your credit card since $0.35 is very cheap.',
        isOptimal: false,
        feedback:
          'The $0.35 fee is bait! Once you submit your card details, scammers initiate unauthorized recurring charges of hundreds of dollars.',
      },
      {
        id: 'B',
        text: 'Ignore the text link. If you are expecting a package, check the tracking number on the carrier\'s official app.',
        isOptimal: true,
        feedback:
          'Superb vigilance! Postal carriers never ask for credit card fees via unsolicited SMS messages with shortened URLs.',
      },
      {
        id: 'C',
        text: 'Reply STOP to the text message.',
        isOptimal: false,
        feedback:
          'Replying to smishing messages confirms that your phone number is active and attentive, leading to more scam calls.',
      },
    ],
  },
];

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  onClose,
  onRecordDecision,
  alreadyCompleted = false,
}) => {
  // Deterministic daily index based on current date
  const todayKey = new Date().toISOString().slice(0, 10);
  const scenarioIndex = Math.abs(
    todayKey.split('-').reduce((acc, part) => acc + parseInt(part, 10), 0) % DAILY_SCENARIOS.length
  );
  const scenario = DAILY_SCENARIOS[scenarioIndex];

  const [selectedOptionId, setSelectedOptionId] = useState<'A' | 'B' | 'C' | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(alreadyCompleted);

  const handleSelect = (optionId: 'A' | 'B' | 'C') => {
    if (hasSubmitted) return;
    playClickSound();
    setSelectedOptionId(optionId);
    setHasSubmitted(true);

    const chosen = scenario.options.find((o) => o.id === optionId);
    if (chosen?.isOptimal) {
      playSuccessSound();
      onRecordDecision(5, `Daily Challenge: ${scenario.title}`);
    } else {
      playWarningSound();
      onRecordDecision(-2, `Daily Challenge (caution): ${scenario.title}`);
    }
  };

  const chosenOption = scenario.options.find((o) => o.id === selectedOptionId);

  return (
    <div
      id="daily-challenge-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="daily-challenge-card"
        className="relative w-full max-w-lg rounded-3xl border-2 border-amber-500/70 bg-[#0c1421] text-slate-100 shadow-2xl p-5 sm:p-7 overflow-hidden ring-1 ring-amber-500/30"
      >
        <div className="flex items-center justify-between border-b border-[#1c2c44] pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                OPTIONAL MINI-CHALLENGE
              </div>
              <h3 className="text-base font-extrabold uppercase text-white font-sans">
                DAILY CYBER CHALLENGE
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Challenge Box */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#20324c] bg-[#101a2b] p-4 space-y-2">
            <h4 className="text-sm font-bold text-amber-300 uppercase font-sans">
              {scenario.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              "{scenario.situation}"
            </p>
            <div className="text-xs font-bold text-cyan-300 pt-1">
              👉 {scenario.question}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2">
            {scenario.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let style =
                'border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:border-amber-400/60';

              if (hasSubmitted) {
                if (opt.isOptimal) {
                  style = 'border-emerald-500/80 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500/50';
                } else if (isSelected && !opt.isOptimal) {
                  style = 'border-rose-500/80 bg-rose-950/40 text-rose-200 ring-1 ring-rose-500/50';
                } else {
                  style = 'border-slate-800 bg-slate-950/40 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id as any)}
                  disabled={hasSubmitted}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${style}`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-xs font-mono font-bold ${
                      isSelected
                        ? opt.isOptimal
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-rose-500 text-white'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {opt.id}
                  </span>
                  <span className="text-xs sm:text-sm font-medium leading-tight">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {hasSubmitted && chosenOption && (
            <div className="rounded-2xl border border-amber-500/40 bg-amber-950/20 p-3.5 space-y-1 animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>AI MENTOR DEBRIEF:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                {chosenOption.feedback}
              </p>
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => {
                    playClickSound();
                    onClose();
                  }}
                  className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                >
                  DONE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
