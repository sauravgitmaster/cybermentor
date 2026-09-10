import React, { useState } from 'react';
import {
  Radio,
  Lock,
  CheckCircle2,
  ArrowRight,
  Shield,
  Building2,
  Home,
  Laptop,
  Globe,
  School,
} from 'lucide-react';
import { WorldLocation, LocationId, PlayerState } from '../types';
import { MISSIONS } from '../data/missions';
import { playClickSound, playInspectSound } from '../utils/audio';

interface WorldMapProps {
  locations: WorldLocation[];
  player: PlayerState;
  onSelectLocation: (locationId: LocationId) => void;
  onSelectMission: (missionId: string) => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  locations,
  player,
  onSelectLocation,
  onSelectMission,
}) => {
  const [hoveredLocationId, setHoveredLocationId] = useState<LocationId>(
    player.currentLocationId || 'campus'
  );

  const activeLocation =
    locations.find((l) => l.id === hoveredLocationId) || locations[0];

  const getLocationIcon = (id: LocationId) => {
    switch (id) {
      case 'campus':
        return <School className="h-4 w-4" />;
      case 'digital-city':
        return <Laptop className="h-4 w-4" />;
      case 'home':
        return <Home className="h-4 w-4" />;
      case 'cybercorp':
        return <Building2 className="h-4 w-4" />;
      case 'the-internet':
        return <Globe className="h-4 w-4" />;
      default:
        return <School className="h-4 w-4" />;
    }
  };

  const isLocationUnlocked = (location: WorldLocation) => {
    return player.digitalTrust >= location.requiredTrust;
  };

  const getLocationMissionStats = (location: WorldLocation) => {
    const locMissions = Object.values(MISSIONS).filter(
      (m) => m.locationId === location.id
    );
    const total = locMissions.length;
    const completed = locMissions.filter((m) =>
      player.completedMissions.includes(m.id)
    ).length;
    return { total, completed };
  };

  return (
    <div id="cyber-world-map-view" className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
      {/* Topology Header: Technical, Compact */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#21262d] pb-3 mb-5">
        <div className="flex items-baseline gap-3">
          <span className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase">
            TOPOLOGY //
          </span>
          <h2 className="text-base sm:text-lg font-mono font-bold text-slate-100 uppercase tracking-wide">
            Network Infrastructure Map
          </h2>
          <span className="hidden md:inline text-xs font-mono text-slate-400">
            [5 SECTORS DISCOVERED]
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span>CLEARANCE: TRUST {player.digitalTrust.toString().padStart(3, '0')}/100</span>
          <span className="text-slate-400">|</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            GRID SYNCHRONIZED
          </span>
        </div>
      </div>

      {/* Main Map View Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Network Topology Matrix Canvas */}
        <div className="lg:col-span-8 border border-[#21262d] bg-[#0d1117] p-5 sm:p-7 relative min-h-[460px] flex flex-col justify-between overflow-hidden">
          {/* Subtle technical grid background */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #30363d 1px, transparent 1px), linear-gradient(to bottom, #30363d 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* SVG Vector Pathways between Sectors */}
          <svg className="absolute inset-0 h-full w-full pointer-events-none z-0">
            {/* Campus -> Digital City */}
            <line
              x1="20%"
              y1="50%"
              x2="50%"
              y2="50%"
              stroke={player.digitalTrust >= 15 ? '#38bdf8' : '#21262d'}
              strokeWidth="1.5"
              strokeDasharray={player.digitalTrust >= 15 ? 'none' : '3 3'}
            />
            {/* Digital City -> Home */}
            <line
              x1="50%"
              y1="50%"
              x2="80%"
              y2="50%"
              stroke={player.digitalTrust >= 25 ? '#38bdf8' : '#21262d'}
              strokeWidth="1.5"
              strokeDasharray={player.digitalTrust >= 25 ? 'none' : '3 3'}
            />
            {/* Digital City -> CyberCorp */}
            <line
              x1="50%"
              y1="50%"
              x2="50%"
              y2="20%"
              stroke={player.digitalTrust >= 45 ? '#38bdf8' : '#21262d'}
              strokeWidth="1.5"
              strokeDasharray={player.digitalTrust >= 45 ? 'none' : '3 3'}
            />
            {/* Digital City -> The Internet */}
            <line
              x1="50%"
              y1="50%"
              x2="50%"
              y2="80%"
              stroke={player.digitalTrust >= 70 ? '#38bdf8' : '#21262d'}
              strokeWidth="1.5"
              strokeDasharray={player.digitalTrust >= 70 ? 'none' : '3 3'}
            />
          </svg>

          {/* World Nodes Container */}
          <div className="relative z-10 w-full h-[380px] flex items-center justify-center">
            {locations.map((loc) => {
              const unlocked = isLocationUnlocked(loc);
              const isCurrent = player.currentLocationId === loc.id;
              const isHovered = hoveredLocationId === loc.id;
              const { total, completed } = getLocationMissionStats(loc);

              return (
                <div
                  key={loc.id}
                  style={{
                    position: 'absolute',
                    left: `${loc.gridPos.x}%`,
                    top: `${loc.gridPos.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className="group"
                >
                  <button
                    id={`location-node-${loc.id}`}
                    onClick={() => {
                      playClickSound();
                      if (unlocked) {
                        onSelectLocation(loc.id);
                      } else {
                        setHoveredLocationId(loc.id);
                      }
                    }}
                    onMouseEnter={() => {
                      playInspectSound();
                      setHoveredLocationId(loc.id);
                    }}
                    className={`relative flex flex-col items-center px-3.5 py-2.5 border transition-all text-center focus:outline-none ${
                      unlocked
                        ? isHovered
                          ? 'border-cyan-400 bg-[#161b22] text-slate-100'
                          : isCurrent
                          ? 'border-cyan-600 bg-[#161b22]/90'
                          : 'border-[#30363d] bg-[#11141a] hover:border-[#8b949e]'
                        : 'border-[#21262d] bg-[#0a0c10] opacity-50 hover:opacity-75'
                    }`}
                  >
                    {/* Active player indicator beacon */}
                    {isCurrent && (
                      <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex h-2 w-2">
                        <span className="relative inline-flex rounded-none h-2 w-2 bg-cyan-400" />
                      </span>
                    )}

                    {/* Sector Icon with State */}
                    <div
                      className={`h-8 w-8 flex items-center justify-center mb-1 transition-colors ${
                        unlocked
                          ? isHovered
                            ? 'bg-cyan-400 text-slate-950'
                            : 'bg-[#161b22] text-cyan-400 border border-[#30363d]'
                          : 'bg-[#0d1117] text-slate-400 border border-[#21262d]'
                      }`}
                    >
                      {unlocked ? getLocationIcon(loc.id) : <Lock className="h-3.5 w-3.5 text-slate-400" />}
                    </div>

                    {/* Sector Name */}
                    <div className="text-[11px] font-mono font-bold tracking-wider text-slate-200 uppercase">
                      {loc.name}
                    </div>

                    {/* Status Pill */}
                    <div className="mt-0.5 text-[10px] font-mono">
                      {unlocked ? (
                        completed >= total && total > 0 ? (
                          <span className="text-emerald-400">
                            [SECURED]
                          </span>
                        ) : (
                          <span className="text-cyan-400">
                            [{completed}/{total} OPS]
                          </span>
                        )
                      ) : (
                        <span className="text-slate-400">
                          [REQ: {loc.requiredTrust}]
                        </span>
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Map Footer Legend */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#21262d] text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 bg-cyan-400" /> ACTIVE NODE
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 bg-[#8b949e]" /> ACCESSIBLE
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 bg-[#30363d]" /> RESTRICTED
              </span>
            </div>
            <div>LOC_ID: {activeLocation.id.toUpperCase()}</div>
          </div>
        </div>

        {/* Selected Sector Intel & Mission Access Drawer */}
        <div className="lg:col-span-4 border border-[#21262d] bg-[#0d1117] p-4 sm:p-5 flex flex-col justify-between min-h-[460px]">
          <div>
            {/* Sector Meta Header */}
            <div className="flex items-start justify-between pb-3 border-b border-[#21262d] mb-4">
              <div>
                <div className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider">
                  SECTOR DOSSIER
                </div>
                <h3 className="text-base font-mono font-bold text-slate-100 uppercase">
                  {activeLocation.name}
                </h3>
              </div>

              {isLocationUnlocked(activeLocation) ? (
                <span className="border border-cyan-800 bg-cyan-950/40 px-2 py-0.5 text-[10px] font-mono text-cyan-400">
                  ONLINE
                </span>
              ) : (
                <span className="border border-[#30363d] bg-[#161b22] px-2 py-0.5 text-[10px] font-mono text-slate-400">
                  LOCKED
                </span>
              )}
            </div>

            <div className="space-y-3 mb-5 font-mono text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">NETWORK PROFILE</span>
                <span className="text-slate-300 font-sans text-xs">{activeLocation.ambientTone}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase block">BRIEFING</span>
                <p className="text-xs text-slate-400 font-sans leading-relaxed mt-0.5">
                  {activeLocation.description}
                </p>
              </div>

              {!isLocationUnlocked(activeLocation) && (
                <div className="border border-amber-800/60 bg-amber-950/20 p-2.5 text-xs text-amber-300 font-mono">
                  <div className="font-semibold flex items-center gap-1.5 mb-1">
                    <Shield className="h-3.5 w-3.5 text-amber-400" /> ACCESS RESTRICTED
                  </div>
                  <p className="text-[11px] text-amber-200/80 font-sans">
                    Requires Digital Trust of <strong>{activeLocation.requiredTrust}</strong>. Currently at{' '}
                    <strong>{player.digitalTrust}</strong>. Complete active threats in{' '}
                    <strong>CAMPUS</strong> to build trust.
                  </p>
                </div>
              )}
            </div>

            {/* Active missions in this sector */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between border-b border-[#21262d] pb-1">
                <span>SECTOR OPERATIONS</span>
                <span className="text-cyan-400 font-semibold">
                  {
                    Object.values(MISSIONS).filter(
                      (m) => m.locationId === activeLocation.id
                    ).length
                  }{' '}
                  ACTIVE
                </span>
              </div>

              <div className="space-y-1.5">
                {Object.values(MISSIONS)
                  .filter((m) => m.locationId === activeLocation.id)
                  .map((m) => {
                    const isCompleted = player.completedMissions.includes(m.id);
                    const canPlay =
                      isLocationUnlocked(activeLocation) &&
                      player.digitalTrust >= m.requiredTrust;

                    return (
                      <div
                        key={m.id}
                        className={`group flex items-center justify-between border p-2 font-mono transition-colors ${
                          isCompleted
                            ? 'border-emerald-900/60 bg-emerald-950/10'
                            : canPlay
                            ? 'border-[#30363d] bg-[#161b22] hover:border-cyan-500 cursor-pointer'
                            : 'border-[#21262d] bg-[#0a0c10] opacity-50'
                        }`}
                        onClick={() => {
                          if (canPlay) {
                            playClickSound();
                            onSelectMission(m.id);
                          }
                        }}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-cyan-400 font-bold">
                              {m.code}
                            </span>
                            <span className="text-xs font-sans font-semibold text-slate-200 truncate">
                              {m.title}
                            </span>
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 truncate">
                            {m.concept}
                          </div>
                        </div>

                        <div>
                          {isCompleted ? (
                            <span className="px-1.5 py-0.5 text-[9px] text-emerald-400 border border-emerald-800/40">
                              RESOLVED
                            </span>
                          ) : canPlay ? (
                            <button
                              id={`start-mission-btn-${m.id}`}
                              className="px-2 py-0.5 text-[10px] font-mono bg-cyan-500 text-slate-950 hover:bg-cyan-400 flex items-center gap-1 font-semibold"
                            >
                              <span>ENGAGE</span>
                              <ArrowRight className="h-2.5 w-2.5" />
                            </button>
                          ) : (
                            <span className="text-[9px] text-slate-400">
                              REQ {m.requiredTrust}T
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Sector Exploration Action */}
          <div className="mt-4 pt-3 border-t border-[#21262d]">
            {isLocationUnlocked(activeLocation) ? (
              <button
                id="enter-sector-hub-btn"
                onClick={() => {
                  playClickSound();
                  onSelectLocation(activeLocation.id);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#161b22] border border-[#30363d] hover:border-cyan-500 py-2 text-xs font-mono text-slate-200 hover:text-cyan-300 transition-colors uppercase"
              >
                <span>OPEN {activeLocation.name} SECTOR HUB</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <div className="text-center text-[10px] font-mono text-slate-400 py-1.5 border border-[#21262d]">
                [ACCESS DENIED: INSUFFICIENT CLEARANCE]
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

