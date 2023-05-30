import { chakra } from "@chakra-ui/react";
import { useTableStyles } from "./TableContext";

export function TableLoader() {
  const styles = useTableStyles();

  return <chakra.div __css={styles.loader}></chakra.div>;
}
