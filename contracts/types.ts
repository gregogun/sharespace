export interface PostContractState {
  posts: Post[];
  canEvolve: boolean;
  evolve: string | null;
  owner: string;
}

export interface Post {
  id: number;
  creator: string;
  content: string;
}

export interface PostContractAction {
  input: PostContractInput;
  caller: string;
}

export interface PostContractInput {
  function: PostContractFunction;
  id: number;
  content: string;
  value: string;
}

export type PostContractFunction = "createPost" | "readPost" | "evolve";

export type PostResult = Post;

export type PostContractResult =
  | { state: PostContractState }
  | { result: PostResult };
