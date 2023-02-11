import { Grid, styled } from "@aura-ui/react";
import { AppHeader } from "./AppHeader";
import { Navigation } from "./Navigation";

const Main = styled("main", {
  minWidth: 500,
  width: "min-content",
  minHeight: 500,
  height: "min-content",
  mt: "$5",
});

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <AppHeader />
      <Grid
        css={{ px: "$20", justifyItems: "center", width: "90%" }}
        gap="20"
        templateColumns="200px 1fr"
      >
        <Navigation />
        <Main>{children}</Main>
      </Grid>
    </>
  );
};