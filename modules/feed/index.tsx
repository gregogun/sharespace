import { getPosts } from "@/lib/feed";
import { Post } from "@/types";
import { Button } from "@/ui/Button";
import { Image } from "@/ui/Image";
import { Spinner } from "@/ui/Spinner";
import { getAccountAvatar, timestampToTimeAgo } from "@/utils";
import { Box, Flex, Typography } from "@aura-ui/react";
import { useEffect, useState } from "react";

export const Feed = () => {
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const posts = await getPosts();
    setPosts(posts);
  };

  return (
    <Flex
      css={{ position: "relative", height: "100%" }}
      direction="column"
      gap="3"
    >
      {posts ? (
        <>
          {posts.map((post) => (
            <Box css={{ p: "$5", backgroundColor: "$slate2", br: "$3" }}>
              <Typography
                contrast="hiContrast"
                css={{ mb: "$1" }}
                size="5"
                weight="6"
              >
                {post.title}
              </Typography>
              <Typography css={{ mb: "$10" }} size="3">
                {post.description}
              </Typography>
              <Flex justify="between" align="center">
                <Button>Stamp</Button>
                <Flex gap="2" align="center">
                  <Image
                    css={{
                      width: 40,
                      height: 40,
                      br: "$round",
                    }}
                    src={getAccountAvatar(post.creator.account)}
                  />
                  <Flex direction="column">
                    <Flex align="center" gap="2">
                      <Typography contrast="hiContrast" size="2" weight="6">
                        John Perma
                      </Typography>
                      <Typography size="1">@jperma</Typography>
                    </Flex>
                    {post.timestamp && (
                      <Typography size="1" css={{ color: "$slate10" }}>
                        Posted {timestampToTimeAgo(post.timestamp)}
                      </Typography>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          ))}
        </>
      ) : (
        <Spinner />
      )}
    </Flex>
  );
};
