import { HTMLChakraProps, chakra } from "@chakra-ui/react";
import {
  FloatingPortal,
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
import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { FloatingUiPortalId } from "../../constants";
import { Merge } from "../../types";
import { ChevronDownIcon } from "./icons";
import {
  usePaginationContext,
  usePaginationStyles,
} from "./pagination-context";

interface PaginationSizeControlBaseProps {
  sizes?: number[];
}

export type PaginationSizeControlProps = Merge<
  HTMLChakraProps<"button">,
  PaginationSizeControlBaseProps
>;

export function PaginationSizeControl(props: PaginationSizeControlProps) {
  const { sizes = [10, 25, 50, 100], children, ...others } = props;

  const styles = usePaginationStyles();
  const context = usePaginationContext();

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const { refs, strategy, x, y, ...floating } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip(),
      shift({
        padding: 6,
      }),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  });

  const transition = useTransitionStyles(floating.context);

  const role = useRole(floating.context, { role: "listbox" });
  const click = useClick(floating.context, { event: "mousedown" });
  const dismiss = useDismiss(floating.context);

  const listRef = useRef<(HTMLElement | null)[]>([]);
  const listNav = useListNavigation(floating.context, {
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });

  const { getFloatingProps, getItemProps, getReferenceProps } = useInteractions(
    [dismiss, role, listNav, click],
  );

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(false);
    context.onChange({
      page: 1,
      size: sizes[index],
    });
  };

  return (
    <>
      <chakra.button
        ref={refs.setReference}
        type="button"
        __css={styles.size}
        {...others}
        {...getReferenceProps()}
      >
        <chakra.span>
          {children ?? `Show ${context.value.size} entries`}
        </chakra.span>
        <chakra.svg
          as={ChevronDownIcon}
          w={4}
          h={4}
          className="pagination-sizecontrol__svg"
        />
      </chakra.button>

      {transition.isMounted && (
        <FloatingPortal id={FloatingUiPortalId}>
          <chakra.div
            ref={refs.setFloating}
            __css={{
              pos: strategy,
              top: `${y}px`,
              left: `${x}px`,
              ...transition.styles,
              ...styles.sizeoptions,
            }}
            {...getFloatingProps()}
          >
            {sizes.map((size, index) => (
              <chakra.div
                key={uuid()}
                ref={(node) => {
                  listRef.current[index] = node;
                }}
                role="option"
                tabIndex={0}
                aria-selected={index === activeIndex}
                {...getItemProps({
                  onClick() {
                    handleSelect(index);
                  },
                  onKeyDown(event) {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleSelect(index);
                    }
                  },
                })}
                __css={styles.sizeoption}
              >
                Show {size} entries
              </chakra.div>
            ))}
          </chakra.div>
        </FloatingPortal>
      )}
    </>
  );
}
