import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { useMemo } from "react";
import { Pretty } from "../../types";
import { clamp } from "../../utils";
import {
  usePaginationContext,
  usePaginationStyles,
} from "./pagination-context";

export type PaginationRangeProps = Pretty<HTMLChakraProps<"div">>;

export const PaginationRange = forwardRef(function PaginationRange(
  props: PaginationRangeProps,
  ref,
) {
  const { children, ...others } = props;

  const styles = usePaginationStyles();
  const context = usePaginationContext();

  const range = useMemo(() => {
    return getRange(context.value.page, context.value.size, context.total);
  }, [context.total, context.value.page, context.value.size]);

  return (
    <chakra.div ref={ref} __css={styles.range} {...others}>
      {children ?? range}
    </chakra.div>
  );
});

export function getRange(page: number, size: number, total: number) {
  let start: number;
  let until: number;

  start = (page - 1) * size + 1;
  until = start + size - 1;

  start = clamp(start, 1, total);
  until = clamp(until, 1, total);

  return `Page ${start}-${until} to ${total}`;
}
