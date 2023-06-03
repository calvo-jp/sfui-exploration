import {
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import * as React from "react";

export function useComboboxPopper() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

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
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
  });

  const role = useRole(floating.context, { role: "listbox" });
  const dismiss = useDismiss(floating.context);
  const interactions = useInteractions([dismiss, role, listNav]);
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
    inputValue,
    setInputValue,
  };
}

export type UseComboboxPopperReturn = ReturnType<typeof useComboboxPopper>;
