import { HTMLChakraProps, chakra } from "@chakra-ui/react";
import {
  FloatingFocusManager,
  FloatingPortal,
  useMergeRefs,
} from "@floating-ui/react";
import * as React from "react";
import { FloatingUiPortalId } from "../../constants";
import { Pretty } from "../../types";
import { useSelectContext, useSelectStyles } from "./select-context";

export type SelectOptionsProps = Pretty<HTMLChakraProps<"div">>;

export const SelectOptions = React.forwardRef<
  HTMLDivElement,
  SelectOptionsProps
>(function SelectOptions(props, ref) {
  const { children, ...others } = props;

  const styles = useSelectStyles();
  const context = useSelectContext();
  const mergedRef = useMergeRefs([ref, context.popper.refs.setFloating]);

  const clones = React.Children.map(children, (child, $$index) => {
    return React.isValidElement(child)
      ? React.cloneElement<any>(child, { $$index })
      : child;
  });

  if (!context.popper.isMounted) return null;

  return (
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
});
