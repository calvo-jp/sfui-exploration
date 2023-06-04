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
import { SelectProps } from "./select";
import { useSelectContext, useSelectStyles } from "./select-context";

export interface SelectTriggerProps
  extends Merge<SelectProps, React.PropsWithChildren> {}

export const SelectTrigger = forwardRef<SelectTriggerProps, "button">(
  function SelectTrigger({ children, ...props }, ref) {
    const styles = useSelectStyles();
    const context = useSelectContext();

    const mergedRef = useMergeRefs([ref, context.popper.refs.setReference]);

    const noThemeProps = omitThemingProps(props);
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
        {children}
      </chakra.button>
    );
  },
);
