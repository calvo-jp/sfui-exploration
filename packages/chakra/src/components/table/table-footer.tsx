import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { useTableContext, useTableStyles } from "./table-context";

export interface TableFooterProps extends HTMLChakraProps<"div"> {}

export const TableFooter = forwardRef<TableFooterProps, "div">(
  function TableFooter(props, ref) {
    const { children, ...others } = props;

    const styles = useTableStyles();
    const context = useTableContext();

    return (
      <chakra.div
        ref={ref}
        __css={styles.footer}
        {...(context.isLoading && { "data-loading": true })}
        {...others}
      >
        {children}
      </chakra.div>
    );
  },
);
