import React, { useState } from 'react';
import { Cpu, X, Shield, Terminal, ArrowRight, CheckCircle2, Send, Search, Sparkles } from 'lucide-react';
import { PlayerState, WorldLocation } from '../../types';
import { playClickSound, playInspectSound } from '../../utils/audio';
import { api } from '../../services/api';

interface MentorUplinkModalProps {
  player: PlayerState;
  location: WorldLocation;
  onClose: () => void;
  onNavigateTab: (tab: 'abilities' | 'evidence' | 'world' | 'profile') => void;
  onOpenForensicSandbox?: () => void;
}

export const MentorUplinkModal: React.FC<MentorUplinkModalProps> = ({
  player,
  location,
  onClose,
  onNavigateTab,
  onOpenForensicSandbox,
}) => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'player' | 'mentor'; text: string }>>([
    {
      sender: 'mentor',
      text: `Greetings, Operative ${player.name}. CyberMentor AI tactical channel is live. You can ask any question regarding cybersecurity fundamentals, threat vectors, or sector indicators.`,
    },
  ]);
  const [asking, setAsking] = useState(false);

  const completedCount = player.completedMissions.filter((m) =>
    location.missions.includes(m)
  ).length;

  const handleAsk = async (promptText?: string) => {
    const q = promptText || question;
    if (!q.trim() || asking) return;
    playInspectSound();
    setAsking(true);
    setChatHistory((prev) => [...prev, { sender: 'player', text: q }]);
    setQuestion('');

    const answer = await api.askMentor(q, location.name, player.activeMissionId || undefined);
    setChatHistory((prev) => [...prev, { sender: 'mentor', text: answer }]);
    setAsking(false);
  };

  return (
    <div
      id="mentor-uplink-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 overflow-y-auto"
    >
      <div className="my-6 w-full max-w-2xl border border-[#30363d] bg-[#0d1117] p-5 space-y-4 font-mono shadow-2xl rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              CYBERMENTOR AI // TACTICAL COMMS UPLINK
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              BACKEND CONNECTED
            </span>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-1 text-slate-400 hover:text-slate-100 border border-transparent hover:border-[#30363d]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Sector Dossier Briefing */}
        <div className="border border-[#21262d] bg-[#161b22] p-3 space-y-2 text-xs rounded">
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>SECTOR: {location.name}</span>
            <span className="text-cyan-400 font-bold">DIGITAL TRUST: {player.digitalTrust}/100</span>
          </div>
          <p className="text-slate-300 font-sans leading-relaxed">
            "Operative {player.name}, you are currently stationed in the {location.name} sector.
            {player.digitalTrust === 0
              ? ' You are starting from a strict Zero-Trust baseline. Remember: trust is not a default entitlement—it must be earned through evidence-backed verification.'
              : ` Your current clearance is backed by ${player.digitalTrust} trust points across ${player.completedMissions.length} resolved incident(s).`}
          </p>
        </div>

        {/* Interactive Q&A Uplink Box */}
        <div className="border border-[#21262d] bg-[#11141a] p-3 rounded space-y-2.5">
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              DIRECT AI MENTOR INQUIRY CHANNEL
            </span>
            <span>REAL-TIME ADVISORY</span>
          </div>

          <div className="max-h-40 overflow-y-auto space-y-2 p-2 bg-[#0a0d12] border border-[#1e242c] rounded text-xs">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded ${
                  msg.sender === 'player'
                    ? 'bg-cyan-950/40 text-cyan-200 border border-cyan-800/40 ml-4'
                    : 'bg-[#161b22] text-slate-200 border border-[#2c333d] mr-4'
                }`}
              >
                <div className="text-[9px] uppercase font-bold text-slate-400 mb-0.5">
                  {msg.sender === 'player' ? `Operative ${player.name}` : 'CyberMentor AI'}
                </div>
                <div className="text-xs font-sans whitespace-pre-line leading-relaxed">{msg.text}</div>
              </div>
            ))}
            {asking && (
              <div className="text-[11px] text-cyan-400 animate-pulse p-2">
                CyberMentor AI is formulating tactical guidance...
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="flex flex-wrap gap-1">
            <span className="text-[10px] text-slate-400 self-center mr-1">PROMPTS:</span>
            {[
              'Explain Zero Trust in practice',
              'How does typosquatting work?',
              'Why are unknown USB drives dangerous?',
              'How do I spot an Evil Twin AP?',
            ].map((q, i) => (
              <button
                key={i}
                onClick={() => handleAsk(q)}
                disabled={asking}
                className="px-2 py-0.5 rounded bg-[#1c2430] hover:bg-[#253245] text-[10px] text-slate-300 border border-[#2b394e] transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Custom Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="Ask CyberMentor AI about any security concept or threat..."
              className="flex-1 bg-[#161b22] border border-[#30363d] rounded px-3 py-1.5 text-xs text-slate-100 font-mono focus:outline-hidden focus:border-cyan-400"
            />
            <button
              onClick={() => handleAsk()}
              disabled={asking || !question.trim()}
              className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-slate-950 font-bold text-xs rounded flex items-center gap-1 transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
              <span>SEND</span>
            </button>
          </div>
        </div>

        {/* Threat Assessment & Status */}
        <div className="space-y-2 text-xs">
          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            ACTIVE SECTOR INCIDENTS ({completedCount}/{location.missions.length} MITIGATED)
          </div>
          <div className="space-y-1.5">
            {location.id === 'campus' && (
              <>
                <div className="flex items-start justify-between p-2 border border-[#21262d] bg-[#11141a]">
                  <div>
                    <div className="font-bold text-slate-200">OPS-01: The Suspicious Email</div>
                    <div className="text-[10px] text-slate-400">Location: Library Commons (Jordan Rivera)</div>
                  </div>
                  {player.completedMissions.includes('mission-01-email') ? (
                    <span className="text-[10px] text-emerald-400 border border-emerald-800/80 bg-emerald-950/20 px-1.5 py-0.5">
                      RESOLVED
                    </span>
                  ) : (
                    <span className="text-[10px] text-amber-400 border border-amber-800/80 bg-amber-950/20 px-1.5 py-0.5">
                      ACTIVE THREAT
                    </span>
                  )}
                </div>

                <div className="flex items-start justify-between p-2 border border-[#21262d] bg-[#11141a]">
                  <div>
                    <div className="font-bold text-slate-200">OPS-02: The Lost USB Drive</div>
                    <div className="text-[10px] text-slate-400">Location: Engineering Lab Room 204 (Marcus Chen)</div>
                  </div>
                  {player.completedMissions.includes('mission-02-usb') ? (
                    <span className="text-[10px] text-emerald-400 border border-emerald-800/80 bg-emerald-950/20 px-1.5 py-0.5">
                      RESOLVED
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 border border-[#30363d] bg-[#161b22] px-1.5 py-0.5">
                      AVAILABLE
                    </span>
                  )}
                </div>

                <div className="flex items-start justify-between p-2 border border-[#21262d] bg-[#11141a]">
                  <div>
                    <div className="font-bold text-slate-200">OPS-03: The Rogue Access Point</div>
                    <div className="text-[10px] text-slate-400">Location: Student Union Cafe (Elena Rostova)</div>
                  </div>
                  {player.completedMissions.includes('mission-03-wifi') ? (
                    <span className="text-[10px] text-emerald-400 border border-emerald-800/80 bg-emerald-950/20 px-1.5 py-0.5">
                      RESOLVED
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 border border-[#30363d] bg-[#161b22] px-1.5 py-0.5">
                      AVAILABLE
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick Station Teleport & Forensic Tools Access */}
        <div className="pt-2 border-t border-[#21262d] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {onOpenForensicSandbox && (
              <button
                onClick={() => {
                  playClickSound();
                  onOpenForensicSandbox();
                }}
                className="text-[10px] border border-cyan-500/60 bg-cyan-950/40 hover:bg-cyan-900/50 px-2 py-1 text-cyan-300 flex items-center gap-1 font-bold rounded"
              >
                <Terminal className="h-3 w-3" />
                FORENSIC SANDBOX
              </button>
            )}
            <button
              onClick={() => {
                playClickSound();
                onClose();
                onNavigateTab('abilities');
              }}
              className="text-[10px] border border-[#30363d] bg-[#161b22] hover:border-cyan-400 px-2 py-1 text-slate-300 rounded"
            >
              ABILITIES WORKSTATION
            </button>
            <button
              onClick={() => {
                playClickSound();
                onClose();
                onNavigateTab('evidence');
              }}
              className="text-[10px] border border-[#30363d] bg-[#161b22] hover:border-cyan-400 px-2 py-1 text-slate-300 rounded"
            >
              EVIDENCE BOARD
            </button>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-3 py-1 text-xs font-bold uppercase transition-colors rounded"
          >
            DISMISS UPLINK
          </button>
        </div>
      </div>
    </div>
  );
};
