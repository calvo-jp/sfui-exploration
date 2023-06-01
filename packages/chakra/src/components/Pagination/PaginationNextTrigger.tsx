import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { Pretty } from "../../types";
import { usePaginationContext, usePaginationStyles } from "./PaginationContext";
import { ChevronRightIcon } from "./icons";

export type PaginationNextTriggerProps = Pretty<HTMLChakraProps<"button">>;

export const PaginationNextTrigger = forwardRef(function PaginationNextTrigger(
  props: PaginationNextTriggerProps,
  ref,
) {
  const {
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

  const isLastPage = context.value.page * context.value.size >= context.total;

  return (
    <chakra.button
      ref={ref}
      type="button"
      disabled={isLastPage}
      onClick={() => {
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
