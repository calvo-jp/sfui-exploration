import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { Pretty } from "../../types";
import { usePaginationStyles } from "./PaginationContext";

export type PaginationTriggerGroupProps = Pretty<HTMLChakraProps<"div">>;

export const PaginationTriggerGroup = forwardRef(
  function PaginationTriggerGroup(props: PaginationTriggerGroupProps, ref) {
    const { children, ...others } = props;

    const styles = usePaginationStyles();

    return (
      <chakra.div ref={ref} __css={styles.group} {...others}>
        {children}
      </chakra.div>
    );
  },
);
