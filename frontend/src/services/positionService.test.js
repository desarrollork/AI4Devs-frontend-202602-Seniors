import axios from 'axios';
import { getInterviewFlow, getCandidates, updateStage } from './positionService';

jest.mock('axios');

describe('positionService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getInterviewFlow requests interviewflow endpoint', async () => {
    axios.get.mockResolvedValue({
      data: {
        interviewFlow: {
          positionName: 'Test role',
          interviewFlow: { id: 1, interviewSteps: [] },
        },
      },
    });

    const result = await getInterviewFlow(42);

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3010/position/42/interviewflow');
    expect(result.positionName).toBe('Test role');
  });

  test('getCandidates requests candidates endpoint', async () => {
    axios.get.mockResolvedValue({ data: [{ fullName: 'A' }] });

    const result = await getCandidates(7);

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3010/position/7/candidates');
    expect(result).toEqual([{ fullName: 'A' }]);
  });

  test('updateStage sends PUT with applicationId and step id', async () => {
    axios.put.mockResolvedValue({ data: { ok: true } });

    await updateStage(11, 22, 33);

    expect(axios.put).toHaveBeenCalledWith('http://localhost:3010/candidates/11', {
      applicationId: 22,
      currentInterviewStep: 33,
    });
  });
});
