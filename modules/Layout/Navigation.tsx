import { Box, Flex, styled } from "@aura-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const NavItem = styled("a", {
  pl: "$5",
  pr: "$20",
  py: "$3",
  br: "$3",
  color: "$slate10",

  "&:hover": {
    color: "$slate11",
    backgroundColor: "$slate2",
  },

  variants: {
    selected: {
      true: {
        color: "$slate12",
        backgroundColor: "$slate5",

        "&:hover": {
          color: "$slate12",
          backgroundColor: "$slate5",
        },
      },
    },
  },
});

const navItems = [
  {
    name: "Feed",
    path: "/",
  },
  {
    name: "Share",
    path: "/share",
  },
];

export const Navigation = () => {
  const router = useRouter();
  return (
    <Box as="nav">
      <Flex css={{ py: "$5" }} direction="column" gap="3">
        {navItems.map((item) => (
          <Link key={item.name} href={item.path} passHref>
            <NavItem
              selected={router.pathname === item.path}
              css={{ alignSelf: "center" }}
            >
              {item.name}
            </NavItem>
          </Link>
        ))}
      </Flex>
    </Box>
  );
};
