import { HTMLChakraProps, chakra } from "@chakra-ui/react";
import * as React from "react";
import { Merge } from "../../types";

export type SelectOptionsProps = Merge<HTMLChakraProps<"div">, {}>;

export const SelectOptions = React.forwardRef<
  HTMLDivElement,
  SelectOptionsProps
>(function SelectOptions(props, ref) {
  const { children, ...others } = props;

  return (
    <chakra.div ref={ref} {...others}>
      {children}
    </chakra.div>
  );
});
