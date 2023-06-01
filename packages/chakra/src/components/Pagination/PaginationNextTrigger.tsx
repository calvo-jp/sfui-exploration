import { chakra } from "@chakra-ui/react";
import { forwardRef } from "react";
import { usePaginationContext, usePaginationStyles } from "./PaginationContext";
import { ChevronRightIcon } from "./icons";

export const PaginationNextTrigger = forwardRef(
  function PaginationNextTrigger() {
    const styles = usePaginationStyles();
    const context = usePaginationContext();

    const isLastPage = context.value.page * context.value.size >= context.total;

    return (
      <chakra.button
        __css={styles.next}
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
          w={4}
          h={4}
          className="pagination-nexttrigger__svg"
        />
      </chakra.button>
    );
  },
);
