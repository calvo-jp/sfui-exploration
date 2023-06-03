import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import {
  FloatingFocusManager,
  FloatingPortal,
  useMergeRefs,
} from "@floating-ui/react";
import * as React from "react";
import { FloatingUiPortalId } from "../../constants";
import { useComboboxContext, useComboboxStyles } from "./combobox-context";

export interface ComboboxOptionsProps extends HTMLChakraProps<"div"> {}

export const ComboboxOptions = forwardRef<ComboboxOptionsProps, "div">(
  function ComboboxOptions({ children, ...props }, ref) {
    const styles = useComboboxStyles();
    const context = useComboboxContext();

    const mergedRef = useMergeRefs([context.popper.refs.setFloating, ref]);

    const clones = React.Children.map(children, (child, _index) => {
      return React.isValidElement(child)
        ? React.cloneElement<any>(child, { _index })
        : child;
    });

    return !context.popper.isMounted ? null : (
      <FloatingPortal id={FloatingUiPortalId}>
        <FloatingFocusManager
          context={context.popper.context}
          initialFocus={-1}
          visuallyHiddenDismiss
        >
          <chakra.div
            ref={mergedRef}
            __css={{
              pos: context.popper.strategy,
              top: `${context.popper.y}px`,
              left: `${context.popper.x}px`,
              ...styles.options,
            }}
            {...context.popper.getFloatingProps()}
            {...props}
          >
            {clones}
          </chakra.div>
        </FloatingFocusManager>
      </FloatingPortal>
    );
  },
);
