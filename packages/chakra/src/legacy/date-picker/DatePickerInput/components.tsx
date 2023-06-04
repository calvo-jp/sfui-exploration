import { chakra } from "@chakra-ui/react";

type FieldProps = {
  size?: "sm" | "md";
};

export const Field = chakra<"button", FieldProps>("button", {
  baseStyle: (props: any) => ({
    width: "full",
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "neutral.200",
    rounded: "4px",
    gap: "8px",
    boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
    transition: "border-color ease-in-out 300ms",

    ...(props.size === "sm" && { h: "40px", py: "8px", px: "12px" }),
    ...(props.size === "md" && { h: "44px", py: "10px", px: "14px" }),

    _hover: {
      borderColor: "neutral.300",
    },

    _focus: {
      outline: "none",
      boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
      borderColor: `${props.colorScheme}.700`,
    },

    _active: {
      outline: "none",
      boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
      borderColor: "primary.700",
    },

    _invalid: {
      borderColor: "error.700",
      _focus: {
        borderColor: "error.700",
        boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
      },
    },

    _disabled: {
      color: "neutral.600",
      cursor: "not-allowed",
      borderColor: "neutral.100",
    },
  }),
});
