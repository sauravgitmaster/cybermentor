import React, { useState } from 'react';
import {
  Zap,
  Lock,
  CheckCircle2,
  Terminal,
  Shield,
  Code2,
  ArrowRight,
  GitFork,
  LayoutGrid,
  Search,
  Eye,
  HelpCircle,
  Activity,
  Layers,
} from 'lucide-react';
import { CyberAbility, PlayerState } from '../types';
import { playClickSound, playSuccessSound } from '../utils/audio';

interface AbilityPanelProps {
  player: PlayerState;
}

interface TreeNode {
  abilityId: string;
  parentId?: string;
  tier: 1 | 2 | 3;
  branch: 'vigilance' | 'forensics' | 'countermeasures';
}

const TREE_HIERARCHY: TreeNode[] = [
  // Tier 1: Foundation
  { abilityId: 'OBSERVE', tier: 1, branch: 'vigilance' },
  { abilityId: 'QUESTION', tier: 1, branch: 'vigilance' },

  // Tier 2: Technical Examination
  { abilityId: 'INSPECT', parentId: 'OBSERVE', tier: 2, branch: 'forensics' },
  { abilityId: 'VERIFY', parentId: 'QUESTION', tier: 2, branch: 'forensics' },
  { abilityId: 'REPORT', parentId: 'QUESTION', tier: 2, branch: 'countermeasures' },

  // Tier 3: Advanced Containment & Response
  { abilityId: 'ANALYZE', parentId: 'INSPECT', tier: 3, branch: 'forensics' },
  { abilityId: 'TRACE', parentId: 'VERIFY', tier: 3, branch: 'forensics' },
  { abilityId: 'ISOLATE', parentId: 'INSPECT', tier: 3, branch: 'countermeasures' },
  { abilityId: 'PROTECT', parentId: 'REPORT', tier: 3, branch: 'countermeasures' },
  { abilityId: 'RESPOND', parentId: 'PROTECT', tier: 3, branch: 'countermeasures' },
];

