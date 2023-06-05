import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { useTableContext, useTableStyles } from "./table-context";

type TableHeaderProps = HTMLChakraProps<"div">;

export const TableHeader = forwardRef<TableHeaderProps, "div">(
  function TableHeader(props, ref) {
    const { children, ...others } = props;

    const styles = useTableStyles();
    const context = useTableContext();

    return (
      <chakra.div
        ref={ref}
        __css={styles.header}
        {...(context.isLoading && { "data-loading": true })}
        {...others}
      >
        {children}
      </chakra.div>
    );
  },
);
