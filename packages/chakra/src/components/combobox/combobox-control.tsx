import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";

export type ComboboxControlProps = HTMLChakraProps<"div">;

export const ComboboxControl = forwardRef<ComboboxControlProps, "div">(
  function ComboboxControl(props, ref) {
    return <chakra.div ref={ref} />;
  },
);
