import { HTMLChakraProps, chakra } from "@chakra-ui/react";
import { usePaginationStyles } from "./PaginationContext";

export type PaginationTriggerGroupProps = HTMLChakraProps<"div">;

export function PaginationTriggerGroup(props: PaginationTriggerGroupProps) {
  const { children, ...others } = props;
  const styles = usePaginationStyles();

  return (
    <chakra.div __css={styles.group} {...others}>
      {children}
    </chakra.div>
  );
}
