import { HTMLChakraProps, chakra } from "@chakra-ui/react";
import { useMergeRefs } from "@floating-ui/react";
import * as React from "react";
import { Pretty } from "../../types";
import { ChevronDownIcon } from "./icons";
import { useSelectContext, useSelectStyles } from "./select-context";

export type SelectTriggerProps = Pretty<HTMLChakraProps<"button">>;

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  SelectTriggerProps
>(function SelectTrigger(props, ref) {
  const { children, ...others } = props;

  const styles = useSelectStyles();
  const context = useSelectContext();
  const mergedRef = useMergeRefs([ref, context.popper.refs.setReference]);

  return (
    <chakra.button
      ref={mergedRef}
      type="button"
      __css={styles.trigger}
      {...others}
      {...context.popper.getReferenceProps({})}
    >
      <chakra.span flexGrow={1}>{children}</chakra.span>
      <chakra.svg
        as={ChevronDownIcon}
        __css={{
          ...styles.icon,
          transform: "rotate(0deg)",
          transition: "transform 300ms ease-in-out",
          ...(context.popper.isOpen && {
            transform: "rotate(180deg)",
          }),
        }}
      />
    </chakra.button>
  );
});
