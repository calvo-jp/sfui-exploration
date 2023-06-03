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

export type PaginationControlGroupProps = Merge<
  HTMLChakraProps<"div">,
  PaginationControlGroupBaseProps
>;

export const PaginationControlGroup = forwardRef(
  function PaginationControlGroup(props: PaginationControlGroupProps, ref) {
    const { children, ...others } = props;

    const styles = usePaginationStyles();
    const context = usePaginationContext();

    return (
      <chakra.div ref={ref} __css={styles.group} {...others}>
        {runIfCallable(children, context)}
      </chakra.div>
    );
  },
);
