import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { Merge } from "../../types";
import { runIfCallable } from "../../utils";
import {
  usePaginationContext,
  usePaginationStyles,
} from "./pagination-context";
import { Page } from "./types";

export type PaginationPageControlProps = Merge<
  HTMLChakraProps<"button">,
  { page: Page }
>;

export const PaginationPageControl = forwardRef(function PaginationPageControl(
  props: PaginationPageControlProps,
  ref,
) {
  const { page, children, disabled, onClick, ...others } = props;

  const styles = usePaginationStyles();
  const context = usePaginationContext();

  return (
    <chakra.button
      ref={ref}
      type="button"
      onClick={(e) => {
        runIfCallable(onClick, e);

        if (page.type === "page") {
          context.onChange(({ size }) => ({
            size,
            page: page.value,
          }));
        }
      }}
      disabled={disabled || page.type === "ellipsis"}
      __css={styles.page}
      {...others}
    >
      {children ?? (page.type === "page" ? page.value : "...")}
    </chakra.button>
  );
});
