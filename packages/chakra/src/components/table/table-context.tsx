import { createStylesContext } from "@chakra-ui/react";
import * as React from "react";

export const [TableStylesProvider, useTableStyles] = createStylesContext(
  "CustomTableStylesContext",
);

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
