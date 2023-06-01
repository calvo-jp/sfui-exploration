import { HTMLChakraProps, chakra } from "@chakra-ui/react";
import * as React from "react";
import { Merge } from "../../types";

export type SelectMenuProps = Merge<HTMLChakraProps<"div">, {}>;

export const SelectMenu = React.forwardRef<HTMLDivElement, SelectMenuProps>(
  function SelectMenu(props, ref) {
    const { children, ...others } = props;

    return (
      <chakra.div ref={ref} {...others}>
        {children}
      </chakra.div>
    );
  },
);
