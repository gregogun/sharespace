import { readPost } from "./actions/read/readPost";
import { createPost } from "./actions/write/createPost";
import {
  PostContractAction,
  PostContractResult,
  PostContractState,
} from "./types";

declare const ContractError: any;

export function handle(
  state: PostContractState,
  action: PostContractAction
): PostContractResult {
  const input = action.input;

  switch (input.function) {
    case "createPost":
      return createPost(state, action);
    case "readPost":
      return readPost(state, action);
    default:
      throw new ContractError(
        `No function supplied or function not recognised: "${input.function}"`
      );
  }
}
