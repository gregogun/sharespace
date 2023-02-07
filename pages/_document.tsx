import { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "@aura-ui/react";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
