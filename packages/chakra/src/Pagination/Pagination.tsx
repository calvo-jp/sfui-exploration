import {
  chakra,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import * as React from "react";
import { Merge } from "../types";
import {
  PaginationProvider,
  PaginationProviderProps,
  PaginationStylesProvider,
} from "./PaginationContext";

export type PaginationProps = Merge<
  HTMLChakraProps<"div"> & ThemingProps<"Pagination">,
  PaginationProviderProps
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
            {children}
          </PaginationProvider>
        </PaginationStylesProvider>
      </chakra.div>
    );
  },
);
