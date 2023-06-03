import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { useTableStyles } from "./table-context";

export interface TableFooterProps extends HTMLChakraProps<"div"> {}

export const TableFooter = forwardRef<TableFooterProps, "div">(
  function TableFooter(props, ref) {
    const { children, ...others } = props;

    const styles = useTableStyles();

    return (
      <chakra.div ref={ref} __css={styles.footer} {...others}>
        {children}
      </chakra.div>
    );
  },
);
