import { getPosts } from "@/lib/feed";
import { Post } from "@/types";
import { Spinner } from "@/ui/Spinner";
import { useEffect, useState } from "react";
import { Flex } from "@aura-ui/react";
import { IdeaCard } from "./IdeaCard";

export const Feed = () => {
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const posts = await getPosts();
    console.log(posts);

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
            <IdeaCard key={post.creator.address} post={post} />
          ))}
        </>
      ) : (
        <Spinner css={{ py: "$20" }} />
      )}
    </Flex>
  );
};
