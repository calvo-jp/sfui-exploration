import { Textarea, TextareaProps } from "@chakra-ui/react";
import { forwardRef } from "react";
import Autosize from "react-textarea-autosize";

export interface MultilineProps extends TextareaProps {
  minRows?: number;
  maxRows?: number;
}

export const Multiline = forwardRef<HTMLTextAreaElement, MultilineProps>(
  function Multiline(props, ref) {
    const { minRows = 3, maxRows = 5, ...others } = props;

    return (
      <Textarea
        ref={ref}
        as={Autosize}
        minRows={minRows}
        maxRows={maxRows}
        width="100%"
        minHeight="unset"
        overflow="hidden"
        resize="none"
        {...others}
      />
    );
  },
);
