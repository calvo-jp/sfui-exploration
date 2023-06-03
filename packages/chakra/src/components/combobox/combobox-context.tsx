import { createStylesContext, useControllableState } from "@chakra-ui/react";
import * as React from "react";
import { UseComboboxPopperReturn, useComboboxPopper } from "../../hooks";
import { invariant, isString, noop } from "../../utils";

export const [ComboboxStylesProvider, useComboboxStyles] = createStylesContext(
  "ComboboxStylesContext",
);

interface ComboboxState {
  value: string;
  onChange(newValue: string): void;
  popper: UseComboboxPopperReturn;
}

export const ComboboxContext = React.createContext<ComboboxState>({
  value: "",
  onChange: noop,
  popper: {} as any,
});

export interface ComboboxProvider {
  value?: string;
  onChange?(newValue: string): void;
  defaultValue?: string;
}

export function ComboboxProvider({
  value,
  onChange,
  defaultValue,
  children,
}: React.PropsWithChildren<ComboboxProvider>) {
  const controllable = useControllableState({
    value,
    onChange,
    defaultValue:
      !isString(value) && !isString(defaultValue) ? "" : defaultValue,
  });

  const popper = useComboboxPopper();

  return (
    <ComboboxContext.Provider
      value={{
        value: controllable[0],
        onChange: controllable[1],
        popper,
      }}
    >
      {children}
    </ComboboxContext.Provider>
  );
}

export function useComboboxContext() {
  const context = React.useContext(ComboboxContext);

  invariant(
    context,
    "'useComboboxContext' returned 'undefined'. " +
      "Seems you forgot to wrap the components in '<Combobox />'",
  );

  return context;
}
