import { Box, Button } from "@chakra-ui/react";
import {
  DatePickerInput,
  RangeDatePicker,
  RangeDatePickerDropdown,
} from "@sfui/chakra";

export function Legacy() {
  return (
    <Box
      p={{
        base: 12,
        md: 16,
        lg: 24,
      }}
    >
      <Box>
        <RangeDatePickerDropdown>
          {({ onToggle }) => (
            <Button onClick={onToggle} variant="outline" colorScheme="neutral">
              Select dates
            </Button>
          )}
        </RangeDatePickerDropdown>
      </Box>

      <Box mt={8}>
        <RangeDatePicker />
      </Box>

      <Box mt={8}>
        <DatePickerInput placeholder="Select date" />
      </Box>
    </Box>
  );
}
