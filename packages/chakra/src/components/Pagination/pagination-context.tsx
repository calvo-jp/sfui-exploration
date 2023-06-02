import { SystemStyleObject, useControllableState } from "@chakra-ui/react";
import { createContext } from "@chakra-ui/react-context";
import * as React from "react";
import { UseSelectPopperReturn, useSelectPopper } from "../../hooks";
import { invariant, noop } from "../../utils";
import { Page, Value } from "./types";
import { usePages } from "./utils";

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
  total: number;
  pages: Page[];
  popper: UseSelectPopperReturn;
}

const internalDefaultValue: Value = {
  page: 1,
  size: 10,
};

export const PaginationContext = React.createContext<PaginationState>({
  value: internalDefaultValue,
  onChange: noop,
  total: 0,
  pages: [],
  popper: {} as any,
});

export type PaginationProviderProps = {
  value?: Value;
  onChange?(newValue: Value): void;
  total?: number;
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

  const pages = usePages({
    size: controllableState[0].size,
    total,
    siblingCount,
  });

  const popper = useSelectPopper();

  return (
    <PaginationContext.Provider
      value={{
        total,
        pages,
        value: controllableState[0],
        onChange: controllableState[1],
        popper,
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
