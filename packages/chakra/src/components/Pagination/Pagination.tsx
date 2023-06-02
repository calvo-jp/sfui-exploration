import {
  chakra,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import * as React from "react";
import { Merge } from "../../types";
import { runIfCallable } from "../../utils";
import {
  PaginationProvider,
  PaginationProviderProps,
  PaginationStylesProvider,
  usePaginationContext,
} from "./pagination-context";
import { Page } from "./types";

interface RenderChildrenContext {
  pages: Page[];
}

type Children =
  | ((context: RenderChildrenContext) => React.ReactNode)
  | React.ReactNode;

export type PaginationProps = Merge<
  HTMLChakraProps<"div"> & ThemingProps<"Pagination">,
  PaginationProviderProps & {
    children: Children;
  }
>;

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  function Pagination(props, ref) {
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
          <PaginationProvider
            total={total}
            value={value}
            onChange={onChange}
            siblingCount={siblingCount}
            defaultValue={defaultValue}
          >
            {runIfCallable(children, { pages: context.pages })}
          </PaginationProvider>
        </PaginationStylesProvider>
      </chakra.div>
    );
  },
);
