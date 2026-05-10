import { renderHook, waitFor } from '@testing-library/react';
import { usePositionKanban } from './usePositionKanban';
import * as positionService from '../services/positionService';

jest.mock('../services/positionService');

const mockFlow = {
  positionName: 'Senior Role',
  interviewFlow: {
    id: 1,
    description: 'Flow',
    interviewSteps: [
      {
        id: 10,
        name: 'Screening',
        orderIndex: 1,
        interviewFlowId: 1,
        interviewTypeId: 1,
      },
      {
        id: 20,
        name: 'Interview',
        orderIndex: 2,
        interviewFlowId: 1,
        interviewTypeId: 2,
      },
    ],
  },
};

describe('usePositionKanban', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('loads flow and maps candidates into columns', async () => {
    jest.spyOn(positionService, 'getInterviewFlow').mockResolvedValue(mockFlow);
    jest.spyOn(positionService, 'getCandidates').mockResolvedValue([
      {
        id: 1,
        applicationId: 99,
        fullName: 'Jane Doe',
        currentInterviewStep: 'Screening',
        averageScore: 4,
      },
    ]);

    const { result } = renderHook(() => usePositionKanban(1));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.positionName).toBe('Senior Role');
    expect(result.current.steps).toHaveLength(2);
    expect(result.current.steps[0].name).toBe('Screening');
    expect(result.current.candidatesByStep.Screening).toHaveLength(1);
    expect(result.current.candidatesByStep.Screening[0].fullName).toBe('Jane Doe');
    expect(result.current.error).toBeNull();
  });

  test('sets error when position id is invalid', async () => {
    const { result } = renderHook(() => usePositionKanban(Number.NaN));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/no válido/i);
    expect(positionService.getInterviewFlow).not.toHaveBeenCalled();
  });
});
