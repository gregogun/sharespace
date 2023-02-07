export interface PostContractState {
  posts: Post[];
}

export interface Post {
  id: number;
  creator: string;
  content: string;
  votes: {
    addresses: string[];
    status: number;
  };
}

export interface PostContractAction {
  input: PostContractInput;
  caller: string;
}

export interface PostContractInput {
  function: PostContractFunction;
  id: number;
  content: string;
}

export type PostContractFunction = "createPost" | "readPost" | "appreciatePost";

export type PostResult = Post;

export type PostContractResult =
  | { state: PostContractState }
  | { result: PostResult };
