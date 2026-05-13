export type ResearchMutationState = {
  error: string | null;
  success: string | null;
  researchMemoId: string | null;
};

export const RESEARCH_MUTATION_INITIAL: ResearchMutationState = {
  error: null,
  success: null,
  researchMemoId: null,
};
