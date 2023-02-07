import { styled } from "@aura-ui/react";

// type ButtonBaseProps = ComponentProps<typeof ButtonBase>;

export const Button = styled("button", {
  // resets
  all: "unset",
  alignItems: "center",
  boxSizing: "border-box",
  userSelect: "none",
  "&::before": {
    boxSizing: "border-box",
  },
  "&::after": {
    boxSizing: "border-box",
  },

  // custom reset
  display: "inline-flex",
  justifyContent: "center",
  lineHeight: "1",
  WebkitTapHighlightColor: "rgba(0,0,0,0)",

  // --------------------------------------------

  // custom
  fontFamily: "inherit",
  fontWeight: 600,
  br: "$3",

  "&:disabled": {
    pointerEvents: "none",
    cursor: "not-allowed",
    opacity: "50%",
  },

  '&[aria-disabled="true"]': {
    pointerEvents: "none",
    cursor: "not-allowed",
    opacity: "50%",
  },

  // --------------------------------------------

  // locally-scoped color tokens for easy theme-switching

  // default styles
  $$bg: "$colors$slate3",
  $$border: "$colors$slate7",
  $$color: "$colors$slate11",

  // hover styles
  $$bgHover: "$colors$slate4",
  $$borderHover: "$colors$slate8",

  // active styles
  $$bgActive: "$colors$slate5",
  $$borderActive: "$colors$slate8",

  // solid default styles
  $$bgSolid: "$colors$slate9",
  $$colorSolid: "white",
  // solid hover styles
  $$bgSolidHover: "$colors$slate10",
  // solid active styles
  $$bgSolidActive: "$colors$slate10",

  // --------------------------------------------

  variants: {
    size: {
      1: {
        height: "$7",
        fontSize: "$1",
        lineHeight: "$sizes$7",
        px: "$3",
      },
      2: {
        height: "$11",
        fontSize: "$3",
        lineHeight: "$sizes$11",
        px: "$5",
      },
      3: {
        height: "$11",
        fontSize: "$3",
        lineHeight: "$sizes$11",
        px: "$5",
      },
    },
    variant: {
      subtle: {
        color: "$$color",
        backgroundColor: "$$bg",
        // boxShadow: 'inset 0 0 0 1px $$border',

        "&:hover": {
          backgroundColor: "$$bgHover",
          // boxShadow: 'inset 0 0 0 1px $$borderHover',
        },

        "&:active": {
          backgroundColor: "$$bgActive",
          // boxShadow: 'inset 0 0 0 1px $$borderActive',
        },
      },
      outline: {
        color: "$$color",
        backgroundColor: "transparent",
        boxShadow: "inset 0 0 0 1px $$border",

        "&:hover": {
          boxShadow: "inset 0 0 0 1px $$borderHover",
        },

        "&:active": {
          backgroundColor: "$$bgActive",
          boxShadow: "inset 0 0 0 1px $$borderActive",
        },
      },
      solid: {
        backgroundColor: "$$bgSolid",
        color: "$$colorSolid",

        "&:hover": {
          backgroundColor: "$$bgSolidHover",
        },

        "&:active": {
          backgroundColor: "$$bgSolidActive",
        },
      },
      ghost: {
        color: "$$color",
        backgroundColor: "transparent",

        "&:hover": {
          backgroundColor: "$$bgHover",
        },

        "&:active": {
          backgroundColor: "$$bgActive",
        },
      },
    },
  },

  defaultVariants: {
    size: "2",
    variant: "subtle",
  },
});
