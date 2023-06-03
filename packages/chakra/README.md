# HDS Chakra

HDS theme for chakra w/ addtl complex components

## Usage

- Include theme in `ChakraProvider` like so

```jsx
import { theme as sfTheme } from "@sfui/chakra";
import { theme as myTheme } from "./theme-overrides";
import { ChakraProvider } from "@chakra-ui/react";

export default function App() {
  return (
    <ChakraProvider theme={extendTheme(sfTheme, myTheme)}>
      <Content />
    </ChakraProvider>
  );
}
```

- Add custom toast component and default options

```diff
- import { theme as sfTheme } from "@sfui/chakra";
+ import { theme as sfTheme, defaultToastOptions } from "@sfui/chakra";
import { theme as myTheme } from "./theme-overrides";
import { ChakraProvider } from "@chakra-ui/react";

export default function App() {
  return (
-    <ChakraProvider theme={extendTheme(sfTheme, myTheme)}>
+    <ChakraProvider
+      theme={extendTheme(sfTheme, myTheme)}
+      toastOptions={defaultToastOptions}
+    >
      <Content />
    </ChakraProvider>
  );
}
```

## Todo

- **theme**

  - [x] alert
  - [x] avatar
  - [x] badge
  - [x] breadcrumb
  - [ ] button
    - [x] solid
    - [x] outline
    - [ ] subtle
    - [ ] ghost
    - [ ] link
  - [x] checkbox
  - [x] drawer
  - [x] form-error
  - [x] form-label
  - [x] form
  - [x] heading
  - [x] input
  - [x] menu
  - [x] modal
  - [x] pin-input
  - [x] popover
  - [x] progress
  - [x] select
  - [x] skeleton
  - [x] slider
  - [x] spinner
  - [x] switch
  - [x] table
  - [x] tabs
  - [x] tag
  - [x] text
  - [x] textarea
  - [x] toast
  - [x] tooltip

- **components**

  - [x] Toast `(custom)`
  - [x] Table `(extension)`

    Chakra's `TableContainer` is the only component which is not themable due to it being outside of thier `TableStylesProvider`. They are currently hard-coding the styles for it. We need one which we can theme globally

  - [x] Multiline
  - [x] Pagination
  - [x] Select
  - [ ] Combobox _(ongoing)_
  - [ ] MultiSelect _(planning)_
  - [ ] DatePicker
  - [ ] DatePickerInput _(blocked by DatePicker)_
  - [ ] RangeDatePicker _(blocked by DatePicker)_
  - [ ] RangeDatePickerInput _(blocked by RangeDatePickerInput)_
  - [ ] RangeDatePickerDropdown _(blocked by RangeDatePickerDropdown)_
