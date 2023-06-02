import {
  As,
  ComponentWithAs,
  SystemStyleObject,
  forwardRef,
  useControllableState,
} from "@chakra-ui/react";
import { createContext } from "@chakra-ui/react-context";
import * as React from "react";
import { UseSelectPopperReturn, useSelectPopper } from "../../hooks";
import { invariant, noop } from "../../utils";
import { Details, Value } from "./types";
import { usePagination } from "./utils";

export const [PaginationStylesProvider, usePaginationStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: "PaginationStylesContext",
  errorMessage:
    "'usePaginationStyles' returned 'undefined'. " +
    "Seems you forgot to wrap the components in '<Pagination />'",
});

export interface PaginationState {
  value: Value;
  onChange: React.Dispatch<React.SetStateAction<Value>>;
  popper: UseSelectPopperReturn;
  details: Details;
}

const internalDefaultValue: Value = {
  page: 1,
  size: 10,
};

export const PaginationContext = React.createContext<PaginationState>({
  value: internalDefaultValue,
  onChange: noop,
  popper: {} as any,
  details: {} as any,
});

export type PaginationProviderProps = {
  total?: number;
  value?: Value;
  onChange?(newValue: Value): void;
  defaultValue?: Value;
  siblingCount?: number;
};

export function PaginationProvider({
  total = 0,
  value,
  onChange,
  defaultValue,
  siblingCount = 2,
  children,
}: React.PropsWithChildren<PaginationProviderProps>) {
  const controllableState = useControllableState({
    value,
    onChange,
    defaultValue: !value && !defaultValue ? internalDefaultValue : defaultValue,
  });

  const details = usePagination({
    page: controllableState[0].page,
    size: controllableState[0].size,
    total,
    siblingCount,
  });

  const popper = useSelectPopper();

  return (
    <PaginationContext.Provider
      value={{
        value: controllableState[0],
        onChange: controllableState[1],
        popper,
        details,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}

export function usePaginationContext() {
  const context = React.useContext(PaginationContext);

  invariant(
    context,
    "'usePaginationContext' returned 'undefined'. " +
      "Seems you forgot to wrap the components in '<Pagination />'",
  );

  return context;
}

export function withPaginationContext<T extends PaginationProviderProps>(
  Comp: ComponentWithAs<As, T>,
) {
  return forwardRef(function Wrapped(props: T, ref) {
    return (
      <PaginationProvider
        total={props.total}
        value={props.value}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
        siblingCount={props.siblingCount}
      >
        <Comp ref={ref} {...(props as any)} />
      </PaginationProvider>
    );
  });
}
