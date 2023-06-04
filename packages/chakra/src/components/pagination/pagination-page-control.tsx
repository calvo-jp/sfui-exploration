import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { Merge } from "../../types";
import { runIfCallable } from "../../utils";
import {
  usePaginationContext,
  usePaginationStyles,
} from "./pagination-context";
import { IPaginationPage } from "./use-pagination";

export type PaginationPageControlProps = Merge<
  HTMLChakraProps<"button">,
  IPaginationPage
>;

export const PaginationPageControl = forwardRef<
  PaginationPageControlProps,
  "button"
>(function PaginationPageControl(props, ref) {
  const { type, value, children, disabled, onClick, ...others } = props;

  const styles = usePaginationStyles();
  const context = usePaginationContext();

  const shouldDisable = disabled || type === "ellipsis";

  return (
    <chakra.button
      ref={ref}
      type="button"
      disabled={shouldDisable}
      onClick={(e) => {
        runIfCallable(onClick, e);

        if (type === "page") {
          context.goto(value);
        }
      }}
      __css={styles.page}
      {...others}
    >
      {children ?? (type === "page" ? value : "...")}
    </chakra.button>
  );
});
