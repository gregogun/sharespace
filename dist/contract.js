"use strict";
(() => {
  // contracts/actions/read/readPost.ts
  var readPost = (state, { input: { id } }) => {
    const post = state.posts.find((p) => p.id == id);
    if (!post) {
      throw new ContractError(`Post with id: ${id} does not exist.`);
    }
    return { result: post };
  };

  // contracts/actions/write/createPost.ts
  var createPost = (state, { caller, input: { content } }) => {
    const posts = state.posts;
    if (!content) {
      throw new ContractError("Creator must provide message content");
    }
    const id = posts.length + 1;
    state.posts.push({
      id,
      creator: caller,
      content,
      votes: {
        addresses: [],
        status: 0
      }
    });
    return { state };
  };

  // contracts/contract.ts
  function handle(state, action) {
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
})();
