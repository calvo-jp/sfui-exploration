import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { useComboboxStyles } from "./combobox-context";

export interface ComboboxOptionProps extends HTMLChakraProps<"div"> {}

export const ComboboxOption = forwardRef<ComboboxOptionProps, "div">(
  function ComboboxOption({ children, ...props }, ref) {
    const styles = useComboboxStyles();

    return (
      <chakra.div ref={ref} __css={styles} {...props}>
        {children}
      </chakra.div>
    );
  },
);
