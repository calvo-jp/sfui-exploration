import { SystemStyleObject, useControllableState } from "@chakra-ui/react";
import { createContext } from "@chakra-ui/react-context";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import * as React from "react";
import { invariant, noop } from "../../utils";

export const [SelectStylesProvider, useSelectStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: "SelectStylesContext",
  errorMessage:
    "'useSelectStyles' returned 'undefined'. " +
    "Seems you forgot to wrap the components in '<Select />'",
});

export interface SelectState {
  value: string;
  onChange(newValue: string): void;
  popper: ReturnType<typeof usePopper>;
}

export const SelectContext = React.createContext<SelectState>({
  value: "",
  onChange: noop,
  popper: {} as any,
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

  const popper = usePopper();

  return (
    <SelectContext.Provider
      value={{
        value: controllable[0],
        onChange: controllable[1],
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

export function usePopper() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const floating = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    strategy: "fixed",
    middleware: [
      offset(4),
      flip(),
      shift({ padding: 6 }),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  });

  const listRef = React.useRef<(HTMLElement | null)[]>([]);
  const listNav = useListNavigation(floating.context, {
    loop: true,
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
  });

  const role = useRole(floating.context, { role: "listbox" });
  const click = useClick(floating.context, { event: "mousedown" });
  const dismiss = useDismiss(floating.context);
  const interactions = useInteractions([dismiss, role, listNav, click]);
  const transitionStyles = useTransitionStyles(floating.context, {
    duration: {
      open: 150,
      close: 100,
    },
  });

  return {
    ...floating,
    ...interactions,
    ...transitionStyles,

    listRef,
    isOpen,
    setIsOpen,
    activeIndex,
    setActiveIndex,
    selectedIndex,
    setSelectedIndex,
  };
}
