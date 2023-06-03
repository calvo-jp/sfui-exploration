import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { Pretty } from "../../types";
import { ChevronDownIcon } from "./icons";
import { useSelectContext, useSelectStyles } from "./select-context";

export type SelectArrowProps = Pretty<HTMLChakraProps<"svg">>;

export const SelectArrow = forwardRef<SelectArrowProps, "svg">(
  function SelectArrow(props, ref) {
    const context = useSelectContext();
    const styles = useSelectStyles();

    return (
      <chakra.svg
        ref={ref}
        as={ChevronDownIcon}
        {...(context.popper.isOpen && {
          "data-expanded": true,
        })}
        __css={styles.icon}
        {...props}
      />
    );
  },
);
