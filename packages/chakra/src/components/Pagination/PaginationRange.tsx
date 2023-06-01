import { HTMLChakraProps, chakra } from "@chakra-ui/react";
import { Pretty } from "../../types";
import { clamp } from "../../utils";
import { usePaginationContext, usePaginationStyles } from "./PaginationContext";

export type PaginationRangeProps = Pretty<
  Omit<HTMLChakraProps<"div">, "children">
>;

export function PaginationRange(props: PaginationRangeProps) {
  const styles = usePaginationStyles();
  const context = usePaginationContext();
  const range = getRange(context.value.page, context.value.size, context.total);

  return (
    <chakra.div __css={styles.range} {...props}>
      {range}
    </chakra.div>
  );
}

export function getRange(page: number, size: number, total: number) {
  let start: number;
  let until: number;

  start = (page - 1) * size + 1;
  until = start + size - 1;

  start = clamp(start, 1, total);
  until = clamp(until, 1, total);

  return `Page ${start}-${until} to ${total}`;
}
