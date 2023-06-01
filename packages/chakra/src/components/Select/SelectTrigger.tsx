import { HTMLChakraProps, chakra } from "@chakra-ui/react";
import { useMergeRefs } from "@floating-ui/react";
import * as React from "react";
import { Merge } from "../../types";
import { useSelectContext, useSelectStyles } from "./SelectContext";

export type SelectTriggerProps = Merge<HTMLChakraProps<"button">, {}>;

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
      {...context.popper.getReferenceProps()}
    >
      {children}
    </chakra.button>
  );
});
