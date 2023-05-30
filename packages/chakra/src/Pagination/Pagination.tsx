import {
  chakra,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import * as React from "react";
import { Merge } from "../types";
import { PaginationStylesProvider } from "./PaginationContext";

export type PaginationProps = Merge<
  HTMLChakraProps<"div"> & ThemingProps<"Pagination">,
  {}
>;

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  function Pagination(props, ref) {
    const styles = useMultiStyleConfig("Pagination", props);

    const { children, ...others } = omitThemingProps(props);

    return (
      <chakra.div ref={ref} __css={styles.container} {...others}>
        <PaginationStylesProvider value={styles}>
          {children}
        </PaginationStylesProvider>
      </chakra.div>
    );
  },
);
