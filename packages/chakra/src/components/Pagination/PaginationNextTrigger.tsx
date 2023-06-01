import { chakra } from "@chakra-ui/react";
import { forwardRef } from "react";
import { usePaginationContext, usePaginationStyles } from "./PaginationContext";
import { ChevronRightIcon } from "./icons";

export const PaginationNextTrigger = forwardRef(
  function PaginationNextTrigger() {
    const styles = usePaginationStyles();
    const context = usePaginationContext();

    const isLastPage = context.value.page >= context.total;

    return (
      <chakra.button
        __css={styles.nextPageTrigger}
        disabled={isLastPage}
        onClick={() => {
          context.onChange(({ size, page }) => ({
            size,
            page: page + 1,
          }));
        }}
      >
        <chakra.svg
          as={ChevronRightIcon}
          className="pagination-nextpage-trigger__svg"
        />
      </chakra.button>
    );
  },
);
