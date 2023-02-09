import { CtxProps } from "@/types";
import { arweave, warp } from ".";

export const deploy = async (ctx: CtxProps) => {
  try {
    const rawData = await uploadRaw(ctx);
    const { atomicId } = await dispatch(rawData);
    const contractId = await registerContract(atomicId);
    console.log("Atomic Asset ID: " + contractId);
    return contractId;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong when trying to upload your post.");
  }
};

export const uploadRaw = async (ctx: CtxProps) => {
  try {
    const tx = await arweave.createTransaction({
      data: JSON.stringify({ title: ctx.title, description: ctx.description }),
    });
    tx.addTag("Content-Type", "application/json");
    tx.addTag("App-Name", "Sharespace");
    tx.addTag("Title", ctx.title);
    tx.addTag("Description", ctx.description);
    tx.addTag("Type", "social-post");
    tx.addTag("Topic:Idea", "Idea");
    const res = await window.arweaveWallet.dispatch(tx);
    console.log("Source data tx: " + res.id);
    return { ...ctx, assetId: res.id } as const;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const createAndTag = async (ctx: CtxProps) => {
  try {
    const initState = JSON.stringify({
      balances: {
        [ctx.address]: 100000,
      },
      name: "Idea-" + ctx.assetId,
      ticker: "SHARE-TEST",
      pairs: [],
      creator: ctx.address,
      settings: [["isTradeable", true]],
    });

    const tx = await arweave.createTransaction({
      data: JSON.stringify({ title: ctx.title, description: ctx.description }),
    });
    tx.addTag("Content-Type", "application/json");
    tx.addTag("App-Name", "SmartWeaveContract");
    tx.addTag("Title", ctx.title);
    tx.addTag("Description", ctx.description);
    tx.addTag("Type", "social-post");
    tx.addTag("Topic:Idea", "Idea");
    tx.addTag("App-Version", "0.3.0");
    tx.addTag("Contract-Source", "x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs");
    tx.addTag("Init-State", initState);
    return tx;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const dispatch = async (ctx: CtxProps) => {
  const tx = await createAndTag(ctx);
  const res = await window.arweaveWallet.dispatch(tx);
  console.log("Atomic ID: " + res.id);

  return { ...ctx, atomicId: res.id } as const;
};

const registerContract = async (atomicId: string) => {
  try {
    const { contractTxId } = await warp.register(atomicId, "node2");
    console.log("Contract registered " + contractTxId);
    return { id: contractTxId };
  } catch (error) {
    throw new Error(error as any);
  }
};
