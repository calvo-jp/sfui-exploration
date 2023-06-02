import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Merge } from "../../types";
import { clamp, runIfCallable } from "../../utils";
import {
  usePaginationContext,
  usePaginationStyles,
} from "./pagination-context";
import { Range } from "./types";

type Children = ReactNode | ((range: Range) => ReactNode);

interface PaginationRangeBaseProps {
  children?: Children;
}

export type PaginationRangeProps = Merge<
  HTMLChakraProps<"div">,
  PaginationRangeBaseProps
>;

export const PaginationRange = forwardRef(function PaginationRange(
  props: PaginationRangeProps,
  ref,
) {
  const { children, ...others } = props;

  const styles = usePaginationStyles();
  const context = usePaginationContext();

  const range = getRange(context.value.page, context.value.size, context.total);
  const label = !children
    ? range.toString()
    : runIfCallable(children, {
        start: range.start,
        until: range.until,
      });

  return (
    <chakra.div ref={ref} __css={styles.range} {...others}>
      {label}
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

  return {
    start,
    until,
    toString() {
      return `Page ${start}-${until} to ${until}`;
    },
  };
}
