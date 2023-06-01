import { HTMLChakraProps, chakra } from "@chakra-ui/react";
import { forwardRef } from "react";
import { useTableStyles } from "./TableContext";

type TableHeaderProps = HTMLChakraProps<"div">;

export const TableHeader = forwardRef<HTMLDivElement, TableHeaderProps>(
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
