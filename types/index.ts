// Profile

import { ArAccount } from "arweave-account";

interface ProfileLinks {
  discord?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
}

interface Profile {
  avatar: string;
  addr: string;
  bio: string;
  handle: string;
  links: ProfileLinks;
  name: string;
}

export interface Account {
  profile: Profile;
  txid: string;
}

export type Vouched = boolean;

export interface CtxProps {
  title: string;
  description: string;
  address: string;
  assetId?: string;
  atomicId?: string;
}

interface Creator {
  address: string;
  account: ArAccount | undefined;
}

export interface Post {
  creator: Creator;
  title: string | undefined;
  description: string | undefined;
  timestamp: number | undefined;
  id: string;
  stamps: any;
}
