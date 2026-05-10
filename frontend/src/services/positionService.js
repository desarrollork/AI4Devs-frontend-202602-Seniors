import axios from 'axios';

const BASE_URL = 'http://localhost:3010';

/**
 * GET /position/:id/interviewflow
 * Returns: { positionName: string, interviewFlow: { id, description, interviewSteps[] } }
 * Note: the controller wraps the service response in { interviewFlow: ... },
 * so the full response shape is { interviewFlow: { positionName, interviewFlow: { ... } } }
 */
export const getInterviewFlow = async (positionId) => {
  const { data } = await axios.get(`${BASE_URL}/position/${positionId}/interviewflow`);
  return data.interviewFlow; // { positionName, interviewFlow: { id, interviewSteps[] } }
};

/**
 * GET /position/:id/candidates
 * Returns: [{ fullName, currentInterviewStep (name, not id), averageScore, id, applicationId }]
 */
export const getCandidates = async (positionId) => {
  const { data } = await axios.get(`${BASE_URL}/position/${positionId}/candidates`);
  return data;
};

/**
 * PUT /candidates/:candidateId
 * Body: { applicationId: number, currentInterviewStep: number (InterviewStep.id) }
 * Note: the endpoint is /candidates/:id, NOT /candidates/:id/stage
 */
export const updateStage = async (candidateId, applicationId, interviewStepId) => {
  const { data } = await axios.put(`${BASE_URL}/candidates/${candidateId}`, {
    applicationId,
    currentInterviewStep: interviewStepId,
  });
  return data;
};
