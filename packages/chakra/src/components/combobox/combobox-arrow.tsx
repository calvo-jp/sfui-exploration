import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { useComboboxStyles } from "./combobox-context";

export interface ComboboxArrowProps extends HTMLChakraProps<"svg"> {}

export const ComboboxArrow = forwardRef<ComboboxArrowProps, "svg">(
  function ComboboxArrow(props, ref) {
    const styles = useComboboxStyles();

    return <chakra.svg ref={ref} __css={styles.arrow} {...props} />;
  },
);
