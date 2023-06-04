import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Merge } from "../../types";
import { runIfCallable } from "../../utils";
import {
  IPaginationContext,
  usePaginationContext,
  usePaginationStyles,
} from "./pagination-context";

type Children = ReactNode | ((details: IPaginationContext) => ReactNode);

interface PaginationControlGroupBaseProps {
  children?: Children;
}

export interface PaginationControlGroupProps
  extends Merge<HTMLChakraProps<"div">, PaginationControlGroupBaseProps> {}

export const PaginationControlGroup = forwardRef<
  PaginationControlGroupProps,
  "div"
>(function PaginationControlGroup({ children, ...props }, ref) {
  const styles = usePaginationStyles();
  const context = usePaginationContext();

  return (
    <chakra.div ref={ref} __css={styles.group} {...props}>
      {runIfCallable(children, context)}
    </chakra.div>
  );
});
