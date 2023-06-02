import { ThemingProps, useMultiStyleConfig } from "@chakra-ui/react";
import * as React from "react";
import { Merge } from "../../types";
import { removeParentFragment, runIfCallable } from "../../utils";
import {
  Option,
  SelectProviderProps,
  SelectStylesProvider,
  useSelectContext,
  withSelectContext,
} from "./SelectContext";

interface RenderChildrenContext {
  selectedOption?: Option;
}

type Children =
  | React.ReactNode
  | ((ctx: RenderChildrenContext) => React.ReactNode);

export type SelectProps = Merge<
  ThemingProps<"Select"> & SelectProviderProps,
  { children: Children }
>;

export const Select = withSelectContext(function Select({
  children,
  ...props
}: SelectProps) {
  const styles = useMultiStyleConfig("Select", props);
  const context = useSelectContext();
  const nodes = removeParentFragment(
    runIfCallable(children, {
      selectedOption: context.selectedOption,
    }),
  );

  return <SelectStylesProvider value={styles}>{nodes}</SelectStylesProvider>;
});
