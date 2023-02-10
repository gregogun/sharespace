import { styled, keyframes } from "@aura-ui/react";

const spinner = keyframes({
  to: { transform: "rotate(360deg)" },
});

export const Spinner = styled("div", {
  "&::before": {
    content: "",
    boxSizing: "border-box",
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 20,
    height: 20,
    mt: -10,
    ml: -10,
    br: "$round",
    border: "1px solid $colors$slate6",
    borderTopColor: "$colors$slate12",
    animation: `${spinner} .6s linear infinite`,
  },
});
