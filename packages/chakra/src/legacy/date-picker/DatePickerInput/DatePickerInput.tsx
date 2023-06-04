import {
  Box,
  chakra,
  ThemingProps,
  useControllableState,
  useDisclosure,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
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
import { DatePicker } from "../DatePicker/DatePicker";
import CalendarIcon from "../icons/CalendarIcon";

export interface DatePickerInputProps extends ThemingProps<"Input"> {
  value?: Date;
  onChange?(newValue: Date): void;
  placeholder?: string;
  dateFormat?: ((value: Date) => string) | string;
  __fieldTestId?: string;
}

const DatePickerInput$ = function DatePickerInput(
  {
    size = "md",
    value,
    onChange,
    dateFormat,
    placeholder,
    __fieldTestId = "hds.datepicker-input",
    ...others
  }: DatePickerInputProps,
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
      open: 50,
      close: 25,
    },
  });

  const dismiss = useDismiss(context);
  const { getFloatingProps, getReferenceProps } = useInteractions([dismiss]);

  const dateToString = React.useCallback(
    (d: Date) => {
      if (!dateFormat) {
        return format(d, "MMM dd, yyyy");
      } else if (typeof dateFormat === "string") {
        return format(d, dateFormat);
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
        onClick={onToggle}
        __css={{
          ...css.field,
          display: "flex",
          textAlign: "left",
          gap: 2,
        }}
        {...(isOpen && {
          "data-focus": true,
        })}
        data-testid={__fieldTestId}
        {...getReferenceProps()}
      >
        <chakra.svg as={CalendarIcon} w={5} h={5} color="neutral.500" />

        <chakra.span flexGrow={1}>
          {$$value ? dateToString($$value) : placeholder}
        </chakra.span>
      </chakra.button>

      {isMounted && (
        <FloatingFocusManager context={context}>
          <FloatingPortal>
            <Box
              ref={refs.setFloating}
              __css={{
                pos: strategy,
                top: `${y ?? 0}px`,
                left: `${x ?? 0}px`,
                outline: "none",
                ...styles,
              }}
              data-testid="hds.range-datepicker-input.calendar-container"
              {...getFloatingProps()}
            >
              <DatePicker
                value={$$value}
                onChange={(newValue) => {
                  $$onChange(newValue);
                  onClose();
                }}
                {...others}
              />
            </Box>
          </FloatingPortal>
        </FloatingFocusManager>
      )}
    </>
  );
};

export const DatePickerInput = React.forwardRef(DatePickerInput$) as (
  props: DatePickerInputProps & { ref?: React.ForwardedRef<HTMLButtonElement> },
) => JSX.Element;
