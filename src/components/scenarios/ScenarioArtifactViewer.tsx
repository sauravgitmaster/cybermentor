import React from 'react';
import {
  Mail,
  HardDrive,
  Wifi,
  QrCode,
  BellRing,
  MessageSquare,
  ShieldAlert,
  Share2,
  ExternalLink,
  Lock,
  Unlock,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { ScenarioArtifact } from '../../types/scenario';

interface ScenarioArtifactViewerProps {
  artifact: ScenarioArtifact;
}

export const ScenarioArtifactViewer: React.FC<ScenarioArtifactViewerProps> = ({ artifact }) => {
  const { type, title, subtitle, metadata, contentPreview, clueCallout, tags } = artifact;

  const renderIcon = () => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4 text-cyan-400" />;
      case 'usb-device':
        return <HardDrive className="h-4 w-4 text-amber-400" />;
      case 'wifi-scanner':
        return <Wifi className="h-4 w-4 text-emerald-400" />;
      case 'qr-poster':
        return <QrCode className="h-4 w-4 text-purple-400" />;
      case 'mfa-alert':
        return <BellRing className="h-4 w-4 text-rose-400" />;
      case 'chat-message':
        return <MessageSquare className="h-4 w-4 text-amber-400" />;
      case 'login-alert':
        return <ShieldAlert className="h-4 w-4 text-red-400" />;
      case 'cloud-permissions':
        return <Share2 className="h-4 w-4 text-blue-400" />;
      default:
        return <Info className="h-4 w-4 text-cyan-400" />;
    }
  };

  return (
    <div className="rounded-xl border border-[#2b3a52] bg-[#0c1322] shadow-xl overflow-hidden font-sans">
      {/* Artifact Title Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#141e30] border-b border-[#223147]">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-[#0b1220] border border-[#23334d]">{renderIcon()}</div>
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-200">{title}</h4>
            {subtitle && <p className="text-[10px] font-mono text-slate-400">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {tags?.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-[#1b283d] text-cyan-300 border border-[#2c3e5c]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Artifact Interactive Viewport */}
      <div className="p-4 sm:p-5 space-y-3.5 text-xs">
        {/* Metadata Grid */}
        {metadata && (
          <div className="rounded-lg bg-[#090e18] border border-[#1b263a] p-3 space-y-1.5 font-mono text-[11px]">
            {Object.entries(metadata).map(([key, value]) => (
              <div key={key} className="flex flex-col sm:flex-row sm:items-baseline gap-1 text-slate-300">
                <span className="text-slate-400 min-w-[130px] font-medium shrink-0">{key}:</span>
                <span className="text-amber-200 font-semibold break-all">{value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Visualized Presentation Box */}
        {type === 'email' && (
          <div className="rounded-lg border border-[#2c3c54] bg-[#111a2c] p-4 text-slate-200 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#1e2d42] text-[11px] font-mono text-slate-400">
              <span>CAMPUS MAIL CLIENT</span>
              <span className="text-rose-400 font-bold">[EXTERNAL SENDER]</span>
            </div>
            <p className="whitespace-pre-line leading-relaxed text-slate-300 text-xs sm:text-sm">
              {contentPreview}
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-rose-600/90 text-white font-mono font-bold text-xs shadow-md border border-rose-400">
                <span>[ VERIFY CREDENTIALS NOW ]</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </div>
              <div className="mt-1.5 text-[11px] font-mono text-rose-300">
                ⚠️ Hover link target: <span className="underline">http://portal-verify-auth92.xyz/login</span>
              </div>
            </div>
          </div>
        )}

        {type === 'usb-device' && (
          <div className="rounded-lg border border-[#2c3c54] bg-[#111a2c] p-4 text-slate-200 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-16 h-12 rounded bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 font-mono text-[10px] font-bold">
                [USB-A]
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-amber-300">STRAY HARDWARE ARTIFACT</div>
                <div className="text-[11px] text-slate-400">Printed label: "CONFIDENTIAL — Exam Solutions"</div>
              </div>
            </div>
            <pre className="p-3 bg-[#080d16] rounded border border-[#1c2738] text-[11px] font-mono text-slate-300 whitespace-pre-line">
              {contentPreview}
            </pre>
          </div>
        )}

        {type === 'wifi-scanner' && (
          <div className="rounded-lg border border-[#2c3c54] bg-[#111a2c] p-4 text-slate-200 space-y-2.5">
            <div className="text-[11px] font-mono text-slate-400 mb-1">AVAILABLE WIRELESS SIGNALS</div>
            <div className="space-y-2">
              <div className="p-2.5 rounded bg-[#162235] border border-cyan-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-cyan-400" />
                  <div>
                    <div className="text-xs font-mono font-bold text-slate-100">Campus-Secure-802.1X</div>
                    <div className="text-[10px] font-mono text-slate-400">WPA3-Enterprise • Verified University CA</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-300">54% Signal</span>
              </div>

              <div className="p-2.5 rounded bg-rose-950/40 border border-rose-700/80 flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-2">
                  <Unlock className="h-4 w-4 text-rose-400" />
                  <div>
                    <div className="text-xs font-mono font-bold text-rose-200">FREE_Campus_HighSpeed_Guest_5G</div>
                    <div className="text-[10px] font-mono text-rose-300">Open Network (Unencrypted) • Rogue AP</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-rose-400 font-bold">100% Signal</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-300 pt-1 leading-relaxed">{contentPreview}</p>
          </div>
        )}

        {type === 'qr-poster' && (
          <div className="rounded-lg border border-[#2c3c54] bg-[#111a2c] p-4 text-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#080d16] p-3 rounded-lg border border-[#1b263a]">
              <div className="w-20 h-20 bg-white rounded-lg p-1.5 flex items-center justify-center relative shadow-inner">
                <QrCode className="w-full h-full text-slate-900" />
                <div className="absolute -top-1 -right-1 px-1 py-0.5 bg-purple-600 text-[8px] font-mono text-white rounded font-bold">
                  STICKER
                </div>
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs font-bold text-amber-300 font-mono">PHYSICAL SUBSTRATE TAMPERING</div>
                <p className="text-[11px] text-slate-300">
                  A high-gloss sticker is peeling at the corner, covering the original printed ink underneath.
                </p>
                <div className="text-[10px] font-mono text-purple-300">
                  Decoded Link: https://univ-textbooks.download-free-stem.top
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">{contentPreview}</p>
          </div>
        )}

        {type === 'mfa-alert' && (
          <div className="rounded-lg border border-[#2c3c54] bg-[#111a2c] p-4 text-slate-200 space-y-3">
            <div className="space-y-2">
              <div className="p-3 bg-rose-950/60 border border-rose-600 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-rose-200 font-mono">AUTHENTICATOR PUSH BOMBING</div>
                  <div className="text-[11px] text-rose-300">5 successive prompts: "Approve login from Russia?"</div>
                </div>
                <BellRing className="h-5 w-5 text-rose-400 animate-bounce" />
              </div>
              <div className="p-3 bg-[#0d1728] border border-[#253959] rounded-lg">
                <div className="text-[11px] font-mono text-amber-300 font-bold">INCOMING SMS (SPOOFED):</div>
                <div className="text-xs text-slate-200 mt-0.5">
                  "IT Security: Reply with your 6-digit MFA code immediately to halt these alerts."
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">{contentPreview}</p>
          </div>
        )}

        {type === 'chat-message' && (
          <div className="rounded-lg border border-[#2c3c54] bg-[#111a2c] p-4 text-slate-200 space-y-3">
            <div className="p-3 bg-[#080d16] rounded-lg border border-[#1e2a3d] space-y-2">
              <div className="flex items-center gap-2 pb-2 border-b border-[#1b2639]">
                <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-amber-300">
                  PV
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">Prof. Vance (Unknown Cell #)</div>
                  <div className="text-[9px] font-mono text-slate-400">+1 (555) 018-7741 • VOIP Provider</div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic whitespace-pre-line">
                "{contentPreview}"
              </p>
            </div>
          </div>
        )}

        {type === 'login-alert' && (
          <div className="rounded-lg border border-[#2c3c54] bg-[#111a2c] p-4 text-slate-200 space-y-3">
            <div className="p-3 bg-red-950/50 border border-red-700/80 rounded-lg space-y-1">
              <div className="text-xs font-bold text-red-200 font-mono flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span>UNRECOGNIZED ACTIVE WEB SESSION</span>
              </div>
              <p className="text-[11px] text-slate-200">
                A valid session token was replicated from Frankfurt, Germany using Firefox 122 on Windows 10.
              </p>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">{contentPreview}</p>
          </div>
        )}

        {type === 'cloud-permissions' && (
          <div className="rounded-lg border border-[#2c3c54] bg-[#111a2c] p-4 text-slate-200 space-y-3">
            <div className="p-3 bg-[#080d16] rounded-lg border border-[#1e2a3d] space-y-2">
              <div className="text-xs font-bold text-amber-300 font-mono">FOLDER SHARING SETTINGS</div>
              <div className="p-2.5 rounded bg-rose-950/40 border border-rose-600/80 text-xs space-y-1">
                <div className="font-bold text-rose-200">🌐 Public on the Web</div>
                <div className="text-[11px] text-rose-300">
                  Anyone on the internet with this link can <span className="font-bold underline">EDIT</span>. No sign-in required.
                </div>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">{contentPreview}</p>
            </div>
          </div>
        )}

        {/* Tactical Clue Callout Box */}
        {clueCallout && (
          <div className="rounded-lg border border-[#3b4c68] bg-[#152033] p-3 text-xs flex items-start gap-2.5">
            <Info className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-amber-300 font-mono text-[11px] uppercase tracking-wide">
                OPERATIONAL CLUE OBSERVATION
              </span>
              <p className="text-slate-200 text-xs leading-relaxed">{clueCallout}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
