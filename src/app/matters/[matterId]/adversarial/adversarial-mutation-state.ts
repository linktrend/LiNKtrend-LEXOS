export type AdversarialMutationState = {
  error: string | null;
  success: string | null;
  adversarialCritiqueId: string | null;
};

export const ADVERSARIAL_MUTATION_INITIAL: AdversarialMutationState = {
  error: null,
  success: null,
  adversarialCritiqueId: null,
};
