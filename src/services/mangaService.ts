import { CyberMangaComic, MangaGenreId, MangaTopicId, StoryReadingProgress } from '../types/manga';
import { CURATED_MANGA_EPISODES } from '../data/curatedManga';
import { MANGA_TOPICS } from '../utils/mangaTopicDetector';
import { MANGA_GENRES } from '../data/mangaGenres';

const MANGA_STORAGE_KEY = 'cybermentor_saved_manga_v1';
const COMPLETED_IDS_KEY = 'cybermentor_completed_manga_ids_v1';
const STORY_PROGRESS_KEY = 'cybermentor_story_reading_progress_v1';

export function loadAllStoryProgress(): Record<string, StoryReadingProgress> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORY_PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function loadStoryProgress(comicId: string): StoryReadingProgress | null {
  const all = loadAllStoryProgress();
  return all[comicId] || null;
}

export function saveStoryProgress(progress: StoryReadingProgress) {
  if (typeof window === 'undefined') return;
  try {
    const all = loadAllStoryProgress();
    all[progress.comicId] = {
      ...progress,
      lastReadAt: Date.now(),
    };
    localStorage.setItem(STORY_PROGRESS_KEY, JSON.stringify(all));
  } catch {}
}

export function clearStoryProgress(comicId: string) {
  if (typeof window === 'undefined') return;
  try {
    const all = loadAllStoryProgress();
    delete all[comicId];
    localStorage.setItem(STORY_PROGRESS_KEY, JSON.stringify(all));
  } catch {}
}

export function loadSavedMangaLibrary(): CyberMangaComic[] {
  if (typeof window === 'undefined') return CURATED_MANGA_EPISODES;

  try {
    const raw = localStorage.getItem(MANGA_STORAGE_KEY);
    const completedRaw = localStorage.getItem(COMPLETED_IDS_KEY);
    const completedIds: string[] = completedRaw ? JSON.parse(completedRaw) : [];

    let savedComics: CyberMangaComic[] = [];
    if (raw) {
      savedComics = JSON.parse(raw);
    }

    // Merge curated episodes if not already present
    const existingIds = new Set(savedComics.map((c) => c.id));
    const merged = [...savedComics];

    CURATED_MANGA_EPISODES.forEach((curated) => {
      if (!existingIds.has(curated.id)) {
        merged.push(curated);
      }
    });

    // Sync completion status
    merged.forEach((comic) => {
      if (completedIds.includes(comic.id)) {
        comic.completed = true;
      }
    });

    return merged;
  } catch {
    return CURATED_MANGA_EPISODES;
  }
}

export function saveMangaToLibrary(comic: CyberMangaComic) {
  if (typeof window === 'undefined') return;
  try {
    const current = loadSavedMangaLibrary();
    const index = current.findIndex((c) => c.id === comic.id);
    if (index >= 0) {
      current[index] = comic;
    } else {
      current.unshift(comic);
    }
    localStorage.setItem(MANGA_STORAGE_KEY, JSON.stringify(current));
  } catch {}
}

export function markMangaCompleted(comicId: string) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(COMPLETED_IDS_KEY);
    const completedIds: string[] = raw ? JSON.parse(raw) : [];
    if (!completedIds.includes(comicId)) {
      completedIds.push(comicId);
      localStorage.setItem(COMPLETED_IDS_KEY, JSON.stringify(completedIds));
    }

    // Update in saved library too
    const library = loadSavedMangaLibrary();
    const comic = library.find((c) => c.id === comicId);
    if (comic) {
      comic.completed = true;
      saveMangaToLibrary(comic);
    }

    saveStoryProgress({
      comicId,
      pageNumber: 5,
      readingMode: 'webtoon',
      progressPercent: 100,
      lastReadAt: Date.now(),
    });
  } catch {}
}

