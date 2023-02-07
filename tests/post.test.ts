import ArLocal from "arlocal";
import { JWKInterface } from "arweave/node/lib/wallet";
import { LoggerFactory, Warp, WarpFactory, Contract } from "warp-contracts";
import { PostContractState } from "../contracts/types";
import fs from "fs";
import path from "path";

jest.setTimeout(30000);

describe("Testing the Atomic NFT Token", () => {
  let ownerWallet: JWKInterface;
  let owner: string;

  let user2Wallet: JWKInterface;
  let user2: string;

  let user3Wallet: JWKInterface;
  let user3: string;

  let initialState: PostContractState;

  let arlocal: ArLocal;
  let warp: Warp;
  let state: Contract<PostContractState>;

  let contractSrc: string;

  let contractId: string;

  beforeAll(async () => {
    arlocal = new ArLocal(1820, false);
    await arlocal.start();

    LoggerFactory.INST.logLevel("error");
    //LoggerFactory.INST.logLevel('debug', 'WasmContractHandlerApi');

    warp = WarpFactory.forLocal(1820);

    ({ jwk: ownerWallet, address: owner } = await warp.generateWallet());

    ({ jwk: user2Wallet, address: user2 } = await warp.generateWallet());

    ({ jwk: user3Wallet, address: user3 } = await warp.generateWallet());

    initialState = {
      posts: [],
    };

    contractSrc = fs.readFileSync(
      path.join(__dirname, "../dist/contract.js"),
      "utf8"
    );

    ({ contractTxId: contractId } = await warp.deploy({
      wallet: ownerWallet,
      initState: JSON.stringify(initialState),
      src: contractSrc,
    }));
    console.log("Deployed contract: ", contractId);
    state = warp.contract<PostContractState>(contractId).connect(ownerWallet);
  });

  afterAll(async () => {
    await arlocal.stop();
  });

  it("should properly deploy contract", async () => {
    const contractTx = await warp.arweave.transactions.get(contractId);

    expect(contractTx).not.toBeNull();
  });

  it("should read state state", async () => {
    expect((await state.readState()).cachedValue.state).toEqual(initialState);
  });

  it("should properly post message", async () => {
    await state.writeInteraction({
      function: "createPost",
      content: "Hello world!",
    });

    const { cachedValue } = await state.readState();
    expect(cachedValue.state.posts[0]).toEqual({
      id: 1,
      creator: owner,
      content: "Hello world!",
      votes: { addresses: [], status: 0 },
    });
  });

  it("should not post message with no content", async () => {
    await expect(
      state.writeInteraction({ function: "createPost" }, { strict: true })
    ).rejects.toThrow(
      "Cannot create interaction: Creator must provide a message content."
    );
  });

  //   it("should not be possible for creator to vote for they message", async () => {
  //     await expect(
  //       state.writeInteraction(
  //         { function: "upvoteMessage", id: 1 },
  //         { strict: true }
  //       )
  //     ).rejects.toThrow(
  //       "Cannot create interaction: Message creator cannot vote for they own message."
  //     );
  //   });

  //   it("should not be possible to vote for non-existing message", async () => {
  //     state = warp.contract<PostContractState>(contractId).connect(user2Wallet);

  //     await expect(
  //       state.writeInteraction(
  //         { function: "upvoteMessage", id: 5 },
  //         { strict: true }
  //       )
  //     ).rejects.toThrow("Cannot create interaction: Message does not exist.");
  //   });

  //   it("should properly upvote message", async () => {
  //     state = warp.contract<PostContractState>(contractId).connect(user2Wallet);

  //     await state.writeInteraction({ function: "upvoteMessage", id: 1 });

  //     const { cachedValue } = await state.readState();
  //     expect(cachedValue.state.posts[0].votes.status).toEqual(1);
  //   });

  //   it("should not be possible to vote for the same message twice", async () => {
  //     state = warp.contract<PostContractState>(contractId).connect(user2Wallet);

  //     await expect(
  //       state.writeInteraction(
  //         { function: "upvoteMessage", id: 1 },
  //         { strict: true }
  //       )
  //     ).rejects.toThrow("Cannot create interaction: Caller has already voted.");

  //     await expect(
  //       state.writeInteraction(
  //         { function: "downvoteMessage", id: 1 },
  //         { strict: true }
  //       )
  //     ).rejects.toThrow("Caller has already voted.");
  //   });

  //   it("should properly downvote message", async () => {
  //     state = warp.contract<PostContractState>(contractId).connect(user3Wallet);

  //     await state.writeInteraction({ function: "downvoteMessage", id: 1 });

  //     const { cachedValue } = await state.readState();
  //     expect(cachedValue.state.posts[0].votes.status).toEqual(0);
  //   });

  it("should properly view message", async () => {
    const { result } = await state.viewState({
      function: "readPost",
      id: 1,
    });

    expect(result).toEqual({
      id: 1,
      creator: owner,
      content: "Hello world!",
      votes: { addresses: [user2, user3], status: 0 },
    });
  });
});
