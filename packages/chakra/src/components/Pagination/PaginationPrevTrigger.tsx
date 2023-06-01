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
        __css={styles.prev}
        disabled={isFirstPage}
        onClick={() => {
          context.onChange(({ size, page }) => ({
            size,
            page: page - 1,
          }));
        }}
      >
        <chakra.svg
          as={ChevronLeftIcon}
          w={4}
          h={4}
          className="pagination-prevtrigger__svg"
        />
      </chakra.button>
    );
  },
);
