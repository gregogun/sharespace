import { Textarea } from "@/ui/Textarea";
import { Box, Button, Flex } from "@aura-ui/react";

export const CreatePost = () => {
  return (
    <Flex direction="column" gap="3" as="form">
      <Textarea
        placeholder="Add your idea..."
        variant="outline"
        css={{
          minHeight: 120,
        }}
      />
      <Button variant="solid" colorScheme="blue">
        Submit idea
      </Button>
    </Flex>
  );
};
