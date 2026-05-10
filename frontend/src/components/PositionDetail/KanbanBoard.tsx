import React from 'react';
import { InterviewStep, CandidatesByStep } from '../../types/position.types';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  steps: InterviewStep[];
  candidatesByStep: CandidatesByStep;
  onDrop: (
    candidateId: number,
    applicationId: number,
    fromStepName: string,
    toStepId: number,
    toStepName: string
  ) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ steps, candidatesByStep, onDrop }) => {
  return (
    <>
      <p id="kanban-a11y-hint" className="visually-hidden">
        Puedes cambiar la fase de un candidato arrastrando su tarjeta a otra columna, o usando el
        menú &quot;Mover a fase&quot; dentro de cada tarjeta.
      </p>
      <div
        className="d-flex flex-column flex-md-row gap-3"
        style={{ overflowX: 'auto', alignItems: 'flex-start' }}
        role="group"
        aria-label="Candidatos por fase del proceso"
        aria-describedby="kanban-a11y-hint"
      >
        {steps.map((step) => (
          <KanbanColumn
            key={step.id}
            step={step}
            allSteps={steps}
            candidates={candidatesByStep[step.name] ?? []}
            onDrop={onDrop}
          />
        ))}
      </div>
    </>
  );
};

export default KanbanBoard;
