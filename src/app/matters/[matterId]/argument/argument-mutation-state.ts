export type ArgumentMutationState = {
  error: string | null;
  success: string | null;
  argumentDraftId: string | null;
};

export const ARGUMENT_MUTATION_INITIAL: ArgumentMutationState = {
  error: null,
  success: null,
  argumentDraftId: null,
};
