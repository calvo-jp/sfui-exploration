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

export function useComboboxPopper() {
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
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
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

export type UseComboboxPopperReturn = ReturnType<typeof useComboboxPopper>;
