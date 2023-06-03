import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { useMergeRefs } from "@floating-ui/react";
import { runIfCallable } from "../../utils";
import { useComboboxContext, useComboboxStyles } from "./combobox-context";

export interface ComboboxOptionProps extends HTMLChakraProps<"div"> {
  label?: string;
  value: string;
  _index?: number;
}

export const ComboboxOption = forwardRef<ComboboxOptionProps, "div">(
  function ComboboxOption(props, ref) {
    const {
      _index = 0,
      label,
      value,
      onClick,
      onKeyDown,
      children,
      ...others
    } = props;

    const styles = useComboboxStyles();
    const context = useComboboxContext();

    const mergedRef = useMergeRefs([
      ref,
      function (node: HTMLDivElement) {
        context.popper.listRef.current[_index] = node;
      },
    ]);

    const handleClick = () => {
      const input = context.popper.refs.domReference
        .current as HTMLInputElement | null;

      input?.focus();
      context.popper.setInputValue(label ?? "");
      context.popper.setIsOpen(false);
      context.onChange(value);
    };

    return (
      <chakra.div
        ref={mergedRef}
        role="option"
        tabIndex={0}
        __css={styles.option}
        {...context.popper.getItemProps({
          "aria-selected": context.popper.activeIndex === _index,
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
        {...others}
      >
        {children ?? label}
      </chakra.div>
    );
  },
);
