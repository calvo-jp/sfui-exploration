import { ThemingProps, useMultiStyleConfig } from "@chakra-ui/react";
import * as React from "react";
import { ComboboxStylesProvider } from "./combobox-context";

export interface ComboboxProps
  extends React.PropsWithChildren<ThemingProps<"Combobox">> {}

export function Combobox(props: ComboboxProps) {
  const styles = useMultiStyleConfig("Combobox");

  return (
    <ComboboxStylesProvider value={styles}>
      {props.children}
    </ComboboxStylesProvider>
  );
}
