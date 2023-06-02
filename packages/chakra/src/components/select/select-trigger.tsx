import {
  chakra,
  forwardRef,
  omitThemingProps,
  useFormControl,
} from "@chakra-ui/react";
import { useMergeRefs } from "@floating-ui/react";
import * as React from "react";
import { Merge } from "../../types";
import { omitFormControlProps } from "../../utils";
import { ChevronDownIcon } from "./icons";
import { SelectProps } from "./select";
import { useSelectContext, useSelectStyles } from "./select-context";

export type SelectTriggerProps = Merge<SelectProps, React.PropsWithChildren>;

export const SelectTrigger = forwardRef<SelectTriggerProps, "button">(
  function SelectTrigger(props, ref) {
    const { children, ...others } = props;

    const styles = useSelectStyles();
    const context = useSelectContext();

    const mergedRef = useMergeRefs([ref, context.popper.refs.setReference]);

    const noThemeProps = omitThemingProps(others);
    const buttonProps = useFormControl<HTMLButtonElement>(noThemeProps);
    const ownProps = omitFormControlProps(buttonProps);

    return (
      <chakra.button
        ref={mergedRef}
        type="button"
        __css={styles.trigger}
        {...ownProps}
        {...context.popper.getReferenceProps(buttonProps)}
      >
        <chakra.span flexGrow={1}>{children}</chakra.span>
        <chakra.svg
          as={ChevronDownIcon}
          __css={{
            ...styles.icon,
            transform: "rotate(0deg)",
            transition: "transform 300ms ease-in-out",
            ...(context.popper.isOpen && {
              transform: "rotate(180deg)",
            }),
          }}
        />
      </chakra.button>
    );
  },
);
