import { Box } from "@chakra-ui/react";
import { DatePicker, RangeDatePicker } from "@sfui/chakra";

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
        <RangeDatePicker colorScheme="error" />
      </Box>

      <Box mt={8}>
        <DatePicker />
      </Box>
    </Box>
  );
}
