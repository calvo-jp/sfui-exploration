import { SystemStyleObject, useControllableState } from "@chakra-ui/react";
import { createContext } from "@chakra-ui/react-context";
import * as React from "react";
import { invariant, noop } from "../../utils";

export const [PaginationStylesProvider, usePaginationStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: "PaginationStylesContext",
  errorMessage:
    "'usePaginationStyles' returned 'undefined'. " +
    "Seems you forgot to wrap the components in '<Pagination />'",
});

interface Value {
  page: number;
  size: number;
}

export interface PaginationState {
  value: Value;
  onChange: React.Dispatch<React.SetStateAction<Value>>;
  total: number;
}

const internalDefaultValue = {
  page: 1,
  size: 10,
};

export const PaginationContext = React.createContext<PaginationState>({
  value: internalDefaultValue,
  onChange: noop,
  total: 0,
});

export type PaginationProviderProps = {
  value?: Value;
  onChange?(newValue: Value): void;
  total?: number;
  defaultValue?: Value;
};

export function PaginationProvider({
  value,
  onChange,
  defaultValue,
  total = 0,
  children,
}: React.PropsWithChildren<PaginationProviderProps>) {
  const controllableState = useControllableState({
    value,
    onChange,
    defaultValue: !value && !defaultValue ? internalDefaultValue : defaultValue,
  });

  return (
    <PaginationContext.Provider
      value={{
        total,
        value: controllableState[0],
        onChange: controllableState[1],
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
