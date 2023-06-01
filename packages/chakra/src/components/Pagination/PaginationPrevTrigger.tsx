import { chakra } from "@chakra-ui/react";
import { forwardRef } from "react";
import { usePaginationContext, usePaginationStyles } from "./PaginationContext";
import { ChevronLeftIcon } from "./icons";

export const PaginationPrevTrigger = forwardRef(
  function PaginationPrevTrigger() {
    const styles = usePaginationStyles();
    const context = usePaginationContext();

    const isFirstPage = context.value.page <= 1;

    return (
      <chakra.button
        __css={styles.prevPageTrigger}
        disabled={isFirstPage}
        onClick={() => {
          context.onChange(({ size, page }) => ({
            size,
            page: page + 1,
          }));
        }}
      >
        <chakra.svg
          as={ChevronLeftIcon}
          className="pagination-prevpage-trigger__svg"
        />
      </chakra.button>
    );
  },
);
