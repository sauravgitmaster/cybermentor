import React, { useEffect, useMemo, useState } from 'react';
import { PlayerState } from '../../types';
import {
  CyberMangaComic,
  MangaGenreId,
  MangaTopicId,
  StoryReadingProgress,
} from '../../types/manga';
import { detectUserWeakTopics, MANGA_TOPICS } from '../../utils/mangaTopicDetector';
import {
  generateCyberManga,
  loadAllStoryProgress,
  loadSavedMangaLibrary,
  markMangaCompleted,
} from '../../services/mangaService';
import { MangaReader } from './MangaReader';
import { StoryLibrary } from './StoryLibrary';
import { playClickSound, playSuccessSound } from '../../utils/audio';

interface CyberMangaViewProps {
  player: PlayerState;
  onUpdatePlayer: (updated: PlayerState) => void;
  onExitToHome?: () => void;
}

export const CyberMangaView: React.FC<CyberMangaViewProps> = ({
  player,
  onUpdatePlayer,
  onExitToHome,
}) => {
  // Active comic being read (null when in library)
  const [activeComic, setActiveComic] = useState<CyberMangaComic | null>(null);
  const [initialPage, setInitialPage] = useState<number>(0);

  // User Weak Topics Detection for personalized recommendations
  const detectionResult = useMemo(() => detectUserWeakTopics(player), [player]);

  // Library of Saved and Curated Comics
  const [savedComics, setSavedComics] = useState<CyberMangaComic[]>(() =>
    loadSavedMangaLibrary()
  );

  // Reading Progress Map (stored in localStorage)
  const [progressMap, setProgressMap] = useState<Record<string, StoryReadingProgress>>(() =>
    loadAllStoryProgress()
  );

  // Custom AI Generation States
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Refresh saved comics and reading progress on mount
  useEffect(() => {
    setSavedComics(loadSavedMangaLibrary());
    setProgressMap(loadAllStoryProgress());
  }, []);

  // Open a story in reader at a specific page
  const handleOpenStory = (comic: CyberMangaComic, page: number = 0) => {
    setActiveComic(comic);
    setInitialPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Comic Generation with Gemini
  const handleGenerateComic = async (
    targetTopicId: MangaTopicId,
    targetGenreId: MangaGenreId
  ) => {
    playClickSound();
    setIsGenerating(true);
    setGenerationError(null);

    const topicMeta =
      MANGA_TOPICS.find((t) => t.id === targetTopicId) || MANGA_TOPICS[0];
    const weaknessContext =
      detectionResult.topicProfiles.find((p) => p.topicId === targetTopicId)
        ?.reasonForRecommendation || topicMeta.summary;

    try {
      const newComic = await generateCyberManga({
        topicId: targetTopicId,
        genreId: targetGenreId,
        studentName: player.name || 'Ren',
        weaknessContext,
      });

      // Update library state
      const updatedLibrary = loadSavedMangaLibrary();
      setSavedComics(updatedLibrary);
      setProgressMap(loadAllStoryProgress());

      // Open immediately in reader
      handleOpenStory(newComic, 0);
      playSuccessSound();
    } catch (err: any) {
      setGenerationError(
        'Unable to synthesize AI episode. Please select an existing story from the library.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Comic Completion from Reader
  const handleCompleteComic = (
    comicId: string,
    topicId: string,
    trustBonus: number
  ) => {
    markMangaCompleted(comicId);
    setSavedComics(loadSavedMangaLibrary());
    setProgressMap(loadAllStoryProgress());

    // Award Digital Trust and boost proficiency in player skill profile
    const updatedTrust = Math.min(100, (player.digitalTrust || 0) + trustBonus);
    const updatedTrustHistory = [
      ...(player.trustHistory || []),
      {
        id: `trust-story-${Date.now()}`,
        delta: trustBonus,
        reason: `Completed Story Mode Episode: ${topicId.toUpperCase()}`,
        timestamp: Date.now(),
      },
    ];

    const currentProfile = { ...(player.skillProfile || {}) };

    // Dynamically improve domain proficiency
    if (topicId === 'phishing' && currentProfile.phishing !== undefined) {
      currentProfile.phishing = Math.min(100, currentProfile.phishing + 12);
    } else if (
      (topicId === 'privacy' || topicId === 'social-media') &&
      currentProfile.privacy !== undefined
    ) {
      currentProfile.privacy = Math.min(100, currentProfile.privacy + 12);
    } else if (
      (topicId === 'device-security' || topicId === 'wifi') &&
      currentProfile.deviceSecurity !== undefined
    ) {
      currentProfile.deviceSecurity = Math.min(100, currentProfile.deviceSecurity + 12);
    } else if (
      (topicId === 'social-engineering' || topicId === 'ai-deepfakes') &&
      currentProfile.socialEngineering !== undefined
    ) {
      currentProfile.socialEngineering = Math.min(
        100,
        currentProfile.socialEngineering + 12
      );
    }

    const updatedPlayer: PlayerState = {
      ...player,
      digitalTrust: updatedTrust,
      trustHistory: updatedTrustHistory,
      skillProfile: currentProfile as any,
    };

    onUpdatePlayer(updatedPlayer);
  };

  // If a story is active, render the MangaReader
  if (activeComic) {
    return (
      <MangaReader
        comic={activeComic}
        initialPage={initialPage}
        allComics={savedComics}
        onSelectComic={(comic, page) => handleOpenStory(comic, page || 0)}
        onBackToHub={() => {
          setActiveComic(null);
          setSavedComics(loadSavedMangaLibrary());
          setProgressMap(loadAllStoryProgress());
        }}
        onCompleteComic={handleCompleteComic}
        onGenerateAnother={(topicId) => {
          handleGenerateComic(topicId as MangaTopicId, 'thriller');
        }}
      />
    );
  }

  // Otherwise, render the StoryLibrary landing experience
  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-6">
      {generationError && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-950/80 border border-rose-500 text-rose-200 text-xs sm:text-sm font-mono flex items-center justify-between">
          <span>⚠️ {generationError}</span>
          <button
            onClick={() => setGenerationError(null)}
            className="text-rose-400 hover:text-white ml-4 font-bold"
          >
            ✕
          </button>
        </div>
      )}

      <StoryLibrary
        comics={savedComics}
        progressMap={progressMap}
        player={player}
        recommendedTopicId={detectionResult.recommendedTopic.id}
        recommendationReason={detectionResult.reason}
        onOpenStory={handleOpenStory}
        onGenerateCustomStory={handleGenerateComic}
        isGenerating={isGenerating}
      />
    </div>
  );
};
