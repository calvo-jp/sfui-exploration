import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { runIfCallable } from "../../utils";
import { ChevronRightIcon } from "./icons";
import {
  usePaginationContext,
  usePaginationStyles,
} from "./pagination-context";

export interface PaginationNextControlProps extends HTMLChakraProps<"button"> {}

export const PaginationNextControl = forwardRef<
  PaginationNextControlProps,
  "button"
>(function PaginationNextControl(props, ref) {
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
  const shouldDisable = disabled || context.isLastPage;

  return (
    <chakra.button
      ref={ref}
      type="button"
      disabled={shouldDisable}
      onClick={(e) => {
        runIfCallable(onClick, e);
        context.next();
      }}
      __css={styles.next}
      {...others}
    >
      {children}
    </chakra.button>
  );
});
