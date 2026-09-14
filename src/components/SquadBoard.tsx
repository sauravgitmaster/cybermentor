import React, { useState, useEffect } from 'react';
import {
  Users,
  Trophy,
  Shield,
  Scale,
  Award,
  Search,
  Zap,
  CheckCircle2,
  X,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { PlayerState } from '../types';
import { api } from '../services/api';
import { playClickSound, playSuccessSound } from '../utils/audio';

interface SquadEntry {
  id: string;
  squadCode: string;
  squadName: string;
  callsign: string;
  totalScore: number;
  trustScore: number;
  ethicsScore: number;
  missionsCompleted: number;
  badgesUnlocked: number;
  teamSize: number;
  lastActive: string;
  badge: string;
}

interface SquadBoardProps {
  player: PlayerState;
  onClose: () => void;
  onUpdateSquadInfo?: (squadCode: string, callsign: string) => void;
}

export const SquadBoard: React.FC<SquadBoardProps> = ({
  player,
  onClose,
  onUpdateSquadInfo,
}) => {
  const [leaderboard, setLeaderboard] = useState<SquadEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [squadCodeInput, setSquadCodeInput] = useState(player.squadCode || 'CM-DEMO-01');
  const [callsignInput, setCallsignInput] = useState(player.squadCallsign || player.name || 'Operative');
  const [squadNameInput, setSquadNameInput] = useState('Cyber Vanguard Unit');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchBoard = async () => {
    setIsLoading(true);
    const entries = await api.getSquadLeaderboard();
    setLeaderboard(entries);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  const handleSubmitScore = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playClickSound();

    const res = await api.submitSquadScore({
      squadCode: squadCodeInput,
      squadName: squadNameInput,
      callsign: callsignInput,
      trustScore: player.digitalTrust ?? player.trustScore ?? 0,
      ethicsScore: player.ethicsScore ?? 50,
      missionsCompleted: player.completedMissions.length,
      badgesUnlocked: player.achievements.filter((a) => a.unlocked).length,
      teamSize: 3,
    });

    if (res?.success) {
      playSuccessSound();
      setMyRank(res.rank);
      setToastMessage(`Squad verified! Ranked #${res.rank} of ${res.totalSquads}`);
      if (onUpdateSquadInfo) {
        onUpdateSquadInfo(squadCodeInput, callsignInput);
      }
      await fetchBoard();
      setTimeout(() => setToastMessage(null), 5000);
    }
    setIsSubmitting(false);
  };

  const filtered = leaderboard.filter((entry) => {
    const q = searchQuery.toLowerCase();
    return (
      entry.squadName.toLowerCase().includes(q) ||
      entry.squadCode.toLowerCase().includes(q) ||
      entry.callsign.toLowerCase().includes(q)
    );
  });

  return (
    <div
      id="squad-board-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-4xl rounded-2xl border border-[#233148] bg-[#0b0f19] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1a2336] bg-[#0f1422] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-950/70 border border-amber-700/60 text-amber-400">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-amber-400 font-bold">
                <span>CM-DEMO EXHIBITION</span>
                <span>•</span>
                <span>TACTICAL SQUAD LEADERBOARD</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100">
                Global SecOps Peer Standings
              </h2>
            </div>
          </div>
          <button
            id="close-squad-board-btn"
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-[#182030] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Success Toast */}
        {toastMessage && (
          <div className="bg-emerald-950/80 border-b border-emerald-800/80 px-6 py-2.5 flex items-center gap-2 text-xs font-mono text-emerald-200 animate-in slide-in-from-top duration-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Submission / Squad Card */}
          <form
            onSubmit={handleSubmitScore}
            className="rounded-xl border border-[#1d273a] bg-[#0d121c] p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span>LINK OPERATIVE TO SQUAD</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Composite Score: <strong>{(player.digitalTrust ?? 0) * 15 + (player.ethicsScore ?? 50) * 10 + player.completedMissions.length * 300} pts</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">
                  Squad Code (e.g. CM-DEMO-01)
                </label>
                <input
                  type="text"
                  value={squadCodeInput}
                  onChange={(e) => setSquadCodeInput(e.target.value.toUpperCase())}
                  className="w-full rounded-lg border border-[#232f46] bg-black/50 px-3 py-2 text-xs text-slate-200 font-mono focus:border-cyan-500 focus:outline-none uppercase"
                  placeholder="CM-DEMO-01"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">
                  Squad Name
                </label>
                <input
                  type="text"
                  value={squadNameInput}
                  onChange={(e) => setSquadNameInput(e.target.value)}
                  className="w-full rounded-lg border border-[#232f46] bg-black/50 px-3 py-2 text-xs text-slate-200 font-mono focus:border-cyan-500 focus:outline-none"
                  placeholder="Squad Name"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1">
                  Operative Callsign
                </label>
                <input
                  type="text"
                  value={callsignInput}
                  onChange={(e) => setCallsignInput(e.target.value)}
                  className="w-full rounded-lg border border-[#232f46] bg-black/50 px-3 py-2 text-xs text-slate-200 font-mono focus:border-cyan-500 focus:outline-none"
                  placeholder="Callsign"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-gradient-to-r from-amber-500 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-slate-950 font-bold px-5 py-2 text-xs font-mono transition-all flex items-center gap-1.5 shadow"
              >
                <Zap className="h-3.5 w-3.5" />
                <span>{isSubmitting ? 'VERIFYING...' : 'SYNC SCORE & SQUAD PROFILE'}</span>
              </button>
            </div>
          </form>

          {/* Search Bar */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search squads by code, unit name, or callsign..."
                className="w-full rounded-xl border border-[#1b2538] bg-[#0a0d16] pl-9 pr-4 py-2 text-xs text-slate-200 font-mono placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="rounded-xl border border-[#1b2438] bg-[#0a0d16] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="border-b border-[#1b2438] bg-[#111726] text-[10px] text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Squad &amp; Callsign</th>
                    <th className="py-3 px-4 text-right">Composite Score</th>
                    <th className="py-3 px-4 text-center">Trust</th>
                    <th className="py-3 px-4 text-center">Ethics</th>
                    <th className="py-3 px-4 text-center">Ops</th>
                    <th className="py-3 px-4 text-center">Badges</th>
                    <th className="py-3 px-4">Honorific Badge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#161f30]">
                  {isLoading ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-500 font-mono">
                        Calibrating global standings uplink...
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-500 font-mono">
                        No squads matched query.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((entry, idx) => {
                      const isMySquad =
                        entry.squadCode.toUpperCase() === squadCodeInput.toUpperCase();

                      return (
                        <tr
                          key={entry.id}
                          className={`transition-colors ${
                            isMySquad
                              ? 'bg-amber-950/25 text-amber-200 font-semibold'
                              : 'hover:bg-[#101624] text-slate-300'
                          }`}
                        >
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${
                                idx === 0
                                  ? 'bg-amber-500 text-slate-950'
                                  : idx === 1
                                  ? 'bg-slate-300 text-slate-950'
                                  : idx === 2
                                  ? 'bg-amber-700 text-amber-100'
                                  : 'bg-[#151c2c] text-slate-400'
                              }`}
                            >
                              #{idx + 1}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-100 flex items-center gap-1.5">
                              <span>{entry.squadName}</span>
                              {isMySquad && (
                                <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/40">
                                  YOU
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              [{entry.squadCode}] • Lead: {entry.callsign} ({entry.teamSize} op
                              {entry.teamSize > 1 ? 's' : ''})
                            </div>
                          </td>

                          <td className="py-3.5 px-4 text-right font-bold text-cyan-400">
                            {entry.totalScore.toLocaleString()} PTS
                          </td>

                          <td className="py-3.5 px-4 text-center">
                            <span className="text-emerald-400 font-bold">{entry.trustScore}%</span>
                          </td>

                          <td className="py-3.5 px-4 text-center">
                            <span className="text-indigo-400 font-bold">{entry.ethicsScore}%</span>
                          </td>

                          <td className="py-3.5 px-4 text-center text-slate-300">
                            {entry.missionsCompleted}
                          </td>

                          <td className="py-3.5 px-4 text-center text-slate-300">
                            {entry.badgesUnlocked}
                          </td>

                          <td className="py-3.5 px-4 text-[11px]">
                            <span className="font-semibold text-slate-200">{entry.badge}</span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#1a2336] bg-[#0f1422] px-6 py-3.5 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>
            Exhibition Seed: <strong>CM-DEMO</strong> • Auto-calibrated with peer SecOps teams
          </span>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="rounded bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-1.5 text-xs font-mono transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
