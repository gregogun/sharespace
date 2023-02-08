import fs from "fs";

const jwk = await warp.arweave.wallets.generate();
const walletAddress = await warp.arweave.wallets.jwkToAddress(jwk)

console.log(JSON.stringify(jwk));
console.log(walletAddress);

const contractSrc = fs.readFileSync("./dist/contract.js", "utf-8");

const initialState = {
  posts: [],
  canEvolve: true,
  evolve: null
};

const { contractTxId } = await warp.deploy({
  wallet: jwk,
  initState: JSON.stringify(initialState),
  src: contractSrc,
});

console.log("Contract deployed: " + contractTxId);
