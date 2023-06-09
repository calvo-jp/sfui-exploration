import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/react";
import {
  FloatingFocusManager,
  FloatingPortal,
  useMergeRefs,
} from "@floating-ui/react";
import * as React from "react";
import { FloatingUiPortalId } from "../../constants";
import { useSelectContext, useSelectStyles } from "./select-context";

export interface SelectOptionsProps extends HTMLChakraProps<"div"> {}

export const SelectOptions = forwardRef<SelectOptionsProps, "div">(
  function SelectOptions(props, ref) {
    const { children, ...others } = props;

    const styles = useSelectStyles();
    const context = useSelectContext();
    const mergedRef = useMergeRefs([ref, context.popper.refs.setFloating]);

    const clones = React.Children.map(children, (child, _index) => {
      return React.isValidElement(child)
        ? React.cloneElement<any>(child, { _index })
        : child;
    });

    return !context.popper.isMounted ? null : (
      <FloatingPortal id={FloatingUiPortalId}>
        <FloatingFocusManager context={context.popper.context}>
          <chakra.div
            ref={mergedRef}
            __css={{
              pos: context.popper.strategy,
              top: context.popper.y + "px",
              left: context.popper.x + "px",
              ...context.popper.styles,
              ...styles.options,
            }}
            {...others}
            {...context.popper.getFloatingProps()}
          >
            {clones}
          </chakra.div>
        </FloatingFocusManager>
      </FloatingPortal>
    );
  },
);
