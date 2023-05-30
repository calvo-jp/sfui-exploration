import { HTMLChakraProps, chakra } from "@chakra-ui/react";
import * as React from "react";
import { Merge } from "../types";

type SelectTriggerProps = Merge<HTMLChakraProps<"button">, {}>;

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  SelectTriggerProps
>(function SelectTrigger(props, ref) {
  const { children, ...others } = props;

  return (
    <chakra.button ref={ref} {...others}>
      {children}
    </chakra.button>
  );
});
