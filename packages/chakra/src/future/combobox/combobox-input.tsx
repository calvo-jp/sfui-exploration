import {
  FormControlOptions,
  HTMLChakraProps,
  chakra,
  forwardRef,
  useFormControl,
} from "@chakra-ui/react";
import { useMergeRefs } from "@floating-ui/react";
import { omitFormControlProps } from "../../utils";
import { useComboboxContext, useComboboxStyles } from "./combobox-context";

type Omitted = "disabled" | "required" | "readOnly" | "size";

export interface ComboboxInputProps
  extends Omit<HTMLChakraProps<"input">, Omitted>,
    FormControlOptions {}

export const ComboboxInput = forwardRef<ComboboxInputProps, "input">(
  function ComboboxInput(props, ref) {
    const styles = useComboboxStyles();
    const context = useComboboxContext();

    const mergedRef = useMergeRefs([context.popper.refs.setReference, ref]);

    const inputProps = useFormControl<HTMLInputElement>(props);
    const ownProps = omitFormControlProps(props);

    return (
      <chakra.input
        ref={mergedRef}
        __css={styles.input}
        value={context.popper.inputValue}
        onChange={(e) => {
          const newValue = e.target.value;

          context.popper.setInputValue(newValue);

          if (newValue) {
            context.popper.setIsOpen(true);
            context.popper.setActiveIndex(0);
          } else {
            context.popper.setIsOpen(false);
          }
        }}
        {...ownProps}
        {...context.popper.getReferenceProps(inputProps)}
      />
    );
  },
);
