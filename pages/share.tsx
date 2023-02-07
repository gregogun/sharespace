import { CreatePost } from "@/modules/CreatePost";
import { AppLayout } from "@/modules/Layout/AppLayout";
import { Typography } from "@aura-ui/react";

const Feed = () => {
  return (
    <AppLayout>
      <Typography size="4" weight="6" contrast="hiContrast" css={{ mb: "$5" }}>
        Share an idea for a permaweb application or protocol
      </Typography>
      <CreatePost />
    </AppLayout>
  );
};

export default Feed;
