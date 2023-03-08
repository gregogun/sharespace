import { Button, Center, Typography } from "@aura-ui/react";
import { AppLayout } from "@/modules/layout/AppLayout";
import { Feed } from "@/modules/feed";

export default function Home() {
  return (
    <AppLayout>
      <Center css={{ mb: "$10" }}>
        <Button>Share an idea or concept</Button>
      </Center>
      <Typography
        as="h1"
        size="4"
        weight="6"
        contrast="hiContrast"
        css={{ mb: "$5" }}
      >
        Feed
      </Typography>
      <Feed />
    </AppLayout>
  );
}
