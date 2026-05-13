export type StrategyMutationState = {
  error: string | null;
  success: string | null;
  strategyMemoId: string | null;
};

export const STRATEGY_MUTATION_INITIAL: StrategyMutationState = {
  error: null,
  success: null,
  strategyMemoId: null,
};
