import { Box } from "@chakra-ui/react";
import {
  ComboboxField,
  DatePicker,
  DatePickerInput,
  MultiSelectField,
  RangeDatePicker,
  RangeDatePickerInput,
  SelectField,
} from "@sfui/chakra";

export function Custom() {
  return (
    <Box
      p={{
        base: 12,
        md: 16,
        lg: 24,
      }}
    >
      <DatePickerInput colorScheme="blue" />

      <RangeDatePickerInput colorScheme="error" mt={4} />

      <Box mt={8}>
        <RangeDatePicker colorScheme="error" />
      </Box>

      <Box mt={8}>
        <DatePicker />
      </Box>

      <Box mt={8}>
        <MultiSelectField
          size="md"
          colorScheme="success"
          options={[
            { label: "Option 1", value: 1 },
            { label: "Option 2", value: 2 },
            { label: "Option 3", value: 3 },
            { label: "Option 4", value: 4 },
          ]}
        />
      </Box>

      <Box mt={8}>
        <SelectField
          colorScheme="warning"
          options={[
            { label: "Option 1", value: 1 },
            { label: "Option 2", value: 2 },
            { label: "Option 3", value: 3 },
            { label: "Option 4", value: 4 },
          ]}
        />
      </Box>

      <Box mt={8}>
        <ComboboxField
          colorScheme="success"
          isClearable
          options={[
            { label: "Option 1", value: 1 },
            { label: "Option 2", value: 2 },
            { label: "Option 3", value: 3 },
            { label: "Option 4", value: 4 },
          ]}
        />
      </Box>
    </Box>
  );
}
