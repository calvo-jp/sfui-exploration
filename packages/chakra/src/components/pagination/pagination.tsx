import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  ThemingProps,
  useControllableState,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import * as React from "react";
import { Merge } from "../../types";
import { runIfCallable } from "../../utils";
import {
  IPaginationContext,
  PaginationProvider,
  PaginationStylesProvider,
} from "./pagination-context";
import { Value } from "./types";
import { usePagination } from "./use-pagination";
import { usePopper } from "./use-popper";

type Children =
  | ((context: IPaginationContext) => React.ReactNode)
  | React.ReactNode;

export interface PaginationProps
  extends Merge<
    HTMLChakraProps<"div"> & ThemingProps<"Pagination">,
    {
      value?: Value;
      total?: number;
      onChange?(newValue: Value): void;
      defaultValue?: Value;
      siblingCount?: number;
      children: Children;
    }
  > {}

export const Pagination = forwardRef<PaginationProps, "div">(
  function Pagination(props, ref) {
    const styles = useMultiStyleConfig("Pagination", props);

    const {
      total = 0,
      value,
      onChange,
      defaultValue,
      siblingCount = 1,
      children,
      ...others
    } = omitThemingProps(props);

    const controllable = useControllableState({
      value,
      onChange,
      defaultValue:
        !value && !defaultValue ? { page: 1, size: 10 } : defaultValue,
    });

    const popper = usePopper();
    const details = usePagination({
      page: controllable[0].page,
      size: controllable[0].size,
      onChange: controllable[1],
      total,
      siblingCount,
    });

    const states = { ...details, popper };

    return (
      <chakra.div ref={ref} __css={styles.container} {...others}>
        <PaginationProvider value={states}>
          <PaginationStylesProvider value={styles}>
            {runIfCallable(children, states)}
          </PaginationStylesProvider>
        </PaginationProvider>
      </chakra.div>
    );
  },
);
