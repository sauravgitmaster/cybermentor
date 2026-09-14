import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  FileCode,
  ExternalLink,
  Mail,
  HardDrive,
  Wifi,
} from 'lucide-react';
import { MissionData, InspectableTarget, EvidenceItem, PlayerState } from '../types';
import {
  playInspectSound,
  playEvidenceDiscoveredSound,
  playClickSound,
} from '../utils/audio';

interface InvestigationPanelProps {
  mission: MissionData;
  player: PlayerState;
  inspectedTargetIds: string[];
  onTargetInspected: (target: InspectableTarget) => void;
  onProceedToDecision: () => void;
}

export const InvestigationPanel: React.FC<InvestigationPanelProps> = ({
  mission,
  player,
  inspectedTargetIds,
  onTargetInspected,
  onProceedToDecision,
}) => {
  const [selectedTarget, setSelectedTarget] = useState<InspectableTarget | null>(
    null
  );

  const meta = mission.investigationWorkspace.interfaceMetadata;

  const handleInspect = (target: InspectableTarget) => {
    playInspectSound();
    setSelectedTarget(target);
    if (!inspectedTargetIds.includes(target.id)) {
      playEvidenceDiscoveredSound();
      onTargetInspected(target);
    }
  };

  return (
    <div className="space-y-6">
      {/* Investigation Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-[#1b2332] bg-[#0c1017] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <div>
            <div className="text-xs font-mono font-bold text-slate-200">
              {mission.investigationWorkspace.title}
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              EVIDENCE FOUND: {inspectedTargetIds.length} /{' '}
              {mission.investigationWorkspace.targets.length} IOCs DOCUMENTED
            </div>
          </div>
        </div>

        <button
          id="proceed-to-decision-top-btn"
          onClick={() => {
            playClickSound();
            onProceedToDecision();
          }}
          className="flex items-center justify-center gap-2 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 text-xs font-semibold shadow transition-all"
        >
          <span>FORMULATE DECISION</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Main Workspace Display - Type-specific simulation */}
      {mission.investigationWorkspace.type === 'email-client' && (
        <div className="rounded-xl border border-[#21293a] bg-[#0e121a] shadow-xl overflow-hidden">
          {/* Simulated Email Client Title Bar */}
          <div className="flex items-center justify-between border-b border-[#1b2230] bg-[#121622] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
              </div>
              <span className="ml-2 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-cyan-400" />
                <span>Inbox // Message Inspection #7890</span>
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">{meta.timestamp}</span>
          </div>

          {/* Email Headers Section */}
          <div className="border-b border-[#1b2230] bg-[#10141e] p-4 text-xs space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-start sm:items-center gap-2">
                <span className="text-slate-400 font-mono w-14 shrink-0">FROM:</span>
                <span className="text-slate-200 font-semibold">{meta.senderDisplay}</span>
                <span className="rounded bg-[#161d2a] px-2 py-0.5 font-mono text-slate-300 border border-[#232c3e]">
                  &lt;{meta.senderRaw}&gt;
                </span>
              </div>
              <div className="flex gap-2 shrink-0">
                {mission.investigationWorkspace.targets
                  .filter((t) => t.id === 'target-sender' || t.id === 'target-headers')
                  .map((t) => {
                    const inspected = inspectedTargetIds.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        id={`inspect-btn-${t.id}`}
                        onClick={() => handleInspect(t)}
                        className={`text-[10px] font-mono px-2.5 py-1 rounded border flex items-center gap-1.5 transition-colors ${
                          inspected
                            ? 'border-emerald-800/60 bg-emerald-950/40 text-emerald-300'
                            : 'border-cyan-800/60 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/60'
                        }`}
                      >
                        <Search className="h-2.5 w-2.5" />
                        <span>{t.label.split(' ')[0]}</span>
                        {inspected && <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" />}
                      </button>
                    );
                  })}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-mono w-14 shrink-0">SUBJECT:</span>
              <span className="text-amber-300 font-semibold tracking-wide">
                {meta.subject}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <span className="w-14 shrink-0">ROUTE:</span>
              <span>Inbound MX -&gt; Relay gateway via mail-relay-un1v.external.net</span>
            </div>
          </div>

          {/* Email Body & Interactive Targets */}
          <div className="p-6 space-y-5 text-sm text-slate-200">
            <div className="whitespace-pre-line leading-relaxed font-sans text-slate-300 bg-[#0a0d13] p-5 rounded-lg border border-[#1b2230]">
              {meta.bodyText}
            </div>

            {/* Simulated Attachment Box */}
            {meta.attachmentName && (
              <div className="rounded-lg border border-[#21293b] bg-[#121722] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-[#18202d] text-cyan-400 border border-cyan-900/40">
                    <FileCode className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-slate-100 flex items-center gap-1.5">
                      <span>{meta.attachmentName}</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        ({meta.attachmentSize})
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">{meta.attachmentType}</div>
                  </div>
                </div>

                {mission.investigationWorkspace.targets
                  .filter((t) => t.id === 'target-attachment')
                  .map((t) => {
                    const inspected = inspectedTargetIds.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        id={`inspect-btn-${t.id}`}
                        onClick={() => handleInspect(t)}
                        className={`text-xs font-mono px-3 py-1.5 rounded border flex items-center gap-1.5 transition-colors ${
                          inspected
                            ? 'border-emerald-800 bg-emerald-950/60 text-emerald-300'
                            : 'border-cyan-800 bg-cyan-950/60 text-cyan-300 hover:bg-cyan-900'
                        }`}
                      >
                        <Search className="h-3 w-3" />
                        <span>INSPECT ATTACHMENT</span>
                        {inspected && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                      </button>
                    );
                  })}
              </div>
            )}

            {/* Embedded Link Verification */}
            {meta.linkDisplay && (
              <div className="rounded-lg border border-[#21293b] bg-[#121722] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-[#18202d] text-cyan-400 border border-cyan-900/40">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">
                      EMBEDDED PORTAL HYPERLINK:
                    </div>
                    <div className="text-xs font-mono text-cyan-300 underline underline-offset-2">
                      {meta.linkDisplay}
                    </div>
                  </div>
                </div>

                {mission.investigationWorkspace.targets
                  .filter((t) => t.id === 'target-link')
                  .map((t) => {
                    const inspected = inspectedTargetIds.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        id={`inspect-btn-${t.id}`}
                        onClick={() => handleInspect(t)}
                        className={`text-xs font-mono px-3 py-1.5 rounded border flex items-center gap-1.5 transition-colors ${
                          inspected
                            ? 'border-emerald-800 bg-emerald-950/60 text-emerald-300'
                            : 'border-cyan-800 bg-cyan-950/60 text-cyan-300 hover:bg-cyan-900'
                        }`}
                      >
                        <Search className="h-3 w-3" />
                        <span>INSPECT DESTINATION URL</span>
                        {inspected && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                      </button>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hardware Analyzer Workspace (Mission 02: BadUSB Forensics) */}
      {mission.investigationWorkspace.type === 'hardware-analyzer' && (
        <div className="rounded-xl border border-[#21293a] bg-[#0c1017] shadow-xl overflow-hidden">
          {/* Hardware Bench Header */}
          <div className="flex items-center justify-between border-b border-[#1b2230] bg-[#111722] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-mono font-bold text-slate-200">
                HARDWARE WORKBENCH // USB PROTOCOL &amp; BUS LOGIC ANALYZER
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                VBUS: 5.02V / 480mA
              </span>
              <span>SAMPLING: 100 MS/s</span>
            </div>
          </div>

          <div className="p-5 space-y-5">
            {/* Device Physical & Logic Schematic */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Physical Casing View */}
              <div className="rounded-lg border border-[#1a2333] bg-[#080c13] p-4 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400 mb-2 flex items-center justify-between">
                    <span>Physical Artifact</span>
                    <span className="text-amber-400">LABEL: EXAMS_2026</span>
                  </div>
                  <div className="rounded border border-dashed border-amber-500/40 bg-amber-950/20 p-4 text-center my-3">
                    <div className="inline-block p-3 rounded bg-[#131924] border border-[#242f44] mb-2 shadow-inner">
                      <HardDrive className="h-8 w-8 text-amber-400 mx-auto" />
                    </div>
                    <div className="text-xs font-mono text-slate-200 font-bold">
                      SanDisk Ultra Dual Drive (Cloned Enclosure)
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-1">
                      Found unattended on hallway floor outside CAD lab
                    </div>
                  </div>
                </div>
                {mission.investigationWorkspace.targets
                  .filter((t) => t.id === 'target-physical-housing')
                  .map((t) => {
                    const inspected = inspectedTargetIds.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        id={`inspect-btn-${t.id}`}
                        onClick={() => handleInspect(t)}
                        className={`w-full text-xs font-mono py-2 px-3 rounded border flex items-center justify-between transition-colors ${
                          inspected
                            ? 'border-emerald-800 bg-emerald-950/60 text-emerald-300'
                            : 'border-amber-700/80 bg-amber-950/40 text-amber-300 hover:bg-amber-900/50'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <Search className="h-3 w-3" />
                          <span>INSPECT CASING &amp; CHIP</span>
                        </span>
                        {inspected && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                      </button>
                    );
                  })}
              </div>

              {/* USB Device Descriptors Table */}
              <div className="rounded-lg border border-[#1a2333] bg-[#080c13] p-4 md:col-span-2 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400 mb-2 flex items-center justify-between">
                    <span>USB Descriptor Enumeration (lsusb -v)</span>
                    <span className="text-rose-400 font-bold">ANOMALY DETECTED</span>
                  </div>

                  <div className="rounded border border-[#17202e] bg-[#05070a] p-3 font-mono text-xs text-slate-300 space-y-1.5 mb-3 overflow-x-auto">
                    <div className="flex justify-between border-b border-[#121822] pb-1 text-slate-400 text-[11px]">
                      <span>FIELD</span>
                      <span>REPORTED VALUE</span>
                      <span>EXPECTED FOR STORAGE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">bDeviceClass:</span>
                      <span className="text-rose-400 font-bold">0x00 (Defined at Interface level)</span>
                      <span className="text-slate-500">0x08 (Mass Storage)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">bInterfaceClass:</span>
                      <span className="text-rose-400 font-bold">0x03 (Human Interface Device / Keyboard)</span>
                      <span className="text-slate-500">0x08 (Mass Storage)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">bInterfaceSubClass:</span>
                      <span className="text-amber-300">0x01 (Boot Interface)</span>
                      <span className="text-slate-500">0x06 (SCSI Transparent)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Vendor ID / Product ID:</span>
                      <span className="text-cyan-300">VID: 0x1B4F / PID: 0x9205 (ATmega32U4)</span>
                      <span className="text-slate-500">0x0781 / 0x5581 (SanDisk)</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {mission.investigationWorkspace.targets
                    .filter((t) => t.id === 'target-usb-descriptor')
                    .map((t) => {
                      const inspected = inspectedTargetIds.includes(t.id);
                      return (
                        <button
                          key={t.id}
                          id={`inspect-btn-${t.id}`}
                          onClick={() => handleInspect(t)}
                          className={`text-xs font-mono py-2 px-3 rounded border flex items-center justify-between transition-colors ${
                            inspected
                              ? 'border-emerald-800 bg-emerald-950/60 text-emerald-300'
                              : 'border-cyan-800 bg-cyan-950/60 text-cyan-300 hover:bg-cyan-900'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <Search className="h-3 w-3" />
                            <span>INSPECT DESCRIPTORS</span>
                          </span>
                          {inspected && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                        </button>
                      );
                    })}

                  {mission.investigationWorkspace.targets
                    .filter((t) => t.id === 'target-keystroke-payload')
                    .map((t) => {
                      const inspected = inspectedTargetIds.includes(t.id);
                      return (
                        <button
                          key={t.id}
                          id={`inspect-btn-${t.id}`}
                          onClick={() => handleInspect(t)}
                          className={`text-xs font-mono py-2 px-3 rounded border flex items-center justify-between transition-colors ${
                            inspected
                              ? 'border-emerald-800 bg-emerald-950/60 text-emerald-300'
                              : 'border-rose-800 bg-rose-950/60 text-rose-300 hover:bg-rose-900'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <Search className="h-3 w-3" />
                            <span>DECOMPILE PAYLOAD</span>
                          </span>
                          {inspected && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Target button for witness interview / origin */}
            {mission.investigationWorkspace.targets
              .filter((t) => t.id === 'target-physical-origin')
              .map((t) => {
                const inspected = inspectedTargetIds.includes(t.id);
                return (
                  <div
                    key={t.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-[#1b2332] bg-[#090d15] p-3 text-xs font-mono"
                  >
                    <div className="flex items-center gap-2 text-slate-300">
                      <Info className="h-4 w-4 text-cyan-400 shrink-0" />
                      <span>WITNESS CORROBORATION: {t.previewValue}</span>
                    </div>
                    <button
                      id={`inspect-btn-${t.id}`}
                      onClick={() => handleInspect(t)}
                      className={`text-xs font-mono px-3 py-1.5 rounded border flex items-center gap-1.5 shrink-0 transition-colors ${
                        inspected
                          ? 'border-emerald-800 bg-emerald-950/60 text-emerald-300'
                          : 'border-cyan-800 bg-cyan-950/60 text-cyan-300 hover:bg-cyan-900'
                      }`}
                    >
                      <Search className="h-3 w-3" />
                      <span>{t.label}</span>
                      {inspected && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Network Scanner Workspace (Mission 03: Rogue AP / Evil Twin) */}
      {mission.investigationWorkspace.type === 'network-scanner' && (
        <div className="rounded-xl border border-[#21293a] bg-[#0c1017] shadow-xl overflow-hidden">
          {/* RF Spectrum Monitor Header */}
          <div className="flex items-center justify-between border-b border-[#1b2230] bg-[#111722] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold text-slate-200">
                AETHERSCAN // 802.11 MONITOR MODE SPECTRUM ANALYZER
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                INTERFACE: wlan0mon (PROMISCUOUS)
              </span>
              <span>BAND: 2.4 GHz &amp; 5.0 GHz</span>
            </div>
          </div>

          <div className="p-5 space-y-5">
            {/* Beacon Frame Table */}
            <div className="rounded-lg border border-[#1a2333] bg-[#080c13] p-4">
              <div className="text-[10px] font-mono uppercase text-slate-400 mb-3 flex items-center justify-between">
                <span>Nearby Wireless Access Points &amp; Beacon Telemetry</span>
                <span className="text-rose-400 font-bold">1 SUSPICIOUS BROADCAST DETECTED</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#1c2433] text-slate-400 text-[11px]">
                      <th className="pb-2">SSID</th>
                      <th className="pb-2">BSSID (MAC)</th>
                      <th className="pb-2">ENCRYPTION</th>
                      <th className="pb-2">CH</th>
                      <th className="pb-2">SIGNAL (RSSI)</th>
                      <th className="pb-2">GATEWAY ROUTE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#131a26]">
                    <tr className="text-slate-300">
                      <td className="py-2.5 font-bold text-slate-200">Campus-Secure</td>
                      <td className="py-2.5 text-slate-400">70:3A:0E:11:42:01</td>
                      <td className="py-2.5 text-emerald-400 font-semibold">WPA2-Enterprise (802.1X)</td>
                      <td className="py-2.5">6</td>
                      <td className="py-2.5 text-slate-400">-68 dBm (Ceiling)</td>
                      <td className="py-2.5 text-slate-400">172.16.0.1 (Cisco)</td>
                    </tr>
                    <tr className="bg-rose-950/20 text-rose-200 border-l-2 border-rose-500">
                      <td className="py-2.5 font-bold pl-2 flex items-center gap-1.5 text-rose-300">
                        <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                        <span>Campus-Secure_Free</span>
                      </td>
                      <td className="py-2.5 text-amber-300 font-bold">00:C0:CA:9A:88:14</td>
                      <td className="py-2.5 font-bold text-rose-400">OPEN (None / Plaintext)</td>
                      <td className="py-2.5 text-amber-300">6 (Overlap)</td>
                      <td className="py-2.5 text-rose-400 font-bold">-32 dBm (Near-Field!)</td>
                      <td className="py-2.5 text-rose-300">10.0.0.1 (mitmproxy)</td>
                    </tr>
                    <tr className="text-slate-300">
                      <td className="py-2.5 font-bold text-slate-400">Campus-Guest</td>
                      <td className="py-2.5 text-slate-400">70:3A:0E:11:42:02</td>
                      <td className="py-2.5 text-cyan-400">WPA2-PSK</td>
                      <td className="py-2.5">1</td>
                      <td className="py-2.5 text-slate-400">-70 dBm</td>
                      <td className="py-2.5 text-slate-400">172.16.4.1</td>
                    </tr>
                    <tr className="text-slate-400">
                      <td className="py-2.5">xfinitywifi</td>
                      <td className="py-2.5">00:1D:D5:3C:99:10</td>
                      <td className="py-2.5">Open</td>
                      <td className="py-2.5">11</td>
                      <td className="py-2.5">-84 dBm (Faint)</td>
                      <td className="py-2.5">N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Network Inspection Target Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mission.investigationWorkspace.targets.map((t) => {
                const inspected = inspectedTargetIds.includes(t.id);
                return (
                  <button
                    key={t.id}
                    id={`inspect-btn-${t.id}`}
                    onClick={() => handleInspect(t)}
                    className={`text-xs font-mono p-3 rounded-lg border text-left flex items-center justify-between transition-colors ${
                      inspected
                        ? 'border-emerald-800 bg-emerald-950/40 text-emerald-300'
                        : 'border-cyan-800/80 bg-cyan-950/30 text-cyan-200 hover:bg-cyan-900/50'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{t.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{t.previewValue}</div>
                    </div>
                    {inspected ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 ml-2" />
                    ) : (
                      <Search className="h-4 w-4 text-cyan-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* QR Code Inspector Workspace (Mission 04: Tampered Transit QR) */}
      {mission.investigationWorkspace.type === 'qr-inspector' && (
        <div className="rounded-xl border border-[#21293a] bg-[#0c1017] shadow-xl overflow-hidden">
          {/* QR Forensic Decoupler Header */}
          <div className="flex items-center justify-between border-b border-[#1b2230] bg-[#111722] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <FileCode className="h-4 w-4 text-rose-400" />
              <span className="text-xs font-mono font-bold text-slate-200">
                OPTICAL FORENSICS // QR MATRIX &amp; DEEP-LINK DE-OBFUSCATOR
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
              <span className="text-rose-400 font-semibold">LOCATION: KIOSK #4</span>
              <span>PARSING ENGINE: LIBZBAR-OPTICAL</span>
            </div>
          </div>

          <div className="p-5 space-y-5">
            {/* Split Screen: Physical Terminal Overlay vs Optical Payload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Physical Overlay Inspection */}
              <div className="rounded-lg border border-[#1a2333] bg-[#080c13] p-4 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400 mb-2 flex items-center justify-between">
                    <span>Physical Terminal View</span>
                    <span className="text-rose-400 font-bold">STICKER OVERLAY</span>
                  </div>

                  <div className="rounded border border-dashed border-rose-500/40 bg-rose-950/20 p-4 text-center my-3 relative">
                    <div className="inline-block p-3 rounded bg-[#131924] border border-[#242f44] mb-2 shadow-inner">
                      {/* Stylized QR Matrix Representation */}
                      <div className="w-24 h-24 mx-auto grid grid-cols-6 grid-rows-6 gap-0.5 bg-slate-950 p-1.5 rounded border border-rose-500/50">
                        <div className="bg-slate-200 rounded-xs" /><div className="bg-slate-200 rounded-xs" /><div className="bg-slate-200 rounded-xs" /><div className="bg-slate-950" /><div className="bg-slate-200 rounded-xs" /><div className="bg-slate-200 rounded-xs" />
                        <div className="bg-slate-200 rounded-xs" /><div className="bg-slate-950" /><div className="bg-slate-200 rounded-xs" /><div className="bg-slate-200 rounded-xs" /><div className="bg-slate-950" /><div className="bg-slate-200 rounded-xs" />
                        <div className="bg-slate-200 rounded-xs" /><div className="bg-slate-200 rounded-xs" /><div className="bg-slate-200 rounded-xs" /><div className="bg-slate-950" /><div className="bg-slate-200 rounded-xs" /><div className="bg-slate-200 rounded-xs" />
                        <div className="bg-slate-950" /><div className="bg-slate-200 rounded-xs" /><div className="bg-slate-950" /><div className="bg-slate-200 rounded-xs" /><div className="bg-slate-950" /><div className="bg-slate-950" />
                        <div className="bg-slate-200 rounded-xs" /><div className="bg-slate-950" /><div className="bg-slate-200 rounded-xs" /><div className="bg-slate-950" /><div className="bg-slate-200 rounded-xs" /><div className="bg-slate-200 rounded-xs" />
                        <div className="bg-slate-200 rounded-xs" /><div className="bg-slate-200 rounded-xs" /><div className="bg-slate-950" /><div className="bg-slate-200 rounded-xs" /><div className="bg-slate-200 rounded-xs" /><div className="bg-slate-200 rounded-xs" />
                      </div>
                    </div>
                    <div className="text-xs font-mono text-rose-300 font-bold">
                      &quot;Quick Mobile Pay - 50% Metro Discount&quot;
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-1">
                      Glossy sticker edge peeling at bottom-right corner
                    </div>
                  </div>
                </div>

                {mission.investigationWorkspace.targets
                  .filter((t) => t.id === 'target-physical-overlay')
                  .map((t) => {
                    const inspected = inspectedTargetIds.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        id={`inspect-btn-${t.id}`}
                        onClick={() => handleInspect(t)}
                        className={`w-full text-xs font-mono py-2 px-3 rounded border flex items-center justify-between transition-colors ${
                          inspected
                            ? 'border-emerald-800 bg-emerald-950/60 text-emerald-300'
                            : 'border-rose-700/80 bg-rose-950/40 text-rose-300 hover:bg-rose-900/50'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <Search className="h-3 w-3" />
                          <span>EXAMINE PHYSICAL STICKER SEAM</span>
                        </span>
                        {inspected && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                      </button>
                    );
                  })}
              </div>

              {/* Decoded QR Payload & Deep-Link Intent */}
              <div className="rounded-lg border border-[#1a2333] bg-[#080c13] p-4 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400 mb-2 flex items-center justify-between">
                    <span>Decoded Optical Matrix</span>
                    <span className="text-cyan-400 font-mono">PAYLOAD DE-OBFUSCATED</span>
                  </div>

                  <div className="rounded border border-[#17202e] bg-[#05070a] p-3 font-mono text-xs text-slate-300 space-y-2 mb-3">
                    <div>
                      <span className="text-slate-400 text-[10px] block">DECODED DESTINATION URL:</span>
                      <span className="text-rose-400 font-bold break-all">
                        https://pay-transit-secure.xyz/c?amt=250&amp;discount=50
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">OFFICIAL AUTHORITY DOMAIN:</span>
                      <span className="text-emerald-400 font-semibold">
                        transit.metrocity.gov (DNSSEC verified)
                      </span>
                    </div>
                    <div className="border-t border-[#141b26] pt-2">
                      <span className="text-slate-400 text-[10px] block">TRIGGERED OS INTENT:</span>
                      <span className="text-amber-300 text-[11px] break-all">
                        intent://pay?recipient=crypto-escrow-wallet&amp;amount=250
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {mission.investigationWorkspace.targets
                    .filter((t) => t.id === 'target-decoded-url' || t.id === 'target-redirect-chain')
                    .map((t) => {
                      const inspected = inspectedTargetIds.includes(t.id);
                      return (
                        <button
                          key={t.id}
                          id={`inspect-btn-${t.id}`}
                          onClick={() => handleInspect(t)}
                          className={`w-full text-xs font-mono py-2 px-3 rounded border flex items-center justify-between transition-colors ${
                            inspected
                              ? 'border-emerald-800 bg-emerald-950/60 text-emerald-300'
                              : 'border-cyan-800 bg-cyan-950/60 text-cyan-300 hover:bg-cyan-900'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <Search className="h-3 w-3" />
                            <span>{t.label}</span>
                          </span>
                          {inspected && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Municipal Protocol Policy Target */}
            {mission.investigationWorkspace.targets
              .filter((t) => t.id === 'target-signage-verification')
              .map((t) => {
                const inspected = inspectedTargetIds.includes(t.id);
                return (
                  <div
                    key={t.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-[#1b2332] bg-[#090d15] p-3 text-xs font-mono"
                  >
                    <div className="flex items-center gap-2 text-slate-300">
                      <Info className="h-4 w-4 text-cyan-400 shrink-0" />
                      <span>OFFICIAL PROTOCOL: Metro Transit Bulletin Rule 412</span>
                    </div>
                    <button
                      id={`inspect-btn-${t.id}`}
                      onClick={() => handleInspect(t)}
                      className={`text-xs font-mono px-3 py-1.5 rounded border flex items-center gap-1.5 shrink-0 transition-colors ${
                        inspected
                          ? 'border-emerald-800 bg-emerald-950/60 text-emerald-300'
                          : 'border-cyan-800 bg-cyan-950/60 text-cyan-300 hover:bg-cyan-900'
                      }`}
                    >
                      <Search className="h-3 w-3" />
                      <span>{t.label}</span>
                      {inspected && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Forensic Evidence Detail Modal / Drawer */}
      {selectedTarget && (
        <div
          id="target-evidence-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200"
        >
          <div className="w-full max-w-xl rounded-xl border border-cyan-800/80 bg-[#0d121c] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1b2332] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="rounded bg-cyan-950 px-2 py-0.5 text-[10px] font-mono font-bold text-cyan-300 border border-cyan-800/50">
                  FORENSIC ANALYSIS
                </span>
                <h3 className="text-base font-bold text-slate-100">
                  {selectedTarget.revealedDetail.heading}
                </h3>
              </div>
              <button
                id="close-target-modal-btn"
                onClick={() => setSelectedTarget(null)}
                className="text-slate-400 hover:text-slate-100 text-xs font-mono px-2 py-1 rounded bg-[#161d2a]"
              >
                [ESC / CLOSE]
              </button>
            </div>

            {/* Threat Indicator Banner */}
            {selectedTarget.revealedDetail.threatIndicator && (
              <div className="rounded border border-rose-900/50 bg-rose-950/30 p-3 mb-4 flex items-start gap-2.5 text-xs text-rose-200">
                <ShieldAlert className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{selectedTarget.revealedDetail.threatIndicator}</span>
              </div>
            )}

            {/* Analysis Summary */}
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {selectedTarget.revealedDetail.summary}
            </p>

            {/* Technical IOC Data Grid */}
            <div className="rounded border border-[#1e2638] bg-[#090c12] p-3 mb-4">
              <div className="text-[10px] font-mono text-slate-400 uppercase mb-2">
                Technical Forensics &amp; IOCs
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                {Object.entries(selectedTarget.revealedDetail.technicalData).map(
                  ([key, val]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#151a24] pb-1">
                      <span className="text-slate-400">{key}:</span>
                      <span className="text-cyan-300 text-left sm:text-right">{val}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Evidence Yield Confirmation */}
            {selectedTarget.revealedDetail.evidenceYielded && (
              <div className="rounded border border-emerald-900/50 bg-emerald-950/20 p-3 mb-5 flex items-start gap-2 text-xs text-emerald-200">
                <Sparkles className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-emerald-300">
                    Logged in Evidence Notebook:
                  </div>
                  <div className="text-[11px] text-emerald-200/80">
                    {selectedTarget.revealedDetail.evidenceYielded.title} (
                    {selectedTarget.revealedDetail.evidenceYielded.category})
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#18202e]">
              <button
                id="dismiss-evidence-modal-btn"
                onClick={() => setSelectedTarget(null)}
                className="rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 px-4 py-2 text-xs font-semibold"
              >
                RETURN TO WORKSPACE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
