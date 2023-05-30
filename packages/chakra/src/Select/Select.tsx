import { ThemingProps, useMultiStyleConfig } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { Merge } from "../types";
import { SelectStylesProvider } from "./SelectContext";

type SelectProps = Merge<ThemingProps<"Select">, {}>;

export function Select({ children, ...props }: PropsWithChildren<SelectProps>) {
  const styles = useMultiStyleConfig("Select", props);

  return <SelectStylesProvider value={styles}>{children}</SelectStylesProvider>;
}
