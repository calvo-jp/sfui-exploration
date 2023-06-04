import { Spacer, chakra } from "@chakra-ui/react";
import { format } from "date-fns";
import { useDatePickerStylesContext } from "./DatePickerContext";
import { useRangeDatePickerContext } from "./RangeDatePickerContext";

interface RangeDatePickerFooterProps {
  hasSelectedDetails?: boolean;
  onCancel?(): void;
  onApply?(): void;
}

export function RangeDatePickerFooter({
  onApply,
  onCancel,
  hasSelectedDetails,
}: RangeDatePickerFooterProps) {
  const styles = useDatePickerStylesContext();
  const context = useRangeDatePickerContext();

  return (
    <chakra.div __css={styles.footer}>
      {hasSelectedDetails && <SelectedRange />}

      <Spacer />

      <chakra.div display="flex" gap="12px" __css={styles.footerbutton}>
        <chakra.button
          className="datepicker-footerbutton-cancel"
          onClick={onCancel}
          data-testid="hds.range-datepicker.controls.cancel"
        >
          Cancel
        </chakra.button>
        <chakra.button
          disabled={!context.dateRange.start || !context.dateRange.until}
          className="datepicker-footerbutton-apply"
          data-testid="hds.range-datepicker.controls.apply"
        >
          Apply
        </chakra.button>
      </chakra.div>
    </chakra.div>
  );
}

function SelectedRange() {
  const styles = useDatePickerStylesContext();
  const context = useRangeDatePickerContext();

  const start = context.dateRange.start
    ? format(context.dateRange.start, "MMM dd, yyyy")
    : "Select date";

  const until = context.dateRange.until
    ? format(context.dateRange.until, "MMM dd, yyyy")
    : "Select date";

  return (
    <chakra.div
      display="flex"
      gap="12px"
      alignItems="center"
      data-testid="hds.range-datepicker.selected-dates"
    >
      <chakra.div
        {...(!context.dateRange.start && {
          "data-empty": true,
        })}
        __css={styles.footerinput}
        date-testid="hds.range-datepicker.selected-date.start"
      >
        {start}
      </chakra.div>

      <chakra.div w="8px" borderTop="2px" borderColor="gray.500" />

      <chakra.div
        {...(!context.dateRange.until && {
          "data-empty": true,
        })}
        __css={styles.footerinput}
        date-testid="hds.range-datepicker.selected-date.until"
      >
        {until}
      </chakra.div>
    </chakra.div>
  );
}
