import {
  chakra,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import * as React from "react";
import { Merge } from "../types";
import { runIfFn } from "../utils";
import {
  PaginationProvider,
  PaginationProviderProps,
  PaginationStylesProvider,
} from "./PaginationContext";

interface RenderChildrenContext {}

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

    const {
      total = 0,
      value,
      onChange,
      defaultValue,
      children,
      ...others
    } = omitThemingProps(props);

    return (
      <chakra.div ref={ref} __css={styles.container} {...others}>
        <PaginationStylesProvider value={styles}>
          <PaginationProvider
            value={value}
            onChange={onChange}
            defaultValue={defaultValue}
            total={total}
          >
            {runIfFn(children, {})}
          </PaginationProvider>
        </PaginationStylesProvider>
      </chakra.div>
    );
  },
);
