import React, { useId, useState } from 'react';
import { InterviewStep, CandidateInStep } from '../../types/position.types';
import CandidateCard from './CandidateCard';

const DROP_ZONE_BASE: React.CSSProperties = {
  minHeight: 80,
  borderRadius: 6,
  transition: 'background-color 0.15s ease',
};

interface KanbanColumnProps {
  step: InterviewStep;
  allSteps: InterviewStep[];
  candidates: CandidateInStep[];
  onDrop: (
    candidateId: number,
    applicationId: number,
    fromStepName: string,
    toStepId: number,
    toStepName: string
  ) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ step, allSteps, candidates, onDrop }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const headingId = useId();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const candidateId = Number(e.dataTransfer.getData('candidateId'));
    const applicationId = Number(e.dataTransfer.getData('applicationId'));
    const fromStepName = e.dataTransfer.getData('fromStepName');
    onDrop(candidateId, applicationId, fromStepName, step.id, step.name);
  };

  const dropZoneStyle: React.CSSProperties = {
    ...DROP_ZONE_BASE,
    border: candidates.length === 0 ? '2px dashed #dee2e6' : 'none',
    backgroundColor: isDragOver ? '#e8f4fd' : 'transparent',
  };

  return (
    <section aria-labelledby={headingId} style={{ minWidth: 220, flex: '1 1 220px' }}>
      <div
        id={headingId}
        className="p-2 mb-2 rounded fw-bold text-center"
        style={{ backgroundColor: '#f0f4f8', fontSize: '0.9rem' }}
      >
        {step.name}
        <span className="ms-2 badge bg-secondary" aria-label={`${candidates.length} candidatos`}>
          {candidates.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={dropZoneStyle}
        className="p-1"
      >
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.applicationId}
            candidate={candidate}
            allSteps={allSteps}
            onMoveToStep={(toStepId, toStepName) => {
              if (candidate.currentInterviewStep === toStepName) return;
              onDrop(
                candidate.id,
                candidate.applicationId,
                candidate.currentInterviewStep,
                toStepId,
                toStepName
              );
            }}
          />
        ))}
        {candidates.length === 0 && (
          <div className="text-center text-muted py-3" style={{ fontSize: '0.8rem' }}>
            Sin candidatos
          </div>
        )}
      </div>
    </section>
  );
};

export default KanbanColumn;
