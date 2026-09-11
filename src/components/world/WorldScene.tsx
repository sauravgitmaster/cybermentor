import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Compass,
  Zap,
  FolderOpen,
  User,
  Cpu,
  Info,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ArrowRight,
  Shield,
  Footprints,
  Terminal,
} from 'lucide-react';
import { PlayerState, WorldLocation, LocationId } from '../../types';
import { Direction, WorldPosition, WorldInteractable, AreaExit, PlayableArea } from '../../types/world';
import {
  PLAYABLE_AREAS,
  CAMPUS_AREA_SEQUENCE,
  isAreaUnlocked,
  getInitialAreaForLocation,
} from '../../data/areaEnvironments';
import { NPC_DIALOGUES, NPCDialogue } from '../../data/dialogues';
import { PlayerAvatar } from './PlayerAvatar';
import { NPCAvatar } from './NPCAvatar';
import { InteractiveStation, BuildingStructure, EnvironmentalProp } from './WorldObjects';
import { AreaExitGate } from './AreaExitGate';
import { InteractionPrompt } from './InteractionPrompt';
import { MobileControls } from './MobileControls';
import { MentorUplinkModal } from './MentorUplinkModal';
import { DialogueBox } from './DialogueBox';
import { ForensicSandboxModal } from '../ForensicSandboxModal';
import { playClickSound, playInspectSound, playSuccessSound } from '../../utils/audio';

interface WorldSceneProps {
  location: WorldLocation;
  player: PlayerState;
  onBackToWorld: () => void;
  onSelectMission: (missionId: string) => void;
  onNavigateTab: (tab: 'world' | 'abilities' | 'evidence' | 'profile') => void;
  onToggleTacticalView?: () => void;
}

interface TransitionState {
  phase: 'fade-out' | 'fade-in';
  targetAreaId: string;
  targetSpawnPoint: WorldPosition;
  targetAreaName: string;
  targetAreaSubtitle: string;
}

