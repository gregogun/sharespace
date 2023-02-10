import { Flex, Typography } from "@aura-ui/react";
import { ConnectWallet } from "../connectWallet";

export const AppHeader = () => (
  <Flex
    justify="between"
    align="center"
    css={{
      mb: "$10",
      py: "$3",
      px: "$16",
      boxShadow: "0 1px 0 0 $colors$slate6",
    }}
    as="header"
  >
    <Typography
      css={{
        py: "$2",
        px: "$4",
        br: "$3",
      }}
      contrast="hiContrast"
      size="4"
      weight="6"
    >
      sharespace_
    </Typography>
    <ConnectWallet
      permissions={[
        "ACCESS_ADDRESS",
        "ACCESS_ALL_ADDRESSES",
        "DISPATCH",
        "SIGN_TRANSACTION",
      ]}
    />
  </Flex>
);