export const AbilityPanel: React.FC<AbilityPanelProps> = ({ player }) => {
  const [viewMode, setViewMode] = useState<'tree' | 'grid'>('tree');
  const [activeAbility, setActiveAbility] = useState<CyberAbility>(player.abilities[0]);
  const [terminalOutput, setTerminalOutput] = useState<string>(
    `[CYBER ABILITY MATRIX & SKILL TREE INITIALIZED]\nSelected ability: ${player.abilities[0].name}\nReady for forensic invocation.`
  );

  const handleTestCommand = (ability: CyberAbility) => {
    playClickSound();
    setActiveAbility(ability);

    if (!ability.unlocked) {
      setTerminalOutput(
        `[ACCESS DENIED: ABILITY LOCKED]\n` +
          `Ability '${ability.name}' has not been earned through mission survival.\n` +
          `Required clearance: Resolve mission ${ability.unlockedInMission || 'challenges'} to unlock.`
      );
      return;
    }

    playSuccessSound();
    let simLog = '';
    switch (ability.id) {
      case 'OBSERVE':
        simLog =
          `$ cyber ${ability.command}\n` +
          `[OK] Behavioral heuristic scanner engaged.\n` +
          `[LOG] Scanning for urgency levers, deadline pressure, emotional coercion.\n` +
          `[RESULT] Found 2 psychological manipulation flags: 'IMMEDIATE EXPIRATION', 'MANDATORY ACTION'.`;
        break;
      case 'INSPECT':
        simLog =
          `$ cyber ${ability.command}\n` +
          `[OK] Forensic metadata extractor active.\n` +
          `[LOG] Dissecting MIME boundary, RFC 822 sender, link href destination.\n` +
          `[RESULT] Discovered mismatch between display text 'university.edu' and target 'un1versity-help.com'.`;
        break;
      case 'VERIFY':
        simLog =
          `$ cyber ${ability.command}\n` +
          `[OK] Cryptographic authentication validator invoked.\n` +
          `[LOG] Querying DNS TXT records for SPF, DKIM public selector, DMARC policy.\n` +
          `[RESULT] SPF: SoftFail (sender IP unauthorized). DKIM: None. Validation failed.`;
        break;
      case 'QUESTION':
        simLog =
          `$ cyber ${ability.command}\n` +
          `[OK] Corroborative institutional protocol inquiry initiated.\n` +
          `[LOG] Checking IT Help Desk policy standard: 'IT never asks for passwords or portal credential validation via external web forms.'\n` +
          `[RESULT] Transaction violates official security protocol.`;
        break;
      case 'ANALYZE':
        simLog =
          `$ cyber ${ability.command}\n` +
          `[OK] Static binary decompiler running in sandboxed isolation.\n` +
          `[LOG] Parsing PE header, imported DLLs, embedded PowerShell invocation.\n` +
          `[RESULT] High entropy detected in resource section. Payload spawns outbound beacon to C2 node.`;
        break;
      case 'TRACE':
        simLog =
          `$ cyber ${ability.command}\n` +
          `[OK] Network topology trace route initialized.\n` +
          `[LOG] Probing 8 intermediate autonomous systems.\n` +
          `[RESULT] Traffic diverted through bulletproof hosting provider in unassigned ASN.`;
        break;
      case 'ISOLATE':
        simLog =
          `$ cyber ${ability.command}\n` +
          `[OK] Host containment protocol triggered.\n` +
          `[LOG] Severing 802.11ax wireless interface. Terminating untrusted USB endpoints.\n` +
          `[RESULT] Host successfully quarantined. Lateral movement halted.`;
        break;
      case 'PROTECT':
        simLog =
          `$ cyber ${ability.command}\n` +
          `[OK] Defensive perimeter shield locked down.\n` +
          `[LOG] Rotating multi-factor authentication secrets, invalidating open sessions.\n` +
          `[RESULT] Account credentials and tokens secured.`;
        break;
      case 'REPORT':
        simLog =
          `$ cyber ${ability.command}\n` +
          `[OK] Incident dispatch to Security Operations Center (SOC).\n` +
          `[LOG] Indicators of Compromise (IoCs) broadcasted to network firewalls.\n` +
          `[RESULT] Phishing cluster blacklisted enterprise-wide.`;
        break;
      case 'RESPOND':
        simLog =
          `$ cyber ${ability.command}\n` +
          `[OK] Threat neutralization & remediation protocol executed.\n` +
          `[LOG] Rolling back compromised configurations and restoring clean state.\n` +
          `[RESULT] Incident successfully contained and resolved.`;
        break;
      default:
        simLog =
          `$ cyber ${ability.command}\n` +
          `[OK] Executing defense routine for ${ability.name}.\n` +
          `[RESULT] Defensive protocol verified and standing by.`;
    }

    setTerminalOutput(simLog);
  };

  const getAbilityById = (id: string) => player.abilities.find((a) => a.id === id);

  return (
    <div
      id="cyber-ability-matrix-view"
      className="mx-auto max-w-6xl px-4 py-6 sm:px-6 space-y-6 animate-in fade-in duration-200"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1b2332] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
            <Zap className="h-4 w-4" />
            <span>OPERATIVE CAPABILITIES // RPG CYBER SKILL TREE</span>
          </div>
          <h2 className="text-2xl font-black text-white uppercase font-sans mt-0.5">
            Defensive Skill Progression
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans">
            Visualize your mastery tree. Complete missions to unlock advanced forensics, containment, and response protocols.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle: Tree vs Grid */}
          <div className="flex items-center rounded-xl border border-slate-700/70 bg-slate-900/80 p-1 text-xs font-mono">
            <button
              onClick={() => {
                playClickSound();
                setViewMode('tree');
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                viewMode === 'tree'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <GitFork className="h-3.5 w-3.5" />
              <span>SKILL TREE</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                setViewMode('grid');
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>GRID VIEW</span>
            </button>
          </div>

          <div className="rounded-xl border border-[#21324a] bg-[#0c1421] px-3.5 py-1.5 text-xs font-mono text-slate-300">
            <span>UNLOCKED:</span>{' '}
            <span className="font-bold text-cyan-400">
              {player.abilities.filter((a) => a.unlocked).length} / {player.abilities.length}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Main Section: Tree or Grid */}
        <div className="lg:col-span-7 space-y-6">
          {viewMode === 'tree' ? (
            /* RPG CYBER SKILL TREE GRAPH */
            <div className="rounded-3xl border border-[#21344e] bg-[#0c1421] p-5 sm:p-6 space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono border-b border-[#1c2a3f] pb-3">
                <span className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <GitFork className="h-4 w-4" />
                  <span>PROGRESSION BRANCHES</span>
                </span>
                <span className="text-slate-400">
                  TIER 1 (FOUNDATION) ➔ TIER 2 (FORENSICS) ➔ TIER 3 (CONTAINMENT)
                </span>
              </div>

              {/* TIER 1: Foundations */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="h-3 w-3" />
                  <span>TIER 1 // COGNITIVE FOUNDATION</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['OBSERVE', 'QUESTION'].map((id) => {
                    const ability = getAbilityById(id);
                    if (!ability) return null;
                    const isSelected = activeAbility.id === ability.id;
                    return (
                      <button
                        key={ability.id}
                        id={`ability-node-${ability.id}`}
                        onClick={() => handleTestCommand(ability)}
                        className={`text-left rounded-2xl border-2 p-3.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-950/40 shadow-lg ring-1 ring-cyan-400/40'
                            : 'border-cyan-700/50 bg-[#111c2b] hover:border-cyan-500'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-mono text-xs font-bold text-cyan-300">
                            [{ability.name}]
                          </span>
                          <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                            <CheckCircle2 className="h-3 w-3" /> UNLOCKED
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-sans">
                          {ability.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Connecting Tree Divider */}
              <div className="flex items-center justify-center gap-2 text-cyan-500/60 font-mono text-xs py-1">
                <span>↓ BRANCHING FORENSIC PATHS ↓</span>
              </div>

              {/* TIER 2: Investigation & Technical Examination */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="h-3 w-3" />
                  <span>TIER 2 // FORENSIC ANALYSIS &amp; PROTOCOL</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {['INSPECT', 'VERIFY', 'REPORT'].map((id) => {
                    const ability = getAbilityById(id);
                    if (!ability) return null;
                    const isSelected = activeAbility.id === ability.id;
                    const isUnlocked = ability.unlocked;
                    return (
                      <button
                        key={ability.id}
                        id={`ability-node-${ability.id}`}
                        onClick={() => handleTestCommand(ability)}
                        className={`text-left rounded-2xl border-2 p-3 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-950/40 shadow-lg'
                            : isUnlocked
                            ? 'border-[#243750] bg-[#111a28] hover:border-cyan-500'
                            : 'border-slate-800 bg-slate-900/40 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-xs font-bold text-slate-200">
                            [{ability.name}]
                          </span>
                          {isUnlocked ? (
                            <CheckCircle2 className="h-3 w-3 text-cyan-400" />
                          ) : (
                            <Lock className="h-3 w-3 text-slate-500" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-300 line-clamp-2 font-sans">
                          {ability.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Connecting Tree Divider */}
              <div className="flex items-center justify-center gap-2 text-cyan-500/60 font-mono text-xs py-1">
                <span>↓ ADVANCED CONTAINMENT &amp; MITIGATION ↓</span>
              </div>

              {/* TIER 3: Deep Countermeasures */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="h-3 w-3" />
                  <span>TIER 3 // DEFENSIVE MITIGATION &amp; RESILIENCE</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['ANALYZE', 'TRACE', 'ISOLATE', 'PROTECT', 'RESPOND'].map((id) => {
                    const ability = getAbilityById(id);
                    if (!ability) return null;
                    const isSelected = activeAbility.id === ability.id;
                    const isUnlocked = ability.unlocked;
                    return (
                      <button
                        key={ability.id}
                        id={`ability-node-${ability.id}`}
                        onClick={() => handleTestCommand(ability)}
                        className={`text-left rounded-2xl border-2 p-3 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-purple-400 bg-purple-950/40 shadow-lg'
                            : isUnlocked
                            ? 'border-[#2d2f4d] bg-[#141525] hover:border-purple-400'
                            : 'border-slate-800 bg-slate-900/40 opacity-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-xs font-bold text-slate-200">
                            [{ability.name}]
                          </span>
                          {isUnlocked ? (
                            <span className="text-[10px] font-mono text-purple-300 flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" /> READY
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                              <Lock className="h-3 w-3" /> LOCKED
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-300 line-clamp-2 font-sans">
                          {ability.description}
                        </p>
                        <div className="mt-2 text-[10px] font-mono text-slate-400">
                          {isUnlocked
                            ? `CMD: ${ability.command}`
                            : `Earn via: ${ability.unlockedInMission || 'Missions'}`}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Standard Grid View fallback */
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {player.abilities.map((ability) => {
                  const isSelected = activeAbility.id === ability.id;
                  const isUnlocked = ability.unlocked;
                  return (
                    <button
                      key={ability.id}
                      onClick={() => handleTestCommand(ability)}
                      className={`text-left rounded-2xl border p-4 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-cyan-400 bg-[#142030] shadow-md'
                          : isUnlocked
                          ? 'border-[#1f283a] bg-[#0e131d] hover:border-slate-500'
                          : 'border-slate-800 bg-slate-900/40 opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold text-cyan-300">
                          [{ability.name}]
                        </span>
                        {isUnlocked ? (
                          <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                            <CheckCircle2 className="h-3 w-3" /> ACTIVE
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                            <Lock className="h-3 w-3" /> LOCKED
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-2 mb-2">
                        {ability.description}
                      </p>
                      <div className="text-[10px] font-mono text-slate-400">
                        CMD: {ability.command}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Sandbox Simulator Terminal */}
        <div className="lg:col-span-5 rounded-3xl border border-[#21344e] bg-[#0c1421] p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between border-b border-[#1c2c44] pb-3 mb-3 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-cyan-400" />
                <span className="font-bold uppercase tracking-wider text-slate-200">
                  ABILITY TERMINAL
                </span>
              </div>
              <span className="text-[11px] font-mono text-cyan-300">
                ACTIVE: [{activeAbility.name}]
              </span>
            </div>

            <div className="rounded-2xl bg-[#060a11] p-4 font-mono text-xs text-emerald-400/90 whitespace-pre-wrap leading-relaxed min-h-[300px] border border-[#162233] shadow-inner">
              {terminalOutput}
            </div>
          </div>

          <div className="pt-4 border-t border-[#1c2c44] mt-4">
            <button
              id="test-selected-ability-btn"
              onClick={() => handleTestCommand(activeAbility)}
              className="w-full rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-3 text-xs font-extrabold font-mono transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <span>RUN EXECUTION TEST</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
