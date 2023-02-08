import {
  PostContractAction,
  PostContractResult,
  PostContractState,
} from "../../types";

declare const ContractError: any;

export const createPost = (
  state: PostContractState,
  { caller, input: { content } }: PostContractAction
): PostContractResult => {
  const posts = state.posts;
  if (!content) {
    throw new ContractError("Creator must provide message content");
  }

  const id = posts.length + 1;

  state.posts.push({
    id,
    creator: caller,
    content,
  });

  return { state };
};
