import { Typography } from "@aura-ui/react";
import { AppLayout } from "@/modules/Layout/AppLayout";
import { Feed } from "@/modules/feed";

export default function Home() {
  return (
    <AppLayout>
      <Typography size="4" weight="6" contrast="hiContrast" css={{ mb: "$5" }}>
        Feed
      </Typography>
      <Feed />
    </AppLayout>
  );
}
