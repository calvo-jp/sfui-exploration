import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import { useMergeRefs } from "@floating-ui/react";

export interface ComboboxOptionsProps extends HTMLChakraProps<"div"> {}

export const ComboboxOptions = forwardRef<ComboboxOptionsProps, "div">(
  function ComboboxOptions({ children }, ref) {
    const mergedRef = useMergeRefs([ref]);

    return <chakra.div ref={mergedRef}>{children}</chakra.div>;
  },
);
