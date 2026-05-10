import { useCallback, useEffect, useState } from 'react';
import { getInterviewFlow, getCandidates, updateStage } from '../services/positionService';
import type {
  InterviewStep,
  CandidateInStep,
  CandidatesByStep,
} from '../types/position.types';

function buildCandidatesByStep(
  sortedSteps: InterviewStep[],
  candidates: CandidateInStep[]
): CandidatesByStep {
  const map: CandidatesByStep = {};
  sortedSteps.forEach((step) => {
    map[step.name] = [];
  });
  candidates.forEach((candidate) => {
    if (map[candidate.currentInterviewStep] !== undefined) {
      map[candidate.currentInterviewStep].push(candidate);
    }
  });
  return map;
}

export function usePositionKanban(positionId: number) {
  const [positionName, setPositionName] = useState('');
  const [steps, setSteps] = useState<InterviewStep[]>([]);
  const [candidatesByStep, setCandidatesByStep] = useState<CandidatesByStep>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dropError, setDropError] = useState<string | null>(null);

  useEffect(() => {
    if (Number.isNaN(positionId)) {
      setLoading(false);
      setError('Identificador de posición no válido.');
      return;
    }
    let cancelled = false;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [flowData, candidatesData] = await Promise.all([
          getInterviewFlow(positionId),
          getCandidates(positionId),
        ]);

        if (cancelled) return;

        const sortedSteps = [...flowData.interviewFlow.interviewSteps].sort(
          (a, b) => a.orderIndex - b.orderIndex
        );
        setPositionName(flowData.positionName);
        setSteps(sortedSteps);
        setCandidatesByStep(buildCandidatesByStep(sortedSteps, candidatesData));
      } catch (err) {
        if (cancelled) return;
        console.error('Error loading position data:', err);
        setError(
          'No se pudo cargar la información de la posición. Verifica que el backend está corriendo.'
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadData();
    return () => {
      cancelled = true;
    };
  }, [positionId]);

  const moveCandidate = useCallback(
    async (
      candidateId: number,
      applicationId: number,
      fromStepName: string,
      toStepId: number,
      toStepName: string
    ) => {
      if (fromStepName === toStepName) return;
      setDropError(null);

      const snapshot: CandidatesByStep = { ...candidatesByStep };
      Object.keys(snapshot).forEach((key) => {
        snapshot[key] = [...snapshot[key]];
      });

      const movedCandidate = candidatesByStep[fromStepName]?.find((c) => c.id === candidateId);
      if (!movedCandidate) return;

      const updated = { ...candidatesByStep };
      updated[fromStepName] = updated[fromStepName].filter((c) => c.id !== candidateId);
      updated[toStepName] = [
        ...updated[toStepName],
        { ...movedCandidate, currentInterviewStep: toStepName },
      ];
      setCandidatesByStep(updated);

      try {
        await updateStage(candidateId, applicationId, toStepId);
      } catch (e) {
        console.error('Error updating candidate stage:', e);
        setCandidatesByStep(snapshot);
        setDropError('No se pudo actualizar la etapa del candidato. Inténtalo de nuevo.');
      }
    },
    [candidatesByStep]
  );

  return {
    positionName,
    steps,
    candidatesByStep,
    loading,
    error,
    dropError,
    setDropError,
    moveCandidate,
  };
}
