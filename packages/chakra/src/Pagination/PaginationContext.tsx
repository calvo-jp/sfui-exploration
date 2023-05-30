import { SystemStyleObject } from "@chakra-ui/react";
import { createContext } from "@chakra-ui/react-context";

export const [PaginationStylesProvider, usePaginationStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: "PaginationStylesContext",
  errorMessage:
    "'usePaginationStyles' returned 'undefined'. " +
    "Seems you forgot to wrap the components in '<Pagination />'",
});
