import { chakra, Icon } from "@chakra-ui/react";
import { format } from "date-fns";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import ChevronRightIcon from "../icons/ChevronRightIcon";
import { useDatePickerStylesContext } from "./DatePickerContext";

export type DatePickerControl = {
  value: Date;
  onNext?(): void;
  onPrev?(): void;
  __nextButtonTestId?: string;
  __prevButtonTestId?: string;
  __selectedMonthTestId?: String;
};

export function DatePickerControl({
  value,
  onNext,
  onPrev,
  __nextButtonTestId = "hds.datepicker.shared.control.next-month",
  __prevButtonTestId = "hds.datepicker.shared.control.prev-month",
  __selectedMonthTestId = "hds.datepicker.shared.selected-month",
}: DatePickerControl) {
  const styles = useDatePickerStylesContext();

  return (
    <chakra.div __css={styles.header}>
      <chakra.button
        onClick={onPrev}
        tabIndex={-1}
        data-testid={__prevButtonTestId}
        __css={styles.headerbutton}
      >
        <Icon as={ChevronLeftIcon} className="datepicker-headerbutton-icon" />
      </chakra.button>

      <chakra.p data-testid={__selectedMonthTestId} __css={styles.headerlabel}>
        {format(value, "MMMM")}
      </chakra.p>

      <chakra.button
        onClick={onNext}
        tabIndex={-1}
        data-testid={__nextButtonTestId}
        __css={styles.headerbutton}
      >
        <Icon as={ChevronRightIcon} className="datepicker-headerbutton-icon" />
      </chakra.button>
    </chakra.div>
  );
}
