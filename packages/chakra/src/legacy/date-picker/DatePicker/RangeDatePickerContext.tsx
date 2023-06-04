import { ThemingProps } from "@chakra-ui/react";
import { createContext } from "../../../utils";
import { DateRange } from "../types";
import { LastUpdated } from "./types";

interface RangeDatePickerContext extends ThemingProps {
  dateRange: Partial<DateRange>;
  currentDate: Date;
  setCurrentDate(newValue: Date): void;
  setCurrentDate(date: Date): void;
  selectedRangeStart?: Date;
  selectedRangeUntil?: Date;
  updateSelectedRange(startOrUntil: Date): void;
  updateSelectedRangeHard(newValue: DateRange): void;
  lastUpdated?: LastUpdated;
  reset(): void;
}

export const [RangeDatePickerProvider, useRangeDatePickerContext] =
  createContext<RangeDatePickerContext>({
    name: "RangeDatePickerContext",
    hookName: "useRangeDatePickerContext",
    providerName: "<RangeDatePickerProvider />",
  });
