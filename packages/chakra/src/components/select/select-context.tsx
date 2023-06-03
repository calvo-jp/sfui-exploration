import { createStylesContext, useControllableState } from "@chakra-ui/react";
import * as React from "react";
import { UseSelectPopperReturn, useSelectPopper } from "../../hooks";
import { Callable } from "../../types";
import { invariant, noop } from "../../utils";

export const [SelectStylesProvider, useSelectStyles] = createStylesContext(
  "SelectStylesContext",
);

export interface Option {
  label?: string;
  value: string;
}

export interface SelectState {
  value: string;
  onChange(newValue: string): void;
  popper: UseSelectPopperReturn;
  selectedOption?: Option;
  setSelectedOption: React.Dispatch<React.SetStateAction<Option | undefined>>;
}

export const SelectContext = React.createContext<SelectState>({
  value: "",
  onChange: noop,
  popper: {} as any,
  setSelectedOption: noop,
});

export interface SelectProviderProps {
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

  const popper = useSelectPopper();
  const [selectedOption, setSelectedOption] = React.useState<Option>();

  return (
    <SelectContext.Provider
      value={{
        value: controllable[0],
        onChange: controllable[1],
        selectedOption,
        setSelectedOption,
        popper,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
}

export function useSelectContext() {
  const context = React.useContext(SelectContext);

  invariant(
    context,
    "'useSelectContext' returned 'undefined'. " +
      "Seems you forgot to wrap the components in '<Select />'",
  );

  return context;
}

export function withSelectContext<T extends SelectProviderProps>(
  Component: Callable<JSX.Element, [T]>,
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
