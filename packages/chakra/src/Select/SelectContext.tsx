import { SystemStyleObject, useControllableState } from "@chakra-ui/react";
import { createContext } from "@chakra-ui/react-context";
import * as React from "react";
import { Nullable } from "vitest";
import { noop } from "../utils";

export const [SelectStylesProvider, useSelectStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: "SelectStylesContext",
  errorMessage:
    "'useSelectStyles' returned 'undefined'. " +
    "Seems you forgot to wrap the components in '<Select />'",
});

interface Option {
  value: string;
  label?: string;
}

interface SelectState {
  value: string;
  onChange(newValue: string): void;
  selectOption(option: Nullable<Option>): void;
  selectedOption: Nullable<Option>;
}

export const SelectContext = React.createContext<SelectState>({
  value: "",
  onChange: noop,
  selectOption: noop,
  selectedOption: null,
});

interface SelectProviderProps {
  value?: string;
  onChange?(newValue: string): void;
  defaultValue?: string;
}

export function SelectProvider({
  value,
  onChange,
  defaultValue,
  children,
}: React.PropsWithChildren<SelectProviderProps>) {
  const controllable = useControllableState({
    value,
    onChange,
    defaultValue: !value && !defaultValue ? "" : defaultValue,
  });

  return (
    <SelectContext.Provider
      value={{
        value: controllable[0],
        onChange: controllable[1],
      }}
    >
      {children}
    </SelectContext.Provider>
  );
}
