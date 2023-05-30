import { HTMLChakraProps, chakra } from "@chakra-ui/react";
import { forwardRef } from "react";
import { useTableStyles } from "./TableContext";

type TableFooterProps = HTMLChakraProps<"div">;

export const TableFooter = forwardRef<HTMLDivElement, TableFooterProps>(
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
