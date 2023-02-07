import {
  PostContractAction,
  PostContractResult,
  PostContractState,
} from "@/contracts/types";

declare const ContractError: any;

export const readPost = (
  state: PostContractState,
  { input: { id } }: PostContractAction
): PostContractResult => {
  const post = state.posts.find((p) => p.id == id);

  if (!post) {
    throw new ContractError(`Post with id: ${id} does not exist.`);
  }

  return { result: post };
};
