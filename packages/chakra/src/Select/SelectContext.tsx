import { SystemStyleObject, useControllableState } from "@chakra-ui/react";
import { createContext } from "@chakra-ui/react-context";
import * as React from "react";
import { noop } from "../utils";

export const [SelectStylesProvider, useSelectStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: "SelectStylesContext",
  errorMessage:
    "'useSelectStyles' returned 'undefined'. " +
    "Seems you forgot to wrap the components in '<Select />'",
});

interface SelectState {
  value: string;
  onChange(newValue: string): void;
}

export const SelectContext = React.createContext<SelectState>({
  value: "",
  onChange: noop,
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

export function withSelectContext<T extends SelectProviderProps>(
  Component: (props: T) => JSX.Element,
) {
  return function Wrapper(props: T) {
    return (
      <SelectProvider
        value={props.value}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
      >
        <Component {...props} />
      </SelectProvider>
    );
  };
}
