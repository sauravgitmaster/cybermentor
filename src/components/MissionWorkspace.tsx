import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Users,
  Shield,
  Search,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileSearch,
  Cpu,
} from 'lucide-react';
import {
  MissionData,
  PlayerState,
  DecisionOption,
  InspectableTarget,
  MentorAnalysisResponse,
} from '../types';
import { InvestigationPanel } from './InvestigationPanel';
import { MentorDebrief } from './MentorDebrief';
import { getNextMissionId, MISSIONS } from '../data/missions';
import {
  playClickSound,
  playWarningSound,
  playSuccessSound,
  playTrustChangeSound,
} from '../utils/audio';

interface MissionWorkspaceProps {
  mission: MissionData;
  player: PlayerState;
  onExitMission: () => void;
  onRecordTrustChange: (delta: number, reason: string) => void;
  onUnlockAbility: (abilityId: string) => void;
  onCompleteMission: (missionId: string) => void;
  onAddEvidence: (evidence: any) => void;
  onProceedNextMission?: (nextMissionId: string) => void;
  onUnlockAchievement?: (achId: string) => void;
}

export const MissionWorkspace: React.FC<MissionWorkspaceProps> = ({
  mission,
  player,
  onExitMission,
  onRecordTrustChange,
  onUnlockAbility,
  onCompleteMission,
  onAddEvidence,
  onProceedNextMission,
  onUnlockAchievement,
}) => {
  const [stage, setStage] = useState<
    'briefing' | 'investigation' | 'decision' | 'consequence' | 'debrief'
  >('briefing');

  const [inspectedTargetIds, setInspectedTargetIds] = useState<string[]>([]);
  const [selectedEvidenceClues, setSelectedEvidenceClues] = useState<string[]>([]);
  const [chosenDecision, setChosenDecision] = useState<DecisionOption | null>(null);
  const [mentorFeedback, setMentorFeedback] =
    useState<MentorAnalysisResponse | null>(null);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState<boolean>(false);
  const [unlockedAbilityData, setUnlockedAbilityData] = useState<{
    name: string;
    description: string;
    command: string;
  } | null>(null);

  // Cleanly reset workspace state whenever mission switches
  useEffect(() => {
    setStage('briefing');
    setInspectedTargetIds([]);
    setSelectedEvidenceClues([]);
    setChosenDecision(null);
    setMentorFeedback(null);
    setIsLoadingFeedback(false);
    setUnlockedAbilityData(null);
  }, [mission.id]);

  const nextMissionId = getNextMissionId(mission.id, player.completedMissions);
  const nextMission = nextMissionId ? MISSIONS[nextMissionId] : null;

  const handleTargetInspected = (target: InspectableTarget) => {
    if (!inspectedTargetIds.includes(target.id)) {
      setInspectedTargetIds((prev) => [...prev, target.id]);

      if (target.revealedDetail.evidenceYielded) {
        onAddEvidence({
          ...target.revealedDetail.evidenceYielded,
          missionId: mission.id,
          timestamp: Date.now(),
        });
      }
    }
  };

  const toggleEvidenceClue = (clueId: string) => {
    playClickSound();
    setSelectedEvidenceClues((prev) =>
      prev.includes(clueId) ? prev.filter((id) => id !== clueId) : [...prev, clueId]
    );
  };

  const handleSelectDecision = async (decision: DecisionOption) => {
    setChosenDecision(decision);

    if (decision.trustChange > 0) {
      playSuccessSound();
      playTrustChangeSound(true);
    } else {
      playWarningSound();
      playTrustChangeSound(false);
    }

    // Record trust delta in player state
    onRecordTrustChange(
      decision.trustChange,
      `${mission.title}: ${decision.label.slice(0, 48)}...`
    );

    // Evidence Expert Bonus: if defensive choice AND operative selected corroborating clues
    let evidenceBonusAwarded = false;
    if (decision.isOptimal && selectedEvidenceClues.length > 0) {
      evidenceBonusAwarded = true;
      onRecordTrustChange(5, `Forensic Corroboration Bonus: ${selectedEvidenceClues.length} indicators cited`);
      if (onUnlockAchievement) {
        onUnlockAchievement('ach-evidence-expert');
      }
    }

    // If defensive/optimal, unlock reward ability
    if (decision.isOptimal && mission.rewardAbility) {
      onUnlockAbility(mission.rewardAbility.id);
      setUnlockedAbilityData({
        name: mission.rewardAbility.name,
        description: mission.rewardAbility.description,
        command: mission.rewardAbility.command,
      });
    }

    // Mark mission completed in player state
    onCompleteMission(mission.id);

    // Trigger Consequence stage first so player experiences the outcome
    setStage('consequence');

    // Request AI Mentor Analysis asynchronously
    setIsLoadingFeedback(true);
    try {
      const res = await fetch('/api/mentor/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          missionId: mission.id,
          missionTitle: mission.title,
          location: mission.locationId,
          evidenceCollected: inspectedTargetIds,
          supportingEvidenceSelected: selectedEvidenceClues,
          evidenceBonusAwarded,
          chosenAction: decision,
          isCorrect: decision.isOptimal,
          trustChange: decision.trustChange,
          playerTrust: player.digitalTrust + decision.trustChange + (evidenceBonusAwarded ? 5 : 0),
          playerLevel: player.level,
          skillProfile: player.skillProfile,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMentorFeedback(data);
      } else {
        throw new Error('Fallback response');
      }
    } catch {
      // Deterministic fallback if API fails
      setMentorFeedback({
        evaluation: decision.isOptimal
          ? 'You demonstrated disciplined forensic verification. Investigating the sender domain and payload extension prevented credential theft and workstation compromise.'
          : 'You reacted to the attacker\'s artificial urgency without thorough verification. Executing untrusted files or visiting raw IP destinations bypasses foundational security perimeters.',
        securityPrinciple: decision.isOptimal
          ? 'Zero Trust in External Transmissions & Executable Extension Awareness'
          : 'The Principle of Suspicion & Payload Isolation',
        mentorVoice: decision.isOptimal
          ? 'Sharp eye. Panic was their weapon; patience and verification was yours.'
          : 'A painful lesson, but safe in our sandbox. Urgency is the attacker\'s best disguise.',
        personalizedPattern: evidenceBonusAwarded
          ? `You cited ${selectedEvidenceClues.length} concrete technical indicator${selectedEvidenceClues.length > 1 ? 's' : ''}. Grounding decisions in documented forensics is the core of effective cyber defense.`
          : 'Notice whether artificial urgency influenced your reaction. Always pause to examine the file extension and sender domain.',
        realWorldDefense:
          'Never verify credentials through links sent in unexpected emails; navigate independently to the verified organization portal.',
        adaptiveRecommendation: 'Proceed to the next perimeter investigation.',
      });
    } finally {
      setIsLoadingFeedback(false);
    }
  };

  return (
    <div id="mission-workspace-container" className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      {/* Top Breadcrumb & Status */}
      <div className="mb-6 flex items-center justify-between border-b border-[#1b2332] pb-3">
        <button
          id="exit-mission-btn"
          onClick={() => {
            playClickSound();
            onExitMission();
          }}
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>[ABORT / RETURN TO SECTOR]</span>
        </button>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-slate-400">PHASE:</span>
          <span className="rounded bg-[#131924] px-2 py-0.5 text-cyan-300 font-bold border border-cyan-900/50 uppercase">
            {stage}
          </span>
        </div>
      </div>

      {/* PHASE 1: SITUATION & ENCOUNTER BRIEFING */}
      {stage === 'briefing' && (
        <div className="space-y-6">
          {/* Mission Header */}
          <div className="rounded-xl border border-[#1e2739] bg-[#0d121c] p-6 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>{mission.code}</span>
              <span>•</span>
              <span className="uppercase">{mission.threatCategory}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
              {mission.title}
            </h1>
            <div className="text-xs font-mono text-slate-400 mb-4">
              FOCUS // {mission.concept}
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {mission.briefing.situation}
            </p>

            {/* NPC Dialogue Box */}
            <div className="rounded-lg border border-[#222c40] bg-[#111624] p-4 flex items-start gap-3">
              <div className="rounded p-2 bg-[#182133] text-cyan-400 border border-cyan-800/40 shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <span>{mission.npc.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    ({mission.npc.role})
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-cyan-200/90 leading-relaxed italic">
                  {mission.briefing.npcDialogue}
                </p>
              </div>
            </div>
          </div>

          {/* Action to start investigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-[#1b2332] bg-[#0c1017] p-4">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <Shield className="h-4 w-4 text-cyan-400" />
              <span>{mission.briefing.objective}</span>
            </div>

            <button
              id="start-investigation-btn"
              onClick={() => {
                playClickSound();
                setStage('investigation');
              }}
              className="w-full sm:w-auto rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-2.5 text-xs font-bold shadow transition-all flex items-center justify-center gap-2"
            >
              <Search className="h-4 w-4" />
              <span>LAUNCH INVESTIGATION WORKSPACE</span>
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2: ACTIVE INVESTIGATION */}
      {stage === 'investigation' && (
        <div className="space-y-6">
          <InvestigationPanel
            mission={mission}
            player={player}
            inspectedTargetIds={inspectedTargetIds}
            onTargetInspected={handleTargetInspected}
            onProceedToDecision={() => {
              playClickSound();
              setStage('decision');
            }}
          />

          {/* Bottom Sticky Action Bar */}
          <div className="flex items-center justify-between rounded-lg border border-[#1c2436] bg-[#0c1018] p-4">
            <div className="text-xs font-mono text-slate-400">
              Discovered{' '}
              <strong className="text-cyan-300">{inspectedTargetIds.length}</strong> of{' '}
              {mission.investigationWorkspace.targets.length} technical indicators
            </div>

            <button
              id="proceed-to-decision-bottom-btn"
              onClick={() => {
                playClickSound();
                setStage('decision');
              }}
              className="rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-2 text-xs font-bold shadow transition-all"
            >
              READY TO DECIDE
            </button>
          </div>
        </div>
      )}

      {/* PHASE 3: DECISION PHASE */}
      {stage === 'decision' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-[#1e2739] bg-[#0d121c] p-6 shadow-xl">
            <div className="text-xs font-mono uppercase text-cyan-400 mb-1">
              DECISION PHASE // EVIDENCE ASSESSMENT
            </div>
            <h2 className="text-xl font-bold text-slate-100 mb-2">
              What course of action do you recommend?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              You have gathered evidence from the scenario. Consider the indicators of
              compromise, psychological coercion hooks, and institutional security protocols
              before choosing your response.
            </p>

            {/* Evidence-Based Corroboration: What evidence supports your decision? */}
            <div className="rounded-xl border border-cyan-800/60 bg-[#09111e] p-4 mb-6">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  <span>WHAT EVIDENCE SUPPORTS YOUR DECISION? (CORROBORATION)</span>
                </div>
                {selectedEvidenceClues.length > 0 && (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
                    +5 Trust Forensic Bonus Active
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mb-3 font-sans leading-relaxed">
                Check the specific technical indicators and red flags you identified that justify your choice:
              </p>

              {mission.investigationWorkspace.targets.length === 0 ? (
                <div className="text-xs text-slate-500 font-mono italic">
                  No explicit targets in this perimeter.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {mission.investigationWorkspace.targets.map((target) => {
                    const isChecked = selectedEvidenceClues.includes(target.id);
                    const wasInspected = inspectedTargetIds.includes(target.id);
                    return (
                      <button
                        type="button"
                        key={target.id}
                        id={`evidence-check-${target.id}`}
                        onClick={() => toggleEvidenceClue(target.id)}
                        className={`text-left rounded-lg p-2.5 border transition-all text-xs font-mono flex items-start gap-2.5 cursor-pointer ${
                          isChecked
                            ? 'border-cyan-400 bg-cyan-950/50 text-cyan-200'
                            : wasInspected
                            ? 'border-slate-700/80 bg-[#0d1522] text-slate-300 hover:border-slate-500'
                            : 'border-slate-800 bg-slate-900/40 text-slate-500'
                        }`}
                      >
                        <div
                          className={`h-4 w-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                            isChecked
                              ? 'border-cyan-400 bg-cyan-500 text-slate-950'
                              : 'border-slate-600 bg-slate-800'
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="h-3 w-3 stroke-[3]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold truncate">{target.label}</div>
                          <div className="text-[10px] text-slate-400 line-clamp-1">
                            {target.revealedDetail.evidenceYielded?.title || target.hint}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Decision Choices */}
            <div className="space-y-3">
              {mission.decisions.map((opt) => (
                <button
                  key={opt.id}
                  id={`decision-btn-${opt.id}`}
                  onClick={() => handleSelectDecision(opt)}
                  className="w-full text-left rounded-lg border border-[#212b3e] bg-[#111724] p-4 hover:border-cyan-500 hover:bg-[#151d2d] transition-all group focus:outline-none"
                >
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <span className="text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {opt.label}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 rounded bg-[#16202e] px-2 py-0.5 border border-[#232f44]">
                      ACTION
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {opt.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              setStage('investigation');
            }}
            className="text-xs font-mono text-slate-400 hover:text-cyan-300"
          >
            &lt; Return to Workspace to inspect more evidence
          </button>
        </div>
      )}

      {/* PHASE 4: CONSEQUENCE & WORLD RESPONSE */}
      {stage === 'consequence' && chosenDecision && (
        <div className="space-y-6">
          <div
            className={`rounded-xl border p-6 shadow-2xl relative overflow-hidden ${
              chosenDecision.screenEffect === 'clean'
                ? 'border-emerald-800/80 bg-[#0c1517]'
                : 'border-rose-800/80 bg-[#160d13]'
            }`}
          >
            <div className="flex items-center gap-3 border-b border-[#1f2735] pb-4 mb-4">
              <div
                className={`p-2 rounded ${
                  chosenDecision.screenEffect === 'clean'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-rose-950 text-rose-400 border border-rose-800 animate-pulse'
                }`}
              >
                {chosenDecision.screenEffect === 'clean' ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : (
                  <AlertTriangle className="h-6 w-6" />
                )}
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  INCIDENT RESPONSE TELEMETRY
                </div>
                <h2 className="text-xl font-bold text-slate-100">
                  {chosenDecision.screenEffect === 'clean'
                    ? 'Perimeter Intact: Threat Neutralized'
                    : 'Security Compromise Tripped'}
                </h2>
              </div>
            </div>

            {/* Consequence narrative */}
            <div className="space-y-4">
              <div className="rounded bg-[#090c12] p-4 font-mono text-xs text-slate-300 border border-[#1b2230]">
                <div className="text-[10px] text-slate-400 uppercase mb-1">
                  Immediate Environmental Reaction:
                </div>
                <div className="text-cyan-300 font-semibold mb-2">
                  {chosenDecision.immediateReaction}
                </div>
                <div className="text-slate-300 leading-relaxed">
                  {chosenDecision.consequenceText}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                id="view-mentor-debrief-btn"
                onClick={() => {
                  playClickSound();
                  setStage('debrief');
                }}
                className="rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-2.5 text-xs font-bold shadow transition-all flex items-center gap-2"
              >
                <Cpu className="h-4 w-4" />
                <span>RECEIVE CYBERMENTOR AI ANALYSIS</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 5: MENTOR DEBRIEF & LEARNING UNLOCKS */}
      {stage === 'debrief' && chosenDecision && (
        <MentorDebrief
          mission={mission}
          player={player}
          chosenDecision={chosenDecision}
          mentorFeedback={mentorFeedback}
          isLoadingFeedback={isLoadingFeedback}
          unlockedAbility={unlockedAbilityData}
          nextMissionCode={nextMission?.code}
          onReturnToWorld={onExitMission}
          onProceedNextMission={
            nextMissionId && onProceedNextMission
              ? () => onProceedNextMission(nextMissionId)
              : undefined
          }
        />
      )}
    </div>
  );
};
