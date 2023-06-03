import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";

export type ComboboxOptionProps = HTMLChakraProps<"div">;

export const ComboboxOption = forwardRef<ComboboxOptionProps, "div">(
  function ComboboxOption(props, ref) {
    return <chakra.div ref={ref}></chakra.div>;
  },
);
