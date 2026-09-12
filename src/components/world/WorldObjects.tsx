import React from 'react';
import {
  Compass,
  Zap,
  FolderOpen,
  User,
  Cpu,
  Monitor,
  Wifi,
  Radio,
  BookOpen,
  Coffee,
  Wrench,
  Shield,
  Layers,
} from 'lucide-react';
import { WorldInteractable, WorldBuilding, WorldProp } from '../../types/world';

interface StationProps {
  interactable: WorldInteractable;
  isNearPlayer: boolean;
  onInteract?: () => void;
}

export const InteractiveStation: React.FC<StationProps> = ({
  interactable,
  isNearPlayer,
  onInteract,
}) => {
  const { type, name, position } = interactable;

  return (
    <div
      id={`station-${interactable.id}`}
      onClick={onInteract}
      className={`absolute select-none cursor-pointer z-20 transition-all duration-150 ${
        isNearPlayer ? 'scale-110' : 'hover:scale-105'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -70%)',
      }}
    >
      {/* Overhead RPG Prompt Tag - Only shown when player approaches */}
      {isNearPlayer && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none animate-in fade-in duration-150">
          <span className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider rounded-full shadow-md border text-slate-950 bg-amber-400 border-amber-300 ring-2 ring-amber-400/40">
            {name}
          </span>
        </div>
      )}

      {/* Ground Shadow */}
      <div className="absolute left-1/2 top-[30px] -translate-x-1/2 w-9 h-3 bg-black/40 rounded-full blur-[1px]" />

      {/* Physical World Terminal Objects */}
      {type === 'terminal-world' && (
        // Campus Gateway Console (Stone plinth + Holo Globe)
        <div className="relative flex flex-col items-center">
          <div className="w-9 h-9 rounded-lg bg-[#0f172a] border-2 border-[#0284c7] shadow-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-transparent" />
            <Compass className="h-5 w-5 text-cyan-300 animate-spin" style={{ animationDuration: '12s' }} />
          </div>
          {/* Pedestal */}
          <div className="w-5 h-4 bg-[#475569] border-x border-[#334155]" />
          <div className="w-8 h-2 bg-[#334155] rounded-t-sm" />
        </div>
      )}

      {type === 'terminal-mentor' && (
        // CyberMentor AI Uplink (Futuristic Obelisk + Floating AI Core)
        <div className="relative flex flex-col items-center">
          {/* Floating AI Hologram Core */}
          <div className="w-9 h-9 rounded-full bg-[#1e1b4b] border-2 border-[#818cf8] shadow-[0_0_12px_rgba(129,140,248,0.5)] flex items-center justify-center relative animate-bounce" style={{ animationDuration: '3s' }}>
            <Cpu className="h-5 w-5 text-indigo-300 animate-pulse" />
          </div>
          {/* Communications Monolith Base */}
          <div className="w-6 h-5 bg-[#1e293b] border-x border-[#334155] mt-1 relative">
            <div className="w-1 h-3 bg-cyan-400 mx-auto mt-1" />
          </div>
          <div className="w-10 h-2 bg-[#0f172a] rounded-t-sm border-t border-[#475569]" />
        </div>
      )}

      {type === 'terminal-abilities' && (
        // Tactical Workstation (Tech bench + monitors)
        <div className="relative flex flex-col items-center">
          <div className="w-10 h-8 rounded bg-[#1e293b] border-2 border-[#d97706] shadow-md flex items-center justify-center relative overflow-hidden">
            <Zap className="h-5 w-5 text-amber-400" />
            <div className="absolute bottom-1 w-7 h-1 bg-amber-500/50 rounded-full" />
          </div>
          <div className="w-8 h-3 bg-[#451a03] border-t border-[#78350f]" />
          <div className="w-11 h-2 bg-[#292524] rounded-t-sm" />
        </div>
      )}

      {type === 'terminal-evidence' && (
        // Evidence Board (Cork board on easel)
        <div className="relative flex flex-col items-center">
          <div className="w-11 h-8 rounded bg-[#78350f] border-2 border-[#b45309] shadow-md p-1 flex flex-col justify-between relative overflow-hidden">
            <div className="flex justify-between items-center px-0.5">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
            </div>
            <div className="flex items-center justify-center">
              <FolderOpen className="h-3.5 w-3.5 text-amber-200" />
            </div>
          </div>
          <div className="flex justify-between w-9 -mt-0.5">
            <div className="w-1 h-3 bg-[#543821] -rotate-12" />
            <div className="w-1 h-3 bg-[#543821] rotate-12" />
          </div>
        </div>
      )}

      {type === 'terminal-profile' && (
        // Operative ID Terminal (Campus Badge Kiosk)
        <div className="relative flex flex-col items-center">
          <div className="w-8 h-9 rounded bg-[#1e293b] border-2 border-[#7c3aed] shadow-md flex flex-col items-center justify-center p-1">
            <User className="h-4 w-4 text-purple-300" />
            <div className="w-5 h-1 bg-purple-500 mt-1 rounded-full animate-pulse" />
          </div>
          <div className="w-5 h-3 bg-[#334155]" />
          <div className="w-8 h-1.5 bg-[#1e293b] rounded-t-sm" />
        </div>
      )}
    </div>
  );
};

export const BuildingStructure: React.FC<{ building: WorldBuilding }> = ({ building }) => {
  const { id, name, label, x, y, w, h } = building;

  // Custom architectural styling based on building identity
  const isLibrary = id === 'bld-library';
  const isUnion = id === 'bld-student-center';
  const isEngineering = id === 'bld-engineering';
  const isSecOps = id === 'bld-secops';

  return (
    <div
      id={`bld-${building.id}`}
      className="absolute select-none pointer-events-none z-10"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${w}px`,
        height: `${h}px`,
      }}
    >
      <div className="w-full h-full relative rounded-t-xl overflow-hidden shadow-2xl">
        {/* ======================================================== */}
        {/* 1. CAMPUS LIBRARY (Warm Sandstone & Terracotta Red Roof)  */}
        {/* ======================================================== */}
        {isLibrary && (
          <div className="w-full h-full flex flex-col bg-[#e7d8c0] border-2 border-[#8c7456]">
            {/* Pitched Terracotta Tile Roof */}
            <div className="h-16 w-full bg-[#a3442a] relative overflow-hidden border-b-4 border-[#782813] shadow-md">
              {/* Roof tile lines */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 0, transparent 8px)',
                }}
              />
              <div className="absolute bottom-1 w-full h-1.5 bg-[#782813]" />
              {/* Roof Dormer Window */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-9 bg-[#e7d8c0] border-2 border-[#782813] rounded-t-lg flex items-center justify-center shadow">
                <div className="w-9 h-6 bg-[#fde047]/60 border border-[#8c7456] rounded-t flex items-center justify-center">
                  <BookOpen className="h-3 w-3 text-[#78350f]" />
                </div>
              </div>
            </div>

            {/* Facade & Sign */}
            <div className="px-4 py-1.5 bg-[#d9c4a5] border-b border-[#bfa37c] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-[#a3442a] border border-[#782813]" />
                <span className="text-xs font-bold font-mono tracking-wider text-[#3d2a1c] uppercase">
                  {name}
                </span>
              </div>
              <span className="text-[9px] font-mono text-[#6e5138] uppercase font-semibold">
                DIGITAL COMMONS
              </span>
            </div>

            {/* Main Wall with Arched Windows and Bookshelf Glow */}
            <div className="flex-1 px-4 py-2 flex items-center justify-around relative">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-12 h-14 rounded-t-full bg-[#fef08a]/80 border-2 border-[#78350f] shadow-inner relative flex flex-col justify-end p-1 overflow-hidden"
                >
                  {/* Window Mullions */}
                  <div className="absolute inset-0 border-r border-[#78350f] left-1/2" />
                  <div className="absolute inset-0 border-b border-[#78350f] top-1/2" />
                  {/* Flower planter box */}
                  <div className="w-full h-3 bg-[#451a03] border-t border-[#78350f] z-10 flex justify-around items-center px-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  </div>
                </div>
              ))}
            </div>

            {/* Grand Oak Double Entrance Door */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-14 bg-[#543821] border-t-2 border-x-2 border-[#3b2312] rounded-t-lg flex items-center justify-around px-2 shadow-lg">
              <div className="w-5 h-10 border border-[#784d2f] bg-[#3d2616] flex items-center justify-end pr-0.5">
                <div className="w-1 h-1 rounded-full bg-amber-400 shadow" />
              </div>
              <div className="w-5 h-10 border border-[#784d2f] bg-[#3d2616] flex items-center justify-start pl-0.5">
                <div className="w-1 h-1 rounded-full bg-amber-400 shadow" />
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 2. STUDENT UNION & CAFE (Green Awning & Glass Cafe Front) */}
        {/* ======================================================== */}
        {isUnion && (
          <div className="w-full h-full flex flex-col bg-[#f0e6d6] border-2 border-[#7d705c]">
            {/* Hunter Green Pitched Roof */}
            <div className="h-16 w-full bg-[#1b4332] relative overflow-hidden border-b-4 border-[#081c15] shadow-md">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(-45deg, #000 0, #000 2px, transparent 0, transparent 8px)',
                }}
              />
              <div className="absolute top-2 right-4 flex items-center gap-1.5 bg-[#2d6a4f] px-2 py-0.5 rounded border border-[#40916c] text-[#d8f3dc] text-[9px] font-mono font-bold">
                <Coffee className="h-3 w-3" />
                <span>CYBER CAFE</span>
              </div>
            </div>

            {/* Facade & Striped Green/White Awning */}
            <div className="relative">
              <div className="h-5 w-full bg-gradient-to-r from-emerald-600 via-white to-emerald-600 flex shadow-md">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className={`flex-1 h-full ${i % 2 === 0 ? 'bg-[#2d6a4f]' : 'bg-[#e9f5ed]'}`}
                  />
                ))}
              </div>
            </div>

            {/* Sign Plate */}
            <div className="px-4 py-1.5 bg-[#e0d3be] border-b border-[#c2b29b] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-[#2d6a4f]" />
                <span className="text-xs font-bold font-mono tracking-wider text-[#1b4332] uppercase">
                  {name}
                </span>
              </div>
              <span className="text-[9px] font-mono text-[#52796f] uppercase font-semibold">
                STUDENT COMMONS
              </span>
            </div>

            {/* Large Glass Cafe Windows */}
            <div className="flex-1 px-4 py-2 flex items-center justify-around">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-14 h-12 rounded bg-[#bae6fd]/70 border-2 border-[#475569] shadow-inner relative flex items-center justify-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-white/20" />
                  <div className="w-full h-[1px] bg-[#64748b]" />
                </div>
              ))}
            </div>

            {/* Cafe Entrance Glass Double Doors */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-13 bg-[#334155] border-t-2 border-x-2 border-[#1e293b] rounded-t flex items-center justify-around px-1 shadow-lg">
              <div className="w-6 h-10 bg-[#e0f2fe]/80 border border-[#64748b] rounded-sm flex items-center justify-end pr-0.5">
                <div className="w-1 h-3 bg-amber-400 rounded-full" />
              </div>
              <div className="w-6 h-10 bg-[#e0f2fe]/80 border border-[#64748b] rounded-sm flex items-center justify-start pl-0.5">
                <div className="w-1 h-3 bg-amber-400 rounded-full" />
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. ENGINEERING LAB (Modern Slate Blue & Clean Brick Lab)  */}
        {/* ======================================================== */}
        {isEngineering && (
          <div className="w-full h-full flex flex-col bg-[#d8e0e8] border-2 border-[#64748b]">
            {/* Industrial Slate Roof with Solar Panels and AC Vents */}
            <div className="h-16 w-full bg-[#1e293b] relative overflow-hidden border-b-4 border-[#0f172a] shadow-md flex items-center justify-around px-4">
              {/* Solar array */}
              <div className="w-16 h-8 bg-[#0f172a] border-2 border-[#0284c7] rounded grid grid-cols-3 gap-0.5 p-0.5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-sky-600/70 rounded-xs" />
                ))}
              </div>
              {/* AC Exhaust fan */}
              <div className="w-8 h-8 rounded-full bg-[#334155] border-2 border-[#475569] flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-[#0f172a] animate-spin" style={{ animationDuration: '4s' }} />
              </div>
            </div>

            {/* Facade & Sign */}
            <div className="px-4 py-1.5 bg-[#c2ccd6] border-b border-[#94a3b8] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-[#0284c7]" />
                <span className="text-xs font-bold font-mono tracking-wider text-[#0f172a] uppercase">
                  {name}
                </span>
              </div>
              <span className="text-[9px] font-mono text-[#475569] uppercase font-semibold">
                HARDWARE & CAD LAB
              </span>
            </div>

            {/* Industrial Windows */}
            <div className="flex-1 px-4 py-2 flex items-center justify-around">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 bg-[#38bdf8]/30 border-2 border-[#334155] rounded shadow-inner relative flex flex-col justify-between p-1"
                >
                  <div className="w-full h-1 bg-cyan-400/50" />
                  <div className="w-2 h-2 rounded-full bg-emerald-400/80 self-end" />
                </div>
              ))}
            </div>

            {/* Reinforced Secure Doorway with Keycard Scanner */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-14 bg-[#1e293b] border-t-2 border-x-2 border-[#0f172a] rounded-t flex items-center justify-between px-2 shadow-lg">
              <div className="w-8 h-10 bg-[#334155] border border-[#475569] flex flex-col items-center justify-center">
                <Wrench className="h-3 w-3 text-cyan-300" />
              </div>
              {/* Keycard panel */}
              <div className="w-3 h-5 bg-black border border-cyan-400 flex flex-col items-center justify-around py-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. SECOPS DESK (Security Brick & SOC Communications Roof) */}
        {/* ======================================================== */}
        {isSecOps && (
          <div className="w-full h-full flex flex-col bg-[#e2d5ce] border-2 border-[#804f44]">
            {/* Dark Iron Roof with Satellite Dish and Red Security Beacon */}
            <div className="h-16 w-full bg-[#2d1b18] relative overflow-hidden border-b-4 border-[#1a0e0c] shadow-md flex items-center justify-between px-6">
              {/* Security Badge Sign on roof */}
              <div className="flex items-center gap-1.5 bg-[#7f1d1d] px-2.5 py-1 rounded border border-[#b91c1c] text-white text-[10px] font-mono font-bold shadow">
                <Shield className="h-3.5 w-3.5 text-amber-300" />
                <span>CAMPUS SECOPS</span>
              </div>
              {/* Satellite Dish Antenna */}
              <div className="relative flex items-center">
                <div className="w-8 h-8 rounded-full border-2 border-[#94a3b8] bg-[#475569] -rotate-45 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                </div>
              </div>
            </div>

            {/* Facade & Sign */}
            <div className="px-4 py-1.5 bg-[#cca99e] border-b border-[#ad8579] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-[#991b1b]" />
                <span className="text-xs font-bold font-mono tracking-wider text-[#450a0a] uppercase">
                  {name}
                </span>
              </div>
              <span className="text-[9px] font-mono text-[#7f1d1d] uppercase font-semibold">
                SECURITY OPERATIONS DESK
              </span>
            </div>

            {/* Monitoring Windows */}
            <div className="flex-1 px-4 py-2 flex items-center justify-around">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 bg-[#0284c7]/30 border-2 border-[#450a0a] rounded shadow-inner relative flex flex-col justify-between p-1"
                >
                  <div className="w-full h-1 bg-cyan-400" />
                  <div className="text-[7px] font-mono text-cyan-300">CCTV</div>
                </div>
              ))}
            </div>

            {/* Heavy Reinforced Security Entrance */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-14 bg-[#450a0a] border-t-2 border-x-2 border-[#1c0404] rounded-t flex items-center justify-around px-2 shadow-lg">
              <div className="w-10 h-10 bg-[#1c0404] border border-[#7f1d1d] flex items-center justify-center">
                <Shield className="h-4 w-4 text-amber-400" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const EnvironmentalProp: React.FC<{ prop: WorldProp }> = ({ prop }) => {
  const { type, x, y, label } = prop;

  return (
    <div
      id={`prop-${prop.id}`}
      className="absolute select-none pointer-events-none z-15"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -70%)',
      }}
    >
      {/* 1. LUSH LAYERED GREEN OAK TREE */}
      {type === 'tree' && (
        <div className="relative flex flex-col items-center">
          {/* Ground Soft Shadow */}
          <div className="w-12 h-4 bg-black/35 rounded-full blur-[1.5px] absolute bottom-0 translate-y-1/2" />
          {/* Canopy (Layered vibrant green foliage) */}
          <div className="relative flex flex-col items-center">
            {/* Top crown */}
            <div className="w-10 h-10 rounded-full bg-[#2d6a4f] border border-[#1b4332] shadow-md" />
            {/* Middle fullness */}
            <div className="w-14 h-12 rounded-full bg-[#40916c] border border-[#2d6a4f] -mt-7 shadow" />
            {/* Base canopy */}
            <div className="w-16 h-12 rounded-full bg-[#52b788] border border-[#40916c] -mt-8 flex items-center justify-around px-2">
              <div className="w-3 h-3 rounded-full bg-[#74c69d]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#74c69d]/80" />
            </div>
          </div>
          {/* Sturdy Wood Trunk */}
          <div className="w-3.5 h-6 bg-[#543821] border-x border-[#3b2312] -mt-1 rounded-b" />
        </div>
      )}

      {/* 2. CAST IRON STREET LAMP WITH WARM GOLDEN GLOW */}
      {type === 'lamp' && (
        <div className="relative flex flex-col items-center">
          {/* Light pool on ground */}
          <div className="w-16 h-16 rounded-full bg-amber-300/20 blur-md absolute top-10 pointer-events-none" />
          {/* Lantern Top */}
          <div className="w-4 h-2 bg-[#1e293b] rounded-t-sm" />
          {/* Glass Lantern with warm glowing light */}
          <div className="w-5 h-6 rounded bg-[#fef08a] border border-[#78350f] shadow-[0_0_10px_rgba(251,191,36,0.6)] flex items-center justify-center">
            <div className="w-2 h-3 bg-amber-500 rounded-full animate-pulse" />
          </div>
          {/* Lamp Post */}
          <div className="w-1.5 h-12 bg-[#1e293b] border-x border-[#0f172a]" />
          {/* Base */}
          <div className="w-4 h-2 bg-[#0f172a] rounded-t" />
        </div>
      )}

      {/* 3. WOODEN PARK BENCH */}
      {type === 'bench' && (
        <div className="relative flex flex-col items-center">
          <div className="w-10 h-4 bg-[#78350f] border border-[#451a03] rounded-sm shadow-md flex flex-col justify-around p-0.5">
            <div className="w-full h-0.5 bg-[#b45309]" />
            <div className="w-full h-0.5 bg-[#b45309]" />
          </div>
          {/* Cast iron legs */}
          <div className="flex justify-between w-8 px-1">
            <div className="w-1 h-2 bg-[#1e293b]" />
            <div className="w-1 h-2 bg-[#1e293b]" />
          </div>
          <div className="w-9 h-1 bg-black/30 rounded-full blur-[1px]" />
        </div>
      )}

      {/* 4. WI-FI POLE WITH SIGNAL WAVE */}
      {type === 'wifi' && (
        <div className="relative flex flex-col items-center">
          <div className="w-6 h-6 rounded-full bg-[#0284c7] border-2 border-white shadow-md flex items-center justify-center">
            <Wifi className="h-3.5 w-3.5 text-white animate-pulse" />
          </div>
          {/* Radio Waves */}
          <div className="absolute -top-1 w-10 h-10 rounded-full border border-sky-400/40 animate-ping pointer-events-none" />
          {/* Pole */}
          <div className="w-1.5 h-10 bg-[#475569] border-x border-[#334155]" />
          <div className="w-5 h-2 bg-[#334155] rounded-t" />
          {label && (
            <span className="text-[8px] font-mono font-bold text-sky-800 bg-white/90 px-1 rounded shadow -mt-2">
              {label}
            </span>
          )}
        </div>
      )}

      {/* 5. WOODEN CAMPUS NOTICE BOARD */}
      {type === 'sign' && (
        <div className="relative flex flex-col items-center">
          <div className="px-2 py-1 rounded bg-[#b45309] border-2 border-[#78350f] shadow-md flex flex-col items-center">
            <span className="text-[8px] font-mono font-bold text-amber-100 tracking-wider">
              {label || 'CAMPUS DIRECTORY'}
            </span>
            <div className="flex gap-1 mt-0.5">
              <div className="w-2 h-2 bg-yellow-200 shadow" />
              <div className="w-2 h-2 bg-sky-200 shadow" />
              <div className="w-2 h-2 bg-rose-200 shadow" />
            </div>
          </div>
          <div className="flex justify-between w-6">
            <div className="w-1 h-5 bg-[#543821]" />
            <div className="w-1 h-5 bg-[#543821]" />
          </div>
        </div>
      )}

      {/* 6. VENDING MACHINE */}
      {type === 'vending' && (
        <div className="relative flex flex-col items-center">
          <div className="w-8 h-12 rounded bg-[#dc2626] border-2 border-[#991b1b] shadow-md p-1 flex flex-col justify-between">
            <div className="w-full h-5 bg-sky-200 border border-slate-700 flex flex-wrap gap-0.5 p-0.5">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-xs" />
              <div className="w-1.5 h-1.5 bg-green-500 rounded-xs" />
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-xs" />
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-xs" />
          </div>
          <div className="w-7 h-1 bg-black/40 rounded-full blur-[1px]" />
        </div>
      )}

      {/* 7. BICYCLE RACK */}
      {type === 'bike' && (
        <div className="relative flex flex-col items-center">
          <div className="w-12 h-6 border-t-2 border-slate-500 flex justify-around items-end">
            <div className="w-1 h-5 bg-slate-600" />
            <div className="w-1 h-5 bg-slate-600" />
            <div className="w-1 h-5 bg-slate-600" />
          </div>
          <div className="w-11 h-1 bg-black/30 rounded-full blur-[1px]" />
        </div>
      )}

      {/* 8. FLOWERBED PLANTER */}
      {type === 'planter' && (
        <div className="relative flex flex-col items-center">
          <div className="w-12 h-5 bg-[#78350f] border-2 border-[#451a03] rounded-md shadow-md flex items-center justify-around px-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 shadow-sm" />
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-sm" />
            <span className="w-2 h-2 rounded-full bg-sky-400 shadow-sm" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm" />
          </div>
          <div className="w-11 h-1 bg-black/30 rounded-full blur-[1px]" />
        </div>
      )}

      {/* 9. DESK / LAB RIG */}
      {type === 'desk' && (
        <div className="relative flex flex-col items-center">
          <div className="w-14 h-7 bg-[#334155] border-2 border-[#1e293b] rounded shadow-md flex items-center justify-between px-1.5">
            <div className="w-4 h-3 bg-cyan-900 border border-cyan-500/70 rounded-xs" />
            <div className="w-3 h-2 bg-slate-700 rounded-xs" />
          </div>
          <div className="flex justify-between w-12 px-1">
            <div className="w-1 h-3 bg-[#1e293b]" />
            <div className="w-1 h-3 bg-[#1e293b]" />
          </div>
          <div className="w-13 h-1 bg-black/35 rounded-full blur-[1px]" />
        </div>
      )}

      {/* 10. CAMPUS TERMINAL */}
      {type === 'terminal' && (
        <div className="relative flex flex-col items-center">
          <div className="w-8 h-8 rounded bg-[#0f172a] border-2 border-[#38bdf8] shadow-md flex flex-col items-center justify-center p-1">
            <div className="w-5 h-3 bg-sky-500/30 rounded-xs border border-sky-400/50 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
            </div>
          </div>
          <div className="w-3 h-3 bg-[#334155]" />
          <div className="w-6 h-1.5 bg-[#1e293b] rounded-t-sm" />
          <div className="w-7 h-1 bg-black/35 rounded-full blur-[1px]" />
        </div>
      )}
    </div>
  );
};
