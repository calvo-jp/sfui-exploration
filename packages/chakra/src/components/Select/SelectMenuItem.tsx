import { HTMLChakraProps, chakra } from "@chakra-ui/react";
import * as React from "react";
import { Merge } from "../../types";

export type SelectMenuItemProps = Merge<
  HTMLChakraProps<"div">,
  {
    label?: string;
    value: string;
  }
>;

export const SelectMenuItem = React.forwardRef<
  HTMLDivElement,
  SelectMenuItemProps
>(function SelectMenuItem(props, ref) {
  const { label, value, children, ...others } = props;

  return (
    <chakra.div ref={ref} {...others}>
      {label}
      {children}
    </chakra.div>
  );
});
