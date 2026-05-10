import React from 'react';
import { render, screen } from '@testing-library/react';
import KanbanColumn from './KanbanColumn';
import type { InterviewStep, CandidateInStep } from '../../types/position.types';

const step: InterviewStep = {
  id: 1,
  name: 'Technical',
  orderIndex: 1,
  interviewFlowId: 1,
  interviewTypeId: 1,
};

const candidates: CandidateInStep[] = [
  {
    id: 5,
    applicationId: 10,
    fullName: 'Alex Developer',
    currentInterviewStep: 'Technical',
    averageScore: 4.5,
  },
];

describe('KanbanColumn', () => {
  test('renders step title and candidate name', () => {
    render(
      <KanbanColumn
        step={step}
        allSteps={[step]}
        candidates={candidates}
        onDrop={jest.fn()}
      />
    );

    expect(screen.getByText('Technical')).toBeInTheDocument();
    expect(screen.getByText('Alex Developer')).toBeInTheDocument();
    expect(screen.getByText(/Puntuación: 4\.5/)).toBeInTheDocument();
  });
});
