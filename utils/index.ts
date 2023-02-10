import { config } from "@/config";
import { getAccount } from "@/lib";
import { ArAccount } from "arweave-account";
import { formatDistance } from "date-fns";

interface AbbreviateAddressOptions {
  startChars?: number;
  endChars?: number;
  noOfEllipsis?: number;
}

export interface AbbreviateAddress {
  address: string | undefined;
  options?: AbbreviateAddressOptions;
}

export const abbreviateAddress = ({
  address,
  options = {},
}: AbbreviateAddress) => {
  const { startChars = 5, endChars = 4, noOfEllipsis = 2 } = options;

  const dot = ".";
  const firstFive = address?.substring(0, startChars);
  const lastFour = address?.substring(address.length - endChars);
  return `${firstFive}${dot.repeat(noOfEllipsis)}${lastFour}`;
};

export const accountFromAddress = async (
  address: string
): Promise<ArAccount | undefined> => {
  const userAccount = await getAccount(address);

  return userAccount;
};

export const getAccountAvatar = (
  account: ArAccount | undefined,
  avatarSize?: number
) => {
  const size = avatarSize ? avatarSize : 120;

  return account?.profile.avatarURL === config.accountAvatarDefault
    ? account?.profile.avatarURL
    : `${config.boringAvatars}/${size}/${account?.addr}?square`;
};

export const timestampToTimeAgo = (unixTimestamp: number) => {
  return formatDistance(new Date(unixTimestamp * 1000), new Date(), {
    addSuffix: true,
  });
};
