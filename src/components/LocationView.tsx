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
    <div id="location-hub-view" className="mx-auto max-w-6xl px-4 py-4 sm:px-6 space-y-4">
      {/* Top Breadcrumb & View Toggle Navigation */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#21262d] pb-2.5 gap-2">
        <button
          id="location-back-to-world-btn"
          onClick={() => {
            playClickSound();
            onBackToWorld();
          }}
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>[TOPOLOGY]</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-200 uppercase">{location.name}</span>
        </button>

        <div className="flex items-center gap-3 text-xs font-mono">
          {/* Toggle between 2D World Exploration and Dossier Cards */}
          <div className="flex items-center border border-[#30363d] bg-[#0d1117] p-0.5">
            <button
              id="viewmode-rpg-btn"
              onClick={() => {
                playClickSound();
                setViewMode('rpg');
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono transition-colors uppercase ${
                viewMode === 'rpg'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="h-3 w-3" />
              <span>2D SECTOR WORLD</span>
            </button>
            <button
              id="viewmode-dossier-btn"
              onClick={() => {
                playClickSound();
                setViewMode('dossier');
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono transition-colors uppercase ${
                viewMode === 'dossier'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Grid className="h-3 w-3" />
              <span>DOSSIER CARDS</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
            <span>TRUST:</span>
            <span className="text-cyan-400 font-bold">{player.digitalTrust}/100</span>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: 2D RPG EXPLORATION LAYER */}
      {viewMode === 'rpg' ? (
        <div className="space-y-3 animate-in fade-in duration-200">
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
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Location Technical Banner */}
          <div className="border border-[#21262d] bg-[#0d1117] p-4 sm:p-5">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2 border border-[#30363d] bg-[#161b22] text-cyan-400">
                  {getLocationIcon(location.id)}
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                    SECTOR DISPATCH // {location.id.toUpperCase()}
                  </div>
                  <h1 className="text-lg sm:text-xl font-mono font-bold text-slate-100 uppercase mt-0.5">
                    {location.name}
                  </h1>
                  <p className="text-xs text-slate-300 font-sans mt-1 max-w-2xl leading-relaxed">
                    {location.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-baseline md:items-end justify-between border-t md:border-t-0 border-[#21262d] pt-2 md:pt-0 gap-1 font-mono">
                <span className="text-[10px] text-slate-400 uppercase">CURRENT TRUST</span>
                <span className="text-base font-bold text-cyan-400">
                  {player.digitalTrust.toString().padStart(3, '0')} / 100
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
                    className={`border flex flex-col justify-between p-4 transition-colors font-mono ${
                      isCompleted
                        ? 'border-emerald-900/60 bg-[#0c1315]'
                        : isAccessible
                        ? 'border-[#30363d] bg-[#0d1117] hover:border-cyan-500'
                        : 'border-[#21262d] bg-[#0a0c10] opacity-50'
                    }`}
                  >
                    <div>
                      {/* Mission Code & Status */}
                      <div className="flex items-center justify-between border-b border-[#21262d] pb-2 mb-3">
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

