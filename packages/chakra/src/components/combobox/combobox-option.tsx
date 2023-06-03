import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { useComboboxStyles } from "./combobox-context";

export interface ComboboxOptionProps extends HTMLChakraProps<"div"> {}

export const ComboboxOption = forwardRef<ComboboxOptionProps, "div">(
  function ComboboxOption(props, ref) {
    const { children, ...others } = props;

    const styles = useComboboxStyles();

    return (
      <chakra.div ref={ref} __css={styles} {...others}>
        {children}
      </chakra.div>
    );
  },
);
