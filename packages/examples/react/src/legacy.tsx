import { Box } from "@chakra-ui/react";
import { DatePicker, DatePickerInput, RangeDatePicker } from "@sfui/chakra";

export function Legacy() {
  return (
    <Box
      p={{
        base: 12,
        md: 16,
        lg: 24,
      }}
    >
      <DatePickerInput />

      <Box mt={8}>
        <RangeDatePicker colorScheme="error" />
      </Box>

      <Box mt={8}>
        <DatePicker />
      </Box>
    </Box>
  );
}
