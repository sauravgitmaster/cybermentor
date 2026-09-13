import { MangaGenreId, MangaGenreMeta } from '../types/manga';

export const MANGA_GENRES: MangaGenreMeta[] = [
  {
    id: 'comedy',
    name: 'Comedy',
    icon: '😂',
    tagline: 'Make the concept funny and memorable.',
    atmosphere: 'High-energy, exaggerated anime reactions, sweat drops, and comedic panic.',
    tonePrompt: 'Write with energetic comedic timing, dramatic sweat drops, oversized visual reactions, and funny student misunderstandings.',
  },
  {
    id: 'thriller',
    name: 'Thriller',
    icon: '⚡',
    tagline: 'Make the situation tense and suspenseful.',
    atmosphere: 'High stakes, ticking countdown timers, heavy shadows, and racing heartbeats.',
    tonePrompt: 'Write with gripping suspense, dramatic shadows, heightened stakes, and urgent countdowns that keep the reader on the edge of their seat.',
  },
  {
    id: 'mystery',
    name: 'Mystery',
    icon: '🔍',
    tagline: 'Make the student solve clues to understand the threat.',
    atmosphere: 'Subtle clues hidden in plain sight, magnifying lens focus, and puzzle-solving revelations.',
    tonePrompt: 'Write like a classic sleuth mystery where forensic clues, metadata breadcrumbs, and subtle discrepancies must be pieced together.',
  },
  {
    id: 'drama',
    name: 'Drama',
    icon: '🎭',
    tagline: 'Focus on the consequences of the decision.',
    atmosphere: 'Emotional weight, interpersonal trust, peer accountability, and academic pressure.',
    tonePrompt: 'Write with emotional depth, focusing on interpersonal trust between classmates, team project stakes, and the real human cost of a breach.',
  },
  {
    id: 'school-life',
    name: 'School Life',
    icon: '🏫',
    tagline: 'Set the situation in a relatable student environment.',
    atmosphere: 'Campus coffee shops, library study sessions, dorm room banter, and midterm crunches.',
    tonePrompt: 'Write in a relatable, vibrant campus setting with realistic student dialogue, group project stress, campus cafeteria gossip, and relatable deadlines.',
  },
  {
    id: 'detective',
    name: 'Detective',
    icon: '🕵️',
    tagline: 'Let the student investigate clues before discovering the threat.',
    atmosphere: 'Noir lighting, magnifying glasses, file folders, and meticulous forensic deduction.',
    tonePrompt: 'Write in a sharp detective procedural style with evidence logs, suspect motives, forensic timeline checks, and dramatic deduction reveals.',
  },
];
