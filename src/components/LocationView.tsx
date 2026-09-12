import React, { useState } from 'react';
import {
  ArrowLeft,
  Users,
  Shield,
  CheckCircle2,
  Play,
  School,
  Laptop,
  Home,
  Building2,
  Globe,
  Grid,
  MapPin,
  Compass,
} from 'lucide-react';
import { WorldLocation, LocationId, PlayerState } from '../types';
import { MISSIONS } from '../data/missions';
import { WorldScene } from './world/WorldScene';
import { playClickSound } from '../utils/audio';

interface LocationViewProps {
  location: WorldLocation;
  player: PlayerState;
  onBackToWorld: () => void;
  onSelectMission: (missionId: string) => void;
  onNavigateTab: (tab: 'world' | 'abilities' | 'evidence' | 'profile') => void;
}

export const LocationView: React.FC<LocationViewProps> = ({
  location,
  player,
  onBackToWorld,
  onSelectMission,
  onNavigateTab,
}) => {
  const [viewMode, setViewMode] = useState<'rpg' | 'dossier'>('rpg');

  const missionsInLocation = Object.values(MISSIONS).filter(
    (m) => m.locationId === location.id
  );

  const getLocationIcon = (id: LocationId) => {
    switch (id) {
      case 'campus':
        return <School className="h-5 w-5" />;
      case 'digital-city':
        return <Laptop className="h-5 w-5" />;
      case 'home':
        return <Home className="h-5 w-5" />;
      case 'cybercorp':
        return <Building2 className="h-5 w-5" />;
      case 'the-internet':
        return <Globe className="h-5 w-5" />;
      default:
        return <School className="h-5 w-5" />;
    }
  };

  return (
    <div
      id="location-hub-view"
      className="w-full min-h-[calc(100vh-62px)] flex flex-col items-center justify-center py-4 px-3 sm:py-8 sm:px-6 bg-[#090e17] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#132034] via-[#0b121e] to-[#070a10]"
    >
      {/* VIEW MODE 1: 2D RPG EXPLORATION LAYER (Spacious central game screen) */}
      {viewMode === 'rpg' ? (
        <div className="w-full max-w-5xl flex flex-col items-center animate-in fade-in duration-300">
          {/* Explorable 2D RPG World Scene */}
          <WorldScene
            location={location}
            player={player}
            onBackToWorld={onBackToWorld}
            onSelectMission={onSelectMission}
            onNavigateTab={onNavigateTab}
            onToggleTacticalView={() => setViewMode('dossier')}
          />
        </div>
      ) : (
        /* VIEW MODE 2: CLASSIC DOSSIER LIST */
        <div className="w-full max-w-5xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2">
            <button
              onClick={() => {
                playClickSound();
                setViewMode('rpg');
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-[#3b5175] bg-[#16233b] hover:bg-[#20324f] text-slate-200 text-xs font-semibold cursor-pointer transition-colors"
            >
              <Compass className="h-4 w-4 text-amber-400" />
              <span>RETURN TO 2D RPG WORLD</span>
            </button>
          </div>

          {/* Location Technical Banner */}
          <div className="rounded-2xl border-2 border-[#2b4063] bg-[#0d1624] p-5 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl border border-[#304566] bg-[#17253b] text-cyan-400">
                  {getLocationIcon(location.id)}
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                    SECTOR DISPATCH // {location.id.toUpperCase()}
                  </div>
                  <h1 className="text-xl font-mono font-bold text-slate-100 uppercase mt-0.5">
                    {location.name}
                  </h1>
                  <p className="text-xs text-slate-300 font-sans mt-1 max-w-2xl leading-relaxed">
                    {location.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-baseline md:items-end justify-between border-t md:border-t-0 border-[#21262d] pt-2 md:pt-0 gap-1 font-mono">
                <span className="text-[10px] text-slate-400 uppercase">CURRENT TRUST</span>
                <span className="text-lg font-bold text-amber-300">
                  🛡️ {player.digitalTrust.toString().padStart(3, '0')} / 100
                </span>
              </div>
            </div>
          </div>

          {/* Active Missions in this Location */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#21262d] pb-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 uppercase tracking-wide">
                <Shield className="h-3.5 w-3.5 text-cyan-400" />
                <span>AVAILABLE OPERATIONS ({missionsInLocation.length})</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {missionsInLocation.filter((m) => player.completedMissions.includes(m.id)).length} of{' '}
                {missionsInLocation.length} Resolved
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {missionsInLocation.map((mission) => {
                const isCompleted = player.completedMissions.includes(mission.id);
                const isAccessible = player.digitalTrust >= mission.requiredTrust;

                return (
                  <div
                    key={mission.id}
                    id={`mission-card-${mission.id}`}
                    className={`rounded-xl border-2 flex flex-col justify-between p-4 transition-colors font-mono shadow-md ${
                      isCompleted
                        ? 'border-emerald-900/60 bg-[#0c1619]'
                        : isAccessible
                        ? 'border-[#304566] bg-[#0d1726] hover:border-amber-400'
                        : 'border-[#1e2c40] bg-[#0a101a] opacity-50'
                    }`}
                  >
                    <div>
                      {/* Mission Code & Status */}
                      <div className="flex items-center justify-between border-b border-[#20324d] pb-2 mb-3">
                        <span className="text-xs font-bold text-cyan-400">
                          {mission.code}
                        </span>
                        {isCompleted ? (
                          <span className="text-[10px] text-emerald-400 border border-emerald-800/50 px-1.5 py-0.2">
                            [RESOLVED]
                          </span>
                        ) : isAccessible ? (
                          <span className="text-[10px] text-cyan-400 border border-cyan-800/50 px-1.5 py-0.2">
                            [READY]
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">
                            [REQ: {mission.requiredTrust}T]
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-sans font-bold text-slate-100 mb-1">
                        {mission.title}
                      </h3>
                      <div className="text-[11px] text-slate-400 mb-3">
                        THREAT // {mission.concept}
                      </div>

                      <p className="text-xs font-sans text-slate-300 leading-relaxed mb-4 line-clamp-3">
                        {mission.briefing.situation}
                      </p>

                      {/* In-world NPC Profile */}
                      <div className="border border-[#21262d] bg-[#161b22] p-2.5 mb-4">
                        <div className="flex items-center gap-1.5 mb-1 text-xs">
                          <Users className="h-3 w-3 text-cyan-400" />
                          <span className="font-semibold text-slate-200">
                            {mission.npc.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            ({mission.npc.role})
                          </span>
                        </div>
                        <div className="text-[11px] font-sans text-slate-300 italic">
                          "{mission.npc.status}"
                        </div>
                      </div>
                    </div>

                    <div>
                      {isAccessible ? (
                        <button
                          id={`launch-mission-btn-${mission.id}`}
                          onClick={() => {
                            playClickSound();
                            onSelectMission(mission.id);
                          }}
                          className={`w-full flex items-center justify-center gap-2 py-1.5 text-xs font-mono transition-colors uppercase font-medium ${
                            isCompleted
                              ? 'border border-[#30363d] bg-[#161b22] text-slate-300 hover:border-cyan-500'
                              : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-semibold'
                          }`}
                        >
                          <Play className="h-3 w-3 fill-current" />
                          <span>{isCompleted ? 'RE-INVESTIGATE' : 'INITIALIZE INVESTIGATION'}</span>
                        </button>
                      ) : (
                        <div className="text-center text-[10px] text-slate-400 py-1.5 border border-[#21262d]">
                          Requires {mission.requiredTrust} Digital Trust
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

