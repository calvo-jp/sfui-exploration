import { chakra } from "@chakra-ui/react";
import { forwardRef } from "react";
import { usePaginationContext, usePaginationStyles } from "./PaginationContext";
import { ChevronRightIcon } from "./icons";

export type PaginationPageTriggerProps =
  | {
      type: "page";
      value: number;
    }
  | {
      type: "ellipsis";
    };

export const PaginationPageTrigger = forwardRef(function PaginationPageTrigger(
  props: PaginationPageTriggerProps,
  ref,
) {
  const styles = usePaginationStyles();
  const context = usePaginationContext();

  return (
    <chakra.button
      __css={styles.pageTrigger}
      onClick={() => {
        context.onChange(({ size, page }) => ({
          size,
          page: page + 1,
        }));
      }}
    >
      <chakra.svg
        as={ChevronRightIcon}
        className="pagination-page-trigger__svg"
      />
    </chakra.button>
  );
});
