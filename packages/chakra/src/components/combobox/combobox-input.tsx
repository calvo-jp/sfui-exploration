import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";

export type ComboboxInputProps = HTMLChakraProps<"input">;

export const ComboboxInput = forwardRef<ComboboxInputProps, "input">(
  function ComboboxInput(props, ref) {
    return <chakra.input ref={ref} />;
  },
);
