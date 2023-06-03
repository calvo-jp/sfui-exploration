import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { ReactNode, useMemo } from "react";
import { IPaginationRange } from "../../hooks";
import { Merge } from "../../types";
import { runIfCallable } from "../../utils";
import {
  usePaginationContext,
  usePaginationStyles,
} from "./pagination-context";

type Children = ReactNode | ((range: IPaginationRange) => ReactNode);

interface PaginationRangeBaseProps {
  children?: Children;
}

export interface PaginationRangeProps
  extends Merge<HTMLChakraProps<"div">, PaginationRangeBaseProps> {}

export const PaginationRange = forwardRef<PaginationRangeProps, "div">(
  function PaginationRange({ children, ...props }, ref) {
    const styles = usePaginationStyles();
    const context = usePaginationContext();

    const defaultLabel = useMemo(() => {
      return `Page %s-%u to %t`
        .replace("%s", context.range.start.toString())
        .replace("%u", context.range.until.toString())
        .replace("%t", context.total.toString());
    }, [context.range.start, context.range.until, context.total]);

    return (
      <chakra.div ref={ref} __css={styles.range} {...props}>
        {runIfCallable(children, context.range) ?? defaultLabel}
      </chakra.div>
    );
  },
);
