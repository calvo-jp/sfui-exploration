import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { runIfCallable } from "../../utils";
import { useComboboxContext, useComboboxStyles } from "./combobox-context";
import { ChevronDownIcon } from "./icons";

export interface ComboboxArrowProps extends HTMLChakraProps<"div"> {}

export const ComboboxArrow = forwardRef<ComboboxArrowProps, "div">(
  function ComboboxArrow({ onClick, children, ...props }, ref) {
    const styles = useComboboxStyles();
    const context = useComboboxContext();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      runIfCallable(onClick, e);

      if (context.popper.isMounted) {
        context.popper.setIsOpen(false);
      } else {
        context.popper.setIsOpen(true);
      }
    };

    return (
      <chakra.div
        ref={ref}
        __css={styles.arrow}
        onClick={handleClick}
        {...(context.popper.isOpen && {
          "data-expanded": true,
        })}
        {...props}
      >
        {children ?? (
          <chakra.svg
            as={ChevronDownIcon}
            pointerEvents="none"
            className="combobox-arrow-icon"
          />
        )}
      </chakra.div>
    );
  },
);
