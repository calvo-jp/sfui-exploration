import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";

export type ComboboxOptionsProps = HTMLChakraProps<"div">;

export const ComboboxOptions = forwardRef<ComboboxOptionsProps, "div">(
  function ComboboxOptions(props, ref) {
    return <chakra.div ref={ref}></chakra.div>;
  },
);
