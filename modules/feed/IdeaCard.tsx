import { Post } from "@/types";
import { Button } from "@/ui/Button";
import { Image } from "@/ui/Image";
import { getAccountAvatar, timestampToTimeAgo } from "@/utils";
import { Box, Flex, Typography } from "@aura-ui/react";

interface IdeaCardProps {
  post: Post;
}

export const IdeaCard = ({
  post: { creator, title, description, timestamp },
}: IdeaCardProps) => {
  return (
    <Box css={{ p: "$5", backgroundColor: "$slate2", br: "$3" }}>
      <Typography contrast="hiContrast" css={{ mb: "$1" }} size="5" weight="6">
        {title}
      </Typography>
      <Typography css={{ mb: "$10" }} size="3">
        {description}
      </Typography>
      <Flex justify="end" align="center">
        {/* <Button>Stamp</Button>s */}
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
