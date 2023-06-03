import { ThemingProps, useMultiStyleConfig } from "@chakra-ui/react";
import * as React from "react";
import { Merge } from "../../types";
import { removeParentFragment, runIfCallable } from "../../utils";
import { ComboboxProvider, ComboboxStylesProvider } from "./combobox-context";

type Children = React.ReactNode | ((context: {}) => React.ReactNode);

interface ComboboxBaseProps {
  children?: Children;
}

export interface ComboboxProps
  extends Merge<ThemingProps<"Combobox">, ComboboxBaseProps> {}

export function Combobox(props: ComboboxProps) {
  const styles = useMultiStyleConfig("Combobox", props);

  return (
    <ComboboxStylesProvider value={styles}>
      <ComboboxProvider {...props}>
        {removeParentFragment(runIfCallable(props.children, {}))}
      </ComboboxProvider>
    </ComboboxStylesProvider>
  );
}
