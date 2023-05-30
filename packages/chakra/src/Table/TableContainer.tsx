import {
  HTMLChakraProps,
  ThemingProps,
  chakra,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { Merge } from "../types";
import { TableStylesProvider } from "./TableContext";

export type TableContainerProps = Merge<
  HTMLChakraProps<"div"> & ThemingProps<"Table">,
  {}
>;

export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  function TableContainer(props, ref) {
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
          {children}
        </chakra.div>
      </TableStylesProvider>
    );
  },
);
