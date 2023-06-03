import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { useComboboxContext, useComboboxStyles } from "./combobox-context";
import { ChevronDownIcon } from "./icons";

export interface ComboboxArrowProps extends HTMLChakraProps<"div"> {}

export const ComboboxArrow = forwardRef<ComboboxArrowProps, "div">(
  function ComboboxArrow({ onClick, children, ...props }, ref) {
    const styles = useComboboxStyles();
    const context = useComboboxContext();

    return (
      <chakra.div
        ref={ref}
        __css={styles.arrow}
        {...(context.popper.isOpen && {
          "data-expanded": true,
        })}
        {...props}
      >
        {children ?? (
          <chakra.svg as={ChevronDownIcon} className="combobox-arrow-icon" />
        )}
      </chakra.div>
    );
  },
);
