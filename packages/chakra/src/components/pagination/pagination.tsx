import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import * as React from "react";
import { Merge } from "../../types";
import { runIfCallable } from "../../utils";
import {
  PaginationProviderProps,
  PaginationState,
  PaginationStylesProvider,
  usePaginationContext,
  withPaginationContext,
} from "./pagination-context";

type Children =
  | ((context: PaginationState) => React.ReactNode)
  | React.ReactNode;

interface PaginationBaseProps extends PaginationProviderProps {
  children: Children;
}

export type PaginationProps = Merge<
  HTMLChakraProps<"div"> & ThemingProps<"Pagination">,
  PaginationBaseProps
>;

export const Component = forwardRef(function Pagination(
  props: PaginationProps,
  ref,
) {
  const styles = useMultiStyleConfig("Pagination", props);
  const context = usePaginationContext();

  const {
    total,
    value,
    onChange,
    defaultValue,
    siblingCount,
    children,
    ...others
  } = omitThemingProps(props);

  return (
    <chakra.div ref={ref} __css={styles.container} {...others}>
      <PaginationStylesProvider value={styles}>
        {runIfCallable(children, context)}
      </PaginationStylesProvider>
    </chakra.div>
  );
});

export const Pagination = withPaginationContext(Component);
