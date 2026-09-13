export type MangaTopicId =
  | 'phishing'
  | 'passwords'
  | 'privacy'
  | 'social-engineering'
  | 'device-security'
  | 'wifi'
  | 'social-media'
  | 'shopping'
  | 'qr-scams'
  | 'malware'
  | 'account-security'
  | 'cloud-security'
  | 'digital-footprint'
  | 'ai-deepfakes'
  | 'physical-security'
  | 'gaming-security'
  | 'ai-scams'
  | 'app-permissions'
  | 'gaming-safety';

export type MangaGenreId =
  | 'comedy'
  | 'thriller'
  | 'mystery'
  | 'drama'
  | 'school-life'
  | 'detective'
  | 'cyberpunk'
  | 'action';

export interface MangaTopicMeta {
  id: MangaTopicId;
  name: string;
  icon: string;
  category: 'core' | 'threats' | 'habits';
  summary: string;
  keyRule: string;
  exampleScenario: string;
}

export interface MangaGenreMeta {
  id: MangaGenreId;
  name: string;
  icon: string;
  tagline: string;
  atmosphere: string;
  tonePrompt: string;
}

export interface MangaDialogue {
  speaker: string;
  role?: 'student' | 'mentor' | 'adversary' | 'classmate' | 'narrator';
  text: string;
  bubbleType?: 'speech' | 'shout' | 'whisper' | 'thought' | 'hologram';
}

export type MangaPanelComposition =
  | 'cinematic-wide'
  | 'two-panel-split'
  | 'three-panel-tier'
  | 'close-up-reaction'
  | 'forensic-zoom'
  | 'tension-fork'
  | 'action-burst'
  | 'hero-card';

export type MangaBackgroundScene =
  | 'campus-cafeteria'
  | 'study-desk'
  | 'campus-hallway'
  | 'coffee-shop'
  | 'computer-lab'
  | 'subway-station'
  | 'dorm-room'
  | 'dark-alley'
  | 'cyber-matrix';

export interface VisualCharacterInstance {
  characterId: 'saurav' | 'mentor' | 'maya' | 'scammer' | 'tech-support' | 'delivery-courier' | 'leo' | (string & {});
  name?: string;
  pose:
    | 'seated-laptop'
    | 'checking-phone'
    | 'shocked-panic'
    | 'suspicious-squint'
    | 'thinking'
    | 'relieved-thumbsup'
    | 'glitch-despair'
    | 'mentor-floating'
    | 'mentor-shield'
    | 'mentor-pointing'
    | 'adversary-sneer'
    | 'idle';
  position: 'left' | 'center' | 'right' | 'foreground';
}

export interface MangaSpeechBubble {
  id: string;
  speaker: string;
  text: string;
  bubbleType: 'speech' | 'shout' | 'whisper' | 'thought' | 'hologram' | 'phone-screen' | 'system-alert';
  position: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'center-left' | 'center-right';
  tailDirection?: 'down-left' | 'down-right' | 'up-left' | 'up-right' | 'none';
  characterRole?: 'student' | 'mentor' | 'adversary' | 'classmate' | 'narrator';
}

export interface MangaVisualClue {
  type: 'domain' | 'url' | 'wifi' | 'qr' | 'phone' | 'usb' | 'password' | 'code' | 'badge' | 'attachment' | 'card' | 'cloud' | (string & {});
  label: string;
  displayValue: string;
  highlightSubstring?: string;
  flawExplanation: string;
  isAnomaly: boolean;
  inspectZoomTitle?: string;
}

export interface MangaPanel {
  panelNumber: number;
  panelType:
    | 'story'
    | 'problem'
    | 'clue'
    | 'tension'
    | 'decision'
    | 'consequence'
    | 'mentor'
    | 'principle';
  title?: string;
  sceneDescription: string;
  visualTone:
    | 'speed-lines'
    | 'dramatic-shadow'
    | 'comedic-sweat-drop'
    | 'alert-glow'
    | 'sleuth-tint'
    | 'cyber-grid';
  soundEffect?: string;
  characterAction: string;
  dialogue?: MangaDialogue[];
  clueOverlay?: {
    label: string;
    text: string;
    type: 'warning' | 'info' | 'critical';
  };
  artSvgVariant?: 'screen-urgency' | 'phone-incoming' | 'investigate-lens' | 'panic-sweat' | 'decision-split' | 'shield-active' | 'system-breach' | 'mentor-hologram' | 'wisdom-scroll';
  // Upgraded Visual Storytelling Properties:
  compositionLayout?: MangaPanelComposition;
  backgroundScene?: MangaBackgroundScene;
  captionBox?: {
    text: string;
    location?: 'top-left' | 'top-right' | 'bottom-left';
  };
  characters?: VisualCharacterInstance[];
  speechBubbles?: MangaSpeechBubble[];
  visualClue?: MangaVisualClue;
}

export interface MangaDecisionOption {
  id: 'A' | 'B' | 'C' | 'D';
  label: string;
  description: string;
  isCorrect: boolean;
  consequenceTitle: string;
  consequenceReaction: string;
  consequenceText: string;
  mentorCritique: string;
}

export interface MangaKnowledgeCheckQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface CyberMangaComic {
  id: string;
  title: string;
  topicId: MangaTopicId;
  topicLabel: string;
  genreId: MangaGenreId;
  genreLabel: string;
  concept: string;
  summary: string;
  createdAt: number;
  completed: boolean;
  scoreAwarded?: number;
  protagonistName: string;
  panels: MangaPanel[];
  decision: {
    question: string;
    options: MangaDecisionOption[];
  };
  aiMentorDebrief: {
    quote: string;
    explanation: string;
    keyLesson: string;
    ruleOfThumb: string;
  };
  knowledgeCheck?: MangaKnowledgeCheckQuestion;
  saved: boolean;
  source?: 'curated' | 'ai-generated';
}

export interface TopicPerformanceRecord {
  topicId: MangaTopicId;
  name: string;
  icon: string;
  status: 'Weak' | 'Needs Practice' | 'Good' | 'Strong';
  score: number; // 0 - 100
  recentMistakeCount: number;
  reasonForRecommendation: string;
  description: string;
}

export interface StoryReadingProgress {
  comicId: string;
  pageNumber: number; // 0 for cover, 1-5 for panels
  readingMode: 'page' | 'webtoon';
  progressPercent: number; // 0 to 100
  lastReadAt: number;
}
