import { SystemStyleObject } from "@chakra-ui/react";
import { createContext } from "@chakra-ui/react-context";
import * as React from "react";

export const [TableStylesProvider, useTableStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: "TableStylesContext",
  errorMessage:
    "'useTableStyles' returned 'undefined'. " +
    "Seems you forgot to wrap the components in '<Table />'",
});

interface TableState {
  isLoading?: boolean;
}

export const TableContext = React.createContext<TableState>({});

export type TableProviderProps = TableState;

export function TableProvider({
  children,
  isLoading,
}: React.PropsWithChildren<TableState>) {
  return (
    <TableContext.Provider
      value={{
        isLoading,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}
