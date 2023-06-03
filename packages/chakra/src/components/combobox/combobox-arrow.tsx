import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";

export interface ComboboxArrowProps extends HTMLChakraProps<"svg"> {}

export const ComboboxArrow = forwardRef<ComboboxArrowProps, "svg">(
  function ComboboxArrow(props, ref) {
    return <chakra.svg ref={ref} />;
  },
);
