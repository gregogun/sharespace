import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { darkTheme, globalCss } from "@aura-ui/react";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/useAuth";
import { ConnectProvider } from "arweave-wallet-ui-test";

const globalStyles = globalCss({
  "*, *::before, *::after": {
    boxSizing: "border-box",
  },

  "html, body, #root, #__next": {
    height: "100vh",
    fontFamily: "$body",
    margin: 0,
    backgroundColor: "$slate1",
  },

  "#__next": {
    position: "relative",
    zIndex: 0,
  },
});

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ConnectProvider>
        <ThemeProvider
          disableTransitionOnChange
          attribute="class"
          value={{ light: "light-theme", dark: darkTheme.toString() }}
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </ConnectProvider>
    </AuthProvider>
  );
}
