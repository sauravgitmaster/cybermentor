import React, { useState, useEffect } from 'react';
import {
  Shield,
  Terminal,
  Search,
  FileCode,
  Mail,
  QrCode,
  AlertTriangle,
  CheckCircle2,
  X,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { api, DomainAnalysis, HashAnalysis, HeaderAnalysis, QRAnalysis } from '../services/api';
import { playClickSound, playInspectSound } from '../utils/audio';

interface ForensicSandboxModalProps {
  onClose: () => void;
}

export const ForensicSandboxModal: React.FC<ForensicSandboxModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'domain' | 'hash' | 'header' | 'qr'>('domain');
  const [loading, setLoading] = useState<boolean>(false);
  const [samples, setSamples] = useState<any>(null);

  // Tool inputs
  const [domainInput, setDomainInput] = useState<string>('un1versity-help.com');
  const [domainResult, setDomainResult] = useState<DomainAnalysis | null>(null);

  const [fileNameInput, setFileNameInput] = useState<string>('urgent-action.pdf.exe');
  const [snippetInput, setSnippetInput] = useState<string>(
    'MZP\x00\x02\x00\x00\x00STRING POWERSHELL -enc SQBFAFgA...'
  );
  const [hashResult, setHashResult] = useState<HashAnalysis | null>(null);

  const [headerInput, setHeaderInput] = useState<string>(`From: "Campus Aid Office" <finaid@un1versity-help.com>
Return-Path: <bounce-daemon@external-mail-cluster.xyz>
Reply-To: <harvester99@proton.me>
Received: from mail.external-mail-cluster.xyz [198.51.100.88]
Received-SPF: fail (ip=198.51.100.88 does not match university.edu SPF record)
Authentication-Results: mx.campus.edu; dkim=fail; dmarc=fail`);
  const [headerResult, setHeaderResult] = useState<HeaderAnalysis | null>(null);

  const [qrInput, setQrInput] = useState<string>(
    'bank://transfer?recipient=0x9481a8b41&amount=250.00&memo=fare_recharge'
  );
  const [qrResult, setQrResult] = useState<QRAnalysis | null>(null);

  // Load samples on mount
  useEffect(() => {
    api.getToolSamples().then((s) => {
      if (s) setSamples(s);
    });
    // Auto-run first sample
    handleAnalyzeDomain('un1versity-help.com');
  }, []);

  const handleAnalyzeDomain = async (val?: string) => {
    const target = val || domainInput;
    if (!target.trim()) return;
    setLoading(true);
    playInspectSound();
    const res = await api.analyzeDomain(target);
    setDomainResult(res);
    setLoading(false);
  };

  const handleAnalyzeHash = async () => {
    if (!fileNameInput.trim()) return;
    setLoading(true);
    playInspectSound();
    const res = await api.analyzeHash(fileNameInput, snippetInput);
    setHashResult(res);
    setLoading(false);
  };

  const handleAnalyzeHeader = async () => {
    if (!headerInput.trim()) return;
    setLoading(true);
    playInspectSound();
    const res = await api.analyzeHeaders(headerInput);
    setHeaderResult(res);
    setLoading(false);
  };

  const handleAnalyzeQR = async () => {
    if (!qrInput.trim()) return;
    setLoading(true);
    playInspectSound();
    const res = await api.analyzeQR(qrInput);
    setQrResult(res);
    setLoading(false);
  };

  return (
    <div
      id="forensic-sandbox-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4 overflow-y-auto"
    >
      <div className="my-8 w-full max-w-3xl rounded-xl border border-cyan-500/40 bg-[#0c1322] shadow-2xl overflow-hidden font-mono text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#21304d] bg-[#111a2e] px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <Terminal className="h-5 w-5 text-cyan-400" />
            <div>
              <div className="text-xs font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <span>SECOPS FORENSIC SANDBOX TERMINAL</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-950/80 border border-emerald-600/60 text-[9px] text-emerald-400 font-bold">
                  LIVE BACKEND ENGINE
                </span>
              </div>
              <div className="text-[10px] text-slate-400">
                Direct server-side cryptographic and heuristic inspection utilities
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-1 text-slate-400 hover:text-slate-100 hover:bg-[#1f2c47] rounded transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigator */}
        <div className="flex border-b border-[#21304d] bg-[#090e18] px-3 gap-1 overflow-x-auto text-xs">
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('domain');
            }}
            className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 font-bold transition-colors whitespace-nowrap ${
              activeTab === 'domain'
                ? 'border-cyan-400 text-cyan-300 bg-[#111a2e]/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Search className="h-3.5 w-3.5" />
            <span>DOMAIN INSPECTOR</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('hash');
              if (!hashResult) handleAnalyzeHash();
            }}
            className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 font-bold transition-colors whitespace-nowrap ${
              activeTab === 'hash'
                ? 'border-cyan-400 text-cyan-300 bg-[#111a2e]/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="h-3.5 w-3.5" />
            <span>HASH & BINARY TRIAGE</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('header');
              if (!headerResult) handleAnalyzeHeader();
            }}
            className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 font-bold transition-colors whitespace-nowrap ${
              activeTab === 'header'
                ? 'border-cyan-400 text-cyan-300 bg-[#111a2e]/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="h-3.5 w-3.5" />
            <span>EMAIL HEADERS (SPF/DKIM)</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('qr');
              if (!qrResult) handleAnalyzeQR();
            }}
            className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 font-bold transition-colors whitespace-nowrap ${
              activeTab === 'qr'
                ? 'border-cyan-400 text-cyan-300 bg-[#111a2e]/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <QrCode className="h-3.5 w-3.5" />
            <span>QR & INTENT DECODER</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[68vh] overflow-y-auto">
          {/* 1. DOMAIN INSPECTOR */}
          {activeTab === 'domain' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1.5 font-bold">
                  TARGET DOMAIN / URL:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={domainInput}
                    onChange={(e) => setDomainInput(e.target.value)}
                    placeholder="e.g. un1versity-help.com or library.university.edu"
                    className="flex-1 bg-[#152033] border border-[#2b3e61] rounded px-3 py-2 text-xs text-slate-100 font-mono focus:outline-hidden focus:border-cyan-400"
                  />
                  <button
                    onClick={() => handleAnalyzeDomain()}
                    disabled={loading}
                    className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded transition-colors"
                  >
                    <Play className="h-3.5 w-3.5" />
                    <span>{loading ? 'ANALYZING...' : 'RUN TRIAGE'}</span>
                  </button>
                </div>
              </div>

              {/* Preset Samples */}
              {samples?.domains && (
                <div className="space-y-1.5">
                  <div className="text-[10px] uppercase text-slate-400 font-bold">LOAD PRESET SAMPLE:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {samples.domains.map((s: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setDomainInput(s.input);
                          handleAnalyzeDomain(s.input);
                        }}
                        className="px-2 py-1 bg-[#18243b] hover:bg-[#233557] border border-[#2c3e60] rounded text-[10px] text-cyan-300 font-mono transition-colors"
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {domainResult && (
                <div className="border border-[#253553] bg-[#0f1726] p-4 rounded-lg space-y-3">
                  <div className="flex items-center justify-between border-b border-[#21304d] pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">DOMAIN:</span>
                      <span className="text-sm font-bold text-slate-100">{domainResult.domain}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">RISK SCORE:</span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-bold ${
                          domainResult.riskScore >= 70
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : domainResult.riskScore >= 35
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        }`}
                      >
                        {domainResult.riskScore} / 100 [{domainResult.threatCategory}]
                      </span>
                    </div>
                  </div>

                  {domainResult.targetMatch && (
                    <div className="p-2.5 bg-amber-950/30 border border-amber-800/60 rounded text-xs text-amber-200">
                      <span className="font-bold">Target Whitelist Correlation:</span> Matches{' '}
                      <span className="text-amber-300 font-bold">{domainResult.targetMatch.legitimateDomain}</span> with{' '}
                      <span className="font-bold">{domainResult.targetMatch.similarityPercent}% Levenshtein similarity</span>.
                    </div>
                  )}

                  {domainResult.detectedAnomalies.length > 0 && (
                    <div className="space-y-1.5 text-xs">
                      <div className="text-[10px] font-bold uppercase text-slate-400">DETECTED ANOMALIES:</div>
                      {domainResult.detectedAnomalies.map((anom, i) => (
                        <div key={i} className="flex items-start gap-2 text-rose-300">
                          <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                          <span>{anom}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#21304d] text-xs text-slate-300">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">
                      SECOPS MITIGATION RECOMMENDATION:
                    </span>
                    <p>{domainResult.recommendation}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. HASH & BINARY PAYLOAD TRIAGE */}
          {activeTab === 'hash' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-bold">
                    FILE NAME:
                  </label>
                  <input
                    type="text"
                    value={fileNameInput}
                    onChange={(e) => setFileNameInput(e.target.value)}
                    className="w-full bg-[#152033] border border-[#2b3e61] rounded px-3 py-2 text-xs text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 mb-1 font-bold">
                    SNIPPET / MEMORY BUFFER:
                  </label>
                  <input
                    type="text"
                    value={snippetInput}
                    onChange={(e) => setSnippetInput(e.target.value)}
                    className="w-full bg-[#152033] border border-[#2b3e61] rounded px-3 py-2 text-xs text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                {samples?.hashes && (
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">SAMPLES:</span>
                    {samples.hashes.map((s: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setFileNameInput(s.fileName);
                          setSnippetInput(s.snippet);
                        }}
                        className="px-2 py-0.5 bg-[#18243b] hover:bg-[#233557] border border-[#2c3e60] rounded text-[10px] text-cyan-300"
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                )}
                <button
                  onClick={handleAnalyzeHash}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>CALCULATE HASHES</span>
                </button>
              </div>

              {hashResult && (
                <div className="border border-[#253553] bg-[#0f1726] p-4 rounded-lg space-y-2.5 text-xs">
                  <div className="flex items-center justify-between border-b border-[#21304d] pb-2">
                    <span className="font-bold text-slate-200">{hashResult.inputName}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        hashResult.isMalicious
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {hashResult.isMalicious ? 'THREAT DETECTED' : 'CLEAN BUFFER'}
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px] font-mono">
                    <div>
                      <span className="text-slate-400">MD5: </span>
                      <span className="text-cyan-300">{hashResult.md5}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">SHA-1: </span>
                      <span className="text-cyan-300">{hashResult.sha1}</span>
                    </div>
                    <div className="truncate">
                      <span className="text-slate-400">SHA-256: </span>
                      <span className="text-cyan-300">{hashResult.sha256}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">SHANNON ENTROPY: </span>
                      <span className="text-amber-300 font-bold">{hashResult.entropy} / 8.0</span>
                      <span className="text-slate-500 ml-2">
                        {hashResult.isPackedOrEncrypted ? '(High - Likely Packed / Encrypted)' : '(Normal)'}
                      </span>
                    </div>
                    {hashResult.signatureMatch && (
                      <div className="text-rose-400 font-bold">
                        <span>SIGNATURE: </span>
                        <span>{hashResult.signatureMatch}</span>
                      </div>
                    )}
                  </div>

                  {hashResult.detectedIndicators.length > 0 && (
                    <div className="pt-2 border-t border-[#21304d] space-y-1">
                      {hashResult.detectedIndicators.map((ind, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-rose-300 text-xs">
                          <AlertTriangle className="h-3 w-3 shrink-0 mt-0.5" />
                          <span>{ind}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 3. EMAIL HEADERS */}
          {activeTab === 'header' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  PASTE RFC 822 / MIME EMAIL HEADERS:
                </label>
                {samples?.headers && (
                  <div className="flex gap-1.5">
                    {samples.headers.map((h: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => {
                          setHeaderInput(h.raw);
                        }}
                        className="px-2 py-0.5 bg-[#18243b] hover:bg-[#233557] border border-[#2c3e60] rounded text-[10px] text-cyan-300"
                      >
                        {h.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <textarea
                rows={5}
                value={headerInput}
                onChange={(e) => setHeaderInput(e.target.value)}
                className="w-full bg-[#152033] border border-[#2b3e61] rounded p-2.5 text-xs text-slate-200 font-mono focus:outline-hidden focus:border-cyan-400"
              />

              <div className="flex justify-end">
                <button
                  onClick={handleAnalyzeHeader}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>INSPECT AUTHENTICATION (SPF / DKIM / DMARC)</span>
                </button>
              </div>

              {headerResult && (
                <div className="border border-[#253553] bg-[#0f1726] p-4 rounded-lg space-y-2.5 text-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-[#21304d] pb-2.5 text-center">
                    <div className="p-1.5 rounded bg-[#162136]">
                      <div className="text-[9px] text-slate-400">SPF STATUS</div>
                      <div
                        className={`font-bold ${
                          headerResult.spfStatus === 'PASS' ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {headerResult.spfStatus}
                      </div>
                    </div>
                    <div className="p-1.5 rounded bg-[#162136]">
                      <div className="text-[9px] text-slate-400">DKIM SIGNATURE</div>
                      <div
                        className={`font-bold ${
                          headerResult.dkimStatus === 'PASS' ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {headerResult.dkimStatus}
                      </div>
                    </div>
                    <div className="p-1.5 rounded bg-[#162136]">
                      <div className="text-[9px] text-slate-400">DMARC ALIGNMENT</div>
                      <div
                        className={`font-bold ${
                          headerResult.dmarcStatus === 'PASS' ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {headerResult.dmarcStatus}
                      </div>
                    </div>
                    <div className="p-1.5 rounded bg-[#162136]">
                      <div className="text-[9px] text-slate-400">SENDER VERDICT</div>
                      <div
                        className={`font-bold ${headerResult.isSpoofed ? 'text-rose-400' : 'text-emerald-400'}`}
                      >
                        {headerResult.isSpoofed ? 'SPOOFED / FORGED' : 'VERIFIED'}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 text-slate-300">
                    <div>
                      <span className="text-slate-400">Visible From: </span>
                      <span>{headerResult.fromAddress}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Bounce Return-Path: </span>
                      <span
                        className={
                          headerResult.returnPath !== headerResult.fromAddress
                            ? 'text-rose-400 font-bold'
                            : 'text-slate-200'
                        }
                      >
                        {headerResult.returnPath}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">Originating Client IP: </span>
                      <span className="text-cyan-300">{headerResult.clientIp}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#21304d]">
                    <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                      FORENSIC OBSERVATIONS:
                    </div>
                    {headerResult.forensicSummary.map((sum, i) => (
                      <div key={i} className="text-xs text-amber-200 flex items-start gap-1.5">
                        <span>•</span>
                        <span>{sum}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. QR DECODER */}
          {activeTab === 'qr' && (
            <div className="space-y-3">
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                QR CODE PAYLOAD / DEEP LINK URL:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  className="flex-1 bg-[#152033] border border-[#2b3e61] rounded px-3 py-2 text-xs text-slate-100 font-mono"
                />
                <button
                  onClick={handleAnalyzeQR}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>DECODE</span>
                </button>
              </div>

              {samples?.qrs && (
                <div className="flex gap-1.5 items-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">SAMPLES:</span>
                  {samples.qrs.map((s: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => {
                        setQrInput(s.payload);
                      }}
                      className="px-2 py-0.5 bg-[#18243b] hover:bg-[#233557] border border-[#2c3e60] rounded text-[10px] text-cyan-300"
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              )}

              {qrResult && (
                <div className="border border-[#253553] bg-[#0f1726] p-4 rounded-lg space-y-2.5 text-xs">
                  <div className="flex items-center justify-between border-b border-[#21304d] pb-2">
                    <span className="font-bold text-slate-200">Protocol: {qrResult.protocol}://</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        qrResult.verdict === 'MALICIOUS'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : qrResult.verdict === 'SUSPICIOUS'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      VERDICT: {qrResult.verdict}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div>
                      <span className="text-slate-400">Destination Host: </span>
                      <span className="text-slate-200 font-bold">{qrResult.destinationHost}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Deep Link Action: </span>
                      <span className={qrResult.isDeepLink ? 'text-amber-300 font-bold' : 'text-slate-400'}>
                        {qrResult.isDeepLink ? 'YES (Bypasses browser sandbox)' : 'Standard Web Link'}
                      </span>
                    </div>
                  </div>

                  {qrResult.riskFactors.length > 0 && (
                    <div className="pt-2 border-t border-[#21304d] space-y-1">
                      <div className="text-[10px] font-bold uppercase text-slate-400">RISK FACTORS:</div>
                      {qrResult.riskFactors.map((rf, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-rose-300 text-xs">
                          <AlertTriangle className="h-3 w-3 shrink-0 mt-0.5" />
                          <span>{rf}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#21304d] text-slate-300">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                      DEFENSIVE PROTOCOL:
                    </span>
                    <p>{qrResult.mitigation}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#21304d] bg-[#0c1322] px-5 py-3 text-xs">
          <span className="text-slate-400 text-[10px]">
            Connected to port 3000 • Direct cryptographic execution
          </span>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-4 py-1.5 bg-[#1c2942] hover:bg-[#273859] border border-[#3b5175] rounded text-slate-200 font-bold uppercase text-[11px] transition-colors"
          >
            Close Terminal
          </button>
        </div>
      </div>
    </div>
  );
};
