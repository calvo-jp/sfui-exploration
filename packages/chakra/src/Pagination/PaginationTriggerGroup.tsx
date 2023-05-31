import { chakra } from "@chakra-ui/react";
import { usePaginationStyles } from "./PaginationContext";

export function PaginationTriggerGroup() {
  const styles = usePaginationStyles();

  return <chakra.div __css={styles.triggerGroup}></chakra.div>;
}
