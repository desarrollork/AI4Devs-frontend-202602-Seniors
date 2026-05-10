export interface InterviewStep {
  id: number;
  name: string;
  orderIndex: number;
  interviewFlowId: number;
  interviewTypeId: number;
}

export interface InterviewFlowData {
  id: number;
  description?: string;
  interviewSteps: InterviewStep[];
}

export interface InterviewFlowResponse {
  positionName: string;
  interviewFlow: InterviewFlowData;
}

export interface CandidateInStep {
  id: number;           // Candidate.id
  applicationId: number;
  fullName: string;
  currentInterviewStep: string; // Step name (string), not id
  averageScore: number;
}

export type CandidatesByStep = Record<string, CandidateInStep[]>;
