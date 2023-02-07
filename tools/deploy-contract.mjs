import { WarpFactory } from "warp-contracts";
import fs from "fs";
import path from "path";

const warp = WarpFactory.forMainnet();

const jwk = await warp.arweave.wallets.generate();
const walletAddress = await warp.arweave.wallets.jwkToAddress(jwk);

const contractSrc = fs.readFileSync("./dist/contract.js", "utf-8");

const initialState = {
  posts: [],
};

const { contractTxId } = await warp.deploy({
  wallet: jwk,
  initState: JSON.stringify(initialState),
  src: contractSrc,
});

console.log("Contract deployed: " + contractTxId);
