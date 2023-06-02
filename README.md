# SFUI Exploration

Reason for this exploration is due to the problems we've encountered in development while using HDS

## Current HDS problem

- Not themable
- Not flexible eg. having an input with floating label is impossible or atleast requires HUGE effort to be accomplished
- Bloats html. eg. for a single input, HDS adds atleast 3 html elements

  Let's says I just want to use an input and input alone. HDS imports all these components

  ```
  Input
  InputGroup
  InputLeftElement
  InputRightElement
  FormControl
  FormLabel
  FormErrorMessage
  FormHelperText
  ```

  This ends up to a larger bundle size for a particular page which just needs an `<Input>`

- Can't add styles on the fly. eg:

  In HDS, You do this

  ```tsx
  <InputField
    label="Label" /* no way to style this label here  */
    error="Error" /* same here */
  />
  ```

  In Chakra, you have access to all parts of a component

  ```tsx
  <FormControl>
    <FormLabel mb={2} color="blue.600">Label<FormLabel> // On the fly styles here
    <Input />
    <FormErrorMessage mt={4} color="danger.700">Error</FormErrorMessage> // Also here
  </FormControl>
  ```

- Harder to maintain due to the logic being tied to specific requirements instead of being flexible to cover most if not all use-cases (like what chakra does)

## Proposed Solution

- HDS theme as chakra's default theme

  This eliminates writing redundant global theme like input margin, padding, size, etc and
  at the same time remains overrideable like so

  ```tsx
  import { theme as HdsTheme } from "hds/chakra";
  import { theme as ThemeOverrides } from "./theme";

  function App() {
    return (
      <ChakraProvider theme={extendTheme(HdsTheme, ThemeOverrides)}>
        ...
      </ChakraProvider>
    );
  }
  ```

- Focus on complex components which are not available in chakra rather than abstracting non-complex ones. eg

  - Select (Custom)
  - MultiSelect
  - Multiline
  - Combobox
  - DatePicker/RangeDatePicker
  - Pagination

- Design new components in a `chakra-ish` way. eg

  ```tsx
  function Component() {
    return (
      <Select>
        {({ selectedOption }) => (
          <>
            <SelectTrigger>
              {selectedOption.label ?? "Select option"}
            </SelectTrigger>

            <SelectOptions>
              <SelectOption label="Option 1" value="1" />
              <SelectOption label="Option 2" value="2" />
              <SelectOption label="Option 3" value="3">
                <Box>
                  <Text>I Can customize this</Text>
                </Box>
              </SelectOption>
            </SelectOptions>
          </>
        )}
      </Select>
    );
  }
  ```

  This way, the user have access to all component parts where they can do whatever they want that will cater their needs. They can abstract it (but they don't have to).
  Also, with this approach they can add styles on the fly and it looks just like they are still using chakra.
  This as well is a lot easier to maintain

- Ensure new components can be themed globally (still in a `chakra-ish` way).

  New components will also have a default global theme which is based on HDS (overridable of course 👌)
  Refer to [this](https://chakra-ui.com/docs/components/alert/theming)

## Development

- clone repo
- cd to folder
- run the command below

```bash
npm install
npm run start:react
```

- Go to http://localhost:4200/users

![screenshot](/docs/screenshot.jpeg)
