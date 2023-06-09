import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HTMLChakraProps,
  useId,
} from "@chakra-ui/react";
import * as React from "react";

type RenderChildrenContext = {
  id?: string;
  hintId?: string;
  errorId?: string;
  labelId?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  errorMsg?: string;
};

export interface FormGroupProps
  extends Omit<HTMLChakraProps<"div">, "children"> {
  id?: string;
  hint?: string;
  label?: string;
  error?: string | boolean;
  children?: JSX.Element | ((context: RenderChildrenContext) => JSX.Element);
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;

  __hintTestId?: string;
  __errorTestId?: string;
  __labelTestId?: string;
  __groupTestId?: string;
}

export default React.forwardRef<HTMLDivElement, FormGroupProps>(
  function FormGroup(props, ref) {
    const {
      id,
      hint,
      label,
      error,
      children,
      isDisabled,
      isReadOnly,
      isRequired,

      __hintTestId = "hds.form-group.hint",
      __errorTestId = "hds.form-group.error",
      __labelTestId = "hds.form-group.label",
      __groupTestId = "hds.form-group.group",

      ...others
    } = props;

    const fallbackId = useId();
    const formId = id ?? fallbackId;
    const labelId = "label-" + formId;
    const errorId = "error-" + formId;
    const hintId = "hint-" + formId;

    const shouldShowError = typeof error === "string" && !!error.trim().length;
    const shouldShowHint = !shouldShowError && !!hint;

    return (
      <FormControl
        id={formId}
        ref={ref}
        isInvalid={!!error}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isRequired={isRequired}
        data-testid={__groupTestId}
        __css={others}
      >
        {!!label && (
          <FormLabel
            id={labelId}
            htmlFor={formId}
            data-testid={__labelTestId}
            _disabled={{}}
          >
            {label}
          </FormLabel>
        )}

        {typeof children === "function"
          ? children({
              id: formId,
              isInvalid: !!error,
              isDisabled,
              isReadOnly,
              errorId,
              labelId,
              hintId,
              ...(shouldShowError && {
                errorMsg: error,
              }),
            })
          : children}

        {shouldShowHint && (
          <FormHelperText id={hintId} data-testid={__hintTestId}>
            {hint}
          </FormHelperText>
        )}

        {shouldShowError && (
          <FormErrorMessage id={errorId} data-testid={__errorTestId}>
            {error}
          </FormErrorMessage>
        )}
      </FormControl>
    );
  },
);
