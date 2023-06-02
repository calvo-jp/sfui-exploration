import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { Pretty } from "../../types";
import { runIfCallable } from "../../utils";
import { ChevronRightIcon } from "./icons";
import {
  usePaginationContext,
  usePaginationStyles,
} from "./pagination-context";

export type PaginationNextControlProps = Pretty<HTMLChakraProps<"button">>;

export const PaginationNextControl = forwardRef(function PaginationNextControl(
  props: PaginationNextControlProps,
  ref,
) {
  const {
    disabled,
    onClick,
    children = (
      <chakra.svg
        as={ChevronRightIcon}
        w={4}
        h={4}
        className="pagination-nexttrigger__svg"
      />
    ),
    ...others
  } = props;

  const styles = usePaginationStyles();
  const context = usePaginationContext();
  const shouldDisable = disabled || context.details.isLastPage;

  return (
    <chakra.button
      ref={ref}
      type="button"
      disabled={shouldDisable}
      onClick={(e) => {
        runIfCallable(onClick, e);
        context.onChange(({ size, page }) => ({
          size,
          page: page + 1,
        }));
      }}
      __css={styles.next}
      {...others}
    >
      {children}
    </chakra.button>
  );
});
