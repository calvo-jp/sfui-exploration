import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { useComboboxStyles } from "./combobox-context";

export interface ComboboxControlProps extends HTMLChakraProps<"div"> {}

export const ComboboxControl = forwardRef<ComboboxControlProps, "div">(
  function ComboboxControl({ children, ...props }, ref) {
    const styles = useComboboxStyles();

    return (
      <chakra.div ref={ref} __css={styles.control} {...props}>
        {children}
      </chakra.div>
    );
  },
);
