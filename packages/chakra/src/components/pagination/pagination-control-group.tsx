import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Merge } from "../../types";
import { runIfCallable } from "../../utils";
import {
  PaginationState,
  usePaginationContext,
  usePaginationStyles,
} from "./pagination-context";

type Children = ReactNode | ((details: PaginationState) => ReactNode);

interface PaginationControlGroupBaseProps {
  children?: Children;
}

export interface PaginationControlGroupProps
  extends Merge<HTMLChakraProps<"div">, PaginationControlGroupBaseProps> {}

export const PaginationControlGroup = forwardRef<
  PaginationControlGroupProps,
  "div"
>(function PaginationControlGroup(props, ref) {
  const { children, ...others } = props;

  const styles = usePaginationStyles();
  const context = usePaginationContext();

  return (
    <chakra.div ref={ref} __css={styles.group} {...others}>
      {runIfCallable(children, context)}
    </chakra.div>
  );
});
