export type AssertionMutationState = {
  error: string | null;
  success: string | null;
};

export const ASSERTION_MUTATION_INITIAL: AssertionMutationState = {
  error: null,
  success: null,
};
