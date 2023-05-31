import {
  HTMLChakraProps,
  Table,
  ThemingProps,
  chakra,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import * as React from "react";
import { Merge } from "../types";
import { TableStylesProvider } from "./TableContext";

export type TableContainerProps = Merge<
  HTMLChakraProps<"div"> & ThemingProps<"Table">,
  {}
>;

export const TableContainer = React.forwardRef<
  HTMLDivElement,
  TableContainerProps
>(function TableContainer(props, ref) {
  const {
    size,
    variant,
    colorScheme,
    orientation,
    styleConfig,
    children,
    ...others
  } = props;

  const styles = useMultiStyleConfig("Table", {
    size,
    variant,
    colorScheme,
    styleConfig,
    orientation,
  });

  return (
    <TableStylesProvider value={styles}>
      <chakra.div ref={ref} __css={styles.container} {...others}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === Table) {
            return React.cloneElement<any>(child, {
              size,
              variant,
              colorScheme,
              styleConfig,
              orientation,
            });
          }

          return child;
        })}
      </chakra.div>
    </TableStylesProvider>
  );
});
