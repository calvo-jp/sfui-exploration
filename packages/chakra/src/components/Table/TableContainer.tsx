import {
  HTMLChakraProps,
  Table,
  ThemingProps,
  chakra,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import * as React from "react";
import { Merge } from "../../types";
import {
  TableProvider,
  TableProviderProps,
  TableStylesProvider,
} from "./TableContext";

export type TableContainerProps = Merge<
  HTMLChakraProps<"div"> & ThemingProps<"Table">,
  TableProviderProps
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
    isLoading,
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
    <TableProvider isLoading={isLoading}>
      <TableStylesProvider value={styles}>
        <chakra.div ref={ref} __css={styles.container} {...others}>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === Table) {
              return (
                <chakra.div
                  __css={{
                    maxW: "full",
                    display: "block",
                    overflowX: "auto",
                    overflowY: "hidden",
                    whiteSpace: "nowrap",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  {React.cloneElement<any>(child, {
                    size,
                    variant,
                    colorScheme,
                    styleConfig,
                    orientation,
                  })}
                </chakra.div>
              );
            }

            return child;
          })}
        </chakra.div>
      </TableStylesProvider>
    </TableProvider>
  );
});
