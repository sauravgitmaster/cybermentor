import React from 'react';
import {
  User,
  Clock,
  RotateCcw,
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calendar,
  Sparkles,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { PlayerState, Certificate } from '../types';
import { playClickSound } from '../utils/audio';
import { MILESTONE_CERTIFICATES } from '../data/initialState';

interface ProfileModalProps {
  player: PlayerState;
  onResetProgress: () => void;
  onOpenSkillCheck?: () => void;
  onOpenDailyChallenge?: () => void;
  onViewCertificate?: (cert: Certificate) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  player,
  onResetProgress,
  onOpenSkillCheck,
  onOpenDailyChallenge,
  onViewCertificate,
}) => {
  const skillProfile = player.skillProfile || {
    phishing: 50,
    privacy: 50,
    deviceSecurity: 50,
    socialEngineering: 50,
    demonstratedStrengths: ['Curiosity', 'Eagerness to Learn'],
    demonstratedWeaknesses: ['Initial Assessment Pending'],
  };

  const todayKey = new Date().toISOString().slice(0, 10);
  const isDailyDoneToday = player.dailyChallengeCompletedDate === todayKey;

  return (
    <div
      id="profile-dossier-view"
      className="mx-auto max-w-4xl px-4 py-5 sm:px-6 space-y-6 animate-in fade-in duration-200"
    >
      {/* Header with Avatar & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#21344e] pb-4">
        <div className="flex items-center gap-3.5">
          {/* RPG Sprite Avatar */}
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-cyan-400/80 bg-[#121e30] shadow-md">
            <svg width="34" height="34" viewBox="0 0 32 32">
              <rect x="6" y="5" width="20" height="9" rx="3" fill="#92400e" />
              <rect x="7" y="10" width="18" height="13" rx="3" fill="#e2b992" />
              <rect x="10" y="14" width="3" height="3" fill="#0f172a" />
              <rect x="19" y="14" width="3" height="3" fill="#0f172a" />
              <rect x="13" y="19" width="6" height="1.5" rx="0.5" fill="#c2410c" />
              <rect x="8" y="23" width="16" height="7" rx="2" fill="#0284c7" />
            </svg>
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-mono font-black text-slate-950 border border-slate-900">
              {player.level}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              <User className="h-3.5 w-3.5" />
              <span>OPERATIVE FILE // {player.name.toUpperCase()}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase font-sans">
              {player.title}
            </h2>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-0.5">
              <span>LEVEL {player.level} OPERATIVE</span>
              <span>•</span>
              <span className="text-emerald-400">
                {player.completedMissions.length} MISSIONS RESOLVED
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {onOpenSkillCheck && (
            <button
              id="profile-calibrate-btn"
              onClick={() => {
                playClickSound();
                onOpenSkillCheck();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-cyan-500/60 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/60 text-xs font-mono font-bold transition-all cursor-pointer shadow-xs"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{player.skillCheckCompleted ? 'RECALIBRATE' : 'TAKE SKILL CHECK'}</span>
            </button>
          )}

          <button
            id="profile-reset-btn"
            onClick={() => {
              playClickSound();
              if (
                window.confirm(
                  'Reset all simulation progress? Digital Trust will return to 0 and all mission logs will be cleared.'
                )
              ) {
                onResetProgress();
              }
            }}
            className="flex items-center gap-1.5 text-xs font-mono text-rose-400 hover:text-rose-300 border border-rose-900/60 hover:border-rose-700 bg-rose-950/20 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>RESET</span>
          </button>
        </div>
      </div>

      {/* Primary Stats Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
        {/* Digital Trust */}
        <div className="rounded-2xl border border-[#21344e] bg-[#0c1421] p-4 shadow-sm">
          <div className="text-[10px] text-slate-400 uppercase mb-1 flex items-center justify-between">
            <span>DIGITAL TRUST RATING</span>
            <span className="text-cyan-400">0 - 100</span>
          </div>
          <div className="text-2xl font-black text-cyan-400">
            {player.digitalTrust} <span className="text-xs font-normal text-slate-400">/ 100</span>
          </div>
          <p className="text-xs text-slate-300 font-sans mt-1 leading-snug">
            Decision-making metric. Earned strictly through sound, verified defensive choices.
          </p>
        </div>

        {/* Security Clearance Title */}
        <div className="rounded-2xl border border-[#21344e] bg-[#0c1421] p-4 shadow-sm">
          <div className="text-[10px] text-slate-400 uppercase mb-1">
            DEFENSIVE RANK
          </div>
          <div className="text-lg font-bold text-amber-300 uppercase truncate">
            {player.title}
          </div>
          <p className="text-xs text-slate-300 font-sans mt-1 leading-snug">
            Advanced through investigation rigor and uncompromised decision making.
          </p>
        </div>

        {/* Daily Challenge status */}
        <div className="rounded-2xl border border-[#21344e] bg-[#0c1421] p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-[10px] text-slate-400 uppercase mb-1 flex items-center justify-between">
              <span>DAILY MINI-CHALLENGE</span>
              <Calendar className="h-3 w-3 text-amber-400" />
            </div>
            <div className="text-sm font-bold text-slate-200">
              {isDailyDoneToday ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Completed Today
                </span>
              ) : (
                <span className="text-amber-300">Available Now</span>
              )}
            </div>
          </div>
          {onOpenDailyChallenge && (
            <button
              onClick={() => {
                playClickSound();
                onOpenDailyChallenge();
              }}
              className="mt-2 text-xs font-mono text-amber-400 hover:text-amber-300 underline text-left cursor-pointer"
            >
              {isDailyDoneToday ? 'Review Daily Challenge' : 'Launch Daily Challenge →'}
            </button>
          )}
        </div>
      </div>

      {/* Cyber Skills Matrix & Adaptive Diagnostics */}
      <div className="rounded-3xl border border-[#21344e] bg-[#0c1421] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#1c2c44] pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-mono font-bold text-slate-100 uppercase tracking-wider">
              CYBER SKILL PROFILE &amp; DIAGNOSTICS
            </h3>
          </div>
          {player.skillCheckCompleted && (
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/30">
              VERIFIED
            </span>
          )}
        </div>

        {/* Meters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">🎣 Phishing Awareness</span>
              <span className="text-cyan-400 font-bold">{skillProfile.phishing}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${skillProfile.phishing}%` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">🔐 Privacy &amp; Passwords</span>
              <span className="text-purple-400 font-bold">{skillProfile.privacy}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-purple-400 rounded-full transition-all duration-500"
                style={{ width: `${skillProfile.privacy}%` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">🛡️ Device &amp; Hardware Security</span>
              <span className="text-emerald-400 font-bold">{skillProfile.deviceSecurity}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${skillProfile.deviceSecurity}%` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300">🧠 Social Engineering Defense</span>
              <span className="text-amber-400 font-bold">
                {skillProfile.socialEngineering}%
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${skillProfile.socialEngineering}%` }}
              />
            </div>
          </div>
        </div>

        {/* Strengths and Focus areas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="rounded-xl border border-emerald-800/40 bg-emerald-950/20 p-3 space-y-1">
            <span className="font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              IDENTIFIED STRENGTHS
            </span>
            <ul className="text-slate-300 space-y-1 list-disc list-inside">
              {skillProfile.demonstratedStrengths.map((s, idx) => (
                <li key={idx} className="font-sans leading-snug">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-amber-800/40 bg-amber-950/20 p-3 space-y-1">
            <span className="font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5" />
              RECOMMENDED FOCUS AREAS
            </span>
            <ul className="text-slate-300 space-y-1 list-disc list-inside">
              {skillProfile.demonstratedWeaknesses.map((w, idx) => (
                <li key={idx} className="font-sans leading-snug">
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Milestone Certificates for Exhibition Demos */}
      <div className="rounded-3xl border border-[#21344e] bg-[#0c1421] p-5 space-y-4 font-mono">
        <div className="flex items-center justify-between border-b border-[#1c2c44] pb-3">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-amber-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              MILESTONE CERTIFICATES // EXHIBITION CREDENTIALS
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {MILESTONE_CERTIFICATES.filter((c) => player.digitalTrust >= c.milestoneTrust).length}{' '}
            / {MILESTONE_CERTIFICATES.length} UNLOCKED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
          {MILESTONE_CERTIFICATES.map((certMeta) => {
            const isUnlocked =
              player.digitalTrust >= certMeta.milestoneTrust || player.level >= certMeta.minLevel;
            const certData: Certificate = {
              id: certMeta.id,
              title: certMeta.title,
              issuedTo: player.name,
              field: certMeta.field,
              issueDate: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              }),
              credentialId: `CM-CERT-${certMeta.id.slice(5, 12).toUpperCase()}-${player.name.toUpperCase()}`,
              verifiedScore: player.digitalTrust,
              description: certMeta.description,
            };

            return (
              <div
                key={certMeta.id}
                className={`rounded-2xl border p-4 flex flex-col justify-between transition-all ${
                  isUnlocked
                    ? 'border-amber-400/60 bg-gradient-to-br from-[#131d2e] to-[#0d1624] shadow-md'
                    : 'border-slate-800 bg-slate-900/40 opacity-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isUnlocked
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isUnlocked ? 'EARNED' : `REQUIRES TRUST ${certMeta.milestoneTrust}`}
                    </span>
                    <Award
                      className={`h-4 w-4 ${isUnlocked ? 'text-amber-400' : 'text-slate-600'}`}
                    />
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 uppercase">{certMeta.title}</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-snug">
                    {certMeta.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#1c2c44] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-cyan-400">
                    {isUnlocked ? `SCORE: ${player.digitalTrust}/100` : 'LOCKED'}
                  </span>
                  {isUnlocked && onViewCertificate && (
                    <button
                      onClick={() => {
                        playClickSound();
                        onViewCertificate(certData);
                      }}
                      className="flex items-center gap-1 text-xs font-mono font-bold text-amber-300 hover:text-amber-200 underline cursor-pointer"
                    >
                      <span>VIEW CERTIFICATE</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Qualification Badges Grid */}
      <div className="rounded-3xl border border-[#21344e] bg-[#0c1421] p-5 font-mono space-y-4">
        <div className="flex items-center justify-between border-b border-[#1c2c44] pb-3">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              QUALIFICATION BADGES &amp; ACHIEVEMENTS
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {player.achievements.filter((a) => a.unlocked).length} / {player.achievements.length}{' '}
            ACQUIRED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {player.achievements.map((ach) => (
            <div
              key={ach.id}
              className={`rounded-2xl border p-3 flex items-start gap-3 transition-all ${
                ach.unlocked
                  ? 'border-cyan-700/60 bg-cyan-950/20'
                  : 'border-[#1b283d] bg-[#0d1522]/50 opacity-60'
              }`}
            >
              <div
                className={`p-2 rounded-xl shrink-0 ${
                  ach.unlocked
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-[#101928] text-slate-500 border border-slate-800'
                }`}
              >
                <Award className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-200 uppercase truncate">
                    {ach.title}
                  </span>
                  {ach.unlocked && (
                    <span className="text-[9px] font-mono text-cyan-300 border border-cyan-700 bg-cyan-950/60 px-1.5 py-0.2 rounded">
                      EARNED
                    </span>
                  )}
                </div>
                <p className="text-[11px] font-sans text-slate-400 mt-0.5 leading-snug">
                  {ach.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust History Timeline */}
      <div className="rounded-3xl border border-[#21344e] bg-[#0c1421] p-5 font-mono space-y-3">
        <div className="flex items-center justify-between border-b border-[#1c2c44] pb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              TRUST TELEMETRY LOG
            </h3>
          </div>
          <span className="text-[10px] text-slate-400">
            [{player.trustHistory.length} EVENTS RECORDED]
          </span>
        </div>

        {player.trustHistory.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-400 font-sans italic">
            No trust adjustments recorded yet. Digital Trust begins at 0 and responds
            dynamically as you investigate and make decisions.
          </div>
        ) : (
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {player.trustHistory.map((entry) => {
              const isPositive = entry.delta > 0;
              return (
                <div
                  key={entry.id}
                  className="flex items-center justify-between rounded-xl border border-[#1d2b40] bg-[#111927] px-3.5 py-2 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono font-bold ${
                        isPositive ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isPositive ? `+${entry.delta}` : entry.delta}
                    </span>
                    <span className="text-slate-300 font-sans text-xs">{entry.reason}</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 shrink-0">
                    TRUST: <span className="text-cyan-400 font-bold">{entry.newScore}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
