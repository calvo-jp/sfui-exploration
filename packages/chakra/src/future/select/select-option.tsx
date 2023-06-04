import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { useMergeRefs } from "@floating-ui/react";
import { Merge } from "../../types";
import { runIfCallable } from "../../utils";
import { CheckIcon } from "./icons";
import { useSelectContext, useSelectStyles } from "./select-context";

interface SelectOptionBaseProps {
  value: string;
  label?: string;
  /**
   *
   * ⚠️ INTERNAL USE
   *
   */
  _index?: number;
}

export interface SelectOptionProps
  extends Merge<HTMLChakraProps<"div">, SelectOptionBaseProps> {}

export const SelectOption = forwardRef<SelectOptionProps, "div">(
  function SelectOption(props, ref) {
    const {
      _index = 0,
      value,
      label,
      onClick,
      onKeyDown,
      children,
      ...others
    } = props;

    const styles = useSelectStyles();
    const context = useSelectContext();

    const mergedRef = useMergeRefs([
      ref,
      function (node: HTMLDivElement) {
        context.popper.listRef.current[_index] = node;
      },
    ]);

    const handleClick = () => {
      context.popper.setActiveIndex(_index);
      context.popper.setIsOpen(false);
      context.onChange(value);
      context.setSelectedOption({
        value,
        label,
      });
    };

    return (
      <chakra.div
        ref={mergedRef}
        role="option"
        tabIndex={0}
        aria-selected={context.popper.activeIndex === _index}
        __css={styles.option}
        {...others}
        {...context.popper.getItemProps({
          onClick(event) {
            handleClick();
            runIfCallable(
              onClick,
              event as React.MouseEvent<HTMLDivElement, MouseEvent>,
            );
          },
          onKeyDown(event) {
            if (event.key === "Enter") {
              event.preventDefault();

              handleClick();
              runIfCallable(
                onKeyDown,
                event as React.KeyboardEvent<HTMLDivElement>,
              );
            }
          },
        })}
      >
        <chakra.span flexGrow={1}>{children ?? label}</chakra.span>

        {!children /* only render check as default */ &&
          value === context.value && (
            <chakra.svg as={CheckIcon} w={4} h={4} stroke="success.600" />
          )}
      </chakra.div>
    );
  },
);
