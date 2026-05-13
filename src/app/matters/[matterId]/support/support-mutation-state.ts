export type SupportMutationState = {
  error: string | null;
  success: string | null;
};

export const SUPPORT_MUTATION_INITIAL: SupportMutationState = {
  error: null,
  success: null,
};
