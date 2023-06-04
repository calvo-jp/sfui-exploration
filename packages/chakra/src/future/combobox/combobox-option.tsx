import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { useMergeRefs } from "@floating-ui/react";
import { runIfCallable } from "../../utils";
import { useComboboxContext, useComboboxStyles } from "./combobox-context";

export interface ComboboxOptionProps extends HTMLChakraProps<"div"> {
  label: string;
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

      context.popper.setInputValue(label ?? "");
      context.popper.setIsOpen(false);
      context.onChange(value);
      context.selectOption({
        label,
        value,
      });

      input?.focus();
    };

    const matchesSearch = !label
      .toLowerCase()
      .startsWith(context.popper.inputValue.toLowerCase());

    if (matchesSearch) return null;

    return (
      <chakra.div
        ref={mergedRef}
        role="option"
        tabIndex={0}
        aria-selected={context.popper.activeIndex === _index}
        __css={styles.option}
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
        {...others}
      >
        {children ?? label}
      </chakra.div>
    );
  },
);