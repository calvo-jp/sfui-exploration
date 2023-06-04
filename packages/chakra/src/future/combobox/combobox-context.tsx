import { createStylesContext, useControllableState } from "@chakra-ui/react";
import * as React from "react";
import { invariant, isString, noop } from "../../utils";
import { UsePopperReturn, usePopper } from "./use-popper";

export const [ComboboxStylesProvider, useComboboxStyles] = createStylesContext(
  "ComboboxStylesContext",
);

interface Option {
  label: string;
  value: string;
}

interface ComboboxState {
  value: string;
  onChange(newValue: string): void;
  popper: UsePopperReturn;
  selectedOption?: Option;
  selectOption: React.Dispatch<React.SetStateAction<Option | undefined>>;
}

export const ComboboxContext = React.createContext<ComboboxState>({
  value: "",
  onChange: noop,
  selectOption: noop,
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

  const popper = usePopper();
  const [selectedOption, selectOption] = React.useState<Option>();

  return (
    <ComboboxContext.Provider
      value={{
        value: controllable[0],
        onChange: controllable[1],
        selectOption,
        selectedOption,
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
