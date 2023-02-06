export interface ContractState {
  posts: Post[];
}

interface Post {
  id: number;
  creator: string;
  idea: string;
  votes: {
    addresses: string[];
    status: number;
  };
}

export interface ContractAction {
  input: ContractInput;
  caller: string;
}

export interface ContractInput {
  function: ContractFunction;
  id: number;
  post: string;
}

export type ContractFunction = "createPost" | "readPost" | "appreciatePost";

export type PostResult = Post;

export type ContractResult = { state: ContractState } | { result: PostResult };
