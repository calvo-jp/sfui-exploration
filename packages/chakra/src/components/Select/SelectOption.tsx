import { HTMLChakraProps, chakra } from "@chakra-ui/react";
import { useMergeRefs } from "@floating-ui/react";
import * as React from "react";
import { Merge } from "../../types";
import { useSelectContext, useSelectStyles } from "./SelectContext";

export type SelectOptionProps = Merge<
  HTMLChakraProps<"div">,
  {
    value: string;
    label?: string;
    $$index?: number;
  }
>;

export const SelectOption = React.forwardRef<HTMLDivElement, SelectOptionProps>(
  function SelectOption(props, ref) {
    const { $$index = 0, value, label, children, ...others } = props;

    const styles = useSelectStyles();
    const context = useSelectContext();

    const mergedRef = useMergeRefs([
      ref,
      function (node: HTMLDivElement) {
        context.popper.listRef.current[$$index] = node;
      },
    ]);

    const onClick = () => {
      context.popper.setActiveIndex($$index);
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
        aria-selected={context.popper.activeIndex === $$index}
        __css={styles.option}
        {...others}
        {...context.popper.getItemProps({
          onClick,
          onKeyDown(event) {
            if (event.key === "Enter") {
              event.preventDefault();

              onClick();
            }
          },
        })}
      >
        {children ?? label}
      </chakra.div>
    );
  },
);
