import { SystemStyleObject } from "@chakra-ui/react";
import { createContext } from "@chakra-ui/react-context";

export const [TableStylesProvider, useTableStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: "TableStylesContext",
  errorMessage:
    "'useTableStyles' returned 'undefined'. " +
    "Seems you forgot to wrap the components in '<Table />'",
});
