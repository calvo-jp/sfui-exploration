import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { useTableStyles } from "./table-context";

type TableHeaderProps = HTMLChakraProps<"div">;

export const TableHeader = forwardRef<TableHeaderProps, "div">(
  function TableHeader(props, ref) {
    const { children, ...others } = props;

    const styles = useTableStyles();

    return (
      <chakra.div ref={ref} __css={styles.header} {...others}>
        {children}
      </chakra.div>
    );
  },
);
