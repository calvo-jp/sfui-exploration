import { createStylesContext } from "@chakra-ui/react";
import { createContext } from "../../utils";
import { UsePaginationReturn } from "./use-pagination";
import { UsePopperReturn } from "./use-popper";

export const [PaginationStylesProvider, usePaginationStyles] =
  createStylesContext("PaginationStylesContext");

export interface IPaginationContext extends UsePaginationReturn {
  popper: UsePopperReturn;
}

export const [PaginationProvider, usePaginationContext] =
  createContext<IPaginationContext>({
    name: "PaginationContext",
    hookName: "usePaginationContext",
    providerName: "<PaginationProvider />",
  });
