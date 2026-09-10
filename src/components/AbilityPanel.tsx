import React, { useState } from 'react';
import {
  Zap,
  Lock,
  CheckCircle2,
  Terminal,
  Shield,
  Code2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { CyberAbility, PlayerState } from '../types';
import { playClickSound, playSuccessSound } from '../utils/audio';

interface AbilityPanelProps {
  player: PlayerState;
}

export const AbilityPanel: React.FC<AbilityPanelProps> = ({ player }) => {
  const [activeAbility, setActiveAbility] = useState<CyberAbility>(
    player.abilities[0]
  );
  const [terminalOutput, setTerminalOutput] = useState<string>(
    `[CYBER ABILITY MATRIX INITIALIZED]\nSelected ability: ${player.abilities[0].name}\nReady for forensic invocation.`
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
      default:
        simLog =
          `$ cyber ${ability.command}\n` +
          `[OK] Executing defense routine for ${ability.name}.\n` +
          `[RESULT] Defensive protocol verified and standing by.`;
    }

    setTerminalOutput(simLog);
  };

  return (
    <div
      id="cyber-ability-matrix-view"
      className="mx-auto max-w-5xl px-4 py-6 sm:px-6 space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1b2332] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <Zap className="h-4 w-4" />
            <span>OPERATIVE CAPABILITIES // CYBER ABILITY MATRIX</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mt-1">
            Defensive Cybersecurity Abilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Cybersecurity knowledge formalized into actionable tactical abilities. Earn advanced
            abilities by completing real-world scenarios.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded border border-[#1e2637] bg-[#0e121a] px-3 py-1.5 text-xs font-mono text-slate-300">
            <span>UNLOCKED:</span>{' '}
            <span className="font-bold text-cyan-400">
              {player.abilities.filter((a) => a.unlocked).length} /{' '}
              {player.abilities.length}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Abilities Grid */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
            Basic Tactical Abilities (Foundation)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {player.abilities
              .filter((a) => a.tier === 'basic')
              .map((ability) => {
                const isSelected = activeAbility.id === ability.id;
                return (
                  <button
                    key={ability.id}
                    id={`ability-card-${ability.id}`}
                    onClick={() => handleTestCommand(ability)}
                    className={`text-left rounded-lg border p-3.5 transition-all ${
                      isSelected
                        ? 'border-cyan-500 bg-[#141d2a] shadow-md'
                        : 'border-[#1f283a] bg-[#0e131d] hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-cyan-300">
                        [{ability.name}]
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" /> ACTIVE
                      </span>
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

          <div className="text-xs font-mono uppercase text-slate-400 tracking-wider pt-2">
            Advanced Specializations (Unlocked through Missions)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {player.abilities
              .filter((a) => a.tier === 'advanced')
              .map((ability) => {
                const isSelected = activeAbility.id === ability.id;
                const isUnlocked = ability.unlocked;

                return (
                  <button
                    key={ability.id}
                    id={`ability-card-${ability.id}`}
                    onClick={() => handleTestCommand(ability)}
                    className={`text-left rounded-lg border p-3.5 transition-all ${
                      isUnlocked
                        ? isSelected
                          ? 'border-cyan-500 bg-[#141d2a] shadow-md'
                          : 'border-[#1f283a] bg-[#0e131d] hover:border-slate-500'
                        : 'border-[#18202d] bg-[#090c12] opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-slate-200">
                        [{ability.name}]
                      </span>
                      {isUnlocked ? (
                        <span className="flex items-center gap-1 text-[10px] font-mono text-cyan-300">
                          <CheckCircle2 className="h-3 w-3" /> UNLOCKED
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                          <Lock className="h-3 w-3" /> LOCKED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2 mb-2">
                      {ability.description}
                    </p>
                    <div className="text-[10px] font-mono text-slate-400">
                      {isUnlocked
                        ? `CMD: ${ability.command}`
                        : ability.unlockedInMission
                        ? `Earn via: ${ability.unlockedInMission}`
                        : 'Earn via advanced missions'}
                    </div>
                  </button>
                );
              })}
          </div>
        </div>

        {/* Ability Execution Simulator Terminal */}
        <div className="lg:col-span-5 rounded-xl border border-[#1d2638] bg-[#090c12] p-4 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between border-b border-[#1a2333] pb-2.5 mb-3 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                <span>SANDBOX SIMULATOR</span>
              </div>
              <span className="text-[10px] text-cyan-300">
                ACTIVE TARGET: [{activeAbility.name}]
              </span>
            </div>

            <div className="rounded bg-[#040609] p-3 font-mono text-xs text-emerald-400/90 whitespace-pre-wrap leading-relaxed min-h-[260px] border border-[#161c28]">
              {terminalOutput}
            </div>
          </div>

          <div className="pt-3 border-t border-[#18212f]">
            <button
              id="test-selected-ability-btn"
              onClick={() => handleTestCommand(activeAbility)}
              className="w-full rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 py-2 text-xs font-bold font-mono transition-colors flex items-center justify-center gap-2"
            >
              <span>RUN EXECUTION TEST</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
