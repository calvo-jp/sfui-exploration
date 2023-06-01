import { ThemingProps, useMultiStyleConfig } from "@chakra-ui/react";
import * as React from "react";
import { Merge } from "../../types";
import { removeParentFragment, runIfCallable } from "../../utils";
import {
  SelectProviderProps,
  SelectStylesProvider,
  withSelectContext,
} from "./SelectContext";

type Children = React.ReactNode | ((ctx: {}) => React.ReactNode);

export type SelectProps = Merge<
  ThemingProps<"Select"> & SelectProviderProps,
  { children: Children }
>;

export const Select = withSelectContext(function Select({
  children,
  ...props
}: SelectProps) {
  const styles = useMultiStyleConfig("Select", props);
  const nodes = removeParentFragment(runIfCallable(children, {}));

  return <SelectStylesProvider value={styles}>{nodes}</SelectStylesProvider>;
});