export const WorldScene: React.FC<WorldSceneProps> = ({
  location,
  player,
  onBackToWorld,
  onSelectMission,
  onNavigateTab,
  onToggleTacticalView,
}) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportSize, setViewportSize] = useState<{ w: number; h: number }>({
    w: 800,
    h: 520,
  });

  // Current active playable area
  const [currentAreaId, setCurrentAreaId] = useState<string>(() => {
    const initialArea = getInitialAreaForLocation(location.id, player.completedMissions);
    return initialArea.id;
  });

  const currentArea: PlayableArea =
    PLAYABLE_AREAS[currentAreaId] || getInitialAreaForLocation(location.id, player.completedMissions);

  // Player position and movement states
  const [playerPos, setPlayerPos] = useState<WorldPosition>(() => {
    return currentArea.spawnPoint;
  });
  const [direction, setDirection] = useState<Direction>('down');
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [nearestInteractable, setNearestInteractable] = useState<WorldInteractable | null>(null);
  const [nearestExit, setNearestExit] = useState<AreaExit | null>(null);
  const [targetMovePos, setTargetMovePos] = useState<WorldPosition | null>(null);
  const [isMentorModalOpen, setIsMentorModalOpen] = useState<boolean>(false);
  const [isForensicModalOpen, setIsForensicModalOpen] = useState<boolean>(false);
  const [activeDialogue, setActiveDialogue] = useState<NPCDialogue | null>(null);
  const [inspectModal, setInspectModal] = useState<{ title: string; text: string } | null>(null);
  const [areaTitleBanner, setAreaTitleBanner] = useState<string | null>(() => currentArea.name);
  const [transitionState, setTransitionState] = useState<TransitionState | null>(null);
  const [lockedExitAlert, setLockedExitAlert] = useState<string | null>(null);

  // Active keys ref for smooth 60fps movement
  const keysPressed = useRef<Set<string>>(new Set());
  const playerPosRef = useRef<WorldPosition>(currentArea.spawnPoint);
  playerPosRef.current = playerPos;

  // Track location changes (e.g. if user switched from macro map)
  useEffect(() => {
    const targetArea = getInitialAreaForLocation(location.id, player.completedMissions);
    setCurrentAreaId(targetArea.id);
    setPlayerPos(targetArea.spawnPoint);
    playerPosRef.current = targetArea.spawnPoint;
    setAreaTitleBanner(targetArea.name);
    const timer = setTimeout(() => setAreaTitleBanner(null), 2400);
    return () => clearTimeout(timer);
  }, [location.id]);

  // Track viewport size on resize
  useEffect(() => {
    const updateSize = () => {
      if (viewportRef.current) {
        const rect = viewportRef.current.getBoundingClientRect();
        setViewportSize({ w: rect.width, h: rect.height });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Distance calculator
  const getDistance = (p1: WorldPosition, p2: WorldPosition) => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Collision detection helper against current area bounds and collision boxes
  const checkCollision = useCallback(
    (x: number, y: number): boolean => {
      // Map boundaries check
      if (x < 24 || x > currentArea.width - 24 || y < 32 || y > currentArea.height - 24) {
        return true;
      }

      // Check against current area collision boxes
      const playerRadius = 12;
      for (const box of currentArea.collisionBoxes) {
        if (
          x + playerRadius > box.x &&
          x - playerRadius < box.x + box.w &&
          y + playerRadius > box.y &&
          y - playerRadius < box.y + box.h
        ) {
          return true;
        }
      }
      return false;
    },
    [currentArea]
  );

  // Execute lightweight RPG area transition
  const executeAreaTransition = useCallback(
    (exit: AreaExit) => {
      const isUnlocked = exit.requiredMissionId
        ? player.completedMissions.includes(exit.requiredMissionId)
        : true;

      if (!isUnlocked) {
        playInspectSound();
        setLockedExitAlert(
          exit.lockedMessage || 'This path is currently locked. Resolve the active area incident first!'
        );
        setTimeout(() => setLockedExitAlert(null), 4000);
        return;
      }

      const target = PLAYABLE_AREAS[exit.targetAreaId];
      if (!target) return;

      playClickSound();

      // Begin fade-out
      setTransitionState({
        phase: 'fade-out',
        targetAreaId: exit.targetAreaId,
        targetSpawnPoint: exit.targetSpawnPoint,
        targetAreaName: target.name,
        targetAreaSubtitle: target.subtitle,
      });

      // After 350ms, switch area and update spawn point
      setTimeout(() => {
        setCurrentAreaId(exit.targetAreaId);
        if (location.id === 'campus') {
          try {
            localStorage.setItem('cybermentor_active_campus_area', exit.targetAreaId);
          } catch (e) {
            // ignore
          }
        }
        setPlayerPos(exit.targetSpawnPoint);
        playerPosRef.current = exit.targetSpawnPoint;

        // Begin fade-in
        setTransitionState((prev) => (prev ? { ...prev, phase: 'fade-in' } : null));

        // After another 350ms, complete transition
        setTimeout(() => {
          setTransitionState(null);
          setAreaTitleBanner(target.name);
          setTimeout(() => setAreaTitleBanner(null), 2400);
        }, 350);
      }, 350);
    },
    [player.completedMissions, location.id]
  );

  // Fast-travel / Switch to an unlocked area directly (from breadcrumbs)
  const handleQuickTravel = (targetAreaId: string) => {
    if (targetAreaId === currentAreaId) return;
    const target = PLAYABLE_AREAS[targetAreaId];
    if (!target) return;
    if (!isAreaUnlocked(targetAreaId, player.completedMissions)) return;

    playClickSound();
    setTransitionState({
      phase: 'fade-out',
      targetAreaId: targetAreaId,
      targetSpawnPoint: target.spawnPoint,
      targetAreaName: target.name,
      targetAreaSubtitle: target.subtitle,
    });

    setTimeout(() => {
      setCurrentAreaId(targetAreaId);
      if (location.id === 'campus') {
        try {
          localStorage.setItem('cybermentor_active_campus_area', targetAreaId);
        } catch (e) {}
      }
      setPlayerPos(target.spawnPoint);
      playerPosRef.current = target.spawnPoint;

      setTransitionState((prev) => (prev ? { ...prev, phase: 'fade-in' } : null));
      setTimeout(() => {
        setTransitionState(null);
        setAreaTitleBanner(target.name);
        setTimeout(() => setAreaTitleBanner(null), 2400);
      }, 350);
    }, 350);
  };

  // Find closest interactable and closest exit within radius
  const updateNearestObjects = useCallback(
    (pos: WorldPosition) => {
      // 1. Check interactables
      let closestItem: WorldInteractable | null = null;
      let minDistance = Infinity;

      for (const item of currentArea.interactables) {
        const dist = getDistance(pos, item.position);
        if (dist <= item.interactionRadius && dist < minDistance) {
          minDistance = dist;
          closestItem = item;
        }
      }
      setNearestInteractable(closestItem);

      // 2. Check exits
      let closestExit: AreaExit | null = null;
      let minExitDist = Infinity;

      for (const exit of currentArea.exits) {
        const dist = getDistance(pos, exit.position);
        if (dist <= 60 && dist < minExitDist) {
          minExitDist = dist;
          closestExit = exit;
        }
      }
      setNearestExit(closestExit);

      // Auto-step threshold: if player steps right onto an unlocked exit (dist < 26px) and not transitioning
      if (closestExit && minExitDist <= 26 && !transitionState) {
        const isUnlocked = closestExit.requiredMissionId
          ? player.completedMissions.includes(closestExit.requiredMissionId)
          : true;
        if (isUnlocked) {
          executeAreaTransition(closestExit);
        }
      }
    },
    [currentArea, transitionState, player.completedMissions, executeAreaTransition]
  );

  // Trigger interaction
  const handleTriggerInteraction = useCallback(() => {
    // If near exit, interact with exit
    if (nearestExit) {
      executeAreaTransition(nearestExit);
      return;
    }

    if (!nearestInteractable) return;
    playClickSound();

    switch (nearestInteractable.type) {
      case 'npc':
      case 'mission':
        if (nearestInteractable.npcId && NPC_DIALOGUES[nearestInteractable.npcId]) {
          setActiveDialogue(NPC_DIALOGUES[nearestInteractable.npcId]);
        } else if (nearestInteractable.id && NPC_DIALOGUES[nearestInteractable.id]) {
          setActiveDialogue(NPC_DIALOGUES[nearestInteractable.id]);
        } else if (nearestInteractable.missionId) {
          onSelectMission(nearestInteractable.missionId);
        }
        break;
      case 'terminal-world':
        onBackToWorld();
        break;
      case 'terminal-abilities':
        onNavigateTab('abilities');
        break;
      case 'terminal-evidence':
        onNavigateTab('evidence');
        break;
      case 'terminal-profile':
        onNavigateTab('profile');
        break;
      case 'terminal-mentor':
        setIsMentorModalOpen(true);
        break;
      case 'info':
        playInspectSound();
        if (nearestInteractable.id === 'info-notice-board') {
          setInspectModal({
            title: 'CAMPUS ADVISORY: URGENT EMAIL PHISHING CAMPAIGN',
            text: 'Campus Security Alert: Students and staff are advised of spear-phishing emails claiming financial aid forfeiture. Do NOT click external login links or enter credentials. Jordan Rivera at the Library reported an active specimen.',
          });
        } else if (nearestInteractable.id === 'info-rogue-wifi') {
          setInspectModal({
            title: 'RF SPECTRUM TELEMETRY: ROGUE ACCESS POINT',
            text: 'A high-gain Wi-Fi transmitter is broadcasting an open network "Campus_HighSpeed_Guest_NoPassword". Hardware OUI prefix indicates a portable Alfa attack kit. Elena Rostova is actively triaging.',
          });
        } else if (nearestInteractable.id === 'info-dropped-usb') {
          setInspectModal({
            title: 'HARDWARE DIAGNOSTIC: DROPPED USB ARTIFACT',
            text: 'A metallic thumb drive labeled "CS301_Final_Exams_Grading_Key" was recovered from CAD Lab 204. Quarantine protocol required: inspecting the USB descriptor before connecting to any networked machine.',
          });
        } else {
          setInspectModal({
            title: nearestInteractable.name,
            text: nearestInteractable.subtext || 'Environmental observation recorded in dossier.',
          });
        }
        break;
      default:
        break;
    }
  }, [
    nearestExit,
    nearestInteractable,
    executeAreaTransition,
    onSelectMission,
    onBackToWorld,
    onNavigateTab,
  ]);

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.code === 'KeyE' || e.code === 'Space' || e.code === 'Enter') {
        if (activeDialogue || inspectModal) {
          e.preventDefault();
          return;
        }
        if (nearestExit || nearestInteractable) {
          e.preventDefault();
          handleTriggerInteraction();
          return;
        }
      }

      if (e.code === 'Escape') {
        if (activeDialogue) {
          setActiveDialogue(null);
          return;
        }
        if (inspectModal) {
          setInspectModal(null);
          return;
        }
      }

      // Movement keys
      if (
        ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(
          e.code
        )
      ) {
        if (transitionState) return;
        e.preventDefault();
        keysPressed.current.add(e.code);
        setTargetMovePos(null);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.code);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [nearestExit, nearestInteractable, handleTriggerInteraction, activeDialogue, inspectModal, transitionState]);

  // Main Movement Game Loop (60 FPS)
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 190;

    const gameLoop = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (transitionState) {
        animationFrameId = requestAnimationFrame(gameLoop);
        return;
      }

      const keys = keysPressed.current;
      let dx = 0;
      let dy = 0;

      // Click to move resolution
      if (targetMovePos) {
        const current = playerPosRef.current;
        const dist = getDistance(current, targetMovePos);
        if (dist < 5) {
          setTargetMovePos(null);
        } else {
          dx = (targetMovePos.x - current.x) / dist;
          dy = (targetMovePos.y - current.y) / dist;
        }
      } else {
        // Keyboard inputs
        if (keys.has('KeyW') || keys.has('ArrowUp')) dy -= 1;
        if (keys.has('KeyS') || keys.has('ArrowDown')) dy += 1;
        if (keys.has('KeyA') || keys.has('ArrowLeft')) dx -= 1;
        if (keys.has('KeyD') || keys.has('ArrowRight')) dx += 1;

        // Normalize diagonal movement
        if (dx !== 0 && dy !== 0) {
          const invSqrt = 1 / Math.SQRT2;
          dx *= invSqrt;
          dy *= invSqrt;
        }
      }

      const moving = dx !== 0 || dy !== 0;
      setIsMoving(moving);

      if (moving) {
        // Update Direction based on dominant axis
        if (Math.abs(dx) > Math.abs(dy)) {
          setDirection(dx > 0 ? 'right' : 'left');
        } else {
          setDirection(dy > 0 ? 'down' : 'up');
        }

        const current = playerPosRef.current;
        const newX = current.x + dx * speed * deltaTime;
        const newY = current.y + dy * speed * deltaTime;

        // Try movement with independent axis sliding
        let finalX = current.x;
        let finalY = current.y;

        if (!checkCollision(newX, current.y)) {
          finalX = newX;
        }
        if (!checkCollision(current.x, newY)) {
          finalY = newY;
        }

        if (finalX !== current.x || finalY !== current.y) {
          const nextPos = { x: finalX, y: finalY };
          setPlayerPos(nextPos);
          playerPosRef.current = nextPos;
          updateNearestObjects(nextPos);
        }
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [checkCollision, targetMovePos, updateNearestObjects, transitionState]);

  // Handle map click for click-to-move
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (transitionState) return;
    if (viewportRef.current) {
      const rect = viewportRef.current.getBoundingClientRect();
      const clickViewportX = e.clientX - rect.left;
      const clickViewportY = e.clientY - rect.top;

      // Translate viewport coordinate to world coordinate accounting for camera & centering offset
      const worldX = Math.round(clickViewportX + cameraX - offsetX);
      const worldY = Math.round(clickViewportY + cameraY - offsetY);

      if (!checkCollision(worldX, worldY)) {
        setTargetMovePos({ x: worldX, y: worldY });
      }
    }
  };

  // Virtual mobile D-pad controls
  const handleMobileDirectionPress = (dir: Direction) => {
    if (transitionState) return;
    const current = playerPosRef.current;
    const step = 32;
    let target = { ...current };

    if (dir === 'up') target.y -= step;
    if (dir === 'down') target.y += step;
    if (dir === 'left') target.x -= step;
    if (dir === 'right') target.x += step;

    setDirection(dir);
    if (!checkCollision(target.x, target.y)) {
      setPlayerPos(target);
      playerPosRef.current = target;
      updateNearestObjects(target);
    }
  };

  // Camera calculation: Center player in viewport, clamped to current area bounds
  const halfViewW = viewportSize.w / 2;
  const halfViewH = viewportSize.h / 2;
  const maxCameraX = Math.max(0, currentArea.width - viewportSize.w);
  const maxCameraY = Math.max(0, currentArea.height - viewportSize.h);
  const cameraX = Math.max(0, Math.min(maxCameraX, playerPos.x - halfViewW));
  const cameraY = Math.max(0, Math.min(maxCameraY, playerPos.y - halfViewH));

  // Offset to center stage when viewport is larger than map
  const offsetX = viewportSize.w > currentArea.width ? Math.round((viewportSize.w - currentArea.width) / 2) : 0;
  const offsetY = viewportSize.h > currentArea.height ? Math.round((viewportSize.h - currentArea.height) / 2) : 0;

  // Environmental objective text calculation
  const isPrimaryMissionDone = currentArea.primaryMissionId
    ? player.completedMissions.includes(currentArea.primaryMissionId)
    : false;

  const currentObjectiveText = isPrimaryMissionDone
    ? currentArea.resolvedObjective
    : currentArea.unresolvedObjective;

  return (
    <div id="rpg-world-viewport-container" className="relative w-full select-none">
      {/* Top Header: Location, Area Progression Breadcrumbs, and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-xl border-2 border-b-0 border-[#385175] bg-[#16233b]/95 px-4 py-2 text-xs font-mono text-slate-200 shadow-md">
        <div className="flex flex-wrap items-center gap-2">
          {/* Active Area Badge */}
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="font-bold text-amber-300 uppercase tracking-wider text-sm">
              {currentArea.name}
            </span>
          </div>
          <span className="text-slate-500 font-mono hidden sm:inline">•</span>
          <span className="px-1.5 py-0.5 rounded bg-black/40 text-[10px] text-cyan-300 border border-[#2b3c58] hidden sm:inline">
            {currentArea.areaCode}
          </span>
        </div>

        {/* Campus Sequential Area Switcher / Breadcrumbs (if on Campus) */}
        {location.id === 'campus' && (
          <div className="hidden lg:flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-lg border border-[#2b3c58]">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mr-1">
              AREAS:
            </span>
            {CAMPUS_AREA_SEQUENCE.map((areaId, idx) => {
              const area = PLAYABLE_AREAS[areaId];
              const unlocked = isAreaUnlocked(areaId, player.completedMissions);
              const isCurrent = areaId === currentAreaId;
              const shortNames = ['1. LIBRARY', '2. UNION', '3. ENG LAB', '4. SECOPS'];

              return (
                <button
                  key={areaId}
                  onClick={() => handleQuickTravel(areaId)}
                  disabled={!unlocked}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase transition-all ${
                    isCurrent
                      ? 'bg-amber-400 text-slate-950 shadow-sm ring-1 ring-amber-300'
                      : unlocked
                      ? 'bg-[#1e293b] text-slate-200 hover:bg-[#334155] border border-slate-600/50'
                      : 'bg-black/30 text-slate-600 cursor-not-allowed border border-slate-800'
                  }`}
                  title={unlocked ? `Travel to ${area.name}` : `Locked: Complete prior incident to unlock`}
                >
                  {unlocked ? (
                    isCurrent ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse" />
                    ) : (
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                    )
                  ) : (
                    <Lock className="w-2.5 h-2.5 text-slate-600" />
                  )}
                  <span>{shortNames[idx]}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playClickSound();
              setIsForensicModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-cyan-500/50 bg-cyan-950/50 hover:bg-cyan-900/60 text-cyan-300 text-[10px] font-bold uppercase transition-colors shadow-xs"
            title="Open SecOps Forensic Sandbox Terminal"
          >
            <Terminal className="h-3.5 w-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Forensic Sandbox</span>
            <span className="sm:hidden">Sandbox</span>
          </button>

          {onToggleTacticalView && (
            <button
              onClick={() => {
                playClickSound();
                onToggleTacticalView();
              }}
              className="px-2.5 py-1 rounded border border-[#3b5175] bg-[#1a2942] hover:bg-[#263a5c] text-slate-200 text-[10px] font-bold uppercase transition-colors"
            >
              Dossier Cards
            </button>
          )}

          <button
            onClick={() => {
              playClickSound();
              onBackToWorld();
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded border border-amber-500/50 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-bold uppercase transition-colors shadow-sm"
          >
            <Compass className="h-3.5 w-3.5 text-amber-400" />
            <span>World Map</span>
          </button>
        </div>
      </div>

      {/* Environmental Objective Ribbon (Minimalist, Scannable) */}
      <div className="bg-[#0b121e] border-x-2 border-b-2 border-[#2b3c58] px-4 py-1 flex items-center justify-between gap-3 text-[11px] font-mono shadow-inner">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0 animate-pulse" />
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] shrink-0">
            OBJECTIVE:
          </span>
          <span className="text-amber-200 font-semibold truncate">{currentObjectiveText}</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono hidden md:inline shrink-0">
          {location.name}
        </span>
      </div>

      {/* Main Viewport & Camera Stage */}
      <div
        ref={viewportRef}
        className="relative w-full h-[540px] sm:h-[620px] rounded-b-xl border-2 border-t-0 border-[#385175] overflow-hidden cursor-crosshair bg-[#172338] shadow-2xl"
        style={{ touchAction: 'none' }}
      >
        {/* Transform Camera Container */}
        <div
          id="camera-stage"
          onClick={handleMapClick}
          className="absolute top-0 left-0 transition-transform duration-75 ease-out"
          style={{
            width: `${currentArea.width}px`,
            height: `${currentArea.height}px`,
            transform: `translate3d(${offsetX - cameraX}px, ${offsetY - cameraY}px, 0)`,
            backgroundColor: currentArea.theme.groundColor,
          }}
        >
          {/* Ground Checkered Lawn Pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: `linear-gradient(to right, ${currentArea.theme.gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${currentArea.theme.gridColor} 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />

          {/* Area Specific Vector Pathways */}
          <svg
            className="absolute inset-0 pointer-events-none w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="path-tile" width="24" height="24" patternUnits="userSpaceOnUse">
                <rect width="24" height="24" fill={currentArea.theme.pathColor} />
                <path d="M 0 0 L 24 0 M 0 0 L 0 24" stroke={currentArea.theme.pathBorder} strokeWidth="1" />
                <rect x="2" y="2" width="9" height="9" fill="#dfd0b9" rx="1" opacity="0.5" />
                <rect x="13" y="13" width="9" height="9" fill="#e8dac4" rx="1" opacity="0.6" />
              </pattern>
            </defs>

            {/* 1. LIBRARY QUAD PATHWAY */}
            {currentArea.pathType === 'library-quad' && (
              <g id="pathway-library">
                {/* Entrance Plaza Patio */}
                <rect x="160" y="210" width="180" height="90" rx="8" fill="url(#path-tile)" stroke={currentArea.theme.pathBorder} strokeWidth="1.5" />
                {/* Courtyard Walkway connecting to benches */}
                <rect x="100" y="270" width="300" height="40" rx="4" fill="url(#path-tile)" stroke={currentArea.theme.pathBorder} strokeWidth="1" />
                {/* Walkway leading East to Student Union Exit */}
                <rect x="350" y="260" width="390" height="48" rx="4" fill="url(#path-tile)" stroke={currentArea.theme.pathBorder} strokeWidth="1.5" />
                {/* Stepping flagstones */}
                <circle cx="210" cy="330" r="7" fill="#ebdcc6" stroke="#b59e7f" strokeWidth="1" />
                <circle cx="230" cy="350" r="6" fill="#ebdcc6" stroke="#b59e7f" strokeWidth="1" />
              </g>
            )}

            {/* 2. STUDENT UNION PATIO PATHWAY */}
            {currentArea.pathType === 'union-patio' && (
              <g id="pathway-union">
                {/* West path coming from Library */}
                <rect x="40" y="256" width="320" height="48" rx="4" fill="url(#path-tile)" stroke={currentArea.theme.pathBorder} strokeWidth="1.5" />
                {/* Central Cafe Terrace Plaza */}
                <rect x="260" y="210" width="260" height="150" rx="12" fill="url(#path-tile)" stroke={currentArea.theme.pathBorder} strokeWidth="2" />
                {/* South Walkway leading toward Engineering */}
                <rect x="366" y="350" width="48" height="160" rx="4" fill="url(#path-tile)" stroke={currentArea.theme.pathBorder} strokeWidth="1.5" />
              </g>
            )}

            {/* 3. ENGINEERING LAB WALKWAY */}
            {currentArea.pathType === 'eng-walkway' && (
              <g id="pathway-engineering">
                {/* North walkway coming from Student Union */}
                <rect x="366" y="40" width="48" height="190" rx="4" fill="url(#path-tile)" stroke={currentArea.theme.pathBorder} strokeWidth="1.5" />
                {/* Lab Plaza in front of Engineering entrance */}
                <rect x="230" y="220" width="320" height="80" rx="8" fill="url(#path-tile)" stroke={currentArea.theme.pathBorder} strokeWidth="1.5" />
                {/* Breezeway leading East to SecOps */}
                <rect x="480" y="180" width="270" height="48" rx="4" fill="url(#path-tile)" stroke={currentArea.theme.pathBorder} strokeWidth="1.5" />
              </g>
            )}

            {/* 4. SECOPS PERIMETER PATHWAY */}
            {currentArea.pathType === 'secops-perimeter' && (
              <g id="pathway-secops">
                {/* West corridor from Engineering */}
                <rect x="40" y="180" width="320" height="48" rx="4" fill="url(#path-tile)" stroke={currentArea.theme.pathBorder} strokeWidth="1.5" />
                {/* SecOps Secure Entrance Courtyard */}
                <rect x="280" y="215" width="220" height="90" rx="8" fill="url(#path-tile)" stroke={currentArea.theme.pathBorder} strokeWidth="1.5" />
                {/* Central Tactical Terminal Plaza */}
                <rect x="180" y="380" width="420" height="70" rx="10" fill="url(#path-tile)" stroke={currentArea.theme.pathBorder} strokeWidth="1.5" />
              </g>
            )}

            {/* OTHER DISTRICTS PATHWAYS */}
            {(currentArea.pathType === 'city-plaza' ||
              currentArea.pathType === 'home-interior' ||
              currentArea.pathType === 'corp-vault' ||
              currentArea.pathType === 'internet-mesh') && (
              <g id="pathway-other">
                <rect x="140" y="210" width="500" height="140" rx="8" fill="url(#path-tile)" stroke={currentArea.theme.pathBorder} strokeWidth="1.5" />
              </g>
            )}
          </svg>

          {/* Environmental Buildings */}
          {currentArea.buildings.map((b) => (
            <BuildingStructure key={b.id} building={b} />
          ))}

          {/* Environmental Props */}
          {currentArea.props.map((p) => (
            <EnvironmentalProp key={p.id} prop={p} />
          ))}

          {/* Physical Area Exits & Gateways */}
          {currentArea.exits.map((exit) => {
            const isUnlocked = exit.requiredMissionId
              ? player.completedMissions.includes(exit.requiredMissionId)
              : true;

            return (
              <AreaExitGate
                key={exit.id}
                exit={exit}
                isNearPlayer={nearestExit?.id === exit.id}
                isUnlocked={isUnlocked}
                onInteract={() => executeAreaTransition(exit)}
              />
            );
          })}

          {/* Interactive Stations (Evidence, Abilities, Profile, Mentor, World) */}
          {currentArea.interactables
            .filter((item) => item.type.startsWith('terminal-') || item.type === 'info')
            .map((item) => (
              <InteractiveStation
                key={item.id}
                interactable={item}
                isNearPlayer={nearestInteractable?.id === item.id}
                onInteract={() => {
                  setNearestInteractable(item);
                  handleTriggerInteraction();
                }}
              />
            ))}

          {/* NPCs (Only relevant to current area!) */}
          {currentArea.interactables
            .filter((item) => item.type === 'npc')
            .map((npc) => {
              const isCompleted = npc.missionId
                ? player.completedMissions.includes(npc.missionId)
                : false;
              const isUnlocked = true;

              return (
                <NPCAvatar
                  key={npc.id}
                  id={npc.id}
                  name={npc.name}
                  role={npc.subtext}
                  x={npc.position.x}
                  y={npc.position.y}
                  isNearPlayer={nearestInteractable?.id === npc.id}
                  isCompleted={isCompleted}
                  isUnlocked={isUnlocked}
                  onInteract={() => {
                    setNearestInteractable(npc);
                    const dialogue = npc.npcId
                      ? NPC_DIALOGUES[npc.npcId]
                      : NPC_DIALOGUES[npc.id];
                    if (dialogue) {
                      setActiveDialogue(dialogue);
                    } else if (npc.missionId) {
                      onSelectMission(npc.missionId);
                    }
                  }}
                />
              );
            })}

          {/* Player Avatar */}
          <PlayerAvatar
            x={playerPos.x}
            y={playerPos.y}
            direction={direction}
            isMoving={isMoving}
            playerName={player.name}
          />
        </div>

        {/* Floating Controls Helper (Keyboard) */}
        <div className="hidden md:flex absolute top-3 left-3 z-30 pointer-events-none items-center gap-2 rounded-lg border border-[#3b5175] bg-[#0f172a]/90 px-3 py-1.5 text-[11px] font-mono text-slate-300 backdrop-blur-sm shadow-md">
          <span className="text-amber-400 font-bold">WASD / ARROWS</span>
          <span>MOVE</span>
          <span className="text-slate-500">•</span>
          <span className="text-amber-400 font-bold">[E]</span>
          <span>INTERACT / EXIT</span>
        </div>

        {/* Area Entrance Title Banner (Discreet floating pill) */}
        {areaTitleBanner && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-in fade-in slide-in-from-top-3 duration-300">
            <div className="flex flex-col items-center px-4 py-1.5 rounded-lg border border-amber-500/60 bg-[#0d1624]/95 backdrop-blur-md shadow-2xl">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest">
                AREA EXPLORATION
              </span>
              <span className="text-sm font-mono font-black text-slate-100 uppercase tracking-wide">
                {currentArea.name}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {currentArea.subtitle}
              </span>
            </div>
          </div>
        )}

        {/* Locked Exit In-Game Notification Alert */}
        {lockedExitAlert && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40 animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-rose-600/80 bg-rose-950/90 text-rose-200 text-xs font-mono font-bold shadow-2xl backdrop-blur-sm">
              <Lock className="h-4 w-4 text-rose-400 shrink-0" />
              <span>{lockedExitAlert}</span>
            </div>
          </div>
        )}

        {/* Interaction Prompt */}
        {!activeDialogue && !inspectModal && (
          <InteractionPrompt
            interactable={nearestInteractable}
            onTrigger={handleTriggerInteraction}
          />
        )}

        {/* Active RPG NPC Dialogue Window */}
        {activeDialogue && (
          <DialogueBox
            dialogue={activeDialogue}
            isCompleted={
              Boolean(activeDialogue.missionId && player.completedMissions.includes(activeDialogue.missionId))
            }
            onStartMission={(missionId) => {
              setActiveDialogue(null);
              onSelectMission(missionId);
            }}
            onClose={() => setActiveDialogue(null)}
          />
        )}

        {/* Environmental Observation Modal */}
        {inspectModal && (
          <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-xl border border-amber-500/60 bg-[#0d1624] p-5 shadow-2xl font-mono">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Info className="h-4 w-4" />
                <span>{inspectModal.title}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {inspectModal.text}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => setInspectModal(null)}
                  className="px-3 py-1 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Close [ESC]
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lightweight RPG Area Transition Overlay */}
        {transitionState && (
          <div
            className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#070b12] transition-opacity duration-300 pointer-events-auto ${
              transitionState.phase === 'fade-out' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex flex-col items-center text-center px-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs tracking-widest uppercase">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                <span>TRANSITIONING SECTOR</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-mono font-black text-slate-100 tracking-wider uppercase border-b-2 border-amber-400 pb-1">
                {transitionState.targetAreaName}
              </h2>
              <p className="text-xs font-mono text-cyan-300/90 tracking-wide uppercase">
                {transitionState.targetAreaSubtitle}
              </p>
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-2 animate-pulse" />
            </div>
          </div>
        )}

        {/* Mobile Virtual Controls */}
        <MobileControls
          onDirectionPress={handleMobileDirectionPress}
          onInteract={handleTriggerInteraction}
          canInteract={Boolean(nearestInteractable || nearestExit)}
          promptLabel={
            nearestExit
              ? `[E] ${nearestExit.label}`
              : nearestInteractable?.actionPrompt
          }
        />
      </div>

      {/* In-World AI Mentor Comms Uplink Modal */}
      {isMentorModalOpen && (
        <MentorUplinkModal
          player={player}
          location={location}
          onClose={() => setIsMentorModalOpen(false)}
          onNavigateTab={(tab) => {
            setIsMentorModalOpen(false);
            onNavigateTab(tab);
          }}
          onOpenForensicSandbox={() => {
            setIsMentorModalOpen(false);
            setIsForensicModalOpen(true);
          }}
        />
      )}

      {/* Forensic Sandbox Terminal Modal */}
      {isForensicModalOpen && (
        <ForensicSandboxModal onClose={() => setIsForensicModalOpen(false)} />
      )}
    </div>
  );
};
