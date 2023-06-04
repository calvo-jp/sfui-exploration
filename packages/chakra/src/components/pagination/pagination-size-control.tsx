import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import {
  FloatingFocusManager,
  FloatingPortal,
  useMergeRefs,
} from "@floating-ui/react";
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

const defaultSizes = [10, 25, 50, 100];

export interface PaginationSizeControlProps
  extends Merge<HTMLChakraProps<"button">, PaginationSizeControlBaseProps> {}

export const PaginationSizeControl = forwardRef<
  PaginationSizeControlProps,
  "button"
>(function PaginationSizeControl(props, ref) {
  const { sizes = defaultSizes, children, ...others } = props;

  const styles = usePaginationStyles();
  const context = usePaginationContext();

  const mergedRef = useMergeRefs([ref, context.popper.refs.setReference]);

  const handleSelect = (index: number) => {
    context.popper.setActiveIndex(index);
    context.popper.setIsOpen(false);
    context.updateSize(sizes[index]);
  };

  return (
    <>
      <chakra.button
        ref={mergedRef}
        type="button"
        __css={styles.size}
        {...context.popper.getReferenceProps()}
        {...others}
      >
        <chakra.span>{children ?? `Show ${context.size} entries`}</chakra.span>
        <chakra.svg
          as={ChevronDownIcon}
          w={4}
          h={4}
          className="pagination-sizecontrol-icon"
        />
      </chakra.button>

      {context.popper.isMounted && (
        <FloatingFocusManager context={context.popper.context}>
          <FloatingPortal id={FloatingUiPortalId}>
            <chakra.div
              ref={context.popper.refs.setFloating}
              __css={{
                pos: context.popper.strategy,
                top: `${context.popper.y}px`,
                left: `${context.popper.x}px`,
                ...context.popper.styles,
                ...styles.sizeoptions,
              }}
              {...context.popper.getFloatingProps()}
            >
              {sizes.map((size, index) => (
                <chakra.div
                  key={uuid()}
                  ref={(node) => {
                    context.popper.listRef.current[index] = node;
                  }}
                  role="option"
                  tabIndex={0}
                  aria-selected={index === context.popper.activeIndex}
                  {...context.popper.getItemProps({
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
        </FloatingFocusManager>
      )}
    </>
  );
});
