import { HTMLChakraProps, chakra } from "@chakra-ui/react";
import * as React from "react";
import { Merge } from "../types";

export type SelectOptionProps = Merge<
  HTMLChakraProps<"div">,
  {
    label?: string;
    value: string;
  }
>;

export const SelectOption = React.forwardRef<HTMLDivElement, SelectOptionProps>(
  function SelectOption(props, ref) {
    const { label, value, children, ...others } = props;

    return (
      <chakra.div ref={ref} {...others}>
        {label}
        {children}
      </chakra.div>
    );
  },
);
