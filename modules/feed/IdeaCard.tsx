import { useAuth } from "@/hooks/useAuth";
import { StampIcon } from "@/icons/StampIcon";
import { stampAsset, userHasStamped } from "@/lib/stamps";
import { Post } from "@/types";
import { Image } from "@/ui/Image";
import { getAccountAvatar, timestampToTimeAgo } from "@/utils";
import { Box, Flex, Typography, Button } from "@aura-ui/react";
import { useEffect, useState } from "react";

interface IdeaCardProps {
  post: Post;
}

export const IdeaCard = ({
  post: { creator, title, description, timestamp, id, stamps },
}: IdeaCardProps) => {
  const [justStamped, setJustStamped] = useState(false);
  const [hasStamped, setHasStamped] = useState(false);
  const { walletAddress } = useAuth();

  useEffect(() => {
    checkHasStamped();
  }, []);

  const checkHasStamped = async () => {
    if (!walletAddress) return;
    await userHasStamped(walletAddress, id)
      .then((res) => {
        console.log(res);
        setHasStamped(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isLoggedIn =
    walletAddress && walletAddress === creator.address ? true : false;

  const handleClick = async () => {
    await stampAsset(id)
      .then((res) => {
        console.log(res);
        setJustStamped(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box css={{ p: "$5", backgroundColor: "$slate2", br: "$3" }}>
      <Typography contrast="hiContrast" css={{ mb: "$1" }} size="5" weight="6">
        {title}
      </Typography>
      <Typography css={{ mb: "$10" }} size="3">
        {description}
      </Typography>
      <Flex justify="between" align="center">
        {isLoggedIn ? (
          <Typography css={{ display: "flex", gap: "$1", color: "$blue11" }}>
            Stamps
            <Flex
              as="span"
              align="center"
              justify="center"
              css={{
                px: "$3",
                py: "$1",
                backgroundColor: "$blue9",
                color: "white",
                br: "$pill",
                fontSize: "$1",
                lineHeight: 1,
              }}
            >
              {stamps}
            </Flex>
          </Typography>
        ) : (
          <Button
            onClick={handleClick}
            variant="ghost"
            colorScheme={justStamped ? "green" : "blue"}
            disabled={hasStamped}
          >
            {/* <StampIcon /> */}
            {justStamped || hasStamped ? `Stamped` : `Stamp`}
            <Flex
              as="span"
              align="center"
              justify="center"
              css={{
                px: "$2",
                py: "$1",
                backgroundColor: "$blue9",
                color: "white",
                br: "$pill",
                fontSize: "$1",
                lineHeight: 1,
              }}
            >
              {stamps}
            </Flex>
          </Button>
        )}
        <Flex gap="2" align="center">
          <Image
            css={{
              width: 40,
              height: 40,
              br: "$round",
            }}
            src={getAccountAvatar(creator.account)}
          />
          <Flex direction="column">
            <Flex align="center" gap="2">
              <Typography contrast="hiContrast" size="2" weight="6">
                {creator.account?.profile.name
                  ? creator.account?.profile.name
                  : creator.account?.handle}
              </Typography>
              {creator.account?.profile.handleName && (
                <Typography size="1">
                  @{creator.account.profile.handleName}
                </Typography>
              )}
            </Flex>
            {timestamp && (
              <Typography size="1" css={{ color: "$slate10" }}>
                Posted {timestampToTimeAgo(timestamp)}
              </Typography>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
