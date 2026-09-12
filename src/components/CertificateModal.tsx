import React from 'react';
import { Award, Shield, CheckCircle2, X, Printer, Sparkles } from 'lucide-react';
import { Certificate } from '../types';
import { playClickSound } from '../utils/audio';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
}) => {
  if (!certificate) return null;

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  return (
    <div
      id="certificate-viewer-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl">
        {/* Controls bar */}
        <div className="flex items-center justify-between mb-3 px-1 text-xs font-mono">
          <span className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>OFFICIAL OPERATIVE CREDENTIAL</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-cyan-700/60 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/60 transition-colors cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>PRINT / SAVE</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close certificate"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Certificate Parchment / Frame */}
        <div
          id="certificate-print-area"
          className="relative rounded-3xl border-4 border-amber-400/80 bg-gradient-to-b from-[#0f172a] via-[#090d16] to-[#05080f] p-8 sm:p-12 shadow-2xl text-center ring-1 ring-amber-400/40 select-none overflow-hidden"
        >
          {/* Subtle ornate decorative border corners */}
          <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-amber-400/70 rounded-tl-xl pointer-events-none" />
          <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-amber-400/70 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-amber-400/70 rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-amber-400/70 rounded-br-xl pointer-events-none" />

          {/* Glowing emblem aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Certificate Header */}
          <div className="relative z-10 flex flex-col items-center space-y-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-amber-400 bg-amber-500/10 shadow-lg text-amber-300">
              <Award className="h-9 w-9" />
            </div>

            <div className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mt-1">
              CYBERMENTOR AI // CERTIFICATE OF EXCELLENCE
            </div>

            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-slate-100 font-sans mt-1">
              {certificate.title}
            </h2>

            <p className="text-xs text-slate-400 font-mono tracking-wide uppercase">
              {certificate.field}
            </p>
          </div>

          <div className="my-6 border-b border-amber-400/30 w-3/4 mx-auto" />

          {/* Recipient Presentation */}
          <div className="relative z-10 space-y-3">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-mono">
              THIS CREDENTIAL IS PROUDLY CONFERRED UPON
            </p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-amber-300 font-sans tracking-wide">
              {certificate.issuedTo}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-sans leading-relaxed">
              {certificate.description ||
                'For demonstrating outstanding defensive discernment, evidence-based reasoning, and unwavering vigilance in digital incident response.'}
            </p>
          </div>

          {/* Verification Matrix */}
          <div className="relative z-10 mt-8 grid grid-cols-3 gap-2 border-t border-[#1c2a40] pt-6 text-left font-mono">
            <div>
              <div className="text-[10px] text-slate-500 uppercase">DATE ISSUED</div>
              <div className="text-xs font-bold text-slate-200">{certificate.issueDate}</div>
            </div>

            <div className="text-center">
              <div className="text-[10px] text-slate-500 uppercase">DIGITAL TRUST</div>
              <div className="text-xs font-bold text-cyan-400">
                {certificate.verifiedScore} / 100 RATING
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] text-slate-500 uppercase">CREDENTIAL ID</div>
              <div className="text-[11px] font-bold text-slate-300 truncate">
                {certificate.credentialId}
              </div>
            </div>
          </div>

          {/* Official Verification Seal */}
          <div className="relative z-10 mt-6 flex items-center justify-center gap-2 text-emerald-400 text-xs font-mono font-semibold">
            <CheckCircle2 className="h-4 w-4" />
            <span>CRYPTOGRAPHICALLY VERIFIED BY CYBERMENTOR KERNEL</span>
          </div>
        </div>
      </div>
    </div>
  );
};
