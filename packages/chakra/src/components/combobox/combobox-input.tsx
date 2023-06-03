import {
  FormControlOptions,
  HTMLChakraProps,
  chakra,
  forwardRef,
  useFormControlProps,
} from "@chakra-ui/react";
import { useMergeRefs } from "@floating-ui/react";
import { omitFormControlProps } from "../../utils";
import { useComboboxStyles } from "./combobox-context";

type Omitted = "disabled" | "required" | "readOnly" | "size";

export interface ComboboxInputProps
  extends Omit<HTMLChakraProps<"input">, Omitted>,
    FormControlOptions {}

export const ComboboxInput = forwardRef<ComboboxInputProps, "input">(
  function ComboboxInput(props, ref) {
    const styles = useComboboxStyles();

    const mergedRef = useMergeRefs([ref]);

    const inputProps = useFormControlProps<HTMLInputElement>(props);
    const ownProps = omitFormControlProps(props);

    return (
      <chakra.input
        ref={mergedRef}
        __css={styles.input}
        {...inputProps}
        {...ownProps}
      />
    );
  },
);
