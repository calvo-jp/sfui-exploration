import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { Merge } from "../../types";
import { usePaginationContext, usePaginationStyles } from "./PaginationContext";

export type PaginationPageTriggerProps = Merge<
  HTMLChakraProps<"button">,
  | {
      _type: "page";
      _value: number;
    }
  | {
      _type: "ellipsis";
      _value?: null;
    }
>;

export const PaginationPageTrigger = forwardRef(function PaginationPageTrigger(
  props: PaginationPageTriggerProps,
  ref,
) {
  const { _type, _value, children, ...others } = props;

  const styles = usePaginationStyles();
  const context = usePaginationContext();

  if (props._type === "ellipsis") return null;

  return (
    <chakra.button
      ref={ref}
      type="button"
      onClick={() => {
        context.onChange(({ size, page }) => ({
          size,
          page: page + 1,
        }));
      }}
      __css={styles.page}
      {...others}
    >
      {children ?? props.value ?? "..."}
    </chakra.button>
  );
});
