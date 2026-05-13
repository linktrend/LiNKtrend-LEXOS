export type OutputMutationState = {
  error: string | null;
  success: string | null;
  outputArtifactId: string | null;
};

export const OUTPUT_MUTATION_INITIAL: OutputMutationState = {
  error: null,
  success: null,
  outputArtifactId: null,
};
