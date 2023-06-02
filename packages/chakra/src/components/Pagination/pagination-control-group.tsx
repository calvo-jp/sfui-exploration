import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { Pretty } from "../../types";
import { usePaginationStyles } from "./pagination-context";

export type PaginationControlGroupProps = Pretty<HTMLChakraProps<"div">>;

export const PaginationControlGroup = forwardRef(
  function PaginationControlGroup(props: PaginationControlGroupProps, ref) {
    const { children, ...others } = props;

    const styles = usePaginationStyles();

    return (
      <chakra.div ref={ref} __css={styles.group} {...others}>
        {children}
      </chakra.div>
    );
  },
);
