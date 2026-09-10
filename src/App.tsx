import React, { useState, useEffect } from 'react';
import {
  PlayerState,
  LocationId,
  EvidenceItem,
  TrustChangeRecord,
} from './types';
import { WORLD_LOCATIONS } from './data/locations';
import { MISSIONS } from './data/missions';
import {
  loadSavedPlayerState,
  savePlayerState,
  resetPlayerState,
} from './data/initialState';
import { GameHeader } from './components/GameHeader';
import { LandingIntro } from './components/LandingIntro';
import { WorldMap } from './components/WorldMap';
import { LocationView } from './components/LocationView';
import { MissionWorkspace } from './components/MissionWorkspace';
import { EvidenceNotebook } from './components/EvidenceNotebook';
import { AbilityPanel } from './components/AbilityPanel';
import { ProfileModal } from './components/ProfileModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { ScenarioOpsView } from './components/scenarios/ScenarioOpsView';
import {
  setAudioMuted,
  getAudioMuted,
  playClickSound,
  playInspectSound,
  playSuccessSound,
  playWarningSound,
} from './utils/audio';

export default function App() {
  const [player, setPlayer] = useState<PlayerState>(() => loadSavedPlayerState());
  const [currentTab, setCurrentTab] = useState<
    'home' | 'world' | 'location' | 'mission' | 'abilities' | 'evidence' | 'profile' | 'scenario-ops'
  >('location');
  const [selectedLocationId, setSelectedLocationId] = useState<LocationId>('campus');
  const [activeMissionId, setActiveMissionId] = useState<string>('mission-01-email');
  const [soundMuted, setSoundMuted] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  // Save state whenever player state changes
  useEffect(() => {
    savePlayerState(player);
  }, [player]);

  const handleToggleSound = () => {
    const nextState = !soundMuted;
    setSoundMuted(nextState);
    setAudioMuted(nextState);
  };

  const handleRecordTrustChange = (delta: number, reason: string) => {
    setPlayer((prev) => {
      const newScore = Math.max(0, Math.min(100, prev.digitalTrust + delta));
      const record: TrustChangeRecord = {
        id: `trust-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp: Date.now(),
        delta,
        reason,
        newScore,
      };

      // Check achievement unlocked: "Certified Operative" if trust >= 25
      let updatedAchievements = [...prev.achievements];
      if (newScore >= 25) {
        updatedAchievements = updatedAchievements.map((ach) =>
          ach.id === 'ach-digital-trust-master' ? { ...ach, unlocked: true } : ach
        );
      }

      return {
        ...prev,
        digitalTrust: newScore,
        trustHistory: [record, ...prev.trustHistory],
        achievements: updatedAchievements,
      };
    });
  };

  const handleUnlockAbility = (abilityId: string) => {
    setPlayer((prev) => ({
      ...prev,
      abilities: prev.abilities.map((a) =>
        a.id === abilityId ? { ...a, unlocked: true } : a
      ),
    }));
  };

  const handleCompleteMission = (missionId: string) => {
    setPlayer((prev) => {
      if (prev.completedMissions.includes(missionId)) return prev;

      // Update achievements
      const updatedAchievements = prev.achievements.map((ach) => {
        if (ach.id === 'ach-first-step') return { ...ach, unlocked: true };
        if (missionId === 'mission-01-email' && ach.id === 'ach-phish-disarmed')
          return { ...ach, unlocked: true };
        if (missionId === 'mission-02-usb' && ach.id === 'ach-hardware-defender')
          return { ...ach, unlocked: true };
        return ach;
      });

      return {
        ...prev,
        completedMissions: [...prev.completedMissions, missionId],
        achievements: updatedAchievements,
        level: Math.min(5, Math.floor(prev.completedMissions.length / 1) + 1),
      };
    });
  };

  const handleAddEvidence = (item: EvidenceItem) => {
    setPlayer((prev) => {
      if (prev.evidence.some((e) => e.title === item.title)) return prev;
      const updatedEvidence = [item, ...prev.evidence];

      let updatedAchievements = [...prev.achievements];
      if (updatedEvidence.length >= 3) {
        updatedAchievements = updatedAchievements.map((ach) =>
          ach.id === 'ach-evidence-collector' ? { ...ach, unlocked: true } : ach
        );
      }

      return {
        ...prev,
        evidence: updatedEvidence,
        achievements: updatedAchievements,
      };
    });
  };

  const handleResetProgress = () => {
    const fresh = resetPlayerState();
    setPlayer(fresh);
    setCurrentTab('home');
    setSelectedLocationId('campus');
    setActiveMissionId('mission-01-email');
  };

  const handleSelectLocation = (locId: LocationId) => {
    setSelectedLocationId(locId);
    setPlayer((prev) => ({ ...prev, currentLocationId: locId }));
    setCurrentTab('location');
  };

  const handleSelectMission = (missionId: string) => {
    setActiveMissionId(missionId);
    setCurrentTab('mission');
  };

  const currentMission = MISSIONS[activeMissionId] || MISSIONS['mission-01-email'];
  const currentLocation =
    WORLD_LOCATIONS.find((l) => l.id === selectedLocationId) || WORLD_LOCATIONS[0];

  return (
    <div
      id="cybermentor-app-root"
      className="min-h-screen bg-[#0a0c10] text-[#e6edf3] font-sans selection:bg-[#1f3554] selection:text-[#79c0ff]"
    >
      {/* Top Universal Operative HUD */}
      <GameHeader
        player={player}
        activeTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'world') {
            setCurrentTab('world');
          } else {
            setCurrentTab(tab);
          }
        }}
        soundMuted={soundMuted}
        onToggleSound={handleToggleSound}
        onOpenHelp={() => setIsHelpOpen(true)}
        onResetProgress={handleResetProgress}
      />

      {/* Main Content Area */}
      <main className="min-h-[calc(100vh-68px)]">
        {currentTab === 'home' && (
          <LandingIntro
            player={player}
            nextMission={currentMission}
            onStartAdventure={() => {
              // Enter Campus sector 2D exploration world
              handleSelectLocation('campus');
            }}
            onOpenScenarioOps={() => setCurrentTab('scenario-ops')}
            onOpenHowItWorks={() => setIsHelpOpen(true)}
            onNavigate={(tab) => setCurrentTab(tab)}
          />
        )}

        {currentTab === 'scenario-ops' && (
          <ScenarioOpsView
            onExitToHome={() => setCurrentTab('home')}
            onEnterRPG={() => handleSelectLocation('campus')}
          />
        )}

        {currentTab === 'world' && (
          <WorldMap
            locations={WORLD_LOCATIONS}
            player={player}
            onSelectLocation={handleSelectLocation}
            onSelectMission={handleSelectMission}
          />
        )}

        {currentTab === 'location' && (
          <LocationView
            location={currentLocation}
            player={player}
            onBackToWorld={() => setCurrentTab('world')}
            onSelectMission={handleSelectMission}
            onNavigateTab={(tab) => setCurrentTab(tab)}
          />
        )}

        {currentTab === 'mission' && (
          <MissionWorkspace
            mission={currentMission}
            player={player}
            onExitMission={() => {
              setCurrentTab('location');
            }}
            onRecordTrustChange={handleRecordTrustChange}
            onUnlockAbility={handleUnlockAbility}
            onCompleteMission={handleCompleteMission}
            onAddEvidence={handleAddEvidence}
            onProceedNextMission={(nextId) => {
              setActiveMissionId(nextId);
              setCurrentTab('mission');
            }}
          />
        )}

        {currentTab === 'abilities' && <AbilityPanel player={player} />}

        {currentTab === 'evidence' && (
          <EvidenceNotebook
            player={player}
            onSelectMission={(mid) => {
              setActiveMissionId(mid);
              setCurrentTab('mission');
            }}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileModal
            player={player}
            onResetProgress={handleResetProgress}
          />
        )}
      </main>

      {/* Educational Philosophy & How It Works Modal */}
      {isHelpOpen && <HowItWorksModal onClose={() => setIsHelpOpen(false)} />}
    </div>
  );
}
