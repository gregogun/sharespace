import { config } from "@/config";
import { PostContractState } from "@/contracts/types";
import { warp } from ".";

export const writePostToContract = async (content: string) => {
  const contractId = config.postContract.id;

  const contract = warp
    .contract<PostContractState>(contractId)
    .connect("use_wallet");

  const res = await contract.writeInteraction({
    function: "createPost",
    content,
  });

  return res;
};
