import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { useMergeRefs } from "@floating-ui/react";
import { useComboboxStyles } from "./combobox-context";

export interface ComboboxOptionsProps extends HTMLChakraProps<"div"> {}

export const ComboboxOptions = forwardRef<ComboboxOptionsProps, "div">(
  function ComboboxOptions({ children, ...props }, ref) {
    const styles = useComboboxStyles();

    const mergedRef = useMergeRefs([ref]);

    return (
      <chakra.div ref={mergedRef} __css={styles.options} {...props}>
        {children}
      </chakra.div>
    );
  },
);
