import React, { useState } from 'react';
import {
  FolderOpen,
  Search,
  Filter,
  FileCode,
  Globe,
  HardDrive,
  ShieldCheck,
  AlertOctagon,
  ArrowRight,
  Terminal,
} from 'lucide-react';
import { EvidenceItem, PlayerState } from '../types';
import { playClickSound } from '../utils/audio';
import { ForensicSandboxModal } from './ForensicSandboxModal';

interface EvidenceNotebookProps {
  player: PlayerState;
  onSelectMission?: (missionId: string) => void;
}

export const EvidenceNotebook: React.FC<EvidenceNotebookProps> = ({
  player,
  onSelectMission,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSandboxOpen, setIsSandboxOpen] = useState<boolean>(false);

  const categories = [
    'all',
    'Domain Forensics',
    'File Artifacts',
    'Network Routing',
    'Hardware Diagnostics',
    'Social Engineering',
    'Optical / Deep Link',
  ];

  const filteredEvidence = player.evidence.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.indicator.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Domain Forensics':
        return <Globe className="h-4 w-4 text-cyan-400" />;
      case 'File Artifacts':
        return <FileCode className="h-4 w-4 text-amber-400" />;
      case 'Hardware Diagnostics':
        return <HardDrive className="h-4 w-4 text-rose-400" />;
      case 'Social Engineering':
        return <AlertOctagon className="h-4 w-4 text-purple-400" />;
      default:
        return <ShieldCheck className="h-4 w-4 text-emerald-400" />;
    }
  };

  return (
    <div
      id="evidence-notebook-view"
      className="mx-auto max-w-5xl px-4 py-6 sm:px-6 space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1b2332] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <FolderOpen className="h-4 w-4" />
            <span>FORENSIC REPOSITORY // EVIDENCE NOTEBOOK</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mt-1">
            Indicators of Compromise
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Cryptographic artifacts, forged domains, and payload traces logged during active missions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playClickSound();
              setIsSandboxOpen(true);
            }}
            className="flex items-center gap-1.5 rounded border border-cyan-500/60 bg-cyan-950/40 hover:bg-cyan-900/60 px-3 py-1.5 text-xs font-mono text-cyan-300 font-bold transition-colors shadow-xs"
            title="Launch interactive server-side forensic inspection tools"
          >
            <Terminal className="h-3.5 w-3.5 text-cyan-400" />
            <span>FORENSIC SANDBOX</span>
          </button>

          <div className="flex items-center gap-2 rounded border border-[#1e2637] bg-[#0e121a] px-3 py-1.5 text-xs font-mono text-slate-300">
            <span>TOTAL LOGGED:</span>
            <span className="font-bold text-cyan-400">{player.evidence.length} IOCs</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search indicator signatures, filenames, or domains..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-[#21293a] bg-[#0c1017] pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClickSound();
                setSelectedCategory(cat);
              }}
              className={`whitespace-nowrap rounded px-3 py-1.5 text-[11px] font-mono transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#1a2333] text-cyan-300 border border-cyan-800'
                  : 'bg-[#10141d] text-slate-400 hover:text-slate-200 border border-[#1b212f]'
              }`}
            >
              {cat === 'all' ? 'ALL EVIDENCE' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Evidence List */}
      {player.evidence.length === 0 ? (
        <div className="rounded-xl border border-[#1a2130] bg-[#0c1017] p-12 text-center">
          <FolderOpen className="mx-auto h-8 w-8 text-slate-400 mb-3" />
          <h3 className="text-sm font-bold text-slate-200 mb-1">
            Evidence Notebook is Empty
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
            No indicators of compromise have been logged yet. Enter an active mission sector
            and apply your cyber abilities (OBSERVE, INSPECT, VERIFY) to document evidence.
          </p>
        </div>
      ) : filteredEvidence.length === 0 ? (
        <div className="rounded-xl border border-[#1a2130] bg-[#0c1017] p-8 text-center text-xs text-slate-400">
          No documented artifacts match your search or filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvidence.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-[#1f283a] bg-[#0e131d] p-4 flex flex-col justify-between hover:border-cyan-700 transition-colors shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    {getCategoryIcon(item.category)}
                    <span className="text-slate-400">{item.category}</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 rounded bg-[#131924] px-1.5 py-0.5 border border-cyan-950">
                    VERIFIED IOC
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-100 mb-1">{item.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {item.description}
                </p>

                <div className="rounded border border-[#1a2232] bg-[#080b10] p-2.5 font-mono text-[11px] text-cyan-300 mb-3 break-all">
                  <div className="text-[9px] uppercase text-slate-400 mb-0.5">
                    TECHNICAL SIGNATURE / IOC:
                  </div>
                  {item.indicator}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#181f2b] text-[10px] font-mono text-slate-400">
                <span>MISSION // {item.missionId.toUpperCase()}</span>
                <span>{new Date(item.timestamp).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Forensic Sandbox Modal */}
      {isSandboxOpen && (
        <ForensicSandboxModal onClose={() => setIsSandboxOpen(false)} />
      )}
    </div>
  );
};
