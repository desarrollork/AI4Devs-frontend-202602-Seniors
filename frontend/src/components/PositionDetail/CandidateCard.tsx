import React from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import { CandidateInStep, InterviewStep } from '../../types/position.types';

interface CandidateCardProps {
  candidate: CandidateInStep;
  allSteps: InterviewStep[];
  onMoveToStep: (toStepId: number, toStepName: string) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, allSteps, onMoveToStep }) => {
  const scoreDisplay =
    candidate.averageScore > 0 ? candidate.averageScore.toFixed(1) : '—';

  const otherSteps = allSteps.filter((s) => s.name !== candidate.currentInterviewStep);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('candidateId', String(candidate.id));
    e.dataTransfer.setData('applicationId', String(candidate.applicationId));
    e.dataTransfer.setData('fromStepName', candidate.currentInterviewStep);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      className="mb-2 shadow-sm"
      style={{ cursor: 'grab' }}
    >
      <Card.Body className="py-2 px-3">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <div>
            <div className="fw-semibold">{candidate.fullName}</div>
            <small className="text-muted">Puntuación: {scoreDisplay}</small>
          </div>
          {otherSteps.length > 0 && (
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="light"
                size="sm"
                draggable={false}
                className="py-0 px-1 border"
                aria-label={`Cambiar fase de ${candidate.fullName}`}
              >
                Mover
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Header>Mover a fase</Dropdown.Header>
                {otherSteps.map((s) => (
                  <Dropdown.Item
                    key={s.id}
                    onClick={() => onMoveToStep(s.id, s.name)}
                    draggable={false}
                  >
                    {s.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CandidateCard;
