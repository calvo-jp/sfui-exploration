import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { Pretty } from "../../types";
import { runIfCallable } from "../../utils";
import { ChevronLeftIcon } from "./icons";
import {
  usePaginationContext,
  usePaginationStyles,
} from "./pagination-context";

export type PaginationPrevControlProps = Pretty<HTMLChakraProps<"button">>;

export const PaginationPrevControl = forwardRef(function PaginationPrevControl(
  props: PaginationPrevControlProps,
  ref,
) {
  const {
    onClick,
    disabled,
    children = (
      <chakra.svg
        as={ChevronLeftIcon}
        w={4}
        h={4}
        className="pagination-prevtrigger__svg"
      />
    ),
    ...others
  } = props;

  const styles = usePaginationStyles();
  const context = usePaginationContext();
  const shouldDisable = disabled || context.isFirstPage;

  return (
    <chakra.button
      ref={ref}
      type="button"
      disabled={shouldDisable}
      onClick={(e) => {
        runIfCallable(onClick, e);
        context.prev();
      }}
      __css={styles.prev}
      {...others}
    >
      {children}
    </chakra.button>
  );
});
