import { chakra } from "@chakra-ui/react";
import { forwardRef } from "react";
import { usePaginationContext, usePaginationStyles } from "./PaginationContext";

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

  if (props.type === "ellipsis") return null;

  return (
    <chakra.button
      __css={styles.page}
      onClick={() => {
        context.onChange(({ size, page }) => ({
          size,
          page: page + 1,
        }));
      }}
    >
      {props.value}
    </chakra.button>
  );
});
