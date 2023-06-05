import {
  HTMLChakraProps,
  Table,
  ThemingProps,
  chakra,
  forwardRef,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import * as React from "react";
import { TableProvider, TableStylesProvider } from "./table-context";

export interface TableContainerProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"Table"> {
  /**
   *
   * This will add `data-loading` attribute to all table parts
   * which you can leverage to add style like so
   *
   * @example
   * _loading: {
   *    bg: "gray.50"
   * }
   *
   */
  isLoading?: boolean;
}

export const TableContainer = forwardRef<TableContainerProps, "div">(
  function TableContainer(props, ref) {
    const {
      size,
      variant,
      colorScheme,
      orientation,
      styleConfig,
      isLoading,
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
      <TableProvider
        value={{
          isLoading,
        }}
      >
        <TableStylesProvider value={styles}>
          <chakra.div
            ref={ref}
            __css={styles.container}
            {...(isLoading && { "data-loading": true })}
            {...others}
          >
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
                    }}
                  >
                    {React.cloneElement<any>(child, {
                      size,
                      variant,
                      colorScheme,
                      styleConfig,
                      orientation,
                      ...(isLoading && { "data-loading": true }),
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
  },
);
