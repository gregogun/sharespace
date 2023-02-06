export interface PostContractState {
  posts: Post[];
}

interface Post {
  id: number;
  creator: string;
  postContent: string;
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
  postContent: string;
}

export type PostContractFunction = "createPost" | "readPost" | "appreciatePost";

export type PostResult = Post;

export type PostContractResult =
  | { state: PostContractState }
  | { result: PostResult };
