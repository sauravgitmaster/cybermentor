import { LocationId } from '../types';

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface WorldPosition {
  x: number;
  y: number;
}

export interface CollisionBox {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export type InteractableType =
  | 'npc'
  | 'mission'
  | 'terminal-world'
  | 'terminal-abilities'
  | 'terminal-evidence'
  | 'terminal-profile'
  | 'terminal-mentor'
  | 'info'
  | 'exit';

export interface AreaExit {
  id: string;
  name: string;
  targetAreaId: string;
  targetLocationId?: LocationId;
  position: WorldPosition;
  targetSpawnPoint: WorldPosition;
  requiredMissionId?: string;
  lockedMessage?: string;
  direction: Direction;
  label: string;
}

export interface PlayableArea {
  id: string;
  locationId: LocationId;
  name: string;
  subtitle: string;
  areaCode: string;
  width: number;
  height: number;
  spawnPoint: WorldPosition;
  theme: {
    groundColor: string;
    gridColor: string;
    pathColor: string;
    pathBorder: string;
    ambientGlow: string;
  };
  pathType:
    | 'library-quad'
    | 'union-patio'
    | 'eng-walkway'
    | 'secops-perimeter'
    | 'city-plaza'
    | 'home-interior'
    | 'corp-vault'
    | 'internet-mesh';
  buildings: WorldBuilding[];
  props: WorldProp[];
  interactables: WorldInteractable[];
  collisionBoxes: CollisionBox[];
  exits: AreaExit[];
  primaryMissionId?: string;
  unresolvedObjective: string;
  resolvedObjective: string;
}

export interface WorldInteractable {
  id: string;
  type: InteractableType;
  name: string;
  subtext: string;
  position: WorldPosition;
  interactionRadius: number;
  actionPrompt: string;
  missionId?: string;
  npcId?: string;
  iconType?: string;
}

export interface WorldBuilding {
  id: string;
  name: string;
  label: string;
  code: string;
  x: number;
  y: number;
  w: number;
  h: number;
  doorPos: WorldPosition;
  accentColor?: string;
}

export interface WorldProp {
  id: string;
  x: number;
  y: number;
  type:
    | 'tree'
    | 'bench'
    | 'lamp'
    | 'server'
    | 'terminal'
    | 'wifi'
    | 'sign'
    | 'desk'
    | 'planter'
    | 'vending'
    | 'bike';
  label?: string;
  accent?: string;
}

export interface SectorEnvironment {
  id: LocationId;
  name: string;
  sectorCode: string;
  width: number;
  height: number;
  spawnPoint: WorldPosition;
  theme: {
    groundColor: string;
    gridColor: string;
    pathColor: string;
    pathBorder: string;
    ambientGlow: string;
  };
  buildings: WorldBuilding[];
  props: WorldProp[];
  interactables: WorldInteractable[];
  collisionBoxes: CollisionBox[];
}
