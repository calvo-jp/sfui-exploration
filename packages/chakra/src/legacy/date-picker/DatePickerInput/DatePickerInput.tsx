import {
  Box,
  chakra,
  Icon,
  useControllableState,
  useDisclosure,
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
import { DatePicker } from "../DatePicker/DatePicker";
import CalendarIcon from "../icons/CalendarIcon";
import { Field } from "./components";

type Size = "sm" | "md";

export type DatePickerInputProps = {
  size?: Size;
  value?: Date;
  onChange?(newValue: Date): void;
  placeholder?: string;
  dateFormat?: ((value: Date) => string) | string;
  __fieldTestId?: string;
};

const DatePickerInput$ = function DatePickerInput(
  {
    size = "md",
    value,
    onChange,
    dateFormat,
    placeholder,
    __fieldTestId = "hds.datepicker-input",
  }: DatePickerInputProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
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
      <Field
        ref={fieldRef}
        size={size}
        type="button"
        onClick={onToggle}
        sx={{
          ...(size === "sm" && { h: "40px", py: "8px", px: "12px" }),
          ...(size === "md" && { h: "44px", py: "10px", px: "14px" }),
        }}
        data-testid={__fieldTestId}
        {...getReferenceProps()}
      >
        <Icon
          as={CalendarIcon}
          width="20px"
          height="20px"
          color="neutrals.500"
        />

        <chakra.span>
          {$$value ? dateToString($$value) : placeholder}
        </chakra.span>
      </Field>

      {isMounted && (
        <FloatingPortal>
          <Box
            ref={refs.setFloating}
            sx={{
              top: `${y ?? 0}px`,
              left: `${x ?? 0}px`,
              position: strategy,
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
            />
          </Box>
        </FloatingPortal>
      )}
    </>
  );
};

export const DatePickerInput = React.forwardRef(DatePickerInput$) as (
  props: DatePickerInputProps & { ref?: React.ForwardedRef<HTMLButtonElement> },
) => JSX.Element;
