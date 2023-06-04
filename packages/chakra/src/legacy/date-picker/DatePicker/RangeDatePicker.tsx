import {
  HTMLChakraProps,
  ThemingProps,
  chakra,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import { addMonths, endOfDay, format, startOfDay, subMonths } from "date-fns";
import * as React from "react";
import { v4 as uuid } from "uuid";
import { Merge } from "../../../types";
import { invariant } from "../../../utils";
import { DAYS } from "../constants";
import { DateRange } from "../types";
import { getRangeCalendar, noop, sortDates } from "../utils";
import {
  DatePickerStylesProvider,
  useDatePickerStylesContext,
} from "./DatePickerContext";
import { DatePickerControl } from "./DatePickerControl";
import {
  RangeDatePickerProvider,
  useRangeDatePickerContext,
} from "./RangeDatePickerContext";
import { RangeDatePickerFooter } from "./RangeDatePickerFooter";
import { RangeDatePickerSidebar } from "./RangeDatePickerSidebar";
import { LastUpdated } from "./types";

export interface RangeDatePickerProps extends ThemingProps<"DatePicker"> {
  value?: DateRange;
  events?: Date[];
  onApply?(value: DateRange): void;
  onCancel?(currentValue: Partial<DateRange>): void;
  hasTimeAdverbial?: boolean;
  includePreviousMonth?: boolean;
}

function RangeDatePickerContent({
  onApply,
  onCancel,
  hasTimeAdverbial = true,
  includePreviousMonth = true,
}: RangeDatePickerProps) {
  const context = useRangeDatePickerContext();
  const styles = useMultiStyleConfig("DatePicker");

  return (
    <chakra.div __css={styles.container}>
      {hasTimeAdverbial && (
        <>
          <RangeDatePickerSidebar />
          <Divider orientation="horizontal" />
        </>
      )}

      <chakra.div>
        <chakra.div display="flex">
          {includePreviousMonth && (
            <>
              <PreviousCalendar />
              <Divider orientation="horizontal" />
            </>
          )}

          <CurrentCalendar />
        </chakra.div>

        <Divider />

        <RangeDatePickerFooter
          hasSelectedDetails={includePreviousMonth}
          onCancel={() => {
            onCancel?.({
              start: context.dateRange.start
                ? startOfDay(context.dateRange.start)
                : undefined,
              until: context.dateRange.until
                ? endOfDay(context.dateRange.until)
                : undefined,
            });

            context.reset();
          }}
          onApply={() => {
            const { start, until } = context.dateRange;

            invariant(start && until);

            context.reset();
            onApply?.({
              start: startOfDay(start),
              until: endOfDay(until),
            });
          }}
        />
      </chakra.div>
    </chakra.div>
  );
}

function Divider({ orientation }: { orientation?: "horizontal" | "vertical" }) {
  const styles = useDatePickerStylesContext();

  return <chakra.div __css={styles.divider} data-orientation={orientation} />;
}

function CurrentCalendar() {
  const { currentDate, updateSelectedRange, setCurrentDate } =
    useRangeDatePickerContext();

  return (
    <Calendar
      baseDate={currentDate}
      onSelect={updateSelectedRange}
      onNext={() => setCurrentDate(addMonths(currentDate, 1))}
      onPrev={() => setCurrentDate(subMonths(currentDate, 1))}
    />
  );
}

function PreviousCalendar() {
  const { currentDate, updateSelectedRange, setCurrentDate } =
    useRangeDatePickerContext();

  return (
    <Calendar
      baseDate={subMonths(currentDate, 1)}
      onSelect={updateSelectedRange}
      onNext={() => setCurrentDate(addMonths(currentDate, 1))}
      onPrev={() => setCurrentDate(subMonths(currentDate, 1))}
    />
  );
}

type CalendarProps = Merge<
  HTMLChakraProps<"div">,
  {
    baseDate: Date;
    onSelect?(date: Date): void;
    onNext?(): void;
    onPrev?(): void;
  }
>;

function Calendar({
  baseDate,
  onSelect = noop,
  onNext,
  onPrev,
  ...props
}: CalendarProps) {
  const styles = useDatePickerStylesContext();
  const context = useRangeDatePickerContext();
  const calendar = getRangeCalendar(baseDate, {
    start: context.dateRange.start,
    until: context.dateRange.until,
  });

  return (
    <chakra.div __css={styles.calendar} {...props}>
      <DatePickerControl
        value={baseDate}
        onNext={onNext}
        onPrev={onPrev}
        __nextButtonTestId="hds.range-datepicker.controls.next-month"
        __prevButtonTestId="hds.range-datepicker.controls.prev-month"
        __selectedMonthTestId="hds.range-datepicker.selected-month"
      />

      <chakra.table data-testid="hds.range-datepicker.calendar">
        <chakra.thead>
          <chakra.tr>
            {DAYS.map((d) => (
              <chakra.th
                key={uuid()}
                data-testid="hds.range-datepicker.calendar.weekday"
              >
                {d}
              </chakra.th>
            ))}
          </chakra.tr>
        </chakra.thead>

        <chakra.tbody>
          {calendar.map((arr) => (
            <chakra.tr key={uuid()}>
              {arr.map(
                ({
                  value,
                  isToday,
                  isPlaceholder,
                  isWithinRange,
                  isRangeStartDate,
                  isRangeUntilDate,
                }) => {
                  const formatted = format(value, "yyyy-MM-dd");
                  const isSelected = isRangeStartDate || isRangeUntilDate;

                  return (
                    <chakra.td key={uuid()}>
                      <chakra.button
                        tabIndex={-1}
                        onClick={() => {
                          onSelect(value);
                        }}
                        {...{
                          ...(isToday && {
                            "data-today": true,
                          }),
                          ...(isWithinRange && {
                            "data-inrange": true,
                          }),
                          ...(isSelected && {
                            "data-selected": true,
                          }),
                          ...(isPlaceholder && {
                            "data-placeholder": true,
                          }),
                        }}
                        __css={styles.calendaritem}
                        data-testid={`hds.datepicker.calendar.date.${formatted}`}
                      >
                        {value.getDate()}
                      </chakra.button>
                    </chakra.td>
                  );
                },
              )}
            </chakra.tr>
          ))}
        </chakra.tbody>
      </chakra.table>
    </chakra.div>
  );
}

export const RangeDatePicker = (props: RangeDatePickerProps) => {
  const styles = useMultiStyleConfig("DatePicker", props);

  const [selectedRangeStart, setSelectedRangeStart] = React.useState(
    props.value?.start,
  );

  const [selectedRangeUntil, setSelectedRangeUntil] = React.useState(
    props.value?.until,
  );

  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [lastUpdated, setLastUpdated] = React.useState<LastUpdated>();

  const updateSelectedRange = (date: Date) => {
    if (lastUpdated === LastUpdated.START) {
      setSelectedRangeUntil(date);
      setLastUpdated(LastUpdated.UNTIL);
    } else {
      setSelectedRangeStart(date);
      setLastUpdated(LastUpdated.START);
    }
  };

  const updateSelectedRangeHard = (dateRange: DateRange) => {
    setSelectedRangeStart(dateRange.start);
    setSelectedRangeUntil(dateRange.until);
  };

  const dateRange = React.useMemo(() => {
    if (selectedRangeStart && selectedRangeUntil) {
      const [start, until] = sortDates([
        selectedRangeStart,
        selectedRangeUntil,
      ]);

      return {
        start,
        until,
      };
    }

    return {
      start: selectedRangeStart,
      until: selectedRangeUntil,
    };
  }, [
    //
    selectedRangeStart,
    selectedRangeUntil,
  ]);

  const reset = () => {
    setSelectedRangeStart(undefined);
    setSelectedRangeUntil(undefined);
    setLastUpdated(undefined);
    setCurrentDate(new Date());
  };

  React.useEffect(() => {
    return () => {
      setSelectedRangeStart(undefined);
      setSelectedRangeUntil(undefined);
      setLastUpdated(undefined);
      setCurrentDate(new Date());
    };
  }, []);

  return (
    <DatePickerStylesProvider value={styles}>
      <RangeDatePickerProvider
        value={{
          ...props,
          currentDate,
          dateRange,
          reset,
          setCurrentDate,
          updateSelectedRange,
          updateSelectedRangeHard,
          lastUpdated,
          selectedRangeStart,
          selectedRangeUntil,
        }}
      >
        <RangeDatePickerContent {...props} />
      </RangeDatePickerProvider>
    </DatePickerStylesProvider>
  );
};
