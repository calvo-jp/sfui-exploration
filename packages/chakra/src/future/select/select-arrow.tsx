import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { ChevronDownIcon } from "./icons";
import { useSelectContext, useSelectStyles } from "./select-context";

export interface SelectArrowProps extends HTMLChakraProps<"svg"> {}

export const SelectArrow = forwardRef<SelectArrowProps, "svg">(
  function SelectArrow({ children, ...props }, ref) {
    const context = useSelectContext();
    const styles = useSelectStyles();

    return (
      <chakra.div
        ref={ref}
        {...(context.popper.isOpen && {
          "data-expanded": true,
        })}
        __css={styles.arrow}
        {...props}
      >
        {children ?? (
          <chakra.svg as={ChevronDownIcon} className="select-arrow-icon" />
        )}
      </chakra.div>
    );
  },
);
