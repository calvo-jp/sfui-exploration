import {
  Box,
  chakra,
  HTMLChakraProps,
  Icon,
  omitThemingProps,
  ThemingProps,
  useControllableState,
  useDisclosure,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useMergeRefs,
  useTransitionStyles,
} from "@floating-ui/react";
import { format } from "date-fns";
import * as React from "react";
import { Merge } from "../../../types";
import { RangeDatePicker } from "../DatePicker/RangeDatePicker";
import CalendarIcon from "../icons/CalendarIcon";
import { DateRange } from "../types";

interface Value {
  start: Date;
  until: Date;
}

interface BaseProps {
  value?: DateRange;
  onChange?(newValue?: Value): void;
  dateFormat?: ((value?: Value) => string) | string;
  placeholder?: string;
  __fieldTestId?: string;
}

export interface RangeDatePickerInputProps
  extends Merge<ThemingProps<"Input"> & HTMLChakraProps<"button">, BaseProps> {}

export const RangeDatePickerInput$ = function RangeDatePickerInput(
  {
    size = "md",
    value,
    onChange,
    dateFormat,
    placeholder,
    __fieldTestId = "hds.range-datepicker-input",
    ...others
  }: RangeDatePickerInputProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const css = useMultiStyleConfig("Input", others);

  const [$$value, $$onChange] = useControllableState({
    value,
    onChange,
  });

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  const { refs, strategy, x, y, context } = useFloating({
    open: isOpen,
    onOpenChange(v) {
      if (v) {
        onOpen();
      } else {
        onClose();
      }
    },
    strategy: "fixed",
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip(),
      shift({
        padding: 6,
      }),
    ],
  });

  const fieldRef = useMergeRefs([ref, refs.setReference]);

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: {
      open: 150,
      close: 100,
    },
  });

  const dismiss = useDismiss(context);
  const { getFloatingProps, getReferenceProps } = useInteractions([dismiss]);

  const dateToString = React.useCallback(
    (d: DateRange) => {
      if (!dateFormat) {
        const str: string[] = [];

        if (d.start) str.push(format(d.start, "MMM dd, yyyy"));
        if (d.until) str.push(format(d.until, "MMM dd, yyyy"));

        return str.join(" - ");
      } else if (typeof dateFormat === "string") {
        const str: string[] = [];

        if (d.start) str.push(format(d.start, dateFormat));
        if (d.until) str.push(format(d.until, dateFormat));

        return str.join(" - ");
      } else {
        return dateFormat(d);
      }
    },
    [dateFormat],
  );

  return (
    <>
      <chakra.button
        ref={fieldRef}
        type="button"
        __css={{
          ...css.field,
          display: "flex",
          textAlign: "left",
          gap: 2,
        }}
        {...(isOpen && {
          "data-focus": true,
        })}
        onClick={onToggle}
        data-testid={__fieldTestId}
        {...omitThemingProps(others)}
        {...getReferenceProps()}
      >
        <Icon
          as={CalendarIcon}
          width="20px"
          height="20px"
          color="neutrals.500"
        />

        <chakra.span>{value ? dateToString(value) : placeholder}</chakra.span>
      </chakra.button>

      {isMounted && (
        <FloatingPortal>
          <Box
            ref={refs.setFloating}
            data-testid="hds.range-datepicker-input.calendar-container"
            sx={{
              pos: strategy,
              top: `${y ?? 0}px`,
              left: `${x ?? 0}px`,
              ...styles,
            }}
            {...getFloatingProps()}
          >
            <RangeDatePicker
              value={$$value}
              onCancel={onClose}
              onApply={(newValue) => {
                $$onChange(newValue);
                onClose();
              }}
              hasTimeAdverbial={false}
              includePreviousMonth={false}
              colorScheme={others.colorScheme}
            />
          </Box>
        </FloatingPortal>
      )}
    </>
  );
};

export const RangeDatePickerInput = React.forwardRef(RangeDatePickerInput$) as (
  props: RangeDatePickerInputProps & {
    ref?: React.ForwardedRef<HTMLButtonElement>;
  },
) => JSX.Element;
