import {
  PostContractAction,
  PostContractResult,
  PostContractState,
} from "../types";

declare const ContractError: any;

export const createMessage = (
  state: PostContractState,
  { caller, input: { postContent } }: PostContractAction
): PostContractResult => {
  const posts = state.posts;
  if (!postContent) {
    throw new ContractError("Creator must provide message content");
  }

  const id = posts.length + 1;

  state.posts.push({
    id,
    creator: caller,
    postContent,
    votes: {
      addresses: [],
      status: 0,
    },
  });

  return { state };
};
