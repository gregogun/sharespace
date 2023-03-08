import { Post } from "@/types";
import { accountFromAddress } from "@/utils";
import arweaveGql, { Transaction } from "arweave-graphql";
import { getStampCount } from "./stamps";

export const getPosts = async () => {
  try {
    const res = await arweaveGql("https://arweave.net/graphql").getTransactions(
      {
        tags: [
          { name: "Type", values: ["share-post"] },
          { name: "Content-Type", values: ["application/json"] },
        ],
      }
    );
    const data = res.transactions.edges.map((edge) =>
      createPostInfo(edge.node as Transaction)
    );
    return Promise.all(data);
  } catch (error) {
    console.error(error);
    throw new Error("Error occured whilst fetching posts");
  }
};

const createPostInfo = async (node: Transaction): Promise<Post> => {
  const address = node.owner?.address;
  const account = await accountFromAddress(address);
  const title = node.tags.find((tag) => tag.name === "Title")?.value;
  const description = node.tags.find(
    (tag) => tag.name === "Description"
  )?.value;
  const timestamp = node.block?.timestamp;
  const id = node.id;
  const stamps = await getStampCount(id);

  return {
    creator: { address, account },
    title,
    description,
    timestamp,
    id,
    stamps,
  };
};
