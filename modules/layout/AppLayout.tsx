import { Center, Grid, styled } from "@aura-ui/react";
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
      <Center>
        {/* <Navigation /> */}
        <Main>{children}</Main>
      </Center>
    </>
  );
};
