import {
  FormControlOptions,
  HTMLChakraProps,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import * as React from "react";
import { Merge } from "../../types";
import { removeParentFragment, runIfCallable } from "../../utils";
import {
  Option,
  SelectProviderProps,
  SelectStylesProvider,
  useSelectContext,
  withSelectContext,
} from "./select-context";
import { SelectTrigger } from "./select-trigger";

interface RenderChildrenContext {
  selectedOption?: Option;
}

type Children =
  | React.ReactNode
  | ((ctx: RenderChildrenContext) => React.ReactNode);

interface SelectBaseProps {
  children?: Children;
}

type Omitted = "disabled" | "required" | "readOnly" | "size";

export interface SelectProps
  extends Merge<
    Omit<HTMLChakraProps<"button">, Omitted> &
      ThemingProps<"Select"> &
      SelectProviderProps &
      FormControlOptions,
    SelectBaseProps
  > {}

/**
 *
 * Props passed to this component will be forwarded to `SelectTrigger`
 *
 */
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

  const clones = React.Children.map(nodes, (child) => {
    if (React.isValidElement(child) && child.type === SelectTrigger) {
      return React.cloneElement<any>(child, props);
    }

    return child;
  });

  return <SelectStylesProvider value={styles}>{clones}</SelectStylesProvider>;
});
