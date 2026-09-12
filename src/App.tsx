import React, { useState, useEffect } from 'react';
import {
  PlayerState,
  LocationId,
  EvidenceItem,
  TrustChangeRecord,
  Achievement,
  CyberSkillProfile,
} from './types';
import { WORLD_LOCATIONS } from './data/locations';
import { MISSIONS } from './data/missions';
import {
  loadSavedPlayerState,
  savePlayerState,
  resetPlayerState,
} from './data/initialState';
import { api } from './services/api';
import { GameHeader } from './components/GameHeader';
import { LandingIntro } from './components/LandingIntro';
import { WorldMap } from './components/WorldMap';
import { LocationView } from './components/LocationView';
import { MissionWorkspace } from './components/MissionWorkspace';
import { EvidenceNotebook } from './components/EvidenceNotebook';
import { AbilityPanel } from './components/AbilityPanel';
import { ProfileModal } from './components/ProfileModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { AchievementToast } from './components/AchievementToast';
import { SkillCheckModal } from './components/SkillCheckModal';
import { DailyChallengeModal } from './components/DailyChallengeModal';
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
  >(() => {
    try {
      const hash = window.location.hash.replace('#', '');
      if (
        hash === 'world' ||
        hash === 'location' ||
        hash === 'mission' ||
        hash === 'abilities' ||
        hash === 'evidence' ||
        hash === 'profile' ||
        hash === 'scenario-ops'
      ) {
        return hash;
      }
    } catch {}
    return 'home';
  });
  const [selectedLocationId, setSelectedLocationId] = useState<LocationId>('campus');
  const [activeMissionId, setActiveMissionId] = useState<string>('mission-01-email');
  const [soundMuted, setSoundMuted] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [activeAchievementToast, setActiveAchievementToast] = useState<Achievement | null>(null);
  const [isSkillCheckOpen, setIsSkillCheckOpen] = useState<boolean>(false);
  const [isDailyChallengeOpen, setIsDailyChallengeOpen] = useState<boolean>(false);

  // Synchronize URL hash when tab changes
  useEffect(() => {
    try {
      if (currentTab === 'home') {
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      } else {
        window.history.replaceState(null, '', `#${currentTab}`);
      }
    } catch {}
  }, [currentTab]);

  // Listen for browser back / forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      try {
        const hash = window.location.hash.replace('#', '');
        const validTabs: Array<'home' | 'world' | 'location' | 'mission' | 'abilities' | 'evidence' | 'profile' | 'scenario-ops'> = [
          'home',
          'world',
          'location',
          'mission',
          'abilities',
          'evidence',
          'profile',
          'scenario-ops',
        ];
        if (validTabs.includes(hash as any)) {
          setCurrentTab(hash as any);
        } else if (!hash) {
          setCurrentTab('home');
        }
      } catch {}
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Initialize and synchronize with backend server
  useEffect(() => {
    api.getPlayerState().then((res) => {
      if (res.online && res.operative) {
        // Sync local with server state
        api.syncPlayerState(player).then((synced) => {
          if (synced) {
            setPlayer(synced);
            savePlayerState(synced);
          }
        });
      }
    });
  }, []);

  // Save state locally whenever player state changes
  useEffect(() => {
    savePlayerState(player);
  }, [player]);

  const handleToggleSound = () => {
    const nextState = !soundMuted;
    setSoundMuted(nextState);
    setAudioMuted(nextState);
  };

  const handleRecordTrustChange = (delta: number, reason: string) => {
    // Notify backend
    api.recordTrustChange(delta, reason).catch(() => {});

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
    // Notify backend
    api.unlockAbility(abilityId).catch(() => {});

    setPlayer((prev) => ({
      ...prev,
      abilities: prev.abilities.map((a) =>
        a.id === abilityId ? { ...a, unlocked: true } : a
      ),
    }));
  };

  const handleCompleteMission = (missionId: string) => {
    // Notify backend
    api.completeMission(missionId).catch(() => {});

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
    // Notify backend
    api.addEvidence(item).catch(() => {});

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

  const handleUnlockAchievement = (achId: string) => {
    setPlayer((prev) => {
      const target = prev.achievements.find((a) => a.id === achId);
      if (!target || target.unlocked) return prev;
      const updatedAchievements = prev.achievements.map((a) =>
        a.id === achId ? { ...a, unlocked: true } : a
      );
      setActiveAchievementToast({ ...target, unlocked: true });
      return {
        ...prev,
        achievements: updatedAchievements,
      };
    });
  };

  const handleCompleteSkillCheck = (profile: CyberSkillProfile) => {
    setPlayer((prev) => ({
      ...prev,
      skillCheckCompleted: true,
      skillProfile: profile,
    }));
    setIsSkillCheckOpen(false);
  };

  const handleResetProgress = () => {
    // Reset backend
    api.resetPlayerState().catch(() => {});

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
      {/* Top Universal Operative HUD - Only shown inside active gameplay sessions */}
      {currentTab !== 'home' && (
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
          onOpenSkillCheck={() => setIsSkillCheckOpen(true)}
          onOpenDailyChallenge={() => setIsDailyChallengeOpen(true)}
          onResetProgress={handleResetProgress}
        />
      )}

      {/* Main Content Area */}
      <main className={currentTab === 'home' ? 'min-h-screen' : 'min-h-[calc(100vh-68px)]'}>
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
            onOpenSkillCheck={() => setIsSkillCheckOpen(true)}
            onNavigate={(tab) => setCurrentTab(tab)}
            soundMuted={soundMuted}
            onToggleSound={handleToggleSound}
            onCompleteSkillCheck={handleCompleteSkillCheck}
            onResetProgress={handleResetProgress}
          />
        )}

        {currentTab === 'scenario-ops' && (
          <ScenarioOpsView
            player={player}
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

        {currentTab === 'mission' && currentMission && (
          <MissionWorkspace
            key={currentMission.id}
            mission={currentMission}
            player={player}
            onExitMission={() => {
              setCurrentTab('location');
            }}
            onRecordTrustChange={handleRecordTrustChange}
            onUnlockAbility={handleUnlockAbility}
            onUnlockAchievement={handleUnlockAchievement}
            onCompleteMission={handleCompleteMission}
            onAddEvidence={handleAddEvidence}
            onProceedNextMission={(nextId) => {
              const nextMission = MISSIONS[nextId];
              if (nextMission?.locationId) {
                setSelectedLocationId(nextMission.locationId);
                setPlayer((prev) => ({ ...prev, currentLocationId: nextMission.locationId }));
              }
              // Sync area progression in 2D world
              if (nextId === 'mission-01-email') {
                localStorage.setItem('cybermentor_active_campus_area', 'campus-library');
              } else if (nextId === 'mission-02-usb') {
                localStorage.setItem('cybermentor_active_campus_area', 'campus-engineering-lab');
              } else if (nextId === 'mission-03-wifi') {
                localStorage.setItem('cybermentor_active_campus_area', 'campus-student-union');
              } else if (nextId === 'mission-04-qr-scam') {
                localStorage.setItem('cybermentor_active_campus_area', 'campus-secops-desk');
              }
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
      {isHelpOpen && (
        <HowItWorksModal
          onClose={() => setIsHelpOpen(false)}
          onStartPlaying={() => {
            setIsHelpOpen(false);
            handleSelectLocation('campus');
          }}
        />
      )}

      {/* Initial / Retake Diagnostic Skill Check Modal */}
      {isSkillCheckOpen && (
        <SkillCheckModal
          onComplete={handleCompleteSkillCheck}
          onClose={() => setIsSkillCheckOpen(false)}
          initialName={player.name}
        />
      )}

      {/* Daily Cybersecurity Briefing & Challenge Modal */}
      {isDailyChallengeOpen && (
        <DailyChallengeModal
          onClose={() => setIsDailyChallengeOpen(false)}
          onRecordDecision={(points, reason) => {
            handleRecordTrustChange(points, reason);
          }}
        />
      )}

      {/* Real-time Achievement Toast Notification */}
      <AchievementToast
        achievement={activeAchievementToast}
        onDismiss={() => setActiveAchievementToast(null)}
      />
    </div>
  );
}
