import { createStylesContext } from "@chakra-ui/react";
import { createContext } from "../../utils";

export const [TableStylesProvider, useTableStyles] = createStylesContext(
  "CustomTableStylesContext",
);

interface TableContext {
  isLoading?: boolean;
}

export const [TableProvider, useTableContext] = createContext<TableContext>({
  name: "CustomTableContext",
  hookName: "useCustomTableContext",
  providerName: "<CustomTableProvider />",
});