export async function generateCyberManga(params: {
  topicId: MangaTopicId;
  genreId: MangaGenreId;
  studentName?: string;
  weaknessContext?: string;
  customPrompt?: string;
}): Promise<CyberMangaComic> {
  const topicMeta = MANGA_TOPICS.find((t) => t.id === params.topicId) || MANGA_TOPICS[0];
  const genreMeta = MANGA_GENRES.find((g) => g.id === params.genreId) || MANGA_GENRES[0];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

    const res = await fetch('/api/manga/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        topicId: params.topicId,
        topicLabel: topicMeta.name,
        genreId: params.genreId,
        genreLabel: genreMeta.name,
        studentName: params.studentName || 'Ren',
        weaknessContext: params.weaknessContext || topicMeta.summary,
        customPrompt: params.customPrompt || '',
      }),
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.comic) {
        saveMangaToLibrary(data.comic);
        return data.comic;
      }
    }
  } catch {
    // Network or timeout: fallback to existing curated or synthetic
  }

  // Check if we have a curated episode for this topic
  const matchingCurated = CURATED_MANGA_EPISODES.find(
    (c) => c.topicId === params.topicId && c.genreId === params.genreId
  ) || CURATED_MANGA_EPISODES.find((c) => c.topicId === params.topicId);

  if (matchingCurated) {
    const clone: CyberMangaComic = {
      ...matchingCurated,
      id: `manga-curated-${params.topicId}-${Date.now()}`,
      createdAt: Date.now(),
      completed: false,
    };
    saveMangaToLibrary(clone);
    return clone;
  }

  // Generate synthetic instant comic
  const synthetic: CyberMangaComic = {
    id: `manga-local-${Date.now()}`,
    title: `THE ${topicMeta.name.toUpperCase()} RECKONING`,
    topicId: params.topicId,
    topicLabel: topicMeta.name,
    genreId: params.genreId,
    genreLabel: genreMeta.name,
    concept: `Mastering defensive instincts in ${topicMeta.name}`,
    summary: `A ${genreMeta.name.toLowerCase()} story teaching key ${topicMeta.name.toLowerCase()} concepts through interactive decision making.`,
    createdAt: Date.now(),
    completed: false,
    protagonistName: params.studentName || 'Ren',
    panels: [
      {
        panelNumber: 1,
        panelType: 'story',
        title: 'SCENE 1 // THE SCENE SETTING',
        sceneDescription: `${params.studentName || 'Ren'} is in the university student union working on a group presentation.`,
        visualTone: 'school-life' as any,
        soundEffect: 'CHATTER... KEYBOARD CLACKS',
        characterAction: `${params.studentName || 'Ren'} adjusts their headphones while reviewing study notes.`,
        dialogue: [
          { speaker: params.studentName || 'Ren', role: 'student', text: 'Almost done with midterms. Time for a quick break.', bubbleType: 'speech' },
        ],
        artSvgVariant: 'screen-urgency',
      },
      {
        panelNumber: 2,
        panelType: 'problem',
        title: 'SCENE 2 // THE SUSPICIOUS PROMPT',
        sceneDescription: `A sudden notification requests immediate action regarding ${topicMeta.name.toLowerCase()}.`,
        visualTone: 'speed-lines',
        soundEffect: 'PING!! PRIORITY WARNING',
        characterAction: 'The student looks startled by the abrupt demand.',
        dialogue: [
          { speaker: 'Unknown Prompt', role: 'adversary', text: `URGENT: Your account credentials require verification now!`, bubbleType: 'shout' },
          { speaker: params.studentName || 'Ren', role: 'student', text: 'Wait, why is this requesting my password outside official channels?', bubbleType: 'thought' },
        ],
        artSvgVariant: 'screen-urgency',
      },
      {
        panelNumber: 3,
        panelType: 'clue',
        title: 'SCENE 3 // THE FORENSIC TELL',
        sceneDescription: 'CyberMentor AI projects a glowing holographic lens over the message metadata.',
        visualTone: 'sleuth-tint',
        soundEffect: 'ZOOM... CLUE HIGHLIGHTED',
        characterAction: 'CyberMentor AI circles the mismatched headers and anomalous domain.',
        dialogue: [
          { speaker: 'CyberMentor AI', role: 'mentor', text: 'Notice how the destination URL does not match the authentic organization certificate.', bubbleType: 'hologram' },
        ],
        clueOverlay: {
          label: 'DISCREPANCY DETECTED',
          text: `Destination does not match verified security records for ${topicMeta.name}.`,
          type: 'critical',
        },
        artSvgVariant: 'investigate-lens',
      },
      {
        panelNumber: 4,
        panelType: 'tension',
        title: 'SCENE 4 // ESCALATING STAKES',
        sceneDescription: 'A timer counts down rapidly as pressure builds to respond.',
        visualTone: 'dramatic-shadow',
        soundEffect: 'BA-DUMP! BA-DUMP!',
        characterAction: 'The student hesitates with hand poised over the keyboard.',
        dialogue: [
          { speaker: params.studentName || 'Ren', role: 'student', text: 'If I ignore it, what happens? If I comply, could I get breached?!', bubbleType: 'thought' },
          { speaker: 'CyberMentor AI', role: 'mentor', text: 'Pressure is intentional. Stand firm in your verification protocol.', bubbleType: 'hologram' },
        ],
        artSvgVariant: 'panic-sweat',
      },
      {
        panelNumber: 5,
        panelType: 'decision',
        title: 'SCENE 5 // WHAT WOULD YOU DO?',
        sceneDescription: 'Monochrome high-contrast manga panel. The reader must make the critical choice.',
        visualTone: 'dramatic-shadow',
        soundEffect: 'DODON!!',
        characterAction: 'The character looks outward to the user.',
        dialogue: [
          { speaker: 'Narrator', role: 'narrator', text: 'What is your tactical defense action?', bubbleType: 'speech' },
        ],
        artSvgVariant: 'decision-split',
      },
      {
        panelNumber: 6,
        panelType: 'consequence',
        title: 'SCENE 6 // THE CONFLICT RESOLUTION',
        sceneDescription: 'Defensive shields deflect the unauthorized intrusion attempt.',
        visualTone: 'alert-glow',
        soundEffect: 'FIREWALL DEFLECT!!',
        characterAction: 'A green security perimeter surrounds the workstation.',
        dialogue: [
          { speaker: params.studentName || 'Ren', role: 'student', text: 'Verified independently. The scam had zero power once I checked!', bubbleType: 'speech' },
          { speaker: 'CyberMentor AI', role: 'mentor', text: 'Threat neutralized. Clean execution of cyber discipline.', bubbleType: 'hologram' },
        ],
        artSvgVariant: 'shield-active',
      },
      {
        panelNumber: 7,
        panelType: 'mentor',
        title: 'SCENE 7 // CYBERMENTOR DEBRIEF',
        sceneDescription: 'CyberMentor AI reviews the attack vector anatomy.',
        visualTone: 'cyber-grid',
        soundEffect: 'DIAGNOSTIC COMPLETE',
        characterAction: 'CyberMentor AI presents the core lesson.',
        dialogue: [
          { speaker: 'CyberMentor AI', role: 'mentor', text: `Always remember: ${topicMeta.keyRule}`, bubbleType: 'hologram' },
        ],
        artSvgVariant: 'mentor-hologram',
      },
      {
        panelNumber: 8,
        panelType: 'principle',
        title: 'SCENE 8 // GOLDEN PRINCIPLE',
        sceneDescription: 'Golden stylized kanji scroll reveals the takeaway principle.',
        visualTone: 'speed-lines',
        soundEffect: 'TAKEAWAY LOCKED',
        characterAction: 'Thumbs up from the operative and mentor.',
        dialogue: [
          { speaker: 'Narrator', role: 'narrator', text: 'RULE OF THUMB: PAUSE → INSPECT → VERIFY OUT-OF-BAND!', bubbleType: 'shout' },
        ],
        artSvgVariant: 'wisdom-scroll',
      },
    ],
    decision: {
      question: `How should you respond to this unexpected ${topicMeta.name} situation?`,
      options: [
        {
          id: 'A',
          label: 'Click the link immediately to prevent potential account suspension.',
          description: 'Follow the instructions right away to avoid missing the deadline.',
          isCorrect: false,
          consequenceTitle: 'CREDENTIAL EXPOSURE',
          consequenceReaction: '⚠️ BREACHED',
          consequenceText: `Complying with the unverified prompt compromised sensitive credentials.`,
          mentorCritique: 'Urgency was used to bypass your security scrutiny. Never rush.',
        },
        {
          id: 'B',
          label: 'Pause, examine the destination URL, and verify through an independent channel.',
          description: 'Do not use the provided link; check the authentic status directly.',
          isCorrect: true,
          consequenceTitle: 'OPTIMAL ZERO-TRUST VERIFICATION',
          consequenceReaction: '🛡️ DEFENSE CONFIRMED',
          consequenceText: `By verifying independently, the fraudulent attempt was flagged and thwarted.`,
          mentorCritique: 'Outstanding instincts! Independent verification prevents exploitation.',
        },
        {
          id: 'C',
          label: 'Reply back to the sender asking if they are legitimate.',
          description: 'Ask the unverified sender for proof.',
          isCorrect: false,
          consequenceTitle: 'CONFIRMING TO THE ATTACKER',
          consequenceReaction: '🎭 CIRCULAR TRAP',
          consequenceText: `The attacker supplied false reassurance, prolonging the deception.`,
          mentorCritique: 'Never ask the threat actor to authenticate themselves.',
        },
        {
          id: 'D',
          label: 'Forward the message to your friends to see what they think.',
          description: 'Share the unverified threat bait with peers.',
          isCorrect: false,
          consequenceTitle: 'UNNECESSARY PANIC',
          consequenceReaction: '📢 SOCIAL SPREAD',
          consequenceText: `Forwarding spread panic without containing the issue.`,
          mentorCritique: 'Report to security teams rather than propagating unverified alarms.',
        },
      ],
    },
    aiMentorDebrief: {
      quote: 'When someone tries to rush you, time is their weapon—not your emergency.',
      explanation: topicMeta.summary,
      keyLesson: 'Pause → Inspect → Verify',
      ruleOfThumb: topicMeta.keyRule,
    },
    knowledgeCheck: {
      id: `kc-synth-${Date.now()}`,
      question: `What is the single most important rule when facing unexpected ${topicMeta.name} urgency?`,
      options: [
        {
          id: 'opt-1',
          text: 'Verify the request through an independent official channel before taking action.',
          isCorrect: true,
          explanation: 'Independent verification breaks the attacker’s manufactured urgency trap.',
        },
        {
          id: 'opt-2',
          text: 'Act within 60 seconds to avoid penalties.',
          isCorrect: false,
          explanation: 'Artificial deadlines are a psychological manipulation tactic.',
        },
        {
          id: 'opt-3',
          text: 'Ignore all digital security warnings forever.',
          isCorrect: false,
          explanation: 'Ignoring warnings is unsafe; active verification is required.',
        },
      ],
    },
    saved: true,
    source: 'curated',
  };

  saveMangaToLibrary(synthetic);
  return synthetic;
}
