import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { ReactNode, useMemo } from "react";
import { Merge } from "../../types";
import { runIfCallable } from "../../utils";
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

  const defaultLabel = useMemo(() => {
    return `Page %s-%u to %t`
      .replace("%s", context.details.range.start.toString())
      .replace("%u", context.details.range.until.toString())
      .replace("%t", context.details.total.toString());
  }, [
    context.details.range.start,
    context.details.range.until,
    context.details.total,
  ]);

  return (
    <chakra.div ref={ref} __css={styles.range} {...others}>
      {runIfCallable(children, context.details.range) ?? defaultLabel}
    </chakra.div>
  );
});
