import { chakra } from "@chakra-ui/react";
import * as React from "react";
import { v4 as uuid } from "uuid";
import { TimeAdverbial } from "../types";
import { getDateRangeByTimeAdverbial } from "../utils";
import { useDatePickerStylesContext } from "./DatePickerContext";
import { useRangeDatePickerContext } from "./RangeDatePickerContext";

export function RangeDatePickerSidebar() {
  const styles = useDatePickerStylesContext();
  const context = useRangeDatePickerContext();

  const [selected, setSelected] = React.useState<TimeAdverbial | undefined>();

  React.useEffect(() => {
    return () => {
      setSelected(undefined);
    };
  }, []);

  return (
    <chakra.div __css={styles.sidebar}>
      {Object.values(TimeAdverbial).map((value) => (
        <chakra.button
          key={uuid()}
          __css={styles.sidebarItem}
          {...(selected === value && {
            "data-selected": true,
          })}
          tabIndex={-1}
          onClick={() => {
            setSelected(value);

            const dateRange = getDateRangeByTimeAdverbial(value);
            context.updateSelectedRangeHard(dateRange);

            if (dateRange.start) {
              context.setCurrentDate(dateRange.start);
            } else {
              context.setCurrentDate(new Date());
            }

            if (value === TimeAdverbial.AllTime) context.reset();
          }}
          data-testid={`hds.range-datepicker.controls.time-adverb.${value}`}
        >
          {value}
        </chakra.button>
      ))}
    </chakra.div>
  );
}
