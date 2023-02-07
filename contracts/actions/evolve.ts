import {
  PostContractAction,
  PostContractResult,
  PostContractState,
} from "../types";

declare const ContractError: any;

export const evolve = (
  state: PostContractState,
  { input, caller }: PostContractAction
): PostContractResult => {
  const { canEvolve, owner } = state;
  if (!canEvolve) {
    throw new ContractError("This contract cannot evolve");
  }

  if (owner !== caller) {
    throw new ContractError("Only the owner can evolve a contract.");
  }

  state.evolve = input.value;

  return { state };
};
