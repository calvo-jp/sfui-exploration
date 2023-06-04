import { chakra, Icon } from "@chakra-ui/react";
import { format } from "date-fns";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import ChevronRightIcon from "../icons/ChevronRightIcon";
import { useDatePickerStylesContext } from "./DatePickerContext";

interface DatePickerHeaderProps {
  value: Date;
  onNext?(): void;
  onPrev?(): void;
  __nextButtonTestId?: string;
  __prevButtonTestId?: string;
  __selectedMonthTestId?: String;
}

export function DatePickerHeader({
  value,
  onNext,
  onPrev,
  __nextButtonTestId = "hds.datepicker.shared.control.next-month",
  __prevButtonTestId = "hds.datepicker.shared.control.prev-month",
  __selectedMonthTestId = "hds.datepicker.shared.selected-month",
}: DatePickerHeaderProps) {
  const styles = useDatePickerStylesContext();

  return (
    <chakra.div __css={styles.header}>
      <chakra.button
        onClick={onPrev}
        tabIndex={-1}
        __css={styles.headerButton}
        data-testid={__prevButtonTestId}
      >
        <Icon as={ChevronLeftIcon} className="datepicker-headerbutton-icon" />
      </chakra.button>

      <chakra.p __css={styles.headerLabel} data-testid={__selectedMonthTestId}>
        {format(value, "MMMM")}
      </chakra.p>

      <chakra.button
        onClick={onNext}
        tabIndex={-1}
        __css={styles.headerButton}
        data-testid={__nextButtonTestId}
      >
        <Icon as={ChevronRightIcon} className="datepicker-headerbutton-icon" />
      </chakra.button>
    </chakra.div>
  );
}
